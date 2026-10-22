import type { Metadata } from 'next'
import { BookOpen, CalendarDays, FolderOpen, History, MonitorPlay } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoGallery } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'Cursos y talleres — INAPI',
  description:
    'Cursos, talleres y recursos de capacitación sobre propiedad industrial que ofrece INAPI.',
}

export default function AprendePage() {
  return (
    <StoryPage
      path="/aprende"
      hero={{
        eyebrow: 'Capacitación',
        dot: 'primary',
        lead: 'Este módulo reúne contenidos, fechas clave, requisitos y formas de inscripción a los cursos, talleres y actividades de capacitación que ofrece INAPI.',
        primary: { href: '#capacitaciones', label: 'Ver cursos disponibles' },
        secondary: { href: '#recursos', label: 'Recursos para aprender' },
        seal: { center: 'PI', caption: 'APRENDE' },
      }}
    >
      <StorySection tone="paper" id="capacitaciones" eyebrow="Tipos de capacitaciones" title="Aprende con INAPI">
        <BentoGrid cols={2}>
          <BentoCard
            variant="night"
            icon={<MonitorPlay />}
            title="Cursos y talleres en línea"
            body="Actividades formativas a distancia sobre propiedad industrial."
            href="#"
            cta="Ver cursos disponibles"
          />
          <BentoCard
            icon={<CalendarDays />}
            title="Martes de Propiedad Industrial"
            body="Ciclo formativo periódico abierto a todo el país, ya en su séptimo año."
            href="#"
            cta="Conocer el ciclo"
            delay={0.06}
          />
        </BentoGrid>
      </StorySection>

      <VideoGallery
        videos={['queEsPatente', 'patenteVsMarca', 'solicitarMarca']}
        tone="night"
        title="Aprende en video"
        lead="Explicaciones breves del canal oficial de INAPI."
      />

      <StorySection tone="mist" id="recursos" eyebrow="Recursos para aprender" title="Lecturas y archivo">
        <BentoGrid cols={3}>
          <BentoCard icon={<BookOpen />} title="Libro historia gráfica" href="#" cta="Abrir" />
          <BentoCard icon={<History />} title="Línea de tiempo interactiva" href="/conoce-mas/historia-propiedad-industrial" cta="Abrir" delay={0.05} />
          <BentoCard icon={<FolderOpen />} title="Informes de dominio público" href="#" cta="Abrir" delay={0.1} />
        </BentoGrid>
      </StorySection>

      <CtaBand
        eyebrow="Conceptos básicos"
        title="Qué es la propiedad industrial"
        primary={{ href: '/conoce-mas', label: 'Leer los artículos' }}
        secondary={{ href: '/glosario', label: 'Abrir el glosario' }}
        seal={{ center: 'PI', caption: 'APRENDE' }}
      />
    </StoryPage>
  )
}
