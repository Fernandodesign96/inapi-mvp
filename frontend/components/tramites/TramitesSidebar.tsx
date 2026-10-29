'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ExternalLink,
  FilePen,
  FolderOpen,
  Home,
  PanelLeftClose,
  PanelLeftOpen,
  PenLine,
  Search,
  Wallet,
} from 'lucide-react'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import {
  TRAMITES_CATEGORIES,
  categoryForPath,
  categoryItems,
  counterpartHref,
  pathOf,
  scopeFromPath,
  tramitesPath,
  type TramitesCategoryId,
} from '@/lib/tramites/dashboard'
import { useSolicitudes } from '@/hooks/useSolicitudes'
import type { TramitesDomain } from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'
import { scopeFill, scopeSubItem } from '@/lib/tramites/scope-ui'

export const CATEGORY_ICONS: Record<TramitesCategoryId, React.ReactNode> = {
  herramientas: <Search />,
  tramitacion: <PenLine />,
  cambios: <FilePen />,
  pagos: <Wallet />,
  documentos: <FolderOpen />,
}

const rowBase =
  'group/row flex min-h-11 w-full items-center gap-gob-3 rounded-gob-md px-gob-3 text-gri-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&_svg]:size-[1.125rem] [&_svg]:shrink-0'

function rowClass(active: boolean, scope: TramitesDomain) {
  return cn(rowBase, scopeFill(scope, active))
}

function groupRowClass(on: boolean, scope: TramitesDomain) {
  return cn(
    'group/row flex min-h-11 w-full items-center gap-gob-3 rounded-gob-md text-gri-body-sm font-medium transition-colors [&_svg]:size-[1.125rem] [&_svg]:shrink-0',
    scopeFill(scope, on),
  )
}

