import type { ComponentType } from 'react'
import {
  CreditCard,
  FilePenLine,
  FileText,
  Globe,
  Landmark,
  PencilLine,
  RefreshCw,
  Scale,
  Stamp,
} from 'lucide-react'
import { IconList } from '@/components/story/IconList'
import { TramitesLink } from '@/components/tramites/TramitesLink'

export type CatalogItem = {
  icon: ComponentType<{ className?: string }>
  title: string
  what: string
  why: string
  how: string[]
  needs: string[]
  example: string
  href?: string
  cta?: string
}

export const tramitesPrincipales: CatalogItem[] = [
  {
    icon: Stamp,
    title: 'Solicitud de marca',
    what: 'Es el formulario para pedir el registro de un nombre, logo o frase que identifica tu negocio.',
    why: 'Sirve para obtener el derecho exclusivo de uso en Chile, por clases de productos o servicios.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Indica el signo y las clases de Niza.',
      'Paga la tasa de presentación por cada clase.',
    ],
    needs: ['ClaveÚnica o clave INAPI.', 'El signo (palabra, logo o ambos).', 'Dinero para pagar 1 UTM por clase.'],
    example: 'Ejemplo: solicitas “Andes Café” en la clase de servicios de cafetería.',
    href: '/tramites/marcas/solicitar',
    cta: 'Iniciar solicitud de marca',
  },
  {
    icon: FileText,
    title: 'Solicitud de patente',
    what: 'Es el formulario para pedir protección de una invención, un modelo de utilidad o un diseño industrial.',
    why: 'Sirve para obtener el derecho exclusivo de explotar esa solución técnica o estética en Chile.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Elige patente, modelo de utilidad o diseño industrial.',
      'Adjunta la descripción y paga la tasa de presentación.',
    ],
    needs: [
      'ClaveÚnica o clave INAPI.',
      'Descripción de la invención o del diseño.',
      'Dinero para pagar la tasa de presentación.',
    ],
    example: 'Ejemplo: presentas una patente de un filtro de agua y adjuntas dibujos y reivindicaciones.',
    href: '/tramites/patentes/solicitar',
    cta: 'Iniciar solicitud de patente',
  },
  {
    icon: Globe,
    title: 'Solicitud de marca Sistema de Madrid',
    what: 'Es la vía para pedir protección de tu marca en otros países a partir de una marca chilena, usando el sistema internacional de Madrid.',
    why: 'Sirve para no presentar una solicitud distinta en cada país. INAPI actúa como oficina de origen.',
    how: [
      'Ten una solicitud o un registro de marca en Chile.',
      'Entra al Sitio de Trámites y elige Sistema de Madrid.',
      'Completa el formulario internacional e indica los países designados.',
    ],
    needs: ['Marca solicitada o registrada en Chile.', 'ClaveÚnica.', 'Pago de las tasas internacionales que correspondan.'],
    example: 'Ejemplo: tu marca chilena “Andes Café” se extiende a Perú y Colombia por Madrid.',
    href: '/marcas/sistema-de-madrid',
    cta: 'Ver Sistema de Madrid',
  },
]

