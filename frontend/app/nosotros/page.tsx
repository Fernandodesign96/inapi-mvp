import type { Metadata } from 'next'
import { Eye, Flag, Lightbulb, Tag, Users } from 'lucide-react'
import { NosotrosHub } from '@/components/portal/NosotrosHub'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { StatTile } from '@/components/story/StatTile'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { StoryTimeline } from '@/components/story/StoryTimeline'
import { VideoCard } from '@/components/story/VideoCard'
import { HITOS_PROPIEDAD_INDUSTRIAL } from '@/lib/inapi-hitos'
import { MARCAS_MULTICLASE, PATENTES_ORIGEN, PATENTES_TOTAL } from '@/lib/inapi-official-stats'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/nosotros')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Acerca de INAPI'} — INAPI`,
  description: 'Funciones, objetivos y valores del Instituto Nacional de Propiedad Industrial.',
}

const pct = (now: number, before: number) => Math.round(((now - before) / before) * 1000) / 10
const marcas2025 = MARCAS_MULTICLASE.find(r => r.anio === '2025')!.solicitudes
const marcas2024 = MARCAS_MULTICLASE.find(r => r.anio === '2024')!.solicitudes
const patentes2025 = PATENTES_TOTAL.find(r => r.anio === '2025')!.solicitudes
const patentes2024 = PATENTES_TOTAL.find(r => r.anio === '2024')!.solicitudes

export default function NosotrosPage() {
  return (
    <StoryPage
      path="/nosotros"
      hero={{
        eyebrow: 'Nosotros',
        dot: 'primary',
        lead: 'INAPI administra los derechos de propiedad industrial en Chile. Registra y resguarda marcas, patentes, diseños y otros derechos, y entrega los servicios asociados a cada trámite.',
        seal: { center: 'IN', caption: 'INAPI' },
      }}
    >
      <StorySection
        tone="night"
        eyebrow="Cuenta pública"
        title="Cuenta pública de INAPI"
        lead="Resultados del año, metas cumplidas y desafíos del Instituto."
      >
        <div className="mx-auto max-w-4xl">
          <VideoCard video="cuentaPublica" tone="night" size="lg" />
        </div>
      </StorySection>

      <StorySection
        tone="paper"
        eyebrow="INAPI en cifras"
        dot="primary"
        title="Un año de solicitudes"
        lead="Cifras publicadas por INAPI en el Reporte anual 2025. La variación compara con 2024."
      >
        <div className="grid gap-gob-4 min-[600px]:grid-cols-3">
          <StatTile
            value={marcas2025}
            label="Solicitudes de marca"
            caption="2025, conteo multiclase"
            delta={{ value: pct(marcas2025, marcas2024), label: 'respecto de 2024' }}
            icon={<Tag />}
            tone="night"
          />
          <StatTile
            value={patentes2025}
            label="Solicitudes de patente"
            caption="2025, todos los tipos"
            delta={{ value: pct(patentes2025, patentes2024), label: 'respecto de 2024' }}
            icon={<Lightbulb />}
          />
          <StatTile
            value={PATENTES_ORIGEN['2025'].residentes}
            label="Patentes de residentes en Chile"
            caption="2025"
            delta={{ value: pct(PATENTES_ORIGEN['2025'].residentes, PATENTES_ORIGEN['2024'].residentes), label: 'respecto de 2024' }}
            icon={<Users />}
          />
        </div>
      </StorySection>

      <StorySection tone="mist" eyebrow="Propósito" title="Visión y misión">
        <BentoGrid cols={2}>
          <BentoCard
            variant="night"
            icon={<Eye />}
            title="Visión"
            body="Ser un referente mundial en el registro, la gestión, la promoción y la calidad de la propiedad industrial, como motor del emprendimiento y la innovación para aumentar la productividad y la diversificación de la economía."
          />
          <BentoCard
            icon={<Flag />}
            title="Misión"
            body="Consolidar el Sistema Nacional de Propiedad Industrial protegiendo los derechos, difundiendo el conocimiento y fomentando una visión equilibrada e integral, para contribuir al desarrollo económico y social de Chile."
            delay={0.08}
          />
        </BentoGrid>
      </StorySection>

      <StorySection
        tone="night"
        eyebrow="Historia"
        dot="focus"
        title="Casi dos siglos de propiedad industrial"
        lead="Cómo Chile pasó de privilegios presidenciales del siglo XIX a un instituto público que registra, publica y explica estos derechos."
      >
        <StoryTimeline items={HITOS_PROPIEDAD_INDUSTRIAL} tone="night" label="Hitos de la propiedad industrial en Chile" />
      </StorySection>

      <StorySection
        tone="paper"
        id="conoce-inapi"
        eyebrow="El Instituto"
        title="Funciones, autoridades y documentos"
        lead="Elige un tema. Cada sección enlaza a los documentos oficiales."
      >
        <div className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-02 min-[905px]:p-gob-7">
          <NosotrosHub />
        </div>
      </StorySection>

      <CtaBand
        eyebrow="Transparencia"
        title="Revisa cómo usamos los recursos públicos"
        body="El presupuesto, la ejecución y los estados financieros están publicados por año."
        primary={{ href: '/transparencia/gasto-presupuestario', label: 'Ver el gasto presupuestario' }}
        secondary={{ href: '/contacto', label: 'Contactar a INAPI' }}
        seal={{ center: 'PI', caption: 'INAPI' }}
      />
    </StoryPage>
  )
}