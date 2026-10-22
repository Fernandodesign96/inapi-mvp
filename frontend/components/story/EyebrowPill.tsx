import { cn } from '@/lib/utils'

export type StoryTone = 'night' | 'mist' | 'paper'

export function EyebrowPill({
  children,
  tone = 'paper',
  dot = 'accent',
  className,
}: {
  children: React.ReactNode
  tone?: StoryTone
  dot?: 'accent' | 'primary' | 'marcas' | 'patentes' | 'focus'
  className?: string
}) {
  const night = tone === 'night'
  return (
    <span
      className={cn(
        'inline-flex items-center gap-gob-2 rounded-full border px-gob-3 py-gob-1 text-gri-body-xs font-semibold uppercase tracking-[0.08em]',
        night ? 'border-white/20 bg-white/8 text-white' : 'border-gob-border bg-card text-gob-text shadow-elevation-01',
        className,
      )}
    >
      <span
        aria-hidden
        className={cn(
          'size-2 rounded-full',
          dot === 'accent' && 'bg-inapi-header',
          dot === 'primary' && 'bg-gob-primary',
          dot === 'marcas' && 'bg-inapi-marcas-accent',
          dot === 'patentes' && 'bg-inapi-patentes-accent',
          dot === 'focus' && 'bg-gob-focus',
        )}
      />
      {children}
    </span>
  )
}
