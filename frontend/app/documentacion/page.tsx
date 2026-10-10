import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { DocumentacionHub } from '@/components/portal/DocumentacionHub'
import { PortalMain, PortalProse } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/documentacion')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Centro de documentación'} — INAPI`,
  description: meta?.description,
}

export default function DocumentacionPage() {
  return (
    <PortalShell {...portalShellProps('/documentacion')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            Aquí encuentras las normas que rigen el registro en Chile y los informes que INAPI publica: directrices,
            reportes, legislación, balances, estudios, datos abiertos y estadísticas. Los textos legales se abren en Ley
            Chile (Biblioteca del Congreso Nacional) y los PDF en inapi.cl.
          </PortalProse>
          <DocumentacionHub />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
