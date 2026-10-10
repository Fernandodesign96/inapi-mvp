'use client'

import { useCallback, useEffect, useMemo, useState, type ReactNode } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionPills, SectionSubnav } from '@/components/portal/SectionPills'
import { PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'

const PILLS = [
  { id: 'gasto', label: 'Gasto presupuestario' },
  { id: 'personas', label: 'Personas' },
  { id: 'estados', label: 'Estados financieros' },
  { id: 'fondos', label: 'Ejecución fondos no presupuestarios' },
] as const

type PillId = (typeof PILLS)[number]['id']

const GASTO_SUB = [
  { id: 'resumen', label: '2026' },
  { id: 'mensual', label: 'Detalle mensual por subtítulo' },
  { id: 'st21', label: 'Subtítulo 21 por línea de productos' },
  { id: 'st22', label: 'Subtítulo 22 por línea de productos' },
  { id: 'st29', label: 'Subtítulo 29 por línea de productos' },
  { id: '2025', label: '2025' },
  { id: '2024', label: '2024' },
  { id: '2023', label: '2023' },
  { id: '2022', label: '2022' },
  { id: '2021', label: '2021' },
  { id: '2020', label: '2020' },
  { id: '2019', label: '2019' },
  { id: '2018', label: '2018' },
]

const PERSONAS_SUB = [
  { id: 'genero', label: 'Género' },
  { id: 'renta', label: 'Renta' },
  { id: 'etario', label: 'Rango etario' },
  { id: 'educacion', label: 'Nivel educacional' },
  { id: 'desarrollo', label: 'Desarrollo' },
]

const ESTADOS_SUB = ['2025', '2024', '2023', '2022', '2021', '2020', '2019', '2018', '2017'].map(y => ({
  id: `ef-${y}`,
  label: y,
}))

const COLORS = ['#3d5c80', '#7aa2ce', '#c4a35a', '#5b8c6f', '#a15c6e']

const ANUAL = [
  { anio: '2018', presupuesto: 9800, ejecutado: 9420 },
  { anio: '2019', presupuesto: 10240, ejecutado: 9910 },
  { anio: '2020', presupuesto: 10880, ejecutado: 10120 },
  { anio: '2021', presupuesto: 11450, ejecutado: 10980 },
  { anio: '2022', presupuesto: 12110, ejecutado: 11740 },
  { anio: '2023', presupuesto: 12890, ejecutado: 12410 },
  { anio: '2024', presupuesto: 13620, ejecutado: 13180 },
  { anio: '2025', presupuesto: 14210, ejecutado: 12840 },
  { anio: '2026', presupuesto: 14820, ejecutado: 8210 },
]

const SUBTITULOS = [
  { name: '21 Personal', value: 10670 },
  { name: '22 Bienes y servicios', value: 3260 },
  { name: '29 Activos', value: 890 },
]

const MENSUAL = [
  { mes: 'Ene', st21: 890, st22: 240, st29: 40 },
  { mes: 'Feb', st21: 910, st22: 255, st29: 35 },
  { mes: 'Mar', st21: 905, st22: 270, st29: 80 },
  { mes: 'Abr', st21: 920, st22: 248, st29: 55 },
  { mes: 'May', st21: 915, st22: 310, st29: 70 },
  { mes: 'Jun', st21: 930, st22: 265, st29: 60 },
  { mes: 'Jul', st21: 925, st22: 280, st29: 90 },
]

const LINEAS_21 = [
  { linea: 'Examen de marcas', presupuesto: 4120, ejecutado: 2380 },
  { linea: 'Examen de patentes', presupuesto: 3680, ejecutado: 2010 },
  { linea: 'Gestión institucional', presupuesto: 1870, ejecutado: 1020 },
  { linea: 'Difusión y promoción', presupuesto: 1000, ejecutado: 540 },
]

const LINEAS_22 = [
  { linea: 'Soporte tecnológico', presupuesto: 1480, ejecutado: 810 },
  { linea: 'Servicios generales', presupuesto: 920, ejecutado: 510 },
  { linea: 'Publicaciones y difusión', presupuesto: 510, ejecutado: 280 },
  { linea: 'Capacitación', presupuesto: 350, ejecutado: 190 },
]

const LINEAS_29 = [
  { linea: 'Equipamiento informático', presupuesto: 520, ejecutado: 210 },
  { linea: 'Mobiliario e infraestructura', presupuesto: 240, ejecutado: 80 },
  { linea: 'Software y licencias', presupuesto: 130, ejecutado: 45 },
]

const GENERO = [
  { name: 'Mujeres', value: 58 },
  { name: 'Hombres', value: 41 },
  { name: 'No informa', value: 1 },
]

const RENTA = [
  { tramo: '< $1,5 mill.', personas: 42 },
  { tramo: '$1,5–2,5 mill.', personas: 88 },
  { tramo: '$2,5–3,5 mill.', personas: 61 },
  { tramo: '> $3,5 mill.', personas: 27 },
]

const ETARIO = [
  { rango: '18–29', personas: 18 },
  { rango: '30–39', personas: 72 },
  { rango: '40–49', personas: 64 },
  { rango: '50–59', personas: 48 },
  { rango: '60+', personas: 16 },
]

const EDUCACION = [
  { name: 'Universitaria', value: 71 },
  { name: 'Magíster o doctorado', value: 18 },
  { name: 'Técnica', value: 8 },
  { name: 'Media', value: 3 },
]

function clp(n: number) {
  return `$${n.toLocaleString('es-CL')} mill.`
}

function formatMoneyValue(value: unknown) {
  return typeof value === 'number' ? clp(value) : String(value ?? '')
}

export function GastoDashboard() {
  const [pill, setPill] = useState<PillId>('gasto')
  const [sub, setSub] = useState('resumen')

  const applyHash = useCallback(() => {
    const raw = window.location.hash.replace('#', '').toLowerCase()
    if (!raw) return
    if (['gasto', 'personas', 'estados', 'fondos'].includes(raw)) {
      setPill(raw as PillId)
      return
    }
    if (GASTO_SUB.some(s => s.id === raw) || ['detalle-mensual-por-subtitulo', 'subtitulo-21', 'subtitulo-22', 'subtitulo-29'].includes(raw)) {
      setPill('gasto')
      if (raw.startsWith('detalle')) setSub('mensual')
      else if (raw.includes('21')) setSub('st21')
      else if (raw.includes('22')) setSub('st22')
      else if (raw.includes('29')) setSub('st29')
      else setSub(raw)
      return
    }
    if (PERSONAS_SUB.some(s => s.id === raw)) {
      setPill('personas')
      setSub(raw)
      return
    }
    if (raw.startsWith('ef-')) {
      setPill('estados')
      setSub(raw)
    }
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(applyHash)
    window.addEventListener('hashchange', applyHash)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', applyHash)
    }
  }, [applyHash])

  const subItems = pill === 'gasto' ? GASTO_SUB : pill === 'personas' ? PERSONAS_SUB : pill === 'estados' ? ESTADOS_SUB : []

  function selectPill(id: string) {
    const next = id as PillId
    setPill(next)
    const nextSub = next === 'gasto' ? 'resumen' : next === 'personas' ? 'genero' : next === 'estados' ? 'ef-2025' : 'fondos'
    setSub(nextSub)
    window.history.replaceState(null, '', `#${next}`)
  }

  function selectSub(id: string) {
    setSub(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <div className="space-y-gob-5">
      <PortalProse>
        INAPI publica el presupuesto asignado y lo ejecutado. Los tres subtítulos concentran más del 95 % del gasto de
        funcionamiento. Las cifras de esta vista simulan los tableros Tableau del sitio institucional, para exploración
        en el MVP; los montos vigentes se confirman en inapi.cl.
      </PortalProse>
      <div className="overflow-hidden rounded-gob-md border border-gob-border bg-card">
        <div className="p-gob-4">
          <SectionPills items={[...PILLS]} active={pill} onSelect={selectPill} ariaLabel="Gasto presupuestario" />
        </div>
        {subItems.length ? <SectionSubnav items={subItems} active={sub} onSelect={selectSub} /> : null}
      </div>
      {pill === 'gasto' ? <GastoPanel sub={sub} /> : null}
      {pill === 'personas' ? <PersonasPanel sub={sub} /> : null}
      {pill === 'estados' ? <EstadosPanel sub={sub} /> : null}
      {pill === 'fondos' ? <FondosPanel /> : null}
      <p className="text-gri-body-sm text-muted-foreground">
        Fuente estructural:{' '}
        <a
          href="https://www.inapi.cl/gasto-presupuestario/gasto-presupuestario"
          className="text-gob-link hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          gasto presupuestario en inapi.cl
        </a>
        . También puedes consultar el{' '}
        <a
          href="https://www.portaltransparencia.cl/PortalPdT/pdtta?codOrganismo=AY001"
          className="text-gob-link hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Portal de Transparencia del Estado
        </a>
        .
      </p>
    </div>
  )
}

function ChartCard({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="rounded-gob-md border border-gob-border bg-card p-gob-5">
      <h3 className="mb-gob-4 font-medium text-gob-text">{title}</h3>
      <div className="h-72">{children}</div>
    </section>
  )
}

function MoneyTable({
  caption,
  headers,
  rows,
}: {
  caption: string
  headers: string[]
  rows: (string | number)[][]
}) {
  return (
    <div className="overflow-x-auto rounded-gob-md border border-gob-border">
      <table className="w-full text-left text-gri-body-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-inapi-portal-hero text-gob-text-inverse">
          <tr>
            {headers.map(h => (
              <th key={h} className="p-gob-3 font-medium">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={String(row[0])} className={i % 2 ? 'bg-gob-surface-elevated' : 'bg-card'}>
              {row.map((cell, j) => (
                <td key={`${i}-${j}`} className="p-gob-3">
                  {typeof cell === 'number' ? clp(cell) : cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

function GastoPanel({ sub }: { sub: string }) {
  const yearRow = useMemo(() => {
    if (/^20\d{2}$/.test(sub)) return ANUAL.find(r => r.anio === sub)
    return ANUAL.find(r => r.anio === '2026')
  }, [sub])

  if (sub === 'mensual') {
    return (
      <div className="space-y-gob-5">
        <PortalSectionTitle>Detalle mensual por subtítulo (2026, a julio)</PortalSectionTitle>
        <ChartCard title="Ejecución mensual (millones de pesos, simulación)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MENSUAL}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip formatter={formatMoneyValue} />
              <Legend />
              <Bar dataKey="st21" name="Subtítulo 21" stackId="a" fill={COLORS[0]} />
              <Bar dataKey="st22" name="Subtítulo 22" stackId="a" fill={COLORS[1]} />
              <Bar dataKey="st29" name="Subtítulo 29" stackId="a" fill={COLORS[2]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <MoneyTable
          caption="Detalle mensual"
          headers={['Mes', 'Subtítulo 21', 'Subtítulo 22', 'Subtítulo 29']}
          rows={MENSUAL.map(r => [r.mes, r.st21, r.st22, r.st29])}
        />
      </div>
    )
  }

  if (sub === 'st21' || sub === 'st22' || sub === 'st29') {
    const map = { st21: LINEAS_21, st22: LINEAS_22, st29: LINEAS_29 } as const
    const title = { st21: '21', st22: '22', st29: '29' }[sub]
    const data = map[sub]
    return (
      <div className="space-y-gob-5">
        <PortalSectionTitle>Subtítulo {title} por línea de productos</PortalSectionTitle>
        <ChartCard title="Presupuesto y ejecución (millones de pesos, simulación)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} layout="vertical" margin={{ left: 24 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis type="category" dataKey="linea" width={160} />
              <Tooltip formatter={formatMoneyValue} />
              <Legend />
              <Bar dataKey="presupuesto" name="Presupuesto" fill={COLORS[0]} />
              <Bar dataKey="ejecutado" name="Ejecutado" fill={COLORS[1]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
        <MoneyTable
          caption={`Subtítulo ${title}`}
          headers={['Línea de producto', 'Presupuesto', 'Ejecutado']}
          rows={data.map(r => [r.linea, r.presupuesto, r.ejecutado])}
        />
      </div>
    )
  }

  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>{yearRow?.anio ?? '2026'}</PortalSectionTitle>
      <div className="grid gap-gob-4 min-[600px]:grid-cols-2">
        <div className="rounded-gob-md bg-gob-surface-elevated p-gob-5">
          <p className="text-gri-body-sm text-muted-foreground">Total presupuesto anual</p>
          <p className="font-heading text-3xl text-gob-text">{yearRow ? clp(yearRow.presupuesto) : '—'}</p>
        </div>
        <div className="rounded-gob-md bg-gob-surface-elevated p-gob-5">
          <p className="text-gri-body-sm text-muted-foreground">
            {yearRow?.anio === '2026' ? 'Total ejecutado a julio' : 'Total ejecutado'}
          </p>
          <p className="font-heading text-3xl text-gob-text">{yearRow ? clp(yearRow.ejecutado) : '—'}</p>
        </div>
      </div>
      <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
        <ChartCard title="Gastos según subtítulo">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={SUBTITULOS} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={2}>
                {SUBTITULOS.map((entry, i) => (
                  <Cell key={entry.name} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip formatter={formatMoneyValue} />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
        <ChartCard title="Serie presupuesto vs. ejecución">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={ANUAL}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="anio" />
              <YAxis />
              <Tooltip formatter={formatMoneyValue} />
              <Legend />
              <Line type="monotone" dataKey="presupuesto" name="Presupuesto" stroke={COLORS[0]} strokeWidth={2} />
              <Line type="monotone" dataKey="ejecutado" name="Ejecutado" stroke={COLORS[2]} strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
      <PortalSectionTitle>Descripción según subtítulo</PortalSectionTitle>
      <ul className="max-w-none list-disc space-y-gob-2 pl-gob-5 text-gri-body text-muted-foreground">
        <li>
          <strong className="text-gob-text">Subtítulo 21:</strong> remuneraciones, aportes del empleador y otros gastos
          de personal.
        </li>
        <li>
          <strong className="text-gob-text">Subtítulo 22:</strong> bienes de consumo y servicios no personales.
        </li>
        <li>
          <strong className="text-gob-text">Subtítulo 29:</strong> formación de capital y compra de activos físicos.
        </li>
      </ul>
    </div>
  )
}

function PersonasPanel({ sub }: { sub: string }) {
  if (sub === 'renta') {
    return (
      <div className="space-y-gob-5">
        <PortalSectionTitle>Renta</PortalSectionTitle>
        <ChartCard title="Dotación según tramo de renta bruta (simulación)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={RENTA}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="tramo" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="personas" name="Personas" fill={COLORS[0]} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    )
  }
  if (sub === 'etario') {
    return (
      <div className="space-y-gob-5">
        <PortalSectionTitle>Rango etario</PortalSectionTitle>
        <ChartCard title="Dotación por tramo de edad (simulación)">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={ETARIO}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="rango" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="personas" name="Personas" fill={COLORS[1]} radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    )
  }
  if (sub === 'educacion') {
    return (
      <div className="space-y-gob-5">
        <PortalSectionTitle>Nivel educacional</PortalSectionTitle>
        <ChartCard title="Composición educacional (simulación)">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={EDUCACION} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
                {EDUCACION.map((e, i) => (
                  <Cell key={e.name} fill={COLORS[i]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>
    )
  }
  if (sub === 'desarrollo') {
    return (
      <div className="space-y-gob-5">
        <PortalSectionTitle>Desarrollo</PortalSectionTitle>
        <PortalProse>
          Esta sección concentra las acciones de capacitación y desarrollo de personas. El plan vigente está publicado
          como PDF institucional.
        </PortalProse>
        <PortalPdfLink
          href="https://www.inapi.cl/docs/default-source/2025-doc/home/footer/res-pac-2025.pdf"
          title="Plan anual de capacitación 2025-2027"
          size="293 KB"
        />
      </div>
    )
  }
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Género</PortalSectionTitle>
      <ChartCard title="Dotación según género (simulación)">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie data={GENERO} dataKey="value" nameKey="name" innerRadius={50} outerRadius={90}>
              {GENERO.map((e, i) => (
                <Cell key={e.name} fill={COLORS[i]} />
              ))}
            </Pie>
            <Tooltip formatter={value => (typeof value === 'number' ? `${value} %` : String(value ?? ''))} />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </ChartCard>
    </div>
  )
}

function EstadosPanel({ sub }: { sub: string }) {
  const year = sub.replace('ef-', '')
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Estados financieros {year}</PortalSectionTitle>
      <PortalProse>
        Los estados financieros oficiales se publican por año en el sitio institucional. Esta tabla resume la estructura
        típica (simulación) para el ejercicio {year}.
      </PortalProse>
      <MoneyTable
        caption={`Estados financieros ${year}`}
        headers={['Concepto', 'Monto']}
        rows={[
          ['Activos corrientes', 2140],
          ['Activos no corrientes', 3890],
          ['Pasivos', 1260],
          ['Patrimonio', 4770],
        ]}
      />
      <p>
        <a
          href={`https://www.inapi.cl/gasto-presupuestario/estados-financieros/${year}`}
          className="font-medium text-gob-link hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Abrir estados financieros {year} en inapi.cl
        </a>
      </p>
    </div>
  )
}

function FondosPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Ejecución de fondos no presupuestarios</PortalSectionTitle>
      <PortalProse>
        Agrupa recursos que no forman parte de la ley de presupuestos (convenios, fondos de terceros y similares). La
        ejecución oficial está en Tableau.
      </PortalProse>
      <MoneyTable
        caption="Fondos no presupuestarios"
        headers={['Fondo', 'Asignado', 'Ejecutado']}
        rows={[
          ['Convenios de cooperación', 420, 210],
          ['Proyectos de difusión', 180, 95],
          ['Otros fondos de terceros', 75, 40],
        ]}
      />
      <p>
        <a
          href="https://www.inapi.cl/gasto-presupuestario/ejecucion-fondos-no-presupuestarios"
          className="font-medium text-gob-link hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver ejecución en inapi.cl
        </a>
      </p>
    </div>
  )
}
