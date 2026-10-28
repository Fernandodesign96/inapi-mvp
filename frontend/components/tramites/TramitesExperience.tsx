'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Check, ChevronDown } from 'lucide-react'
import { CompactProcessTimeline, type JourneyStep } from '@/components/story/JourneyRail'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { cn } from '@/lib/utils'

export function WorkSplit({
  main,
  aside,
}: {
  main: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <div className="grid items-start gap-gob-5 min-[1100px]:grid-cols-[minmax(0,1fr)_18.5rem]">
      <div className="min-w-0 space-y-gob-5">{main}</div>
      {aside ? <aside className="min-w-0 space-y-gob-4 min-[1100px]:sticky min-[1100px]:top-24">{aside}</aside> : null}
    </div>
  )
}

export function ControlChip({
  pressed,
  onClick,
  children,
  href,
  accent = 'neutral',
  className,
}: {
  pressed?: boolean
  onClick?: () => void
  children: React.ReactNode
  href?: string
  accent?: 'marcas' | 'patentes' | 'neutral'
  className?: string
}) {
  const chipClass = cn(
    'inline-flex min-h-10 min-w-[7.5rem] items-center justify-center rounded-full border px-gob-4 text-gri-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
    pressed
      ? accent === 'marcas'
        ? 'border-inapi-marcas-accent bg-inapi-marcas-surface text-gob-text'
        : accent === 'patentes'
          ? 'border-gob-primary bg-gob-primary text-white'
          : 'border-[var(--story-night)] bg-[var(--story-night)] text-white'
      : 'border-gob-border bg-card text-gob-text hover:border-gob-primary/50 hover:bg-gob-surface-elevated',
    className,
  )
  if (href) {
    return (
      <Link href={href} className={chipClass} aria-current={pressed ? 'page' : undefined}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={chipClass}>
      {children}
    </button>
  )
}

export function ControlChipRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div role="group" aria-label={label} className="flex flex-nowrap items-center gap-gob-2 overflow-x-auto pb-1 [scrollbar-width:thin]">
      {children}
    </div>
  )
}

