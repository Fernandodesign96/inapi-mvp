import type { Metadata } from 'next'
import { HelpCircle, Lightbulb, MapPin, Shapes, Tag } from 'lucide-react'
import { BentoCard, BentoGrid, type BentoVariant } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'Qué quieres proteger — INAPI',
  description: 'Elige el tipo de protección que más se acerca a lo que necesitas.',
}

const OPTIONS: {
  icon: React.ReactNode
  label: string
  result: string
  href: string
  cta: string
  variant: BentoVariant
}[] = [
  {
    icon: <Tag />,
    label: 'El nombre, logo o eslogan de mi negocio o producto',
    result: 'Marca comercial',
    href: '/marcas',
    cta: 'Ver cómo registrar una marca',
    variant: 'marcas',
  },
  {
    icon: <Lightbulb />,
    label: 'Una invención, mecanismo, fórmula o proceso técnico',
    result: 'Patente de invención',
    href: '/patentes',
    cta: 'Ver cómo registrar una patente',
    variant: 'patentes',
  },
  {
    icon: <Shapes />,
    label: 'La forma o apariencia estética de un producto',
    result: 'Diseño industrial',
    href: '/patentes',
    cta: 'Ver cómo registrar un diseño industrial',
    variant: 'plain',
  },
  {
    icon: <MapPin />,
    label: 'Un producto típico de una región geográfica de Chile',
    result: 'Sello de Origen',
    href: '/sello-de-origen',
    cta: 'Ver el Sello de Origen',
    variant: 'plain',
  },
  {
    icon: <HelpCircle />,
    label: 'No sé qué tipo de protección necesito',
    result: 'Orientación',
    href: '/contacto',
    cta: 'Consultar con INAPI',
    variant: 'night',
  },
]

export default function QueProtegerPage() {
  return (
    <StoryPage
      path="/que-proteger"
      breadcrumbs={[{ label: 'Qué quieres proteger' }]}
      hero={{
        eyebrow: 'Empieza aquí',
        dot: 'primary',
        title: 'Qué quieres proteger',
        lead: 'Elige la opción que más se acerque a lo que necesitas.',
        primary: { href: '#opciones', label: 'Ver las opciones' },
        secondary: { href: '#diferencia', label: 'Marca o patente' },
        seal: { center: '?', caption: 'QUÉ PROTEGER' },
      }}
    >
      <StorySection
        tone="paper"
        id="opciones"
        eyebrow="Opciones de protección"
        title="¿Qué quieres proteger?"
        lead="Si dudas entre marca y patente, empieza por lo que quieres impedir que otros usen."
      >
        <BentoGrid cols={3}>
          {OPTIONS.map((o, i) => (
            <BentoCard
              key={o.result}
              icon={o.icon}
              eyebrow={o.label}
              title={o.result}
              href={o.href}
              cta={o.cta}
              variant={o.variant}
              span={i === 4 ? 'col-2' : undefined}
              delay={i * 0.05}
            />
          ))}
        </BentoGrid>
      </StorySection>

      <VideoSpotlight
        id="diferencia"
        video="patenteVsMarca"
        tone="night"
        title="Diferencia entre patente y marca"
        lead="Cuándo necesitas una marca, cuándo una patente y cuándo ambas."
        points={[
          { title: 'Marca comercial', body: 'El nombre, logo o eslogan de mi negocio o producto.' },
          { title: 'Patente de invención', body: 'Una invención, mecanismo, fórmula o proceso técnico.' },
          { title: 'Diseño industrial', body: 'La forma o apariencia estética de un producto.' },
        ]}
      />

      <CtaBand
        eyebrow="¿Sigues con dudas?"
        title="No sé qué tipo de protección necesito"
        primary={{ href: '/contacto', label: 'Consultar con INAPI' }}
        secondary={{ href: '/preguntas-frecuentes', label: 'Ver preguntas frecuentes' }}
        seal={{ center: '?', caption: 'ORIENTACIÓN' }}
      />
    </StoryPage>
  )
}
