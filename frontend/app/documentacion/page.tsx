import type { Metadata } from 'next'
import { DocumentacionHub } from '@/components/portal/DocumentacionHub'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/documentacion')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Centro de documentación'} — INAPI`,
  description: meta?.description,
}

export default function DocumentacionPage() {
  return (
    <StoryPage
      path="/documentacion"
      hero={{
        eyebrow: 'Leyes y documentos',
        dot: 'primary',
        lead: 'Aquí encuentras las normas que rigen el registro en Chile y los informes que INAPI publica: directrices, reportes, legislación, balances, estudios, datos abiertos y estadísticas. Los textos legales se abren en Ley Chile (Biblioteca del Congreso Nacional) y los PDF en inapi.cl.',
        primary: { href: '#documentos', label: 'Explorar documentos' },
        secondary: { href: '/glosario', label: 'Abrir el glosario' },
        seal: { center: '§', caption: 'DOCUMENTACIÓN' },
      }}
    >
      <StorySection tone="paper" id="documentos" eyebrow="Centro de documentación" title="Normas, informes y datos" align="left">
        <div className="rounded-gob-xl border border-gob-border bg-card p-gob-5 shadow-elevation-02 min-[905px]:p-gob-7">
          <DocumentacionHub />
        </div>
      </StorySection>

      <CtaBand
        eyebrow="¿Buscas una definición?"
        title="Explican el sentido oficial de cada expresión"
        body="Más de 170 términos del glosario institucional de INAPI."
        primary={{ href: '/glosario', label: 'Abrir el glosario' }}
        secondary={{ href: '/preguntas-frecuentes', label: 'Ver preguntas frecuentes' }}
        seal={{ center: '§', caption: 'DOCUMENTOS' }}
      />
    </StoryPage>
  )
}