export function ScopeSwitch({
  scope,
  onChange,
  className,
  collapsed = false,
}: {
  scope: TramitesDomain
  onChange: (scope: TramitesDomain) => void
  className?: string
  collapsed?: boolean
}) {
  const { tx } = useI18n()
  const router = useRouter()
  const pathname = usePathname()

  const go = (id: TramitesDomain) => {
    onChange(id)
    const search = typeof window !== 'undefined' ? window.location.search.replace(/^\?/, '') : ''
    const href = counterpartHref(pathname, search, id)
    const here = `${tramitesPath(pathname)}${search ? `?${search}` : ''}`
    if (href !== here) router.push(href)
  }

  if (collapsed) {
    return (
      <button
        type="button"
        onClick={() => go(scope === 'marcas' ? 'patentes' : 'marcas')}
        className={cn(
          'flex min-h-11 w-full items-center justify-center gap-gob-2 border-b border-gob-border text-gri-body-xs font-bold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gob-focus',
          scope === 'marcas' ? 'bg-inapi-marcas-accent text-white' : 'bg-gob-primary text-white',
          className,
        )}
        aria-label={tx(scope === 'marcas' ? 'Ámbito: Marcas. Cambiar a Patentes' : 'Ámbito: Patentes. Cambiar a Marcas')}
        title={tx(scope === 'marcas' ? 'Ámbito: Marcas. Cambiar a Patentes' : 'Ámbito: Patentes. Cambiar a Marcas')}
      >
        <span aria-hidden className={cn('size-2 rounded-full', scope === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary')} />
        {scope === 'marcas' ? 'M' : 'P'}
      </button>
    )
  }
  return (
    <div
      role="group"
      aria-label={tx('Ámbito de trámites')}
      className={cn('grid grid-cols-2 border-b border-gob-border bg-gob-surface-elevated dark:bg-[#121418]', className)}
    >
      {(['marcas', 'patentes'] as const).map(id => (
        <button
          key={id}
          type="button"
          aria-pressed={scope === id}
          onClick={() => go(id)}
          className={cn(
            'inline-flex min-h-11 items-center justify-center gap-gob-2 px-gob-3 text-gri-body-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gob-focus',
            scope === id
              ? id === 'marcas'
                ? 'bg-inapi-marcas-accent text-white'
                : 'bg-gob-primary text-white'
              : id === 'marcas'
                ? 'text-gob-text/80 hover:bg-inapi-marcas-surface hover:text-gob-text dark:text-white/80 dark:hover:bg-inapi-marcas-surface/30 dark:hover:text-white'
                : 'text-gob-text/80 hover:bg-gob-primary/10 hover:text-gob-text dark:text-white/80 dark:hover:bg-gob-primary/20 dark:hover:text-white',
          )}
        >
          <span
            aria-hidden
            className={cn(
              'size-2 rounded-full',
              id === 'marcas' ? 'bg-gob-accent' : scope === id ? 'bg-white' : 'bg-gob-primary',
            )}
          />
          {tx(id === 'marcas' ? 'Marcas' : 'Patentes')}
        </button>
      ))}
    </div>
  )
}

export function TramitesSidebarNav({
  collapsed = false,
  onNavigate,
}: {
  collapsed?: boolean
  onNavigate?: () => void
}) {
  const { tx } = useI18n()
  const pathname = tramitesPath(usePathname())
  const { scope, setPrefs } = useDashboardPrefs()
  const { items } = useSolicitudes()
  const activeCategory = categoryForPath(pathname)?.id
  const [groupOverrides, setGroupOverrides] = useState<Partial<Record<TramitesCategoryId, boolean>>>({})
  const pending = items.filter(n => n.dominio === scope && n.tone === 'required').length
  const isGroupOpen = (id: TramitesCategoryId) => groupOverrides[id] ?? activeCategory === id

  useEffect(() => {
    const fromPath = scopeFromPath(pathname, scope)
    if (fromPath !== scope) setPrefs({ scope: fromPath })
  }, [pathname, scope, setPrefs])

  const toggleGroup = (id: TramitesCategoryId) =>
    setGroupOverrides(prev => ({ ...prev, [id]: !(prev[id] ?? activeCategory === id) }))

  return (
    <nav aria-label={tx('Menú del Portal de trámites')} className="flex flex-col gap-gob-5">
      <ul className="flex flex-col gap-1 border-b border-gob-border pb-gob-4">
        <li>
          <Link
            href="/tramites"
            onClick={onNavigate}
            aria-current={pathname === '/tramites' ? 'page' : undefined}
            aria-label={collapsed ? tx('Inicio') : undefined}
            title={collapsed ? tx('Inicio') : undefined}
            className={cn(rowClass(pathname === '/tramites', scope), collapsed && 'justify-center px-0')}
          >
            <Home aria-hidden />
            {collapsed ? null : <span>{tx('Inicio')}</span>}
          </Link>
        </li>
        <li>
          <Link
            href={`/tramites/notificaciones?ambito=${scope}`}
            onClick={onNavigate}
            aria-current={pathname === '/tramites/notificaciones' ? 'page' : undefined}
            aria-label={collapsed ? `${tx('Mis Notificaciones')} (${pending})` : undefined}
            title={collapsed ? `${tx('Mis Notificaciones')} (${pending})` : undefined}
            className={cn(rowClass(pathname === '/tramites/notificaciones', scope), collapsed && 'relative justify-center px-0')}
          >
            <Bell aria-hidden />
            {collapsed ? (
              <span aria-hidden className="absolute right-2 top-1.5 size-2 rounded-full bg-gob-accent" />
            ) : (
              <>
                <span className="flex-1">{tx('Mis Notificaciones')}</span>
                <span
                  className={cn(
                    'story-tabular inline-flex min-w-6 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-bold leading-5',
                    pathname === '/tramites/notificaciones'
                      ? 'bg-white text-gob-text'
                      : scope === 'marcas'
                        ? 'bg-white/90 text-inapi-marcas-hover'
                        : 'bg-white/90 text-gob-primary-dark',
                  )}
                >
                  {pending}
                  <span className="sr-only"> {tx('avisos')}</span>
                </span>
              </>
            )}
          </Link>
        </li>
      </ul>

      <ul className="flex flex-col gap-1">
        {TRAMITES_CATEGORIES.map(cat => {
          const items = categoryItems(cat.id, scope)
          const open = isGroupOpen(cat.id) && !collapsed
          const groupId = `sidebar-group-${cat.id}`
          return (
            <li key={cat.id}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={collapsed ? undefined : groupId}
                aria-label={collapsed ? tx(cat.label) : `${tx(open ? 'Ocultar trámites de' : 'Mostrar trámites de')} ${tx(cat.label)}`}
                title={collapsed ? `${tx(cat.label)}: ${tx(cat.description)}` : undefined}
                onClick={() => {
                  if (collapsed) {
                    setPrefs({ collapsed: false })
                    setGroupOverrides(prev => ({ ...prev, [cat.id]: true }))
                    return
                  }
                  toggleGroup(cat.id)
                }}
                className={cn(groupRowClass(open, scope), 'w-full px-gob-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus', collapsed && 'justify-center px-0')}
              >
                {CATEGORY_ICONS[cat.id]}
                {collapsed ? null : <span className="min-w-0 flex-1 truncate">{tx(cat.label)}</span>}
                {collapsed ? null : (
                  <ChevronDown className={cn('size-4 shrink-0 transition-transform', open && 'rotate-180')} aria-hidden />
                )}
              </button>
              {open ? (
                <ul id={groupId} className="ml-[1.375rem] mt-1 flex flex-col border-l border-gob-border pl-gob-2">
                  {items.map(item => {
                    const itemPath = pathOf(item.href)
                    const itemActive = !item.external && itemPath === pathname && itemPath !== '/tramites/notificaciones'
                    const cls = cn(
                      'flex min-h-10 items-center gap-gob-2 rounded-gob-sm px-gob-2 py-1.5 text-gri-body-xs leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                      scopeSubItem(itemActive),
                    )
                    return (
                      <li key={item.href + item.label}>
                        {item.external ? (
                          <a
                            href={item.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cls}
                            onClick={onNavigate}
                            title={tx(item.tooltip)}
                          >
                            <span className="line-clamp-2 flex-1">{tx(item.label)}</span>
                            <ExternalLink className="size-3.5 shrink-0" aria-label={tx('Se abre en otra pestaña')} />
                          </a>
                        ) : (
                          <Link
                            href={item.href}
                            className={cls}
                            onClick={onNavigate}
                            aria-current={itemActive ? 'page' : undefined}
                            title={tx(item.tooltip)}
                          >
                            <span className="line-clamp-2 flex-1">{tx(item.label)}</span>
                          </Link>
                        )}
                      </li>
                    )
                  })}
                </ul>
              ) : null}
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export function SidebarBrand({ collapsed = false }: { collapsed?: boolean }) {
  const { tx } = useI18n()
  return (
    <Link
      href="/tramites"
      aria-label={tx('Ir a la pantalla principal de trámites')}
      className={cn(
        'relative flex min-h-12 min-w-0 items-center overflow-hidden text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gob-focus',
        collapsed ? 'justify-center px-gob-2 py-gob-3' : 'min-w-0 flex-1 gap-gob-3 px-gob-3 py-gob-3',
      )}
    >
      <Image
        src="/inapi-mvp/inapi-logo.jpg"
        alt=""
        width={96}
        height={38}
        className={cn('relative rounded-sm object-contain', collapsed ? 'h-7 w-auto max-w-10' : 'h-9 w-auto')}
        priority
      />
      {collapsed ? null : (
        <span className="relative truncate text-gri-body-sm font-semibold leading-none">{tx('Mis trámites')}</span>
      )}
    </Link>
  )
}

function SidebarHeader({ collapsed, onToggle }: { collapsed: boolean; onToggle: () => void }) {
  const { tx } = useI18n()
  return (
    <div
      className={cn(
        'story-night guilloche relative flex w-full overflow-hidden text-white',
        collapsed ? 'flex-col' : 'items-stretch',
      )}
    >
      <SidebarBrand collapsed={collapsed} />
      <button
        type="button"
        onClick={onToggle}
        aria-label={collapsed ? tx('Expandir menú') : tx('Contraer menú')}
        title={collapsed ? tx('Expandir menú') : tx('Contraer menú')}
        aria-expanded={!collapsed}
        className={cn(
          'inline-flex shrink-0 items-center justify-center text-white/90 transition-colors hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-gob-focus [&_svg]:size-[1.125rem]',
          collapsed ? 'min-h-11 w-full border-t border-white/15' : 'w-11',
        )}
      >
        {collapsed ? <PanelLeftOpen aria-hidden /> : <PanelLeftClose aria-hidden />}
      </button>
    </div>
  )
}

export function TramitesSidebar() {
  const { tx } = useI18n()
  const { collapsed, scope, setPrefs } = useDashboardPrefs()
  return (
    <aside
      className={cn(
        'sticky top-0 z-30 hidden h-svh shrink-0 flex-col self-start overflow-hidden border-r border-gob-border bg-card transition-[width] duration-200 lg:flex',
        collapsed ? 'w-[4.75rem] min-w-[4.75rem]' : 'w-[18.5rem]',
      )}
      aria-label={tx('Barra lateral de trámites')}
    >
      <SidebarHeader collapsed={collapsed} onToggle={() => setPrefs({ collapsed: !collapsed })} />
      <ScopeSwitch collapsed={collapsed} scope={scope} onChange={next => setPrefs({ scope: next })} />
      <div className="min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-gob-3 py-gob-4 [scrollbar-width:thin]">
        <TramitesSidebarNav collapsed={collapsed} />
      </div>
      <Link
        href="/"
        aria-label={collapsed ? tx('Volver al sitio informativo') : undefined}
        title={collapsed ? tx('Volver al sitio informativo') : undefined}
        className={cn(rowClass(false, scope), 'mx-gob-3 mb-gob-4 mt-gob-8 shrink-0', collapsed && 'justify-center px-0')}
      >
        <ArrowLeft aria-hidden />
        {collapsed ? null : <span>{tx('Volver al sitio informativo')}</span>}
      </Link>
    </aside>
  )
}
