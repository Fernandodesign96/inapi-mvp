import type { Metadata } from 'next'
import { Suspense } from 'react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { SalaPrensa } from '@/components/portal/SalaPrensa'
import { PortalMain } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Sala de Prensa — INAPI',
  description: 'Noticias, comunicados y actualidad del Instituto Nacional de Propiedad Industrial.',
}

export default function SalaDePrensaPage() {
  return (
    <PortalShell {...portalShellProps('/sala-de-prensa', { active: 'prensa' })}>
      <ContainerGRI size="portal">
        <PortalMain>
          <Suspense fallback={<p className="text-gri-body text-muted-foreground">Cargando noticias…</p>}>
            <SalaPrensa />
          </Suspense>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
