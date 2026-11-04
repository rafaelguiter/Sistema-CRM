import { expect, test } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() =>
    localStorage.setItem(
      'autenticflow.demo-session',
      JSON.stringify({ email: 'teste@exemplo.com' }),
    ),
  )
})

test('sidebar abre Clientes e permite chegar ao cadastro', async ({
  page,
}, testInfo) => {
  await page.goto('/dashboard')
  if (testInfo.project.name === 'mobile') {
    await page.getByRole('button', { name: 'Abrir menu' }).click()
  }
  await page.getByRole('link', { name: 'Clientes' }).click()
  await expect(page).toHaveURL(/\/clientes$/)
  await expect(
    page.getByRole('heading', { name: 'Clientes', exact: true }),
  ).toBeVisible()
  await page
    .getByRole('link', { name: /Novo cliente|Cadastrar cliente/ })
    .first()
    .click()
  await expect(page).toHaveURL(/\/clientes\/novo$/)
  await expect(
    page.getByRole('heading', { name: 'Cadastrar Cliente', exact: true }),
  ).toBeVisible()
})

test('formulário valida, mascara telefone, salva e retorna à lista', async ({
  page,
}, testInfo) => {
  await page.goto('/clientes/novo')
  await page.getByRole('button', { name: 'Salvar Cliente' }).click()
  await expect(
    page.getByText('Informe o nome completo do cliente.'),
  ).toBeVisible()
  await expect(page.getByText('Informe o e-mail do cliente.')).toBeVisible()
  await page.getByLabel('Nome completo').fill('Mariana Costa')
  await page.getByLabel('E-mail').fill('email-invalido')
  await page.getByRole('button', { name: 'Salvar Cliente' }).click()
  await expect(
    page.getByText('Digite um e-mail válido, como exemplo@email.com.'),
  ).toBeVisible()
  await page.getByLabel('E-mail').fill('mariana@exemplo.com')
  await page.getByLabel('Telefone').fill('11987654321')
  await expect(page.getByLabel('Telefone')).toHaveValue('(11) 98765-4321')
  await page.getByLabel('Empresa').fill('Autentic Ltda.')
  await page.getByLabel('Status').selectOption('Cliente')
  await page.getByRole('button', { name: 'Salvar Cliente' }).click()
  await expect(page.getByRole('button', { name: 'Salvando...' })).toBeDisabled()
  await expect(
    page.getByText('Mariana Costa foi cadastrado com sucesso.'),
  ).toBeVisible()
  await page.screenshot({
    path: testInfo.outputPath('new-customer.png'),
    fullPage: true,
  })
  await page.getByRole('button', { name: 'Cancelar' }).click()
  await expect(page).toHaveURL(/\/clientes$/)
  await expect(page.getByText('Mariana Costa')).toBeVisible()
  await expect(
    page.getByText('mariana@exemplo.com · Autentic Ltda.'),
  ).toBeVisible()
  await expect(page.getByText('Cliente', { exact: true })).toBeVisible()
})

test('cancelar retorna para clientes sem criar novo registro', async ({
  page,
}) => {
  await page.goto('/clientes/novo')
  await page.getByRole('button', { name: 'Cancelar' }).click()
  await expect(page).toHaveURL(/\/clientes$/)
})
