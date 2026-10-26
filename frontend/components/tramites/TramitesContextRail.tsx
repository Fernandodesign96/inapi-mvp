'use client'

import { Suspense } from 'react'
import Link from 'next/link'
import { usePathname, useSearchParams } from 'next/navigation'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { categoryForPath, categoryItems, pathOf, scopeFromPath } from '@/lib/tramites/dashboard'
import { cn } from '@/lib/utils'

const HIDE = new Set(['/tramites', '/tramites/auth', '/tramites/ingresar', '/tramites/clave-unica', '/tramites/registrarse'])

export function TramitesContextRail() {
  const { tx } = useI18n()
  const pathname = usePathname()
  const { scope } = useDashboardPrefs()

  if (HIDE.has(pathname)) return null

  if (pathname === '/tramites/notificaciones') {
    return (
      <Suspense fallback={null}>
        <NotificacionesRail />
      </Suspense>
    )
  }

  const category = categoryForPath(pathname)
  if (!category) return null
  const items = categoryItems(category.id, scopeFromPath(pathname, scope)).slice(0, 5)

  return (
    <Rail label={tx(category.label)}>
      {items.map(item => (
        <Chip
          key={item.href + item.label}
          href={item.href}
          label={tx(item.label)}
          current={!item.external && pathOf(item.href) === pathname}
          external={item.external}
        />
      ))}
    </Rail>
  )
}

function NotificacionesRail() {
  const { tx } = useI18n()
  const params = useSearchParams()
  const ambito = params.get('ambito') === 'patentes' ? 'patentes' : 'marcas'
  return (
    <Rail label={tx('En esta pantalla')}>
      <Chip href="/tramites/notificaciones?ambito=marcas" label={tx('Estado de marcas')} current={ambito === 'marcas'} />
      <Chip href="/tramites/notificaciones?ambito=patentes" label={tx('Estado de patentes')} current={ambito === 'patentes'} />
    </Rail>
  )
}

function Rail({ label, children }: { label: string; children: React.ReactNode }) {
  const { tx } = useI18n()
  return (
    <div className="mx-auto w-full max-w-[1600px] px-gob-4 pt-gob-3 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
      <nav
        aria-label={tx('Atajos de esta pantalla')}
        className="flex flex-nowrap items-end gap-x-gob-4 overflow-x-auto border-b border-gob-border/80 [scrollbar-width:none] dark:border-white/10"
      >
        <span className="mb-1.5 shrink-0 text-[0.6875rem] font-medium uppercase tracking-[0.06em] text-muted-foreground">
          {label}
        </span>
        {children}
      </nav>
    </div>
  )
}

function Chip({
  href,
  label,
  current,
  external,
}: {
  href: string
  label: string
  current?: boolean
  external?: boolean
}) {
  const className = cn(
    '-mb-px inline-flex shrink-0 items-center border-b-2 pb-1.5 text-gri-body-xs whitespace-nowrap transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
    current
      ? 'border-gob-text font-medium text-gob-text dark:border-white dark:text-white'
      : 'border-transparent text-muted-foreground hover:text-gob-text dark:text-white/50 dark:hover:text-white',
  )
  if (current) {
    return (
      <span aria-current="page" className={className}>
        {label}
      </span>
    )
  }
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {label}
      </a>
    )
  }
  return (
    <Link href={href} className={className}>
      {label}
    </Link>
  )
}
