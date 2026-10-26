'use client'

import { useMemo, useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import { AlertBanner, ServicePanel, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { DEMO_NUMEROS } from '@/lib/tramites/catalogs'
import { ControlChip, ControlChipRow } from '@/components/tramites/TramitesExperience'
import { cn } from '@/lib/utils'

export type DeskKind = 'marca' | 'patente' | 'diseño' | 'modelo'
export type DeskField = { id: string; label: string; placeholder: string; tooltip?: string }

export type DeskResult = {
  id: string
  title: string
  procedure: string
  kind: DeskKind
  updated: string
  status: string
  stage: string
  summary: string
  details: { label: string; value: string }[]
}

type DeskConfig = {
  domain: 'marcas' | 'patentes'
  title: string
  description: string
  types: string[]
  fields: DeskField[]
  results: DeskResult[]
}

const KIND_LABEL: Record<DeskKind, string> = {
  marca: 'Marca',
  patente: 'Patente',
  diseño: 'Diseño',
  modelo: 'Modelo de utilidad',
}

export const MARCAS_TRAMITES_DESK: DeskConfig = {
  domain: 'marcas',
  title: 'Realiza otras solicitudes y presentaciones de marcas',
  description:
    'Consulta y continúa renovaciones, anotaciones, escritos, oposiciones, Madrid y custodia de poderes con un solo formulario. Completa al menos un dato identificador y revisa los expedientes relacionados.',
  types: [
    'Solicitar marca Sistema de Madrid',
    'Solicitar renovaciones',
    'Solicitar anotación de marcas',
    'Presentar escritos de marcas',
    'Presentar demanda de oposición',
    'Custodia de poderes y personerías',
  ],
  fields: [
    {
      id: 'solicitud',
      label: 'Número de solicitud',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.solicitudMarca}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.solicitudMarca}.`,
    },
    {
      id: 'registro',
      label: 'Número de registro',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.registroMarca}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.registroMarca}.`,
    },
    {
      id: 'signo',
      label: 'Nombre o signo de la marca',
      placeholder: 'Ejemplo: Andes Café',
    },
  ],
  results: [
    {
      id: 'm-ren',
      title: 'Renovación — Andes Café',
      procedure: 'Solicitar renovaciones',
      kind: 'marca',
      updated: '2026-10-08',
      status: 'Vigente',
      stage: 'Pago de renovación',
      summary: 'El registro vence el 12-03-2027. Puedes renovar ahora y pagar la tasa del nuevo decenio.',
      details: [
        { label: 'Número de registro', value: DEMO_NUMEROS.registroMarca },
        { label: 'Clases', value: '30, 43' },
        { label: 'Titular', value: 'Andes Café SpA' },
      ],
    },
    {
      id: 'm-anot',
      title: 'Anotación de transferencia',
      procedure: 'Solicitar anotación de marcas',
      kind: 'marca',
      updated: '2026-09-22',
      status: 'En trámite',
      stage: 'Examen de forma',
      summary: 'Cambio de titular pendiente de documentos de respaldo.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Tipo de anotación', value: 'Transferencia' },
      ],
    },
    {
      id: 'm-esc',
      title: 'Escrito de respuesta a oficio',
      procedure: 'Presentar escritos de marcas',
      kind: 'marca',
      updated: '2026-08-14',
      status: 'Notificado',
      stage: 'Plazo de 30 días',
      summary: 'Hay un oficio de forma. Adjunta el escrito y los anexos en este expediente.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Oficio', value: 'OF-2026-4412' },
      ],
    },
    {
      id: 'm-opo',
      title: 'Oposición a solicitud publicada',
      procedure: 'Presentar demanda de oposición',
      kind: 'marca',
      updated: '2026-07-30',
      status: 'Publicada',
      stage: 'Plazo de oposición',
      summary: 'La solicitud 1388221 “Andes Koffee” está en publicación. Puedes oponerte con tu marca anterior.',
      details: [
        { label: 'Solicitud impugnada', value: '1388221' },
        { label: 'Diario Oficial', value: '04-07-2026' },
      ],
    },
    {
      id: 'm-mad',
      title: 'Extensión Sistema de Madrid',
      procedure: 'Solicitar marca Sistema de Madrid',
      kind: 'marca',
      updated: '2026-06-18',
      status: 'Registrada',
      stage: 'Oficina de origen',
      summary: 'Marca base chilena lista para designar países en Madrid e-filing.',
      details: [
        { label: 'Número de registro', value: DEMO_NUMEROS.registroMarca },
        { label: 'Países sugeridos', value: 'Perú, Colombia' },
      ],
    },
    {
      id: 'm-pod',
      title: 'Poder en custodia',
      procedure: 'Custodia de poderes y personerías',
      kind: 'marca',
      updated: '2026-05-02',
      status: 'Custodiado',
      stage: 'Vigente',
      summary: 'El poder de Andes Café SpA ya está ingresado. Cítalo en los trámites siguientes sin volver a adjuntarlo.',
      details: [
        { label: 'Código de custodia', value: 'POD-2026-771' },
        { label: 'Representante', value: 'Marina Soto' },
      ],
    },
  ],
}

