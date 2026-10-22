import type { Metadata } from 'next'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage, StoryProse } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'Qué es una patente — INAPI',
  description: 'Una patente protege un invento y te da el derecho exclusivo a usarlo en Chile.',
}

export default function QueEsUnaPatentePage() {
  return (
    <StoryPage
      path="/patentes/que-es-una-patente"
      hero={{
        eyebrow: 'Patentes',
        dot: 'primary',
        lead: 'Una patente protege un invento y te da el derecho exclusivo a usarlo en Chile.',
        primary: { href: '/patentes/como-registrar', label: 'Ver cómo registrar una patente' },
        secondary: { href: '#que-protege', label: 'Qué protege una patente' },
        seal: { center: 'P', caption: 'PATENTE' },
      }}
    >
      <StorySection tone="paper" id="que-protege" eyebrow="Qué protege" title="Qué protege una patente">
        <StoryProse>
          <p>
            Una patente es un derecho exclusivo que el Estado otorga sobre un invento. Con ella decides quién puede
            fabricar, usar o vender tu invención en Chile.
          </p>
          <p>La protección dura hasta 20 años desde que presentas la solicitud. A cambio, publicas cómo funciona tu invento.</p>
        </StoryProse>
      </StorySection>

      <VideoSpotlight
        video="queEsPatente"
        tone="night"
        title="Qué es una patente"
        lead="Una explicación breve de qué protege una patente y por qué sirve."
        points={[
          { title: 'Derecho exclusivo', body: 'Decides quién puede fabricar, usar o vender tu invención en Chile.' },
          { title: 'Hasta 20 años', body: 'Desde que presentas la solicitud. A cambio, publicas cómo funciona tu invento.' },
        ]}
      />

      <CtaBand
        eyebrow="Siguiente paso"
        title="Presenta tu patente"
        primary={{ href: '/patentes/como-registrar', label: 'Ver cómo registrar una patente' }}
        secondary={{ href: '/patentes/como-registrar/costos', label: 'Costos y plazos' }}
        seal={{ center: 'P', caption: 'PATENTES' }}
      />
    </StoryPage>
  )
}
