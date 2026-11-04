import { cn } from '@/lib/utils'

export function Brand({ className }: { className?: string }) {
  return (
    <div
      className={cn('flex items-center justify-center gap-2.5', className)}
      aria-label="AutenticFlow"
    >
      <div
        className="flex size-10 items-end justify-center gap-1 rounded-xl bg-blue-50 px-2.5 py-2.5"
        aria-hidden="true"
      >
        <span className="h-2 w-1 rounded-sm bg-blue-500" />
        <span className="h-3.5 w-1 rounded-sm bg-blue-500" />
        <span className="h-5 w-1 rounded-sm bg-blue-500" />
      </div>
      <span className="text-[23px] font-bold tracking-tight text-slate-900">
        Autentic<span className="text-blue-500">Flow</span>
      </span>
    </div>
  )
}
