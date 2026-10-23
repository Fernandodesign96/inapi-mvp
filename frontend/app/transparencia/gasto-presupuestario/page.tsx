import type { Metadata } from 'next'
import { FileText, Landmark, Scale } from 'lucide-react'
import { GastoDashboard } from '@/components/portal/GastoDashboard'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/transparencia/gasto-presupuestario')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Gasto presupuestario'} — INAPI`,
  description: meta?.description,
}

export default function GastoPresupuestarioPage() {
  return (
    <StoryPage
      path="/transparencia/gasto-presupuestario"
      hero={{
        eyebrow: 'Transparencia',
        dot: 'primary',
        primary: { href: '#tablero', label: 'Explorar el presupuesto' },
        secondary: { href: 'https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=AY001', label: 'Portal de Transparencia' },
        seal: { center: '$', caption: 'PRESUPUESTO' },
      }}
    >
      <StorySection tone="mist" eyebrow="Qué encontrarás" title="Cómo INAPI rinde sus recursos">
        <BentoGrid cols={3}>
          <BentoCard icon={<Landmark />} title="Presupuesto asignado" body="Montos que la Ley de Presupuestos destina a INAPI cada año." />
          <BentoCard icon={<Scale />} title="Ejecución" body="Cuánto se gastó efectivamente. Compara lo asignado con lo ejecutado en el tablero." delay={0.05} />
          <BentoCard icon={<FileText />} title="Estados financieros" body="Los estados oficiales se publican por año en el sitio institucional y en el Portal de Transparencia." delay={0.1} />
        </BentoGrid>
      </StorySection>

      <StorySection tone="paper" id="tablero" eyebrow="Ejecución" title="Presupuesto asignado y ejecutado" align="left">
        <GastoDashboard />
      </StorySection>

      <VideoSpotlight
        video="cuentaPublica"
        tone="night"
        title="Cuenta pública de INAPI"
        lead="Resultados del año, metas cumplidas y desafíos del Instituto."
        points={[
          { title: 'Gasto presupuestario', body: 'INAPI publica el presupuesto asignado y lo ejecutado.' },
          { title: 'Estados financieros', body: 'Los estados financieros oficiales se publican por año en el sitio institucional.' },
        ]}
      />

      <CtaBand
        eyebrow="Fuente oficial"
        title="Los montos vigentes se confirman en inapi.cl"
        primary={{ href: 'https://www.inapi.cl/gasto-presupuestario/gasto-presupuestario', label: 'Ver gasto presupuestario en inapi.cl' }}
        secondary={{ href: '/nosotros', label: 'Conocer INAPI' }}
        seal={{ center: '$', caption: 'TRANSPARENCIA' }}
      />
    </StoryPage>
  )
}
