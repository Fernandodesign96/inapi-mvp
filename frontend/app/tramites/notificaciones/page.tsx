'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Bell, FileSearch, Layers } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { ControlChip, ControlChipRow, RecordCard, WorkSplit, HelperCard, BulletList } from '@/components/tramites/TramitesExperience'
import { citizenStatusLabel } from '@/lib/citizen-status'
import { EmptyState, TramitesMain } from '@/components/tramites/ui-helpers'
import { StatTile } from '@/components/story/StatTile'
import { NOTIFICACIONES } from '@/lib/tramites/mock-data'
import { useQueryParams } from '@/lib/tramites/use-query'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'

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
  const { setPrefs } = useDashboardPrefs()
  const ambito = params.get('ambito')
  const [tabElegida, setTab] = useState<'marcas' | 'patentes' | null>(null)
  const tab = tabElegida ?? (ambito === 'patentes' ? 'patentes' : 'marcas')
  const [numero, setNumero] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [titular, setTitular] = useState('')
  const [vista, setVista] = useState<'cards' | 'tabla'>('cards')

  useEffect(() => {
    setPrefs({ scope: tab })
  }, [tab, setPrefs])

  const filtradas = NOTIFICACIONES.filter(n => {
    if (n.dominio !== tab) return false
    if (numero && !n.numero.includes(numero)) return false
    if (titular && !n.titular.toLowerCase().includes(titular.toLowerCase())) return false
    if (desde && n.fecha < desde) return false
    if (hasta && n.fecha > hasta) return false
    return true
  })
  const responder = filtradas.filter(n => n.tipo === 'Requerimiento').length
  const publicadas = filtradas.filter(n => n.tipo === 'Publicación').length

  const setTabAndScope = (next: 'marcas' | 'patentes') => {
    setTab(next)
    setPrefs({ scope: next })
  }

  return (
    <TramitesMain>
      <div className="grid gap-gob-4 min-[905px]:grid-cols-3">
        <StatTile value={filtradas.length} label="Solicitudes en este ámbito" icon={<Layers />} />
        <StatTile value={responder} label="Por responder" caption="Tienen un plazo abierto" icon={<Bell />} tone="night" />
        <StatTile value={publicadas} label="En publicación" icon={<FileSearch />} />
      </div>

      <WorkSplit
        main={
          <div className="space-y-gob-5">
            <ControlChipRow label="Ámbito">
              <ControlChip pressed={tab === 'marcas'} onClick={() => setTabAndScope('marcas')}>
                Marcas
              </ControlChip>
              <ControlChip pressed={tab === 'patentes'} onClick={() => setTabAndScope('patentes')}>
                Patentes
              </ControlChip>
            </ControlChipRow>
            <ControlChipRow label="Vista">
              <ControlChip pressed={vista === 'cards'} onClick={() => setVista('cards')}>
                Tarjetas
              </ControlChip>
              <ControlChip pressed={vista === 'tabla'} onClick={() => setVista('tabla')}>
                Tabla
              </ControlChip>
            </ControlChipRow>

            <p className="text-gri-body-sm text-muted-foreground">
              RUN {session.run} · {session.nombre}
            </p>

            <FilterPanel title="Filtros de notificaciones" defaultOpen={false}>
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
              <EmptyState
                title="Todavía no tienes solicitudes"
                description="Cuando presentes una solicitud de marca o patente, aparecerá aquí."
                cta={{ label: 'Presentar mi primera solicitud', href: '/tramites/marcas/solicitar' }}
              />
            ) : vista === 'cards' ? (
              <ul className="grid gap-gob-3 min-[905px]:grid-cols-2">
                {filtradas.map(n => (
                  <li key={n.id}>
                    <RecordCard
                      kicker={citizenStatusLabel(n.tipo)}
                      title={n.numero}
                      body={n.resumen}
                      meta={<p className="text-gri-body-xs text-muted-foreground">{n.fecha} · {n.titular}</p>}
                    />
                  </li>
                ))}
              </ul>
            ) : (
              <DataTable headers={['Fecha', 'Número', 'Tipo', 'Resumen']} caption="Notificaciones">
                {filtradas.map(n => (
                  <tr key={n.id}>
                    <Td>{n.fecha}</Td>
                    <Td>{n.numero}</Td>
                    <Td>{citizenStatusLabel(n.tipo)}</Td>
                    <Td>{n.resumen}</Td>
                  </tr>
                ))}
              </DataTable>
            )}
          </div>
        }
        aside={
          <>
            <HelperCard title="Qué puedes hacer ahora" tone="night">
              <BulletList
                items={
                  responder
                    ? ['Hay un requerimiento abierto: responde antes del plazo.', 'La publicación corre plazos para terceros.']
                    : ['Revisa el estado diario público si buscas un aviso reciente.', 'Filtra por número si tienes el expediente a mano.']
                }
              />
            </HelperCard>
            <ButtonLinkEstado />
          </>
        }
      />
    </TramitesMain>
  )
}

function ButtonLinkEstado() {
  const router = useRouter()
  return (
    <HelperCard title="Estado diario">
      <button
        type="button"
        className="inline-flex min-h-11 items-center text-gri-body-sm font-medium text-gob-link underline underline-offset-4"
        onClick={() => router.push('/notificaciones-diarias')}
      >
        Ver estado diario público
      </button>
      <HelpTooltip text="Abre el listado público de notificaciones diarias del portal." />
    </HelperCard>
  )
}
