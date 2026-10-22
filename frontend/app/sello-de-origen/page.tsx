import type { Metadata } from 'next'
import { Award, BadgeCheck, Coins, Globe, HandHeart, Mountain, PackageSearch, Users } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { JourneyRail } from '@/components/story/JourneyRail'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoCard } from '@/components/story/VideoCard'

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
        aside: <VideoCard video="selloOrigen" tone="night" size="lg" />,
      }}
    >
      <StorySection tone="paper" eyebrow="Tipos de sello" title="Cuatro formas de proteger un producto con identidad">
        <BentoGrid cols={4}>
          {tiposSello.map((tipo, i) => (
            <BentoCard key={tipo.title} icon={tipo.icon} title={tipo.title} variant={i === 0 ? 'night' : 'plain'} delay={i * 0.06} />
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

      <StorySection tone="mist" id="informarse" eyebrow="Para informarse" title="Lo que debes saber">
        <SectionAccordion
          className="mx-auto max-w-4xl"
          defaultOpen={['que-es']}
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
                <p>Conoce los productos tradicionales de Chile reconocidos con el Sello de Origen o en proceso de reconocimiento.</p>
              ),
            },
          ]}
        />
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
