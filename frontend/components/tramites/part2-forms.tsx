'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { EmptyState, ServicePanel, selectClass, AlertBanner } from '@/components/tramites/ui-helpers'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import type { BorradorGuardado } from '@/lib/tramites/catalogs'
import { cn } from '@/lib/utils'

export function SiteMessage({
  open,
  onClose,
  title = 'Mensaje del sitio',
  children,
}: {
  open: boolean
  onClose: () => void
  title?: string
  children: React.ReactNode
}) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="sm:max-w-md rounded-gob-lg">
        <DialogHeader>
          <DialogTitle className="font-heading text-xl">{title}</DialogTitle>
          <DialogDescription className="text-gri-body text-gob-text pt-gob-2">{children}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button size="form" onClick={onClose}>
            OK
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export function LookupForm({
  domain,
  title,
  description,
  label,
  tooltip,
  placeholder,
  demoValue,
  errorMessage,
  onValid,
  extra,
}: {
  domain: 'marcas' | 'patentes'
  title: string
  description?: React.ReactNode
  label: string
  tooltip?: string
  placeholder?: string
  demoValue?: string
  errorMessage: string
  onValid?: (value: string) => void
  extra?: React.ReactNode
}) {
  const [value, setValue] = useState('')
  const [error, setError] = useState(false)

  const buscar = () => {
    const v = value.trim()
    if (demoValue && v === demoValue) {
      onValid?.(v)
      setError(false)
      return
    }
    setError(true)
  }

  return (
    <ServicePanel title={title} domain={domain}>
      {description && <div className="text-gri-body text-gob-text leading-relaxed">{description}</div>}
      <div className="max-w-xl space-y-gob-2">
        <label htmlFor="lookup" className="flex items-center text-gri-body-sm font-medium text-gob-text">
          {label}
          {tooltip && <HelpTooltip text={tooltip} />}
        </label>
        <Input
          id="lookup"
          value={value}
          placeholder={placeholder}
          onChange={e => setValue(e.target.value)}
          className="h-11"
        />
      </div>
      {extra}
      <div className="flex flex-wrap gap-gob-3">
        <Button size="form" onClick={buscar} disabled={!value.trim()}>
          Buscar
        </Button>
        <Button
          size="form"
          variant="secondary"
          onClick={() => {
            setValue('')
            setError(false)
          }}
        >
          Limpiar
        </Button>
      </div>
      <SiteMessage open={error} onClose={() => setError(false)}>
        {errorMessage}
      </SiteMessage>
    </ServicePanel>
  )
}

