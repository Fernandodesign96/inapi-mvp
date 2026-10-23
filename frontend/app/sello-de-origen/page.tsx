import type { Metadata } from 'next'
import { Award, BadgeCheck, Coins, Globe, HandHeart, Mountain, PackageSearch, Users } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { JourneyRail } from '@/components/story/JourneyRail'
import { ProcessTimeline } from '@/components/story/ProcessTimeline'
import { IconList } from '@/components/story/IconList'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'

export const metadata: Metadata = {
  title: 'Sello de Origen — INAPI',
  description:
    'Reconoce y protege formas especiales de manufactura, oficios tradicionales y productos singulares de Chile.',
}

const tiposSello = [
  { title: 'Indicación Geográfica', icon: <Globe /> },
  { title: 'Denominación de Origen', icon: <Mountain /> },
  { title: 'Marca Colectiva', icon: <Users /> },
  { title: 'Marca de Certificación', icon: <BadgeCheck /> },
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
    <StoryPage
      path="/sello-de-origen"
      hero={{
        eyebrow: 'Sello de Origen',
        dot: 'primary',
        lead: 'Reconoce y protege formas especiales de manufactura, oficios tradicionales y productos singulares del país.',
        primary: { href: '#pasos', label: 'Ver los pasos' },
        secondary: { href: '#informarse', label: 'Para informarse' },
        seal: { center: 'SO', caption: 'SELLO' },
      }}
    >
      <StorySection tone="paper" eyebrow="Tipos de sello" title="Cuatro formas de proteger un producto con identidad">
        <BentoGrid cols={4}>
          {tiposSello.map((tipo, i) => (
            <BentoCard key={tipo.title} icon={tipo.icon} title={tipo.title} variant="plain" delay={i * 0.06} />
          ))}
        </BentoGrid>
      </StorySection>

      <StorySection
        tone="night"
        id="pasos"
        eyebrow="Paso a paso"
        dot="focus"
        title="Pasos para obtener un sello"
      >
        <JourneyRail tone="night" label="Pasos para obtener un sello" steps={pasos.map(title => ({ title }))} />
      </StorySection>

      <StorySection
        tone="paper"
        eyebrow="Etapas oficiales"
        title="Línea de tiempo del Sello de Origen"
        lead="Ingreso, informe sectorial, publicación, oposición y resolución, según el procedimiento ante INAPI."
      >
        <ProcessTimeline kind="origen" />
      </StorySection>

      <VideoSpotlight
        video="selloOrigen"
        tone="night"
        title="El Sello de Origen"
        lead="Cómo el Sello de Origen protege productos típicos de una zona de Chile."
        points={[
          { title: 'Identidad territorial', body: 'Reconoce oficios, recetas y productos ligados a un lugar.' },
          { title: '3 UTM', body: 'IG, DO, marca colectiva o de certificación pagan el mismo derecho de registro.' },
        ]}
      />

      <StorySection tone="mist" id="informarse" eyebrow="Para informarse" title="Lo que debes saber">
        <SplitAccordion
          items={[
            {
              id: 'que-es',
              title: 'Qué es el Sello de Origen',
              icon: <Award />,
              content: <p>Reconoce y protege formas especiales de manufactura, oficios tradicionales y productos singulares del país.</p>,
            },
            {
              id: 'beneficios',
              title: 'Beneficios de obtener el Sello de Origen',
              icon: <HandHeart />,
              content: <p>Retribuye el esfuerzo y el trabajo de las comunidades del país que producen bienes con identidad territorial.</p>,
            },
            {
              id: 'costo',
              title: 'Costo de tramitación',
              summary: '3 UTM',
              icon: <Coins />,
              content: (
                <p>
                  El registro de indicaciones geográficas, denominaciones de origen, marcas colectivas o de certificación paga
                  un derecho equivalente a 3 unidades tributarias mensuales (UTM).
                </p>
              ),
            },
            {
              id: 'productos',
              title: 'Productos registrados y en proceso',
              icon: <PackageSearch />,
              content: (
                <IconList
                  items={[
                    { text: <><strong>Orégano de Putre</strong> — Indicación geográfica. Cultivo entre 3.000 y 3.500 m s. n. m.</> },
                    { text: <><strong>Aceitunas de Azapa</strong> — Indicación geográfica. Valle de Azapa, Arica y Parinacota.</> },
                    { text: <><strong>Maíz Lluteño</strong> — Indicación geográfica. Tolerante a salinidad y boro.</> },
                    { text: <><strong>Limón de Pica</strong> — Indicación geográfica. Oasis de Pica, alto jugo y aroma.</> },
                    { text: <><strong>Aymar Sawuri</strong> — Marca colectiva de artesanía textil de alpaca.</> },
                  ]}
                />
              ),
            },
          ]}
        />
      </StorySection>

      <StorySection tone="paper" eyebrow="Norte Grande" title="Productos registrados">
        <BentoGrid cols={3}>
          <BentoCard title="Orégano de Putre" eyebrow="Indicación geográfica" body="Precordillera de Putre. Sabor, textura y aroma ligados al clima y al cultivo ancestral." />
          <BentoCard title="Aceitunas de Azapa" eyebrow="Indicación geográfica" body="Valle de Azapa. Sabor, tamaño, color y consistencia; cuatro preparaciones tradicionales." delay={0.05} />
          <BentoCard title="Limón de Pica" eyebrow="Indicación geográfica" body="Oasis de Pica. Fruto de 3 a 4 cm, jugo ácido y aceites esenciales característicos." delay={0.1} />
        </BentoGrid>
      </StorySection>

      <CtaBand
        eyebrow="¿Tienes un producto típico?"
        title="Consulta si tu producto puede tener Sello de Origen"
        body="Elige el tipo de protección que más se acerca a lo que necesitas."
        primary={{ href: '/contacto', label: 'Consultar con INAPI' }}
        secondary={{ href: '/que-proteger', label: 'Ver qué puedo proteger' }}
        seal={{ center: 'SO', caption: 'SELLO DE ORIGEN' }}
      />
    </StoryPage>
  )
}
