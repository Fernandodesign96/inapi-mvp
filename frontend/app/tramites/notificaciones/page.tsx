'use client'

import { useEffect, useState } from 'react'
import { Bell, CheckCircle2, FolderKanban } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Field, FilterPanel } from '@/components/tramites/FilterPanel'
import { RequireAuth } from '@/components/tramites/RequireAuth'
import { DataTable, Td } from '@/components/tramites/DataTable'
import { ControlChip, ControlChipRow, PaperPanel } from '@/components/tramites/TramitesExperience'
import { SeverityChip } from '@/components/tramites/SeverityChip'
import { SolicitudStatusCard } from '@/components/tramites/SolicitudStatusCard'
import { TramitesMain, selectClass } from '@/components/tramites/ui-helpers'
import { FilterActionBar, useTramitesChrome } from '@/components/tramites/TramitesScreenChrome'
import { useSolicitudes } from '@/hooks/useSolicitudes'
import { etapaLabel, severityOf } from '@/lib/tramites/marca-etapas'
import { useQueryParams } from '@/lib/tramites/use-query'
import { useDashboardPrefs } from '@/hooks/useDashboardPrefs'
import { cn } from '@/lib/utils'

export default function NotificacionesPage() {
  return (
    <RequireAuth>
      <NotificacionesInner />
    </RequireAuth>
  )
}

type KpiTab = 'proceso' | 'accion' | 'finalizadas'
type NoticeChip = 'todas' | 'urgentes' | 'informativas' | 'exito'

