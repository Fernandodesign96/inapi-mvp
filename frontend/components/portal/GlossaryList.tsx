'use client'

import { useMemo, useState } from 'react'
import { GLOSSARY_TERMS } from '@/lib/glossary-terms'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

export function GlossaryList() {
  const { tx } = useI18n()
  const [query, setQuery] = useState('')
  const [letter, setLetter] = useState<string | null>(null)
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return GLOSSARY_TERMS.filter(item => {
      const matchesQuery =
        !q || item.term.toLowerCase().includes(q) || item.definition.toLowerCase().includes(q)
      const initial = item.term.normalize('NFD').replace(/[\u0300-\u036f]/g, '')[0]?.toUpperCase()
      const matchesLetter = !letter || initial === letter
      return matchesQuery && matchesLetter
    })
  }, [query, letter])

  return (
    <div className="max-w-none space-y-gob-6">
      <div>
        <label htmlFor="glosario-buscar" className="sr-only">
          Buscar un término
        </label>
        <input
          id="glosario-buscar"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Busca un término, por ejemplo marca o PCT"
          className="w-full h-11 min-h-11 rounded-gob-md border border-gob-border bg-card px-gob-4 text-gob-text outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        />
      </div>
      <div className="flex flex-wrap gap-1" role="group" aria-label="Filtrar por letra">
        <button
          type="button"
          onClick={() => setLetter(null)}
          className={cn(
            'min-h-11 min-w-11 rounded-gob-sm px-2 text-gri-body-xs font-medium',
            letter === null ? 'bg-inapi-cta text-gob-text-inverse' : 'text-gob-primary hover:bg-inapi-tint',
          )}
        >
          Todas
        </button>
        {LETTERS.map(item => (
          <button
            key={item}
            type="button"
            onClick={() => setLetter(item)}
            className={cn(
              'min-h-11 min-w-11 rounded-gob-sm px-2 text-gri-body-xs font-medium',
              letter === item ? 'bg-inapi-cta text-gob-text-inverse' : 'text-gob-primary hover:bg-inapi-tint',
            )}
          >
            {item}
          </button>
        ))}
      </div>
      <p className="text-gri-body-sm text-muted-foreground">
        {filtered.length} {filtered.length === 1 ? tx('término') : tx('términos')}
      </p>
      <dl className="space-y-gob-5">
        {filtered.map(({ term, definition }) => (
          <div key={term} id={term.toLowerCase().replace(/\s+/g, '-')}>
            <dt className="font-medium text-gob-text text-gri-body mb-1.5">{term}</dt>
            <dd className="text-gri-body-sm text-gob-text leading-[1.5]">{definition}</dd>
          </div>
        ))}
      </dl>
      {filtered.length === 0 ? (
        <p className="text-gri-body text-muted-foreground">No hay términos que coincidan con esa búsqueda.</p>
      ) : null}
    </div>
  )
}
