import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { SiacForm } from '@/components/portal/SiacForm'
import { PortalMain } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Formulario de contacto (SIAC) — INAPI',
  description: 'Envía tus consultas, sugerencias, reclamos o felicitaciones a INAPI mediante el Sistema de Atención Ciudadana.',
}

export default function SiacPage() {
  return (
    <PortalShell {...portalShellProps('/contacto/siac')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <SiacForm />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