export function HelperCard({
  title,
  children,
  tone = 'paper',
  collapsible = false,
  hint,
  sections,
}: {
  title: string
  children?: React.ReactNode
  tone?: 'paper' | 'night'
  collapsible?: boolean
  hint?: string
  sections?: { title: string; body: string }[]
}) {
  const night = tone === 'night'
  const [revealed, setRevealed] = useState(0)
  const headingClass = cn('font-heading text-gri-body-sm font-semibold', night ? 'text-white' : 'text-gob-text')
  const heading = <h2 className={headingClass}>{title}</h2>
  const shell = cn(
    'overflow-hidden rounded-gob-lg',
    night ? 'story-night text-white shadow-elevation-03' : 'border border-gob-border bg-card shadow-elevation-01',
  )
  const muted = night ? 'text-white/80' : 'text-muted-foreground'
  const rule = night ? 'border-white/15' : 'border-gob-border'

  if (sections?.length) {
    const next = sections[revealed]
    const fullyOpen = revealed >= sections.length
    const collapse = () => setRevealed(0)
    return (
      <section className={shell}>
        <button
          type="button"
          className="flex w-full items-start justify-between gap-gob-3 p-gob-5 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          aria-expanded={revealed > 0}
          onClick={() => (revealed > 0 ? collapse() : setRevealed(1))}
        >
          <span>
            <span className={headingClass}>{title}</span>
            {hint ? <p className={cn('mt-1 text-gri-body-xs', night ? 'text-white/70' : 'text-muted-foreground')}>{hint}</p> : null}
          </span>
          <ChevronDown
            className={cn('mt-0.5 size-4 shrink-0 opacity-70 transition-transform', revealed > 0 && 'rotate-180')}
            aria-hidden
          />
        </button>
        {sections.slice(0, revealed).map(section => (
          <div key={section.title} className={cn('space-y-gob-2 border-t px-gob-5 py-gob-4', rule)}>
            <h3 className={cn('font-heading text-gri-body-sm font-medium', night ? 'text-white' : 'text-gob-text')}>{section.title}</h3>
            <p className={cn('text-gri-body-sm leading-[1.55]', muted)}>{section.body}</p>
          </div>
        ))}
        {next ? (
          <button
            type="button"
            className={cn(
              'flex w-full min-h-11 items-center justify-between gap-gob-3 border-t px-gob-5 py-gob-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              rule,
            )}
            onClick={() => setRevealed(n => n + 1)}
          >
            <span className={cn('text-gri-body-sm font-medium', night ? 'text-white' : 'text-gob-text')}>{next.title}</span>
            <ChevronDown className="size-4 shrink-0 opacity-70" aria-hidden />
          </button>
        ) : fullyOpen ? (
          <button
            type="button"
            className={cn(
              'flex w-full min-h-11 items-center justify-between gap-gob-3 border-t px-gob-5 py-gob-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              rule,
            )}
            onClick={collapse}
          >
            <span className={cn('text-gri-body-sm font-medium', night ? 'text-white' : 'text-gob-text')}>Cerrar</span>
            <ChevronDown className="size-4 shrink-0 rotate-180 opacity-70" aria-hidden />
          </button>
        ) : null}
      </section>
    )
  }

  const body = (
    <div className={cn('space-y-gob-2 text-gri-body-sm leading-[1.55]', muted)}>{children}</div>
  )
  if (!collapsible) {
    return (
      <section className={cn(shell, 'p-gob-5')}>
        {heading}
        <div className="mt-gob-3">{body}</div>
      </section>
    )
  }
  return (
    <details className={cn(shell, 'p-gob-5')} open={false}>
      <summary className="flex cursor-pointer list-none items-start justify-between gap-gob-3 marker:content-none [&::-webkit-details-marker]:hidden">
        <span>
          {heading}
          {hint ? <span className={cn('mt-1 block text-gri-body-xs', night ? 'text-white/70' : 'text-muted-foreground')}>{hint}</span> : null}
        </span>
        <ChevronDown className="mt-0.5 size-4 shrink-0 opacity-70" aria-hidden />
      </summary>
      <div className={cn('mt-gob-3 border-t pt-gob-3', rule)}>{body}</div>
    </details>
  )
}

