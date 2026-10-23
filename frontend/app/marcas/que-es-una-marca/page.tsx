import type { Metadata } from 'next'
import { Ban, Scale, Shield, Tag, Volume2 } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { IconList } from '@/components/story/IconList'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'

export const metadata: Metadata = {
  title: 'Qué es una marca — INAPI',
  description: 'Una marca identifica tus productos o servicios y los diferencia en el mercado.',
}

export default function QueEsUnaMarcaPage() {
  return (
    <StoryPage
      path="/marcas/que-es-una-marca"
      hero={{
        eyebrow: 'Marcas',
        dot: 'accent',
        lead: 'Una marca identifica tus productos o servicios y los diferencia en el mercado.',
        seal: { center: 'R', caption: 'MARCA' },
      }}
    >
      <StorySection tone="paper" id="que-protege" eyebrow="Qué protege" title="Qué protege una marca">
        <div className="grid items-start gap-gob-6 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
          <div className="space-y-gob-5">
            <p className="text-gri-body leading-[1.65] text-gob-text min-[600px]:text-[1.0625rem]">
              Una marca es <strong>todo signo capaz de distinguir</strong> en el mercado productos o servicios. Puede ser
              una palabra (<em>marca denominativa</em>), una combinación de palabras (<em>marca mixta</em>), cifras, letras,
              símbolos, dibujos (<em>marca figurativa</em>) o incluso signos sonoros.
            </p>
            <IconList
              items={[
                {
                  icon: Tag,
                  text: (
                    <>
                      También existen marcas <strong>no tradicionales</strong>: tridimensionales, olfativas, de patrón,
                      multimedia, holográficas, de movimiento, de posición o táctiles, siempre que sean distintivas y se
                      representen de forma clara y precisa.
                    </>
                  ),
                },
                {
                  icon: Shield,
                  text: (
                    <>
                      Al registrarla obtienes el <strong>derecho exclusivo</strong> de usarla en Chile por{' '}
                      <strong>diez años</strong>, con opción de renovarla.
                    </>
                  ),
                },
                {
                  icon: Scale,
                  text: (
                    <>
                      Si alguien la usa sin tu consentimiento puedes ejercer acciones <strong>civiles</strong> (indemnización
                      de perjuicios) o <strong>penales</strong>, según la ley.
                    </>
                  ),
                },
                {
                  icon: Ban,
                  text: (
                    <>
                      Puedes <strong>impedir</strong> que terceros usen una marca idéntica o muy similar para productos
                      iguales o parecidos.
                    </>
                  ),
                },
              ]}
            />
          </div>
          <BentoGrid cols={2} className="min-[600px]:grid-cols-1">
            <BentoCard
              icon={<Tag />}
              title="Ejemplo denominativa"
              body={
                <>
                  <strong>“Andes Café”</strong> en clase 43 distingue tu cafetería. El público debe poder reconocerla frente
                  a nombres parecidos.
                </>
              }
            />
            <BentoCard
              icon={<Volume2 />}
              title="Ejemplo no tradicional"
              body="Un jingle breve o un envase tridimensional pueden registrarse si se describen con claridad en el expediente."
              delay={0.06}
            />
            <BentoCard
              icon={<Shield />}
              title="Ejemplo de defensa"
              body="Si publican “Andes Koffee” en tu misma clase, puedes oponerte durante los 30 días hábiles posteriores a la publicación en el Diario Oficial."
              delay={0.1}
            />
          </BentoGrid>
        </div>
      </StorySection>

      <VideoSpotlight
        video="patenteVsMarca"
        tone="night"
        title="Diferencia entre patente y marca"
        lead="Cuándo necesitas una marca, cuándo una patente y cuándo ambas."
        points={[
          { title: 'Marca', body: 'Un signo que identifica tus productos, servicios o tu negocio.' },
          { title: 'Diez años', body: 'Derecho exclusivo en Chile, con opción de renovarla.' },
        ]}
      />

      <ShortcutBand
        kind="marcas"
        title="Registra tu marca"
        eyebrow="Siguiente paso"
        body="Busca primero si ya existe un signo parecido y luego inicia la solicitud. Los demás atajos quedan al lado."
      />
    </StoryPage>
  )
}
