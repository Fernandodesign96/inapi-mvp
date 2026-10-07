'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { EmptyState, TramitesMain } from '@/components/tramites/ui-helpers'
import { NOTIFICACIONES } from '@/lib/tramites/mock-data'
import { useQueryParams } from '@/lib/tramites/use-query'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

export default function NotificacionesPage() {
  return (
    <RequireAuth>
      <NotificacionesInner />
    </RequireAuth>
  )
}

function NotificacionesInner() {
  const { session } = useTramitesSession()
  const params = useQueryParams()
  const ambito = params.get('ambito')
  const [tabElegida, setTab] = useState<'marcas' | 'patentes' | null>(null)
  const tab = tabElegida ?? (ambito === 'patentes' ? 'patentes' : 'marcas')
  const [numero, setNumero] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [titular, setTitular] = useState('')

  const filtradas = NOTIFICACIONES.filter(n => {
    if (n.dominio !== tab) return false
    if (numero && !n.numero.includes(numero)) return false
    if (titular && !n.titular.toLowerCase().includes(titular.toLowerCase())) return false
    if (desde && n.fecha < desde) return false
    if (hasta && n.fecha > hasta) return false
    return true
  })

  return (
    <TramitesMain>
      <div className="flex flex-wrap items-center justify-between gap-gob-4">
        <div>
          <p className="text-gri-body-sm text-gob-text">
            RUN {session.run} · {session.nombre}
          </p>
          <p className="text-gri-body-xs text-muted-foreground">Última actualización: 06-10-2026</p>
        </div>
        <ButtonLinkEstado />
      </div>

      <div className="flex gap-2 border-b border-gob-border">
        {(['marcas', 'patentes'] as const).map(t => (
          <button
            key={t}
            type="button"
            onClick={() => setTab(t)}
            className={cn(
              'min-h-11 px-gob-4 text-gri-body-sm font-medium border-b-[3px]',
              tab === t
                ? t === 'marcas'
                  ? 'border-gob-accent text-gob-text'
                  : 'border-gob-primary text-gob-text'
                : 'border-transparent text-muted-foreground',
            )}
          >
            {t === 'marcas' ? 'Marcas' : 'Patentes'}
          </button>
        ))}
      </div>

      <FilterPanel title="Filtros de notificaciones">
        <Field id="num" label="Número de solicitud">
          <Input id="num" value={numero} onChange={e => setNumero(e.target.value)} />
        </Field>
        <Field id="tit" label="Titular">
          <Input id="tit" value={titular} onChange={e => setTitular(e.target.value)} />
        </Field>
        <Field id="desde" label="Desde">
          <Input id="desde" type="date" value={desde} onChange={e => setDesde(e.target.value)} />
        </Field>
        <Field id="hasta" label="Hasta">
          <Input id="hasta" type="date" value={hasta} onChange={e => setHasta(e.target.value)} />
        </Field>
      </FilterPanel>

      {filtradas.length === 0 ? (
        <EmptyState>No hay notificaciones con estos filtros</EmptyState>
      ) : (
        <DataTable headers={['Fecha', 'Número', 'Tipo', 'Resumen']} caption="Notificaciones">
          {filtradas.map(n => (
            <tr key={n.id}>
              <Td>{n.fecha}</Td>
              <Td>{n.numero}</Td>
              <Td>{n.tipo}</Td>
              <Td>{n.resumen}</Td>
            </tr>
          ))}
        </DataTable>
      )}
    </TramitesMain>
  )
}

function ButtonLinkEstado() {
  const router = useRouter()
  return (
    <div className="flex items-center">
      <button
        type="button"
        className="inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link underline underline-offset-4"
        onClick={() => router.push('/notificaciones-diarias')}
      >
        Ver estado diario
      </button>
      <HelpTooltip text="Abre el listado público de notificaciones diarias del portal." />
    </div>
  )
}