export const MARCAS_PAGOS_DESK: DeskConfig = {
  domain: 'marcas',
  title: 'Realiza todos tus pagos de marcas aquí',
  description:
    'Busca tasas de concesión, otros pagos en línea y el comprobante Formulario 10 con los mismos identificadores. El pago en el Diario Oficial se hace en el sitio externo de esa publicación.',
  types: [
    'Pagar tasa de concesión final marcas',
    'Otros pagos en línea marcas',
    'Comprobantes para pago marcas',
  ],
  fields: [
    {
      id: 'solicitud',
      label: 'Número de solicitud',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.solicitudMarca}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.solicitudMarca}.`,
    },
    {
      id: 'registro',
      label: 'Número de registro',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.registroMarca}`,
    },
    {
      id: 'anotacion',
      label: 'Número de anotación',
      placeholder: 'Ejemplo: A-2026-445',
    },
  ],
  results: [
    {
      id: 'mp-conc',
      title: 'Tasa de concesión final',
      procedure: 'Pagar tasa de concesión final marcas',
      kind: 'marca',
      updated: '2026-10-06',
      status: 'Pendiente de pago',
      stage: 'Concesión',
      summary: '2 UTM por clase. Plazo de 60 días desde la aceptación a registro.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Monto', value: '2 UTM × 2 clases' },
        { label: 'Medio', value: 'Tesorería (TGR)' },
      ],
    },
    {
      id: 'mp-otro',
      title: 'Pago complementario de solicitud',
      procedure: 'Otros pagos en línea marcas',
      kind: 'marca',
      updated: '2026-09-12',
      status: 'Observado',
      stage: 'Pago complementario',
      summary: 'Hay un saldo por clases adicionales. Completa el pago para que el trámite siga.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Concepto', value: 'Clase adicional' },
      ],
    },
    {
      id: 'mp-f10',
      title: 'Comprobante Formulario 10',
      procedure: 'Comprobantes para pago marcas',
      kind: 'marca',
      updated: '2026-09-12',
      status: 'Generado',
      stage: 'Pago en banco',
      summary: 'Usa este comprobante si pagas en banco. La información es la misma del pago en línea.',
      details: [
        { label: 'Formulario', value: 'F10 — Tesorería' },
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudMarca },
        { label: 'Código de barra', value: 'F10-2026-1000000' },
        { label: 'Monto CLP', value: '$136.450' },
      ],
    },
  ],
}

