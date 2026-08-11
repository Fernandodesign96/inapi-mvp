import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalCardGrid,
  PortalInfoGrid,
  PortalMain,
  PortalSectionTitle,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/contacto')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Contacto'} — INAPI`,
  description: meta?.description ?? 'Canales de contacto y oficinas presenciales de INAPI.',
}

export default function ContactoPage() {
  return (
    <PortalShell {...portalShellProps('/contacto')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalCardGrid
            items={[
              {
                title: 'Vía web',
                body: 'Envía tus consultas, opiniones, sugerencias, felicitaciones o reclamos.',
                href: '/contacto/siac',
                cta: 'Ir al formulario (SIAC)',
              },
              {
                title: 'Teléfono',
                body: '(56 2) 2 887 0400. Lunes a jueves de 09:00 a 18:00 hrs. Viernes de 09:00 a 17:00 hrs.',
              },
            ]}
          />

          <div className="bg-gob-surface-elevated rounded-gob-md p-gob-5 max-w-3xl">
            <h3 className="font-bold text-gob-text mb-gob-2">Correo electrónico</h3>
            <a
              href="mailto:inapi@inapi.cl"
              className="text-gri-body font-medium text-gob-link hover:text-gob-primary-dark"
            >
              inapi@inapi.cl
            </a>
          </div>

          <section>
            <PortalSectionTitle>Oficinas presenciales</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                {
                  title: 'Atención de público, marcas y patentes',
                  body: 'Av. Libertador Bernardo O\'Higgins 194, Santiago. Lunes a viernes de 09:00 a 14:00 hrs.',
                },
                {
                  title: 'Unidad de Archivo',
                  body: 'Av. Libertador Bernardo O\'Higgins 194, Santiago. Lunes a viernes de 09:00 a 14:00 hrs.',
                },
                {
                  title: 'Oficina de Partes',
                  body: 'Av. Libertador Bernardo O\'Higgins 194, Santiago. Mañana: lunes a viernes de 09:00 a 14:00 hrs. Tarde: lunes a jueves de 15:00 a 16:30 hrs, viernes de 15:00 a 15:30 hrs.',
                },
              ]}
            />
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
