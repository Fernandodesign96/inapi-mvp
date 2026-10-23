import type { Metadata } from 'next'
import { Factory, Lightbulb, Shield, Sparkles } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'Qué es una patente — INAPI',
  description: 'Una patente protege un invento y te da el derecho exclusivo a usarlo en Chile.',
}

export default function QueEsUnaPatentePage() {
  return (
    <StoryPage
      path="/patentes/que-es-una-patente"
      hero={{
        eyebrow: 'Patentes',
        dot: 'primary',
        lead: 'Una patente protege un invento y te da el derecho exclusivo a usarlo en Chile.',
        seal: { center: 'P', caption: 'PATENTE' },
      }}
    >
      <StorySection tone="paper" id="que-protege" eyebrow="Qué protege" title="Qué protege una patente">
        <div className="grid items-start gap-gob-6 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-gob-5">
            <p className="text-gri-body leading-[1.65] text-gob-text min-[600px]:text-[1.0625rem]">
              Una patente es un <strong>derecho exclusivo</strong> que el Estado otorga sobre un invento. Con ella decides
              quién puede fabricar, usar o vender tu invención en Chile.
            </p>
            <IconList
              items={[
                {
                  icon: Sparkles,
                  text: (
                    <>
                      Debe ser <strong>nueva</strong>: no existir antes en el estado de la técnica, en ningún lugar del mundo.
                    </>
                  ),
                },
                {
                  icon: Lightbulb,
                  text: (
                    <>
                      Tener <strong>nivel inventivo</strong>: no resultar obvia para alguien versado en la materia.
                    </>
                  ),
                },
                {
                  icon: Factory,
                  text: (
                    <>
                      Ser <strong>aplicable industrialmente</strong>: poder producirse o usarse en cualquier industria.
                    </>
                  ),
                },
                {
                  icon: Shield,
                  text: (
                    <>
                      Dura hasta <strong>20 años</strong> desde la presentación. A cambio, publicas cómo funciona el invento.
                    </>
                  ),
                },
              ]}
            />
          </div>
          <BentoGrid cols={2} className="min-[600px]:grid-cols-1">
            <BentoCard
              icon={<Lightbulb />}
              title="Ejemplo de invención"
              body="Un filtro de agua con un procedimiento nuevo. Adjuntas dibujos y reivindicaciones en la memoria técnica."
            />
            <BentoCard
              icon={<Factory />}
              title="Ejemplo de modelo de utilidad"
              body="Una mejora en la forma de una herramienta que facilita su uso, sin ser un salto inventivo de patente de invención."
              delay={0.06}
            />
            <BentoCard
              icon={<Shield />}
              title="Ejemplo de defensa"
              body="Nadie puede fabricar, vender o usar esa invención en Chile sin tu permiso mientras el derecho esté vigente."
              delay={0.1}
            />
          </BentoGrid>
        </div>
      </StorySection>

      <VideoSpotlight
        video="queEsPatente"
        tone="night"
        title="Qué es una patente"
        lead="Una explicación breve de qué protege una patente y por qué sirve."
        points={[
          { title: 'Derecho exclusivo', body: 'Decides quién puede fabricar, usar o vender tu invención en Chile.' },
          { title: 'Hasta 20 años', body: 'Desde que presentas la solicitud. A cambio, publicas cómo funciona tu invento.' },
        ]}
      />

      <ShortcutBand kind="patentes" title="Presenta tu patente" />
    </StoryPage>
  )
}
