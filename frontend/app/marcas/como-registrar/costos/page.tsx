import type { Metadata } from 'next'
import { Clock, CreditCard, Layers } from 'lucide-react'
import { PortalFeeTable } from '@/components/portal/content'
import { CtaBand } from '@/components/story/CtaBand'
import { FactTiles } from '@/components/story/FactTiles'
import { StoryPage, StoryProse } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { UTM_CLP } from '@/lib/tramites/mock-data'

export const metadata: Metadata = {
  title: 'Costos y plazos del registro de marca — INAPI',
  description: 'Tasas y plazos habituales para registrar una marca en Chile.',
}

export default function MarcasCostosPage() {
  return (
    <StoryPage
      path="/marcas/como-registrar/costos"
      hero={{
        eyebrow: 'Costos y plazos del registro',
        dot: 'accent',
        primary: { href: '/marcas/como-registrar', label: 'Guía para registrar una marca 2026' },
        secondary: { href: '#tarifas', label: 'Ver tarifas por clase' },
        panel: (
          <FactTiles
            items={[
              { icon: <CreditCard />, value: '1 UTM', label: 'Tasa de presentación', sublabel: 'por cada clase de Niza' },
              { icon: <Clock />, value: '6 a 8 meses', label: 'Plazo habitual', sublabel: 'si no hay oposiciones' },
              { icon: <Layers />, value: '3 etapas', label: 'Presentación, publicación y examen' },
            ]}
          />
        ),
      }}
    >
      <StorySection tone="paper" id="tarifas" eyebrow="Tarifas" title="Pagas en dos momentos y por cada clase">
        <StoryProse>
          <p>Pagas en dos momentos y por cada clase. Los valores oficiales se confirman al momento del pago.</p>
          <PortalFeeTable
            caption="Tarifas por clase, vigentes a 2026."
            headers={['Momento del pago', 'Valor por clase']}
            rows={[
              ['Al presentar la solicitud', '1 UTM'],
              ['Al aprobarse el registro', '2 UTM'],
            ]}
          />
          <p className="text-gri-body-sm text-muted-foreground">
            1 UTM equivale a ${UTM_CLP.toLocaleString('es-CL')} pesos de referencia. El monto exacto depende del valor UTM
            vigente al pagar.
          </p>
        </StoryProse>
      </StorySection>

      <VideoSpotlight
        video="solicitarMarca"
        tone="night"
        title="Cómo solicitar una marca en línea"
        lead="Paso a paso para presentar tu solicitud de marca en el Portal de trámites."
        points={[
          { title: 'Al presentar la solicitud', body: 'Pagas la tasa de presentación por cada clase de Niza.' },
          { title: 'Al aprobarse el registro', body: 'Pagas el segundo valor por clase para obtener el registro.' },
        ]}
      />

      <CtaBand
        eyebrow="Portal de trámites"
        title="Solicita tu marca en línea"
        primary={{ href: '/marcas/solicitud-nueva', label: 'Ingresar solicitud de marca' }}
        secondary={{ href: '/marcas/como-registrar', label: 'Ver la guía' }}
      />
    </StoryPage>
  )
}
