import type { Metadata } from 'next'
import { CrossPlatformLink } from '@/components/shared/CrossPlatformLink'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Renovar una marca — INAPI',
  description: 'Una marca registrada dura 10 años y puedes renovarla.',
}

export default function MarcasRenovacionPage() {
  return (
    <PortalShell {...portalShellProps('/marcas/renovacion')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalSectionTitle>Renovar una marca</PortalSectionTitle>
          <PortalProse>
            Un registro de marca dura 10 años. Puedes renovarlo dentro de los 6 meses anteriores o posteriores al
            vencimiento.
          </PortalProse>
          <CrossPlatformLink
            href="/tramites/marcas/renovaciones"
            label="Iniciar renovación de marca"
            targetPlatform="tramites"
            requiresAuth
            variant="button-primary"
          />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
