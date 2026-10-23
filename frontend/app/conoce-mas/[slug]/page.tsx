import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { BookOpen, Landmark, Scale } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { IconList } from '@/components/story/IconList'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { StoryTimeline } from '@/components/story/StoryTimeline'
import { CONOCE_MAS_ARTICULOS } from '@/lib/conoce-mas-articulos'
import { HITOS_PROPIEDAD_INDUSTRIAL } from '@/lib/inapi-hitos'

export function generateStaticParams() {
  return [
    ...CONOCE_MAS_ARTICULOS.map(item => ({ slug: item.slug })),
    { slug: 'historia-propiedad-industrial' },
  ]
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'historia-propiedad-industrial') {
    return {
      title: 'Historia de la propiedad industrial — INAPI',
      description: 'Hitos del registro de marcas y patentes en Chile, desde las primeras concesiones del siglo XIX hasta INAPI.',
    }
  }
  const article = CONOCE_MAS_ARTICULOS.find(item => item.slug === slug)
  return {
    title: `${article?.title ?? 'Conoce más'} — INAPI`,
    description: article?.body[0],
  }
}

export default async function ConoceMasArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (slug === 'historia-propiedad-industrial') {
    return (
      <StoryPage
        path="/conoce-mas/historia-propiedad-industrial"
        hero={{
          eyebrow: 'Historia',
          dot: 'primary',
          lead: 'Estos hitos resumen cómo Chile pasó de privilegios presidenciales del siglo XIX a un instituto público que registra, publica y explica los derechos de propiedad industrial.',
          primary: { href: '#hitos', label: 'Recorrer los hitos' },
          seal: { center: '1840', caption: 'PRIMERA PATENTE' },
        }}
      >
        <StorySection tone="paper" id="hitos" eyebrow="1833–2016" title="Hitos de la propiedad industrial en Chile">
          <StoryTimeline items={HITOS_PROPIEDAD_INDUSTRIAL} label="Hitos de la propiedad industrial en Chile" />
        </StorySection>
        <CtaBand
          eyebrow="Fuentes y visitas"
          title="El detalle de cada periodo está en el sitio institucional"
          body="El museo virtual recorre dos siglos de registros en Chile."
          primary={{
            href: 'https://www.inapi.cl/propiedad-intelectual-e-industrial/para-informarse/historia-de-la-propiedad-industrial',
            label: 'Ver la cronología completa en inapi.cl',
          }}
          secondary={{ href: 'https://www.inapi.cl/galeria/', label: 'Abrir el museo virtual de INAPI' }}
          seal={{ center: '1840', caption: 'HISTORIA' }}
        />
      </StoryPage>
    )
  }

  const article = CONOCE_MAS_ARTICULOS.find(item => item.slug === slug)
  if (!article) notFound()

  return (
    <StoryPage
      path={`/conoce-mas/${article.slug}`}
      hero={{
        eyebrow: 'Conceptos básicos',
        dot: 'primary',
        lead: article.body[0],
        seal: { center: 'PI', caption: 'INAPI' },
      }}
    >
      <StorySection tone="paper" eyebrow="Lectura" title={article.title}>
        <div className="grid items-start gap-gob-6 min-[1100px]:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <IconList items={article.body.map(p => ({ text: p }))} />
          <BentoGrid cols={2} className="min-[600px]:grid-cols-1">
            <BentoCard icon={<BookOpen />} title="Fuente oficial" body="Esta ficha resume el texto publicado por INAPI." href={article.official} cta="Ver en inapi.cl" />
            <BentoCard icon={<Landmark />} title="INAPI registra" body="Marcas, patentes, diseños e indicaciones geográficas, según la Ley N.° 19.039." delay={0.06} />
            <BentoCard icon={<Scale />} title="Otras instituciones" body="El derecho de autor y las variedades vegetales no se tramitan aquí." delay={0.1} />
          </BentoGrid>
        </div>
      </StorySection>
      <CtaBand
        eyebrow="Siguiente"
        title="Elige qué quieres proteger"
        primary={{ href: '/que-proteger', label: 'Ver qué puedo proteger' }}
        secondary={{ href: '/glosario', label: 'Abrir el glosario' }}
        seal={{ center: 'PI', caption: 'INAPI' }}
      />
    </StoryPage>
  )
}
