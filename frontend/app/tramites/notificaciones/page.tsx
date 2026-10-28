'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Input } from '@/components/ui/input'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { Building2, CalendarDays, FileText } from 'lucide-react'
import type { JourneyStep } from '@/components/story/JourneyRail'
import { RecordCard, WorkSplit, HelperCard, InfoStatCard } from '@/components/tramites/TramitesExperience'
import { citizenStatusLabel } from '@/lib/citizen-status'
import { EmptyState, TramitesMain } from '@/components/tramites/ui-helpers'
import { FilterActionBar, useTramitesChrome } from '@/components/tramites/TramitesScreenChrome'
import { NOTIFICACIONES } from '@/lib/tramites/mock-data'
import { useQueryParams } from '@/lib/tramites/use-query'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'

function notificationStages(tipo: string): JourneyStep[] {
  const titles = ['Ingreso', 'Examen', 'Publicación', 'Resolución']
  const current =
    tipo === 'Requerimiento' || tipo === 'Examen de fondo' ? 1 : tipo === 'Publicación' ? 2 : 0
  return titles.map((title, index) => ({
    title,
    status: index < current ? 'done' : index === current ? 'current' : 'pending',
  }))
}

export default function NotificacionesPage() {
  return (
    <RequireAuth>
      <NotificacionesInner />
    </RequireAuth>
  )
}

function NotificacionesInner() {
  const params = useQueryParams()
  const { setPrefs } = useDashboardPrefs()
  const tab = params.get('ambito') === 'patentes' ? 'patentes' : 'marcas'
  const [numero, setNumero] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [titular, setTitular] = useState('')
  const [vista, setVista] = useState<'cards' | 'tabla'>('cards')
  const [filterOpen, setFilterOpen] = useState(false)

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

  useTramitesChrome(
    {
      views: [
        { id: 'cards', label: 'Tarjetas', icon: 'cards', pressed: vista === 'cards', onSelect: () => setVista('cards') },
        { id: 'tabla', label: 'Tabla', icon: 'table', pressed: vista === 'tabla', onSelect: () => setVista('tabla') },
      ],
      filterEnabled: true,
      filterInline: true,
      filterOpen,
      onFilterToggle: () => setFilterOpen(v => !v),
    },
    [vista, filterOpen],
  )

  return (
    <TramitesMain>
      <section aria-label="Resumen" className="grid gap-gob-3 min-[600px]:grid-cols-3">
        <InfoStatCard
          value={filtradas.length}
          label="Solicitudes"
          description="Trámites que tienes en curso en este ámbito."
        />
        <InfoStatCard
          value={responder}
          label="Por responder"
          description="Tienen un plazo abierto para que completes un requerimiento."
        />
        <InfoStatCard
          value={publicadas}
          label="En publicación"
          description="Están publicadas para conocimiento de terceros."
        />
      </section>

      <WorkSplit
        main={
          <div className="space-y-gob-5">
            <FilterActionBar />
            {filterOpen ? (
              <FilterPanel title="Filtros de notificaciones" bare>
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
            ) : null}
            {filtradas.length === 0 ? (
              <EmptyState
                title="Todavía no tienes solicitudes"
                description="Cuando presentes una solicitud de marca o patente, aparecerá aquí."
                cta={{
                  label: 'Presentar mi primera solicitud',
                  href: tab === 'patentes' ? '/tramites/patentes/solicitar' : '/tramites/marcas/solicitar',
                }}
              />
            ) : vista === 'cards' ? (
              <ul className="grid gap-gob-4">
                {filtradas.map(n => (
                  <li key={n.id}>
                    <RecordCard
                      kicker={n.tipo}
                      title={n.numero}
                      body={citizenStatusLabel(n.tipo)}
                      facts={[
                        { icon: <FileText />, label: 'Qué ocurrió', value: n.resumen },
                        { icon: <Building2 />, label: 'Titular', value: n.titular },
                        { icon: <CalendarDays />, label: 'Fecha del aviso', value: n.fecha },
                      ]}
                      stages={notificationStages(n.tipo)}
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
            <HelperCard
              title="Qué puedes hacer ahora"
              tone="night"
              hint="Apoyo de este listado"
              sections={
                responder
                  ? [
                      {
                        title: 'Requerimiento abierto',
                        body: 'Hay un plazo para que completes o corrijas antecedentes. Abre la solicitud y responde antes de que venza.',
                      },
                      {
                        title: 'Publicación',
                        body: 'Si tu marca se publicó, terceros pueden oponerse. Revisa el Diario Oficial y el estado diario.',
                      },
                      {
                        title: 'Siguiente paso',
                        body: 'Filtra por número si tienes el expediente a mano, o entra al detalle para ver plazos y documentos.',
                      },
                    ]
                  : [
                      {
                        title: 'Estado diario',
                        body: 'El listado público muestra avisos recientes. Úsalo si buscas una publicación de hoy o de los últimos días.',
                      },
                      {
                        title: 'Filtrar el listado',
                        body: 'Si conoces el número de solicitud, ábrelo con filtros. Así evitas revisar avisos que no te corresponden.',
                      },
                      {
                        title: 'Presentar una solicitud',
                        body: 'Si aún no tienes trámites, comienza por solicitar marca o patente desde Empezar un trámite.',
                      },
                    ]
              }
            />
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
    <HelperCard title="Estado diario" collapsible hint="Listado público">
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
