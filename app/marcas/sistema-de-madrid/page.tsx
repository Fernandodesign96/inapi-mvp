import type { Metadata } from 'next'
import Link from 'next/link'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalInfoGrid, PortalMain, PortalSectionTitle } from '@/components/portal/content'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Sistema de Madrid — INAPI',
  description:
    'Registra tu marca en varios países mediante un solo trámite internacional a través del Sistema de Madrid.',
}

export default function SistemaDeMadridPage() {
  return (
    <PortalShell
      variant="page"
      pageTitle="Sistema de Madrid"
      active="marcas"
      breadcrumbs={[{ label: 'Marcas', href: '/marcas' }, { label: 'Sistema de Madrid' }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Para informarse</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                {
                  title: '¿Qué es el Sistema de Madrid?',
                  body: 'Permite solicitar el registro de una marca en varios países mediante un solo trámite, en vez de presentar una solicitud por separado en cada país.',
                },
                {
                  title: 'Requisitos para registrar una marca en otros países',
                  body: 'Necesitas contar con una marca de base: una marca ya inscrita o solicitada en Chile.',
                },
                {
                  title: 'Etapas del registro internacional',
                  body: 'Presentas la solicitud ante INAPI. INAPI actúa como oficina de origen y la recibe con base en tu marca inscrita o solicitada en Chile.',
                },
                {
                  title: 'Beneficios del Sistema de Madrid',
                  body: 'Empresas chilenas y extranjeras con domicilio en Chile obtienen protección internacional para sus marcas mediante un solo procedimiento y un solo pago.',
                },
              ]}
            />
          </section>

          <section
            aria-labelledby="madrid-cta-title"
            className="bg-inapi-portal-hero text-gob-text-inverse rounded-gob-md p-gob-6 flex flex-col min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between gap-gob-5"
          >
            <div>
              <h2 id="madrid-cta-title" className="text-lg font-bold mb-1.5">
                Presenta tu solicitud internacional de marca
              </h2>
              <p className="text-gri-body-sm text-gob-text-inverse/80">Contacto: inapi@inapi.cl</p>
            </div>
            <Button className="rounded-none bg-white text-inapi-cta hover:bg-white/90 font-bold h-12 px-gob-6 shrink-0" asChild>
              <Link href="/tramites-digitales">Ir a trámites</Link>
            </Button>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
