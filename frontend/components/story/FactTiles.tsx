import { Reveal } from '@/components/story/Reveal'
import { cn } from '@/lib/utils'

export type FactTile = { icon?: React.ReactNode; value: string; label: string; sublabel?: string }

/** Cifras en texto (tasas, plazos, etapas): no se animan porque no son numéricas puras. */
export function FactTiles({ items, tone = 'glass' }: { items: FactTile[]; tone?: 'glass' | 'paper' }) {
  const glass = tone === 'glass'
  return (
    <dl className={cn('grid gap-gob-4', items.length >= 3 ? 'min-[905px]:grid-cols-3' : 'min-[600px]:grid-cols-2')}>
      {items.map((item, i) => (
        <Reveal
          key={item.label}
          delay={i * 0.06}
          className={cn(
            'flex flex-col gap-gob-2 rounded-gob-xl p-gob-5',
            glass ? 'story-glass story-glass-interactive' : 'border border-gob-border bg-card shadow-elevation-02 story-card-hover-paper',
          )}
        >
          <dt className={cn('flex items-center justify-between gap-gob-3 text-gri-body-sm font-medium', glass ? 'text-white/80' : 'text-muted-foreground')}>
            {item.label}
            {item.icon ? (
              <span
                aria-hidden
                className={cn(
                  'inline-flex size-9 shrink-0 items-center justify-center rounded-full [&_svg]:size-4',
                  glass ? 'bg-white/10 text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
                )}
              >
                {item.icon}
              </span>
            ) : null}
          </dt>
          <dd className={cn('story-tabular font-heading text-[2rem] font-medium leading-none', glass ? 'text-white' : 'text-gob-text')}>
            {item.value}
          </dd>
          {item.sublabel ? <dd className={cn('text-gri-body-xs', glass ? 'text-white/70' : 'text-muted-foreground')}>{item.sublabel}</dd> : null}
        </Reveal>
      ))}
    </dl>
  )
}
