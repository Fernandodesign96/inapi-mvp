import type { Metadata } from 'next'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { ToolFlowShell } from '@/components/layout/ToolFlowShell'
import { BuscadorSimilitudMarca } from '@/components/portal/BuscadorSimilitudMarca'

export const metadata: Metadata = {
  title: 'Buscador de similitud de marcas — INAPI',
  description: 'Compara tu marca con las ya registradas o solicitadas en INAPI antes de pedir el registro.',
}

export default function BuscadorSimilitudPage() {
  return (
    <ToolFlowShell
      active="marcas"
      variant="page"
      pageTitle="Revisa si tu marca se parece a otra"
      pageSubtitle="Usa esta herramienta antes de pedir el registro de tu marca."
      breadcrumbs={[
        { label: 'Marcas', href: '/marcas' },
        { label: 'Revisa si tu marca se parece a otra' },
      ]}
    >
      <ContainerGRI size="portal" className="py-gob-6 pb-gob-8">
        <BuscadorSimilitudMarca />
      </ContainerGRI>
    </ToolFlowShell>
  )
}
