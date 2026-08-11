import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalAccordion,
  PortalBulletList,
  PortalCtaBanner,
  PortalMain,
  PortalProse,
  PortalSectionTitle,
  PortalStepList,
} from '@/components/portal/content'
import { PATENTES_FAQ_ITEMS } from '@/lib/portal-news'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Cómo registrar una patente — INAPI',
  description:
    'Información para patentar una invención en Chile: requisitos, etapas de tramitación, tasas y preguntas frecuentes.',
}

export default function ComoRegistrarPatentePage() {
  return (
    <PortalShell {...portalShellProps('/patentes/como-registrar')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <section>
            <PortalSectionTitle>¿Qué es una patente?</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Una patente es el <strong className="text-gob-text">derecho exclusivo</strong> que el Estado concede para
              proteger una invención. Le da a su titular el derecho de vender la invención, ceder sus derechos a otra
              persona o impedir que terceros la exploten comercialmente, a cambio de revelar la invención al público.
            </PortalProse>
            <PortalProse>
              La protección dura hasta <strong className="text-gob-text">20 años</strong> desde la fecha de presentación de
              la solicitud, y solo aplica en el país donde se otorgó (principio de territorialidad).
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Ventajas de obtener una patente</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Patentar tu invento no es obligatorio: es una estrategia para mantener una ventaja competitiva. La patente te
              da exclusividad para explotar tu invento, excluyendo a terceros de fabricarlo, usarlo, venderlo o importarlo.
            </PortalProse>
            <PortalProse>
              Puedes patentar cualquier ámbito de la tecnología, desde mejoras pequeñas hasta grandes adelantos: mecánica,
              electricidad, biotecnología, farmacia o química.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Requisitos para obtener una patente</PortalSectionTitle>
            <PortalBulletList
              items={[
                <>
                  <strong className="text-gob-text">Ser novedosa:</strong> no debe existir antes en el estado de la técnica,
                  en ningún lugar del mundo.
                </>,
                <>
                  <strong className="text-gob-text">Tener nivel inventivo:</strong> no debe resultar obvia para alguien
                  experto en la materia.
                </>,
                <>
                  <strong className="text-gob-text">Ser aplicable industrialmente:</strong> debe poder producirse o usarse en
                  cualquier industria.
                </>,
              ]}
            />
          </section>

          <section>
            <PortalSectionTitle>Cómo presentar tu solicitud</PortalSectionTitle>
            <PortalProse className="mb-gob-3">
              Presenta tu solicitud en línea en el sitio de INAPI, adjuntando la documentación técnica y pagando 1 UTM.
              Necesitas <strong className="text-gob-text">ClaveÚnica</strong> del Registro Civil para firmar la solicitud
              electrónicamente.
            </PortalProse>
            <PortalProse>
              Excepcionalmente, si no tienes acceso a medios electrónicos, puedes presentar tu solicitud en papel en Av.
              Libertador Bernardo O&apos;Higgins 194, Santiago.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Etapas de tramitación</PortalSectionTitle>
            <PortalStepList
              steps={[
                {
                  num: 1,
                  title: 'Presentación de la solicitud',
                  body: 'Adjuntas la documentación técnica y pagas la tasa inicial de 1 UTM.',
                },
                {
                  num: 2,
                  title: 'Examen de forma',
                  body: 'INAPI revisa que la solicitud cumpla los requisitos formales mínimos.',
                },
                {
                  num: 3,
                  title: 'Publicación en el Diario Oficial',
                  body: 'Requieres la publicación dentro de 60 días de aceptada a trámite.',
                },
                {
                  num: 4,
                  title: 'Período de oposición',
                  body: 'Cualquier interesado puede oponerse dentro de 45 días desde la publicación.',
                },
                {
                  num: 5,
                  title: 'Pago del arancel pericial',
                  body: 'Acreditas el pago dentro de 60 días hábiles.',
                },
                {
                  num: 6,
                  title: 'Nombramiento del perito',
                  body: 'INAPI designa un perito según el área técnica de tu solicitud.',
                },
                {
                  num: 7,
                  title: 'Etapa pericial',
                  body: 'El perito evalúa si cumples los requisitos de patentabilidad, en un plazo de 60 días.',
                },
                {
                  num: 8,
                  title: 'Etapa resolutiva',
                  body: 'INAPI dicta la resolución que acepta o rechaza tu solicitud.',
                },
                {
                  num: 9,
                  title: 'Otorgamiento del registro',
                  body: 'Pagas 2 UTM por cada 5 años de vigencia del derecho.',
                },
              ]}
            />
            <PortalProse className="mt-gob-5">
              Si tu solicitud es rechazada, puedes apelar ante el Tribunal de Propiedad Industrial dentro de 15 días desde
              la notificación.
            </PortalProse>
          </section>

          <section>
            <PortalSectionTitle>Otras preguntas frecuentes</PortalSectionTitle>
            <PortalAccordion items={PATENTES_FAQ_ITEMS} />
          </section>

          <PortalCtaBanner title="¿Listo para patentar tu invención?" href="/patentes" cta="Ingresa tu solicitud" />
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
