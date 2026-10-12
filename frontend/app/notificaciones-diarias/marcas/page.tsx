import type { Metadata } from 'next'
import { ToolFlowShell } from '@/components/layout/ToolFlowShell'
import { EstadosDiariosMarcasScreen } from '@/components/tramites/inventory-screens'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Notificaciones diarias de marcas — INAPI',
  description: 'Consulta los estados diarios de marcas publicados por INAPI, sin iniciar sesión.',
}

export default function NotificacionesDiariasMarcasPage() {
  return (
    <ToolFlowShell {...portalShellProps('/notificaciones-diarias/marcas')}>
      <EstadosDiariosMarcasScreen />
    </ToolFlowShell>
  )
}
