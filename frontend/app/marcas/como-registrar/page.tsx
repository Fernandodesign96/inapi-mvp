import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalBulletList,
  PortalCtaBanner,
  PortalMain,
  PortalProse,
  PortalSectionTitle,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Cómo registrar una marca — INAPI',
  description: 'Información para registrarse una marca comercial en Chile: qué es, ventajas, pasos, tasas y vigencia.',
}

export default function ComoRegistrarMarcaPage() {
  return (
    <PortalShell {...portalShellProps('/marcas/como-registrar')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>¿Qué es una marca?</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Una marca es todo signo capaz de distinguir en el mercado productos o servicios. Puede ser una palabra, una
              combinación de palabras (<strong className="text-gob-text">marca mixta</strong>), cifras, letras, símbolos,
              dibujos (<strong className="text-gob-text">marca figurativa</strong>) o incluso signos sonoros.
            </PortalProse>
            <PortalProse>
              También existen marcas no tradicionales: tridimensionales, olfativas, de patrón, multimedia, holográficas,
              de movimiento, de posición o táctiles, siempre que sean lo suficientemente distintivas y puedan representarse
              de forma clara y precisa en el registro.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Ventajas de registrar una marca</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Una marca registrada te da el <strong className="text-gob-text">derecho exclusivo</strong> de usarla para
              distinguir tus productos o servicios, y de impedir que terceros usen una marca idéntica o muy similar para
              productos iguales o parecidos.
            </PortalProse>
            <PortalProse>
              Si alguien usa tu marca sin tu consentimiento, puedes ejercer acciones civiles (indemnización de perjuicios)
              o penales, según lo establece la ley.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Cómo registrar una marca?</PortalSectionTitle>
            <PortalBulletList
              items={[
                <>Presenta tu solicitud en línea, indicando la clase o clases de productos o servicios que quieres proteger.</>,
                <>INAPI revisa el examen formal para verificar que cumples los requisitos legales.</>,
                <>
                  Si el examen formal es aprobado, publicas la solicitud en el Diario Oficial dentro de 20 días hábiles,
                  para que terceros puedan oponerse.
                </>,
                <>Transcurridos 30 días desde la publicación sin oposición, INAPI realiza el examen de fondo.</>,
                <>Si no hay impedimentos, el Director Nacional dicta la resolución que concede el registro.</>,
              ]}
            />
            <PortalProse className="mt-gob-4">
              Si tu solicitud es rechazada, puedes apelar ante el Tribunal de Propiedad Industrial.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Tasas nacionales</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              El registro de una marca nueva cuesta <strong className="text-gob-text">3 UTM por cada clase solicitada</strong>,
              pagadas en dos etapas: 1 UTM al presentar la solicitud y 2 UTM si es aceptada a registro (con 60 días de plazo
              para pagar).
            </PortalProse>
            <PortalProse>
              Si tu marca es rechazada, el pago inicial no se devuelve. Debes pagar también la publicación del extracto en el
              Diario Oficial, con un costo variable según la extensión de tu descripción.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>¿Cuánto dura un registro de marca?</PortalSectionTitle>
            <PortalProse>
              Un registro dura <strong className="text-gob-text">10 años</strong> desde la fecha del registro, y puedes
              renovarlo indefinidamente dentro de los 6 meses antes o después del vencimiento.
            </PortalProse>
          </section>

          <PortalCtaBanner
            title="¿Listo para registrar tu marca?"
            href="/marcas/solicitud-nueva"
            cta="Ingresa tu solicitud"
          />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
