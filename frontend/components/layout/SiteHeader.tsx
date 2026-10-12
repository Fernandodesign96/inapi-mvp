'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useId, useRef, useState } from 'react'
import { ChevronDown, Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HeaderUtilities } from '@/components/layout/HeaderUtilities'
import {
  PORTAL_PRIMARY_NAV,
  PORTAL_SECONDARY_NAV,
  type BreadcrumbItem,
  type PortalNavId,
} from '@/lib/portal-routes'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export type SiteHeaderProps = {
  active?: PortalNavId
  breadcrumbs?: BreadcrumbItem[]
  pageTitle?: string
  pageSubtitle?: string
  variant?: 'home' | 'page'
}

function resolveActive(active: PortalNavId): PortalNavId | 'none' {
  if (active === 'home') return 'home'
  if (active === 'conecta') return 'none'
  return active
}

function SiteSearchForm({
  id,
  className,
  compact = false,
}: {
  id: string
  className?: string
  compact?: boolean
}) {
  const router = useRouter()
  const { tx } = useI18n()
  const [query, setQuery] = useState('')
  const searchLabel = tx('Buscar en el sitio')

  return (
    <form
      className={cn(
        'flex min-w-0 items-center',
        compact ? 'w-full max-w-[22rem] min-[905px]:max-w-[28rem]' : 'w-full max-w-[16rem]',
        className,
      )}
      role="search"
      onSubmit={e => {
        e.preventDefault()
        const q = query.trim()
        router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar')
      }}
    >
      <div className="relative w-full min-w-0">
        <label htmlFor={id} className="sr-only">
          {searchLabel}
        </label>
        <input
          id={id}
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={searchLabel}
          className={cn(
            'w-full pl-gob-4 pr-11 outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:border-gob-focus-contrast',
            compact
              ? 'home-search-input h-9 min-h-9 rounded-full border-0 bg-white text-gri-body-xs text-[#373737]'
              : 'h-11 min-h-11 rounded-gob-md border border-gob-border bg-card text-gri-body text-gob-text',
          )}
        />
        <Search
          className={cn(
            'pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#0051A8]',
            compact ? 'size-4' : 'size-5',
          )}
          aria-hidden
        />
      </div>
    </form>
  )
}

