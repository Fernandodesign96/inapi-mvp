'use client'

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import {
  BadgeCheck,
  Bell,
  ChevronLeft,
  ChevronRight,
  CreditCard,
  FileClock,
  FilePenLine,
  FilePlus,
  FileSearch,
  FileText,
  FolderOpen,
  Globe,
  Layers,
  LayoutGrid,
  Lightbulb,
  List,
  Newspaper,
  Paperclip,
  Receipt,
  RefreshCw,
  Scale,
  Search,
  Shield,
  SlidersHorizontal,
  Tag,
  Wallet,
} from 'lucide-react'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import {
  categoryForPath,
  categoryItems,
  counterpartHref,
  pathOf,
  tramitesPath,
} from '@/lib/tramites/dashboard'
import type { TramitesDomain } from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'

const HIDE = new Set(['/tramites', '/tramites/auth', '/tramites/clave-unica'])

export type ScreenView = {
  id: string
  label: string
  icon?: 'cards' | 'table'
  pressed?: boolean
  onSelect: () => void
}

export type ScreenSubtab = {
  id: string
  label: string
  pressed?: boolean
  onSelect: () => void
}

type ChromeSlot = {
  views?: ScreenView[]
  subtabs?: ScreenSubtab[]
  filterEnabled?: boolean
  filterInline?: boolean
  filterOpen?: boolean
  onFilterToggle?: () => void
}

const ChromeContext = createContext<{
  slot: ChromeSlot
  setSlot: (slot: ChromeSlot) => void
}>({ slot: {}, setSlot: () => undefined })

export function TramitesChromeProvider({ children }: { children: React.ReactNode }) {
  const [slot, setSlot] = useState<ChromeSlot>({})
  const value = useMemo(() => ({ slot, setSlot }), [slot])
  return <ChromeContext.Provider value={value}>{children}</ChromeContext.Provider>
}