export function BulletList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-gob-2">
      {items.map(item => (
        <li key={item} className="flex gap-gob-2">
          <span aria-hidden className="mt-2 size-1.5 shrink-0 rounded-full bg-gob-primary" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

export function ChoiceCard({
  title,
  body,
  selected,
  onSelect,
  icon,
}: {
  title: string
  body: string
  selected?: boolean
  onSelect: () => void
  icon?: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onSelect}
      className={cn(
        'flex h-full flex-col gap-gob-2 rounded-gob-lg border p-gob-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
        selected
          ? 'border-[var(--story-night)] bg-[var(--story-night)] text-white dark:border-[#0F69C4] dark:bg-[#0F69C4]'
          : 'border-gob-border bg-card text-gob-text hover:border-gob-primary/40 hover:bg-gob-surface-elevated',
      )}
    >
      {icon ? (
        <span
          aria-hidden
          className={cn(
            'inline-flex size-10 items-center justify-center rounded-gob-md [&_svg]:size-5',
            selected ? 'bg-white/15 text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
          )}
        >
          {icon}
        </span>
      ) : null}
      <span className="font-heading text-gri-body font-medium">{title}</span>
      <span className={cn('text-gri-body-xs leading-[1.5]', selected ? 'text-white/80' : 'text-muted-foreground')}>{body}</span>
    </button>
  )
}

export function InfoStatCard({
  value,
  label,
  description,
}: {
  value: number | string
  label: string
  description: string
}) {
  return (
    <article className="min-w-[12rem] flex-1 rounded-gob-lg border-2 border-gob-border bg-card p-gob-4">
      <p className="font-heading text-[1.75rem] font-semibold leading-none tabular-nums text-gob-text">{value}</p>
      <p className="mt-gob-2 font-heading text-gri-body font-medium text-gob-text">{label}</p>
      <p className="mt-1 text-gri-body-sm leading-[1.5] text-gob-text/75">{description}</p>
    </article>
  )
}

export function FactList({
  items,
}: {
  items: { icon: React.ReactNode; label: string; value: React.ReactNode }[]
}) {
  return (
    <ul className="space-y-gob-3">
      {items.map(item => (
        <li key={item.label} className="flex items-start gap-gob-3">
          <span
            aria-hidden
            className="mt-0.5 inline-flex size-8 shrink-0 items-center justify-center rounded-gob-md text-gob-primary-dark [&_svg]:size-4"
          >
            {item.icon}
          </span>
          <div className="min-w-0">
            <p className="font-heading text-gri-body-sm font-semibold text-gob-text">{item.label}</p>
            <p className="mt-0.5 text-gri-body-sm leading-[1.5] text-gob-text/80">{item.value}</p>
          </div>
        </li>
      ))}
    </ul>
  )
}

export function RecordCard({
  kicker,
  title,
  body,
  meta,
  href,
  action,
  children,
  facts,
  stages,
}: {
  kicker?: string
  title: string
  body?: string
  meta?: React.ReactNode
  href?: string
  action?: React.ReactNode
  children?: React.ReactNode
  facts?: { icon: React.ReactNode; label: string; value: React.ReactNode }[]
  stages?: JourneyStep[]
}) {
  const inner = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-gob-3">
        <div className="min-w-0 space-y-gob-2">
          {kicker ? (
            <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-gob-primary-dark">{kicker}</p>
          ) : null}
          <p className="font-heading text-xl font-medium leading-tight text-gob-text">{title}</p>
          {body ? <p className="text-gri-body-sm leading-[1.55] text-gob-text/80">{body}</p> : null}
          {meta}
        </div>
        {action}
      </div>
      {facts && facts.length > 0 ? <FactList items={facts} /> : null}
      {stages && stages.length > 0 ? <CompactProcessTimeline steps={stages} label="Etapas del aviso" /> : null}
      {children}
    </>
  )
  const className = 'story-card-hover-paper flex h-full flex-col gap-gob-4 rounded-gob-lg border-2 border-gob-border bg-card p-gob-6'
  if (href) {
    return (
      <Link href={href} className={className}>
        {inner}
      </Link>
    )
  }
  return <article className={className}>{inner}</article>
}

export function Checklist({
  items,
  current,
  onSelect,
}: {
  items: { id: string; label: string; done?: boolean }[]
  current?: string
  onSelect?: (id: string) => void
}) {
  return (
    <ol className="space-y-1">
      {items.map((item, i) => {
        const active = item.id === current
        const className = cn(
          'flex w-full items-center gap-gob-2 rounded-gob-md px-gob-2 py-1.5 text-left text-gri-body-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
          active ? 'bg-gob-surface-elevated font-medium text-gob-text dark:bg-white/10 dark:text-white' : 'text-muted-foreground hover:bg-gob-surface-elevated/70 hover:text-gob-text',
        )
        const inner = (
          <>
            <span
              aria-hidden
              className={cn(
                'inline-flex size-5 items-center justify-center rounded-full text-[0.625rem]',
                item.done ? 'bg-gob-success text-white' : active ? 'bg-[var(--story-night)] text-white dark:bg-[#0F69C4]' : 'bg-gob-surface-elevated text-muted-foreground',
              )}
            >
              {item.done ? <Check className="size-3" strokeWidth={3} /> : i + 1}
            </span>
            {item.label}
          </>
        )
        return (
          <li key={item.id}>
            {onSelect ? (
              <button type="button" aria-current={active ? 'step' : undefined} className={className} onClick={() => onSelect(item.id)}>
                {inner}
              </button>
            ) : (
              <div className={className}>{inner}</div>
            )}
          </li>
        )
      })}
    </ol>
  )
}

export function CardCarousel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <StoryCarousel label={label} itemClassName="basis-[88%] min-[600px]:basis-1/2 min-[1100px]:basis-1/3">
      {children}
    </StoryCarousel>
  )
}
