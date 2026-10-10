'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useMemo, useState } from 'react'
import { Search, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PORTAL_SEARCH_INDEX } from '@/lib/portal-search-index'
import { cn } from '@/lib/utils'

export function BuscadorSitio() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialQuery = searchParams.get('q') ?? ''
  const [query, setQuery] = useState(initialQuery)
  const [applied, setApplied] = useState(initialQuery.trim())

  const visibleResults = useMemo(() => {
    const q = applied.toLowerCase()
    if (!q) return PORTAL_SEARCH_INDEX
    return PORTAL_SEARCH_INDEX.filter(r =>
      `${r.title} ${r.summary} ${r.category}`.toLowerCase().includes(q),
    )
  }, [applied])

  const resultLabel = applied
    ? `${visibleResults.length} resultado(s) para "${applied}"`
    : `Mostrando ${PORTAL_SEARCH_INDEX.length} páginas del sitio`

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    setApplied(q)
    router.replace(q ? `/buscar?q=${encodeURIComponent(q)}` : '/buscar', { scroll: false })
  }

  return (
    <>
      <form role="search" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-gob-3 mb-gob-6 max-w-2xl">
        <div className="relative flex-1 flex items-center border border-gob-border bg-background">
          <label htmlFor="portal-search" className="sr-only">
            Buscar en el sitio
          </label>
          <input
            id="portal-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar en el sitio"
            className="flex-1 border-none bg-transparent px-gob-4 py-gob-3 text-gri-body outline-none"
          />
          <Search className="w-5 h-5 text-muted-foreground mr-gob-3 shrink-0" aria-hidden />
        </div>
        <Button
          type="submit"
          className="rounded-gob-md bg-inapi-cta hover:bg-gob-primary-dark text-gob-text-inverse font-medium h-auto min-h-11 py-gob-3 px-gob-6"
        >
          Buscar
        </Button>
      </form>

      <p className="text-gri-body-sm text-muted-foreground mb-gob-5">{resultLabel}</p>

      {visibleResults.length > 0 ? (
        <div className="flex flex-col">
          {visibleResults.map(r => (
            <Link
              key={r.href + r.title}
              href={r.href}
              className={cn(
                'block py-gob-5 border-b border-gob-border transition-colors',
                'hover:bg-inapi-tint',
              )}
            >
              <p className="portal-kicker text-gob-link mb-1.5">{r.category}</p>
              <h3 className="text-lg font-bold text-gob-link underline mb-1.5">{r.title}</h3>
              <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{r.summary}</p>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-gob-8 text-muted-foreground">
          <SearchX className="w-10 h-10 mx-auto mb-gob-3 text-muted-foreground/60" aria-hidden />
          <p className="text-gri-body text-gob-text">
            No hay páginas que coincidan con &ldquo;{applied}&rdquo;.
          </p>
          <p className="text-gri-body-sm mt-gob-2">
            Prueba con otra palabra o abre{' '}
            <Link href="/marcas" className="text-gob-link font-medium underline-offset-4 hover:underline">
              Marcas
            </Link>
            ,{' '}
            <Link href="/patentes" className="text-gob-link font-medium underline-offset-4 hover:underline">
              Patentes
            </Link>{' '}
            o las{' '}
            <Link href="/preguntas-frecuentes" className="text-gob-link font-medium underline-offset-4 hover:underline">
              preguntas frecuentes
            </Link>
            .
          </p>
        </div>
      )}
    </>
  )
}
