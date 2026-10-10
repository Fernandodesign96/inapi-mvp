import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { NosotrosHub } from '@/components/portal/NosotrosHub'
import { PortalMain } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/nosotros')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Acerca de INAPI'} — INAPI`,
  description: 'Funciones, objetivos y valores del Instituto Nacional de Propiedad Industrial.',
}

export default function NosotrosPage() {
  return (
    <PortalShell {...portalShellProps('/nosotros')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <NosotrosHub />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
