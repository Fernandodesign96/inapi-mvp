import type { Metadata } from 'next'
import { DownloadGroups } from '@/components/story/DownloadGroups'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { MARCAS_DOWNLOADS } from '@/lib/downloadable-docs'

export const metadata: Metadata = {
  title: 'Documentos descargables: — INAPI',
  description: 'Revisa todos los documentos correspondiente a los procesos y etapas de solicitud de Marca.',
}

export default function MarcasDocumentosPage() {
  return (
    <StoryPage
      path="/marcas/documentos-descargables"
      hero={{
        eyebrow: 'Marcas',
        dot: 'accent',
        lead: 'Revisa todos los documentos correspondiente a los procesos y etapas de solicitud de Marca.',
        seal: { center: 'PDF', caption: 'DESCARGAS' },
      }}
    >
      <StorySection tone="paper" eyebrow="Archivos oficiales" title="Documentos descargables:">
        <DownloadGroups groups={MARCAS_DOWNLOADS} />
      </StorySection>
      <ShortcutBand kind="marcas" title="Registra tu marca" />
    </StoryPage>
  )
}
