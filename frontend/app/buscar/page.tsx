import type { Metadata } from 'next'
import { Suspense } from 'react'
import { ToolFlowShell } from '@/components/layout/ToolFlowShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { BuscadorSitio } from '@/components/portal/BuscadorSitio'
import { PortalMain } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Resultados de búsqueda — INAPI',
  description: 'Busca páginas, trámites y noticias del portal INAPI.',
}

export default function BuscarPage() {
  return (
    <ToolFlowShell {...portalShellProps('/buscar')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <Suspense fallback={<p className="text-gri-body text-muted-foreground">Cargando buscador…</p>}>
            <BuscadorSitio />
          </Suspense>
        </PortalMain>
      </ContainerGRI>
    </ToolFlowShell>
  )
}
