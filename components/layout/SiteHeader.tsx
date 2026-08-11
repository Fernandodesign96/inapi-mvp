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
  /** Ítem activo en la barra principal */
  active?: PortalNavId
  /** Migas de pan (sin incluir Inicio) */
  breadcrumbs?: BreadcrumbItem[]
  /** Título de página interior (omitir en home) */
  pageTitle?: string
  pageSubtitle?: string
  /** Home: sin título ni migas debajo del buscador */
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
      className={cn('flex items-center gap-gob-3', className)}
      role="search"
      onSubmit={e => {
        e.preventDefault()
        const q = query.trim()
        router.push(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar')
      }}
    >
      <div className="relative flex-1 min-w-[200px] max-w-md">
        <label htmlFor="site-search" className="sr-only">
          Buscar en el sitio
        </label>
        <input
          id="site-search"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Buscar en el sitio"
          className="w-full h-11 pl-gob-4 pr-11 border border-gob-border bg-background text-gob-text text-gri-body-sm outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        />
        <Search
          className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none"
          aria-hidden
        />
      </div>
      <Button
        className="hidden sm:inline-flex rounded-none bg-inapi-cta hover:bg-[#003B8D] text-gob-text-inverse font-bold uppercase tracking-wide text-gri-body-sm h-11 px-gob-5 shrink-0"
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
      {/* Barra principal — logo + navegación */}
      <div className="bg-inapi-portal-nav text-gob-text-inverse">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-3 flex items-center justify-between gap-gob-4">
          <Link href="/" className="flex items-center gap-gob-3 shrink-0 min-w-0">
            <Image
              src="/inapi-mvp/inapi-logo.jpg"
              alt="INAPI — Instituto Nacional de Propiedad Industrial"
              width={120}
              height={48}
              className="h-11 w-auto object-contain"
              priority
            />
            <span className="hidden xl:block text-gri-body-xs font-semibold leading-tight text-gob-text-inverse/90 max-w-[160px]">
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
                  'text-[11px] xl:text-gri-body-xs font-bold uppercase tracking-wide transition-colors border-b-2 pb-1 whitespace-nowrap',
                  navActive === item.id
                    ? 'border-inapi-marcas-accent text-gob-text-inverse'
                    : 'border-transparent text-gob-text-inverse/85 hover:text-gob-text-inverse',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-gob-text-inverse hover:bg-white/10 shrink-0"
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="w-6 h-6" />
          </Button>
        </div>
      </div>

      {/* Subheader — enlaces secundarios */}
      <div className="bg-inapi-portal-subnav border-b border-gob-border/80 hidden md:block">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-2">
          <nav
            className="flex flex-wrap items-center gap-x-gob-4 gap-y-1"
            aria-label="Enlaces del portal"
          >
            {PORTAL_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                className="text-[11px] min-[905px]:text-gri-body-xs font-bold uppercase tracking-wide text-gob-primary hover:text-gob-primary-dark transition-colors whitespace-nowrap"
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>
      </div>

      {/* Buscador + iniciar sesión */}
      <div className="border-b border-gob-border bg-background">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-3 flex justify-end">
          <SiteSearchBar />
        </div>
      </div>

      {/* Migas + título de página interior */}
      {variant === 'page' && pageTitle && (
        <div className="bg-background border-b border-gob-border">
          <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-4 space-y-gob-3">
            {breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
            <h1 className="font-heading text-2xl min-[600px]:text-[2rem] font-bold leading-snug text-gob-text">
              {pageTitle}
            </h1>
            {pageSubtitle && (
              <p className="text-gri-body text-muted-foreground max-w-3xl leading-relaxed">{pageSubtitle}</p>
            )}
          </div>
        </div>
      )}

      {/* Menú móvil */}
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
              className="text-gob-text-inverse"
              aria-label="Cerrar menú"
              onClick={() => setMobileOpen(false)}
            >
              <X className="w-7 h-7" />
            </Button>
          </div>
          <nav className="flex flex-col gap-gob-1 p-gob-5">
            <p className="text-gri-body-xs font-bold uppercase tracking-wider text-gob-text-inverse/50 mb-gob-2">
              Secciones
            </p>
            <Link
              href="/"
              onClick={() => setMobileOpen(false)}
              className="py-gob-2 text-base font-bold text-gob-text-inverse"
            >
              Inicio
            </Link>
            {PORTAL_PRIMARY_NAV.map(item => (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className={cn(
                  'py-gob-2 text-base font-bold',
                  navActive === item.id ? 'text-gob-focus' : 'text-gob-text-inverse',
                )}
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-gob-3" />
            <p className="text-gri-body-xs font-bold uppercase tracking-wider text-gob-text-inverse/50 mb-gob-2">
              Más enlaces
            </p>
            {PORTAL_SECONDARY_NAV.map(item => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="py-gob-2 text-gri-body-sm text-gob-text-inverse/90"
              >
                {item.label}
              </Link>
            ))}
            <div className="border-t border-white/10 my-gob-3 pt-gob-3">
              <Link
                href="/auth"
                onClick={() => setMobileOpen(false)}
                className="inline-flex w-full justify-center rounded-none bg-inapi-cta hover:bg-[#003B8D] text-gob-text-inverse font-bold py-gob-3 px-gob-4 uppercase tracking-wide text-gri-body-sm"
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
