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
  title: 'Costos y plazos del registro de marca — INAPI',
  description: 'Tasas y plazos habituales para registrar una marca en Chile.',
}

const TASAS_PDF = 'https://www.inapi.cl/marcas/para-informarse'

export default function MarcasCostosPage() {
  return (
    <StoryPage
      path="/marcas/como-registrar/costos"
      hero={{
        eyebrow: 'Costos y plazos del registro',
        dot: 'accent',
        lead: 'Pagas por cada clase de Niza. Los valores oficiales se confirman al momento del pago.',
        seal: { center: '3', caption: 'UTM / CLASE' },
      }}
    >
      <StorySection tone="paper" eyebrow="Resumen" title="Costos y plazos del registro de marca">
        <BentoGrid cols={3}>
          <BentoCard
            icon={<CreditCard />}
            title="3 UTM por clase"
            body={
              <IconList
                items={[
                  { text: <><strong>1 UTM</strong> al presentar la solicitud.</> },
                  { text: <><strong>2 UTM</strong> si se acepta a registro (60 días hábiles).</> },
                  { text: 'Si se rechaza, el pago inicial no se devuelve.' },
                ]}
              />
            }
          />
          <BentoCard
            icon={<Clock />}
            title="Plazo habitual"
            body={
              <IconList
                items={[
                  { text: <><strong>6 a 8 meses</strong> si no hay oposiciones.</> },
                  { text: <><strong>20 días hábiles</strong> para publicar en el Diario Oficial.</> },
                  { text: <><strong>30 días hábiles</strong> de oposición tras la publicación.</> },
                ]}
              />
            }
            delay={0.05}
          />
          <BentoCard
            icon={<Layers />}
            title="Seis etapas reales"
            body={
              <IconList
                items={[
                  { text: '1. Formulario de marca nueva.' },
                  { text: '2. Examen de forma y publicación.' },
                  { text: '3. Examen de fondo.' },
                  { text: '4. Resolución definitiva.' },
                  { text: '5. Pago de la tasa final.' },
                  { text: '6. Marca registrada (10 años).' },
                ]}
              />
            }
            delay={0.1}
          />
        </BentoGrid>
      </StorySection>

      <StorySection tone="mist" id="tarifas" eyebrow="Tarifas" title="Pagas en dos momentos y por cada clase">
        <div className="grid items-start gap-gob-6 min-[1100px]:grid-cols-2">
          <div className="space-y-gob-4">
            <p className="text-gri-body leading-[1.6] text-gob-text">
              Pagas en dos momentos y por cada clase. Los valores oficiales se confirman al momento del pago.
            </p>
            <PortalFeeTable
              caption="Tarifas por clase, vigentes a 2026."
              headers={['Momento del pago', 'Valor por clase']}
              rows={[
                ['Al presentar la solicitud', '1 UTM'],
                ['Al publicar en el Diario Oficial', 'Tarifa del Diario Oficial (variable)'],
                ['Al aprobarse el registro', '2 UTM'],
              ]}
            />
            <p className="text-gri-body-sm text-muted-foreground">
              1 UTM equivale a ${UTM_CLP.toLocaleString('es-CL')} pesos de referencia. El monto exacto depende del valor UTM
              vigente al pagar.
            </p>
          </div>
          <BentoCard
            icon={<Wallet />}
            title="Detalle de las tasas nacionales"
            body={
              <div className="space-y-gob-4">
                <IconList
                  items={[
                    {
                      text: (
                        <>
                          Las inscripciones de marcas nuevas pagan <strong>tres UTM por cada clase</strong>, en dos etapas:
                          inicio y, si se acepta, cierre.
                        </>
                      ),
                    },
                    {
                      icon: Newspaper,
                      text: (
                        <>
                          Es <strong>obligatorio</strong> publicar un extracto en el Diario Oficial. El costo depende de la
                          extensión de productos o servicios y se paga <em>directamente</em> al Diario Oficial.
                        </>
                      ),
                    },
                    {
                      text: (
                        <>
                          El pago a INAPI se hace en línea en la <strong>Tesorería General de la República</strong>. Queda
                          acreditado cuando TGR confirma a INAPI.
                        </>
                      ),
                    },
                    {
                      text: (
                        <>
                          Si no acreditas el pago final, la solicitud se tiene por <strong>abandonada</strong> y se archiva.
                        </>
                      ),
                    },
                  ]}
                />
                <a
                  href={TASAS_PDF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-gob-2 font-medium text-gob-link underline-offset-4 hover:underline"
                >
                  <FileText className="size-4" aria-hidden />
                  Descargar cuadro de tasas (PDF en inapi.cl)
                </a>
              </div>
            }
          />
        </div>
      </StorySection>

      <VideoSpotlight
        video="solicitarMarca"
        tone="night"
        title="Cómo solicitar una marca en línea"
        lead="Paso a paso para presentar tu solicitud de marca en el Portal de trámites."
        points={[
          { title: 'Al presentar la solicitud', body: 'Pagas la tasa de presentación por cada clase de Niza.' },
          { title: 'Al aprobarse el registro', body: 'Pagas el segundo valor por clase para obtener el registro.' },
        ]}
      />

      <ShortcutBand kind="marcas" title="Registra tu marca" />
    </StoryPage>
  )
}
