'use client'

import Link from 'next/link'
import { useMemo, useState } from 'react'
import { ChevronLeft, ChevronRight, ChevronDown, Search, SearchX } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PortalImagePlaceholder } from '@/components/portal/content'
import { PORTAL_NEWS, type PortalNewsItem } from '@/lib/portal-news'
import { cn } from '@/lib/utils'

const PAGE_SIZE_INITIAL = 6
const PAGE_SIZE_EXPANDED = 9

function NewsCard({ item }: { item: PortalNewsItem }) {
  const inner = (
    <>
      <PortalImagePlaceholder label={item.imgAlt} className="h-[170px] rounded-none border-0 border-b border-gob-border" />
      <div className="p-gob-5 flex flex-col gap-gob-2 flex-1">
        <p className="text-gri-body-xs font-bold uppercase tracking-wide text-gob-link">
          <time dateTime={item.datetime}>{item.date}</time>
        </p>
        <h3 className="text-gri-body font-bold text-gob-text leading-snug">{item.title}</h3>
        <p className="text-gri-body-sm text-muted-foreground leading-relaxed">{item.summary}</p>
      </div>
    </>
  )

  const className =
    'bg-card border border-gob-border rounded-gob-md overflow-hidden flex flex-col shadow-sm hover:border-gob-link hover:shadow-md transition-all'

  if (item.href === '#') {
    return (
      <article className={className} aria-label={item.title}>
        {inner}
      </article>
    )
  }

  return (
    <Link href={item.href} className={cn(className, 'no-underline text-inherit')}>
      {inner}
    </Link>
  )
}

export function SalaPrensa() {
  const [query, setQuery] = useState('')
  const [applied, setApplied] = useState('')
  const [showAll, setShowAll] = useState(false)
  const [page, setPage] = useState(1)

  const matched = useMemo(() => {
    const q = applied.toLowerCase()
    const sorted = [...PORTAL_NEWS].sort(
      (a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime(),
    )
    if (!q) return sorted
    return sorted.filter(n => `${n.title} ${n.summary}`.toLowerCase().includes(q))
  }, [applied])

  const totalPages = Math.max(1, Math.ceil(matched.length / PAGE_SIZE_EXPANDED))
  const currentPage = Math.min(page, totalPages)

  const visibleNews = showAll
    ? matched.slice((currentPage - 1) * PAGE_SIZE_EXPANDED, currentPage * PAGE_SIZE_EXPANDED)
    : matched.slice(0, PAGE_SIZE_INITIAL)

  const resultLabel = applied
    ? `${matched.length} noticia(s) para "${applied}"`
    : showAll
      ? `Mostrando ${visibleNews.length} de ${matched.length} noticias`
      : 'Mostrando las 6 noticias más recientes'

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setApplied(query.trim())
    setShowAll(true)
    setPage(1)
  }

  const pageNums = useMemo(() => {
    if (!showAll || totalPages <= 1) return []
    const siblings = 1
    const left = Math.max(2, currentPage - siblings)
    const right = Math.min(totalPages - 1, currentPage + siblings)
    const nums: (number | '…')[] = [1]
    if (left > 2) nums.push('…')
    for (let p = left; p <= right; p++) nums.push(p)
    if (right < totalPages - 1) nums.push('…')
    if (totalPages > 1) nums.push(totalPages)
    return nums.filter((p, i, arr) => p !== arr[i - 1])
  }, [showAll, totalPages, currentPage])

  return (
    <>
      <form role="search" onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-gob-3 mb-gob-6 max-w-2xl">
        <div className="relative flex-1 flex items-center border border-gob-border bg-background">
          <label htmlFor="news-search" className="sr-only">
            Buscar noticias por palabra clave
          </label>
          <input
            id="news-search"
            type="search"
            value={query}
            onChange={e => setQuery(e.target.value)}
            placeholder="Buscar noticias por palabra clave"
            className="flex-1 border-none bg-transparent px-gob-4 py-gob-3 text-gri-body outline-none"
          />
          <Search className="w-5 h-5 text-muted-foreground mr-gob-3 shrink-0" aria-hidden />
        </div>
        <Button
          type="submit"
          className="rounded-none bg-inapi-cta hover:bg-[#003B8D] text-gob-text-inverse font-bold h-auto py-gob-3 px-gob-6"
        >
          Buscar
        </Button>
      </form>

      <p className="text-gri-body-sm text-muted-foreground mb-gob-5">{resultLabel}</p>

      {matched.length > 0 ? (
        <div className="grid min-[600px]:grid-cols-2 min-[905px]:grid-cols-3 gap-gob-5">
          {visibleNews.map(item => (
            <NewsCard key={item.title} item={item} />
          ))}
        </div>
      ) : (
        <div className="text-center py-gob-8 text-muted-foreground">
          <SearchX className="w-10 h-10 mx-auto mb-gob-3 text-muted-foreground/60" aria-hidden />
          <p className="text-gri-body">
            No hay noticias que coincidan con &ldquo;{applied}&rdquo;. Prueba con otra palabra clave.
          </p>
        </div>
      )}

      {!showAll && matched.length > PAGE_SIZE_INITIAL && (
        <div className="text-center mt-gob-8">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              setShowAll(true)
              setPage(1)
            }}
            className="rounded-none border-2 border-inapi-cta text-inapi-cta font-bold h-auto py-gob-3 px-gob-8 hover:bg-inapi-cta hover:text-gob-text-inverse"
          >
            Ver todas las noticias
            <ChevronDown className="w-5 h-5" aria-hidden />
          </Button>
        </div>
      )}

      {showAll && totalPages > 1 && (
        <nav aria-label="Paginación de noticias" className="flex flex-wrap justify-center items-center gap-1.5 mt-gob-10">
          <button
            type="button"
            onClick={() => setPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="inline-flex items-center gap-1 text-gob-link font-bold text-gri-body-sm px-gob-2 py-gob-2 disabled:opacity-40 hover:underline"
          >
            <ChevronLeft className="w-5 h-5" aria-hidden />
            Página anterior
          </button>
          {pageNums.map((p, i) =>
            p === '…' ? (
              <span key={`ellipsis-${i}`} className="min-w-10 h-10 inline-flex items-center justify-center text-muted-foreground">
                …
              </span>
            ) : (
              <button
                key={p}
                type="button"
                onClick={() => setPage(p)}
                aria-current={p === currentPage ? 'page' : undefined}
                className={cn(
                  'min-w-10 h-10 inline-flex items-center justify-center border rounded text-gri-body-sm',
                  p === currentPage
                    ? 'border-inapi-cta bg-inapi-cta text-gob-text-inverse font-bold'
                    : 'border-gob-border bg-card hover:border-inapi-cta',
                )}
              >
                {p}
              </button>
            ),
          )}
          <button
            type="button"
            onClick={() => setPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="inline-flex items-center gap-1 text-gob-link font-bold text-gri-body-sm px-gob-2 py-gob-2 disabled:opacity-40 hover:underline"
          >
            Página siguiente
            <ChevronRight className="w-5 h-5" aria-hidden />
          </button>
        </nav>
      )}
    </>
  )
}
