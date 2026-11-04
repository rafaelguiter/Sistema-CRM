import { expect, test } from '@playwright/test'

test('rota inicial e acesso direto ao dashboard levam ao login sem sessão', async ({
  page,
}, testInfo) => {
  await page.goto('/')
  await expect(page).toHaveURL(/\/login$/)
  await expect(
    page.getByRole('heading', { name: 'Bem-vindo de volta!' }),
  ).toBeVisible()
  await expect(page).toHaveTitle('AutenticFlow | Login')
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true)
  await page.screenshot({
    path: testInfo.outputPath('login.png'),
    fullPage: true,
  })
  await page.goto('/dashboard')
  await expect(page).toHaveURL(/\/login$/)
})

test('campos obrigatórios, e-mail inválido, visibilidade da senha e recuperação informativa', async ({
  page,
}) => {
  await page.goto('/login')
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(
    page.getByText('Informe seu e-mail para continuar.'),
  ).toBeVisible()
  await expect(
    page.getByText('Informe sua senha para continuar.'),
  ).toBeVisible()
  await expect(page.getByLabel('E-mail', { exact: true })).toBeFocused()
  await page.getByLabel('E-mail', { exact: true }).fill('email-invalido')
  await page.getByLabel('Senha', { exact: true }).fill('teste')
  await page.getByRole('button', { name: 'Mostrar senha' }).click()
  await expect(page.getByLabel('Senha', { exact: true })).toHaveAttribute(
    'type',
    'text',
  )
  await page.getByRole('button', { name: 'Ocultar senha' }).click()
  await expect(page.getByLabel('Senha', { exact: true })).toHaveAttribute(
    'type',
    'password',
  )
  await page.getByRole('button', { name: 'Entrar', exact: true }).click()
  await expect(
    page.getByText('Digite um e-mail válido, como seu@email.com.'),
  ).toBeVisible()
  await page.getByRole('link', { name: 'Esqueci minha senha' }).click()
  await expect(
    page.getByText(/A recuperação de senha estará disponível/),
  ).toBeVisible()
  await expect(page).toHaveURL(/\/login$/)
})

for (const remember of [false, true]) {
  test(`login por Enter e sessão ${remember ? 'persistente' : 'temporária'}`, async ({
    page,
  }, testInfo) => {
    const errors: string[] = []
    page.on('pageerror', (error) => errors.push(error.message))
    await page.goto('/login')
    await page.getByLabel('E-mail', { exact: true }).fill(' TESTE@exemplo.com ')
    await page.getByLabel('Senha', { exact: true }).fill('senha-simulada')
    if (remember) await page.getByLabel('Lembrar de mim').check()
    await page.getByLabel('Senha', { exact: true }).press('Enter')
    await expect(
      page.getByRole('button', { name: 'Entrando...' }),
    ).toBeDisabled()
    await expect(page).toHaveURL(/\/dashboard$/)
    await expect(
      page.getByRole('heading', { name: 'Dashboard', exact: true }),
    ).toBeVisible()
    await expect(
      page.getByRole('heading', { name: 'Evolução da receita' }),
    ).toBeVisible()
    const session = await page.evaluate(() => ({
      persistent: localStorage.getItem('autenticflow.demo-session'),
      temporary: sessionStorage.getItem('autenticflow.demo-session'),
    }))
    expect(session[remember ? 'temporary' : 'persistent']).toBeNull()
    expect(JSON.parse(session[remember ? 'persistent' : 'temporary']!)).toEqual(
      { email: 'teste@exemplo.com' },
    )
    await page.reload()
    await expect(
      page.getByRole('heading', { name: 'Dashboard', exact: true }),
    ).toBeVisible()
    await page.getByRole('combobox').selectOption('7d')
    await expect(page.getByRole('heading', { name: 'R$ 48.250' })).toBeVisible()
    if (remember)
      await page.screenshot({
        path: testInfo.outputPath('dashboard.png'),
        fullPage: true,
      })
    expect(errors).toEqual([])
  })
}
