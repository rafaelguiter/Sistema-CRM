import { zodResolver } from '@hookform/resolvers/zod'
import { LoaderCircle, Plus, Save, X } from 'lucide-react'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { FormField } from '@/components/ui/form-field'
import { Input } from '@/components/ui/input'
import { customerSchema, type CustomerFormValues } from '../customer-schema'
import { formatBrazilianPhone } from '../phone'
import { customerStatuses, type CustomerInput } from '../types'

interface CustomerFormProps {
  defaultValues?: CustomerFormValues
  isSaving: boolean
  onSubmit: (values: CustomerInput) => Promise<void>
  onCancel: () => void
}

const initialValues: CustomerFormValues = {
  name: '',
  email: '',
  phone: '',
  company: '',
  status: 'Lead',
  tags: [],
}

export function CustomerForm({
  defaultValues = initialValues,
  isSaving,
  onSubmit,
  onCancel,
}: CustomerFormProps) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CustomerFormValues, unknown, CustomerInput>({
    resolver: zodResolver(customerSchema),
    defaultValues,
    mode: 'onBlur',
  })
  const phone = register('phone')
  const [tags, setTags] = useState(defaultValues.tags ?? [])
  const [tagInput, setTagInput] = useState('')
  const addTag = () => {
    const tag = tagInput.trim()
    if (
      tag &&
      !tags.some((item) => item.toLocaleLowerCase() === tag.toLocaleLowerCase())
    )
      setTags([...tags, tag])
    setTagInput('')
  }

  return (
    <form
      onSubmit={handleSubmit((values) => onSubmit({ ...values, tags }))}
      noValidate
      aria-busy={isSaving}
      className="space-y-6"
    >
      <FormField
        id="customer-name"
        label="Nome completo"
        error={errors.name?.message}
      >
        <Input
          id="customer-name"
          placeholder="Digite o nome completo"
          autoComplete="name"
          disabled={isSaving}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'customer-name-error' : undefined}
          {...register('name')}
        />
      </FormField>

      <FormField id="customer-tags" label="Tags">
        <div className="flex gap-2">
          <Input
            id="customer-tags"
            placeholder="Ex.: VIP, Prioritário"
            value={tagInput}
            disabled={isSaving}
            onChange={(event) => setTagInput(event.target.value)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                event.preventDefault()
                addTag()
              }
            }}
          />
          <Button
            type="button"
            size="icon"
            aria-label="Adicionar tag"
            className="bg-indigo-600 hover:bg-violet-700"
            disabled={isSaving}
            onClick={addTag}
          >
            <Plus size={18} />
          </Button>
        </div>
        {tags.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-2">
            {tags.map((tag, index) => (
              <span
                key={tag}
                className={
                  index % 2
                    ? 'inline-flex items-center gap-1 rounded-full bg-violet-100 px-3 py-1 text-xs font-medium text-violet-700'
                    : 'inline-flex items-center gap-1 rounded-full bg-blue-100 px-3 py-1 text-xs font-medium text-blue-700'
                }
              >
                {tag}
                <button
                  type="button"
                  aria-label={`Remover tag ${tag}`}
                  onClick={() => setTags(tags.filter((item) => item !== tag))}
                >
                  <X size={13} />
                </button>
              </span>
            ))}
          </div>
        )}
      </FormField>

      <FormField
        id="customer-email"
        label="E-mail"
        error={errors.email?.message}
      >
        <Input
          id="customer-email"
          type="email"
          placeholder="exemplo@email.com"
          autoComplete="email"
          autoCapitalize="none"
          spellCheck={false}
          disabled={isSaving}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'customer-email-error' : undefined}
          {...register('email')}
        />
      </FormField>

      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          id="customer-phone"
          label="Telefone"
          error={errors.phone?.message}
        >
          <Input
            id="customer-phone"
            type="tel"
            inputMode="tel"
            placeholder="(00) 00000-0000"
            autoComplete="tel"
            disabled={isSaving}
            {...phone}
            onChange={(event) => {
              const formatted = formatBrazilianPhone(event.target.value)
              event.target.value = formatted
              setValue('phone', formatted, {
                shouldDirty: true,
                shouldValidate: false,
              })
            }}
          />
        </FormField>

        <FormField
          id="customer-company"
          label="Empresa"
          error={errors.company?.message}
        >
          <Input
            id="customer-company"
            placeholder="Nome da empresa"
            autoComplete="organization"
            disabled={isSaving}
            {...register('company')}
          />
        </FormField>
      </div>

      <FormField
        id="customer-status"
        label="Status"
        error={errors.status?.message}
      >
        <select
          id="customer-status"
          disabled={isSaving}
          aria-invalid={Boolean(errors.status)}
          className="flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-xs outline-none transition-[border-color,box-shadow] hover:border-indigo-300 focus:border-indigo-600 focus:ring-4 focus:ring-indigo-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 aria-invalid:border-red-500 aria-invalid:focus:ring-red-50"
          {...register('status')}
        >
          {customerStatuses.map((status) => (
            <option key={status} value={status}>
              {status === 'Lead'
                ? '● Lead'
                : status === 'Proposta'
                  ? '● Proposta'
                  : status === 'Cliente'
                    ? '● Cliente'
                    : '● Inativo'}
            </option>
          ))}
        </select>
      </FormField>

      <div className="flex flex-col-reverse gap-3 border-t border-slate-100 pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="ghost"
          className="border border-slate-200 bg-slate-50 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
          disabled={isSaving}
          onClick={onCancel}
        >
          Cancelar
        </Button>
        <Button
          type="submit"
          className="bg-green-600 hover:bg-green-700 focus-visible:ring-green-100"
          disabled={isSaving}
        >
          {isSaving ? (
            <>
              <LoaderCircle
                size={18}
                className="animate-spin motion-reduce:animate-none"
                aria-hidden="true"
              />{' '}
              Salvando...
            </>
          ) : (
            <>
              <Save size={18} aria-hidden="true" /> Salvar Cliente
            </>
          )}
        </Button>
      </div>
    </form>
  )
}