export const PATENTES_PAGOS_DESK: DeskConfig = {
  domain: 'patentes',
  title: 'Realiza todos tus pagos de patentes aquí',
  description:
    'Consulta presentación, arancel pericial, derechos finales, PCT, otros pagos y el comprobante Formulario 10 en un solo paso. El pago en el Diario Oficial sigue en el sitio externo.',
  types: [
    'Pagar tasa de presentación patentes',
    'Pagar arancel pericial',
    'Pagar derechos finales',
    'Pagar tasas PCT fase internacional',
    'Otros pagos en línea patentes',
    'Comprobantes para pago patentes',
  ],
  fields: [
    {
      id: 'solicitud',
      label: 'Número de solicitud',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.solicitudPatente}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.solicitudPatente}.`,
    },
    {
      id: 'pct',
      label: 'Número de solicitud internacional PCT',
      placeholder: `Ejemplo: ${DEMO_NUMEROS.pct}`,
      tooltip: `Prueba con ${DEMO_NUMEROS.pct}.`,
    },
    {
      id: 'registro',
      label: 'Número de registro',
      placeholder: 'Ejemplo: 61234',
    },
  ],
  results: [
    {
      id: 'pp-pres',
      title: 'Tasa de presentación',
      procedure: 'Pagar tasa de presentación patentes',
      kind: 'patente',
      updated: '2026-10-01',
      status: 'Pendiente de pago',
      stage: 'Presentación',
      summary: 'Puedes pagar ahora la tasa que postergaste al ingresar la solicitud.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Monto', value: '1 UTM' },
      ],
    },
    {
      id: 'pp-per',
      title: 'Arancel pericial',
      procedure: 'Pagar arancel pericial',
      kind: 'patente',
      updated: '2026-08-21',
      status: 'Requerido',
      stage: 'Peritaje',
      summary: 'INAPI requirió el arancel pericial para continuar el examen de fondo.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Perito', value: 'Designado' },
      ],
    },
    {
      id: 'pp-fin',
      title: 'Derechos finales / decenio',
      procedure: 'Pagar derechos finales',
      kind: 'patente',
      updated: '2026-07-09',
      status: 'Por vencer',
      stage: 'Mantenimiento',
      summary: 'Pago de derechos de vigencia del primer decenio.',
      details: [
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Periodo', value: 'Años 1 a 10' },
      ],
    },
    {
      id: 'pp-dis',
      title: 'Derechos de diseño industrial',
      procedure: 'Pagar derechos finales',
      kind: 'diseño',
      updated: '2026-06-02',
      status: 'Pendiente de pago',
      stage: 'Concesión',
      summary: 'Diseño industrial con quinquenio pendiente.',
      details: [
        { label: 'Número de solicitud', value: '201408901' },
        { label: 'Tipo', value: 'Diseño industrial' },
      ],
    },
    {
      id: 'pp-pct',
      title: 'Tasas PCT fase internacional',
      procedure: 'Pagar tasas PCT fase internacional',
      kind: 'patente',
      updated: '2026-05-19',
      status: 'En plazo',
      stage: 'Fase internacional',
      summary: 'Pago de tasas internacionales. También puedes usar PayPal, TEF o convenio BECB.',
      details: [
        { label: 'PCT', value: DEMO_NUMEROS.pct },
        { label: 'Oficina receptora', value: 'INAPI' },
      ],
    },
    {
      id: 'pp-otro',
      title: 'Otro pago en línea',
      procedure: 'Otros pagos en línea patentes',
      kind: 'modelo',
      updated: '2026-04-11',
      status: 'Observado',
      stage: 'Pago complementario',
      summary: 'Saldo asociado a un modelo de utilidad.',
      details: [
        { label: 'Número de solicitud', value: '201399001' },
        { label: 'Tipo', value: 'Modelo de utilidad' },
      ],
    },
    {
      id: 'pp-f10',
      title: 'Comprobante Formulario 10',
      procedure: 'Comprobantes para pago patentes',
      kind: 'patente',
      updated: '2026-10-01',
      status: 'Generado',
      stage: 'Pago en banco',
      summary: 'Misma información del pago en Tesorería, para pagar en banco con Formulario 10.',
      details: [
        { label: 'Formulario', value: 'F10 — Tesorería' },
        { label: 'Número de solicitud', value: DEMO_NUMEROS.solicitudPatente },
        { label: 'Código de barra', value: 'F10-2026-201401234' },
        { label: 'Monto CLP', value: '$68.225' },
      ],
    },
  ],
}

function ResultCard({ item }: { item: DeskResult }) {
  const { tx } = useI18n()
  const [open, setOpen] = useState(false)
  return (
    <article className="overflow-hidden rounded-gob-lg border border-gob-border bg-card">
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
        className="flex w-full min-h-14 items-start gap-gob-3 px-gob-4 py-gob-3 text-left hover:bg-gob-surface-elevated/70 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
      >
        <span className="flex-1 space-y-1">
          <span className="block font-heading text-gri-body font-medium text-gob-text">{tx(item.title)}</span>
          <span className="block text-gri-body-xs text-gob-text/80">
            {tx(item.procedure)} · {tx(KIND_LABEL[item.kind])} · {tx(item.status)} · {item.updated}
          </span>
        </span>
        <ChevronDown className={cn('mt-1 size-5 shrink-0 text-gob-text/70 transition-transform', open && 'rotate-180')} />
      </button>
      {open ? (
        <div className="space-y-gob-3 border-t border-gob-border bg-gob-surface-elevated/40 px-gob-4 py-gob-4">
          <p className="text-gri-body-sm leading-relaxed text-gob-text">{tx(item.summary)}</p>
          <p className="text-gri-body-xs font-medium text-gob-text">
            {tx('Etapa')}: {tx(item.stage)}
          </p>
          <dl className="grid gap-gob-2 min-[600px]:grid-cols-2">
            {item.details.map(row => (
              <div key={row.label} className="rounded-gob-md border border-gob-border bg-card px-gob-3 py-gob-2">
                <dt className="text-gri-body-xs text-muted-foreground">{tx(row.label)}</dt>
                <dd className="text-gri-body-sm font-medium text-gob-text">{row.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      ) : null}
    </article>
  )
}

export function UnifiedDeskScreen({ config }: { config: DeskConfig }) {
  const { tx } = useI18n()
  const [values, setValues] = useState<Record<string, string>>({})
  const [searched, setSearched] = useState(false)
  const [procedure, setProcedure] = useState('todas')
  const [kind, setKind] = useState('todas')
  const [status, setStatus] = useState('todas')
  const [stage, setStage] = useState('todas')
  const [order, setOrder] = useState<'reciente' | 'antigua'>('reciente')

  const kinds = useMemo(() => [...new Set(config.results.map(r => r.kind))], [config.results])
  const statuses = useMemo(() => [...new Set(config.results.map(r => r.status))], [config.results])
  const stages = useMemo(() => [...new Set(config.results.map(r => r.stage))], [config.results])

  const visible = useMemo(() => {
    if (!searched) return []
    let rows = [...config.results]
    if (procedure !== 'todas') rows = rows.filter(r => r.procedure === procedure)
    if (kind !== 'todas') rows = rows.filter(r => r.kind === kind)
    if (status !== 'todas') rows = rows.filter(r => r.status === status)
    if (stage !== 'todas') rows = rows.filter(r => r.stage === stage)
    rows.sort((a, b) =>
      order === 'reciente' ? b.updated.localeCompare(a.updated) : a.updated.localeCompare(b.updated),
    )
    return rows
  }, [config.results, searched, procedure, kind, status, stage, order])

  const canSearch = config.fields.some(field => (values[field.id] ?? '').trim())

  return (
    <RequireAuth>
      <TramitesMain>
        <ServicePanel title={tx(config.title)} domain={config.domain}>
          <p className="text-gri-body leading-relaxed text-gob-text">{tx(config.description)}</p>
          <ControlChipRow label={tx('Trámites de este escritorio')}>
            {config.types.map(type => (
              <ControlChip
                key={type}
                pressed={procedure === type}
                onClick={() => {
                  setProcedure(type)
                  setSearched(true)
                }}
              >
                {tx(type)}
              </ControlChip>
            ))}
          </ControlChipRow>
          <form
            className="grid gap-gob-4 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3"
            onSubmit={e => {
              e.preventDefault()
              if (canSearch) setSearched(true)
            }}
          >
            {config.fields.map(field => (
              <div key={field.id} className="space-y-gob-2">
                <label htmlFor={field.id} className="flex items-center text-gri-body-sm font-medium text-gob-text">
                  {tx(field.label)}
                  {field.tooltip ? <HelpTooltip text={field.tooltip} /> : null}
                </label>
                <Input
                  id={field.id}
                  value={values[field.id] ?? ''}
                  placeholder={tx(field.placeholder)}
                  onChange={e => setValues(prev => ({ ...prev, [field.id]: e.target.value }))}
                  className="h-11"
                />
              </div>
            ))}
            <div className="flex flex-wrap items-end gap-gob-3 min-[600px]:col-span-2 min-[905px]:col-span-3">
              <Button type="submit" size="form" disabled={!canSearch}>
                {tx('Buscar')}
              </Button>
              <Button
                type="button"
                size="form"
                variant="secondary"
                onClick={() => {
                  setValues({})
                  setSearched(false)
                }}
              >
                {tx('Limpiar')}
              </Button>
            </div>
          </form>
        </ServicePanel>

        {searched ? (
          <>
            <FilterPanel title={tx('Filtros')}>
              <Field id="f-proc" label={tx('Tipo de trámite')}>
                <select id="f-proc" className={selectClass()} value={procedure} onChange={e => setProcedure(e.target.value)}>
                  <option value="todas">{tx('Todos')}</option>
                  {config.types.map(type => (
                    <option key={type} value={type}>
                      {tx(type)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-kind" label={tx('Derecho')}>
                <select id="f-kind" className={selectClass()} value={kind} onChange={e => setKind(e.target.value)}>
                  <option value="todas">{tx('Todos')}</option>
                  {kinds.map(item => (
                    <option key={item} value={item}>
                      {tx(KIND_LABEL[item])}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-status" label={tx('Estado del trámite')}>
                <select id="f-status" className={selectClass()} value={status} onChange={e => setStatus(e.target.value)}>
                  <option value="todas">{tx('Todos')}</option>
                  {statuses.map(item => (
                    <option key={item} value={item}>
                      {tx(item)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-stage" label={tx('Etapa del trámite')}>
                <select id="f-stage" className={selectClass()} value={stage} onChange={e => setStage(e.target.value)}>
                  <option value="todas">{tx('Todas')}</option>
                  {stages.map(item => (
                    <option key={item} value={item}>
                      {tx(item)}
                    </option>
                  ))}
                </select>
              </Field>
              <Field id="f-order" label={tx('Fecha de actualización')}>
                <select
                  id="f-order"
                  className={selectClass()}
                  value={order}
                  onChange={e => setOrder(e.target.value as 'reciente' | 'antigua')}
                >
                  <option value="reciente">{tx('Más reciente')}</option>
                  <option value="antigua">{tx('Más antigua')}</option>
                </select>
              </Field>
            </FilterPanel>

            {visible.length === 0 ? (
              <AlertBanner>{tx('No hay trámites que coincidan con los filtros.')}</AlertBanner>
            ) : (
              <div className="space-y-gob-3">
                <p className="text-gri-body-sm text-muted-foreground">
                  {visible.length} {tx(visible.length === 1 ? 'resultado' : 'resultados')}
                </p>
                {visible.map(item => (
                  <ResultCard key={item.id} item={item} />
                ))}
              </div>
            )}
          </>
        ) : null}
      </TramitesMain>
    </RequireAuth>
  )
}
