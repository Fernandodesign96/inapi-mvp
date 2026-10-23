import type { Metadata } from 'next'
import { Building2, FileText, Mail, MapPin, Phone, Scale } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
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
    <StoryPage
      path="/contacto"
      hero={{
        eyebrow: 'Contacto',
        lead: 'Revisa todos los canales oficiales de INAPI y resuelve todas tus consultas.',
        primary: { href: '/contacto/siac', label: 'Ir al formulario SIAC' },
        seal: { center: '@', caption: 'CONTACTO' },
      }}
    >
      <StorySection tone="paper" eyebrow="Atención" title="Canales oficiales INAPI">
        <BentoGrid cols={2}>
          <BentoCard
            icon={<Phone />}
            title="Teléfono de mesa central"
            body={
              <IconList
                items={[
                  { text: <>Llama al <strong>(56 2) 2 887 0400</strong>.</> },
                  { text: <>Lunes a jueves de <strong>09:00 a 18:00</strong>.</> },
                  { text: <>Viernes de <strong>09:00 a 17:00</strong>.</> },
                ]}
              />
            }
          />
          <BentoCard
            icon={<Mail />}
            title="Correo electrónico"
            body={
              <IconList
                items={[
                  { text: <>Escribe a <strong>inapi@inapi.cl</strong>.</> },
                  { text: 'Un especialista de atención ciudadana responde tu consulta.' },
                ]}
              />
            }
            href="mailto:inapi@inapi.cl"
            cta="Escribir a inapi@inapi.cl"
            delay={0.05}
          />
          <BentoCard
            icon={<FileText />}
            title="Formulario web (SIAC)"
            body={
              <>
                Consultas, opiniones, sugerencias, <strong>felicitaciones</strong> o <strong>reclamos</strong> por el
                Sistema Integrado de Atención a la Ciudadanía.
              </>
            }
            href="/contacto/siac"
            cta="Ir al formulario (SIAC)"
            delay={0.08}
          />
          <BentoCard
            icon={<Scale />}
            title="Ley de Transparencia"
            body={
              <>
                Pide información pública según la <strong>Ley N.° 20.285</strong> de acceso a la información de la
                Administración del Estado.
              </>
            }
            href="https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2/?idOrg=source=institucion&idOrganismo=AY001"
            cta="Ingresar una solicitud de información"
            delay={0.1}
          />
        </BentoGrid>
      </StorySection>

      <StorySection tone="mist" eyebrow="Sede Santiago" title="Atención presencial">
        <BentoGrid cols={2}>
          <BentoCard
            icon={<Building2 />}
            title="Atención de público, marcas, patentes y Unidad de Archivo"
            body={
              <IconList
                items={[
                  { icon: MapPin, text: <>Av. Libertador Bernardo O&apos;Higgins <strong>194</strong>, Santiago.</> },
                  { text: <>Atención de público, marcas y patentes: lunes a viernes de <strong>09:00 a 14:00</strong>.</> },
                  { text: <>Unidad de Archivo: misma dirección y el mismo horario de la mañana.</> },
                ]}
              />
            }
          />
          <BentoCard
            icon={<FileText />}
            title="Oficina de Partes"
            body={
              <IconList
                items={[
                  { text: <>Misma dirección: Av. Libertador Bernardo O&apos;Higgins <strong>194</strong>.</> },
                  { text: <>Mañana: lunes a viernes de <strong>09:00 a 14:00</strong>.</> },
                  { text: <>Tarde: lunes a jueves de <strong>15:00 a 16:30</strong>; viernes de <strong>15:00 a 15:30</strong>.</> },
                ]}
              />
            }
            delay={0.06}
          />
        </BentoGrid>
      </StorySection>

      <StorySection tone="paper" eyebrow="Mapa" title="Cómo llegar">
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
      </StorySection>
    </StoryPage>
  )
}
