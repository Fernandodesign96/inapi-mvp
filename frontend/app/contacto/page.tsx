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

const MAP_SRC =
  "https://maps.google.com/maps?q=Av.%20Libertador%20Bernardo%20O'Higgins%20194%2C%20Santiago%2C%20Chile&z=17&output=embed"

export default function ContactoPage() {
  return (
    <PortalShell
      {...portalShellProps('/contacto', {
        pageSubtitle: 'Elige el canal: formulario, teléfono, correo o atención en la sede de Santiago.',
      })}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalCardGrid
            items={[
              {
                title: 'Vía web',
                body: 'Consultas, opiniones, sugerencias, felicitaciones o reclamos por el Sistema Integrado de Atención a la Ciudadanía (SIAC).',
                href: '/contacto/siac',
                cta: 'Ir al formulario (SIAC)',
              },
              {
                title: 'Ley de Transparencia',
                body: 'Pide información pública según la Ley N.° 20.285 de acceso a la información de la Administración del Estado.',
                href: 'https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2/?idOrg=source=institucion&idOrganismo=AY001',
                cta: 'Ingresar una solicitud de información',
              },
              {
                title: 'Teléfono',
                body: 'Mesa central (56 2) 2 887 0400. Lunes a jueves de 09:00 a 18:00. Viernes de 09:00 a 17:00.',
              },
              {
                title: 'Correo electrónico',
                body: 'inapi@inapi.cl. Un especialista de atención ciudadana responde tu consulta.',
                href: 'mailto:inapi@inapi.cl',
                cta: 'Escribir a inapi@inapi.cl',
              },
            ]}
          />

          <section>
            <PortalSectionTitle>Oficinas presenciales</PortalSectionTitle>
            <PortalInfoGrid
              items={[
                {
                  title: 'Atención de público, marcas y patentes',
                  body: "Av. Libertador Bernardo O'Higgins 194, Santiago. Lunes a viernes de 09:00 a 14:00.",
                },
                {
                  title: 'Unidad de Archivo',
                  body: "Av. Libertador Bernardo O'Higgins 194, Santiago. Lunes a viernes de 09:00 a 14:00.",
                },
                {
                  title: 'Oficina de Partes',
                  body: "Misma dirección. Mañana: lunes a viernes de 09:00 a 14:00. Tarde: lunes a jueves de 15:00 a 16:30; viernes de 15:00 a 15:30.",
                },
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Cómo llegar</PortalSectionTitle>
            <div className="overflow-hidden rounded-gob-lg border border-gob-border bg-card">
              <iframe
                title="Mapa de la sede de INAPI en Santiago"
                src={MAP_SRC}
                className="h-80 w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
            <p className="mt-gob-3 text-gri-body-sm text-muted-foreground">
              Sede institucional en Av. Libertador Bernardo O&apos;Higgins 194, Santiago. RUT 65.999.669-3.
            </p>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
