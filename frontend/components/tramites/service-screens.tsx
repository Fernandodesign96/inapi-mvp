'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { InactiveField } from '@/components/tramites/InactiveField'
import { LegalNotice } from '@/components/tramites/LegalNotice'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { EmptyState, TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { LEGAL_ESCRITOS, LEGAL_EXPEDIENTE, LEGAL_GUARDADAS } from '@/lib/tramites/legal'
import {
  BORRADORES_MARCA,
  BORRADORES_PATENTE,
  EXPEDIENTE_MARCA,
  EXPEDIENTE_PATENTE,
  FORMULARIOS_MARCA,
  FORMULARIOS_PATENTE,
  TIPOS_ESCRITO_MARCA,
  TIPOS_ESCRITO_PATENTE,
  TIPOS_PROCESO_MARCA,
  TIPOS_PROCESO_PATENTE,
} from '@/lib/tramites/mock-data'
import type { TramitesDomain } from '@/lib/tramites/nav'

export function DocumentosScreen({ domain }: { domain: TramitesDomain }) {
  const exp = domain === 'marcas' ? EXPEDIENTE_MARCA : EXPEDIENTE_PATENTE
  const expected = exp.numero
  const [numero, setNumero] = useState('')
  const valid = numero.replace(/\s/g, '') === expected
  const [opened, setOpened] = useState(false)

  return (
    <RequireAuth>
      <TramitesMain>
        <LegalNotice>{LEGAL_EXPEDIENTE}</LegalNotice>
        <p className="text-gri-body text-gob-text">
          Escribe el número de {domain === 'marcas' ? 'solicitud de marca' : 'solicitud de patente'} para ver tus documentos.
          En este MVP el número de demostración es {expected}.
        </p>
        <div className="flex flex-col min-[600px]:flex-row gap-gob-3 min-[600px]:items-end">
          <div className="flex-1 space-y-gob-2">
            <label htmlFor="nsol" className="flex items-center text-gri-body-sm font-medium">
              Número de solicitud
              <HelpTooltip text={`Prueba con ${expected}.`} />
            </label>
            <Input id="nsol" value={numero} onChange={e => setNumero(e.target.value)} />
          </div>
          <InactiveField active={valid} hint="El botón se activa cuando el número es válido.">
            <Button size="form" disabled={!valid} onClick={() => setOpened(true)}>
              Continuar
            </Button>
          </InactiveField>
        </div>
        {!opened && <EmptyState>Ingresa un número válido para ver el expediente. El resto de la pantalla permanece visible.</EmptyState>}
        {opened && (
          <section className="space-y-gob-3">
            <h2 className="font-heading text-xl font-medium">
              {'signo' in exp ? exp.signo : exp.titulo} · {exp.numero}
            </h2>
            <p className="text-gri-body-sm text-muted-foreground">
              Titular: {exp.titular} · Estado: {exp.estado} · {exp.documentos.length} documentos
            </p>
            <DataTable headers={['Fecha', 'Tipo', 'Descripción', 'Acción']} caption="Documentos del expediente">
              {exp.documentos.map(d => (
                <tr key={d.id}>
                  <Td>{d.fecha}</Td>
                  <Td>{d.tipo}</Td>
                  <Td>{d.descripcion}</Td>
                  <Td>
                    <Button variant="outline" size="sm" type="button">
                      Ver
                    </Button>
                  </Td>
                </tr>
              ))}
            </DataTable>
          </section>
        )}
      </TramitesMain>
    </RequireAuth>
  )
}

export function GuardadasScreen({ domain }: { domain: TramitesDomain }) {
  const rows = domain === 'marcas' ? BORRADORES_MARCA : BORRADORES_PATENTE
  const dest =
    domain === 'marcas' ? '/tramites/marcas/solicitar' : '/tramites/patentes/solicitar'

  return (
    <RequireAuth>
      <TramitesMain>
        <LegalNotice>{LEGAL_GUARDADAS}</LegalNotice>
        <p className="text-gri-body text-gob-text">
          Tus borradores se eliminan a los 60 días si no pagas las tasas. Abre uno para continuar.
        </p>
        <DataTable
          headers={['Número', domain === 'marcas' ? 'Signo' : 'Título', 'Guardada', 'Vence', 'Acción']}
          caption="Solicitudes guardadas"
        >
          {rows.map(r => (
            <tr key={r.id}>
              <Td>{r.id}</Td>
              <Td>{r.signoOTitulo}</Td>
              <Td>{r.fecha}</Td>
              <Td>{r.vence}</Td>
              <Td>
                <Button asChild size="sm">
                  <Link href={`${dest}?borrador=${r.id}`}>Continuar solicitud</Link>
                </Button>
              </Td>
            </tr>
          ))}
        </DataTable>
      </TramitesMain>
    </RequireAuth>
  )
}

export function EscritosScreen({ domain }: { domain: TramitesDomain }) {
  const procesos = domain === 'marcas' ? TIPOS_PROCESO_MARCA : TIPOS_PROCESO_PATENTE
  const escritos = domain === 'marcas' ? TIPOS_ESCRITO_MARCA : TIPOS_ESCRITO_PATENTE
  const expected = domain === 'marcas' ? '1000000' : '202101234'
  const [numero, setNumero] = useState('')
  const validNum = numero.replace(/\s/g, '') === expected
  const [proceso, setProceso] = useState('')
  const [escrito, setEscrito] = useState('')
  const canSend = validNum && !!proceso && !!escrito
  const [sent, setSent] = useState(false)

  return (
    <RequireAuth>
      <TramitesMain>
        <LegalNotice>{LEGAL_ESCRITOS}</LegalNotice>
        <p className="text-gri-body text-gob-text">
          Indica el expediente y el tipo de escrito. Los campos siguientes se activan cuando el dato anterior es válido.
        </p>
        <div className="space-y-gob-4 max-w-xl">
          <div className="space-y-gob-2">
            <label htmlFor="nexp" className="flex items-center text-gri-body-sm font-medium">
              Número de expediente
              <HelpTooltip text={`Usa ${expected} en este prototipo.`} />
            </label>
            <Input id="nexp" value={numero} onChange={e => setNumero(e.target.value)} />
          </div>
          <InactiveField active={validNum} hint="Primero ingresa un número de expediente válido.">
            <div className="space-y-gob-2">
              <label htmlFor="proc" className="flex items-center text-gri-body-sm font-medium">
                Tipo de proceso
                <HelpTooltip text="Elige el trámite al que se asocia el escrito." />
              </label>
              <select id="proc" className={selectClass()} value={proceso} onChange={e => setProceso(e.target.value)}>
                <option value="">Selecciona</option>
                {procesos.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </InactiveField>
          <InactiveField active={!!proceso} hint="Elige un tipo de proceso para activar esta lista.">
            <div className="space-y-gob-2">
              <label htmlFor="esc" className="flex items-center text-gri-body-sm font-medium">
                Tipo de escrito
                <HelpTooltip text="Incluye oficio administrativo y oficio judicial." />
              </label>
              <select id="esc" className={selectClass()} value={escrito} onChange={e => setEscrito(e.target.value)}>
                <option value="">Selecciona</option>
                {escritos.map(p => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            </div>
          </InactiveField>
          <InactiveField active={canSend}>
            <Button size="form" disabled={!canSend} onClick={() => setSent(true)}>
              Continuar
            </Button>
          </InactiveField>
        </div>
        {sent && (
          <p className="text-gri-body text-gob-success">
            Escrito de demostración asociado a {numero}: {escrito} en {proceso}. En el MVP no se envía a INAPI.
          </p>
        )}
      </TramitesMain>
    </RequireAuth>
  )
}

export function FormulariosScreen({ domain }: { domain: TramitesDomain }) {
  const forms = domain === 'marcas' ? FORMULARIOS_MARCA : FORMULARIOS_PATENTE
  return (
    <RequireAuth>
      <TramitesMain>
        <p className="text-gri-body text-gob-text">
          Descarga el PDF que necesitas. Estos archivos son de demostración.
        </p>
        <DataTable headers={['Formulario', 'Archivo', 'Acción']} caption="Formularios">
          {forms.map(f => (
            <tr key={f.id}>
              <Td>{f.nombre}</Td>
              <Td>{f.archivo}</Td>
              <Td>
                <Button
                  variant="outline"
                  size="sm"
                  type="button"
                  onClick={() => window.alert(`Descarga simulada: ${f.archivo}`)}
                >
                  Descargar PDF
                </Button>
              </Td>
            </tr>
          ))}
        </DataTable>
      </TramitesMain>
    </RequireAuth>
  )
}
