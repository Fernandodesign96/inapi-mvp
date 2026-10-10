import type { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function PortalStat({
  icon: Icon,
  value,
  label,
  className,
  tone = 'default',
  index,
}: {
  icon: LucideIcon
  value: string
  label: string
  className?: string
  tone?: 'default' | 'ambient'
  index?: string
}) {
  const ambient = tone === 'ambient'
  return (
    <article
      className={cn(
        'flex rounded-gob-lg p-gob-5 text-left',
        ambient
          ? 'min-h-[11rem] flex-col justify-between bg-inapi-portal-hero text-gob-text-inverse shadow-elevation-03'
          : 'items-start gap-gob-4 border border-gob-border bg-card shadow-elevation-01',
        className,
      )}
    >
      {ambient ? (
        <>
          <div className="flex items-start justify-between gap-gob-3">
            {index ? (
              <span className="font-heading text-[1.75rem] font-medium tabular-nums leading-none text-gob-focus">
                {index}
              </span>
            ) : null}
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-white/10">
              <Icon className="size-6" aria-hidden />
            </span>
          </div>
          <div className="space-y-gob-2 pt-gob-4">
            <p className="font-heading text-gri-h1 font-medium leading-[1.5] text-gob-text-inverse">{value}</p>
            <p className="text-gri-body-sm leading-[1.5] text-gob-text-inverse">{label}</p>
          </div>
        </>
      ) : (
        <>
          <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md bg-gob-info-bg text-gob-primary">
            <Icon className="size-6" aria-hidden />
          </span>
          <div className="min-w-0 space-y-1">
            <p className="font-heading text-gri-h1 font-medium text-gob-text leading-[1.5]">{value}</p>
            <p className="text-gri-body-sm text-muted-foreground leading-[1.5]">{label}</p>
          </div>
        </>
      )}
    </article>
  )
}
