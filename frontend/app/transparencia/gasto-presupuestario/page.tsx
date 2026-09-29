import type { Metadata } from 'next'
import Link from 'next/link'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalDownloadList, PortalMain, PortalProse } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Gasto presupuestario — INAPI',
  description:
    'Consulta la ejecución presupuestaria de INAPI según la Ley N.° 20.285 de Transparencia y Acceso a la Información Pública.',
}

export default function GastoPresupuestarioPage() {
  return (
    <PortalShell {...portalShellProps('/transparencia/gasto-presupuestario')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse className="mb-gob-6">
            INAPI publica periódicamente el detalle de su ejecución presupuestaria, según lo exige la Ley N.° 20.285 de
            Transparencia y Acceso a la Información Pública.
          </PortalProse>

          <PortalDownloadList
            items={[
              { label: 'Ejecución presupuestaria 2026', href: '#' },
              { label: 'Ejecución presupuestaria 2025', href: '#' },
            ]}
          />

          <p className="text-gri-body-xs text-muted-foreground mt-gob-6">
            Consulta el detalle histórico completo en el{' '}
            <Link
              href="https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=AY001"
              className="underline text-gob-link hover:text-gob-primary-dark"
              target="_blank"
              rel="noopener noreferrer"
            >
              Portal de Transparencia del Estado
            </Link>
            .
          </p>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
