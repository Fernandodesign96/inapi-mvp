import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { BuscadorSimilitudMarca } from '@/components/portal/BuscadorSimilitudMarca'

export const metadata: Metadata = {
  title: 'Buscador de similitud de marcas — INAPI',
  description:
    'Compara tu marca con las ya registradas en INAPI antes de iniciar tu solicitud. Resultados orientativos con porcentaje de parecido.',
}

export default function BuscadorSimilitudPage() {
  return (
    <PortalShell
      active="marcas"
      variant="page"
      pageTitle="Buscador de similitud de marcas"
      pageSubtitle="Usa esta herramienta antes de iniciar la solicitud de tu marca."
      breadcrumbs={[
        { label: 'Marcas', href: '/marcas' },
        { label: 'Buscador de similitud de marcas' },
      ]}
    >
      <ContainerGRI size="portal" className="py-gob-6 pb-gob-8">
        <BuscadorSimilitudMarca />
      </ContainerGRI>
    </PortalShell>
  )
}