export function useTramitesChrome(slot: ChromeSlot, deps: unknown[] = []) {
  const { setSlot } = useContext(ChromeContext)
  useEffect(() => {
    setSlot(slot)
    return () => setSlot({})
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

function iconForHref(href: string) {
  const path = pathOf(href)
  if (path.includes('buscador') || path.includes('clasificador')) return Search
  if (path.includes('solicitar')) return FilePlus
  if (path.includes('notificaciones')) return Bell
  if (path.includes('guardadas') || path.includes('borrador')) return FileClock
  if (path.includes('pagos') || path.includes('pago')) return Wallet
  if (path.includes('escritos')) return Paperclip
  if (path.includes('certificados')) return BadgeCheck
  if (path.includes('estados-diarios') || path.includes('gaceta')) return Newspaper
  if (path.includes('documentos') || path.includes('formularios')) return FileText
  if (path.includes('libro') || path.includes('datos-abiertos')) return FolderOpen
  if (path.includes('tramites') || path.includes('anotaciones')) return Layers
  return FileSearch
}

function iconForSubtab(label: string) {
  const t = label.toLowerCase()
  if (t.includes('comprobante')) return Receipt
  if (t.includes('otros pagos') || t.includes('pago complementario')) return CreditCard
  if (t.includes('concesión') || t.includes('tasa') || t.includes('pago')) return Wallet
  if (t.includes('madrid')) return Globe
  if (t.includes('renov')) return RefreshCw
  if (t.includes('anotac') || t.includes('cambio')) return FilePenLine
  if (t.includes('escrito') || t.includes('adjunt')) return Paperclip
  if (t.includes('oposic')) return Scale
  if (t.includes('poder') || t.includes('custodia')) return Shield
  if (t.includes('diseño')) return Layers
  if (t.includes('tabla')) return List
  if (t.includes('tarjeta')) return LayoutGrid
  return FileSearch
}

export function TramitesScreenChrome() {
  const { tx } = useI18n()
  const pathname = tramitesPath(usePathname())
  const searchParams = useSearchParams()
  const { scope, setPrefs } = useDashboardPrefs()
  const { slot } = useContext(ChromeContext)
  const ambito = searchParams.get('ambito')
  const domain: TramitesDomain =
    ambito === 'patentes' || pathname.includes('/patentes')
      ? 'patentes'
      : ambito === 'marcas' || pathname.includes('/marcas')
        ? 'marcas'
        : scope

  useEffect(() => {
    if (HIDE.has(pathname) || domain === scope) return
    setPrefs({ scope: domain })
  }, [pathname, domain, scope, setPrefs])

  if (HIDE.has(pathname)) return null

  const marcasHref = counterpartHref(pathname, searchParams.toString(), 'marcas')
  const patentesHref = counterpartHref(pathname, searchParams.toString(), 'patentes')

  const category = categoryForPath(pathname)
  const shortcuts = category ? categoryItems(category.id, domain).filter(item => !item.external) : []
  const useSubtabs = Boolean(slot.subtabs?.length)
  const useViews = Boolean(slot.views?.length)
  const accent: TramitesDomain = domain === 'patentes' ? 'patentes' : 'marcas'
  const viewsOnTools = useSubtabs && useViews

  return (
    <div className="mx-auto w-full max-w-[1600px] px-gob-4 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
      <DragTabs aria-label={tx('Ámbito')}>
        <UnderlineTab
          pressed={domain === 'marcas'}
          accent="marcas"
          href={marcasHref}
          icon={<Tag className="size-4" aria-hidden />}
        >
          {tx('Marcas')}
        </UnderlineTab>
        <UnderlineTab
          pressed={domain === 'patentes'}
          accent="patentes"
          href={patentesHref}
          icon={<Lightbulb className="size-4" aria-hidden />}
        >
          {tx('Patentes')}
        </UnderlineTab>
      </DragTabs>

      <DragTabs aria-label={tx('Secciones de esta pantalla')}>
        {useSubtabs
          ? slot.subtabs!.map(tab => {
              const Icon = iconForSubtab(tab.label)
              return (
                <UnderlineTab
                  key={tab.id}
                  pressed={tab.pressed}
                  accent={accent}
                  onClick={tab.onSelect}
                  icon={<Icon className="size-4" aria-hidden />}
                >
                  {tx(tab.label)}
                </UnderlineTab>
              )
            })
          : useViews
            ? slot.views!.map(view => (
                <UnderlineTab
                  key={view.id}
                  pressed={view.pressed}
                  accent={accent}
                  onClick={view.onSelect}
                  icon={
                    view.icon === 'table' ? (
                      <List className="size-4" aria-hidden />
                    ) : (
                      <LayoutGrid className="size-4" aria-hidden />
                    )
                  }
                >
                  {tx(view.label)}
                </UnderlineTab>
              ))
            : shortcuts.map(item => {
                const Icon = iconForHref(item.href)
                const current = !item.external && pathOf(item.href) === pathname
                return (
                  <UnderlineTab
                    key={item.href + item.label}
                    pressed={current}
                    accent={accent}
                    href={item.href}
                    icon={<Icon className="size-4" aria-hidden />}
                  >
                    {tx(item.label)}
                  </UnderlineTab>
                )
              })}
      </DragTabs>

      {viewsOnTools || (slot.filterEnabled && !slot.filterInline) ? (
        <div className="flex flex-wrap items-center justify-end gap-gob-2 py-gob-2">
          {viewsOnTools
            ? slot.views!.map(view => (
                <button
                  key={view.id}
                  type="button"
                  aria-pressed={view.pressed}
                  onClick={view.onSelect}
                  className={cn(
                    'inline-flex min-h-10 items-center gap-gob-2 rounded-gob-md px-gob-3 text-gri-body-sm font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                    view.pressed ? 'bg-gob-surface-elevated text-gob-text' : 'text-muted-foreground hover:text-gob-text',
                  )}
                >
                  {view.icon === 'table' ? <List className="size-4" aria-hidden /> : <LayoutGrid className="size-4" aria-hidden />}
                  {tx(view.label)}
                </button>
              ))
            : null}
          {slot.filterEnabled && !slot.filterInline ? <FilterToggle /> : null}
        </div>
      ) : null}
    </div>
  )
}

function DragTabs({
  children,
  'aria-label': ariaLabel,
}: {
  children: React.ReactNode
  'aria-label': string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const drag = useRef({ active: false, startX: 0, scroll: 0, moved: false, pointerId: -1, suppressClick: false })
  const [hint, setHint] = useState({ left: false, right: false })

  const measure = () => {
    const el = ref.current
    if (!el) return
    setHint({
      left: el.scrollLeft > 4,
      right: el.scrollLeft + el.clientWidth < el.scrollWidth - 4,
    })
  }

  useEffect(() => {
    measure()
    const el = ref.current
    if (!el) return
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(measure) : null
    ro?.observe(el)
    el.addEventListener('scroll', measure, { passive: true })
    window.addEventListener('resize', measure)
    return () => {
      ro?.disconnect()
      el.removeEventListener('scroll', measure)
      window.removeEventListener('resize', measure)
    }
  }, [children])

  const nudge = (dir: -1 | 1) => {
    ref.current?.scrollBy({ left: dir * 200, behavior: 'smooth' })
  }

  return (
    <div className="relative min-w-0">
      {hint.left ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-14 bg-gradient-to-r from-[var(--story-mist)] to-transparent" aria-hidden />
          <button
            type="button"
            aria-label="Desplazar a la izquierda"
            className="absolute left-0 top-1/2 z-20 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-gob-border bg-card text-gob-text shadow-elevation-02 hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            onClick={() => nudge(-1)}
          >
            <ChevronLeft className="size-4" aria-hidden />
          </button>
        </>
      ) : null}
      {hint.right ? (
        <>
          <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-14 bg-gradient-to-l from-[var(--story-mist)] to-transparent" aria-hidden />
          <button
            type="button"
            aria-label="Desplazar a la derecha"
            className="absolute right-0 top-1/2 z-20 inline-flex size-8 -translate-y-1/2 items-center justify-center rounded-full border border-gob-border bg-card text-gob-text shadow-elevation-02 hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            onClick={() => nudge(1)}
          >
            <ChevronRight className="size-4" aria-hidden />
          </button>
        </>
      ) : null}
      <div
        ref={ref}
        role="tablist"
        aria-label={ariaLabel}
        onDragStart={e => {
          e.preventDefault()
        }}
        onPointerDown={e => {
          if ((e.target as HTMLElement).closest('button[aria-label^="Desplazar"]')) return
          if (e.pointerType === 'mouse' && e.button !== 0) return
          const el = ref.current
          if (!el) return
          drag.current = { active: true, startX: e.clientX, scroll: el.scrollLeft, moved: false, pointerId: e.pointerId, suppressClick: false }
        }}
        onPointerMove={e => {
          const state = drag.current
          const el = ref.current
          if (!state.active || !el) return
          const dx = e.clientX - state.startX
          if (Math.abs(dx) > 6) {
            state.moved = true
            e.preventDefault()
            if (!el.hasPointerCapture(state.pointerId)) el.setPointerCapture(state.pointerId)
            el.scrollLeft = state.scroll - dx
          }
        }}
        onPointerUp={e => {
          const el = ref.current
          if (el?.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId)
          const state = drag.current
          state.active = false
          if (state.moved) {
            state.suppressClick = true
            requestAnimationFrame(() => {
              state.suppressClick = false
              state.moved = false
            })
          }
        }}
        onPointerCancel={() => {
          drag.current.active = false
          drag.current.moved = false
        }}
        onWheel={e => {
          const el = ref.current
          if (!el || el.scrollWidth <= el.clientWidth) return
          if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) el.scrollLeft += e.deltaY
        }}
        onClickCapture={e => {
          if (drag.current.suppressClick || drag.current.moved) {
            e.preventDefault()
            e.stopPropagation()
            drag.current.moved = false
            drag.current.suppressClick = false
          }
        }}
        className="flex cursor-grab touch-pan-x select-none flex-nowrap overflow-x-auto border-b border-gob-border active:cursor-grabbing [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden [&_a]:[-webkit-user-drag:none]"
      >
        {children}
      </div>
    </div>
  )
}

function UnderlineTab({
  pressed,
  href,
  onClick,
  children,
  icon,
  accent,
}: {
  pressed?: boolean
  href?: string
  onClick?: () => void
  children: React.ReactNode
  icon: React.ReactNode
  accent: 'marcas' | 'patentes'
}) {
  const router = useRouter()
  const className = cn(
    'inline-flex min-h-11 shrink-0 items-center gap-gob-2 border-b-2 px-gob-4 text-gri-body-sm font-medium whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
    pressed
      ? accent === 'marcas'
        ? 'border-inapi-marcas-accent bg-inapi-marcas-surface text-gob-text'
        : 'border-gob-primary bg-gob-primary/10 text-gob-primary-dark dark:text-white dark:bg-gob-primary/25'
      : 'border-transparent text-muted-foreground hover:text-gob-text',
  )
  return (
    <button
      type="button"
      role="tab"
      aria-selected={pressed}
      draggable={false}
      onDragStart={e => e.preventDefault()}
      onClick={() => {
        if (href) router.push(href)
        onClick?.()
      }}
      className={className}
    >
      {icon}
      {children}
    </button>
  )
}

function FilterToggle() {
  const { tx } = useI18n()
  const { slot } = useContext(ChromeContext)
  return (
    <button
      type="button"
      aria-expanded={slot.filterOpen}
      onClick={slot.onFilterToggle}
      className={cn(
        'inline-flex min-h-10 shrink-0 items-center gap-gob-2 rounded-gob-md border border-gob-border bg-card px-gob-3 text-gri-body-sm font-medium text-gob-text hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
        slot.filterOpen && 'border-gob-text ring-1 ring-gob-text/20',
      )}
    >
      <SlidersHorizontal className="size-4" aria-hidden />
      {tx('Filtros')}
    </button>
  )
}

export function FilterActionBar({ children }: { children?: React.ReactNode }) {
  const { slot } = useContext(ChromeContext)
  return (
    <div className="flex min-h-11 items-center gap-gob-3">
      {children}
      <div className="h-px min-w-gob-6 flex-1 bg-gob-border" aria-hidden />
      {slot.filterEnabled ? <FilterToggle /> : null}
    </div>
  )
}
