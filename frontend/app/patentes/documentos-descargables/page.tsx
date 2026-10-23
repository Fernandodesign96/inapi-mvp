import type { Metadata } from 'next'
import { DownloadGroups } from '@/components/story/DownloadGroups'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { PATENTES_DOWNLOADS } from '@/lib/downloadable-docs'

export const metadata: Metadata = {
  title: 'Documentos descargables: — INAPI',
  description: 'Revisa todos los documentos correspondientes a los procesos y etapas de solicitud de patente.',
}

export default function PatentesDocumentosPage() {
  return (
    <StoryPage
      path="/patentes/documentos-descargables"
      hero={{
        eyebrow: 'Patentes',
        dot: 'primary',
        lead: 'Revisa todos los documentos correspondientes a los procesos y etapas de solicitud de patente, incluidos formularios y directrices de examen 2022.',
        seal: { center: 'PDF', caption: 'DESCARGAS' },
      }}
    >
      <StorySection tone="paper" eyebrow="Archivos oficiales" title="Documentos descargables:">
        <DownloadGroups groups={PATENTES_DOWNLOADS} />
      </StorySection>
      <ShortcutBand kind="patentes" title="Sigue con tu patente" />
    </StoryPage>
  )
}
