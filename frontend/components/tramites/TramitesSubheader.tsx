'use client'

import { usePathname } from 'next/navigation'
import { PAGE_TITLES } from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'

export function TramitesSubheader() {
  const pathname = usePathname()
  const meta = PAGE_TITLES[pathname] ?? {
    title: 'Trámites en línea',
    domain: 'general' as const,
  }
  const accent =
    meta.domain === 'patentes' ? 'bg-gob-primary' : meta.domain === 'marcas' ? 'bg-gob-accent' : 'bg-inapi-portal-nav'

  if (pathname === '/tramites') return null

  return (
    <div className="bg-background border-b border-gob-border">
      <div className={cn('h-1', accent)} />
      <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-5">
        <h1 className="font-heading text-gri-h2 font-medium text-gob-text">{meta.title}</h1>
        {meta.subtitle && <p className="text-gri-body text-muted-foreground mt-gob-2 max-w-3xl">{meta.subtitle}</p>}
      </div>
    </div>
  )
}
