import type { Metadata } from 'next'
import { BadgeCheck, Globe, Mountain, Users } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalInfoGrid, PortalMain, PortalSectionTitle } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Sello de Origen — INAPI',
  description:
    'Reconoce y protege formas especiales de manufactura, oficios tradicionales y productos singulares de Chile.',
}

const tiposSello = [
  { title: 'Indicación Geográfica', icon: Globe },
  { title: 'Denominación de Origen', icon: Mountain },
  { title: 'Marca Colectiva', icon: Users },
  { title: 'Marca de Certificación', icon: BadgeCheck },
]

const pasos = [
  'Prepara la solicitud',
  'Ingresa la solicitud en INAPI',
  'Examen de forma',
  'Informe del Ministerio de Agricultura',
  'Publicación',
  'Oposición',
  'Examen de fondo',
  'Resolución',
]

export default function SelloDeOrigenPage() {
  return (
    <PortalShell variant="page" pageTitle="Sello de Origen">
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Para informarse</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                {
                  title: 'Qué es el Sello de Origen',
                  body: 'Reconoce y protege formas especiales de manufactura, oficios tradicionales y productos singulares del país.',
                },
                {
                  title: 'Beneficios de obtener el Sello de Origen',
                  body: 'Retribuye el esfuerzo y el trabajo de las comunidades del país que producen bienes con identidad territorial.',
                },
                {
                  title: 'Costo de tramitación',
                  body: 'El registro de indicaciones geográficas, denominaciones de origen, marcas colectivas o de certificación paga un derecho equivalente a 3 unidades tributarias mensuales (UTM).',
                },
                {
                  title: 'Productos registrados y en proceso',
                  body: 'Conoce los productos tradicionales de Chile reconocidos con el Sello de Origen o en proceso de reconocimiento.',
                },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Tipos de sello</PortalSectionTitle>
            <div className="grid min-[600px]:grid-cols-2 min-[905px]:grid-cols-4 gap-gob-4">
              {tiposSello.map(item => {
                const Icon = item.icon
                return (
                  <div
                    key={item.title}
                    className="bg-gob-surface-elevated rounded-gob-md p-gob-5 text-center flex flex-col items-center gap-gob-3"
                  >
                    <Icon className="w-8 h-8 text-inapi-cta" aria-hidden />
                    <p className="text-gri-body-sm font-bold leading-snug">{item.title}</p>
                  </div>
                )
              })}
            </div>
          </section>

          <section>
            <PortalSectionTitle>Pasos para obtener un sello</PortalSectionTitle>
            <ol className="grid min-[600px]:grid-cols-2 min-[905px]:grid-cols-4 gap-gob-4 list-none">
              {pasos.map((paso, index) => (
                <li
                  key={paso}
                  className="bg-card border border-gob-border rounded-gob-md p-gob-4 text-center flex flex-col gap-gob-2"
                >
                  <span className="text-2xl font-bold text-inapi-cta" aria-hidden>
                    {index + 1}
                  </span>
                  <span className="text-gri-body-xs leading-snug">{paso}</span>
                </li>
              ))}
            </ol>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
