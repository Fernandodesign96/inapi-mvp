import type { Metadata } from 'next'
import { FileText, Users } from 'lucide-react'
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
  description:
    'Trámites del Registro Nacional de Trámites del Estado (RNT) que ofrece INAPI, completamente digitalizados.',
}

export default function TramitesDigitalesPage() {
  return (
    <PortalShell {...portalShellProps('/tramites-digitales')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalProse>
            Esta lista incluye los trámites del Registro Nacional de Trámites del Estado (RNT) que ofrece INAPI.
            Todos están completamente digitalizados: puedes iniciarlos y terminarlos por internet, sin ir
            presencialmente.
          </PortalProse>

          <PortalCardGrid
            items={[
              {
                title: 'Registro de marcas comerciales',
                body: 'Protege el nombre, el logo o la frase que identifica tus productos o servicios a nivel nacional. La marca te da el derecho exclusivo de usarla e impide que otros la usen sin tu permiso.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/marcas/solicitud-nueva',
                cta: 'Ingresar solicitud de marca',
              },
              {
                title: 'Registro de patente de invención',
                body: 'Solicita el derecho exclusivo que otorga el Estado para proteger una invención, un modelo de utilidad, un diseño industrial o la topografía de un circuito integrado.',
                footnote: 'Requiere ClaveÚnica.',
                href: '/patentes',
                cta: 'Ver trámite de patentes',
              },
              {
                title: 'Buscador de similitud de marcas',
                body: 'Compara el nombre de tu marca con las marcas ya inscritas antes de presentar tu solicitud. Así reduces el riesgo de un rechazo por similitud.',
                href: '/marcas/buscador-similitud',
                cta: 'Buscar marcas anteriores',
              },
              {
                title: 'Registro o custodia de poderes y personerías',
                body: 'Presenta una sola vez el poder que autoriza a un representante para tramitar tus marcas o patentes. No necesitas repetir el documento en cada solicitud.',
                footnote: 'Requiere ClaveÚnica.',
                href: 'https://tramites.inapi.cl/RegistroCustodiaPoderes/',
                cta: 'Acceder al registro de poderes',
              },
              {
                title: 'Títulos y certificados de marcas y patentes',
                body: 'Solicita el título de tu registro y los certificados que necesites presentar en otras instancias, para marcas o para patentes.',
                footnote: 'Requiere ClaveÚnica.',
                href: 'https://tramites.inapi.cl/TitulosCertificados/',
                cta: 'Solicitar título o certificado',
              },
              {
                title: 'Atención ciudadana (SIAC)',
                body: 'Envía tus consultas, opiniones, sugerencias, felicitaciones o reclamos a INAPI.',
                href: '/contacto/siac',
                cta: 'Ir a atención ciudadana',
              },
            ]}
          />

          <section className="pt-gob-6 border-t border-gob-border">
            <PortalSectionTitle>Otros trámites y solicitudes</PortalSectionTitle>
            <PortalLinkList
              links={[
                {
                  href: 'https://www.inapi.cl/transparencia/acceso-informacion',
                  label: 'Solicitud de acceso a la información pública (Ley 20.285)',
                  icon: FileText,
                },
                {
                  href: 'https://www.inapi.cl/transparencia/lobby',
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
