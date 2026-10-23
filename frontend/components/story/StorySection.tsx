import { useId } from 'react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { EyebrowPill, type StoryTone } from '@/components/story/EyebrowPill'
import { Reveal } from '@/components/story/Reveal'
import { cn } from '@/lib/utils'

export type StorySectionProps = {
  tone?: StoryTone
  eyebrow?: string
  title?: string
  lead?: React.ReactNode
  align?: 'center' | 'left'
  id?: string
  children?: React.ReactNode
  className?: string
  /** Acciones a la derecha del título (solo align="left"). */
  actions?: React.ReactNode
  dot?: React.ComponentProps<typeof EyebrowPill>['dot']
  leadSingleLine?: boolean
}

export function StorySection({
  tone = 'paper',
  eyebrow,
  title,
  lead,
  align = 'center',
  id,
  children,
  className,
  actions,
  dot,
  leadSingleLine = false,
}: StorySectionProps) {
  const autoId = useId()
  const headingId = `${id ?? autoId.replace(/:/g, '')}-title`
  const night = tone === 'night'
  const center = align === 'center'

  return (
    <section
      id={id}
      aria-labelledby={title ? headingId : undefined}
      className={cn(
        'relative scroll-mt-28 py-gob-8 min-[905px]:py-24',
        tone === 'night' && 'story-night',
        tone === 'mist' && 'story-mist',
        tone === 'paper' && 'story-paper',
        className,
      )}
    >
      <ContainerGRI size="portal">
        {eyebrow || title || lead ? (
          <Reveal
            className={cn(
              'mb-gob-7 flex flex-col gap-gob-4 min-[905px]:mb-gob-8',
              center ? 'mx-auto max-w-3xl items-center text-center' : 'min-[905px]:flex-row min-[905px]:items-end min-[905px]:justify-between',
            )}
          >
            <div className={cn('flex flex-col gap-gob-4', center ? 'items-center' : 'w-full items-start')}>
              {eyebrow ? (
                <EyebrowPill tone={tone} dot={dot}>
                  {eyebrow}
                </EyebrowPill>
              ) : null}
              {title ? (
                <h2
                  id={headingId}
                  className={cn('portal-h2 text-balance', center && 'text-center', night ? 'text-white' : 'text-gob-text')}
                >
                  {title}
                </h2>
              ) : null}
              {lead ? (
                <p
                  className={cn(
                    'max-w-none text-gri-body leading-[1.6] min-[600px]:text-[1.125rem]',
                    center && 'text-center',
                    leadSingleLine && 'min-[1100px]:whitespace-nowrap',
                    night ? 'text-white/92' : 'text-muted-foreground',
                  )}
                >
                  {lead}
                </p>
              ) : null}
            </div>
            {actions && !center ? <div className="flex shrink-0 flex-wrap gap-gob-3">{actions}</div> : null}
          </Reveal>
        ) : null}
        {children}
      </ContainerGRI>
    </section>
  )
}