export const tramitesSecundarios: CatalogItem[] = [
  {
    icon: CreditCard,
    title: 'Tipos de pago en línea',
    what: 'Son las vías para pagar tasas de INAPI: Tesorería (TGR), Formulario 10 en banco, Diario Oficial y otros pagos del expediente.',
    why: 'Sirve para que el trámite avance. Un pago fuera de plazo puede dejar sin efecto la solicitud o el registro.',
    how: [
      'Entra al Sitio de Trámites y abre el expediente.',
      'Elige el arancel pendiente: presentación, concesión, renovación u otro.',
      'Paga en línea por TGR o genera el comprobante y guarda el voucher.',
    ],
    needs: [
      'ClaveÚnica.',
      'Número de expediente.',
      'Medio de pago habilitado (TGR, banco u otro que indique el sistema).',
    ],
    example: 'Ejemplo: tu marca fue aceptada y pagas 2 UTM por clase para obtener el certificado.',
    href: '/tramites',
    cta: 'Ir al Portal de trámites',
  },
  {
    icon: FilePenLine,
    title: 'Presentación de escritos de marca o patente',
    what: 'Es el envío de un escrito a un expediente ya abierto de marca o de patente: respuesta a un oficio, desistimiento u otro documento.',
    why: 'Sirve para cumplir un plazo o aportar información sin iniciar una solicitud nueva.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Elige presentar escritos de marcas o de patentes.',
      'Indica el número de expediente, adjunta el escrito y envía.',
    ],
    needs: ['ClaveÚnica.', 'Número de solicitud, anotación o juicio.', 'El archivo del escrito y los anexos, si corresponden.'],
    example: 'Ejemplo: INAPI pidió aclarar las reivindicaciones y subes la respuesta en el expediente de la patente.',
    href: '/tramites',
    cta: 'Presentar un escrito',
  },
  {
    icon: RefreshCw,
    title: 'Renovación de marca',
    what: 'Es el trámite para continuar la protección de una marca por otros diez años.',
    why: 'Sirve para que el registro no caduque y sigas usando el signo con respaldo legal.',
    how: [
      'Entra al Sitio de Trámites antes del vencimiento.',
      'Selecciona el registro vigente que quieres renovar.',
      'Paga la tasa de renovación y confirma el envío.',
    ],
    needs: ['Marca vigente o en plazo de gracia.', 'ClaveÚnica.', 'Pago de la tasa de renovación.'],
    example: 'Ejemplo: tu marca vence en 2027 y la renuevas para el periodo 2027-2037.',
    href: '/marcas/renovacion',
    cta: 'Ver cómo renovar una marca',
  },
  {
    icon: PencilLine,
    title: 'Solicitud de anotación de marca',
    what: 'Es el trámite para dejar constancia de un cambio en una marca: transferencia, cambio de nombre, domicilio u otro hecho inscribible.',
    why: 'Sirve para que el registro refleje quién es el titular y cómo se identifica.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Elige solicitar anotación de marcas.',
      'Indica el tipo de anotación, adjunta respaldo y paga si corresponde.',
    ],
    needs: ['ClaveÚnica.', 'Número de registro o de solicitud.', 'Documento que acredita el cambio (contrato, poder u otro).'],
    example: 'Ejemplo: vendes “Andes Café” y anotas la transferencia al nuevo dueño.',
    href: '/tramites/marcas/tramites',
    cta: 'Presentar una anotación de marca',
  },
  {
    icon: Scale,
    title: 'Presentación de demanda de oposición',
    what: 'Es el escrito para oponerte a una solicitud de marca de un tercero, dentro del plazo de publicación.',
    why: 'Sirve para defender una marca anterior o un interés legítimo antes de que se conceda el registro ajeno.',
    how: [
      'Revisa la publicación en el Diario Oficial o en los estados diarios.',
      'Entra al Sitio de Trámites y elige presentar demanda de oposición.',
      'Fundamenta la oposición, adjunta pruebas y paga la tasa.',
    ],
    needs: ['ClaveÚnica.', 'Número de la solicitud impugnada.', 'Fundamentos y, si corresponde, tu marca anterior.'],
    example: 'Ejemplo: publican “Andes Koffee” en tu misma clase y presentas oposición dentro del plazo.',
    href: '/tramites',
    cta: 'Ir al Portal de trámites',
  },
  {
    icon: FilePenLine,
    title: 'Presentación de escritos de marca',
    what: 'Es el envío de un escrito solo en expedientes de marcas: respuesta a oficios, evacuación de traslados u otros documentos del procedimiento.',
    why: 'Sirve para cumplir un requerimiento de INAPI o aportar antecedentes en una solicitud, anotación o juicio de marcas.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Elige presentar escritos de marcas.',
      'Selecciona el expediente, carga el escrito y confirma el envío.',
    ],
    needs: ['ClaveÚnica.', 'Número de solicitud, anotación o juicio de marcas.', 'El archivo del escrito.'],
    example: 'Ejemplo: te notifican un oficio de forma y subes la respuesta con el signo corregido.',
    href: '/tramites',
    cta: 'Presentar un escrito de marca',
  },
  {
    icon: Landmark,
    title: 'Custodia de poderes y personerías',
    what: 'Es el registro único del poder o de la personería que autoriza a un representante a tramitar ante INAPI.',
    why: 'Sirve para no adjuntar el mismo poder en cada solicitud. Queda custodiado y se usa en trámites posteriores.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Ingresa el poder o la personería una sola vez.',
      'En los trámites siguientes, cita el documento ya custodiado.',
    ],
    needs: ['ClaveÚnica.', 'Poder o personería vigente.', 'Datos del mandante y del representante.'],
    example: 'Ejemplo: un estudio de abogados registra el poder de tu empresa y lo reutiliza en cada marca nueva.',
    href: '/tramites/custodia-poderes',
    cta: 'Registrar un poder',
  },
  {
    icon: PencilLine,
    title: 'Solicitud de anotación de patentes',
    what: 'Es el trámite para dejar constancia de un cambio en una patente, modelo de utilidad o diseño: transferencia, cambio de titular u otro hecho inscribible.',
    why: 'Sirve para que el registro de patentes refleje al titular actual y los gravámenes o licencias, si corresponde.',
    how: [
      'Entra al Sitio de Trámites con ClaveÚnica.',
      'Elige solicitar anotación de patentes.',
      'Indica el tipo de anotación, adjunta respaldo y paga si corresponde.',
    ],
    needs: ['ClaveÚnica.', 'Número de solicitud o de registro de patente.', 'Documento que acredita el cambio.'],
    example: 'Ejemplo: cedes tu patente a una sociedad y anotas la transferencia en el expediente.',
    href: '/tramites/patentes/anotaciones',
    cta: 'Presentar una anotación de patente',
  },
]

/** Contenido de un trámite sin tarjeta (para acordeones). */
export function CatalogDetails({ item }: { item: CatalogItem }) {
  return (
    <div className="grid gap-gob-5 text-gri-body-sm leading-[1.55] text-gob-text min-[905px]:grid-cols-2">
      <div className="space-y-gob-3">
        <p>
          <strong>Qué es.</strong> {item.what}
        </p>
        <p>
          <strong>Para qué sirve.</strong> {item.why}
        </p>
        <p>
          <strong>Ejemplo.</strong> {item.example}
        </p>
      </div>
      <div className="space-y-gob-4">
        <div>
          <p className="mb-gob-2 font-medium text-gob-primary-dark">Cómo se hace</p>
          <IconList items={item.how} />
        </div>
        <div>
          <p className="mb-gob-2 font-medium text-gob-primary-dark">Qué necesitas</p>
          <IconList items={item.needs} />
        </div>
        {item.href && item.cta ? (
          <TramitesLink href={item.href} className="inline-flex min-h-11 items-center font-medium text-gob-link underline-offset-4 hover:underline">
            {item.cta}
          </TramitesLink>
        ) : null}
      </div>
    </div>
  )
}
