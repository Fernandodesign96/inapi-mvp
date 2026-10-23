import type { Metadata } from 'next'
import { Calendar, CreditCard, FileText, IdCard, RefreshCw, Shield } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ProgressMiniCards } from '@/components/story/ProgressMiniCards'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'

export const metadata: Metadata = {
  title: 'Renovar una marca — INAPI',
  description: 'Una marca registrada dura 10 años y puedes renovarla.',
}

export default function MarcasRenovacionPage() {
  return (
    <StoryPage
      path="/marcas/renovacion"
      hero={{
        eyebrow: 'Marcas',
        dot: 'accent',
        lead: 'Un registro dura 10 años. Puedes renovarlo en los 6 meses anteriores o posteriores al vencimiento, pagando 6 UTM por cada clase.',
        seal: { center: '10', caption: 'AÑOS' },
      }}
    >
      <StorySection tone="paper" eyebrow="Plazo" title="Cuándo renovar">
        <BentoGrid cols={3}>
          <BentoCard icon={<Calendar />} title="6 meses antes" body="Puedes presentar la renovación dentro de los seis meses anteriores al vencimiento del registro." />
          <BentoCard icon={<RefreshCw />} title="6 meses después" body="También existe un plazo de gracia de seis meses posteriores a la expiración." delay={0.05} />
          <BentoCard icon={<Shield />} title="Sin Diario Oficial" body="A diferencia de una marca nueva, la renovación no se publica en el Diario Oficial." delay={0.1} />
        </BentoGrid>
      </StorySection>

      <StorySection tone="mist" eyebrow="Cómo se hace" title="Pasos de la renovación">
        <ProgressMiniCards
          items={[
            { title: 'Formulario', body: 'En el Portal de trámites elige “Renovación de Marcas” e indica el número de registro.', icon: <FileText /> },
            { title: 'Titular', body: 'Individualiza al titular y, si corresponde, al representante. Cita el número de custodia del poder.', icon: <IdCard /> },
            { title: 'Alcance', body: 'Indica si renovas total o parcialmente. Solo en renovación parcial listas las clases que mantienes.', icon: <RefreshCw /> },
            { title: 'Pago', body: '6 UTM por cada clase, al presentar la solicitud. El pago se acredita en ese momento.', icon: <CreditCard /> },
          ]}
        />
      </StorySection>

      <StorySection tone="paper" eyebrow="Detalle oficial" title="Preguntas frecuentes de renovación">
        <SplitAccordion
          items={[
            {
              id: 'que-indicar',
              title: 'Qué debes indicar en el formulario',
              icon: <FileText />,
              content: (
                <IconList
                  items={[
                    { text: 'Número de registro que pretendes renovar.' },
                    { text: 'La marca, solo si es denominativa.' },
                    { text: 'Individualización completa del titular y de su representante, si corresponde.' },
                    { text: 'Si la renovación es total o parcial.' },
                  ]}
                />
              ),
            },
            {
              id: 'tasa',
              title: 'Cuánto se paga',
              icon: <CreditCard />,
              content: (
                <p>
                  El pago de derechos de una renovación es de <strong>6 UTM por cada clase</strong> a renovar y{' '}
                  <strong>debe efectuarse al presentar la solicitud</strong>.
                </p>
              ),
            },
            {
              id: 'poder',
              title: 'Si actúas por representante',
              icon: <IdCard />,
              content: (
                <p>
                  Acredita la representación acompañando el poder o citando el <strong>número de custodia</strong> del
                  poder ante INAPI, si ya estaba custodiado.
                </p>
              ),
            },
            {
              id: 'caduca',
              title: 'La marca puede perder vigencia antes',
              icon: <Shield />,
              content: (
                <IconList
                  items={[
                    { text: 'Juicio de nulidad.' },
                    { text: 'Caducidad por genericidad o por no uso.' },
                    { text: 'Invalidación administrativa.' },
                  ]}
                />
              ),
            },
          ]}
        />
      </StorySection>

      <ShortcutBand kind="marcas" title="Renueva o inicia otro trámite de marca" />
    </StoryPage>
  )
}