export function SiteHeader({
  active = 'home',
  breadcrumbs = [],
  pageTitle,
  pageSubtitle,
  variant = pageTitle ? 'page' : 'home',
}: SiteHeaderProps) {
  const { tx } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)
  const [openMenu, setOpenMenu] = useState<'marcas' | 'patentes' | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const navActive = resolveActive(active)
  const desktopSearchId = useId()
  const mobileSearchId = useId()
  const drawerSearchId = useId()

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenMenu(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const portalMenus: Record<'marcas' | 'patentes', { label: string; href: string }[]> = {
    marcas: [
      { label: 'Qué es una marca', href: '/marcas' },
      { label: 'Cómo registrar una marca', href: '/marcas/como-registrar' },
      { label: 'Sistema de Madrid', href: '/marcas/sistema-de-madrid' },
    ],
    patentes: [
      { label: 'Qué es una patente', href: '/patentes' },
      { label: 'Cómo registrar una patente', href: '/patentes/como-registrar' },
      { label: 'PCT', href: '/patentes/pct' },
    ],
  }

  const primaryNav = (
    <nav
      className={cn(
        'flex flex-nowrap items-center justify-center gap-gob-5 xl:gap-gob-7',
      )}
      aria-label="Secciones principales"
    >
      {PORTAL_PRIMARY_NAV.map(item => {
        if (item.id === 'marcas' || item.id === 'patentes') {
          const open = openMenu === item.id
          return (
            <div key={item.id} className="relative">
              <button
                type="button"
                aria-expanded={open}
                aria-current={navActive === item.id ? 'page' : undefined}
                onClick={() => setOpenMenu(open ? null : item.id)}
                className={cn(
                  'inline-flex items-center gap-1 text-gri-body-sm min-[905px]:text-gri-body font-medium leading-[1.5] border-b-[3px] pb-gob-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  navActive === item.id || open
                    ? 'border-gob-focus text-gob-text-inverse'
                    : 'border-transparent text-gob-text-inverse/78 hover:text-gob-text-inverse hover:border-white/40',
                )}
              >
                {item.label}
                <ChevronDown className="size-4" aria-hidden />
              </button>
              {open ? (
                <ul className="absolute left-1/2 top-full z-[80] mt-2 min-w-[16rem] -translate-x-1/2 rounded-gob-md border border-gob-border bg-card py-gob-2 text-gob-text shadow-elevation-04">
                  {portalMenus[item.id].map(link => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="block min-h-11 px-gob-4 py-gob-2 text-gri-body-sm hover:bg-gob-surface-elevated"
                        onClick={() => setOpenMenu(null)}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
          )
        }
        return (
          <Link
            key={item.id}
            href={item.href}
            aria-current={navActive === item.id ? 'page' : undefined}
            className={cn(
              'text-gri-body-sm min-[905px]:text-gri-body font-medium leading-[1.5] transition-colors border-b-[3px] pb-gob-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              navActive === item.id
                ? 'border-gob-focus text-gob-text-inverse'
                : 'border-transparent text-gob-text-inverse/90 hover:text-gob-text-inverse hover:border-white/40',
            )}
          >
            {item.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
    <header className="sticky top-0 z-50 w-full bg-transparent px-gob-4 pt-gob-3 pb-gob-3 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
      <div className="home-chrome-bar relative z-20 overflow-visible text-gob-text-inverse" ref={navRef}>
        <div className="mx-auto flex max-w-[1600px] items-center gap-gob-3 px-gob-4 py-gob-3 min-[600px]:gap-gob-5 min-[600px]:px-gob-5">
          <div className="flex min-w-0 shrink-0 items-center sm:min-w-[8.5rem] lg:min-w-[12rem]">
            <Link href="/" className="flex items-center gap-gob-3 shrink-0 min-w-0">
              <Image
                src="/inapi-mvp/inapi-logo.jpg"
                alt="INAPI — Instituto Nacional de Propiedad Industrial"
                width={120}
                height={48}
                className="h-11 w-auto object-contain"
                priority
              />
              <span className="hidden max-w-[180px] text-gri-body-sm font-medium leading-[1.5] text-gob-text-inverse/90 min-[1600px]:block">
                Instituto Nacional de Propiedad Industrial
              </span>
            </Link>
          </div>

          <div className="hidden min-w-0 flex-1 min-[768px]:flex min-[768px]:justify-center">
            {primaryNav}
          </div>

          <div className="ml-auto flex shrink-0 items-center justify-end gap-gob-1">
            <HeaderUtilities onNavigate={() => setMobileOpen(false)} />
            <Button
              variant="ghost"
              size="icon"
              className="min-[768px]:hidden text-gob-text-inverse hover:bg-white/10 shrink-0 size-10 min-[600px]:size-11"
              aria-label={tx('Abrir menú')}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen(true)}
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
            aria-label="Enlaces del portal"
          >
            {PORTAL_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-[0.75rem] font-medium leading-[1.5] text-white/88 transition-colors hover:text-white hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                {item.label}
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

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={tx('Menú de navegación')}
          className="fixed inset-0 z-[100] bg-inapi-portal-hero/98 backdrop-blur-md flex flex-col overflow-y-auto"
        >
          <div className="flex justify-between items-center p-gob-5 border-b border-white/10">
            <Image src="/inapi-mvp/inapi-logo.jpg" alt="INAPI" width={100} height={40} className="h-10 w-auto" />
            <Button
              variant="ghost"
              size="icon"
              className="text-gob-text-inverse min-h-11 min-w-11 hover:bg-white/10"
              aria-label={tx('Cerrar menú')}
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
          <nav className="flex flex-col gap-gob-1 p-gob-5">
            <p className="portal-kicker text-gob-text-inverse mb-gob-2">Buscar</p>
            <SiteSearchForm id={drawerSearchId} className="mb-gob-4 max-w-none" />
            <p className="portal-kicker text-gob-text-inverse mb-gob-2">Secciones</p>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-gob-3 min-h-11 text-gri-body font-medium text-gob-text-inverse"
            >
              Inicio
            </Link>
            {PORTAL_PRIMARY_NAV.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'py-gob-3 min-h-11 text-gri-body font-medium',
                  navActive === item.id ? 'text-gob-focus' : 'text-gob-text-inverse',
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/12 my-gob-4" />
            <p className="portal-kicker text-gob-text-inverse mb-gob-2">Más enlaces</p>
            {PORTAL_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-gob-3 min-h-11 text-gri-body text-gob-text-inverse/90"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
    {variant === 'page' && pageTitle ? (
      <div className="relative z-[1] border-b border-white/10">
        <div className="mx-auto max-w-[1600px] space-y-gob-4 px-gob-4 pt-gob-7 pb-gob-8 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
          {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} tone="inverse" />}
          <h1 className="portal-h1 text-gob-text-inverse">{pageTitle}</h1>
          {pageSubtitle ? <p className="portal-lead max-w-none text-gob-text-inverse">{pageSubtitle}</p> : null}
        </div>
      </div>
    ) : null}
    </>
  )
}