export function SavedListScreen({
  domain,
  panelTitle,
  createHref,
  createLabel,
  emptyText,
  rows,
  headers,
  showFilters,
}: {
  domain: 'marcas' | 'patentes'
  panelTitle: string
  createHref: string
  createLabel: string
  emptyText: string
  rows: BorradorGuardado[]
  headers: string[]
  showFilters?: 'anotacion' | 'solicitud' | 'escrito'
}) {
  const [estado, setEstado] = useState('')

  const filtered = estado && estado !== 'Todos' ? rows.filter(r => r.estado === estado) : rows

  return (
    <ServicePanel title={panelTitle} domain={domain}>
      <div className="flex flex-col gap-gob-4 min-[905px]:flex-row min-[905px]:items-start">
        <div className="flex-1 space-y-gob-4">
          {showFilters === 'anotacion' && (
            <FilterPanel title="Filtros de búsqueda" defaultOpen>
              <Field id="nat" label="N° de Atención">
                <Input id="nat" className="h-11" />
              </Field>
              <Field id="nreg" label={domain === 'marcas' ? 'N° de Registro de Marca' : 'N° de Registro de Patente'}>
                <Input id="nreg" className="h-11" />
              </Field>
              <Field id="nano" label="N° de Anotación">
                <Input id="nano" className="h-11" />
              </Field>
              <Field id="est" label="Estado">
                <select id="est" className={selectClass()} value={estado} onChange={e => setEstado(e.target.value)}>
                  <option value="">Seleccione...</option>
                  <option>Borrador</option>
                  <option>Confirmada con Pago</option>
                  <option>Confirmada sin Pago</option>
                </select>
              </Field>
            </FilterPanel>
          )}
          {showFilters === 'solicitud' && (
            <FilterPanel title="Filtros de búsqueda" defaultOpen>
              <Field id="nat" label="N° de Atención">
                <Input id="nat" className="h-11" />
              </Field>
              <Field id="nsol" label="N° de Solicitud">
                <Input id="nsol" className="h-11" />
              </Field>
              <Field id="tit" label="Titular/Solicitante">
                <Input id="tit" className="h-11" />
              </Field>
              <Field id="est" label="Estado">
                <select id="est" className={selectClass()} value={estado} onChange={e => setEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Borrador</option>
                  <option>Confirmada con Pago</option>
                  <option>Confirmada sin Pago</option>
                </select>
              </Field>
            </FilterPanel>
          )}
          {showFilters === 'escrito' && (
            <FilterPanel title="Filtros de búsqueda" defaultOpen>
              <Field id="nat" label="N° de Atención">
                <Input id="nat" className="h-11" />
              </Field>
              <Field id="nsol" label="N° de Solicitud">
                <Input id="nsol" className="h-11" />
              </Field>
              <Field id="nesc" label="N° de Escrito">
                <Input id="nesc" placeholder="Ej: C/1234/123456" className="h-11" />
              </Field>
              <Field id="est" label="Estado">
                <select id="est" className={selectClass()} value={estado} onChange={e => setEstado(e.target.value)}>
                  <option>Todos</option>
                  <option>Borrador</option>
                  <option>Confirmada con Pago</option>
                </select>
              </Field>
            </FilterPanel>
          )}
          <div className="flex flex-wrap gap-gob-3">
            <Button size="form">Buscar</Button>
            <Button size="form" variant="secondary" onClick={() => setEstado(showFilters === 'anotacion' ? '' : 'Todos')}>
              Limpiar
            </Button>
          </div>
        </div>
        <Button asChild size="form" className="shrink-0 bg-gob-accent hover:bg-gob-accent/90">
          <Link href={createHref}>{createLabel}</Link>
        </Button>
      </div>
      <AlertBanner tone="warning">
        Advertencia: Solicitudes en estado &quot;Borrador&quot; serán eliminadas automáticamente a los 60 días desde su última modificación.
      </AlertBanner>
      <div className="space-y-gob-3">
        <h3 className="text-gri-body font-medium">Resultados</h3>
        {filtered.length === 0 ? (
          <EmptyState>{emptyText}</EmptyState>
        ) : (
          <DataTable headers={headers} caption={panelTitle}>
            {filtered.map(r => (
              <tr key={r.nAtencion} className="hover:bg-gob-surface-elevated transition-colors">
                <Td>{r.nAtencion}</Td>
                <Td>{r.nSolicitud || '—'}</Td>
                {headers.includes('Titular/Solicitante') && <Td>{r.titular || '—'}</Td>}
                <Td>{r.tipo}</Td>
                <Td>{r.ultima}</Td>
                <Td>{r.estado}</Td>
              </tr>
            ))}
          </DataTable>
        )}
      </div>
    </ServicePanel>
  )
}

export function HelpTypesDialog({
  open,
  onClose,
  items,
}: {
  open: boolean
  onClose: () => void
  items: { id: string; label: string; help: string }[]
}) {
  return (
    <Dialog open={open} onOpenChange={v => !v && onClose()}>
      <DialogContent className="max-h-[80vh] overflow-y-auto sm:max-w-2xl rounded-gob-lg">
        <DialogHeader>
          <DialogTitle>Tipos de anotaciones.</DialogTitle>
        </DialogHeader>
        <div className="space-y-gob-4 pr-gob-2">
          {items.map(item => (
            <div key={item.id}>
              <h3 className="font-medium text-gri-body text-gob-text">{item.label}:</h3>
              <p className="text-gri-body-sm text-muted-foreground leading-relaxed mt-1">{item.help}</p>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export function AnnotationCreateScreen({
  domain,
  items,
  hint,
}: {
  domain: 'marcas' | 'patentes'
  items: { id: string; label: string; help: string }[]
  hint: string
}) {
  const [tipo, setTipo] = useState('')
  const [help, setHelp] = useState(false)
  const [registro, setRegistro] = useState('')
  const [msg, setMsg] = useState(false)

  return (
    <ServicePanel title={domain === 'marcas' ? 'Anotación de marcas' : 'Anotación de patentes'} domain={domain}>
      <p className="text-gri-body text-gob-text">{hint}</p>
      <div className="max-w-xl space-y-gob-2">
        <label htmlFor="tipo-anot" className="flex items-center text-gri-body-sm font-medium">
          Tipo de Anotación:
          <HelpTooltip text="Abre la explicación de cada tipo de anotación." label="Tipos de anotaciones" />
          <button type="button" className="text-gob-link text-gri-body-sm underline ml-1" onClick={() => setHelp(true)}>
            Ver tipos
          </button>
        </label>
        <select id="tipo-anot" className={selectClass()} value={tipo} onChange={e => setTipo(e.target.value)}>
          <option value="">Seleccione...</option>
          {items.map(i => (
            <option key={i.id} value={i.id}>
              {i.label}
            </option>
          ))}
        </select>
      </div>
      {tipo && (
        <div className="max-w-xl space-y-gob-2 animate-in fade-in duration-200">
          <label htmlFor="nreg" className="text-gri-body-sm font-medium">
            {domain === 'marcas' ? 'Número de registro de la marca' : 'Número de registro'}
          </label>
          <Input id="nreg" value={registro} onChange={e => setRegistro(e.target.value)} className="h-11" />
          <Button size="form" disabled={!registro.trim()} onClick={() => setMsg(true)}>
            Continuar
          </Button>
        </div>
      )}
      <HelpTypesDialog open={help} onClose={() => setHelp(false)} items={items} />
      <SiteMessage open={msg} onClose={() => setMsg(false)}>
        En este MVP la anotación queda como borrador de demostración. No se envía a INAPI.
      </SiteMessage>
    </ServicePanel>
  )
}

export function ExternalRedirect({ href, label }: { href: string; label: string }) {
  return (
    <ServicePanel title="Redirección" domain="marcas">
      <p className="text-gri-body text-gob-text">
        Este trámite se realiza en un sitio distinto. Te llevamos a {label}.
      </p>
      <Button asChild size="form">
        <a href={href} rel="noopener noreferrer">
          Continuar a {label}
        </a>
      </Button>
      <p className="text-gri-body-xs text-muted-foreground break-all">{href}</p>
    </ServicePanel>
  )
}

export function AutoExternalRedirect({ href }: { href: string }) {
  useEffect(() => {
    window.location.assign(href)
  }, [href])
  return (
    <p className="text-gri-body text-muted-foreground" role="status">
      Redirigiendo…
    </p>
  )
}

export function linkClass() {
  return cn('text-gob-link underline underline-offset-4 hover:text-gob-primary-dark transition-colors')
}
