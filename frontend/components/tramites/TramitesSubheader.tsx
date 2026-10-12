'use client'

import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { resolveTramitesHeading } from '@/lib/tramites/nav'

const HIDE_TITLE = new Set(['/tramites', '/tramites/auth', '/tramites/ingresar'])

function TramitesSubheaderInner() {
  const { tx } = useI18n()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const meta = resolveTramitesHeading(pathname, search)

  if (HIDE_TITLE.has(pathname)) return null

  return (
    <div className="relative z-0 border-b border-white/10">
      <div className="mx-auto max-w-[1600px] space-y-gob-4 px-gob-4 pt-gob-7 pb-gob-8 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
        <Breadcrumbs
          tone="inverse"
          homeHref="/tramites"
          items={[{ label: meta.title }]}
        />
        <h1 key={`${pathname}?${search}`} className="portal-h1 text-gob-text-inverse">
          {tx(meta.title)}
        </h1>
        {meta.subtitle ? (
          <p className="portal-lead max-w-none text-gob-text-inverse">{tx(meta.subtitle)}</p>
        ) : null}
      </div>
    </div>
  )
}

export function TramitesSubheader() {
  return (
    <Suspense fallback={null}>
      <TramitesSubheaderInner />
    </Suspense>
  )
}
