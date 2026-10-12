'use client'

import { useMemo, useState } from 'react'
import Link from 'next/link'
import { Lightbulb, Stamp } from 'lucide-react'
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { InapiDoughnutCard } from '@/components/home/InapiDoughnutCard'
import { TooltipProvider } from '@/components/ui/tooltip'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'
import {
  MARCAS_MULTICLASE,
  MARCAS_NO_RESIDENTES_UNICLASE,
  MARCAS_NO_RESIDENTES_YEARS,
  MARCAS_ORIGEN,
  MARCAS_ORIGEN_YEARS,
  PATENTES_ORIGEN,
  PATENTES_ORIGEN_YEARS,
  PATENTES_POR_TIPO,
  PATENTES_TIPO_YEARS,
  PATENTES_TOTAL,
} from '@/lib/inapi-official-stats'

function ChartHeading({ title, description }: { title: string; description: string }) {
  return (
    <div className="space-y-gob-2">
      <h3 className="font-heading text-gri-h2 font-medium text-gob-text-inverse">{title}</h3>
      <p className="text-gri-body-sm leading-[1.5] text-[#E8F1FC]">{description}</p>
    </div>
  )
}

function AreaCard({
  data,
  seriesName,
}: {
  data: readonly { anio: string; solicitudes: number }[]
  seriesName: string
}) {
  const { locale } = useI18n()
  const formatMiles = (value: number) =>
    locale === 'en' ? `${Math.round(value / 1000)}k` : `${Math.round(value / 1000)} mil`

  return (
    <article
      data-i18n-skip
      className="flex h-[18rem] min-w-0 flex-col rounded-gob-lg border border-white/12 bg-[#07182b] p-gob-5"
    >
      <div className="h-full min-h-0 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={[...data]} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <defs>
              <linearGradient id="solicitudesFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7EB6FF" stopOpacity={0.45} />
                <stop offset="100%" stopColor="#7EB6FF" stopOpacity={0.02} />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis
              dataKey="anio"
              tick={{ fill: '#F4F7FB', fontSize: 11 }}
              axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
              tickLine={false}
            />
            <YAxis
              tick={{ fill: '#C5D4E8', fontSize: 11 }}
              tickFormatter={formatMiles}
              axisLine={false}
              tickLine={false}
              width={44}
            />
            <Tooltip
              cursor={{ stroke: '#FFBE5C', strokeWidth: 1 }}
              contentStyle={{
                background: '#092039',
                border: '1px solid rgba(255,255,255,0.16)',
                borderRadius: 8,
                color: '#FFFFFF',
              }}
              formatter={value => [
                typeof value === 'number'
                  ? `${value.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL')} ${locale === 'en' ? 'applications' : 'solicitudes'}`
                  : String(value ?? ''),
                seriesName,
              ]}
            />
            <Area
              type="monotone"
              dataKey="solicitudes"
              stroke="#7EB6FF"
              strokeWidth={2.5}
              fill="url(#solicitudesFill)"
              dot={{ r: 3, fill: '#FFBE5C', stroke: '#092039', strokeWidth: 2 }}
              activeDot={{ r: 5, fill: '#FFBE5C' }}
              name={seriesName}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </article>
  )
}

