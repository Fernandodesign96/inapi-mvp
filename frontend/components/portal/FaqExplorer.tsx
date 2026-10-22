'use client'

import { useMemo, useState } from 'react'
import { BookOpen, Building2, Lightbulb, MapPin, Search, Tag } from 'lucide-react'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { SectionTabs } from '@/components/story/SectionTabs'
import { FAQ_ITEMS, FAQ_TOPICS, type FaqItem, type FaqTopic } from '@/lib/faq-data'
import { useI18n } from '@/lib/i18n/LocaleProvider'

const TOPIC_ICONS: Record<FaqTopic, React.ReactNode> = {
  inapi: <Building2 />,
  marcas: <Tag />,
  patentes: <Lightbulb />,
  origen: <MapPin />,
  leyes: <BookOpen />,
}

const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()

function toAccordion(items: FaqItem[]) {
  return items.map(item => ({
    id: item.id,
    title: item.title,
    icon: TOPIC_ICONS[item.topic],
    content: (
      <div className="space-y-gob-3">
        {item.paragraphs.map(p => (
          <p key={p}>{p}</p>
        ))}
      </div>
    ),
  }))
}

/** Buscador + pestañas por tema + acordeón de preguntas frecuentes. */
export function FaqExplorer() {
  const { tx } = useI18n()
  const [query, setQuery] = useState('')
  const q = normalize(query.trim())
  const results = useMemo(
    () => (q ? FAQ_ITEMS.filter(item => normalize([item.title, ...item.paragraphs].join(' ')).includes(q)) : []),
    [q],
  )

  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-gob-6">
      <div className="relative">
        <label htmlFor="faq-buscar" className="sr-only">
          Buscar una pregunta
        </label>
        <Search className="pointer-events-none absolute left-gob-4 top-1/2 size-5 -translate-y-1/2 text-muted-foreground" aria-hidden />
        <input
          id="faq-buscar"
          type="search"
          value={query}
          onChange={e => setQuery(e.target.value)}
          placeholder={tx('Busca por palabra, por ejemplo renovar o patente')}
          className="h-14 w-full rounded-full border border-gob-border bg-card pl-12 pr-gob-5 text-gri-body text-gob-text shadow-elevation-02 outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
        />
      </div>

      {q ? (
        <div className="flex flex-col gap-gob-4" aria-live="polite">
          <p className="text-gri-body-sm text-muted-foreground">
            {results.length} {results.length === 1 ? tx('resultado') : tx('resultados')}
          </p>
          {results.length ? (
            <SectionAccordion items={toAccordion(results)} defaultOpen={results.map(r => r.id)} />
          ) : (
            <p className="rounded-gob-lg border border-dashed border-gob-border-strong bg-card p-gob-6 text-center text-gri-body text-muted-foreground">
              No hay preguntas que coincidan con esa búsqueda.
            </p>
          )}
        </div>
      ) : (
        <SectionTabs
          label="Temas de preguntas frecuentes"
          tabs={FAQ_TOPICS.map(topic => ({
            id: topic.id,
            label: topic.label,
            icon: TOPIC_ICONS[topic.id],
            content: (
              <SectionAccordion
                items={toAccordion(FAQ_ITEMS.filter(item => item.topic === topic.id))}
                defaultOpen={FAQ_ITEMS.filter(item => item.topic === topic.id).map(item => item.id)}
              />
            ),
          }))}
        />
      )}
    </div>
  )
}
