import type { Metadata } from 'next'
import { ClipboardCheck, FileSearch, Gavel, Lightbulb, Newspaper, PenLine, Scale, Wallet } from 'lucide-react'
import { PROCESS_FLOWS } from '@/lib/inapi-process-timelines'
import { PATENTES_FAQ_ITEMS } from '@/lib/portal-news'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ProgressMiniCards } from '@/components/story/ProgressMiniCards'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'

export const metadata: Metadata = {
  title: 'Cómo registrar una patente — INAPI',
  description:
    'Información para patentar una invención en Chile: requisitos, etapas de tramitación, tasas y preguntas frecuentes.',
}

export default function ComoRegistrarPatentePage() {
  return (
    <StoryPage
      path="/patentes/como-registrar"
      hero={{
        eyebrow: 'Patentes',
        dot: 'primary',
        lead: 'Requisitos, etapas, tasas y preguntas frecuentes para patentar una invención en Chile.',
        seal: { center: 'P', caption: 'PATENTE' },
      }}
    >
      <StorySection tone="paper" eyebrow="Definición" title="¿Qué es una patente?">
        <p className="max-w-3xl text-gri-body leading-[1.65] text-gob-text">
          Una patente es el <strong>derecho exclusivo</strong> que el Estado concede para proteger una invención. Le da a su
          titular el derecho de vender la invención, ceder sus derechos o impedir que terceros la exploten comercialmente, a
          cambio de revelar la invención al público. Dura hasta <strong>20 años</strong> desde la presentación y solo aplica
          en el país donde se otorgó.
        </p>
      </StorySection>

      <StorySection tone="mist" eyebrow="Estrategia" title="Ventajas de obtener una patente">
        <BentoGrid cols={2}>
          <BentoCard
            icon={<Lightbulb />}
            title="No es obligatorio"
            body="Patentar es una estrategia para mantener una ventaja competitiva: exclusividad para fabricar, usar, vender o importar."
          />
          <BentoCard
            icon={<Scale />}
            title="Cubre toda la tecnología"
            body="Mecánica, electricidad, biotecnología, farmacia o química: desde mejoras pequeñas hasta grandes adelantos."
            delay={0.06}
          />
        </BentoGrid>
      </StorySection>

      <StorySection tone="paper" eyebrow="Requisitos" title="Requisitos para obtener una patente">
        <IconList
          items={[
            { text: <><strong>Ser novedosa:</strong> no debe existir antes en el estado de la técnica, en ningún lugar del mundo.</> },
            { text: <><strong>Tener nivel inventivo:</strong> no debe resultar obvia para alguien experto en la materia.</> },
            { text: <><strong>Ser aplicable industrialmente:</strong> debe poder producirse o usarse en cualquier industria.</> },
          ]}
        />
      </StorySection>

      <StorySection tone="mist" eyebrow="Presentación" title="Cómo presentar tu solicitud">
        <IconList
          items={[
            { icon: PenLine, text: <>Presenta en línea, adjunta la documentación técnica y paga <strong>1 UTM</strong>.</> },
            { text: <>Necesitas <strong>ClaveÚnica</strong> del Registro Civil para firmar electrónicamente.</> },
            { text: <>Excepcionalmente, si no tienes acceso electrónico, puedes presentar en papel en O&apos;Higgins 194, Santiago.</> },
          ]}
        />
      </StorySection>

      <StorySection tone="paper" eyebrow="Etapas" title="Línea de tiempo del trámite">
        <StoryCarousel label={PROCESS_FLOWS.patentes.title} arrows="sides" itemClassName="basis-[92%] min-[905px]:basis-[48%]">
          {PROCESS_FLOWS.patentes.stages.map((stage, i) => (
            <BentoCard
              key={stage.title}
              eyebrow={`Etapa ${i + 1}`}
              title={stage.title}
              body={
                <div className="space-y-gob-3">
                  <p>{stage.summary}</p>
                  <IconList items={stage.states.map(s => ({ text: <><strong>{s.label}.</strong> {s.detail}</> }))} />
                </div>
              }
            />
          ))}
        </StoryCarousel>
      </StorySection>

      <StorySection tone="mist" eyebrow="Diseños" title="Dibujos y diseños industriales">
        <StoryCarousel label={PROCESS_FLOWS.disenos.title} arrows="sides" itemClassName="basis-[92%] min-[905px]:basis-[48%]">
          {PROCESS_FLOWS.disenos.stages.map((stage, i) => (
            <BentoCard
              key={stage.title}
              eyebrow={`Etapa ${i + 1}`}
              title={stage.title}
              body={
                <div className="space-y-gob-3">
                  <p>{stage.summary}</p>
                  <IconList items={stage.states.map(s => ({ text: <><strong>{s.label}.</strong> {s.detail}</> }))} />
                </div>
              }
            />
          ))}
        </StoryCarousel>
      </StorySection>

      <StorySection tone="paper" eyebrow="Nueve hitos" title="Etapas de tramitación">
        <ProgressMiniCards
          items={[
            { title: '1. Presentación', body: 'Adjuntas la memoria y pagas 1 UTM.', icon: <PenLine /> },
            { title: '2. Examen de forma', body: 'INAPI revisa requisitos formales mínimos.', icon: <ClipboardCheck /> },
            { title: '3. Diario Oficial', body: 'Publicas dentro de 60 días de aceptada a trámite.', icon: <Newspaper /> },
            { title: '4. Oposición', body: '45 días desde la publicación para oponerse.', icon: <Scale /> },
          ]}
        />
        <div className="mt-gob-5">
          <IconList
            items={[
              { icon: Wallet, text: <><strong>5. Arancel pericial:</strong> acreditas el pago dentro de 60 días hábiles.</> },
              { icon: FileSearch, text: <><strong>6–7. Perito:</strong> INAPI nombra un perito; evalúa patentabilidad en 60 días.</> },
              { icon: Gavel, text: <><strong>8–9. Resolución y registro:</strong> se acepta o rechaza; pagas 2 UTM por cada 5 años de vigencia.</> },
              { icon: Scale, text: <>Si te rechazan, apelación ante el TDPI dentro de <strong>15 días</strong> desde la notificación.</> },
            ]}
          />
        </div>
      </StorySection>

      <StorySection tone="mist" eyebrow="Más detalle" title="Otras preguntas frecuentes">
        <SplitAccordion
          items={PATENTES_FAQ_ITEMS.map((item, i) => ({
            id: `pat-faq-${i}`,
            title: item.title,
            content: <p>{item.content}</p>,
          }))}
        />
      </StorySection>

      <ShortcutBand kind="patentes" title="¿Listo para patentar tu invención?" />
    </StoryPage>
  )
}
