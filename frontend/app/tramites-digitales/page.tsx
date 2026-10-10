import type { Metadata } from 'next'
import { FileText, Users } from 'lucide-react'
import Link from 'next/link'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalCardGrid,
  PortalLinkList,
  PortalMain,
  PortalProse,
  PortalSectionTitle,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/tramites-digitales')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Trámites digitales'} — INAPI`,
  description: meta?.description,
}

export default function TramitesDigitalesPage() {
  return (
    <PortalShell {...portalShellProps('/tramites-digitales')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            Esta lista sigue el Registro Nacional de Trámites del Estado. Todos están en nivel 4: los inicias y
            terminas por internet.
          </PortalProse>
          <PortalProse>
            <strong className="text-gob-text">Quién puede usarlos:</strong> personas y empresas. Casi todos piden
            ClaveÚnica.
          </PortalProse>
          <PortalProse>
            <strong className="text-gob-text">Qué pasa después:</strong> el expediente queda en el Sitio de Trámites.
            Allí ves plazos, pagos y el estado.
          </PortalProse>

          <p>
            <Link
              href="/tramites"
              className="inline-flex min-h-11 items-center rounded-full bg-gob-primary px-gob-6 text-gri-btn font-medium text-gob-text-inverse hover:bg-gob-primary-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              Ir al Sitio de Trámites
            </Link>
          </p>

          <PortalCardGrid
            items={[
              {
                title: 'Registro de marcas comerciales',
                body: 'Protege el signo que identifica tus productos, servicios o establecimientos en Chile. Te da el derecho de usarlo y de impedir que otras personas usen uno igual o parecido sin tu permiso.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/marcas/solicitud-nueva',
                cta: 'Ingresar solicitud de marca',
              },
              {
                title: 'Registro de patente de invención',
                body: 'Pide el derecho exclusivo sobre una invención, un modelo de utilidad, un diseño o un esquema de trazado de circuito integrado.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/tramites/patentes/solicitar',
                cta: 'Ingresar solicitud de patente',
              },
              {
                title: 'Anotaciones de marcas',
                body: 'Informa cambios que afectan un registro de marca: titular, representante, dirección u otras menciones al margen.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/tramites/marcas/anotaciones',
                cta: 'Presentar una anotación de marca',
              },
              {
                title: 'Anotaciones de patentes',
                body: 'Informa los mismos tipos de cambio cuando el derecho es una patente u otro título de invención.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/tramites/patentes/anotaciones',
                cta: 'Presentar una anotación de patente',
              },
              {
                title: 'Custodia de poderes y personerías',
                body: 'Deja una sola vez el poder original o su copia digital. Después no lo adjuntas en cada marca o patente.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/tramites/custodia-poderes',
                cta: 'Registrar un poder',
              },
              {
                title: 'Títulos y certificados de marcas',
                body: 'Pide el título del registro y certificados para presentarlos en otras instituciones.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/tramites/marcas/certificados',
                cta: 'Solicitar un certificado de marca',
              },
              {
                title: 'Títulos y certificados de patentes',
                body: 'Pide el título o certificados del registro de invención, modelo de utilidad o diseño.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/tramites/patentes/certificados',
                cta: 'Solicitar un certificado de patente',
              },
              {
                title: 'Atención ciudadana (SIAC)',
                body: 'Consultas, opiniones, sugerencias, felicitaciones o reclamos. Este canal no pide ClaveÚnica.',
                href: '/contacto/siac',
                cta: 'Ir al formulario SIAC',
              },
            ]}
          />

          <section className="pt-gob-6 border-t border-gob-border">
            <PortalSectionTitle>Otros trámites del Estado</PortalSectionTitle>
            <PortalLinkList
              links={[
                {
                  href: 'https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2/?idOrg=source=institucion&idOrganismo=AY001',
                  label: 'Solicitud de acceso a la información pública (Ley N.° 20.285)',
                  icon: FileText,
                },
                {
                  href: 'https://www.leylobby.gob.cl/instituciones',
                  label: 'Solicitud de audiencia (Ley del Lobby N.° 20.730)',
                  icon: Users,
                },
              ]}
            />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
