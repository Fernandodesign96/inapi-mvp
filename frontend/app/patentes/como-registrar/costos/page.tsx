import type { Metadata } from 'next'
import { Clock, CreditCard, Layers } from 'lucide-react'
import { CtaBand } from '@/components/story/CtaBand'
import { FactTiles } from '@/components/story/FactTiles'
import { StoryPage } from '@/components/story/StoryPage'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { UTM_CLP } from '@/lib/tramites/mock-data'

export const metadata: Metadata = {
  title: 'Costos y plazos del registro de patente — INAPI',
  description: 'Tasas y plazos habituales para registrar una patente en Chile.',
}

export default function PatentesCostosPage() {
  return (
    <StoryPage
      path="/patentes/como-registrar/costos"
      hero={{
        eyebrow: 'Costos y plazos del registro',
        dot: 'primary',
        lead: 'Confirma el valor vigente en el Portal de trámites antes de pagar. Esta página no modifica las tasas oficiales.',
        primary: { href: '/tramites/patentes/solicitar', label: 'Ingresar solicitud de patente' },
        secondary: { href: '#video-costos', label: 'Ver el video' },
        panel: (
          <div className="flex flex-col gap-gob-3">
            <FactTiles
              items={[
                { icon: <CreditCard />, value: '1 UTM', label: 'Tasa de presentación' },
                { icon: <Clock />, value: 'Hasta 20 años', label: 'Vigencia desde la presentación' },
                { icon: <Layers />, value: '5 etapas', label: 'Presentación, forma, publicación, peritaje y registro' },
              ]}
            />
            <p className="text-gri-body-xs text-white/70">1 UTM equivale a ${UTM_CLP.toLocaleString('es-CL')} pesos de referencia.</p>
          </div>
        ),
      }}
    >
      <VideoSpotlight
        id="video-costos"
        video="costosPatente"
        tone="mist"
        title="Patentes: costos y duración"
        lead="Cuánto pagas y cuánto tiempo protege una patente en Chile."
        points={[
          { title: 'Tasa de presentación', body: '1 UTM al presentar la solicitud.' },
          { title: 'Vigencia', body: 'Hasta 20 años desde la presentación.' },
          { title: '5 etapas', body: 'Presentación, forma, publicación, peritaje y registro.' },
        ]}
      />

      <CtaBand
        eyebrow="Portal de trámites"
        title="Presenta tu patente en línea"
        body="Confirma el valor vigente en el Portal de trámites antes de pagar."
        primary={{ href: '/tramites/patentes/solicitar', label: 'Ingresar solicitud de patente' }}
        secondary={{ href: '/patentes/como-registrar', label: 'Ver la guía' }}
        seal={{ center: 'P', caption: 'PATENTES' }}
      />
    </StoryPage>
  )
}
