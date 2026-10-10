import type { Metadata } from 'next'
import Link from 'next/link'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalCardGrid, PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conecta')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Conecta'} — INAPI`,
  description: 'Espacio público y gratuito para mostrar tecnologías protegidas y encontrar quien quiera usarlas.',
}

export default function ConectaPage() {
  return (
    <PortalShell
      {...portalShellProps('/conecta', {
        pageSubtitle:
          'Conecta es un espacio público y gratuito: quien crea o investiga muestra tecnologías con derechos de propiedad industrial; quien invierte o produce puede conocerlas.',
      })}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            No reemplaza un contrato. Sirve para visibilizar ofertas y demandas de tecnología protegida en Chile y para
            orientar una negociación posterior.
          </PortalProse>
          <section>
            <PortalSectionTitle>Para informarse antes de publicar o buscar</PortalSectionTitle>
            <PortalCardGrid
              items={[
                {
                  title: 'Qué es Conecta',
                  body: 'Explica el propósito del espacio: poner en contacto a titulares de derechos con quienes quieren usar o explotar esas tecnologías.',
                  href: 'https://www.inapi.cl/conecta',
                  cta: 'Leer en inapi.cl',
                },
                {
                  title: 'Políticas de uso',
                  body: 'Condiciones para publicar, consultar y tratar los datos de las tecnologías que aparecen en la plataforma.',
                  href: 'https://www.inapi.cl/conecta',
                  cta: 'Revisar las reglas',
                },
                {
                  title: 'Guía de transferencia tecnológica',
                  body: 'Nociones básicas para pasar de un derecho registrado a un acuerdo: licencia, cesión u otra forma de uso.',
                  href: 'https://www.inapi.cl/conecta',
                  cta: 'Abrir la guía',
                },
                {
                  title: 'Manuales de usuario',
                  body: 'Pasos para crear una ficha, buscar tecnologías y usar las funciones de la plataforma Conecta.',
                  href: 'https://www.inapi.cl/conecta',
                  cta: 'Ver los manuales',
                },
              ]}
            />
          </section>
          <div className="portal-ambient-hero rounded-gob-lg p-gob-6 flex flex-wrap items-center justify-between gap-gob-5">
            <p className="relative z-[1] max-w-xl text-gri-body font-medium text-gob-text-inverse">
              El buscador de fichas tecnológicas está en la plataforma Conecta.
            </p>
            <Link
              href="http://www.inapiconecta.cl/"
              className="relative z-[1] inline-flex min-h-11 items-center rounded-full bg-gob-primary px-gob-6 py-gob-3 font-medium text-gob-text-inverse hover:bg-gob-primary-dark transition-colors"
            >
              Ir al buscador de Conecta
            </Link>
          </div>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
