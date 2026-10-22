import type { Metadata } from 'next'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage, StoryProse } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'Qué es una marca — INAPI',
  description: 'Una marca identifica tus productos o servicios y los diferencia en el mercado.',
}

export default function QueEsUnaMarcaPage() {
  return (
    <StoryPage
      path="/marcas/que-es-una-marca"
      hero={{
        eyebrow: 'Marcas',
        dot: 'accent',
        lead: 'Una marca identifica tus productos o servicios y los diferencia en el mercado.',
        primary: { href: '/marcas/como-registrar', label: 'Ver cómo registrar una marca' },
        secondary: { href: '#que-protege', label: 'Qué protege una marca' },
        seal: { center: 'R', caption: 'MARCA' },
      }}
    >
      <StorySection tone="paper" id="que-protege" eyebrow="Qué protege" title="Qué protege una marca">
        <StoryProse>
          <p>
            Una marca es un signo que identifica tus productos, servicios o tu negocio y los diferencia del resto en el
            mercado. Puede ser una palabra, un logo, una frase, un sonido o una combinación de estos elementos.
          </p>
          <p>
            Al registrarla, obtienes el derecho exclusivo a usarla en Chile por diez años, con opción de renovarla.
          </p>
        </StoryProse>
      </StorySection>

      <VideoSpotlight
        video="patenteVsMarca"
        tone="night"
        title="Diferencia entre patente y marca"
        lead="Cuándo necesitas una marca, cuándo una patente y cuándo ambas."
        points={[
          { title: 'Marca', body: 'Un signo que identifica tus productos, servicios o tu negocio.' },
          { title: 'Diez años', body: 'Derecho exclusivo en Chile, con opción de renovarla.' },
        ]}
      />

      <CtaBand
        eyebrow="Siguiente paso"
        title="Registra tu marca"
        primary={{ href: '/marcas/como-registrar', label: 'Ver cómo registrar una marca' }}
        secondary={{ href: '/marcas/buscador-similitud', label: 'Buscador de marcas' }}
      />
    </StoryPage>
  )
}
