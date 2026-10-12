import type { Metadata } from 'next'
import { ToolFlowShell } from '@/components/layout/ToolFlowShell'
import { EstadosDiariosPatentesScreen } from '@/components/tramites/inventory-screens'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Notificaciones diarias de patentes — INAPI',
  description: 'Consulta los estados diarios de patentes publicados por INAPI, sin iniciar sesión.',
}

export default function NotificacionesDiariasPatentesPage() {
  return (
    <ToolFlowShell {...portalShellProps('/notificaciones-diarias/patentes')}>
      <EstadosDiariosPatentesScreen />
    </ToolFlowShell>
  )
}
