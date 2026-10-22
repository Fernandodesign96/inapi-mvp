'use client'

import Link from 'next/link'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { GuillocheBg } from '@/components/story/PiSeal'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { SectionTabs } from '@/components/story/SectionTabs'
import { StoryCta } from '@/components/story/StoryCta'
import { StorySection } from '@/components/story/StorySection'
import {
  AlertTriangle,
  Banknote,
  Bell,
  ClipboardList,
  Download,
  FileCheck,
  Globe,
  Lightbulb,
  ListOrdered,
  Palette,
  Stamp,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { notifyDownload } from '@/components/tramites/DownloadToast'
import { useI18n } from '@/lib/i18n/LocaleProvider'

type SubCard = {
  icon: LucideIcon
  title: string
  description: string
  bullets: string[]
  href: string
  cta: string
}

type Tab = {
  id: string
  label: string
  icon: LucideIcon
  intro: string
  href: string
  cta: string
  guide?: { href: string; label: string }
  notifications?: { href: string; label: string }
  cards: SubCard[]
}

const CARD_ORDER = ['Requisitos', 'Proceso', 'Etapas', 'Pagos', 'Avisos', 'Herramientas'] as const

function orderedCards(cards: SubCard[]) {
  return [...cards].sort(
    (a, b) => CARD_ORDER.indexOf(a.title as (typeof CARD_ORDER)[number]) - CARD_ORDER.indexOf(b.title as (typeof CARD_ORDER)[number]),
  )
}

const tabs: Tab[] = [
  {
    id: 'marcas',
    label: 'Marcas',
    icon: Stamp,
    intro:
      'Una marca es el nombre, el logo o la combinación de ambos que sirve para que las personas reconozcan tu negocio y no lo confundan con la competencia. En palabras simples, es la identidad de tu producto o servicio, lo que hace que un cliente diga: "Quiero comprar este producto específico y no el de otra tienda".',
    href: '/marcas',
    cta: 'Ir a la ficha de marcas',
    guide: {
      href: '/inapi-mvp/home/guia-marcas.pdf',
      label: 'Descargar guía de marcas (PDF 16,4 MB)',
    },
    notifications: {
      href: '/notificaciones-diarias/marcas',
      label: 'Estado público de marcas',
    },
    cards: [
      {
        icon: Banknote,
        title: 'Pagos',
        description:
          'Pagas en dos momentos y por cada clase de productos o servicios. Los valores se expresan en UTM y se pagan en el Sitio de Trámites.',
        bullets: [
          '1 UTM por clase al presentar la solicitud.',
          '2 UTM por clase si el registro se aprueba.',
          'La tasa inicial no se devuelve si hay rechazo.',
          'La publicación del extracto en el Diario Oficial tiene un costo aparte.',
        ],
        href: '/marcas',
        cta: 'Revisar tarifas de marcas',
      },
      {
        icon: ClipboardList,
        title: 'Proceso',
        description:
          'El camino es digital. Primero buscas si existe un signo parecido, luego presentas con ClaveÚnica y sigues el expediente en línea.',
        bullets: [
          'Compara tu signo en el buscador de similitud.',
          'Completa el formulario y adjunta el logo, si aplica.',
          'Paga la tasa de presentación para que INAPI reciba la solicitud.',
          'Revisa oficios, plazos y estado en el mismo expediente.',
        ],
        href: '/marcas/como-registrar',
        cta: 'Leer cómo registrar una marca',
      },
      {
        icon: ListOrdered,
        title: 'Etapas',
        description:
          'El registro tiene tres etapas. En 2024, las marcas sin oposición tardaron en promedio 4,5 meses.',
        bullets: [
          'Presentación y revisión de forma.',
          'Publicación en el Diario Oficial y plazo de oposición.',
          'Examen de fondo, pago de registro y certificado.',
        ],
        href: '/marcas/como-registrar',
        cta: 'Ver las etapas del registro',
      },
      {
        icon: AlertTriangle,
        title: 'Avisos',
        description:
          'Un atraso o un signo parecido puede alargar o cerrar el trámite. Revisa estos puntos antes de presentar.',
        bullets: [
          'Una oposición alarga el plazo: el promedio general en 2024 fue de 8,4 meses.',
          'Si rechazan, puedes apelar ante el Tribunal de Propiedad Industrial.',
          'Un pago fuera de plazo puede dejar sin efecto la solicitud.',
          'Busca marcas parecidas para reducir el riesgo de rechazo.',
        ],
        href: '/marcas/buscadores',
        cta: 'Buscador de marcas',
      },
      {
        icon: Wrench,
        title: 'Herramientas',
        description:
          'Usa estos servicios para informarte y tramitar. El formulario se presenta en el Sitio de Trámites.',
        bullets: [
          'Buscador de marcas.',
          'Notificaciones INAPI de marcas.',
          'Guía de registro y ficha de requisitos.',
        ],
        href: '/marcas/buscadores',
        cta: 'Abrir herramientas de marcas',
      },
      {
        icon: FileCheck,
        title: 'Requisitos',
        description:
          'Para que el registro siga adelante, tu solicitud debe identificar el signo, al titular y las clases que cubre.',
        bullets: [
          'El signo que quieres proteger: palabra, logo o ambos, y que distinga tu oferta.',
          'Las clases de Niza de tus productos o servicios.',
          'Identificación del titular: una persona o una empresa, con o sin representante.',
          'ClaveÚnica o clave INAPI, y el pago de la tasa de presentación por cada clase.',
        ],
        href: '/marcas',
        cta: 'Leer qué necesitas para una marca',
      },
    ],
  },
  {
    id: 'patentes',
    label: 'Patentes',
    icon: Lightbulb,
    intro:
      'Una patente es un derecho exclusivo que otorga el Estado a un inventor para proteger una invención (un producto o un procedimiento nuevo), impidiendo que terceros la fabriquen, vendan o utilicen sin su consentimiento.',
    href: '/patentes',
    cta: 'Ir a la ficha de patentes',
    guide: {
      href: '/inapi-mvp/home/guia-patentes.pdf',
      label: 'Descargar guía de patentes (PDF 12,5 MB)',
    },
    notifications: {
      href: '/notificaciones-diarias/patentes',
      label: 'Estado público de patentes',
    },
    cards: [
      {
        icon: Banknote,
        title: 'Pagos',
        description:
          'La patente se paga en varias etapas. Los valores están en UTM y cambian según el tipo de derecho.',
        bullets: [
          '1 UTM al presentar la solicitud.',
          '4 UTM al aprobar el primer decenio.',
          'Luego pagas derechos de vigencia por periodos.',
          'Confirma el valor vigente en el Sitio de Trámites antes de pagar.',
        ],
        href: '/patentes',
        cta: 'Revisar tarifas de patentes',
      },
      {
        icon: ClipboardList,
        title: 'Proceso',
        description:
          'Presentas una memoria técnica, pagas la tasa inicial y sigues el expediente digital. Puedes actuar con representante.',
        bullets: [
          'Revisa si ya existe una solicitud parecida en el buscador.',
          'Adjunta la memoria que explica el invento.',
          'Ingresa con ClaveÚnica o clave INAPI.',
          'Responde oficios dentro del plazo que indica el expediente.',
        ],
        href: '/patentes/como-registrar',
        cta: 'Leer cómo registrar una patente',
      },
      {
        icon: ListOrdered,
        title: 'Etapas',
        description:
          'El trámite tiene cinco etapas: presentación, forma, publicación, peritaje y registro.',
        bullets: [
          'Presentación y examen de forma.',
          'Publicación y plazo de oposición.',
          'Peritaje, resolución y registro.',
        ],
        href: '/patentes/como-registrar',
        cta: 'Ver las etapas de la patente',
      },
      {
        icon: AlertTriangle,
        title: 'Avisos',
        description:
          'Si el invento ya se divulgó, puede no ser patentable. Un rechazo se puede apelar.',
        bullets: [
          'El invento debe ser nuevo en cualquier parte del mundo.',
          'El rechazo se puede apelar en 15 días hábiles.',
          'La vigencia máxima es de 20 años desde la presentación.',
          'Un atraso en responder un oficio puede cerrar el expediente.',
        ],
        href: '/tramites/patentes/buscador',
        cta: 'Buscador de patentes',
      },
      {
        icon: Wrench,
        title: 'Herramientas',
        description:
          'Consulta bases de datos y el Tratado de Cooperación en materia de Patentes (PCT) antes de presentar.',
        bullets: [
          'Buscador de patentes.',
          'Notificaciones INAPI de patentes.',
          'Información del Tratado PCT.',
        ],
        href: '/tramites/patentes/buscador',
        cta: 'Abrir herramientas de patentes',
      },
      {
        icon: FileCheck,
        title: 'Requisitos',
        description:
          'El invento y la solicitud deben cumplir tres condiciones de fondo y los antecedentes técnicos del trámite.',
        bullets: [
          'Ser nuevo en cualquier parte del mundo, tener nivel inventivo y poder usarse en la industria.',
          'Una memoria técnica que explique el invento de forma clara.',
          'Que presente la solicitud el inventor o quien tenga los derechos sobre el invento.',
          'ClaveÚnica o clave INAPI, y el pago de 1 UTM al presentar.',
        ],
        href: '/patentes/como-registrar',
        cta: 'Leer los requisitos de una patente',
      },
    ],
  },
  {
    id: 'disenos',
    label: 'Diseños industriales',
    icon: Palette,
    intro:
      'Un diseño industrial es toda forma tridimensional, artículo industrial o artesanal que sirve como patrón para fabricar otras unidades y que posee una apariencia visual especial y nueva.',
    href: '/tramites/patentes/solicitar-diseno',
    cta: 'Ir a solicitar un diseño',
    cards: [
      {
        icon: Banknote,
        title: 'Pagos',
        description:
          'Pagas una tasa al presentar y un pago posterior si se concede el derecho. Los valores están en UTM.',
        bullets: [
          'Tasa de presentación en UTM.',
          'Pago posterior si se concede el registro.',
          'Confirma el valor vigente en el Sitio de Trámites.',
        ],
        href: '/tramites/patentes/solicitar-diseno',
        cta: 'Ver cómo pagar el diseño',
      },
      {
        icon: ClipboardList,
        title: 'Proceso',
        description:
          'Presentas la solicitud con imágenes claras del producto. INAPI revisa, publica y resuelve.',
        bullets: [
          'Prepara vistas o dibujos que muestren la apariencia.',
          'Presenta en línea con ClaveÚnica.',
          'Sigue oficios y plazos en el expediente digital.',
        ],
        href: '/tramites/patentes/solicitar-diseno',
        cta: 'Leer el proceso del diseño',
      },
      {
        icon: ListOrdered,
        title: 'Etapas',
        description: 'El diseño sigue presentación, forma, publicación, oposición y registro.',
        bullets: [
          'Presentas la solicitud con imágenes del diseño.',
          'INAPI revisa forma, publica y abre oposición.',
          'Si se aprueba, obtienes el registro del diseño.',
        ],
        href: '/tramites/patentes/solicitar-diseno',
        cta: 'Ver las etapas del diseño',
      },
      {
        icon: AlertTriangle,
        title: 'Avisos',
        description:
          'El diseño debe ser nuevo y original. No cubre cómo funciona el producto, solo cómo se ve.',
        bullets: [
          'El diseño debe ser nuevo y original.',
          'No protege la función técnica del producto.',
          'Un atraso en responder un oficio puede cerrar el expediente.',
        ],
        href: '/tramites/patentes/buscador',
        cta: 'Buscar diseños anteriores',
      },
      {
        icon: Wrench,
        title: 'Herramientas',
        description:
          'Usa el buscador de diseños y patentes y la solicitud en línea del Sitio de Trámites.',
        bullets: [
          'Buscador de diseños y patentes.',
          'Solicitud en línea en el Sitio de Trámites.',
          'Ficha de patentes para el marco legal.',
        ],
        href: '/tramites/patentes/buscador',
        cta: 'Abrir herramientas de diseños',
      },
      {
        icon: FileCheck,
        title: 'Requisitos',
        description:
          'El diseño protege cómo se ve el producto, no cómo funciona. Debe verse nuevo y original, y mostrarse con imágenes claras.',
        bullets: [
          'Una apariencia visual nueva y original, distinta de lo ya conocido.',
          'Vistas o dibujos que muestren la forma del producto con claridad.',
          'No cubre la función técnica ni el modo de fabricación.',
          'ClaveÚnica para presentar en línea y el pago de la tasa de presentación.',
        ],
        href: '/tramites/patentes/solicitar-diseno',
        cta: 'Leer los requisitos del diseño',
      },
    ],
  },
  {
    id: 'origen',
    label: 'Indicaciones geográficas',
    icon: Globe,
    intro:
      'El Sello de Origen identifica un producto por su origen y tradición. Cubre indicación geográfica, denominación de origen y marcas colectivas o de certificación.',
    href: '/sello-de-origen',
    cta: 'Ir al Sello de Origen',
    cards: [
      {
        icon: Banknote,
        title: 'Pagos',
        description:
          'El registro de estos signos paga un derecho equivalente a 3 UTM.',
        bullets: [
          'El registro paga 3 UTM.',
          'Aplica a indicación geográfica o denominación de origen.',
          'También cubre marcas colectivas y de certificación.',
        ],
        href: '/sello-de-origen',
        cta: 'Revisar el costo del sello',
      },
      {
        icon: ClipboardList,
        title: 'Proceso',
        description:
          'El trámite involucra a más de un organismo. Preparas el expediente y lo ingresas en INAPI.',
        bullets: [
          'Prepara antecedentes de origen, tradición y productores.',
          'Ingresa la solicitud en INAPI.',
          'Hay informe sectorial antes de la publicación.',
        ],
        href: '/sello-de-origen',
        cta: 'Leer el proceso del sello',
      },
      {
        icon: ListOrdered,
        title: 'Etapas',
        description:
          'El sello pasa por ingreso, informe, publicación, oposición, examen de fondo y resolución.',
        bullets: [
          'Preparas e ingresas la solicitud en INAPI.',
          'Hay informe sectorial, publicación y oposición.',
          'El examen de fondo termina en una resolución.',
        ],
        href: '/sello-de-origen',
        cta: 'Ver las etapas del sello',
      },
      {
        icon: AlertTriangle,
        title: 'Avisos',
        description:
          'El sello reconoce un producto ligado a un territorio, no un logo comercial de una empresa.',
        bullets: [
          'El trámite involucra a más de un organismo.',
          'Una oposición comunitaria puede alargar el plazo.',
          'El sello reconoce un producto, no un logo comercial.',
        ],
        href: '/sello-de-origen',
        cta: 'Leer avisos del sello',
      },
      {
        icon: Bell,
        title: 'Herramientas',
        description:
          'Consulta productos reconocidos y escribe a atención ciudadana si tienes un expediente en curso.',
        bullets: [
          'Ficha del Sello de Origen.',
          'Listado de productos reconocidos.',
          'Atención ciudadana para el expediente.',
        ],
        href: '/sello-de-origen',
        cta: 'Abrir el Sello de Origen',
      },
      {
        icon: FileCheck,
        title: 'Requisitos',
        description:
          'El sello reconoce un producto ligado a un territorio, una tradición y una comunidad productora, no un logo comercial.',
        bullets: [
          'Antecedentes de origen, tradición y de quienes producen el bien.',
          'Un producto singular ligado a un lugar de Chile, no un signo de una sola empresa.',
          'Definir el tipo de sello: indicación geográfica, denominación de origen, marca colectiva o de certificación.',
          'Pagar 3 UTM e ingresar el expediente en INAPI, que pide informe sectorial.',
        ],
        href: '/sello-de-origen',
        cta: 'Leer los requisitos del sello',
      },
    ],
  },
]

function TabPanel({ tab }: { tab: Tab }) {
  const { tx } = useI18n()
  const Icon = tab.icon
  const linkClass =
    'inline-flex min-h-11 items-center gap-gob-2 text-gri-body-sm font-medium text-white underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus'
  return (
    <div className="grid items-start gap-gob-5 min-[1100px]:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
      <article className="story-night relative overflow-hidden rounded-gob-xl p-gob-6 shadow-elevation-04 min-[1100px]:sticky min-[1100px]:top-32">
        <GuillocheBg className="text-white opacity-50" />
        <div className="relative flex flex-col gap-gob-4">
          <span aria-hidden className="inline-flex size-12 items-center justify-center rounded-gob-md bg-white/12 text-white">
            <Icon className="size-6" />
          </span>
          <h3 className="font-heading text-[1.5rem] font-medium leading-[1.3] text-white">{tx(tab.label)}</h3>
          <p className="text-gri-body leading-[1.6] text-white/85">{tx(tab.intro)}</p>
          <div className="mt-gob-2 flex flex-col items-start gap-gob-1">
            <StoryCta href={tab.href} label={tx(tab.cta)} tone="night" />
            {tab.guide ? (
              <a
                href={tab.guide.href}
                download
                className={linkClass}
                onClick={() => notifyDownload(tab.guide?.label ?? 'guía')}
              >
                <Download className="size-4" aria-hidden />
                {tx(tab.guide.label)}
              </a>
            ) : null}
            {tab.notifications ? (
              <TramitesLink href={tab.notifications.href} className={linkClass}>
                <Bell className="size-4" aria-hidden />
                {tx(tab.notifications.label)}
              </TramitesLink>
            ) : null}
          </div>
        </div>
      </article>
      <SectionAccordion
        defaultOpen={[]}
        items={orderedCards(tab.cards).map(card => {
          const CardIcon = card.icon
          return {
            id: `${tab.id}-${card.title}`,
            title: tx(card.title),
            summary: tx(card.description),
            icon: <CardIcon />,
            content: (
              <>
                <ul>
                  {card.bullets.map(bullet => (
                    <li key={bullet}>{tx(bullet)}</li>
                  ))}
                </ul>
                <p className="mt-gob-3">
                  <TramitesLink href={card.href}>{tx(card.cta)}</TramitesLink>
                </p>
              </>
            ),
          }
        })}
      />
    </div>
  )
}

export function WhatToProtect() {
  const { tx } = useI18n()
  return (
    <StorySection
      id="que-proteger"
      tone="mist"
      eyebrow="Qué proteger"
      dot="primary"
      title={tx('¿Qué tipo de propiedad industrial te interesa?')}
      lead={
        <>
          {tx('Elige una pestaña y abre solo lo que necesitas: requisitos, proceso, etapas, pagos, avisos y herramientas.')}{' '}
          <Link href="/que-proteger" className="font-medium text-gob-link underline underline-offset-4">
            {tx('No sé qué tipo de protección necesito')}
          </Link>
        </>
      }
    >
      <SectionTabs
        label={tx('Tipo de protección')}
        tabs={tabs.map(tab => {
          const Icon = tab.icon
          return { id: tab.id, label: tx(tab.label), icon: <Icon />, content: <TabPanel tab={tab} /> }
        })}
      />
    </StorySection>
  )
}

