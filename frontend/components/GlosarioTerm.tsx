'use client'

import Link from 'next/link'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import glosario from '@/data/glosario.json'
import { resolveGlossaryEntry } from '@/lib/glossary-data'

interface Props {
  termino: string
  children: React.ReactNode
}

export function GlosarioTerm({ termino, children }: Props) {
  const entry = resolveGlossaryEntry(termino)
  const json = glosario.find(g => g.termino.toLowerCase() === termino.toLowerCase())
  const title = json?.termino ?? termino
  const definition = entry?.shortDef ?? json?.definicion
  const example = entry?.exampleText ?? json?.ejemplo
  const href = entry?.glossaryAnchor ?? '/glosario'

  if (!definition) return <span>{children}</span>

  return (
    <Popover>
      <PopoverTrigger asChild>
        <button
          type="button"
          className="inline cursor-help rounded-sm border-b border-dashed border-gob-link bg-transparent p-0 font-inherit text-inherit text-gob-link transition-colors hover:text-gob-link/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
          aria-label={`Definición de ${title}`}
        >
          {children}
          <span className="ml-0.5 text-[0.7em]" aria-hidden>
            ⓘ
          </span>
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-gob-4" side="top" role="tooltip">
        <div className="space-y-2">
          <p className="font-medium text-gri-body-sm text-gob-text">{title}</p>
          <p className="text-gri-body-sm leading-relaxed text-muted-foreground">{definition}</p>
          {example ? (
            <div className="border-t border-gob-border pt-1">
              <p className="text-gri-body-xs text-muted-foreground">
                <span className="font-medium">Ejemplo: </span>
                {example}
              </p>
            </div>
          ) : null}
          <Link href={href} className="inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link underline underline-offset-4">
            Ver definición completa en el Glosario
          </Link>
        </div>
      </PopoverContent>
    </Popover>
  )
}

/** Término técnico con significado visible: “Acervo: conjunto de…”. */
export function PlainTerm({
  term,
  children,
  showMeaning = true,
}: {
  term: string
  children?: React.ReactNode
  showMeaning?: boolean
}) {
  const entry = resolveGlossaryEntry(term)
  const label = children ?? term
  if (!entry) return <>{label}</>
  return (
    <span className="inline">
      <GlosarioTerm termino={term}>{label}</GlosarioTerm>
      {showMeaning ? <span className="text-muted-foreground">: {entry.shortDef}</span> : null}
    </span>
  )
}
