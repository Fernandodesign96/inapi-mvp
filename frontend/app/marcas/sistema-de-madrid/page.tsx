import type { Metadata } from 'next'
import { CheckCircle2, Globe, Languages, Scale, Send, Wallet } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ProgressMiniCards } from '@/components/story/ProgressMiniCards'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'

export const metadata: Metadata = {
  title: 'Sistema de Madrid — INAPI',
  description:
    'Registra tu marca en varios países mediante un solo trámite internacional a través del Sistema de Madrid.',
}

export default function SistemaDeMadridPage() {
  return (
    <StoryPage
      path="/marcas/sistema-de-madrid"
      hero={{
        eyebrow: 'Marcas',
        dot: 'accent',
        lead: 'El Sistema de Madrid es una solución práctica para solicitar el registro de una marca en mercados internacionales, administrado por la OMPI.',
        seal: { center: 'MM', caption: 'MADRID' },
      }}
    >
      <StorySection tone="paper" eyebrow="Para informarse" title="Qué es y a quién va dirigido">
        <BentoGrid cols={2}>
          <BentoCard
            icon={<Globe />}
            title="¿Qué es el Sistema de Madrid?"
            body="Permite pedir protección fuera de Chile de forma centralizada. INAPI actúa como oficina de origen a partir de una marca inscrita o solicitada en Chile."
          />
          <BentoCard
            icon={<Scale />}
            title="¿A quién va dirigido?"
            body="Debes tener domicilio, establecimiento industrial o comercial efectivo, o nacionalidad, en un país miembro del Sistema (Chile incluido)."
            delay={0.06}
          />
        </BentoGrid>
      </StorySection>

      <StorySection tone="mist" eyebrow="Ventajas" title="Beneficios">
        <IconList
          items={[
            { text: <>Un solo conjunto de tasas: sistema más <strong>económico</strong> que presentar país por país.</> },
            { text: 'No necesitas contratar un representante en cada país de destino solo para ingresar la solicitud.' },
            { text: 'Una solicitud cubre todas las partes contratantes que designes.' },
            { icon: Languages, text: <>Puedes presentar en <strong>español</strong>, sin traducciones costosas al inicio.</> },
          ]}
        />
      </StorySection>

      <StorySection tone="paper" eyebrow="Proceso" title="Tres etapas">
        <ProgressMiniCards
          items={[
            { title: 'INAPI, oficina de origen', body: 'Preparas el formulario MM2. INAPI revisa defectos formales antes de certificar.', icon: <Send /> },
            { title: 'Certificación y envío', body: 'Verifica español, vínculo con Chile y coincidencia con la marca de base. Luego transmite a la OMPI.', icon: <CheckCircle2 /> },
            { title: 'Oficina Internacional', body: 'Examen, inscripción, notificación a oficinas designadas y publicación en la Gaceta.', icon: <Globe /> },
            { title: 'Seguimiento', body: 'Consulta el estado en Madrid Monitor, actualizado a diario.', icon: <Globe /> },
          ]}
        />
      </StorySection>

      <StorySection tone="mist" eyebrow="Costos y plazos" title="Qué se paga y cuánto dura">
        <SplitAccordion
          items={[
            {
              id: 'requisitos',
              title: 'Requisitos para solicitar desde Chile',
              icon: <CheckCircle2 />,
              content: (
                <IconList
                  items={[
                    { text: 'Marca de base: solicitud en trámite o registro concedido por INAPI.' },
                    { text: 'Vínculo personal o comercial con un país miembro.' },
                    { text: 'Formulario MM2: titular, reproducción, productos o servicios, países y cálculo de tasas OMPI.' },
                  ]}
                />
              ),
            },
            {
              id: 'tasas',
              title: 'Costos',
              icon: <Wallet />,
              content: (
                <IconList
                  items={[
                    { text: <>Tasa INAPI de preparación, certificación y transmisión: <strong>0,5 UTM por clase</strong> (Res. Ex. N.° 184).</> },
                    { text: 'Tasas OMPI en francos suizos: tasa de base, complemento por país (o tasa individual) y suplemento desde la tercera clase.' },
                    { text: 'Pago OMPI: cuenta corriente, tarjeta (en ciertos casos), transferencia bancaria o postal (Europa).' },
                  ]}
                />
              ),
            },
            {
              id: 'duracion',
              title: 'Duración',
              icon: <Globe />,
              content: (
                <p>
                  El registro internacional dura <strong>diez años</strong> y se renueva directamente ante la OMPI, indicando
                  las partes contratantes en las que pides la renovación.
                </p>
              ),
            },
            {
              id: 'monitor',
              title: 'Cómo conocer el estado',
              icon: <Globe />,
              href: 'https://www3.wipo.int/madrid/monitor/en/',
              cta: 'Abrir Madrid Monitor',
              content: (
                <p>
                  La OMPI publica en <strong>Madrid Monitor</strong> las solicitudes en trámite y los registros vigentes, con
                  datos bibliográficos y reproducciones, de libre acceso.
                </p>
              ),
            },
          ]}
        />
      </StorySection>

      <ShortcutBand kind="marcas" title="Sigue con tu marca en Chile o en el exterior" />
    </StoryPage>
  )
}
