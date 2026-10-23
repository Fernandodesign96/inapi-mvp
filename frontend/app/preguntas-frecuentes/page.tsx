import type { Metadata } from 'next'
import { FaqExplorer } from '@/components/portal/FaqExplorer'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/preguntas-frecuentes')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Preguntas frecuentes'} — INAPI`,
  description: meta?.description,
}

export default function PreguntasFrecuentesPage() {
  return (
    <StoryPage
      path="/preguntas-frecuentes"
      hero={{
        eyebrow: 'Ayuda',
        dot: 'primary',
        seal: { center: '?', caption: 'PREGUNTAS' },
      }}
    >
      <StorySection tone="paper" id="preguntas" eyebrow="Preguntas frecuentes" title="Encuentra tu respuesta">
        <FaqExplorer />
      </StorySection>

      <VideoSpotlight
        video="patenteVsMarca"
        tone="night"
        title="Diferencia entre patente y marca"
        lead="Cuándo necesitas una marca, cuándo una patente y cuándo ambas."
        points={[
          {
            title: 'Marca',
            body: 'Es un signo que distingue tus productos o servicios de los de otras personas. Dura diez años y se renueva.',
          },
          {
            title: 'Patente',
            body: 'Protege una invención nueva, con nivel inventivo y aplicación industrial. Dura 20 años desde la presentación.',
          },
        ]}
      />

      <CtaBand
        eyebrow="¿No encontraste tu respuesta?"
        title="Consulta con INAPI"
        body="Teléfono, correo, formulario SIAC o atención en la sede de Santiago."
        primary={{ href: '/contacto', label: 'Ver canales de contacto' }}
        seal={{ center: '?', caption: 'AYUDA' }}
      />
    </StoryPage>
  )
}
