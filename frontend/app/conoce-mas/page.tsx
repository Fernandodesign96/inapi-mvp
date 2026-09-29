import type { Metadata } from 'next'
import { BookOpen, FileText, History, Landmark } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalCardGrid, PortalMain, PortalSectionTitle, PortalTramiteGrid } from '@/components/portal/content'
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
                  href: '/preguntas-frecuentes',
                  cta: 'Leer más',
                },
                {
                  title: 'Conceptos fundamentales',
                  body: 'Es una rama del derecho que fomenta la innovación, la creación y la transferencia tecnológica, y ordena los mercados para facilitar las decisiones del público consumidor.',
                  href: '/glosario',
                  cta: 'Leer más',
                },
                {
                  title: 'Derechos de la propiedad intelectual',
                  body: 'Distintas áreas especializadas del Estado conceden, reconocen, registran y administran los derechos de propiedad intelectual.',
                  href: '/preguntas-frecuentes',
                  cta: 'Leer más',
                },
                {
                  title: 'Tribunal de Propiedad Industrial',
                  body: 'Este tribunal se creó mediante el artículo 17° bis C de la Ley 19.039 de Propiedad Industrial y sus modificaciones.',
                  href: 'https://www.inapi.cl/conoce-mas/tribunal-propiedad-industrial',
                  cta: 'Leer más',
                },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Conoce más</PortalSectionTitle>
            <PortalTramiteGrid
              items={[
                {
                  href: 'https://www.inapi.cl/conoce-mas/primer-libro-marcas',
                  title: 'Primer libro de registro de marcas (1885 a 1891)',
                  icon: BookOpen,
                },
                {
                  href: 'https://www.inapi.cl/conoce-mas/primer-libro-patentes',
                  title: 'Primer libro de patentes (1840 a 1912)',
                  icon: FileText,
                },
                {
                  href: 'https://www.inapi.cl/conoce-mas/historia-propiedad-industrial',
                  title: 'Historia de la propiedad industrial',
                  icon: History,
                },
                {
                  href: 'https://www.inapi.cl/conoce-mas/museo-virtual',
                  title: 'Museo virtual de INAPI',
                  icon: Landmark,
                },
              ]}
            />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
