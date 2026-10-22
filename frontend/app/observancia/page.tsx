import type { Metadata } from 'next'
import { AlertTriangle, Gavel, Megaphone, Scale, ShieldAlert, ShieldCheck } from 'lucide-react'
import {
  DelitosPanel,
  DenunciaPanel,
  DerechosPanel,
  PirateriaPanel,
  PrevengaPanel,
  RiesgosPanel,
} from '@/components/portal/ObservanciaHub'
import { CtaBand } from '@/components/story/CtaBand'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { SectionTabs } from '@/components/story/SectionTabs'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'

export const metadata: Metadata = {
  title: 'Observancia: Protege tu marca o patente — INAPI',
  description:
    'Información sobre piratería, falsificación, delitos, denuncia y cómo prevenir infracciones a la propiedad intelectual.',
}

const CASOS = [
  {
    year: '2010',
    title: 'Cantidad de suspensiones por aduana',
    body: 'La mayor cantidad de suspensiones en 2010 se explica por las efectuadas en la Aduana Metropolitana en el área postal y courier, en envíos pequeños.',
  },
  {
    year: '2012',
    title: 'Mercancía retenida (unidades)',
    body: 'El peak de 2012 se explica por suspensiones de la Aduana de Valparaíso y Los Andes: 6.340.000 unidades de pilas falsificadas y 9.050.000 unidades de cigarrillos falsificados de las marcas Philip Morris, Marlboro, Viceroy y Hilton.',
  },
  {
    year: '2009',
    title: 'Valor de la mercancía retenida (US$)',
    body: 'El valor informado corresponde al de la mercancía si fuera original. Las mercancías falsificadas suelen declararse hasta por un valor diez veces menor. El mayor monto de 2009 se debe a un contenedor de unos 28.000 lentes marca Chanel retenido en Valparaíso.',
  },
  {
    year: '2009–2016',
    title: 'Marcas y tipos de mercancía más vulnerados',
    body: 'El ranking considera marcas con más de 100 suspensiones y, por unidades, aquellas con 250 mil o más. Se distingue SPIDERMAN de MARVEL CHARACTERS INC. y se agrupan las marcas Disney (Cars, Princess, Mickey, Pluto y otras).',
  },
]

export default function ObservanciaPage() {
  return (
    <StoryPage
      path="/observancia"
      hero={{
        title: 'Observancia: Protege tu marca o patente',
        eyebrow: 'Observancia',
        dot: 'primary',
        lead: 'Conoce y utiliza las herramientas de protección frente a la piratería, la falsificación y otras infracciones.',
        primary: { href: '#acciones', label: 'Defender mis derechos' },
        secondary: { href: '#denuncia', label: 'Cómo denunciar' },
        seal: { center: 'R', caption: 'OBSERVANCIA' },
      }}
    >
      <StorySection
        tone="paper"
        eyebrow="Conceptos"
        title="Piratería y falsificación"
        lead="Las definiciones vienen del Acuerdo sobre los ADPIC de la Organización Mundial del Comercio."
      >
        <div className="mx-auto max-w-4xl">
          <PirateriaPanel />
        </div>
      </StorySection>

      <StorySection
        tone="night"
        eyebrow="Casos en frontera"
        dot="focus"
        title="Lo que retiene Aduanas"
        lead="Los derechos de propiedad intelectual se pueden defender a través de acciones civiles y penales. La ley también establece medios para impedir que productos infractores entren al mercado o para sacarlos de él."
      >
        <StoryCarousel label="Casos de mercancía retenida en aduanas, 2009-2016" tone="night">
          {CASOS.map(caso => (
            <article key={caso.year + caso.title} className="story-glass flex h-full flex-col gap-gob-3 rounded-gob-xl p-gob-6">
              <ShieldAlert className="size-6 text-[#A1D1FF]" aria-hidden />
              <p className="story-tabular font-heading text-[2.5rem] font-medium leading-none text-white">{caso.year}</p>
              <h3 className="font-heading text-gri-h2 font-medium text-white">{caso.title}</h3>
              <p className="text-gri-body-sm leading-[1.6] text-white/80">{caso.body}</p>
            </article>
          ))}
        </StoryCarousel>
        <p className="mt-gob-5 text-gri-body-xs text-white/65">Fuente: Información entregada por el Servicio Nacional de Aduanas.</p>
      </StorySection>

      <StorySection tone="mist" eyebrow="Antes de comprar o usar" title="Riesgos y prevención">
        <SectionTabs
          label="Riesgos y prevención"
          tabs={[
            {
              id: 'riesgos',
              label: 'Riesgos',
              icon: <AlertTriangle />,
              content: (
                <div className="mx-auto max-w-4xl rounded-gob-xl border border-gob-border bg-card p-gob-6 shadow-elevation-02 min-[905px]:p-gob-8">
                  <RiesgosPanel />
                </div>
              ),
            },
            {
              id: 'prevenga',
              label: 'Prevenga la infracción',
              icon: <ShieldCheck />,
              content: (
                <div className="mx-auto max-w-4xl rounded-gob-xl border border-gob-border bg-card p-gob-6 shadow-elevation-02 min-[905px]:p-gob-8">
                  <PrevengaPanel />
                </div>
              ),
            },
          ]}
        />
      </StorySection>

      <StorySection
        tone="paper"
        id="acciones"
        eyebrow="Acciones"
        title="Defienda sus derechos"
        lead="Acciones civiles y penales, delitos tipificados en la ley y dónde denunciar."
      >
        <SectionAccordion
          className="mx-auto max-w-5xl"
          items={[
            { id: 'derechos', title: 'Tus derechos', summary: 'Acciones civiles, penales, medidas en frontera e incautaciones', icon: <Scale />, content: <DerechosPanel /> },
            { id: 'delitos', title: 'Delitos', summary: 'Conductas, artículos y sanciones por tipo de derecho', icon: <Gavel />, content: <DelitosPanel /> },
            { id: 'denuncia', title: 'Denuncia', summary: 'Dónde denunciar y teléfonos de contacto', icon: <Megaphone />, content: <DenunciaPanel /> },
          ]}
        />
      </StorySection>

      <CtaBand
        eyebrow="Protege antes de defender"
        title="Registra tu marca o patente"
        body="Elige el tipo de protección que más se acerca a lo que necesitas."
        primary={{ href: '/que-proteger', label: 'Ver qué puedo proteger' }}
        secondary={{ href: '/contacto', label: 'Consultar con INAPI' }}
      />
    </StoryPage>
  )
}
