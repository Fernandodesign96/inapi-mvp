import Link from 'next/link'
import { FileText, Landmark, Lightbulb, Stamp, Users, Wallet } from 'lucide-react'
import { ChartCard, type ChartView } from '@/components/story/ChartCard'
import { SectionTabs } from '@/components/story/SectionTabs'
import { StorySection } from '@/components/story/StorySection'
import {
  FUENTE_REPORTE_ANUAL_2025,
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

const pct = (a: number, b: number) => `${Math.round((a / (a + b)) * 100)} %`
const SOURCE = { label: 'Reportes de INAPI y Cuenta Pública 2025', href: FUENTE_REPORTE_ANUAL_2025 }

export const marcasPorAnio: ChartView[] = [
  {
    id: 'serie',
    label: '2020-2025',
    labels: MARCAS_MULTICLASE.map(d => d.anio),
    series: [{ label: 'Solicitudes de marca', data: MARCAS_MULTICLASE.map(d => d.solicitudes) }],
  },
]

export const marcasOrigenViews: ChartView[] = MARCAS_ORIGEN_YEARS.map(y => {
  const d = MARCAS_ORIGEN[y]
  return {
    id: y,
    label: y,
    labels: ['Residentes', 'No residentes'],
    series: [{ label: 'Solicitudes', data: [d.residentes, d.noResidentes] }],
    center: { value: pct(d.residentes, d.noResidentes), caption: 'presentadas por residentes' },
  }
})

export const marcasMadridViews: ChartView[] = MARCAS_NO_RESIDENTES_YEARS.map(y => {
  const d = MARCAS_NO_RESIDENTES_UNICLASE[y]
  return {
    id: y,
    label: y,
    labels: ['Protocolo de Madrid', 'Vía nacional'],
    series: [{ label: 'Solicitudes', data: [d.madrid, d.nacional] }],
    center: { value: pct(d.madrid, d.nacional), caption: 'por Protocolo de Madrid' },
  }
})

export const patentesPorAnio: ChartView[] = [
  {
    id: 'serie',
    label: '2023-2025',
    labels: PATENTES_TOTAL.map(d => d.anio),
    series: [{ label: 'Solicitudes de patente', data: PATENTES_TOTAL.map(d => d.solicitudes) }],
  },
]

export const patentesTipoViews: ChartView[] = PATENTES_TIPO_YEARS.map(y => {
  const d = PATENTES_POR_TIPO[y]
  return {
    id: y,
    label: y,
    labels: ['Invenciones', 'Diseños industriales', 'Modelos de utilidad'],
    series: [{ label: 'Solicitudes', data: [d.invencion, d.diseno, d.modeloUtilidad] }],
    center: { value: d.total.toLocaleString('es-CL'), caption: `solicitudes en ${y}` },
  }
})

export const patentesOrigenViews: ChartView[] = PATENTES_ORIGEN_YEARS.map(y => {
  const d = PATENTES_ORIGEN[y]
  return {
    id: y,
    label: y,
    labels: ['No residentes', 'Residentes'],
    series: [{ label: 'Solicitudes', data: [d.noResidentes, d.residentes] }],
    center: { value: pct(d.residentes, d.noResidentes), caption: 'presentadas por residentes' },
  }
})

export function HomeStats() {
  return (
    <StorySection
      tone="night"
      align="left"
      leadSingleLine
      eyebrow="Datos abiertos"
      dot="focus"
      title="Así crece la propiedad industrial en Chile"
      lead="INAPI recibió 275.987 solicitudes de marca entre 2020 y 2025 y 12.286 de patente entre 2023 y 2025. Elige un año para ver el detalle."
    >
      <SectionTabs
        tone="night"
        label="Tipo de volumen"
        tabs={[
          {
            id: 'marcas',
            label: 'Marcas',
            icon: <Stamp />,
            content: (
              <div className="grid gap-gob-5 min-[1100px]:grid-cols-3">
                <ChartCard
                  className="min-[1100px]:col-span-3"
                  kind="bar"
                  tone="night"
                  title="Solicitudes de marca por año"
                  description="Cada solicitud cuenta una vez, aunque incluya varias clases de productos o servicios."
                  views={marcasPorAnio}
                  unit="solicitudes"
                  source={SOURCE}
                  height={280}
                />
                <ChartCard
                  className="min-[1100px]:col-span-1"
                  kind="doughnut"
                  tone="night"
                  title="Origen de las solicitudes"
                  description="Residentes en Chile frente a no residentes, conteo uniclase."
                  views={marcasOrigenViews}
                />
                <ChartCard
                  className="min-[1100px]:col-span-1"
                  kind="doughnut"
                  tone="night"
                  title="Marcas de no residentes"
                  description="Vía nacional frente a Protocolo de Madrid, conteo uniclase."
                  views={marcasMadridViews}
                />
                <div className="story-glass story-glass-interactive flex flex-col justify-between gap-gob-4 rounded-gob-xl p-gob-6 text-white">
                  <div className="space-y-gob-4">
                    <p className="font-heading text-[1.25rem] font-medium leading-[1.35]">
                      Cómo INAPI ejecuta su presupuesto
                    </p>
                    <ul className="space-y-gob-3 text-gri-body-sm text-white/85">
                      <li className="flex gap-gob-3">
                        <Wallet className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Ejecución del gasto por subtítulo, con cifras oficiales del año.</span>
                      </li>
                      <li className="flex gap-gob-3">
                        <Users className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Dotación de personas y cargos que sostienen el servicio.</span>
                      </li>
                      <li className="flex gap-gob-3">
                        <Landmark className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Estados financieros y compras públicas de la institución.</span>
                      </li>
                      <li className="flex gap-gob-3">
                        <FileText className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Documentos de transparencia para revisar y descargar.</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/transparencia/gasto-presupuestario"
                    className="inline-flex min-h-11 items-center font-medium text-white underline underline-offset-4 hover:text-[#A1D1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    Consulta el gasto presupuestario
                  </Link>
                </div>
              </div>
            ),
          },
          {
            id: 'patentes',
            label: 'Patentes',
            icon: <Lightbulb />,
            content: (
              <div className="grid gap-gob-5 min-[1100px]:grid-cols-3">
                <ChartCard
                  className="min-[1100px]:col-span-3"
                  kind="line"
                  tone="night"
                  title="Solicitudes de patente por año"
                  description="Incluye invenciones, diseños, modelos de utilidad y solicitudes provisionales publicadas por INAPI."
                  views={patentesPorAnio}
                  unit="solicitudes"
                  source={SOURCE}
                  height={280}
                />
                <ChartCard
                  kind="doughnut"
                  tone="night"
                  title="Patentes por tipo"
                  description="Invenciones, diseños industriales y modelos de utilidad."
                  views={patentesTipoViews}
                />
                <ChartCard
                  kind="doughnut"
                  tone="night"
                  title="Origen de las solicitudes"
                  description="Residentes en Chile frente a no residentes."
                  views={patentesOrigenViews}
                />
                <div className="story-glass story-glass-interactive flex flex-col justify-between gap-gob-4 rounded-gob-xl p-gob-6 text-white">
                  <div className="space-y-gob-4">
                    <p className="font-heading text-[1.25rem] font-medium leading-[1.35]">
                      Cómo se solicita una patente en Chile
                    </p>
                    <ul className="space-y-gob-3 text-gri-body-sm text-white/85">
                      <li className="flex gap-gob-3">
                        <FileText className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Requisitos de la solicitud: descripción, reivindicaciones y dibujos.</span>
                      </li>
                      <li className="flex gap-gob-3">
                        <Landmark className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Tasas oficiales y etapas de pago durante el trámite.</span>
                      </li>
                      <li className="flex gap-gob-3">
                        <Lightbulb className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Plazos de examen y duración de la protección una vez concedida.</span>
                      </li>
                      <li className="flex gap-gob-3">
                        <Stamp className="mt-0.5 size-4 shrink-0 text-[#A1D1FF]" aria-hidden />
                        <span>Diferencia con una marca: la patente cubre la invención, no el nombre.</span>
                      </li>
                    </ul>
                  </div>
                  <Link
                    href="/patentes"
                    className="inline-flex min-h-11 items-center font-medium text-white underline underline-offset-4 hover:text-[#A1D1FF] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                  >
                    Consulta las patentes
                  </Link>
                </div>
              </div>
            ),
          },
        ]}
      />
    </StorySection>
  )
}
