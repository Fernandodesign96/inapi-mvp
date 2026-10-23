import type { Metadata } from 'next'
import { Clock, CreditCard, FileText, Layers, Newspaper, Wallet } from 'lucide-react'
import { PortalFeeTable } from '@/components/portal/content'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { UTM_CLP } from '@/lib/tramites/mock-data'

export const metadata: Metadata = {
  title: 'Costos y plazos del registro de patente — INAPI',
  description: 'Tasas y plazos habituales para registrar una patente en Chile.',
}

const TASAS_PDF = 'https://www.inapi.cl/patentes/para-informarse'

export default function PatentesCostosPage() {
  return (
    <StoryPage
      path="/patentes/como-registrar/costos"
      hero={{
        eyebrow: 'Costos y plazos del registro',
        dot: 'primary',
        lead: 'Confirma el valor vigente en el Portal de trámites antes de pagar. Esta página no modifica las tasas oficiales.',
        seal: { center: 'UTM', caption: 'TASAS' },
      }}
    >
      <StorySection tone="paper" eyebrow="Resumen" title="Costos y plazos del registro de patente">
        <BentoGrid cols={3}>
          <BentoCard
            icon={<CreditCard />}
            title="Pagos principales"
            body={
              <IconList
                items={[
                  { text: <><strong>1 UTM</strong> al presentar (o hasta 30 días; si no, se da por no presentada).</> },
                  { text: <>Sobretasa de hojas: <strong>1 UTM</strong> extra por cada 20 hojas sobre 80.</> },
                  { text: <><strong>2 UTM</strong> por cada 5 años de vigencia al otorgarse.</> },
                ]}
              />
            }
          />
          <BentoCard
            icon={<Clock />}
            title="Plazos"
            body={
              <IconList
                items={[
                  { text: <>Hasta <strong>20 años</strong> desde la presentación (invención).</> },
                  { text: <><strong>60 días</strong> para publicar en el Diario Oficial.</> },
                  { text: <><strong>45 días</strong> de oposición desde la publicación.</> },
                ]}
              />
            }
            delay={0.05}
          />
          <BentoCard
            icon={<Layers />}
            title="Nueve etapas reales"
            body={
              <IconList
                items={[
                  { text: 'Presentación, examen de forma y publicación.' },
                  { text: 'Oposición, arancel pericial y nombramiento del perito.' },
                  { text: 'Etapa pericial, resolución y otorgamiento.' },
                ]}
              />
            }
            delay={0.1}
          />
        </BentoGrid>
      </StorySection>

      <StorySection tone="mist" id="tarifas" eyebrow="Tarifas" title="Pagas en varios momentos">
        <div className="grid items-start gap-gob-6 min-[1100px]:grid-cols-2">
          <div className="space-y-gob-4">
            <p className="text-gri-body leading-[1.6] text-gob-text">
              Los valores se expresan en UTM. 1 UTM equivale a ${UTM_CLP.toLocaleString('es-CL')} pesos de referencia.
            </p>
            <PortalFeeTable
              caption="Valores referenciales de patente de invención, vigentes a 2026."
              headers={['Momento del pago', 'Valor']}
              rows={[
                ['Al presentar la solicitud', '1 UTM'],
                ['Al publicar en el Diario Oficial', 'Tarifa del Diario Oficial (variable)'],
                ['Arancel pericial', 'Según informe oficial'],
                ['Al otorgarse (por cada 5 años)', '2 UTM'],
              ]}
            />
          </div>
          <BentoCard
            icon={<Wallet />}
            title="Detalle de tasas nacionales"
            body={
              <div className="space-y-gob-4">
                <IconList
                  items={[
                    { icon: Newspaper, text: <>La publicación del extracto se paga <strong>directamente al Diario Oficial</strong>.</> },
                    { text: 'El pago a INAPI se acredita cuando Tesorería confirma la transacción.' },
                    { text: 'Diseños: vigencia máxima 15 años, sin renovación. El certificado de depósito cuesta 1 UTM.' },
                    { text: 'Consulta el PDF oficial para modelos de utilidad, diseños y sobretasas de gracia (20% mensual).' },
                  ]}
                />
                <a
                  href={TASAS_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-gob-2 font-medium text-gob-link underline-offset-4 hover:underline"
                >
                  <FileText className="size-4" aria-hidden />
                  Ver tasas nacionales en inapi.cl
                </a>
              </div>
            }
          />
        </div>
      </StorySection>

      <VideoSpotlight
        id="video-costos"
        video="costosPatente"
        tone="night"
        title="Patentes: costos y duración"
        lead="Cuánto pagas y cuánto tiempo protege una patente en Chile."
        points={[
          { title: 'Tasa de presentación', body: '1 UTM al presentar la solicitud.' },
          { title: 'Vigencia', body: 'Hasta 20 años desde la presentación.' },
          { title: 'Etapas', body: 'Presentación, forma, publicación, peritaje y registro.' },
        ]}
      />

      <ShortcutBand kind="patentes" title="Presenta tu patente en línea" />
    </StoryPage>
  )
}
