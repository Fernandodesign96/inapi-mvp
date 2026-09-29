'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, Search, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import {
  PORTAL_PRIMARY_NAV,
  PORTAL_SECONDARY_NAV,
  type BreadcrumbItem,
  type PortalNavId,
} from '@/lib/portal-routes'
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

function SiteSearchBar({ className }: { className?: string }) {
  const router = useRouter()
  const [query, setQuery] = useState('')

  return (
    <form
      className={cn('flex items-center gap-gob-3 w-full min-[600px]:w-auto', className)}
      role="search"
      onSubmit={e => {
        e.preventDefault()
        const q = query.trim()
        router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar')
      }}
    >
      <div className="relative flex-1 min-w-0 min-[600px]:min-w-[240px] min-[600px]:max-w-md">
        <label htmlFor="site-search" className="sr-only">
          Buscar en el sitio
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar en el sitio"
          className="w-full h-11 min-h-11 pl-gob-4 pr-11 rounded-gob-md border border-gob-border bg-card text-gob-text text-gri-body outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:border-gob-focus-contrast"
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
          aria-hidden
        />
      </div>
      <Button
        size="form"
        className="hidden sm:inline-flex rounded-gob-md bg-gob-primary hover:bg-gob-primary-dark text-gob-text-inverse font-medium h-11 px-gob-5 shrink-0"
        asChild
      >
        <Link href="/auth">Iniciar sesión</Link>
      </Button>
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
  const [mobileOpen, setMobileOpen] = useState(false)
  const navActive = resolveActive(active)

  return (
    <header className="w-full bg-background border-b border-gob-border">
      <div className="bg-inapi-portal-nav text-gob-text-inverse">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-4 flex items-center justify-between gap-gob-4">
          <Link href="/" className="flex items-center gap-gob-3 shrink-0 min-w-0">
            <Image
              src="/inapi-mvp/inapi-logo.jpg"
              alt="INAPI — Instituto Nacional de Propiedad Industrial"
              width={120}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
            <span className="hidden xl:block text-gri-body-sm font-medium leading-[1.5] text-gob-text-inverse/90 max-w-[180px]">
              Instituto Nacional de Propiedad Industrial
            </span>
          </Link>

          <nav
            className="hidden lg:flex items-center gap-gob-4 xl:gap-gob-5 flex-wrap justify-end"
            aria-label="Secciones principales"
          >
            {PORTAL_PRIMARY_NAV.map(item => (
              <Link
                key={item.id}
                href={item.href}
                className={cn(
                  'text-gri-body-sm min-[905px]:text-gri-body font-medium leading-[1.5] transition-colors border-b-[3px] pb-gob-1 whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  navActive === item.id
                    ? 'border-gob-focus text-gob-text-inverse'
                    : 'border-transparent text-gob-text-inverse/78 hover:text-gob-text-inverse hover:border-white/40',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gob-text-inverse hover:bg-white/10 shrink-0 min-h-11 min-w-11"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      <div className="bg-inapi-portal-subnav border-b border-gob-border hidden md:block">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-3">
          <nav
            className="flex flex-wrap items-center gap-x-gob-5 gap-y-gob-2"
            aria-label="Enlaces del portal"
          >
            {PORTAL_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-gri-body-sm font-medium leading-[1.5] text-gob-link hover:text-gob-primary-dark hover:underline underline-offset-4 transition-colors whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      <div className="border-b border-gob-border bg-card">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-4 flex justify-end">
          <SiteSearchBar />
        </div>
      </div>

      {variant === 'page' && pageTitle && (
        <div className="bg-background border-b border-gob-border">
          <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-6 space-y-gob-4">
            {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
            <h1 className="portal-h2 text-gob-text">{pageTitle}</h1>
            {pageSubtitle && (
              <p className="portal-lead text-muted-foreground max-w-3xl">{pageSubtitle}</p>
            )}
          </div>
        </div>
      )}

      {mobileOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de navegación"
          className="fixed inset-0 z-[100] bg-inapi-portal-hero/98 backdrop-blur-md flex flex-col overflow-y-auto"
        >
          <div className="flex justify-between items-center p-gob-5 border-b border-white/10">
            <Image src="/inapi-mvp/inapi-logo.jpg" alt="INAPI" width={100} height={40} className="h-10 w-auto" />
            <Button
              variant="ghost"
              size="icon"
              className="text-gob-text-inverse min-h-11 min-w-11"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
          <nav className="flex flex-col gap-gob-1 p-gob-5">
            <p className="text-gri-body-sm font-medium uppercase tracking-wide text-gob-text-inverse/54 mb-gob-2">
              Secciones
            </p>
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
            <p className="text-gri-body-sm font-medium uppercase tracking-wide text-gob-text-inverse/54 mb-gob-2">
              Más enlaces
            </p>
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
            <div className="border-t border-white/12 my-gob-4 pt-gob-3">
              <Link
                href="/auth"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full min-h-11 items-center justify-center rounded-gob-md bg-gob-primary hover:bg-gob-primary-dark text-gob-text-inverse font-medium py-gob-3 px-gob-4 text-gri-btn"
              >
                Iniciar sesión
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
