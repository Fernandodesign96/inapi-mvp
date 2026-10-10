import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { HeritageBanner } from '@/components/portal/HeritageBanner'
import { PortalCardGrid, PortalMain, PortalSectionTitle } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conoce-mas')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Conoce más'} — INAPI`,
  description: 'Información sobre propiedad intelectual e industrial, conceptos fundamentales y patrimonio histórico de INAPI.',
}

export default function ConoceMasPage() {
  return (
    <PortalShell {...portalShellProps('/conoce-mas')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Para informarse</PortalSectionTitle>
            <PortalCardGrid
              items={[
                {
                  title: 'Qué es la propiedad intelectual e industrial',
                  body: 'Comprende toda creación de la mente humana: inventos, modelos de utilidad, marcas, obras literarias y artísticas.',
                  href: '/conoce-mas/que-es-la-propiedad-intelectual-e-industrial',
                  cta: 'Leer más',
                },
                {
                  title: 'Conceptos fundamentales',
                  body: 'Es una rama del derecho que fomenta la innovación, la creación y la transferencia tecnológica, y ordena los mercados para facilitar las decisiones del público consumidor.',
                  href: '/conoce-mas/conceptos-fundamentales',
                  cta: 'Leer más',
                },
                {
                  title: 'Derechos de la propiedad intelectual',
                  body: 'Distintas áreas especializadas del Estado conceden, reconocen, registran y administran los derechos de propiedad intelectual.',
                  href: '/conoce-mas/derechos-de-propiedad-intelectual',
                  cta: 'Leer más',
                },
                {
                  title: 'Tribunal de Propiedad Industrial',
                  body: 'Este tribunal se creó mediante el artículo 17° bis C de la Ley 19.039 de Propiedad Industrial y sus modificaciones.',
                  href: '/conoce-mas/tribunal-de-propiedad-industrial',
                  cta: 'Leer más',
                },
              ]}
            />
          </section>

          <section className="space-y-gob-4">
            <PortalSectionTitle>Conoce más</PortalSectionTitle>
            <HeritageBanner />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
