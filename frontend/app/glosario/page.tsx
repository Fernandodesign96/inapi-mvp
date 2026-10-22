import type { Metadata } from 'next'
import { BookMarked } from 'lucide-react'
import { GlossaryList } from '@/components/portal/GlossaryList'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { glossarySlug } from '@/lib/glossary-data'
import { GLOSSARY_TERMS } from '@/lib/glossary-terms'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/glosario')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Glosario'} — INAPI`,
  description: meta?.description,
}

const CLAVE = ['Marcas', 'Patente', 'PCT', 'Oposición', 'Diseño Industrial', 'Marca colectiva', 'Patente Provisional']
const terminosClave = CLAVE.map(t => GLOSSARY_TERMS.find(g => g.term === t)).filter(
  (g): g is (typeof GLOSSARY_TERMS)[number] => Boolean(g),
)

export default function GlosarioPage() {
  return (
    <StoryPage
      path="/glosario"
      hero={{
        eyebrow: 'Glosario institucional',
        dot: 'primary',
        lead: 'Estas definiciones corresponden al glosario institucional de INAPI (más de 170 términos). Explican el sentido oficial de cada expresión; no reemplazan el texto legal.',
        primary: { href: '#terminos', label: 'Buscar un término' },
        seal: { center: 'A–Z', caption: 'GLOSARIO' },
      }}
    >
      <StorySection tone="night" eyebrow="Términos clave" dot="focus" title="Para empezar" align="left">
        <StoryCarousel label="Términos clave del glosario" tone="night">
          {terminosClave.map(t => (
            <a
              key={t.term}
              href={`#${glossarySlug(t.term)}`}
              className="story-glass story-lift flex h-full flex-col gap-gob-3 rounded-gob-xl p-gob-6 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              <BookMarked className="size-6 text-[#A1D1FF]" aria-hidden />
              <span className="font-heading text-[1.5rem] font-medium leading-tight text-white">{t.term}</span>
              <span className="line-clamp-4 text-gri-body-sm leading-[1.6] text-white/80">{t.definition}</span>
            </a>
          ))}
        </StoryCarousel>
      </StorySection>

      <StorySection tone="mist" id="terminos" eyebrow="De la A a la Z" title="Todos los términos">
        <GlossaryList />
      </StorySection>

      <CtaBand
        eyebrow="¿Te quedó una duda?"
        title="Revisa las preguntas frecuentes"
        primary={{ href: '/preguntas-frecuentes', label: 'Ver preguntas frecuentes' }}
        secondary={{ href: '/contacto', label: 'Consultar con INAPI' }}
        seal={{ center: 'A–Z', caption: 'GLOSARIO' }}
      />
    </StoryPage>
  )
}
