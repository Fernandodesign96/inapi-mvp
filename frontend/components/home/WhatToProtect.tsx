'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  AlertTriangle,
  Banknote,
  Bell,
  ClipboardList,
  FileCheck,
  Globe,
  Lightbulb,
  ListOrdered,
  Palette,
  Stamp,
  Wrench,
} from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { notifyDownload } from '@/components/tramites/DownloadToast'
import { cn } from '@/lib/utils'

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
      href: '/tramites/marcas/estados-diarios',
      label: 'Notificaciones diarias de marcas',
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
          'El registro tiene tres etapas. Si no hay oposiciones, suele tardar entre 6 y 8 meses.',
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
          'Una oposición alarga el plazo habitual de 6 a 8 meses.',
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
      href: '/tramites/patentes/estados-diarios',
      label: 'Notificaciones diarias de patentes',
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
        cta: 'Buscar patentes existentes',
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

export function WhatToProtect() {
  const [active, setActive] = useState(tabs[0].id)
  const current = tabs.find(tab => tab.id === active) ?? tabs[0]

  return (
    <section id="que-proteger" aria-labelledby="que-proteger-title" className="bg-card pb-gob-8 pt-gob-8 min-[905px]:py-gob-8">
      <ContainerGRI size="wide" className="space-y-gob-7">
        <div className="mx-auto max-w-4xl space-y-gob-4 text-center">
          <h2 id="que-proteger-title" className="portal-h2 text-gob-text">
            ¿Qué tipo de propiedad intelectual te interesa?
          </h2>
          <p className="portal-lead !text-center text-muted-foreground">
            Elige una pestaña. Ves pagos, proceso, etapas, avisos, herramientas y requisitos de ese derecho.
          </p>
        </div>

        <div role="tablist" aria-label="Tipo de protección" className="flex flex-wrap justify-center gap-gob-3">
          {tabs.map(tab => {
            const Icon = tab.icon
            const selected = tab.id === current.id
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={selected}
                id={`tab-${tab.id}`}
                aria-controls={`panel-${tab.id}`}
                className={cn(
                  'inline-flex min-h-14 items-center gap-gob-3 rounded-gob-lg border px-gob-5 py-gob-3 text-gri-h2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  selected
                    ? 'border-gob-primary bg-gob-primary text-gob-text-inverse shadow-elevation-03'
                    : 'border-gob-border bg-background text-gob-text hover:border-gob-primary',
                )}
                onClick={() => setActive(tab.id)}
              >
                <Icon className="size-6" aria-hidden />
                {tab.label}
              </button>
            )
          })}
        </div>

        <div
          role="tabpanel"
          id={`panel-${current.id}`}
          aria-labelledby={`tab-${current.id}`}
          className="space-y-gob-6"
        >
          <p className="text-gri-body leading-[1.5] text-gob-text">{current.intro}</p>
          <div className="grid gap-gob-5 min-[700px]:grid-cols-2 min-[1280px]:grid-cols-3">
            {orderedCards(current.cards).map(card => {
              const Icon = card.icon
              return (
                <article
                  key={card.title}
                  className="portal-card-motion flex flex-col rounded-gob-lg border border-gob-border bg-background p-gob-5 text-left shadow-elevation-02"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg text-gob-primary">
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <h3 className="mt-gob-4 font-heading text-gri-h2 font-medium text-gob-text">{card.title}</h3>
                  <p className="mt-gob-2 text-gri-body-sm leading-[1.5] text-gob-text">{card.description}</p>
                  <ul className="mt-gob-3 flex-1 list-disc space-y-gob-2 pl-gob-5 text-gri-body-sm leading-[1.5] text-gob-text">
                    {card.bullets.map(bullet => (
                      <li key={bullet}>{bullet}</li>
                    ))}
                  </ul>
                  <Link
                    href={card.href}
                    className="mt-gob-4 inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    {card.cta}
                  </Link>
                </article>
              )
            })}
          </div>
          <div className="flex flex-wrap items-center gap-x-gob-6 gap-y-gob-2">
            <Link
              href={current.href}
              className="inline-flex min-h-11 items-center text-gri-body font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              {current.cta}
            </Link>
            {current.guide ? (
              <a
                href={current.guide.href}
                download
                className="inline-flex min-h-11 items-center text-gri-body font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                onClick={() => notifyDownload(current.guide?.label ?? 'guía')}
              >
                {current.guide.label}
              </a>
            ) : null}
            {current.notifications ? (
              <Link
                href={current.notifications.href}
                className="inline-flex min-h-11 items-center text-gri-body font-medium text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                {current.notifications.label}
              </Link>
            ) : null}
          </div>
        </div>
      </ContainerGRI>
    </section>
  )
}
