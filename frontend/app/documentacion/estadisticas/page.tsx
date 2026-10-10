import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { DocumentacionHub } from '@/components/portal/DocumentacionHub'
import { PortalMain, PortalProse } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Estadísticas — INAPI',
  description:
    'Estadísticas de solicitudes y registros de marcas, patentes, modelos de utilidad, diseños y PCT.',
}

export default function EstadisticasPage() {
  return (
    <PortalShell {...portalShellProps('/documentacion/estadisticas')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            Series de referencia del MVP para marcas, patentes, modelos de utilidad, diseños y PCT. Las visualizaciones
            oficiales en Tableau están en inapi.cl.
          </PortalProse>
          <DocumentacionHub initialTab="estadisticas" />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
