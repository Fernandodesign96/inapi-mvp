import type { Metadata } from 'next'
import { BarChart3, Eye, FileText, Flag, Gavel } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalBulletList,
  PortalLinkList,
  PortalMain,
  PortalProse,
  PortalSectionTitle,
  PortalSidebarLayout,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/nosotros')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Acerca de INAPI'} — INAPI`,
  description: 'Funciones, objetivos y valores del Instituto Nacional de Propiedad Industrial.',
}

const sidebar = [
  { href: '/nosotros', label: 'INAPI', active: true },
  { href: '#funciones', label: 'Funciones' },
  { href: '#objetivos', label: 'Objetivos' },
  { href: 'https://www.inapi.cl/nosotros/director-nacional', label: 'Director nacional' },
  { href: 'https://www.inapi.cl/nosotros/organigrama', label: 'Organigrama' },
  { href: 'https://www.inapi.cl/nosotros/indicadores', label: 'Indicadores' },
  { href: 'https://www.inapi.cl/nosotros/balances', label: 'Balances' },
  { href: 'https://www.inapi.cl/nosotros/compromisos-calidad', label: 'Compromisos de calidad' },
  { href: 'https://www.inapi.cl/nosotros/trabaje-con-nosotros', label: 'Trabaje con nosotros' },
]

export default function NosotrosPage() {
  return (
    <PortalShell {...portalShellProps('/nosotros')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalSidebarLayout sidebar={sidebar}>
            <section>
              <PortalSectionTitle>¿Qué hace INAPI?</PortalSectionTitle>
              <PortalProse className="mb-gob-3">
                INAPI <strong className="text-gob-text">administra los derechos de propiedad industrial</strong> en
                Chile. Registra y resguarda marcas, patentes, diseños y otros derechos, y entrega los servicios
                asociados a cada trámite.
              </PortalProse>
              <PortalProse>
                También difunde la información técnica y tecnológica que reúne, y apoya la innovación, el
                emprendimiento y la transferencia de conocimiento a la comunidad.
              </PortalProse>
            </section>

            <section id="funciones">
              <PortalSectionTitle>Funciones principales</PortalSectionTitle>
              <PortalBulletList
                items={[
                  'Registrar marcas, patentes y otros derechos de propiedad industrial.',
                  'Resolver las solicitudes y los recursos que presentan las personas.',
                  'Mantener y publicar las bases de datos de derechos vigentes.',
                  'Difundir el conocimiento técnico y apoyar a quienes innovan.',
                ]}
              />
            </section>

            <section id="objetivos">
              <PortalSectionTitle>Objetivos</PortalSectionTitle>
              <div className="grid min-[600px]:grid-cols-2 gap-gob-4 max-w-3xl">
                <div className="bg-gob-surface-elevated rounded-gob-md p-gob-5">
                  <Eye className="w-8 h-8 text-inapi-cta mb-gob-3" aria-hidden />
                  <h3 className="font-bold text-gob-text mb-gob-2">Visión</h3>
                  <p className="text-gri-body-sm text-muted-foreground leading-relaxed">
                    Ser un referente en el registro, la gestión y la calidad de la propiedad industrial, y aportar a la
                    productividad y la innovación del país.
                  </p>
                </div>
                <div className="bg-gob-surface-elevated rounded-gob-md p-gob-5">
                  <Flag className="w-8 h-8 text-inapi-cta mb-gob-3" aria-hidden />
                  <h3 className="font-bold text-gob-text mb-gob-2">Misión</h3>
                  <p className="text-gri-body-sm text-muted-foreground leading-relaxed">
                    Fortalecer el sistema nacional de propiedad industrial protegiendo los derechos, difundiendo el
                    conocimiento y contribuyendo al desarrollo económico y social de Chile.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <PortalSectionTitle>Valores institucionales</PortalSectionTitle>
              <dl className="max-w-3xl space-y-gob-4">
                <div>
                  <dt className="font-bold text-gob-text">Calidad de servicio</dt>
                  <dd className="mt-1 text-gri-body-sm text-muted-foreground leading-relaxed">
                    Diseñamos y evaluamos los servicios pensando en la satisfacción de las personas usuarias.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gob-text">Trabajo en equipo</dt>
                  <dd className="mt-1 text-gri-body-sm text-muted-foreground leading-relaxed">
                    Impulsamos la colaboración entre las personas que trabajan en la institución.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gob-text">Innovación</dt>
                  <dd className="mt-1 text-gri-body-sm text-muted-foreground leading-relaxed">
                    Recogemos ideas del equipo para mejorar procesos y crear nuevos servicios.
                  </dd>
                </div>
                <div>
                  <dt className="font-bold text-gob-text">Responsabilidad social</dt>
                  <dd className="mt-1 text-gri-body-sm text-muted-foreground leading-relaxed">
                    Consideramos el impacto ambiental, la inclusión y el pago oportuno a proveedores.
                  </dd>
                </div>
              </dl>
            </section>

            <section>
              <PortalSectionTitle>Transparencia y gestión</PortalSectionTitle>
              <PortalLinkList
                links={[
                  {
                    href: 'https://www.inapi.cl/nosotros/indicadores',
                    label: 'Revisar los indicadores de gestión',
                    icon: BarChart3,
                  },
                  {
                    href: 'https://www.inapi.cl/nosotros/balances',
                    label: 'Consultar los balances anuales',
                    icon: FileText,
                  },
                  {
                    href: 'https://www.inapi.cl/nosotros/codigo-etica',
                    label: 'Leer el Código de Ética INAPI 2026 (PDF, 620 KB)',
                    icon: Gavel,
                  },
                  {
                    href: 'https://www.inapi.cl/transparencia',
                    label: 'Ver el portal de Ley de Transparencia',
                    icon: Eye,
                  },
                ]}
              />
            </section>
          </PortalSidebarLayout>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
