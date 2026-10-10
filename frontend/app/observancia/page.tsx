import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { ObservanciaHub } from '@/components/portal/ObservanciaHub'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Observancia — INAPI',
  description:
    'Información sobre piratería, falsificación, delitos, denuncia y cómo prevenir infracciones a la propiedad intelectual.',
}

export default function ObservanciaPage() {
  return (
    <PortalShell
      {...portalShellProps('/observancia', {
        pageSubtitle:
          'Conoce y utiliza las herramientas de protección frente a la piratería, la falsificación y otras infracciones.',
      })}
    >
      <ContainerGRI size="wide" className="py-gob-8 min-[905px]:py-12">
        <ObservanciaHub />
      </ContainerGRI>
    </PortalShell>
  )
}
