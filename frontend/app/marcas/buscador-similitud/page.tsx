import type { Metadata } from 'next'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { ToolFlowShell } from '@/components/layout/ToolFlowShell'
import { BuscadorSimilitudMarca } from '@/components/portal/BuscadorSimilitudMarca'

export const metadata: Metadata = {
  title: 'Buscador de marcas — INAPI',
  description: 'Compara tu nombre con marcas anteriores.',
}

export default function BuscadorSimilitudPage() {
  return (
    <ToolFlowShell
      active="marcas"
      variant="page"
      pageTitle="Buscador de marcas"
      pageSubtitle="Compara tu nombre con marcas anteriores."
      breadcrumbs={[
        { label: 'Marcas', href: '/marcas' },
        { label: 'Buscador de marcas' },
      ]}
    >
      <ContainerGRI size="portal" className="py-gob-6 pb-gob-8">
        <BuscadorSimilitudMarca />
      </ContainerGRI>
    </ToolFlowShell>
  )
}
