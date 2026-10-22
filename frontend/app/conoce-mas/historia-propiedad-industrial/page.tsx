import type { Metadata } from 'next'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { StoryTimeline } from '@/components/story/StoryTimeline'
import { HITOS_PROPIEDAD_INDUSTRIAL } from '@/lib/inapi-hitos'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conoce-mas/historia-propiedad-industrial')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Historia de la propiedad industrial'} — INAPI`,
  description: meta?.description,
}

export default function HistoriaPropiedadIndustrialPage() {
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