function NotificacionesInner() {
  const params = useQueryParams()
  const { setPrefs, scope } = useDashboardPrefs()
  const { items, persona } = useSolicitudes()
  const tab = params.get('ambito') === 'patentes' ? 'patentes' : 'marcas'
  const [numero, setNumero] = useState('')
  const [desde, setDesde] = useState('')
  const [hasta, setHasta] = useState('')
  const [titular, setTitular] = useState('')
  const [vista, setVista] = useState<'cards' | 'tabla'>('cards')
  const [filterOpen, setFilterOpen] = useState(false)
  const [kpi, setKpi] = useState<KpiTab>('proceso')
  const [chip, setChip] = useState<NoticeChip>('todas')
  const [q, setQ] = useState('')
  const [pageSize, setPageSize] = useState(10)

  useEffect(() => {
    setPrefs({ scope: tab })
  }, [tab, setPrefs])

  const filtradas = items.filter(n => {
    if (n.dominio !== tab) return false
    if (persona === 'nuevo') {
      if (chip === 'urgentes' && n.tone !== 'required') return false
      if (chip === 'informativas' && n.tone !== 'progress') return false
      if (chip === 'exito' && n.tone !== 'registered' && n.tone !== 'closed') return false
    } else {
      if (kpi === 'accion' && n.tone !== 'required') return false
      if (kpi === 'finalizadas' && n.tone !== 'registered' && n.tone !== 'closed') return false
      if (kpi === 'proceso' && (n.tone === 'registered' || n.tone === 'closed')) return false
    }
    if (numero && !n.numero.includes(numero) && !n.nAtencion.includes(numero)) return false
    if (titular && !n.titular.toLowerCase().includes(titular.toLowerCase())) return false
    if (desde && n.fecha < desde) return false
    if (hasta && n.fecha > hasta) return false
    if (q && ![n.nombre, n.numero, n.nAtencion, n.titular].join(' ').toLowerCase().includes(q.toLowerCase())) return false
    return true
  })
  const accion = items.filter(n => n.dominio === tab && n.tone === 'required').length
  const finalizadas = items.filter(n => n.dominio === tab && (n.tone === 'registered' || n.tone === 'closed')).length
  const proceso = items.filter(n => n.dominio === tab && n.tone !== 'registered' && n.tone !== 'closed').length

  useTramitesChrome(
    {
      views: persona === 'nuevo' ? [] : [
        { id: 'cards', label: 'Tarjetas', icon: 'cards', pressed: vista === 'cards', onSelect: () => setVista('cards') },
        { id: 'tabla', label: 'Tabla', icon: 'table', pressed: vista === 'tabla', onSelect: () => setVista('tabla') },
      ],
      filterEnabled: persona !== 'nuevo',
      filterInline: true,
      filterOpen,
      onFilterToggle: () => setFilterOpen(v => !v),
    },
    [vista, filterOpen, persona],
  )

  const first = filtradas[0]
  const kpiItems: { id: KpiTab; value: number; label: string; icon: typeof FolderKanban }[] = [
    { id: 'proceso', value: proceso, label: 'En proceso', icon: FolderKanban },
    { id: 'accion', value: accion, label: 'Acción requerida', icon: Bell },
    { id: 'finalizadas', value: finalizadas, label: 'Finalizadas', icon: CheckCircle2 },
  ]

  if (persona === 'nuevo') {
    return (
      <TramitesMain>
        <div>
          <h1 className="font-heading text-[1.75rem] font-medium text-gob-text">Notificaciones de tus trámites</h1>
          <p className="mt-1 text-gri-body-sm text-muted-foreground">
            Consulta avisos y el detalle de tus trámites. Las gestiones pendientes se realizan en los canales oficiales de INAPI.
          </p>
        </div>
        <ControlChipRow label="Tipo de aviso">
          <ControlChip pressed={chip === 'todas'} onClick={() => setChip('todas')}>Todas</ControlChip>
          <ControlChip pressed={chip === 'urgentes'} onClick={() => setChip('urgentes')}>Urgentes</ControlChip>
          <ControlChip pressed={chip === 'informativas'} onClick={() => setChip('informativas')}>Informativas</ControlChip>
          <ControlChip pressed={chip === 'exito'} onClick={() => setChip('exito')}>Éxito</ControlChip>
        </ControlChipRow>
        <p className="py-gob-10 text-center text-gri-body-sm text-muted-foreground">
          No posees ninguna notificación de tus solicitudes.
        </p>
      </TramitesMain>
    )
  }

  return (
    <TramitesMain>
      <div role="tablist" aria-label="Resumen de tus solicitudes" className="flex flex-nowrap overflow-x-auto border-b border-gob-border">
        {kpiItems.map(item => {
          const pressed = kpi === item.id
          const Icon = item.icon
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={pressed}
              onClick={() => setKpi(item.id)}
              className={cn(
                'inline-flex min-h-11 shrink-0 items-center gap-gob-2 border-b-2 px-gob-4 text-gri-body-sm font-medium whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                pressed
                  ? tab === 'marcas'
                    ? 'border-inapi-marcas-accent bg-inapi-marcas-surface text-gob-text'
                    : 'border-gob-primary bg-gob-primary/10 text-gob-primary-dark dark:text-white dark:bg-gob-primary/25'
                  : 'border-transparent text-muted-foreground hover:text-gob-text',
              )}
            >
              <Icon className="size-4" aria-hidden />
              <span className="font-heading font-semibold tabular-nums">{item.value}</span>
              {item.label}
            </button>
          )
        })}
      </div>

      {first ? <SolicitudStatusCard n={first} defaultOpen={first.id === 'eco'} /> : null}

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

      <div className="flex flex-wrap items-end justify-between gap-gob-3">
        <div>
          <h2 className="font-heading text-gri-h2 font-medium text-gob-text">Mis solicitudes activas</h2>
          <p className="text-gri-body-sm text-muted-foreground">Abre una solicitud para ver las etapas del expediente. No redirige a otra pantalla.</p>
        </div>
        <p className="max-w-sm text-gri-body-sm text-muted-foreground">
          {accion > 0
            ? 'Hay un plazo abierto. Completa o corrige antecedentes antes de que vence, en los canales oficiales de INAPI.'
            : 'Filtra por número si tienes el expediente a mano, o abre el detalle para ver plazos.'}
        </p>
      </div>

      {filtradas.length === 0 ? (
        <p className="py-gob-8 text-center text-gri-body-sm text-muted-foreground">No hay solicitudes en esta vista.</p>
      ) : vista === 'cards' ? (
        <ul className="grid gap-gob-4">
          {filtradas.filter(n => n.id !== first?.id).map(n => (
            <li key={n.id}>
              <SolicitudStatusCard n={n} />
            </li>
          ))}
        </ul>
      ) : (
        <PaperPanel className="space-y-gob-4">
          <div className="flex flex-wrap items-center justify-between gap-gob-3">
            <label className="flex items-center gap-gob-2 text-gri-body-sm text-gob-text">
              Mostrar
              <select className={cn(selectClass(), 'w-20')} value={pageSize} onChange={e => setPageSize(Number(e.target.value))}>
                {[10, 25, 50].map(n => (
                  <option key={n}>{n}</option>
                ))}
              </select>
              filas por página
            </label>
            <label className="flex items-center gap-gob-2 text-gri-body-sm">
              Buscar
              <Input value={q} onChange={e => setQ(e.target.value)} className="h-11 w-48" />
            </label>
          </div>
          <DataTable
            headers={[
              'N° Atención',
              'N° Solicitud',
              'Titular o solicitante',
              tab === 'marcas' ? 'Nombre de marca' : 'Nombre de la invención',
              'Categoría',
              tab === 'marcas' ? 'Tipo de marca' : 'Tipo de derecho',
              'Última actualización',
              'Etapa actual',
              'Estado',
            ]}
            caption="Solicitudes"
          >
            {filtradas.slice(0, pageSize).map((n, i) => (
              <tr key={n.id} className={i % 2 === 1 ? 'bg-muted/40' : undefined}>
                <Td>{n.nAtencion}</Td>
                <Td>{n.numero}</Td>
                <Td>{n.titular}</Td>
                <Td>{n.nombre}</Td>
                <Td>{n.categoria}</Td>
                <Td>{n.tipoDerecho}</Td>
                <Td>{n.fecha}</Td>
                <Td>{etapaLabel(n.etapa)}</Td>
                <Td>
                  <SeverityChip severity={severityOf(n)} />
                </Td>
              </tr>
            ))}
          </DataTable>
          <p className="text-gri-body-sm text-muted-foreground">
            Mostrando 1 a {Math.min(pageSize, filtradas.length)} de {filtradas.length} registros
          </p>
        </PaperPanel>
      )}
      <p className="sr-only">{scope}</p>
    </TramitesMain>
  )
}
