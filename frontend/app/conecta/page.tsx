import type { Metadata } from 'next'
import { BookOpenCheck, FileCheck2, Handshake, Info } from 'lucide-react'
import { IconList } from '@/components/story/IconList'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/conecta')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Conecta'} — INAPI`,
  description: 'Espacio público y gratuito para mostrar tecnologías protegidas y encontrar quien quiera usarlas.',
}

const RECURSOS = [
  {
    title: 'Qué es Conecta',
    body: 'Explica el propósito del espacio: poner en contacto a titulares de derechos con quienes quieren usar o explotar esas tecnologías.',
    cta: 'Leer en inapi.cl',
    icon: <Info />,
  },
  {
    title: 'Políticas de uso',
    body: 'Condiciones para publicar, consultar y tratar los datos de las tecnologías que aparecen en la plataforma.',
    cta: 'Revisar las reglas',
    icon: <FileCheck2 />,
  },
  {
    title: 'Guía de transferencia tecnológica',
    body: 'Nociones básicas para pasar de un derecho registrado a un acuerdo: licencia, cesión u otra forma de uso.',
    cta: 'Abrir la guía',
    icon: <Handshake />,
  },
  {
    title: 'Manuales de usuario',
    body: 'Pasos para crear una ficha, buscar tecnologías y usar las funciones de la plataforma Conecta.',
    cta: 'Ver los manuales',
    icon: <BookOpenCheck />,
  },
]

export default function ConectaPage() {
  return (
    <StoryPage
      path="/conecta"
      hero={{
        eyebrow: 'Transferencia tecnológica',
        dot: 'primary',
        lead: 'Conecta es un espacio público y gratuito: quien crea o investiga muestra tecnologías con derechos de propiedad industrial; quien invierte o produce puede conocerlas.',
        primary: { href: 'http://www.inapiconecta.cl/', label: 'Ir al buscador de Conecta' },
        secondary: { href: '#informarse', label: 'Antes de publicar' },
        seal: { center: 'C', caption: 'CONECTA' },
      }}
    >
      <StorySection
        tone="paper"
        id="informarse"
        eyebrow="Para informarse"
        title="Para informarse antes de publicar o buscar"
        lead="No reemplaza un contrato. Sirve para visibilizar ofertas y demandas de tecnología protegida en Chile y para orientar una negociación posterior."
      >
        <BentoGrid cols={2}>
          {RECURSOS.map((r, i) => (
            <BentoCard
              key={r.title}
              icon={r.icon}
              title={r.title}
              body={r.body}
              href="https://www.inapi.cl/conecta"
              cta={r.cta}
              variant="plain"
              delay={i * 0.06}
            />
          ))}
        </BentoGrid>
      </StorySection>

      <StorySection tone="mist" eyebrow="Detalle" title="Qué hace y qué no hace INAPI">
        <SplitAccordion
          items={[
            {
              id: 'que-es',
              title: '¿Qué es Conecta?',
              content: (
                <IconList
                  items={[
                    { text: 'Espacio público y gratuito para mostrar innovaciones con derechos de propiedad industrial.' },
                    { text: 'Cualquier titular puede publicar información de su tecnología.' },
                    { text: 'INAPI lo desarrolló para apoyar la divulgación de tecnologías nacionales que buscan transferirse.' },
                    { text: 'Lo administra la Subdirección de Transferencia de Conocimiento.' },
                  ]}
                />
              ),
            },
            {
              id: 'no-asesora',
              title: 'INAPI no asesora la negociación',
              content: (
                <p>
                  INAPI <strong>no ofrece asesoramiento</strong> para la transferencia y comercialización. El portal incluye
                  guías de orientación para facilitar ese proceso.
                </p>
              ),
            },
          ]}
        />
      </StorySection>

      <CtaBand
        eyebrow="Plataforma Conecta"
        title="El buscador de fichas tecnológicas está en la plataforma Conecta."
        primary={{ href: 'http://www.inapiconecta.cl/', label: 'Ir al buscador de Conecta' }}
        seal={{ center: 'C', caption: 'CONECTA' }}
      />
    </StoryPage>
  )
}
