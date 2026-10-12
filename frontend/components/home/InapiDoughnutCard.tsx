'use client'

import { useMemo } from 'react'
import { ArcElement, Chart as ChartJS, Tooltip as ChartTooltip, type ChartOptions } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { Tabs } from 'radix-ui'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

ChartJS.register(ArcElement, ChartTooltip)

export type DoughnutSlice = {
  label: string
  value: number
  color: string
  hint: string
}

type InapiDoughnutCardProps = {
  years: readonly string[]
  year: string
  onYearChange: (year: string) => void
  slices: DoughnutSlice[]
  centerLabel: string
  centerCaption: string
}

export function InapiDoughnutCard({
  years,
  year,
  onYearChange,
  slices,
  centerLabel,
  centerCaption,
}: InapiDoughnutCardProps) {
  const { tx, locale } = useI18n()
  const valuesKey = slices.map(slice => slice.value).join('-')
  const data = useMemo(
    () => ({
      labels: slices.map(slice => slice.label),
      datasets: [
        {
          data: slices.map(slice => slice.value),
          backgroundColor: slices.map(slice => slice.color),
          borderWidth: 0,
          hoverOffset: 4,
        },
      ],
    }),
    [slices],
  )

  const options: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '72%',
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#092039',
        borderColor: 'rgba(255,255,255,0.16)',
        borderWidth: 1,
        titleColor: '#FFFFFF',
        bodyColor: '#F4F7FB',
        padding: 10,
        callbacks: {
          label: context => {
            const slice = slices[context.dataIndex]
            if (!slice) return ''
            return ` ${slice.value.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL')} ${tx('solicitudes')}`
          },
        },
      },
    },
  }

  return (
    <article
      className="flex h-full min-h-[18rem] min-w-0 flex-col overflow-hidden rounded-gob-lg border border-white/12 bg-[#07182b] p-gob-5"
    >
      <Tabs.Root value={year} onValueChange={onYearChange}>
        <Tabs.List
          aria-label={tx('Año de las cifras')}
          className="ml-auto inline-flex rounded-gob-md border border-white/16 p-0.5"
        >
          {years.map(item => (
            <Tabs.Trigger
              key={item}
              value={item}
              onClick={() => onYearChange(item)}
              className={cn(
                'min-h-8 rounded-gob-sm px-gob-2 text-gri-body-xs font-medium text-[#C5D4E8]',
                'data-[state=active]:bg-white/12 data-[state=active]:text-white',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              )}
            >
              {item}
            </Tabs.Trigger>
          ))}
        </Tabs.List>
      </Tabs.Root>
      <div className="relative mx-auto mt-gob-3 size-[11.5rem]">
        <Doughnut key={`${year}-${valuesKey}`} data={data} options={options} />
        <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="font-heading text-[1.35rem] font-bold leading-none text-white">{centerLabel}</p>
          <p className="mt-1 max-w-[6.5rem] text-[0.65rem] leading-tight text-[#A1D1FF]">{tx(centerCaption)}</p>
        </div>
      </div>
      <ul className="mt-gob-4 flex flex-1 flex-col justify-end gap-gob-2">
        {slices.map(slice => (
          <li key={`${slice.label}-${slice.value}`}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  type="button"
                  className="flex w-full items-center gap-gob-2 text-left text-gri-body-xs text-[#C5D4E8] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  <span
                    className="size-2.5 shrink-0 rounded-full"
                    style={{ backgroundColor: slice.color }}
                    aria-hidden
                  />
                  <span className="flex-1">{tx(slice.label)}</span>
                  <span className="font-medium text-white">{slice.value.toLocaleString(locale === 'en' ? 'en-US' : 'es-CL')}</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="top" className="max-w-xs">
                {tx(slice.hint)}
              </TooltipContent>
            </Tooltip>
          </li>
        ))}
      </ul>
    </article>
  )
}
