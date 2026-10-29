import { cn } from '@/lib/utils'

export function KpiStatCard({
  label,
  value,
  hint,
  icon,
  pressed,
  onClick,
  tone = 'neutral',
}: {
  label: string
  value: number
  hint?: string
  icon: React.ReactNode
  pressed?: boolean
  onClick?: () => void
  tone?: 'neutral' | 'warning' | 'success' | 'info'
}) {
  const toneClass =
    tone === 'warning'
      ? 'border-gob-warning/30 bg-gob-warning-bg'
      : tone === 'success'
        ? 'border-gob-success/30 bg-gob-success-bg'
        : tone === 'info'
          ? 'border-gob-primary/25 bg-gob-info-bg'
          : 'border-gob-border bg-card'
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className={cn(
        'flex min-h-[6.5rem] flex-col items-start gap-1 rounded-gob-lg border p-gob-4 text-left shadow-elevation-01 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
        toneClass,
        pressed && 'ring-2 ring-gob-primary/40',
      )}
    >
      <span className="inline-flex size-8 items-center justify-center rounded-gob-md bg-card text-gob-primary-dark [&_svg]:size-4">
        {icon}
      </span>
      <span className="font-heading text-[1.5rem] font-semibold leading-none tabular-nums text-gob-text">{value}</span>
      <span className="text-gri-body-sm font-medium text-gob-text">{label}</span>
      {hint ? <span className="text-gri-body-xs text-muted-foreground">{hint}</span> : null}
    </button>
  )
}
