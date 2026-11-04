import { type ComponentProps } from 'react'
import { cn } from '../../lib/utils'
export function Card({ className, ...props }: ComponentProps<'section'>) {
  return (
    <section
      className={cn(
        'rounded-2xl border border-slate-200/80 bg-white shadow-sm',
        className,
      )}
      {...props}
    />
  )
}
