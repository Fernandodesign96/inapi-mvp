'use client'

import Link from 'next/link'
import { Check } from 'lucide-react'
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
}: {
  pressed?: boolean
  onClick?: () => void
  children: React.ReactNode
  href?: string
}) {
  const className = cn(
    'inline-flex min-h-9 items-center rounded-gob-md px-gob-3 text-gri-body-xs font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
    pressed
      ? 'bg-gob-surface-elevated text-gob-text dark:bg-white/10 dark:text-white'
      : 'text-muted-foreground hover:bg-gob-surface-elevated hover:text-gob-text dark:hover:bg-white/8 dark:hover:text-white',
  )
  if (href) {
    return (
      <Link href={href} className={className} aria-current={pressed ? 'page' : undefined}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" aria-pressed={pressed} onClick={onClick} className={className}>
      {children}
    </button>
  )
}

export function ControlChipRow({ label, children }: { label?: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-1">
      {label ? <span className="mr-gob-2 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-muted-foreground">{label}</span> : null}
      {children}
    </div>
  )
}

export function HelperCard({
  title,
  children,
  tone = 'paper',
}: {
  title: string
  children: React.ReactNode
  tone?: 'paper' | 'night'
}) {
  return (
    <section
      className={cn(
        'rounded-gob-lg p-gob-5',
        tone === 'night' ? 'story-night text-white shadow-elevation-03' : 'border border-gob-border bg-card shadow-elevation-01',
      )}
    >
      <h2 className={cn('font-heading text-gri-body-sm font-semibold', tone === 'night' ? 'text-white' : 'text-gob-text')}>{title}</h2>
      <div className={cn('mt-gob-3 space-y-gob-2 text-gri-body-sm leading-[1.55]', tone === 'night' ? 'text-white/80' : 'text-muted-foreground')}>
        {children}
      </div>
    </section>
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

export function RecordCard({
  kicker,
  title,
  body,
  meta,
  href,
  action,
  children,
}: {
  kicker?: string
  title: string
  body?: string
  meta?: React.ReactNode
  href?: string
  action?: React.ReactNode
  children?: React.ReactNode
}) {
  const inner = (
    <>
      <div className="flex flex-wrap items-start justify-between gap-gob-3">
        <div className="min-w-0 space-y-1">
          {kicker ? <p className="text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-muted-foreground">{kicker}</p> : null}
          <p className="font-heading text-gri-body font-medium text-gob-text">{title}</p>
          {body ? <p className="text-gri-body-sm leading-[1.5] text-muted-foreground">{body}</p> : null}
          {meta}
        </div>
        {action}
      </div>
      {children}
    </>
  )
  const className = 'story-card-hover-paper flex h-full flex-col gap-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01'
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
}: {
  items: { id: string; label: string; done?: boolean }[]
  current?: string
}) {
  return (
    <ol className="space-y-1">
      {items.map((item, i) => {
        const active = item.id === current
        return (
          <li
            key={item.id}
            className={cn(
              'flex items-center gap-gob-2 rounded-gob-md px-gob-2 py-1.5 text-gri-body-xs',
              active ? 'bg-gob-surface-elevated font-medium text-gob-text dark:bg-white/10 dark:text-white' : 'text-muted-foreground',
            )}
          >
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
