import { AlertTriangle, Check, CircleDashed, Clock, Search, X } from 'lucide-react'
import { severityLabel, type SolicitudSeverity } from '@/lib/tramites/marca-etapas'
import { cn } from '@/lib/utils'

const ICONS: Record<SolicitudSeverity, typeof Check> = {
  critical: X,
  action: AlertTriangle,
  review: Search,
  watch: CircleDashed,
  success: Check,
  closed: Clock,
}

const STYLES: Record<SolicitudSeverity, string> = {
  critical: 'bg-gob-danger-bg text-gob-danger',
  action: 'bg-gob-warning-bg text-gob-warning',
  review: 'bg-sev-review-bg text-sev-review',
  watch: 'bg-sev-watch-bg text-sev-watch',
  success: 'bg-gob-success-bg text-gob-success',
  closed: 'bg-sev-closed-bg text-sev-closed',
}

export function SeverityChip({
  severity,
  label,
  className,
}: {
  severity: SolicitudSeverity
  label?: string
  className?: string
}) {
  const Icon = ICONS[severity]
  return (
    <span
      className={cn(
        'inline-flex min-h-8 items-center gap-1.5 rounded-full px-gob-3 text-gri-body-xs font-semibold',
        STYLES[severity],
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden />
      {label ?? severityLabel(severity)}
    </span>
  )
}
