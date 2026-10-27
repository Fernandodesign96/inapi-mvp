'use client'

import { Suspense } from 'react'
import { usePathname, useSearchParams } from 'next/navigation'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { resolveTramitesHeading } from '@/lib/tramites/nav'
import { cn } from '@/lib/utils'

const HIDE_TITLE = new Set(['/tramites', '/tramites/auth'])

function TramitesSubheaderInner() {
  const { tx } = useI18n()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const search = searchParams.toString()
  const meta = resolveTramitesHeading(pathname, search)

  if (HIDE_TITLE.has(pathname)) return null

  return (
    <div className="mx-auto w-full max-w-[1600px] px-gob-4 pt-gob-6 min-[600px]:px-gob-5 min-[905px]:px-gob-8">
      <div className="flex items-start gap-gob-4">
        <span
          aria-hidden
          className={cn(
            'mt-2 hidden h-10 w-1.5 shrink-0 rounded-full min-[600px]:block',
            meta.domain === 'marcas' ? 'bg-gob-accent' : meta.domain === 'patentes' ? 'bg-gob-primary' : 'bg-[var(--story-night)]',
          )}
        />
        <div className="min-w-0 space-y-gob-2">
          <h1 key={`${pathname}?${search}`} className="portal-h1 text-gob-text">
            {tx(meta.title)}
          </h1>
          {meta.subtitle ? <p className="portal-lead max-w-3xl text-muted-foreground">{tx(meta.subtitle)}</p> : null}
        </div>
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
