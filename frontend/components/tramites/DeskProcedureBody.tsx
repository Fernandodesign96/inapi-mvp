'use client'

import { useState } from 'react'
import { FileText, Globe, Landmark, Scale, Stamp, UserRound } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { CompactGuideTimeline } from '@/components/story/JourneyRail'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { HelpTypesDialog } from '@/components/tramites/part2-forms'
import { PoderesForm } from '@/components/tramites/poderes-screen'
import { AlertBanner, selectClass } from '@/components/tramites/ui-helpers'
import {
  ANOTACIONES_MARCA,
  ANOTACIONES_PATENTE,
  DESTINOS_ESCRITO_MARCA,
  DESTINOS_ESCRITO_PATENTE,
  URLS_EXTERNAS,
} from '@/lib/tramites/catalogs'
import { LEGAL_OPOSICION } from '@/lib/tramites/legal'

export type DeskPanel = 'anotacion' | 'renovacion' | 'escritos' | 'oposicion' | 'poderes' | 'madrid'

const ICONS = {
  anotacion: Stamp,
  renovacion: Landmark,
  escritos: FileText,
  oposicion: Scale,
  poderes: UserRound,
  madrid: Globe,
}

export function MiniActionCards({
  items,
}: {
  items: { title: string; body: string }[]
}) {
  return (
    <ul className="grid gap-gob-3 min-[600px]:grid-cols-2">
      {items.map(item => (
        <li key={item.title} className="rounded-gob-lg border border-gob-border bg-card p-gob-4">
          <p className="font-heading text-gri-body-sm font-semibold text-gob-text">{item.title}</p>
          <p className="mt-1 text-gri-body-sm leading-[1.5] text-gob-text/80">{item.body}</p>
        </li>
      ))}
    </ul>
  )
}

export function DeskProcedureBody({
  panel,
  domain,
  unlocked,
  guideSteps,
  actions,
}: {
  panel?: DeskPanel
  domain: 'marcas' | 'patentes'
  unlocked: boolean
  guideSteps?: string[]
  actions?: { title: string; body: string }[]
}) {
  if (!panel) {
    return (
      <div className="space-y-gob-4">
        {actions?.length ? <MiniActionCards items={actions} /> : null}
        {guideSteps?.length ? <CompactGuideTimeline steps={guideSteps} /> : null}
      </div>
    )
  }

  return (
    <div className="space-y-gob-5">
      {actions?.length ? <MiniActionCards items={actions} /> : null}
      {guideSteps?.length ? <CompactGuideTimeline steps={guideSteps} /> : null}
      {unlocked ? <PanelForm panel={panel} domain={domain} /> : (
        <AlertBanner>
          Completa al menos un identificador y pulsa Buscar para continuar con este trámite. Los mismos datos sirven para las otras pestañas de esta sección.
        </AlertBanner>
      )}
    </div>
  )
}

