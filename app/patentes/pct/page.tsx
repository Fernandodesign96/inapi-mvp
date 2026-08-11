import type { Metadata } from 'next'
import Link from 'next/link'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalInfoGrid, PortalMain, PortalSectionTitle } from '@/components/portal/content'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'PCT — INAPI',
  description:
    'El Tratado de Cooperación en materia de Patentes (PCT) es un sistema de presentación de solicitudes, no de concesión.',
}

const buscadores = [
  {
    label: 'Patentscope',
    href: 'https://patentscope.wipo.int/search/es/search.jsf',
  },
  {
    label: 'Latipat',
    href: 'http://lp.espacenet.com/',
  },
  {
    label: 'Espacenet',
    href: 'https://worldwide.espacenet.com/',
  },
]

export default function PctPage() {
  return (
    <PortalShell
      variant="page"
      pageTitle="PCT"
      pageSubtitle="El Tratado de Cooperación en materia de Patentes (PCT) es un sistema de presentación de solicitudes, no de concesión."
      active="patentes"
      breadcrumbs={[{ label: 'Patentes', href: '/patentes' }, { label: 'PCT' }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>Para informarse</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                {
                  title: 'Qué es el PCT',
                  body: 'El PCT es un tratado internacional administrado por la Organización Mundial de la Propiedad Intelectual (OMPI) que permite presentar una solicitud de patente para su reconocimiento en varios países a la vez.',
                },
                {
                  title: 'Cómo obtener una patente en otros países',
                  body: 'El sistema evita presentar solicitudes de patente por separado en cada país donde se quiere proteger la invención.',
                },
                {
                  title: 'Cómo proteger patentes vía PCT',
                  body: 'Presenta una única solicitud internacional para iniciar el proceso de protección en los países miembros del tratado que elijas.',
                },
                {
                  title: 'INAPI como oficina ISA/IPEA',
                  body: 'La OMPI nombró a INAPI oficina ISA/IPEA el 4 de octubre de 2012. INAPI comenzó a operar en ese rol el 22 de octubre de 2014.',
                },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Buscadores</PortalSectionTitle>
            <div className="flex flex-wrap gap-gob-4">
              {buscadores.map(buscador => (
                <Link
                  key={buscador.label}
                  href={buscador.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-gob-surface-elevated rounded-gob-md px-gob-5 py-gob-4 font-bold text-gob-text hover:bg-[#E6EEF7] transition-colors"
                >
                  {buscador.label}
                </Link>
              ))}
            </div>
          </section>

          <section
            aria-labelledby="pct-cta-title"
            className="bg-inapi-portal-hero text-gob-text-inverse rounded-gob-md p-gob-6 flex flex-col min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between gap-gob-5"
          >
            <div>
              <h2 id="pct-cta-title" className="text-lg font-bold mb-1.5">
                Presentar solicitud internacional vía ePCT
              </h2>
              <p className="text-gri-body-sm text-gob-text-inverse/80">Contacto PCT INAPI: pct@inapi.cl</p>
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
