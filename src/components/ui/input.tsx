import type { ComponentProps } from 'react'
import { cn } from '@/lib/utils'

export function Input({
  className,
  type = 'text',
  ...props
}: ComponentProps<'input'>) {
  return (
    <input
      type={type}
      className={cn(
        'flex h-12 w-full rounded-xl border border-slate-200 bg-white px-4 text-sm text-slate-900 shadow-xs outline-none transition-[border-color,box-shadow] placeholder:text-slate-400 hover:border-slate-300 focus-visible:border-emerald-600 focus-visible:ring-4 focus-visible:ring-emerald-50 disabled:cursor-not-allowed disabled:bg-slate-50 disabled:opacity-70 aria-invalid:border-red-500 aria-invalid:focus-visible:ring-red-50',
        className,
      )}
      {...props}
    />
  )
}
