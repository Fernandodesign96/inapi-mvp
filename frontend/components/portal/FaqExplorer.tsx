'use client'

import { BookOpen, Building2, Globe, Landmark, Lightbulb, MapPin, Tag } from 'lucide-react'
import { IconList } from '@/components/story/IconList'
import { ProgressMiniCards } from '@/components/story/ProgressMiniCards'
import { SectionTabs } from '@/components/story/SectionTabs'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { FAQ_ITEMS, FAQ_TOPICS, type FaqItem, type FaqTopic } from '@/lib/faq-data'

const TOPIC_ICONS: Record<FaqTopic, React.ReactNode> = {
  inapi: <Building2 />,
  propiedad: <Landmark />,
  marcas: <Tag />,
  patentes: <Lightbulb />,
  pct: <Globe />,
  origen: <MapPin />,
  leyes: <BookOpen />,
}

function FaqBody({ item }: { item: FaqItem }) {
  return (
    <div className="space-y-gob-4">
      {item.paragraphs.map(p => (
        <p key={p}>{p}</p>
      ))}
      {item.bullets?.length ? (
        <IconList
          items={item.bullets.map(b => ({
            text: (
              <>
                <strong>{b.lead}.</strong> {b.text}
              </>
            ),
          }))}
        />
      ) : null}
      {item.steps?.length ? <ProgressMiniCards items={item.steps} /> : null}
      {item.quote ? <p className="border-l-2 border-gob-primary pl-gob-4 italic">{item.quote}</p> : null}
      {item.example ? (
        <p>
          <strong>Ejemplo.</strong> {item.example}
        </p>
      ) : null}
    </div>
  )
}

function toAccordion(items: FaqItem[]) {
  return items.map(item => ({
    id: item.id,
    title: item.title,
    icon: TOPIC_ICONS[item.topic],
    content: <FaqBody item={item} />,
  }))
}

/** Pestañas por tema + acordeón en dos columnas. */
export function FaqExplorer() {
  return (
    <SectionTabs
      label="Temas de preguntas frecuentes"
      tabs={FAQ_TOPICS.map(topic => ({
        id: topic.id,
        label: topic.label,
        icon: TOPIC_ICONS[topic.id],
        content: <SplitAccordion items={toAccordion(FAQ_ITEMS.filter(item => item.topic === topic.id))} />,
      }))}
    />
  )
}
