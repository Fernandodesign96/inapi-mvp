'use client'

import { useState } from 'react'
import { CalendarClock, FileSearch, Lightbulb, Search, ShieldCheck, Stamp, TrendingUp } from 'lucide-react'
import { StoryHero } from '@/components/story/StoryHero'
import { StatTile } from '@/components/story/StatTile'
import { PiSeal } from '@/components/story/PiSeal'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { MARCAS_MULTICLASE, PATENTES_TOTAL } from '@/lib/inapi-official-stats'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

const SHORTCUTS = [
  { href: '/marcas/como-registrar', label: '¿Cómo registrar una marca?', hint: 'Pasos, plazos y tasas para una marca', icon: Stamp },
  { href: '/patentes/como-registrar', label: '¿Cómo patentar una invención?', hint: 'Pasos, plazos y tasas para una patente', icon: Lightbulb },
  { href: '/marcas/buscador-similitud', label: 'Buscador de marcas', hint: 'Compara tu signo con marcas ya solicitadas', icon: Search },
  { href: '/tramites/patentes/buscador', label: 'Buscador de patentes', hint: 'Consulta solicitudes y registros publicados', icon: FileSearch },
] as const

function peakYear(series: readonly { anio: string; solicitudes: number }[]) {
  return series.reduce((best, row) => (row.solicitudes > best.solicitudes ? row : best))
}

const MARCAS_PEAK = peakYear(MARCAS_MULTICLASE)
const PATENTES_PEAK = peakYear(PATENTES_TOTAL)

const PANELS = {
  marcas: [
    {
      value: 50388,
      label: 'Solicitudes de marca en 2025',
      icon: <TrendingUp />,
      delta: { value: 13.4, label: 'más que en 2024' },
      caption: 'vs. 2024',
    },
    {
      value: 10,
      suffix: ' años',
      label: 'Vigencia de una marca',
      icon: <CalendarClock />,
      detail: 'Puedes renovarlo dentro de los 6 meses anteriores o posteriores al vencimiento.',
    },
    {
      value: 97,
      suffix: '%',
      label: 'Marcas resueltas en menos de 7 meses',
      icon: <ShieldCheck />,
      caption: 'Cuenta Pública 2025',
    },
    {
      value: 275987,
      label: 'Solicitudes de marca 2020-2025',
      icon: <Stamp />,
      detail: `Año con más solicitudes: ${MARCAS_PEAK.anio}.`,
    },
  ],
  patentes: [
    {
      value: 4189,
      label: 'Solicitudes de patente en 2025',
      icon: <TrendingUp />,
      delta: { value: 2.1, label: 'más que en 2024' },
      caption: 'vs. 2024',
    },
    {
      value: 20,
      suffix: ' años',
      label: 'Vigencia de una patente de invención',
      icon: <CalendarClock />,
      detail: 'Hasta 20 años desde la presentación. A cambio, publicas cómo funciona tu invento.',
    },
    {
      value: 91.8,
      suffix: '%',
      decimals: 1,
      label: 'En trámite con 3 años o menos',
      icon: <ShieldCheck />,
      caption: 'Cuenta Pública 2025',
    },
    {
      value: 12286,
      label: 'Solicitudes de patente 2023-2025',
      icon: <Lightbulb />,
      detail: `Año con más solicitudes: ${PATENTES_PEAK.anio}.`,
    },
  ],
} as const

