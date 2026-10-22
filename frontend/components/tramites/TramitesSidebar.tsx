'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  ChevronDown,
  ExternalLink,
  FilePen,
  FolderOpen,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  PenLine,
  Wallet,
} from 'lucide-react'
import { PlatformBadge } from '@/components/shared/PlatformBadge'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import {
  TRAMITES_CATEGORIES,
  categoryHref,
  categoryItems,
  type TramitesCategoryId,
} from '@/lib/tramites/dashboard'
import { NOTIFICACIONES } from '@/lib/tramites/mock-data'
import { TRAMITES_SECONDARY_NAV, type TramitesDomain } from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'

export const CATEGORY_ICONS: Record<TramitesCategoryId, React.ReactNode> = {
  tramitacion: <PenLine />,
  cambios: <FilePen />,
  pagos: <Wallet />,
  documentos: <FolderOpen />,
}

const rowBase =
  'group/row flex min-h-11 w-full items-center gap-gob-3 rounded-gob-md px-gob-3 text-gri-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus [&_svg]:size-[1.125rem] [&_svg]:shrink-0'

function rowClass(active: boolean) {
  return cn(
    rowBase,
    active
      ? 'bg-[var(--story-night)] text-white shadow-elevation-02 [&_svg]:text-white'
      : 'text-gob-text hover:bg-gob-surface-elevated [&_svg]:text-gob-text/75',
  )
}

function pathOf(href: string) {
  return href.split('?')[0]
}

