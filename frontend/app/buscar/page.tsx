import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PortalShell } from '@/components/layout/PortalShell'
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
    <PortalShell {...portalShellProps('/buscar')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <Suspense fallback={<p className="text-gri-body text-muted-foreground">Cargando buscador…</p>}>
            <BuscadorSitio />
          </Suspense>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
