import type { Metadata } from 'next'
import Link from 'next/link'
import { BookOpen, FolderOpen, History } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalCardGrid, PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Aprende de propiedad industrial — INAPI',
  description:
    'Cursos, talleres y recursos de capacitación sobre propiedad industrial que ofrece INAPI.',
}

export default function AprendePage() {
  return (
    <PortalShell
      variant="page"
      pageTitle="Aprende de propiedad industrial"
      pageSubtitle="Este módulo reúne contenidos, fechas clave, requisitos y formas de inscripción a los cursos, talleres y actividades de capacitación que ofrece INAPI."
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Tipos de capacitaciones</PortalSectionTitle>
            <PortalCardGrid
              items={[
                {
                  title: 'Cursos y talleres en línea',
                  body: 'Actividades formativas a distancia sobre propiedad industrial.',
                  href: '#',
                  cta: 'Ver cursos disponibles',
                },
                {
                  title: 'Martes de Propiedad Industrial',
                  body: 'Ciclo formativo periódico abierto a todo el país, ya en su séptimo año.',
                  href: '#',
                  cta: 'Conocer el ciclo',
                },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Recursos para aprender</PortalSectionTitle>
            <div className="grid min-[600px]:grid-cols-3 gap-gob-4">
              <Link
                href="#"
                className="bg-gob-surface-elevated rounded-gob-md p-gob-5 flex flex-col gap-gob-3 text-gob-text hover:bg-[#E6EEF7] transition-colors"
              >
                <BookOpen className="w-7 h-7 text-inapi-cta" aria-hidden />
                <span className="text-gri-body-sm font-bold leading-snug">Libro historia gráfica</span>
              </Link>
              <Link
                href="/conoce-mas"
                className="bg-gob-surface-elevated rounded-gob-md p-gob-5 flex flex-col gap-gob-3 text-gob-text hover:bg-[#E6EEF7] transition-colors"
              >
                <History className="w-7 h-7 text-inapi-cta" aria-hidden />
                <span className="text-gri-body-sm font-bold leading-snug">Línea de tiempo interactiva</span>
              </Link>
              <Link
                href="#"
                className="bg-gob-surface-elevated rounded-gob-md p-gob-5 flex flex-col gap-gob-3 text-gob-text hover:bg-[#E6EEF7] transition-colors"
              >
                <FolderOpen className="w-7 h-7 text-inapi-cta" aria-hidden />
                <span className="text-gri-body-sm font-bold leading-snug">Informes de dominio público</span>
              </Link>
            </div>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