export function StatsSection() {
  const [panel, setPanel] = useState<'marcas' | 'patentes'>('marcas')
  const [madridYear, setMadridYear] = useState('2025')
  const [marcaOrigenYear, setMarcaOrigenYear] = useState('2025')
  const [patenteYear, setPatenteYear] = useState('2025')
  const [origenYear, setOrigenYear] = useState('2025')

  const madrid = MARCAS_NO_RESIDENTES_UNICLASE[madridYear as keyof typeof MARCAS_NO_RESIDENTES_UNICLASE]
  const marcaOrigen = MARCAS_ORIGEN[marcaOrigenYear as keyof typeof MARCAS_ORIGEN]
  const patentes = PATENTES_POR_TIPO[patenteYear as keyof typeof PATENTES_POR_TIPO]
  const origen = PATENTES_ORIGEN[origenYear as keyof typeof PATENTES_ORIGEN]

  const madridSlices = useMemo(
    () => [
      {
        label: 'Vía nacional',
        value: madrid.nacional,
        color: '#7EB6FF',
        hint: 'Solicitudes de no residentes ingresadas por la vía nacional, conteo uniclase.',
      },
      {
        label: 'Protocolo de Madrid',
        value: madrid.madrid,
        color: '#FFBE5C',
        hint: 'Solicitudes de no residentes ingresadas por el Protocolo de Madrid, conteo uniclase.',
      },
    ],
    [madrid],
  )

  const marcaOrigenSlices = useMemo(
    () => [
      {
        label: 'Residentes',
        value: marcaOrigen.residentes,
        color: '#FFBE5C',
        hint: 'Solicitudes de marca presentadas por residentes en Chile, conteo uniclase.',
      },
      {
        label: 'No residentes',
        value: marcaOrigen.noResidentes,
        color: '#7EB6FF',
        hint: 'Solicitudes de marca presentadas por no residentes, conteo uniclase.',
      },
    ],
    [marcaOrigen],
  )

  const patenteSlices = useMemo(
    () => [
      {
        label: 'Invenciones',
        value: patentes.invencion,
        color: '#7EB6FF',
        hint: 'Patentes de invención, incluidas las provisionales.',
      },
      {
        label: 'Diseños industriales',
        value: patentes.diseno,
        color: '#FFBE5C',
        hint: 'Dibujos y diseños industriales, incluidos certificados de depósito.',
      },
      {
        label: 'Modelos de utilidad',
        value: patentes.modeloUtilidad,
        color: '#5EEAD4',
        hint: 'Modelos de utilidad, incluidos los provisionales.',
      },
    ],
    [patentes],
  )

  const origenSlices = useMemo(
    () => [
      {
        label: 'No residentes',
        value: origen.noResidentes,
        color: '#7EB6FF',
        hint: 'Solicitudes de patente presentadas por no residentes.',
      },
      {
        label: 'Residentes',
        value: origen.residentes,
        color: '#FFBE5C',
        hint: 'Solicitudes de patente presentadas por residentes en Chile.',
      },
    ],
    [origen],
  )

  const madridTotal = madrid.nacional + madrid.madrid
  const madridMadridShare = Math.round((madrid.madrid / madridTotal) * 100)
  const marcaResidentesShare = Math.round(
    (marcaOrigen.residentes / (marcaOrigen.residentes + marcaOrigen.noResidentes)) * 100,
  )
  const residentesShare = Math.round((origen.residentes / (origen.residentes + origen.noResidentes)) * 100)

  const tabs = [
    { id: 'marcas' as const, label: 'Marcas', icon: Stamp },
    { id: 'patentes' as const, label: 'Patentes', icon: Lightbulb },
  ]

  return (
    <section aria-labelledby="datos-title" className="py-gob-8 min-[905px]:py-20">
      <TooltipProvider delayDuration={200}>
        <ContainerGRI size="wide" className="space-y-gob-8">
          <div className="max-w-4xl space-y-gob-4">
            <h2 id="datos-title" className="portal-h2 text-gob-text-inverse">
              {panel === 'marcas'
                ? 'Volumen de solicitudes de marcas 2020-2025'
                : 'Volumen de solicitudes de patentes 2023-2025'}
            </h2>
            <p className="portal-lead text-gob-text-inverse">
              {panel === 'marcas'
                ? 'INAPI recibió 275.987 solicitudes de marca entre 2020 y 2025. Elige un año en los gráficos circulares para ver el detalle.'
                : 'INAPI recibió 12.286 solicitudes de patente entre 2023 y 2025. Elige un año en los gráficos circulares para ver el detalle.'}
            </p>
          </div>

          <div role="tablist" aria-label="Tipo de volumen" className="flex flex-wrap gap-gob-3">
            {tabs.map(tab => {
              const Icon = tab.icon
              const selected = tab.id === panel
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  className={cn(
                    'inline-flex min-h-14 items-center gap-gob-3 rounded-gob-lg border px-gob-5 py-gob-3 text-gri-h2 font-medium focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                    selected
                      ? 'border-white bg-white text-[#081F38] shadow-elevation-03'
                      : 'border-white/35 bg-transparent text-white hover:border-white',
                  )}
                  onClick={() => setPanel(tab.id)}
                >
                  <Icon className="size-6" aria-hidden />
                  {tab.label}
                </button>
              )
            })}
          </div>

          {panel === 'marcas' ? (
            <>
              <div className="grid min-w-0 items-stretch gap-gob-5 min-[905px]:grid-cols-3">
                <div className="flex min-w-0 flex-col gap-gob-4">
                  <ChartHeading
                    title="Solicitudes de marca por año"
                    description="Cada solicitud cuenta una vez, aunque incluya varias clases de productos o servicios."
                  />
                  <AreaCard data={MARCAS_MULTICLASE} seriesName="Marcas" />
                </div>
                <div className="flex min-w-0 flex-col gap-gob-4">
                  <ChartHeading
                    title="Marcas de no residentes"
                    description="Compara cuántas llegaron por la vía nacional y cuántas por el Protocolo de Madrid."
                  />
                  <InapiDoughnutCard
                    years={MARCAS_NO_RESIDENTES_YEARS}
                    year={madridYear}
                    onYearChange={setMadridYear}
                    slices={madridSlices}
                    centerLabel={`${madridMadridShare}%`}
                    centerCaption="por Protocolo de Madrid"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-gob-4">
                  <ChartHeading
                    title="Origen de las solicitudes"
                    description="Compara cuántas marcas presentaron residentes en Chile y cuántas no residentes."
                  />
                  <InapiDoughnutCard
                    years={MARCAS_ORIGEN_YEARS}
                    year={marcaOrigenYear}
                    onYearChange={setMarcaOrigenYear}
                    slices={marcaOrigenSlices}
                    centerLabel={`${marcaResidentesShare}%`}
                    centerCaption="presentadas por residentes"
                  />
                </div>
              </div>
              <p className="max-w-none text-gri-body leading-[1.5] text-[#E8F1FC]">
                También puedes ver cómo INAPI ejecuta su presupuesto, con cifras y documentos oficiales.{' '}
                <Link
                  href="/transparencia/gasto-presupuestario"
                  className="font-medium text-white underline underline-offset-4 hover:text-[#A1D1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  Consulta el gasto presupuestario
                </Link>
                .
              </p>
            </>
          ) : (
            <>
              <div className="grid min-w-0 items-stretch gap-gob-5 min-[905px]:grid-cols-3">
                <div className="flex min-w-0 flex-col gap-gob-4">
                  <ChartHeading
                    title="Solicitudes de patente por año"
                    description="Incluye invenciones, diseños, modelos de utilidad y solicitudes provisionales publicadas por INAPI."
                  />
                  <AreaCard data={PATENTES_TOTAL} seriesName="Patentes" />
                </div>
                <div className="flex min-w-0 flex-col gap-gob-4">
                  <ChartHeading
                    title="Origen de las solicitudes"
                    description="Compara cuántas patentes presentaron residentes en Chile y cuántas no residentes."
                  />
                  <InapiDoughnutCard
                    years={PATENTES_ORIGEN_YEARS}
                    year={origenYear}
                    onYearChange={setOrigenYear}
                    slices={origenSlices}
                    centerLabel={`${residentesShare}%`}
                    centerCaption="presentadas por residentes"
                  />
                </div>
                <div className="flex min-w-0 flex-col gap-gob-4">
                  <ChartHeading
                    title="Patentes por tipo"
                    description="Revisa cuántas solicitudes fueron invenciones, diseños industriales o modelos de utilidad."
                  />
                  <InapiDoughnutCard
                    years={PATENTES_TIPO_YEARS}
                    year={patenteYear}
                    onYearChange={setPatenteYear}
                    slices={patenteSlices}
                    centerLabel={patentes.total.toLocaleString('es-CL')}
                    centerCaption={`solicitudes en ${patenteYear}`}
                  />
                </div>
              </div>
              <p className="max-w-none text-gri-body leading-[1.5] text-[#E8F1FC]">
                También puedes ver cómo se solicita una patente en Chile, con plazos, tasas y requisitos.{' '}
                <Link
                  href="/patentes"
                  className="font-medium text-white underline underline-offset-4 hover:text-[#A1D1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  Consulta las patentes
                </Link>
                .
              </p>
            </>
          )}
        </ContainerGRI>
      </TooltipProvider>
    </section>
  )
}
