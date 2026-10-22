'use client'

import { useMemo, useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { HoverCard, HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card'
import { glossarySlug } from '@/lib/glossary-data'
import { GLOSSARY_TERMS } from '@/lib/glossary-terms'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
const LONG = 180

function GlossaryCard({ term, definition }: { term: string; definition: string }) {
  const [open, setOpen] = useState(false)
  const long = definition.length > LONG
  const label = <span className="font-heading text-gri-h2 font-medium leading-[1.35] text-gob-text">{term}</span>
  const header = long ? (
    <button
      type="button"
      onClick={() => setOpen(v => !v)}
      aria-expanded={open}
      className="group flex w-full items-start justify-between gap-gob-3 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
    >
      {label}
      <ChevronDown aria-hidden className={cn('mt-1 size-4 shrink-0 text-muted-foreground transition-transform', open && 'rotate-180')} />
    </button>
  ) : (
    label
  )
  return (
    <div
      id={glossarySlug(term)}
      className="scroll-mt-28 rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01 transition-shadow hover:shadow-elevation-03 target:ring-2 target:ring-gob-focus"
    >
      <dt>
        {long && !open ? (
          <HoverCard openDelay={350} closeDelay={80}>
            <HoverCardTrigger asChild>{header}</HoverCardTrigger>
            <HoverCardContent side="top" align="start" className="w-[min(26rem,90vw)] p-gob-4 text-gri-body-sm leading-[1.6] text-gob-text">
              <p className="mb-gob-1 font-semibold">{term}</p>
              {definition}
            </HoverCardContent>
          </HoverCard>
        ) : (
          header
        )}
      </dt>
      <dd className={cn('mt-gob-2 text-gri-body-sm leading-[1.6] text-muted-foreground', long && !open && 'line-clamp-3')}>
        {definition}
      </dd>
    </div>
  )
}

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

  const letterBtn = (active: boolean) =>
    cn(
      'min-h-11 min-w-11 rounded-full px-2 text-gri-body-xs font-semibold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
      active ? 'bg-[var(--story-night)] text-white' : 'text-gob-primary-dark hover:bg-gob-primary/10',
    )

  return (
    <div className="max-w-none space-y-gob-6">
      <div className="relative mx-auto max-w-3xl">
        <label htmlFor="glosario-buscar" className="sr-only">
          Buscar un término
        </label>
        <Search className="pointer-events-none absolute left-gob-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          id="glosario-buscar"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder="Busca un término, por ejemplo marca o PCT"
          className="h-14 w-full rounded-full border border-gob-border bg-card pl-12 pr-gob-5 text-gri-body text-gob-text shadow-elevation-02 outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        />
      </div>
      <div
        className="flex flex-wrap justify-center gap-1 rounded-gob-xl border border-gob-border bg-card p-gob-2 shadow-elevation-01"
        role="group"
        aria-label="Filtrar por letra"
      >
        <button type="button" onClick={() => setLetter(null)} aria-pressed={letter === null} className={letterBtn(letter === null)}>
          Todas
        </button>
        {LETTERS.map(item => (
          <button key={item} type="button" onClick={() => setLetter(item)} aria-pressed={letter === item} className={letterBtn(letter === item)}>
            {item}
          </button>
        ))}
      </div>
      <p className="text-center text-gri-body-sm text-muted-foreground" aria-live="polite">
        {filtered.length} {filtered.length === 1 ? tx('término') : tx('términos')}
      </p>
      <dl className="grid gap-gob-4 min-[700px]:grid-cols-2 min-[1100px]:grid-cols-3">
        {filtered.map(({ term, definition }, index) => (
          <GlossaryCard key={`${term}-${index}`} term={term} definition={definition} />
        ))}
      </dl>
      {filtered.length === 0 ? (
        <p className="text-center text-gri-body text-muted-foreground">No hay términos que coincidan con esa búsqueda.</p>
      ) : null}
    </div>
  )
}
