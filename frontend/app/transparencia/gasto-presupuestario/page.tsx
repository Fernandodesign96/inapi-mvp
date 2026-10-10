import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { GastoDashboard } from '@/components/portal/GastoDashboard'
import { PortalMain } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/transparencia/gasto-presupuestario')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Gasto presupuestario'} — INAPI`,
  description: meta?.description,
}

export default function GastoPresupuestarioPage() {
  return (
    <PortalShell {...portalShellProps('/transparencia/gasto-presupuestario')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <GastoDashboard />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