function KpiPanel() {
  const { tx } = useI18n()
  const [panel, setPanel] = useState<keyof typeof PANELS>('marcas')
  return (
    <div className="story-glass relative overflow-hidden rounded-[1.75rem] p-gob-4 shadow-elevation-05 min-[905px]:p-gob-6">
      <div className="mb-gob-5 flex flex-wrap items-center justify-between gap-gob-3">
        <div className="flex items-center gap-gob-3">
          <PiSeal center="CL" caption="INAPI" size={44} className="text-white/70" />
          <div>
            <p className="text-gri-body-sm font-semibold text-white">{tx('INAPI en cifras')}</p>
            <p className="text-gri-body-xs text-white/70">{tx('Datos publicados en la Cuenta Pública y el Reporte anual 2025')}</p>
          </div>
        </div>
        <div role="group" aria-label={tx('Cifras de marcas y patentes')} className="inline-flex rounded-full border border-white/16 bg-white/6 p-1">
          {(['marcas', 'patentes'] as const).map(id => (
            <button
              key={id}
              type="button"
              aria-pressed={panel === id}
              onClick={() => setPanel(id)}
              className={cn(
                'inline-flex min-h-10 items-center gap-gob-2 rounded-full px-gob-4 text-gri-body-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                panel === id ? 'bg-white text-[#092039]' : 'text-white/80 hover:text-white',
              )}
            >
              {id === 'marcas' ? <Stamp className="size-4" aria-hidden /> : <Lightbulb className="size-4" aria-hidden />}
              {tx(id === 'marcas' ? 'Marcas' : 'Patentes')}
            </button>
          ))}
        </div>
      </div>
      <div key={panel} className="grid gap-gob-3 min-[600px]:grid-cols-2 min-[1100px]:grid-cols-4">
        {PANELS[panel].map(stat => (
          <StatTile
            key={stat.label}
            tone="glass"
            value={stat.value}
            label={tx(stat.label)}
            suffix={'suffix' in stat ? tx(stat.suffix) : ''}
            decimals={'decimals' in stat ? stat.decimals : 0}
            icon={stat.icon}
            delta={'delta' in stat ? { value: stat.delta.value, label: tx(stat.delta.label) } : undefined}
            caption={'caption' in stat ? tx(stat.caption) : undefined}
            detail={'detail' in stat ? tx(stat.detail) : undefined}
          />
        ))}
      </div>
    </div>
  )
}

export function HomeHero() {
  const { tx } = useI18n()
  return (
    <StoryHero
      eyebrow="Instituto Nacional de Propiedad Industrial"
      eyebrowStyle="subtle"
      primaryVariant="conversion"
      title={tx('Impulsa el valor de tus ideas con el registro oficial de INAPI')}
      lead={tx(
        'INAPI es el organismo público que registra y protege marcas, patentes y diseños en Chile. Ese respaldo legal ayuda a que las ideas y creaciones se conviertan en innovación.',
      )}
      primary={{ href: '/tramites', label: tx('Ingresa y realiza tus trámites') }}
      secondary={{ href: '/tramites-digitales', label: tx('Conoce todos los trámites') }}
      aside={
        <nav aria-label={tx('Atajos')} className="grid gap-gob-3 min-[600px]:grid-cols-2">
          {SHORTCUTS.map(item => {
            const Icon = item.icon
            return (
              <TramitesLink
                key={item.href}
                href={item.href}
                className="story-lift group flex min-h-[5.5rem] flex-col justify-between gap-gob-3 rounded-gob-xl bg-white/8 p-gob-4 text-white ring-1 ring-white/16 transition-colors hover:bg-white hover:text-[#092039] hover:ring-white focus-visible:bg-white focus-visible:text-[#092039] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
              >
                <span
                  aria-hidden
                  className="inline-flex size-8 items-center justify-center rounded-full bg-white/12 text-white transition-colors group-hover:bg-[#092039] group-hover:text-white group-focus-visible:bg-[#092039] group-focus-visible:text-white"
                >
                  <Icon className="size-4" />
                </span>
                <span>
                  <span className="block font-heading text-[1rem] font-medium leading-tight">{tx(item.label)}</span>
                  <span className="mt-1 block text-gri-body-xs text-white/72 transition-colors group-hover:text-[#374151] group-focus-visible:text-[#374151]">
                    {tx(item.hint)}
                  </span>
                </span>
              </TramitesLink>
            )
          })}
        </nav>
      }
      panel={<KpiPanel />}
    />
  )
}
