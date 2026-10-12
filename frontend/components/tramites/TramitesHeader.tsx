'use client'

import { useEffect, useId, useRef, useState, useSyncExternalStore } from 'react'
import { createPortal } from 'react-dom'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { HeaderUtilities } from '@/components/layout/HeaderUtilities'
import { SiteSearchForm } from '@/components/layout/SiteSearchForm'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import {
  MARCAS_MEGA,
  PATENTES_MEGA,
  TRAMITES_SECONDARY_NAV,
  type MegaColumn,
} from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'

function MegaPanel({
  columns,
  accent,
  onNavigate,
}: {
  columns: MegaColumn[]
  accent: 'marcas' | 'patentes'
  onNavigate: () => void
}) {
  const { tx } = useI18n()
  const bar = accent === 'patentes' ? 'bg-gob-primary' : 'bg-gob-accent'
  return (
    <div className="overflow-hidden rounded-gob-lg border border-gob-border bg-card text-gob-text shadow-elevation-04">
      <div className={cn('h-1', bar)} />
      <div className="mx-auto grid max-w-[1140px] gap-gob-6 px-gob-4 py-gob-6 min-[600px]:px-gob-5 min-[905px]:grid-cols-4">
        {columns.map(col => (
          <div key={col.title} className="space-y-gob-3">
            <p className="text-gri-label font-semibold uppercase tracking-wider text-muted-foreground">{tx(col.title)}</p>
            <ul className="space-y-1">
              {col.items.map(item => {
                const className =
                  'flex min-h-11 items-center rounded-gob-sm px-gob-2 text-gri-body-sm font-medium text-gob-link hover:bg-gob-surface-elevated hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'
                const inner = item.external ? (
                  <a href={item.href} className={className} rel="noopener noreferrer" title={tx(item.tooltip)} onClick={onNavigate}>
                    {tx(item.label)}
                  </a>
                ) : (
                  <Link href={item.href} className={className} title={tx(item.tooltip)} onClick={onNavigate}>
                    {tx(item.label)}
                  </Link>
                )
                return (
                  <li key={item.href + item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>{inner}</TooltipTrigger>
                      <TooltipContent className="max-w-xs">{tx(item.tooltip)}</TooltipContent>
                    </Tooltip>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TramitesHeader() {
  const pathname = usePathname()
  return <TramitesHeaderInner key={pathname} />
}

function TramitesHeaderInner() {
  const { tx } = useI18n()
  const [open, setOpen] = useState<'marcas' | 'patentes' | null>(null)
  const [mobile, setMobile] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const marcasId = useId()
  const patentesId = useId()
  const desktopSearchId = useId()
  const mobileSearchId = useId()
  const drawerSearchId = useId()
  const [panelTop, setPanelTop] = useState(0)
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  )

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    const onDoc = (e: MouseEvent) => {
      const target = e.target as Node
      if (wrapRef.current?.contains(target) || panelRef.current?.contains(target)) return
      setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    document.addEventListener('mousedown', onDoc)
    return () => {
      window.removeEventListener('keydown', onKey)
      document.removeEventListener('mousedown', onDoc)
    }
  }, [])

  useEffect(() => {
    if (!open) return
    const update = () => {
      const rect = wrapRef.current?.getBoundingClientRect()
      if (rect) setPanelTop(rect.bottom + 8)
    }
    const frame = requestAnimationFrame(update)
    window.addEventListener('resize', update)
    window.addEventListener('scroll', update, true)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', update)
      window.removeEventListener('scroll', update, true)
    }
  }, [open])

  const navBtn = (id: 'marcas' | 'patentes', label: string, controls: string) => {
    const selected = open === id
    return (
      <button
        type="button"
        aria-expanded={selected}
        aria-controls={controls}
        onClick={() => setOpen(o => (o === id ? null : id))}
        className={cn(
          'inline-flex items-center gap-1 whitespace-nowrap border-b-[3px] pb-gob-1 text-gri-body-sm font-medium leading-[1.5] min-[905px]:text-gri-body focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
          selected
            ? 'border-gob-focus text-gob-text-inverse'
            : 'border-transparent text-gob-text-inverse/90 hover:border-white/40 hover:text-gob-text-inverse',
        )}
      >
        {label}
        <ChevronDown className="size-4" aria-hidden />
      </button>
    )
  }

  return (
    <header className="sticky top-0 z-[80] w-full overflow-visible bg-transparent px-gob-4 pt-gob-3 pb-gob-3 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
      <div className="relative z-[80]" ref={wrapRef}>
      <div className="home-chrome-bar text-gob-text-inverse">
        <div className="mx-auto flex max-w-[1600px] items-center gap-gob-3 px-gob-4 py-gob-3 min-[600px]:gap-gob-5 min-[600px]:px-gob-5">
          <div className="flex min-w-0 shrink-0 items-center sm:min-w-[8.5rem] lg:min-w-[12rem]">
            <Link
              href="/tramites"
              aria-label="Ir a la pantalla principal de trámites"
              className="flex min-w-0 shrink-0 items-center gap-gob-3"
            >
              <Image
                src="/inapi-mvp/inapi-logo.jpg"
                alt="INAPI — Instituto Nacional de Propiedad Industrial"
                width={120}
                height={48}
                className="h-11 w-auto object-contain"
                priority
              />
              <span className="hidden max-w-[180px] text-gri-body-sm font-medium leading-[1.5] text-gob-text-inverse/90 min-[1600px]:block">
                Trámites en línea
              </span>
            </Link>
          </div>

          <nav
            className="hidden min-w-0 flex-1 items-center justify-center gap-gob-5 min-[768px]:flex xl:gap-gob-7"
            aria-label="Atajos de trámites"
          >
            {navBtn('marcas', 'Marcas', marcasId)}
            {navBtn('patentes', 'Patentes', patentesId)}
          </nav>

          <div className="ml-auto flex shrink-0 items-center justify-end gap-gob-1">
            <HeaderUtilities third="profile" onNavigate={() => setMobile(false)} />
            <Button
              variant="ghost"
              size="icon"
              className="size-10 shrink-0 text-gob-text-inverse hover:bg-white/10 min-[600px]:size-11 min-[768px]:hidden"
              aria-label="Abrir menú de trámites"
              aria-expanded={mobile}
              onClick={() => setMobile(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-gob-2 hidden w-full min-[768px]:block">
        <div className="home-chrome-sub flex w-full items-center justify-between gap-x-gob-4 px-gob-5 py-gob-2 min-[905px]:px-gob-6">
          <nav
            className="flex min-w-0 flex-1 flex-nowrap items-center justify-start gap-x-gob-4 overflow-x-auto min-[905px]:gap-x-gob-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            aria-label="Enlaces de trámites"
          >
            {TRAMITES_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[0.75rem] font-medium leading-[1.5] text-white/88 underline-offset-4 transition-colors hover:text-white hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                {tx(item.label)}
              </Link>
            ))}
          </nav>
          <SiteSearchForm
            id={desktopSearchId}
            compact
            className="ml-auto w-48 shrink-0 min-[1100px]:w-64 min-[1440px]:w-80 min-[1600px]:w-[22rem]"
          />
        </div>
      </div>

      <div className="relative z-10 mt-gob-2 home-chrome-sub px-gob-4 py-gob-2 min-[768px]:hidden">
        <SiteSearchForm id={mobileSearchId} compact className="max-w-none" />
      </div>

      {mounted && open
        ? createPortal(
            <div
              ref={panelRef}
              id={open === 'marcas' ? marcasId : patentesId}
              className="fixed inset-x-0 z-[300] px-gob-4 min-[600px]:px-gob-5 min-[905px]:px-gob-8"
              style={{ top: panelTop }}
            >
              <MegaPanel
                columns={open === 'marcas' ? MARCAS_MEGA : PATENTES_MEGA}
                accent={open}
                onNavigate={() => setOpen(null)}
              />
            </div>,
            document.body,
          )
        : null}
      </div>

      {mobile ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de trámites"
          className="fixed inset-0 z-[100] flex flex-col overflow-y-auto bg-inapi-portal-hero/98 backdrop-blur-md"
        >
          <div className="flex items-center justify-between border-b border-white/10 p-gob-5">
            <Image src="/inapi-mvp/inapi-logo.jpg" alt="INAPI" width={100} height={40} className="h-10 w-auto" />
            <Button
              variant="ghost"
              size="icon"
              className="min-h-11 min-w-11 text-gob-text-inverse hover:bg-white/10"
              aria-label={tx('Cerrar menú')}
              onClick={() => setMobile(false)}
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
          <nav className="flex flex-col gap-gob-1 p-gob-5 text-gob-text-inverse">
            <p className="portal-kicker mb-gob-2 text-gob-text-inverse">{tx('Buscar')}</p>
            <SiteSearchForm id={drawerSearchId} className="mb-gob-4 max-w-none" />
            <p className="portal-kicker mb-gob-2 text-gob-text-inverse">{tx('Atajos')}</p>
            {TRAMITES_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="min-h-11 py-gob-3 text-gri-body font-medium"
                onClick={() => setMobile(false)}
              >
                {tx(item.label)}
              </Link>
            ))}
            <div className="my-gob-4 border-t border-white/12" />
            {[
              { title: 'Marcas', cols: MARCAS_MEGA },
              { title: 'Patentes', cols: PATENTES_MEGA },
            ].map(block => (
              <div key={block.title}>
                <p className="portal-kicker mb-gob-2 text-gob-text-inverse">{tx(block.title)}</p>
                {block.cols.flatMap(c => c.items).map(item =>
                  item.external ? (
                    <a
                      key={item.href + item.label}
                      href={item.href}
                      className="block min-h-11 py-gob-3 text-gri-body text-gob-text-inverse/90"
                      rel="noopener noreferrer"
                      onClick={() => setMobile(false)}
                    >
                      {tx(item.label)}
                    </a>
                  ) : (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      className="block min-h-11 py-gob-3 text-gri-body text-gob-text-inverse/90"
                      onClick={() => setMobile(false)}
                    >
                      {tx(item.label)}
                    </Link>
                  ),
                )}
              </div>
            ))}
            <Link href="/" className="min-h-11 py-gob-3 text-gri-body" onClick={() => setMobile(false)}>
              {tx('Volver al portal informativo')}
            </Link>
          </nav>
        </div>
      ) : null}
    </header>
  )
}
