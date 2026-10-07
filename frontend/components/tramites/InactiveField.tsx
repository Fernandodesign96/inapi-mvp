import { cn } from '@/lib/utils'

export function InactiveField({
  active,
  children,
  hint,
}: {
  active: boolean
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className={cn(!active && 'opacity-55')}>
      <fieldset disabled={!active} className="min-w-0">
        {children}
      </fieldset>
      {!active && hint && <p className="text-gri-body-xs text-muted-foreground mt-gob-2">{hint}</p>}
    </div>
  )
}
