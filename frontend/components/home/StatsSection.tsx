'use client'

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
import { CounterStat } from '@/components/portal/CounterStat'
import { useI18n } from '@/lib/i18n/LocaleProvider'

const serie = [
  { anio: '2022', solicitudes: 42100 },
  { anio: '2023', solicitudes: 45800 },
  { anio: '2024', solicitudes: 49200 },
  { anio: '2025', solicitudes: 52300 },
  { anio: '2026', solicitudes: 50100 },
]

export function StatsSection() {
  const { locale } = useI18n()
  const formatMiles = (value: number) =>
    locale === 'en' ? `${Math.round(value / 1000)}k` : `${Math.round(value / 1000)} mil`
  return (
    <section aria-labelledby="datos-title" className="py-gob-8 min-[905px]:py-20">
      <ContainerGRI size="wide" className="space-y-gob-8">
        <div className="max-w-4xl space-y-gob-4">
          <h2 id="datos-title" className="portal-h2 text-gob-text-inverse">
            Volumen de solicitudes de marcas 2022-2026
          </h2>
          <p className="portal-lead text-gob-text-inverse">
            Cifras de referencia del MVP para mostrar el orden de magnitud del trabajo de INAPI. No reemplazan las
            estadísticas oficiales publicadas en el centro de documentación.
          </p>
        </div>
        <ul className="grid list-none gap-gob-4 min-[600px]:grid-cols-2 min-[1280px]:grid-cols-4">
          <li>
            <CounterStat tone="light" end={50} suffix=".000+" label="Marcas presentadas al año, cifra de referencia." />
          </li>
          <li>
            <CounterStat tone="light" end={10} suffix=" años" label="Vigencia de una marca, renovable al vencimiento." />
          </li>
          <li>
            <CounterStat tone="light" end={3} label="Etapas habituales de una marca: forma, publicación y fondo." />
          </li>
          <li>
            <CounterStat tone="light" end={20} suffix=" años" label="Tope de una patente de invención, desde la presentación." />
          </li>
        </ul>
        <div className="h-80 rounded-gob-lg border border-white/12 bg-[#07182b] p-gob-5 min-[905px]:p-gob-6">
          <p className="mb-gob-4 text-gri-body-sm font-medium text-gob-text-inverse">
            Miles de solicitudes de marca por año (serie ilustrativa)
          </p>
          <ResponsiveContainer width="100%" height="88%">
            <AreaChart data={serie} margin={{ top: 8, right: 12, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="solicitudesFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#7EB6FF" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#7EB6FF" stopOpacity={0.02} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
              <XAxis
                dataKey="anio"
                tick={{ fill: '#F4F7FB', fontSize: 12 }}
                axisLine={{ stroke: 'rgba(255,255,255,0.2)' }}
                tickLine={false}
              />
              <YAxis
                tick={{ fill: '#C5D4E8', fontSize: 12 }}
                tickFormatter={formatMiles}
                axisLine={false}
                tickLine={false}
                width={52}
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
                  locale === 'en' ? 'Trademarks' : 'Marcas',
                ]}
              />
              <Area
                type="monotone"
                dataKey="solicitudes"
                stroke="#7EB6FF"
                strokeWidth={2.5}
                fill="url(#solicitudesFill)"
                dot={{ r: 4, fill: '#FFBE5C', stroke: '#092039', strokeWidth: 2 }}
                activeDot={{ r: 6, fill: '#FFBE5C' }}
                name={locale === 'en' ? 'Applications' : 'Solicitudes'}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </ContainerGRI>
    </section>
  )
}
