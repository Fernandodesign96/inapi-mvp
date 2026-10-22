import { Reveal } from '@/components/story/Reveal'
import { cn } from '@/lib/utils'

export type TimelineItem = { year: string; title: string; body: string }

/** Línea de tiempo vertical con hilo conductor; alterna lados en escritorio. */
export function StoryTimeline({
  items,
  tone = 'paper',
  label = 'Línea de tiempo',
}: {
  items: TimelineItem[]
  tone?: 'paper' | 'night'
  label?: string
}) {
  const night = tone === 'night'
  return (
    <ol aria-label={label} className="relative mx-auto flex max-w-5xl flex-col gap-gob-6">
      <span
        aria-hidden
        className={cn(
          'absolute bottom-2 left-[1.0625rem] top-2 w-px min-[905px]:left-1/2',
          night ? 'bg-white/20' : 'bg-[var(--story-line)]',
        )}
      />
      {items.map((item, i) => {
        const right = i % 2 === 1
        return (
          <Reveal
            as="li"
            key={item.year + item.title}
            delay={Math.min(i, 4) * 0.06}
            className={cn('relative grid gap-gob-3 pl-gob-8 min-[905px]:grid-cols-2 min-[905px]:gap-gob-8 min-[905px]:pl-0')}
          >
            <span
              aria-hidden
              className={cn(
                'absolute left-[0.6875rem] top-gob-5 size-3 rounded-full ring-4 min-[905px]:left-1/2 min-[905px]:-translate-x-1/2',
                night ? 'bg-gob-focus ring-[var(--story-night)]' : 'bg-[var(--story-night)] ring-[var(--story-paper)]',
              )}
            />
            <div
              className={cn(
                'rounded-gob-lg p-gob-5',
                night ? 'story-glass' : 'border border-gob-border bg-card shadow-elevation-01',
                right ? 'min-[905px]:col-start-2' : 'min-[905px]:col-start-1 min-[905px]:text-right',
              )}
            >
              <p className={cn('story-tabular text-gri-body-sm font-semibold', night ? 'text-[#A1D1FF]' : 'text-gob-primary-dark')}>{item.year}</p>
              <h3 className={cn('mt-gob-1 font-heading text-gri-h2 font-medium leading-[1.35]', night ? 'text-white' : 'text-gob-text')}>{item.title}</h3>
              <p className={cn('mt-gob-2 text-gri-body-sm leading-[1.6]', night ? 'text-white/80' : 'text-muted-foreground')}>{item.body}</p>
            </div>
          </Reveal>
        )
      })}
    </ol>
  )
}
