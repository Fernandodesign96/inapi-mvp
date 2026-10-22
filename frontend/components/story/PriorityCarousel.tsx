'use client'

import { useId, useState, type KeyboardEvent, type ReactNode } from 'react'
import { LayoutGroup, motion, useReducedMotion } from 'framer-motion'
import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { GuillocheBg } from '@/components/story/PiSeal'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export type PriorityItem = {
  id: string
  title: string
  lead: string
  items: string[]
  href: string
  cta: string
  eyebrow?: string
  icon?: ReactNode
  example?: string
  fact?: string
}

type Density = 'featured' | 'medium' | 'compact'
type SlotTone = 'night' | 'mist' | 'paper'

function rotate<T>(list: T[], step: number) {
  const len = list.length
  if (!len) return list
  const n = ((step % len) + len) % len
  return [...list.slice(n), ...list.slice(0, n)]
}

function toneClass(tone: SlotTone) {
  if (tone === 'night') return 'story-night text-white shadow-elevation-04'
  if (tone === 'mist') return 'bg-[#D7ECF8] text-[#092039] shadow-elevation-02 dark:bg-[#0B3A5C] dark:text-white'
  return 'border border-gob-border bg-card text-gob-text shadow-elevation-02'
}

function CardFace({
  item,
  density,
  tone,
  onSelect,
}: {
  item: PriorityItem
  density: Density
  tone: SlotTone
  onSelect?: () => void
}) {
  const { tx } = useI18n()
  const dark = tone === 'night'
  const mist = tone === 'mist'
  const bullets = density === 'featured' ? item.items : density === 'medium' ? item.items : []
  const body = (
    <>
      {tone === 'night' ? <GuillocheBg className="text-white opacity-40" /> : null}
      <div className="relative flex h-full flex-col gap-gob-2">
        <div className="mb-gob-1 flex items-center gap-gob-3">
          {item.icon ? (
            <span
              aria-hidden
              className={cn(
                'inline-flex shrink-0 items-center justify-center rounded-gob-md [&_svg]:size-5',
                density === 'featured' ? 'size-11' : 'size-9',
                dark ? 'bg-white/12 text-white' : mist ? 'bg-white/70 text-[#035E80]' : 'bg-gob-primary/10 text-gob-primary-dark',
              )}
            >
              {item.icon}
            </span>
          ) : null}
          {item.eyebrow ? (
            <span className={cn('text-gri-body-xs font-semibold uppercase tracking-[0.08em]', dark ? 'text-white/75' : 'text-muted-foreground')}>
              {tx(item.eyebrow)}
            </span>
          ) : null}
        </div>
        <h3
          className={cn(
            'font-heading font-medium leading-[1.35]',
            density === 'featured' ? 'text-[1.375rem]' : 'text-[1.0625rem]',
            dark ? 'text-white' : 'text-gob-text dark:text-inherit',
          )}
        >
          {tx(item.title)}
        </h3>
        {density !== 'compact' ? (
          <p className={cn('text-gri-body-sm leading-[1.55]', dark ? 'text-white/82' : 'text-muted-foreground dark:text-white/80')}>{tx(item.lead)}</p>
        ) : (
          <p className="line-clamp-2 text-gri-body-sm leading-[1.55] text-muted-foreground dark:text-white/80">{tx(item.lead)}</p>
        )}
        {bullets.length ? (
          <ul className="mt-gob-1 space-y-gob-2">
            {bullets.map(bullet => (
              <li key={bullet} className="flex gap-gob-2 text-gri-body-sm">
                <span aria-hidden className="mt-[0.55em] size-1.5 shrink-0 rounded-full bg-current opacity-60" />
                <span className={dark ? 'text-white/82' : 'text-gob-text/85 dark:text-white/85'}>
                  {density === 'featured' ? <RichLine text={tx(bullet)} /> : tx(bullet)}
                </span>
              </li>
            ))}
          </ul>
        ) : null}
        {density === 'featured' && item.example ? (
          <p className={cn('mt-gob-2 rounded-gob-md px-gob-3 py-gob-2 text-gri-body-xs', dark ? 'bg-white/10 text-white/85' : 'bg-white/70 text-muted-foreground')}>
            {tx(item.example)}
          </p>
        ) : null}
        {density === 'featured' && item.fact ? (
          <p className={cn('text-gri-body-sm font-medium', dark ? 'text-white' : 'text-gob-text')}>{tx(item.fact)}</p>
        ) : null}
        {density !== 'compact' ? (
          <span className={cn('mt-auto inline-flex items-center gap-gob-1 pt-gob-3 text-gri-body-sm font-medium', dark ? 'text-white' : 'text-gob-link')}>
            {tx(item.cta)}
            <ArrowUpRight className="size-4" aria-hidden />
          </span>
        ) : (
          <span className="sr-only">
            {tx('Ver detalle de')} {tx(item.title)}
          </span>
        )}
      </div>
    </>
  )

  const shell = cn(
    'relative flex h-full flex-col overflow-hidden rounded-gob-xl text-left transition-colors',
    density === 'featured' ? 'p-gob-6 min-[905px]:p-gob-7' : density === 'medium' ? 'p-gob-5' : 'p-gob-4',
    toneClass(tone),
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
  )

  if (density === 'featured') {
    return item.href.startsWith('http') ? (
      <a href={item.href} target="_blank" rel="noopener noreferrer" className={cn(shell, 'story-lift')}>
        {body}
      </a>
    ) : (
      <TramitesLink href={item.href} className={cn(shell, 'story-lift')}>
        {body}
      </TramitesLink>
    )
  }

  return (
    <button type="button" onClick={onSelect} className={cn(shell, 'w-full cursor-pointer hover:bg-[#D7ECF8] hover:text-[#092039] dark:hover:bg-[#0B3A5C] dark:hover:text-white')}>
      {body}
    </button>
  )
}

