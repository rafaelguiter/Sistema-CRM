import type { ReactNode } from 'react'

interface FormFieldProps {
  id: string
  label: string
  error?: string
  children: ReactNode
}

export function FormField({ id, label, error, children }: FormFieldProps) {
  return (
    <div className="space-y-2">
      <label htmlFor={id} className="block text-sm font-medium text-slate-700">
        {label}
      </label>
      {children}
      {error && (
        <p
          id={`${id}-error`}
          role="alert"
          className="text-xs leading-relaxed text-red-600"
        >
          {error}
        </p>
      )}
    </div>
  )
}
