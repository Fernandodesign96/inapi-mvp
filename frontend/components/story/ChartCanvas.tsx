'use client'

import {
  ArcElement,
  BarElement,
  CategoryScale,
  Chart as ChartJS,
  Filler,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  type ChartData,
  type ChartOptions,
} from 'chart.js'
import { Bar, Doughnut, Line } from 'react-chartjs-2'
import { useReducedMotion } from 'framer-motion'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { STORY_PALETTE, type ChartKind, type ChartSeries } from '@/components/story/chart-palette'

ChartJS.register(ArcElement, BarElement, CategoryScale, Filler, LinearScale, LineElement, PointElement, Tooltip)

export function ChartCanvas({
  kind,
  labels,
  series,
  tone,
  unit,
  stacked = false,
  ariaLabel,
}: {
  kind: ChartKind
  labels: string[]
  series: ChartSeries[]
  tone: 'night' | 'paper'
  unit?: string
  stacked?: boolean
  ariaLabel: string
}) {
  const { locale, tx } = useI18n()
  const reduce = useReducedMotion()
  const palette = STORY_PALETTE[tone]
  const night = tone === 'night'
  const tick = night ? '#D6E4F5' : '#4B5563'
  const grid = night ? 'rgba(255,255,255,0.08)' : 'rgba(15,105,196,0.08)'
  const fmt = (n: number) => n.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL')
  const translatedLabels = labels.map(l => tx(l))

  const tooltip = {
    backgroundColor: '#092039',
    borderColor: 'rgba(255,255,255,0.16)',
    borderWidth: 1,
    titleColor: '#FFFFFF',
    bodyColor: '#F4F7FB',
    padding: 10,
    cornerRadius: 8,
    callbacks: {
      label: (ctx: { dataset: { label?: string }; parsed: number | { y: number } }) => {
        const v = typeof ctx.parsed === 'number' ? ctx.parsed : ctx.parsed.y
        return ` ${tx(ctx.dataset.label ?? '')}: ${fmt(v)}${unit ? ` ${tx(unit)}` : ''}`
      },
    },
  }

  const common = {
    responsive: true,
    maintainAspectRatio: false,
    animation: reduce ? (false as const) : { duration: 700 },
  }

  if (kind === 'doughnut') {
    const s = series[0]
    const data: ChartData<'doughnut'> = {
      labels: translatedLabels,
      datasets: [
        {
          label: s.label,
          data: s.data,
          backgroundColor: s.data.map((_, i) => palette[i % palette.length]),
          borderWidth: 0,
          hoverOffset: 6,
        },
      ],
    }
    const options: ChartOptions<'doughnut'> = {
      ...common,
      cutout: '70%',
      plugins: { legend: { display: false }, tooltip: tooltip as never },
    }
    return <Doughnut data={data} options={options} role="img" aria-label={ariaLabel} />
  }

  const scales = {
    x: {
      stacked,
      grid: { display: false },
      border: { color: grid },
      ticks: { color: tick, font: { size: 12 } },
    },
    y: {
      stacked,
      beginAtZero: true,
      grid: { color: grid },
      border: { display: false },
      ticks: {
        color: tick,
        font: { size: 12 },
        callback: (v: string | number) => {
          const n = Number(v)
          return n >= 1000 ? `${fmt(Math.round(n / 1000))}${locale === 'en' ? 'k' : ' mil'}` : fmt(n)
        },
      },
    },
  }

  if (kind === 'line') {
    const data: ChartData<'line'> = {
      labels: translatedLabels,
      datasets: series.map((s, i) => {
        const color = s.color ?? palette[i % palette.length]
        return {
          label: s.label,
          data: s.data,
          borderColor: color,
          backgroundColor: `${color}2E`,
          fill: series.length === 1,
          tension: 0.35,
          borderWidth: 2.5,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: night ? '#FFBE5C' : color,
          pointBorderColor: night ? '#092039' : '#FFFFFF',
          pointBorderWidth: 2,
        }
      }),
    }
    const options: ChartOptions<'line'> = {
      ...common,
      interaction: { mode: 'index', intersect: false },
      plugins: { legend: { display: false }, tooltip: tooltip as never },
      scales,
    }
    return <Line data={data} options={options} role="img" aria-label={ariaLabel} />
  }

  const data: ChartData<'bar'> = {
    labels: translatedLabels,
    datasets: series.map((s, i) => ({
      label: s.label,
      data: s.data,
      backgroundColor: s.color ?? palette[i % palette.length],
      borderRadius: 8,
      borderSkipped: false,
      maxBarThickness: 44,
    })),
  }
  const options: ChartOptions<'bar'> = {
    ...common,
    interaction: { mode: 'index', intersect: false },
    plugins: { legend: { display: false }, tooltip: tooltip as never },
    scales,
  }
  return <Bar data={data} options={options} role="img" aria-label={ariaLabel} />
}
