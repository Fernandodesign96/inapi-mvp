'use client'

import { Suspense, useCallback, useState } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { Bell, Menu, Search } from 'lucide-react'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { HeaderUtilities, iconBtnLight } from '@/components/layout/HeaderUtilities'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { ScopeSwitch, SidebarBrand, TramitesSidebarNav } from '@/components/tramites/TramitesSidebar'
import { TramitesCommandPalette, useCommandShortcut } from '@/components/tramites/TramitesCommandPalette'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { NOTIFICACIONES } from '@/lib/tramites/mock-data'
import { resolveTramitesHeading } from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'

function TopbarCrumbs() {
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const meta = resolveTramitesHeading(pathname, searchParams.toString())
  if (pathname === '/tramites') return null
  return (
    <Breadcrumbs
      homeHref="/tramites"
      homeLabel="Trámites"
      items={[{ label: meta.title }]}
      className="min-w-0 flex-nowrap overflow-hidden text-gri-body-sm [&>span:last-child]:min-w-0 [&>span:last-child>span]:truncate"
    />
  )
}

export function TramitesTopbar() {
  const { tx } = useI18n()
  const { scope, setPrefs } = useDashboardPrefs()
  const [paletteOpen, setPaletteOpen] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const togglePalette = useCallback(() => setPaletteOpen(open => !open), [])
  useCommandShortcut(togglePalette)
  const count = NOTIFICACIONES.filter(n => n.dominio === scope).length

  return (
    <header className="sticky top-0 z-40 border-b border-gob-border bg-background/90 backdrop-blur-md">
      <div className="flex h-16 items-center gap-gob-3 px-gob-4 min-[905px]:px-gob-6">
        <button
          type="button"
          className={cn(iconBtnLight, 'lg:hidden')}
          aria-label={tx('Abrir menú de trámites')}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen(true)}
        >
          <Menu className="size-5" aria-hidden />
        </button>

        <div className="hidden min-w-0 flex-1 min-[600px]:block">
          <Suspense fallback={null}>
            <TopbarCrumbs />
          </Suspense>
        </div>

        <div className="ml-auto flex shrink-0 items-center gap-gob-1">
          <button
            type="button"
            onClick={() => setPaletteOpen(true)}
            aria-keyshortcuts="Control+K"
            aria-label={tx('Buscar un trámite (Ctrl + K)')}
            className="inline-flex min-h-11 items-center gap-gob-2 rounded-full border border-gob-border bg-card px-gob-3 text-gri-body-sm text-muted-foreground shadow-elevation-01 transition-colors hover:border-gob-primary/50 hover:text-gob-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus min-[905px]:w-64 min-[1240px]:w-80"
          >
            <Search className="size-4 shrink-0" aria-hidden />
            <span className="hidden flex-1 text-left min-[905px]:inline">{tx('Buscar un trámite')}</span>
            <kbd
              aria-hidden
              className="hidden rounded-gob-sm border border-gob-border bg-gob-surface-elevated px-1.5 font-sans text-[0.6875rem] font-semibold text-gob-text/75 min-[905px]:inline"
            >
              Ctrl K
            </kbd>
          </button>
          <Link
            href={`/tramites/notificaciones?ambito=${scope}`}
            className={cn(iconBtnLight, 'relative')}
            aria-label={`${tx('Mis Notificaciones')}: ${count} ${tx('avisos')}`}
          >
            <Bell className="size-5" strokeWidth={2.25} aria-hidden />
            <span
              aria-hidden
              className="story-tabular absolute right-1 top-1 inline-flex min-w-[1.125rem] items-center justify-center rounded-full bg-gob-accent px-1 text-[0.625rem] font-bold leading-[1.125rem] text-white"
            >
              {count}
            </span>
          </Link>
          <HeaderUtilities tone="light" third="profile" />
        </div>
      </div>

      <TramitesCommandPalette open={paletteOpen} onOpenChange={setPaletteOpen} />

      <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
        <SheetContent side="left" className="flex w-[19rem] flex-col gap-0 overflow-y-auto bg-card p-0">
          <SheetTitle className="sr-only">{tx('Menú de trámites')}</SheetTitle>
          <SheetDescription className="sr-only">{tx('Navega por las categorías del Portal de trámites.')}</SheetDescription>
          <div className="story-night guilloche">
            <SidebarBrand />
          </div>
          <ScopeSwitch scope={scope} onChange={next => setPrefs({ scope: next })} />
          <div className="flex min-h-0 flex-1 flex-col overflow-y-auto px-gob-3 py-gob-4">
            <TramitesSidebarNav onNavigate={() => setMenuOpen(false)} />
            <Link
              href="/"
              className="mt-auto flex min-h-11 items-center rounded-gob-md px-gob-3 text-gri-body-sm font-medium text-gob-link hover:bg-gob-surface-elevated"
              onClick={() => setMenuOpen(false)}
            >
              {tx('Volver al sitio informativo')}
            </Link>
          </div>
        </SheetContent>
      </Sheet>
    </header>
  )
}
