import type { Metadata } from 'next'
import { BookOpen, Gavel, Landmark, Scale } from 'lucide-react'
import { HeritageBanner } from '@/components/portal/HeritageBanner'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conoce-mas')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Qué es la propiedad industrial'} — INAPI`,
  description: 'Información sobre propiedad intelectual e industrial, conceptos fundamentales y patrimonio histórico de INAPI.',
}

const ARTICULOS = [
  {
    title: 'Qué es la propiedad intelectual e industrial',
    body: 'Comprende toda creación de la mente humana: inventos, modelos de utilidad, marcas, obras literarias y artísticas.',
    href: '/conoce-mas/que-es-la-propiedad-intelectual-e-industrial',
    icon: <BookOpen />,
  },
  {
    title: 'Conceptos fundamentales',
    body: 'Es una rama del derecho que fomenta la innovación, la creación y la transferencia tecnológica, y ordena los mercados para facilitar las decisiones del público consumidor.',
    href: '/conoce-mas/conceptos-fundamentales',
    icon: <Landmark />,
  },
  {
    title: 'Derechos de la propiedad intelectual',
    body: 'Distintas áreas especializadas del Estado conceden, reconocen, registran y administran los derechos de propiedad intelectual.',
    href: '/conoce-mas/derechos-de-propiedad-intelectual',
    icon: <Scale />,
  },
  {
    title: 'Tribunal de Propiedad Industrial',
    body: 'Este tribunal se creó mediante el artículo 17° bis C de la Ley 19.039 de Propiedad Industrial y sus modificaciones.',
    href: '/conoce-mas/tribunal-de-propiedad-industrial',
    icon: <Gavel />,
  },
]

export default function ConoceMasPage() {
  return (
    <StoryPage
      path="/conoce-mas"
      hero={{
        eyebrow: 'Conceptos básicos',
        dot: 'primary',
        lead: 'Información sobre propiedad intelectual e industrial, conceptos fundamentales y patrimonio histórico de INAPI.',
        primary: { href: '/conoce-mas/historia-propiedad-industrial', label: 'Ver la historia de la Propiedad Industrial' },
        seal: { center: 'PI', caption: 'PROPIEDAD INDUSTRIAL' },
      }}
    >
      <StorySection tone="paper" id="para-informarse" eyebrow="Para informarse" title="Cuatro lecturas para entender lo básico">
        <BentoGrid cols={2}>
          {ARTICULOS.map((a, i) => (
            <BentoCard
              key={a.href}
              icon={a.icon}
              title={a.title}
              body={a.body}
              href={a.href}
              cta="Leer el artículo"
              variant="plain"
              delay={i * 0.06}
            />
          ))}
        </BentoGrid>
      </StorySection>

      <VideoSpotlight
        video="queEsPatente"
        tone="night"
        title="Qué es una patente"
        lead="Una explicación breve de qué protege una patente y por qué sirve."
        points={[
          {
            title: 'Un derecho de exclusividad',
            body: 'Es un derecho de exclusividad, concedido por el Estado, para proteger y explotar una invención por el tiempo que determine la Ley.',
          },
          {
            title: 'Tres requisitos',
            body: 'El Estado concede un derecho exclusivo si la invención es nueva, tiene nivel inventivo y puede usarse en la industria.',
          },
        ]}
      />

      <StorySection tone="mist" eyebrow="Patrimonio" title="Qué es la propiedad industrial">
        <HeritageBanner />
      </StorySection>

      <CtaBand
        eyebrow="Siguiente paso"
        title="Elige qué quieres proteger"
        body="Elige el tipo de protección que más se acerca a lo que necesitas."
        primary={{ href: '/que-proteger', label: 'Ver qué puedo proteger' }}
        secondary={{ href: '/glosario', label: 'Abrir el glosario' }}
        seal={{ center: 'PI', caption: 'INAPI' }}
      />
    </StoryPage>
  )
}
