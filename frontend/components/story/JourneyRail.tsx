import { BadgeCheck, Check, ClipboardCheck, CreditCard, ExternalLink, Inbox, Lock, Newspaper, Scale, Search } from 'lucide-react'
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
  date?: string
  flag?: string
}

/** Timeline de expediente: el ícono va primero y la línea solo corre entre pasos. */
export function CompactProcessTimeline({
  steps,
  label = 'Etapas',
  accent = 'danger',
}: {
  steps: JourneyStep[]
  label?: string
  accent?: 'danger' | 'info' | 'success'
}) {
  const currentClass =
    accent === 'success'
      ? 'border-gob-success bg-gob-success text-white'
      : accent === 'info'
        ? 'border-gob-primary bg-gob-primary text-white'
        : 'border-gob-danger bg-gob-danger text-white'
  const currentText =
    accent === 'success' ? 'text-gob-success' : accent === 'info' ? 'text-gob-primary-dark' : 'text-gob-danger'
  return (
    <ol aria-label={label} className="flex w-full items-start overflow-x-auto pb-1">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        const status = step.status ?? 'pending'
        const done = status === 'done'
        const current = status === 'current'
        return (
          <li key={step.title} className={cn('flex min-w-0 items-start', last ? 'shrink-0' : 'min-w-0 flex-1')}>
            <div className="flex w-[4.5rem] shrink-0 flex-col items-center gap-1">
              <span
                aria-hidden
                className={cn(
                  'inline-flex size-7 items-center justify-center rounded-full border-2 text-[0.625rem] font-semibold',
                  done && 'border-gob-success bg-gob-success text-white',
                  current && currentClass,
                  !done && !current && 'border-gob-border bg-muted text-muted-foreground',
                )}
              >
                {done ? <Check className="size-3.5" strokeWidth={3} /> : index + 1}
              </span>
              <p
                className={cn(
                  'line-clamp-2 text-center text-[0.5625rem] font-medium leading-tight',
                  current ? currentText : done ? 'text-gob-success' : 'text-muted-foreground',
                )}
              >
                {step.title}
              </p>
            </div>
            {last ? null : (
              <span aria-hidden className={cn('mt-3.5 h-0.5 min-w-2 flex-1', done ? 'bg-gob-success' : 'bg-gob-border')} />
            )}
          </li>
        )
      })}
    </ol>
  )
}

const ETAPA_ICONS = [Inbox, ClipboardCheck, Newspaper, Scale, Search, BadgeCheck, CreditCard]

export function ExpedienteTimeline({
  steps,
  label = 'Etapas de la solicitud',
  accent = 'info',
}: {
  steps: JourneyStep[]
  label?: string
  accent?: 'danger' | 'info' | 'success'
}) {
  const currentRing =
    accent === 'success'
      ? 'border-gob-success bg-gob-success-bg text-gob-success'
      : accent === 'danger'
        ? 'border-gob-warning bg-gob-warning-bg text-gob-warning'
        : 'border-gob-primary bg-gob-info-bg text-gob-primary-dark'
  return (
    <ol aria-label={label} className="flex w-full items-start overflow-x-auto pt-1 pb-gob-2">
      {steps.map((step, index) => {
        const last = index === steps.length - 1
        const status = step.status ?? 'pending'
        const done = status === 'done'
        const current = status === 'current'
        const Icon = ETAPA_ICONS[index] ?? Inbox
        return (
          <li key={step.title} className={cn('flex min-w-0 items-start', last ? 'shrink-0' : 'min-w-0 flex-1')}>
            <div className="flex w-[6.5rem] shrink-0 flex-col items-center">
              <p
                className={cn(
                  'mb-1 min-h-4 text-center text-[0.625rem] font-semibold tabular-nums',
                  current ? 'text-gob-primary-dark' : done ? 'text-gob-success' : 'text-muted-foreground',
                )}
              >
                {step.date || '—'}
              </p>
              <span
                aria-hidden
                className={cn(
                  'inline-flex size-10 items-center justify-center rounded-full border-2',
                  done && 'border-gob-success bg-gob-success text-white',
                  current && currentRing,
                  !done && !current && 'border-gob-border bg-card text-muted-foreground',
                )}
              >
                {done ? <Check className="size-4" strokeWidth={3} /> : <Icon className="size-4" />}
              </span>
              <p
                className={cn(
                  'mt-1.5 line-clamp-2 text-center text-[0.625rem] font-medium leading-tight',
                  current ? 'text-gob-text' : done ? 'text-gob-success' : 'text-muted-foreground',
                )}
              >
                {step.title}
              </p>
              {current && step.flag ? (
                <p className="mt-2 max-w-[6.5rem] rounded-gob-sm bg-gob-warning-bg px-1.5 py-1 text-center text-[0.5625rem] leading-tight text-gob-text">
                  {step.flag}
                </p>
              ) : null}
            </div>
            {last ? null : (
              <span
                aria-hidden
                className={cn('mt-[2.15rem] h-1 min-w-2 flex-1 rounded-full', done ? 'bg-gob-success' : 'bg-gob-border')}
              />
            )}
          </li>
        )
      })}
    </ol>
  )
}

/** Línea de etapas informativa: no marca un expediente activo. */
export function CompactGuideTimeline({
  steps,
  label = 'Así funciona este trámite (guía, no es tu expediente)',
}: {
  steps: string[]
  label?: string
}) {
  return (
    <div className="space-y-gob-2">
      <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">{label}</p>
      <ol aria-label={label} className="flex w-full items-start">
        {steps.map((title, index) => {
          const last = index === steps.length - 1
          return (
            <li key={title} className={cn('flex min-w-0 items-start', last ? 'shrink-0' : 'min-w-0 flex-1')}>
              <div className="flex w-[4.75rem] shrink-0 flex-col items-center gap-1">
                <span
                  aria-hidden
                  className="inline-flex size-9 items-center justify-center rounded-full border-2 border-gob-border bg-card text-gri-body-sm font-semibold text-muted-foreground"
                >
                  {index + 1}
                </span>
                <p className="text-center text-[0.625rem] font-medium leading-tight text-gob-text">{title}</p>
              </div>
              {last ? null : <span aria-hidden className="mt-[1.125rem] h-0.5 min-w-3 flex-1 bg-gob-border" />}
            </li>
          )
        })}
      </ol>
    </div>
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
