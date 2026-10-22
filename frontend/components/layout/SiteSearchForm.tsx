'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export function SiteSearchForm({
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
  const searchLabel = tx('Buscar en este sitio')

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
          name="q"
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
