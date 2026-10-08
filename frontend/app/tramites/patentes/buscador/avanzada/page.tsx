'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { EmptyState, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { RESULTADOS_PATENTES } from '@/lib/tramites/mock-data'

const OPS = ['contiene', 'es', 'comienza con']

function Block({
  title,
  hint,
  children,
}: {
  title: string
  hint: string
  children: React.ReactNode
}) {
  return (
    <section className="rounded-gob-md border border-gob-border bg-card p-gob-4 space-y-gob-3">
      <div>
        <h2 className="font-heading text-lg font-medium text-gob-text">{title}</h2>
        <p className="text-gri-body-sm text-muted-foreground">{hint}</p>
      </div>
      {children}
    </section>
  )
}

function Row({ id, label }: { id: string; label: string }) {
  const [op, setOp] = useState('contiene')
  const [val, setVal] = useState('')
  return (
    <div className="grid gap-gob-2 min-[600px]:grid-cols-[1fr_160px_1fr] min-[600px]:items-center">
      <label htmlFor={id} className="text-gri-body-sm font-medium">
        {label}
      </label>
      <select className={selectClass()} value={op} onChange={e => setOp(e.target.value)} aria-label={`Operador de ${label}`}>
        {OPS.map(o => (
          <option key={o}>{o}</option>
        ))}
      </select>
      <Input id={id} value={val} onChange={e => setVal(e.target.value)} />
    </div>
  )
}

export default function BusquedaAvanzadaPage() {
  const [ran, setRan] = useState(false)

  return (
    <TramitesMain>
      <p className="text-gri-body text-gob-text max-w-3xl">
        Combina criterios. Los operadores son «contiene», «es» y «comienza con».
      </p>
      <Link href="/tramites/patentes/buscador" className="text-gob-link underline underline-offset-4">
        Volver a búsqueda simple
      </Link>
      <Block title="Patente" hint="Título, resumen o reivindicaciones.">
        <Row id="titulo" label="Título" />
        <Row id="resumen" label="Resumen" />
      </Block>
      <Block title="Solicitantes" hint="Nombre o RUT de quien pide el derecho.">
        <Row id="sol" label="Solicitante" />
      </Block>
      <Block title="Números" hint="Número de solicitud, publicación o registro.">
        <Row id="nsol" label="Número de solicitud" />
        <Row id="npub" label="Número de publicación" />
      </Block>
      <Block title="Fechas" hint="Presentación, publicación o concesión.">
        <div className="grid gap-gob-3 min-[600px]:grid-cols-2">
          <div className="space-y-gob-2">
            <label htmlFor="f1" className="text-gri-body-sm font-medium">
              Desde
            </label>
            <Input id="f1" type="date" />
          </div>
          <div className="space-y-gob-2">
            <label htmlFor="f2" className="text-gri-body-sm font-medium">
              Hasta
            </label>
            <Input id="f2" type="date" />
          </div>
        </div>
      </Block>
      <Block title="Clasificaciones" hint="Códigos CIP o CPC.">
        <Row id="cip" label="CIP" />
      </Block>
      <Block title="Inventores" hint="Nombre de quien inventó.">
        <Row id="inv" label="Inventor" />
      </Block>
      <Block title="Prioridades" hint="País y número de prioridad.">
        <Row id="prio" label="Prioridad" />
      </Block>
      <Button size="form" onClick={() => setRan(true)}>
        Buscar
      </Button>
      {ran && (
        <DataTable headers={['Número', 'Tipo', 'Título', 'Solicitante']} caption="Resultados avanzados">
          {RESULTADOS_PATENTES.map(r => (
            <tr key={r.numero}>
              <Td>{r.numero}</Td>
              <Td>{r.tipo}</Td>
              <Td>{r.titulo}</Td>
              <Td>{r.solicitante}</Td>
            </tr>
          ))}
        </DataTable>
      )}
      {ran && RESULTADOS_PATENTES.length === 0 && <EmptyState>No hay resultados con estos filtros</EmptyState>}
    </TramitesMain>
  )
}
