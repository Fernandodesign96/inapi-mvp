import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3, Building2, FileText, Gavel } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalLinkList, PortalMain, PortalSectionTitle } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Centro de documentación — INAPI',
  description:
    'Legislación, estadísticas, informes y balances de gestión sobre propiedad industrial en Chile.',
}

const legislacion = [
  { label: 'Ley N.° 19.039, de Propiedad Industrial', href: '#' },
  { label: 'Reglamento de la Ley de Propiedad Industrial', href: '#' },
  { label: 'Convenio de París para la Protección de la Propiedad Industrial', href: '#' },
  { label: 'Tratado de Cooperación en materia de Patentes (PCT)', href: '#' },
]

const secciones = [
  { href: '/documentacion/estadisticas', title: 'Estadísticas', icon: BarChart3 },
  { href: '#', title: 'Informes', icon: FileText },
  { href: '#', title: 'Balances de gestión', icon: Building2 },
]

export default function DocumentacionPage() {
  return (
    <PortalShell variant="page" pageTitle="Centro de documentación">
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Legislación</PortalSectionTitle>
            <PortalLinkList links={legislacion.map(item => ({ ...item, icon: Gavel }))} />
          </section>

          <section>
            <PortalSectionTitle>Otras secciones del centro de documentación</PortalSectionTitle>
            <div className="grid min-[600px]:grid-cols-3 gap-gob-4">
              {secciones.map(item => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.title}
                    href={item.href}
                    className="bg-gob-surface-elevated rounded-gob-md p-gob-5 flex flex-col gap-gob-3 text-gob-text hover:bg-[#E6EEF7] transition-colors"
                  >
                    <Icon className="w-7 h-7 text-inapi-cta" aria-hidden />
                    <span className="text-gri-body-sm font-bold leading-snug">{item.title}</span>
                  </Link>
                )
              })}
            </div>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