function PanelForm({ panel, domain }: { panel: DeskPanel; domain: 'marcas' | 'patentes' }) {
  const Icon = ICONS[panel]
  if (panel === 'poderes') return <PoderesForm compact />
  if (panel === 'madrid') {
    return (
      <article className="space-y-gob-4 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5">
        <p className="flex items-center gap-gob-2 font-heading text-gri-body font-medium text-gob-text">
          <Globe className="size-5 text-gob-primary-dark" aria-hidden />
          Sistema de Madrid (e-filing)
        </p>
        <p className="text-gri-body-sm leading-[1.55] text-gob-text/80">
          El Sistema de Madrid permite pedir protección de tu marca chilena en otros países miembros con una sola gestión. INAPI actúa como oficina de origen: revisas la marca base, eliges países y pagas las tasas de la OMPI en el sitio Madrid e-filing, que es distinto a este portal.
        </p>
        <ul className="list-disc space-y-gob-2 pl-gob-5 text-gri-body-sm text-gob-text">
          <li>Designar países o territorios del Arrangement y el Protocolo de Madrid.</li>
          <li>Pagar tasas internacionales en francos suizos y la tarifa de oficina de origen.</li>
          <li>Seguir el expediente internacional en Madrid Monitor, no en esta pantalla.</li>
        </ul>
        <Button asChild size="form">
          <a href={URLS_EXTERNAS.madrid} rel="noopener noreferrer" target="_blank">
            Abrir Madrid e-filing de INAPI
          </a>
        </Button>
        <p className="text-gri-body-xs text-muted-foreground">
          Se abre en otra pestaña. Este portal no comparte tu sesión con Madrid e-filing.
        </p>
      </article>
    )
  }
  if (panel === 'anotacion') {
    return <AnnotationPanel domain={domain} />
  }
  if (panel === 'renovacion') {
    return (
      <article className="space-y-gob-3 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5">
        <p className="flex items-center gap-gob-2 font-heading text-gri-body font-medium">
          <Icon className="size-5 text-gob-primary-dark" aria-hidden />
          Número de registro de la marca a renovar
          <HelpTooltip
            quiet
            title="Plazo de renovación"
            text="Ingresa el número de registro vigente. Puedes pedir la renovación desde 6 meses antes del vencimiento del registro y hasta 6 meses después de ese vencimiento."
            example="Un registro que vence el 12-03-2027 se puede renovar desde septiembre de 2026."
            action="Escribe el número de registro en el identificador de arriba, pulsa Buscar y continúa al pago de la tasa."
          />
        </p>
        <p className="text-gri-body-sm text-gob-text/80">
          La tasa cubre diez años más. Si el registro tiene varias clases, el monto se calcula por cada clase que mantengas.
        </p>
        <Button size="form">Continuar a la renovación</Button>
      </article>
    )
  }
  if (panel === 'escritos') {
    const destinos = domain === 'marcas' ? DESTINOS_ESCRITO_MARCA : DESTINOS_ESCRITO_PATENTE
    return (
      <article className="space-y-gob-3 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5">
        <label htmlFor="escrito-a" className="flex items-center gap-1.5 text-gri-body-sm font-medium">
          Presentar escrito a
          <HelpTooltip
            quiet
            text="Elige el tipo de expediente al que va el escrito: solicitud, anotación, juicio u otro proceso abierto."
          />
        </label>
        <select id="escrito-a" className={selectClass()}>
          <option value="">Seleccione...</option>
          {destinos.map(item => (
            <option key={item}>{item}</option>
          ))}
        </select>
        <p className="text-gri-body-sm text-gob-text/80">
          {domain === 'marcas'
            ? 'Si lo requieres, puedes descargar ejemplos tipo de escritos para marcas desde Formularios de marcas.'
            : 'Si lo requieres, puedes descargar ejemplos tipo de escritos para patentes desde Formularios de patentes.'}
        </p>
        <Button size="form">Continuar</Button>
      </article>
    )
  }
  return (
    <article className="space-y-gob-3 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5">
      <AlertBanner>{LEGAL_OPOSICION}</AlertBanner>
      <p className="text-gri-body-sm text-gob-text/80">
        Ingresa el número de documento de la marca a la que requieres presentar un escrito de oposición. El plazo es el de la publicación en el Diario Oficial.
      </p>
      <Button size="form">Buscar solicitud publicada</Button>
    </article>
  )
}

function AnnotationPanel({ domain }: { domain: 'marcas' | 'patentes' }) {
  const items = domain === 'marcas' ? ANOTACIONES_MARCA : ANOTACIONES_PATENTE
  const [tipo, setTipo] = useState('')
  const [help, setHelp] = useState(false)
  return (
    <article className="space-y-gob-4 rounded-gob-lg border-2 border-gob-border bg-card p-gob-5">
      <label htmlFor="tipo-anot" className="flex items-center gap-1.5 text-gri-body-sm font-medium">
        Tipo de anotación
        <HelpTooltip quiet text="Abre la explicación de cada tipo de anotación que usa INAPI." label="Tipos de anotaciones" />
        <button type="button" className="text-gob-link text-gri-body-sm underline" onClick={() => setHelp(true)}>
          Ver tipos
        </button>
      </label>
      <select id="tipo-anot" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
        <option value="">Seleccione...</option>
        {items.map(item => (
          <option key={item.id} value={item.id}>
            {item.label}
          </option>
        ))}
      </select>
      {tipo ? (
        <p className="text-gri-body-sm leading-[1.55] text-gob-text/80">{items.find(i => i.id === tipo)?.help}</p>
      ) : null}
      <Button size="form" disabled={!tipo}>
        Continuar
      </Button>
      <HelpTypesDialog open={help} onClose={() => setHelp(false)} items={items} />
    </article>
  )
}
