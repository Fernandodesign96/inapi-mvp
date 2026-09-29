import type { Metadata } from 'next'
import Link from 'next/link'
import { BarChart3 } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Estadísticas — INAPI',
  description:
    'Estadísticas de solicitudes y registros de marcas, patentes, modelos de utilidad, diseños y PCT.',
}

const categorias = [
  {
    title: 'Marcas',
    description: 'Solicitudes, registros y marcas según género.',
    href: '#',
  },
  {
    title: 'Patentes',
    description: 'Solicitudes y registros de patentes de invención.',
    href: '#',
  },
  {
    title: 'Modelo de utilidad',
    description: 'Solicitudes y registros de modelos de utilidad.',
    href: '#',
  },
  {
    title: 'Diseños',
    description: 'Solicitudes y registros de diseños industriales.',
    href: '#',
  },
  {
    title: 'Tratado de Cooperación en materia de Patentes',
    description: 'Solicitudes PCT presentadas desde Chile.',
    href: '#',
  },
]

export default function EstadisticasPage() {
  return (
    <PortalShell
      variant="page"
      pageTitle="Estadísticas"
      breadcrumbs={[{ label: 'Centro de documentación', href: '/documentacion' }, { label: 'Estadísticas' }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <div className="grid min-[600px]:grid-cols-3 gap-gob-4">
            {categorias.map(categoria => (
              <Link
                key={categoria.title}
                href={categoria.href}
                className="bg-gob-surface-elevated rounded-gob-md p-gob-5 flex flex-col gap-gob-3 text-gob-text hover:bg-[#E6EEF7] transition-colors"
              >
                <BarChart3 className="w-7 h-7 text-inapi-cta" aria-hidden />
                <span className="text-gri-body-sm font-bold leading-snug">{categoria.title}</span>
                <span className="text-gri-body-xs text-muted-foreground leading-relaxed">{categoria.description}</span>
              </Link>
            ))}
          </div>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
