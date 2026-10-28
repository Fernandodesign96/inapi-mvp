import { Check, ExternalLink, Lock } from 'lucide-react'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { Reveal } from '@/components/story/Reveal'
import type { StoryTone } from '@/components/story/EyebrowPill'
import { cn } from '@/lib/utils'

export type JourneyStep = {
  title: string
  body?: React.ReactNode
  href?: string
  cta?: string
  /** Lleva al Portal de trámites (abre otra plataforma). */
  tramites?: boolean
  requiresAuth?: boolean
  status?: 'done' | 'current' | 'pending'
  icon?: React.ReactNode
  meta?: string
}

/** Timeline de expediente: el ícono va primero y la línea solo corre entre pasos. */
export function CompactProcessTimeline({
  steps,
  label = 'Etapas',
}: {
  steps: JourneyStep[]
  label?: string
}) {
  return (
    <ol aria-label={label} className="flex w-full items-start">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        const status = step.status ?? 'pending'
        const done = status === 'done'
        const current = status === 'current'
        return (
          <li key={step.title} className={cn('flex min-w-0 items-start', last ? 'shrink-0' : 'min-w-0 flex-1')}>
            <div className="flex w-[4.75rem] shrink-0 flex-col items-center gap-1">
              <span
                aria-hidden
                className={cn(
                  'inline-flex size-9 items-center justify-center rounded-full border-2 text-gri-body-sm font-semibold',
                  done && 'border-gob-success bg-gob-success text-white',
                  current && 'border-gob-danger bg-gob-danger text-white',
                  !done && !current && 'border-gob-border bg-card text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : index + 1}
              </span>
              <p className="text-center text-[0.625rem] font-medium leading-tight text-gob-text">{step.title}</p>
            </div>
            {last ? null : <span aria-hidden className="mt-[1.125rem] h-0.5 min-w-3 flex-1 bg-gob-border" />}
          </li>
        )
      })}
    </ol>
  )
}

export function JourneyRail({
  steps,
  tone = 'paper',
  label = 'Pasos',
  className,
}: {
  steps: JourneyStep[]
  tone?: StoryTone
  label?: string
  className?: string
}) {
  const night = tone === 'night'
  const cols = steps.length >= 4 ? 'min-[1100px]:grid-cols-4' : steps.length === 3 ? 'min-[905px]:grid-cols-3' : 'min-[905px]:grid-cols-2'
  return (
    <ol aria-label={label} className={cn('relative grid gap-gob-5', cols, className)}>
      <span
        aria-hidden
        className={cn(
          'pointer-events-none absolute inset-x-[8%] top-[1.375rem] hidden h-px min-[1100px]:block',
          night ? 'bg-white/20' : 'bg-[var(--story-line)]',
          steps.length < 4 && 'min-[905px]:block',
        )}
      />
      {steps.map((step, index) => {
        const status = step.status ?? 'pending'
        const done = status === 'done'
        const current = status === 'current'
        return (
          <Reveal as="li" key={step.title} delay={index * 0.08} className="relative flex flex-col items-center gap-gob-3">
            <span
              aria-hidden
              className={cn(
                'story-tabular relative z-[1] inline-flex size-11 shrink-0 items-center justify-center rounded-full border-2 font-heading text-gri-body font-semibold',
                done && 'border-gob-success bg-gob-success text-white',
                current && (night ? 'border-gob-focus bg-gob-focus text-[#092039]' : 'border-inapi-header bg-inapi-header text-white'),
                !done && !current && (night ? 'border-white/30 bg-[var(--story-night)] text-white' : 'border-[var(--story-line)] bg-card text-gob-text'),
              )}
            >
              {done ? <Check className="size-5" /> : step.icon ? <span className="[&_svg]:size-5">{step.icon}</span> : index + 1}
            </span>
            <div
              className={cn(
                'flex w-full flex-1 flex-col gap-gob-2 rounded-gob-lg p-gob-5',
                night ? 'story-glass story-glass-interactive' : 'border border-gob-border bg-card shadow-elevation-01 story-card-hover-paper',
                current && !night && 'ring-2 ring-inapi-header/30',
              )}
            >
              {step.meta ? (
                <p className={cn('text-gri-body-xs font-semibold tabular-nums', night ? 'text-white/70' : 'text-muted-foreground')}>{step.meta}</p>
              ) : null}
              <h3 className={cn('font-heading text-[1.125rem] font-medium leading-[1.3] min-[905px]:text-[1.25rem]', night ? 'text-white' : 'text-gob-text')}>
                <span className="sr-only">Paso {index + 1}: </span>
                {step.title}
                {done ? <span className="sr-only"> (completado)</span> : current ? <span className="sr-only"> (paso actual)</span> : null}
              </h3>
              {step.body ? (
                <div className={cn('text-gri-body-sm leading-[1.6]', night ? 'text-white/80' : 'text-muted-foreground')}>{step.body}</div>
              ) : null}
              {step.href ? (
                <TramitesLink
                  href={step.href}
                  className={cn(
                    'mt-auto inline-flex min-h-11 items-center gap-gob-1 pt-gob-2 text-gri-body-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                    night ? 'text-white' : 'text-gob-link',
                  )}
                >
                  {step.cta ?? 'Ir al paso'}
                  {step.requiresAuth ? <Lock className="size-3.5" aria-label="Requiere ClaveÚnica" /> : null}
                  {step.tramites ? <ExternalLink className="size-3.5" aria-label="Portal de trámites" /> : null}
                </TramitesLink>
              ) : null}
            </div>
          </Reveal>
        )
      })}
    </ol>
  )
}