export function ScopeSwitch({
  scope,
  onChange,
  className,
}: {
  scope: TramitesDomain
  onChange: (scope: TramitesDomain) => void
  className?: string
}) {
  const { tx } = useI18n()
  return (
    <div
      role="group"
      aria-label={tx('Ámbito de trámites')}
      className={cn('grid grid-cols-2 rounded-full border border-gob-border bg-gob-surface-elevated p-0.5', className)}
    >
      {(['marcas', 'patentes'] as const).map(id => (
        <button
          key={id}
          type="button"
          aria-pressed={scope === id}
          onClick={() => onChange(id)}
          className={cn(
            'inline-flex min-h-9 items-center justify-center gap-gob-2 rounded-full px-gob-3 text-gri-body-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
            scope === id ? 'bg-card text-gob-text shadow-elevation-01' : 'text-muted-foreground hover:text-gob-text',
          )}
        >
          <span aria-hidden className={cn('size-2 rounded-full', id === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary')} />
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
  const pathname = usePathname()
  const { scope, setPrefs } = useDashboardPrefs()
  const activeCategory = TRAMITES_CATEGORIES.find(cat => {
    if (pathname === categoryHref(cat.id)) return true
    return (['marcas', 'patentes'] as const).some(s =>
      categoryItems(cat.id, s).some(item => !item.external && pathOf(item.href) === pathname),
    )
  })?.id
  const [groupOverrides, setGroupOverrides] = useState<Partial<Record<TramitesCategoryId, boolean>>>({})
  const pending = NOTIFICACIONES.filter(n => n.dominio === scope).length
  const isGroupOpen = (id: TramitesCategoryId) => groupOverrides[id] ?? activeCategory === id

  const toggleGroup = (id: TramitesCategoryId) =>
    setGroupOverrides(prev => ({ ...prev, [id]: !(prev[id] ?? activeCategory === id) }))

  return (
    <nav aria-label={tx('Menú del Portal de trámites')} className="flex flex-col gap-gob-5">
      {collapsed ? (
        <button
          type="button"
          onClick={() => setPrefs({ scope: scope === 'marcas' ? 'patentes' : 'marcas' })}
          className="mx-auto inline-flex size-11 items-center justify-center rounded-full border border-gob-border bg-gob-surface-elevated text-gri-body-xs font-bold text-gob-text focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          aria-label={tx(scope === 'marcas' ? 'Ámbito: Marcas. Cambiar a Patentes' : 'Ámbito: Patentes. Cambiar a Marcas')}
          title={tx(scope === 'marcas' ? 'Ámbito: Marcas. Cambiar a Patentes' : 'Ámbito: Patentes. Cambiar a Marcas')}
        >
          <span aria-hidden className={cn('mr-1 size-2 rounded-full', scope === 'marcas' ? 'bg-gob-accent' : 'bg-gob-primary')} />
          {scope === 'marcas' ? 'M' : 'P'}
        </button>
      ) : (
        <ScopeSwitch scope={scope} onChange={next => setPrefs({ scope: next })} />
      )}

      <ul className="flex flex-col gap-1">
        <li>
          <Link
            href="/tramites"
            onClick={onNavigate}
            aria-current={pathname === '/tramites' ? 'page' : undefined}
            aria-label={collapsed ? tx('Inicio') : undefined}
            title={collapsed ? tx('Inicio') : undefined}
            className={cn(rowClass(pathname === '/tramites'), collapsed && 'justify-center px-0')}
          >
            <LayoutDashboard aria-hidden />
            {collapsed ? null : <span>{tx('Inicio')}</span>}
          </Link>
        </li>
        <li>
          <Link
            href={`/tramites/notificaciones?ambito=${scope}`}
            onClick={onNavigate}
            aria-current={pathname === '/tramites/notificaciones' ? 'page' : undefined}
            aria-label={collapsed ? `${tx('Estado de solicitudes')} (${pending})` : undefined}
            title={collapsed ? `${tx('Estado de solicitudes')} (${pending})` : undefined}
            className={cn(rowClass(pathname === '/tramites/notificaciones'), collapsed && 'relative justify-center px-0')}
          >
              <Bell aria-hidden />
              {collapsed ? (
                <span aria-hidden className="absolute right-2 top-1.5 size-2 rounded-full bg-gob-accent" />
              ) : (
                <>
                  <span className="flex-1">{tx('Estado de solicitudes')}</span>
                  <span
                    className={cn(
                      'story-tabular inline-flex min-w-6 items-center justify-center rounded-full px-1.5 text-[0.6875rem] font-bold leading-5',
                      pathname === '/tramites/notificaciones' ? 'bg-white text-[var(--story-night)]' : 'bg-gob-accent text-white',
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

      <div className="flex flex-col gap-1">
        {collapsed ? null : (
          <p className="px-gob-3 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {tx('Trámites')}
          </p>
        )}
        <ul className="flex flex-col gap-1">
          {TRAMITES_CATEGORIES.map(cat => {
            const href = categoryHref(cat.id)
            const active = activeCategory === cat.id
            const items = categoryItems(cat.id, scope)
            const open = isGroupOpen(cat.id) && !collapsed
            const groupId = `sidebar-group-${cat.id}`
            return (
              <li key={cat.id}>
                <div className="flex items-center gap-1">
                  <Link
                    href={href}
                    onClick={onNavigate}
                    aria-current={pathname === href ? 'page' : undefined}
                    aria-label={collapsed ? tx(cat.label) : undefined}
                    title={collapsed ? `${tx(cat.label)}: ${tx(cat.description)}` : undefined}
                    className={cn(rowClass(active), 'min-w-0 flex-1', collapsed && 'justify-center px-0')}
                  >
                    {CATEGORY_ICONS[cat.id]}
                    {collapsed ? null : <span className="flex-1 truncate">{tx(cat.label)}</span>}
                  </Link>
                  {collapsed ? null : (
                    <button
                      type="button"
                      aria-expanded={open}
                      aria-controls={groupId}
                      aria-label={`${tx(open ? 'Ocultar trámites de' : 'Mostrar trámites de')} ${tx(cat.label)}`}
                      onClick={() => toggleGroup(cat.id)}
                      className="inline-flex h-11 w-8 shrink-0 items-center justify-center rounded-gob-md text-gob-text/70 hover:bg-gob-surface-elevated focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                    >
                      <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden />
                    </button>
                  )}
                </div>
                {open ? (
                  <ul id={groupId} className="ml-[1.375rem] mt-1 flex flex-col border-l border-gob-border pl-gob-2">
                    {items.map(item => {
                      const itemActive = !item.external && pathOf(item.href) === pathname
                      const cls = cn(
                        'flex min-h-10 items-center gap-gob-2 rounded-gob-sm px-gob-2 py-1.5 text-gri-body-xs leading-snug focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                        itemActive ? 'bg-[var(--story-night)]/8 font-semibold text-[var(--story-night)] dark:text-white' : 'text-gob-text/85 hover:bg-gob-surface-elevated hover:text-gob-text',
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
      </div>

      {collapsed ? null : (
        <div className="flex flex-col gap-1">
          <p className="px-gob-3 pb-1 text-[0.6875rem] font-semibold uppercase tracking-[0.1em] text-muted-foreground">
            {tx('Atajos')}
          </p>
          <ul className="flex flex-col">
            {TRAMITES_SECONDARY_NAV.map(item => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={onNavigate}
                  title={tx(item.hint)}
                  aria-description={tx(item.hint)}
                  className="flex min-h-10 items-center rounded-gob-sm px-gob-3 text-gri-body-xs font-medium text-gob-link hover:bg-gob-surface-elevated hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  {tx(item.label)}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
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
        'story-night guilloche relative flex items-center gap-gob-3 overflow-hidden rounded-gob-lg text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
        collapsed ? 'justify-center p-gob-2' : 'p-gob-3',
      )}
    >
      <Image
        src="/inapi-mvp/inapi-logo.jpg"
        alt=""
        width={96}
        height={38}
        className={cn('relative w-auto rounded-sm object-contain', collapsed ? 'h-8' : 'h-9')}
        priority
      />
      {collapsed ? null : (
        <span className="relative flex min-w-0 flex-col gap-1">
          <span className="text-gri-body-sm font-semibold leading-tight">INAPI · {tx('Trámites')}</span>
          <PlatformBadge platform="tramites" />
        </span>
      )}
    </Link>
  )
}

export function TramitesSidebar() {
  const { tx } = useI18n()
  const { collapsed, setPrefs } = useDashboardPrefs()
  return (
    <aside
      className={cn(
        'sticky top-0 hidden h-dvh shrink-0 flex-col gap-gob-5 border-r border-gob-border bg-card px-gob-3 py-gob-4 transition-[width] duration-200 lg:flex',
        collapsed ? 'w-[4.75rem]' : 'w-[18.5rem]',
      )}
      aria-label={tx('Barra lateral de trámites')}
    >
      <SidebarBrand collapsed={collapsed} />
      <div className="-mx-gob-3 min-h-0 flex-1 overflow-y-auto overflow-x-hidden px-gob-3 [scrollbar-width:thin]">
        <TramitesSidebarNav collapsed={collapsed} />
      </div>
      <div className="flex flex-col gap-1 border-t border-gob-border pt-gob-3">
        <Link
          href="/"
          aria-label={collapsed ? tx('Volver al sitio informativo') : undefined}
          title={collapsed ? tx('Volver al sitio informativo') : undefined}
          className={cn(rowClass(false), collapsed && 'justify-center px-0')}
        >
          <ArrowLeft aria-hidden />
          {collapsed ? null : <span>{tx('Volver al sitio informativo')}</span>}
        </Link>
        <button
          type="button"
          onClick={() => setPrefs({ collapsed: !collapsed })}
          aria-label={collapsed ? tx('Expandir menú') : tx('Contraer menú')}
          title={collapsed ? tx('Expandir menú') : tx('Contraer menú')}
          aria-expanded={!collapsed}
          className={cn(rowClass(false), collapsed && 'justify-center px-0')}
        >
          {collapsed ? <PanelLeftOpen aria-hidden /> : <PanelLeftClose aria-hidden />}
          {collapsed ? null : <span>{tx('Contraer menú')}</span>}
        </button>
      </div>
    </aside>
  )
}
