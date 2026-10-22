import { cn } from '@/lib/utils'

export type KpiItem = {
  value: string
  label: string
  sublabel?: string
  icon?: React.ReactNode
}

/** Fila de cifras clave en texto (tasas, plazos, etapas) para el panel del hero. */
export function KpiStrip({
  items,
  tone = 'night',
  footer,
  className,
}: {
  items: KpiItem[]
  tone?: 'night' | 'paper'
  footer?: React.ReactNode
  className?: string
}) {
  const night = tone === 'night'
  return (
    <div
      className={cn(
        'rounded-[1.75rem] p-gob-3 min-[905px]:p-gob-4',
        night ? 'story-glass shadow-elevation-05' : 'border border-gob-border bg-card shadow-elevation-03',
        className,
      )}
    >
      <dl className={cn('grid gap-gob-3 min-[600px]:grid-cols-2', items.length >= 4 ? 'min-[1100px]:grid-cols-4' : 'min-[905px]:grid-cols-3')}>
        {items.map((item, i) => (
          <div
            key={item.label}
            className={cn(
              'flex flex-col-reverse gap-gob-2 rounded-gob-lg p-gob-5',
              night ? (i === 0 ? 'bg-white text-[#092039]' : 'bg-white/6') : i === 0 ? 'story-night text-white' : 'bg-gob-surface-elevated',
            )}
          >
            <dt className="flex flex-col gap-0.5">
              <span className={cn('text-gri-body-sm font-medium', night ? (i === 0 ? 'text-[#092039]' : 'text-white') : i === 0 ? 'text-white' : 'text-gob-text')}>
                {item.label}
              </span>
              {item.sublabel ? (
                <span
                  className={cn('text-gri-body-xs', night ? (i === 0 ? 'text-[#4B5563]' : 'text-white/70') : i === 0 ? 'text-white/75' : 'text-muted-foreground')}
                >
                  {item.sublabel}
                </span>
              ) : null}
            </dt>
            <dd className="flex items-center justify-between gap-gob-3">
              <span
                className={cn(
                  'story-tabular font-heading text-[1.75rem] font-medium leading-none min-[1240px]:text-[2rem]',
                  night ? (i === 0 ? 'text-[#092039]' : 'text-white') : i === 0 ? 'text-white' : 'text-gob-text',
                )}
              >
                {item.value}
              </span>
              {item.icon ? (
                <span
                  aria-hidden
                  className={cn(
                    'inline-flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4',
                    night ? (i === 0 ? 'bg-[#092039] text-white' : 'bg-white/10 text-white') : i === 0 ? 'bg-white/12 text-white' : 'bg-card text-gob-primary-dark',
                  )}
                >
                  {item.icon}
                </span>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
      {footer ? <div className={cn('px-gob-2 pt-gob-3 text-gri-body-xs', night ? 'text-white/75' : 'text-muted-foreground')}>{footer}</div> : null}
    </div>
  )
}