function RichLine({ text }: { text: string }) {
  const parts = text.split(/(\*\*.+?\*\*)/g)
  return (
    <>
      {parts.map((part, i) =>
        part.startsWith('**') && part.endsWith('**') ? (
          <strong key={i} className="font-semibold">
            {part.slice(2, -2)}
          </strong>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </>
  )
}

export function PriorityCarousel({
  items,
  label,
  layout = 'essentials',
}: {
  items: PriorityItem[]
  label: string
  layout?: 'essentials' | 'tools'
}) {
  const { tx } = useI18n()
  const reduce = useReducedMotion()
  const liveId = useId()
  const [featuredId, setFeaturedId] = useState(items[0]?.id)
  const [railIds, setRailIds] = useState(items.slice(1).map(item => item.id))
  const byId = new Map(items.map(item => [item.id, item]))
  const featured = byId.get(featuredId) ?? items[0]
  const rail = railIds.map(id => byId.get(id)).filter((item): item is PriorityItem => Boolean(item))
  const duration = reduce ? 0 : 0.35

  const promote = (id: string) => {
    if (id === featuredId) return
    setRailIds(prev => {
      const index = prev.indexOf(id)
      if (index < 0) return prev
      const next = [...prev]
      next[index] = featuredId
      return next
    })
    setFeaturedId(id)
  }

  const shiftRail = (step: number) => setRailIds(prev => rotate(prev, step))

  const handleKey = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'ArrowRight') {
      event.preventDefault()
      shiftRail(layout === 'essentials' ? -1 : 1)
    } else if (event.key === 'ArrowLeft') {
      event.preventDefault()
      shiftRail(layout === 'essentials' ? 1 : -1)
    }
  }

  const card = (item: PriorityItem, density: Density, tone: SlotTone) => (
    <motion.div key={item.id} layout={!reduce} transition={{ duration, ease: [0.22, 1, 0.36, 1] }} className="h-full min-w-0">
      <CardFace item={item} density={density} tone={tone} onSelect={() => promote(item.id)} />
    </motion.div>
  )

  const arrows = (
    <div className="flex items-center justify-end gap-gob-2">
      <button
        type="button"
        onClick={() => shiftRail(layout === 'essentials' ? 1 : -1)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-gob-border bg-card text-gob-text hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        aria-label={tx('Tarjeta anterior')}
      >
        <ChevronLeft className="size-5" aria-hidden />
      </button>
      <button
        type="button"
        onClick={() => shiftRail(layout === 'essentials' ? -1 : 1)}
        className="inline-flex size-11 items-center justify-center rounded-full border border-gob-border bg-card text-gob-text hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        aria-label={tx('Tarjeta siguiente')}
      >
        <ChevronRight className="size-5" aria-hidden />
      </button>
    </div>
  )

  if (layout === 'tools') {
    const slots: { item: PriorityItem; density: Density; tone: SlotTone }[] = [
      { item: featured, density: 'featured', tone: 'night' },
      { item: rail[0] ?? featured, density: 'medium', tone: 'mist' },
      { item: rail[1] ?? featured, density: 'compact', tone: 'paper' },
    ]
    return (
      <LayoutGroup>
        <div role="group" aria-label={label} tabIndex={0} onKeyDown={handleKey} className="flex flex-col gap-gob-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus">
          {arrows}
          <div className="grid gap-gob-4 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)_minmax(0,0.7fr)]">
            {slots.map(slot => card(slot.item, slot.density, slot.tone))}
          </div>
        </div>
      </LayoutGroup>
    )
  }

  const top = rail.slice(0, 2)
  const bottom = rail.slice(2, 4)

  return (
    <LayoutGroup>
      <div role="group" aria-label={label} tabIndex={0} onKeyDown={handleKey} className="flex flex-col gap-gob-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus">
        {arrows}
        <div className="grid gap-gob-4 min-[1100px]:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] min-[1100px]:items-stretch">
          <div id={liveId} aria-live="polite" className="min-h-[22rem]">
            {card(featured, 'featured', 'night')}
          </div>
          <div className="hidden min-h-0 min-[1100px]:flex min-[1100px]:flex-col min-[1100px]:gap-gob-4">
            <div className="grid min-h-[12.5rem] flex-1 grid-cols-2 gap-gob-4">
              {top.map(item => card(item, 'medium', 'paper'))}
            </div>
            <div className="grid min-h-[7.5rem] grid-cols-2 gap-gob-4">
              {bottom.map(item => card(item, 'compact', 'paper'))}
            </div>
          </div>
        </div>
        <div className="flex snap-x snap-mandatory gap-gob-3 overflow-x-auto pb-gob-2 min-[1100px]:hidden [scrollbar-width:thin]">
          {rail.map(item => (
            <div key={`m-${item.id}`} className="w-[min(18rem,80vw)] shrink-0 snap-start">
              {card(item, 'medium', 'paper')}
            </div>
          ))}
        </div>
      </div>
    </LayoutGroup>
  )
}
