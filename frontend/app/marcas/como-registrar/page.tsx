import type { Metadata } from 'next'
import { ClipboardCheck, FileSearch, Gavel, Newspaper, PenLine, Scale, Wallet } from 'lucide-react'
import { PROCESS_FLOWS } from '@/lib/inapi-process-timelines'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ProgressMiniCards } from '@/components/story/ProgressMiniCards'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'

export const metadata: Metadata = {
  title: 'Cómo registrar una marca — INAPI',
  description: 'Pasos, tasas y plazos para registrar una marca comercial en Chile.',
}

export default function ComoRegistrarMarcaPage() {
  const flow = PROCESS_FLOWS.marcas
  return (
    <StoryPage
      path="/marcas/como-registrar"
      hero={{
        eyebrow: 'Marcas',
        dot: 'accent',
        lead: 'Presentación en línea, examen, publicación en el Diario Oficial y concesión. Las solicitudes deben presentarse electrónicamente.',
        seal: { center: 'R', caption: 'REGISTRO' },
      }}
    >
      <StorySection tone="paper" eyebrow="Paso a paso" title="¿Cómo registrar una marca?">
        <ProgressMiniCards
          items={[
            { title: 'Presenta', body: 'Indica el signo y las clases de Niza. No podrás cambiar la marca ni agregar productos después.', icon: <PenLine /> },
            { title: 'Examen formal', body: 'INAPI verifica requisitos legales y reglamentarios.', icon: <ClipboardCheck /> },
            { title: 'Publica', body: '20 días hábiles para pagar el extracto en el Diario Oficial. Luego corren 30 días de oposición.', icon: <Newspaper /> },
            { title: 'Examen de fondo', body: 'Si no hay oposición, INAPI revisa prohibiciones de los artículos 19 y 20.', icon: <FileSearch /> },
          ]}
        />
        <div className="mt-gob-6">
          <IconList
            items={[
              { icon: Scale, text: <>Si te rechazan, puedes <strong>apelar</strong> ante el Tribunal de Propiedad Industrial (15 días, con abogado).</> },
              { icon: PenLine, text: <>Excepcionalmente, presentación en papel si acreditas falta de medios, en O&apos;Higgins 194, piso 1, 09:00 a 14:00.</> },
            ]}
          />
        </div>
      </StorySection>

      <StorySection tone="mist" eyebrow="Etapas" title="Línea de tiempo del trámite">
        <p className="mb-gob-5 max-w-3xl text-gri-body leading-[1.6] text-muted-foreground">{flow.lead}</p>
        <StoryCarousel label={flow.title} arrows="sides" itemClassName="basis-[92%] min-[905px]:basis-[48%]">
          {flow.stages.map((stage, i) => (
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
        <p className="mt-gob-4 text-gri-body-xs text-muted-foreground">{flow.source}</p>
      </StorySection>

      <StorySection tone="paper" eyebrow="Tasas" title="Tasas nacionales">
        <BentoGrid cols={3}>
          <BentoCard icon={<Wallet />} title="1 UTM al presentar" body="Por cada clase. Si la marca se rechaza, este pago no se devuelve." />
          <BentoCard icon={<Newspaper />} title="Diario Oficial" body="Costo variable según la extensión de la descripción. Se paga directo al Diario Oficial, no a INAPI." delay={0.05} />
          <BentoCard icon={<Wallet />} title="2 UTM al conceder" body="60 días hábiles para pagar y acreditar. Si no, la solicitud se tiene por abandonada." delay={0.1} />
        </BentoGrid>
        <p className="mt-gob-5 text-gri-body leading-[1.6] text-gob-text">
          El total de derechos INAPI es <strong>3 UTM por cada clase</strong>. El formulario en línea es <em>multiclase</em>:
          puedes pedir varias clases y productos y servicios a la vez.
        </p>
      </StorySection>

      <StorySection tone="mist" eyebrow="Vigencia" title="¿Cuánto dura un registro de marca?">
        <SplitAccordion
          items={[
            {
              id: 'diez-anos',
              title: 'Diez años desde el registro',
              icon: <ClipboardCheck />,
              content: (
                <p>
                  Un registro dura <strong>10 años</strong> desde la fecha del registro. Puedes renovarlo indefinidamente
                  dentro de los <strong>6 meses anteriores o posteriores</strong> al vencimiento.
                </p>
              ),
            },
            {
              id: 'perdida',
              title: 'Puede caducar antes',
              icon: <Gavel />,
              content: (
                <IconList
                  items={[
                    { text: 'Juicio de nulidad.' },
                    { text: 'Caducidad por genericidad o por no uso.' },
                    { text: 'Invalidación por un procedimiento administrativo.' },
                  ]}
                />
              ),
            },
          ]}
        />
      </StorySection>

      <ShortcutBand kind="marcas" title="Registra tu marca" body="Busca similitudes e inicia la solicitud en el Portal de trámites, con ClaveÚnica." />
    </StoryPage>
  )
}
