import type { Metadata } from 'next'
import Link from 'next/link'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalCardGrid, PortalMain, PortalSectionTitle } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conecta')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Conecta'} — INAPI`,
  description: 'Plataforma para publicar y consultar tecnologías protegidas por propiedad industrial.',
}

export default function ConectaPage() {
  return (
    <PortalShell {...portalShellProps('/conecta')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Para informarse</PortalSectionTitle>
            <PortalCardGrid
              items={[
                {
                  title: 'Qué es Conecta',
                  body: 'Da a conocer tecnologías protegidas por propiedad industrial a quienes buscan usarlas o explotarlas comercialmente.',
                },
                {
                  title: 'Políticas de uso',
                  body: 'Establecen las condiciones para publicar y consultar tecnologías protegidas dentro de la plataforma.',
                },
                {
                  title: 'Guía de transferencia tecnológica',
                  body: 'Entrega conocimientos básicos para avanzar en la transferencia de tecnologías protegidas mediante un contrato o acuerdo.',
                },
                {
                  title: 'Manuales de usuario',
                  body: 'Explican paso a paso cómo publicar y buscar tecnologías patentadas en Conecta.',
                },
              ]}
            />
          </section>

          <div className="bg-inapi-portal-hero text-gob-text-inverse rounded-gob-md p-gob-6 flex flex-wrap items-center justify-between gap-gob-5">
            <h3 className="text-lg font-bold">Busca información de Conecta</h3>
            <Link
              href="http://www.inapiconecta.cl/"
              className="bg-card text-inapi-cta font-bold px-gob-6 py-gob-3 hover:bg-gob-surface-elevated transition-colors"
            >
              Ir al buscador
            </Link>
          </div>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
