'use client'

import { useCallback, useEffect, useState } from 'react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { SectionPills, SectionSubnav } from '@/components/portal/SectionPills'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'
import { PortalLinkList, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { DIRECTRICES_MARCAS } from '@/lib/directrices-marcas'

const PILLS = [
  { id: 'directrices', label: 'Directrices' },
  { id: 'reportes', label: 'Reportes y guías' },
  { id: 'informes', label: 'Informes' },
  { id: 'legislacion', label: 'Legislación' },
  { id: 'balance', label: 'Balance' },
  { id: 'estudios', label: 'Estudios' },
  { id: 'opendata', label: 'Open Data' },
  { id: 'estadisticas', label: 'Estadísticas' },
] as const

type PillId = (typeof PILLS)[number]['id']

const HASH: Record<string, { pill: PillId; sub?: string }> = {
  directrices: { pill: 'directrices', sub: 'marcas' },
  marcas: { pill: 'directrices', sub: 'marcas' },
  patentes: { pill: 'directrices', sub: 'patentes' },
  reportes: { pill: 'reportes' },
  'reportes-y-guias': { pill: 'reportes' },
  informes: { pill: 'informes' },
  legislacion: { pill: 'legislacion', sub: 'leyes' },
  circulares: { pill: 'legislacion', sub: 'circulares' },
  resoluciones: { pill: 'legislacion', sub: 'resoluciones' },
  balance: { pill: 'balance' },
  estudios: { pill: 'estudios' },
  opendata: { pill: 'opendata' },
  'open-data': { pill: 'opendata' },
  estadisticas: { pill: 'estadisticas', sub: 'est-marcas' },
  'est-marcas': { pill: 'estadisticas', sub: 'est-marcas' },
  'est-patentes': { pill: 'estadisticas', sub: 'est-patentes' },
  'est-mu': { pill: 'estadisticas', sub: 'est-mu' },
  'est-disenos': { pill: 'estadisticas', sub: 'est-disenos' },
  'est-pct': { pill: 'estadisticas', sub: 'est-pct' },
}

export function DocumentacionHub({ initialTab = 'legislacion' }: { initialTab?: PillId }) {
  const [pill, setPill] = useState<PillId>(initialTab)
  const [sub, setSub] = useState(
    initialTab === 'directrices' ? 'marcas' : initialTab === 'estadisticas' ? 'est-marcas' : 'leyes',
  )

  const applyHash = useCallback(() => {
    const raw = window.location.hash.replace('#', '').toLowerCase()
    const mapped = HASH[raw]
    if (!mapped) return
    setPill(mapped.pill)
    if (mapped.sub) setSub(mapped.sub)
  }, [])

  useEffect(() => {
    const frame = window.requestAnimationFrame(applyHash)
    window.addEventListener('hashchange', applyHash)
    return () => {
      window.cancelAnimationFrame(frame)
      window.removeEventListener('hashchange', applyHash)
    }
  }, [applyHash])

  function selectPill(id: string) {
    const next = id as PillId
    setPill(next)
    const nextSub =
      next === 'directrices' ? 'marcas' : next === 'legislacion' ? 'leyes' : next === 'estadisticas' ? 'est-marcas' : sub
    setSub(nextSub)
    window.history.replaceState(null, '', `#${next}`)
  }

  function selectSub(id: string) {
    setSub(id)
    window.history.replaceState(null, '', `#${id}`)
  }

  const subItems =
    pill === 'directrices'
      ? [
          { id: 'marcas', label: 'Marcas' },
          { id: 'patentes', label: 'Patentes' },
        ]
      : pill === 'legislacion'
        ? [
            { id: 'circulares', label: 'Circulares' },
            { id: 'resoluciones', label: 'Resoluciones' },
          ]
        : pill === 'estadisticas'
          ? [
              { id: 'est-marcas', label: 'Marcas' },
              { id: 'est-patentes', label: 'Patentes' },
              { id: 'est-mu', label: 'Modelo de utilidad' },
              { id: 'est-disenos', label: 'Diseños' },
              { id: 'est-pct', label: 'Tratado de Cooperación en Materia de Patentes' },
            ]
          : []

  return (
    <div className="space-y-gob-5">
      <div className="overflow-hidden rounded-gob-md border border-gob-border bg-card">
        <div className="p-gob-4">
          <SectionPills items={[...PILLS]} active={pill} onSelect={selectPill} ariaLabel="Centro de documentación" />
        </div>
        {subItems.length ? <SectionSubnav items={subItems} active={sub} onSelect={selectSub} /> : null}
      </div>
      {pill === 'directrices' && sub === 'marcas' ? <DirectricesMarcas /> : null}
      {pill === 'directrices' && sub === 'patentes' ? <DirectricesPatentes /> : null}
      {pill === 'reportes' ? <ReportesPanel /> : null}
      {pill === 'informes' ? <InformesPanel /> : null}
      {pill === 'legislacion' && sub === 'circulares' ? <CircularesPanel /> : null}
      {pill === 'legislacion' && sub === 'resoluciones' ? <ResolucionesPanel /> : null}
      {pill === 'legislacion' && sub !== 'circulares' && sub !== 'resoluciones' ? <LeyesPanel /> : null}
      {pill === 'balance' ? <BalancePanel /> : null}
      {pill === 'estudios' ? <EstudiosPanel /> : null}
      {pill === 'opendata' ? <OpenDataPanel /> : null}
      {pill === 'estadisticas' ? <EstadisticasPanel serie={sub} /> : null}
    </div>
  )
}

function LeyesPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Leyes</PortalSectionTitle>
      <PortalLinkList
        links={[
          { href: 'https://www.bcn.cl/leychile/navegar?idNorma=30306', label: 'Ley N.° 19.039, de Propiedad Industrial' },
          { href: 'https://www.bcn.cl/leychile/navegar?idNorma=268314', label: 'Ley N.° 20.254, que establece INAPI' },
        ]}
      />
      <PortalSectionTitle>Reglamento</PortalSectionTitle>
      <PortalLinkList
        links={[{ href: 'https://www.bcn.cl/leychile/navegar?idNorma=1033348', label: 'Reglamento de la Ley N.° 19.039' }]}
      />
    </div>
  )
}

function CircularesPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Circulares</PortalSectionTitle>
      <div className="space-y-gob-3">
        <PortalPdfLink
          href="https://www.inapi.cl/docs/default-source/2023/centro-de-documentacion/legislacion/circulares/oficio-2023.pdf?sfvrsn=4c5b417e_2"
          title="Oficio 2023"
          size="PDF"
        />
        <PortalPdfLink
          href="https://www.inapi.cl/docs/default-source/2022/centro-documentacion/circulares/circular.pdf?sfvrsn=b99a6e99_2"
          title="Oficio Circular 524"
          size="PDF"
        />
      </div>
    </div>
  )
}

function ResolucionesPanel() {
  const items = [
    {
      group: 'Normas comunes',
      docs: [
        {
          title: 'Resolución Exenta N.° 138 — Tramitación electrónica marcas y patentes',
          href: 'https://www.inapi.cl/docs/default-source/2025-doc/centro-documentacion/legislaciones/resoluciones/resoluci%C3%B3n-exenta-n-138---tramitaci%C3%B3n-electr%C3%B3nica-marcas---patentes.pdf',
        },
      ],
    },
    {
      group: 'Marcas',
      docs: [
        { title: 'Resolución Exenta N.° 391', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/resoluciones/rex-391_2016.pdf?sfvrsn=a998402e_2' },
        { title: 'Resolución Exenta N.° 185 — Tasa individual Madrid', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/resoluciones/rex_185_22_informa_tasa_individual_madrid.pdf?sfvrsn=4cedb671_2' },
        { title: 'Resolución Exenta N.° 184 — Instructivo Madrid', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/resoluciones/rex_184_22_aprueba_instructivo_madrid.pdf?sfvrsn=2f16437a_2' },
        { title: 'Resolución Exenta N.° 140 — Marcas colectivas y de certificación', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/marcas/resolucion_140_instructivo_marcas_colectivas_y_de_certificacion.pdf?sfvrsn=eb2d39bb_2' },
        { title: 'Resolución Exenta N.° 135 — Instructivo de tramitación de marcas', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/marcas/resolucion_135_aprueba_instructivo_de_tramitacion_marcas.pdf?sfvrsn=614a4651_2' },
      ],
    },
    {
      group: 'Patentes',
      docs: [
        { title: 'Resolución Exenta N.° 357 — Diario Oficial 28-09-2026', href: 'https://www.inapi.cl/docs/default-source/2025-doc/centro-documentacion/legislaciones/resoluciones/do-28-09-2026.pdf?sfvrsn=26a4bbee_1' },
        { title: 'Resolución Exenta N.° 441 — Arancel pericial', href: 'https://www.inapi.cl/docs/default-source/2024/centro-de-documentacion/legislacion/resoluciones/re-ex-441-2024-arancel-pericial.pdf?sfvrsn=f9632e93_4' },
        { title: 'Resolución Exenta N.° 428 — Instructivo de tramitación de patentes', href: 'https://www.inapi.cl/docs/default-source/2023/centro-de-documentacion/legislacion/resoluciones/patentes/resoluci%C3%B3n-exenta-n-428-instructivo-tramitaci%C3%B3n-en-materia-de-patentes-deja-sin-efecto-res-137.pdf?sfvrsn=b459a7d9_2' },
        { title: 'Resolución Exenta N.° 141 — Tasas de restablecimiento y restauración', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/patentes/resolucion_141_fija_nuevas_tasas_de_restablecimiento_de_derecho_y_restauracion.pdf?sfvrsn=a15c890_6' },
        { title: 'Resolución Exenta N.° 139 — Sistema de peritos', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/patentes/resolucion_139_sistema_de_peritos.pdf?sfvrsn=916eb639_4' },
        { title: 'Resolución Exenta N.° 136 — Extensión de vigencia de dibujos y diseños', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/legislacion/patentes/resolucion_136_regula_extension_de_vigencia_de_registros_de_dibujos_y_disenos_industriales.pdf?sfvrsn=e9b703a3_2' },
        { title: 'Nómina asociada a la Resolución N.° 136', href: 'https://www.inapi.cl/docs/default-source/2024/centro-de-documentacion/legislacion/resoluciones/resoluci%C3%B3n-n-136--extensi%C3%B3n-vigencia-dibujos-y-dise%C3%B1os-industriales.pdf?sfvrsn=fc5c9bef_2' },
      ],
    },
  ]
  return (
    <div className="space-y-gob-6">
      {items.map(group => (
        <section key={group.group} className="space-y-gob-3">
          <PortalSectionTitle>{group.group}</PortalSectionTitle>
          {group.docs.map(doc => (
            <PortalPdfLink key={doc.href} href={doc.href} title={doc.title} size="PDF" />
          ))}
        </section>
      ))}
    </div>
  )
}

function DirectricesMarcas() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Directrices de marcas</PortalSectionTitle>
      <PortalProse>
        Estos capítulos son los de las Directrices de examen de marcas publicadas por INAPI. Cada archivo abre el PDF
        oficial.
      </PortalProse>
      <div className="space-y-gob-3">
        {DIRECTRICES_MARCAS.map(item => (
          <PortalPdfLink key={item.href} href={item.href} title={item.label} size="PDF" />
        ))}
      </div>
    </div>
  )
}

function DirectricesPatentes() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Directrices de patentes</PortalSectionTitle>
      <PortalPdfLink
        href="https://www.inapi.cl/docs/default-source/2022/centro-documentacion/directrices/patentes/directrices_de_examen_pi_mu_modif_nov_2022.pdf?sfvrsn=eaf1598f_2"
        title="Directrices de examen: invenciones y modelos de utilidad (noviembre 2022)"
        size="PDF"
      />
      <PortalPdfLink
        href="https://www.inapi.cl/docs/default-source/2022/centro-documentacion/directrices/patentes/directrices_de_examen_disenos_y_dibujos_20220531.pdf?sfvrsn=6ba306e5_2"
        title="Directrices de examen: diseños y dibujos industriales (31-05-2022)"
        size="PDF"
      />
    </div>
  )
}

function ReportesPanel() {
  const docs = [
    { title: 'Reporte INAPI 2025', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/libros-y-reportes/reportes/reporte-inapi-2025.pdf?sfvrsn=ce954dfa_1' },
    { title: 'Reporte INAPI 2024', href: 'https://www.inapi.cl/docs/default-source/2024/centro-de-documentacion/libros-y-reportes/inapi_reporte_2024_.pdf?sfvrsn=5682e0dc_1' },
    { title: 'Reporte INAPI 2023', href: 'https://www.inapi.cl/docs/default-source/2024/centro-de-documentacion/libros-y-reportes/reporte_inapi_2023-v07.pdf?sfvrsn=6e887ed1_2' },
    { title: 'Reporte INAPI 2022', href: 'https://www.inapi.cl/docs/default-source/2022/cuenta-publica/reporte-inapi/reporte_inapi_2022-versi%C3%B3n-final-para-publicar.pdf?sfvrsn=31b77076_2' },
    { title: 'Reporte INAPI 2021', href: 'https://www.inapi.cl/docs/default-source/2021/centro-de-documentacion/libros-y-reportes/reportes/reporte_inapi_2021.pdf?sfvrsn=8137ceb2_0' },
    { title: 'Reporte INAPI 2020', href: 'https://www.inapi.cl/docs/default-source/default-document-library/reporteinapi_2020.pdf?sfvrsn=5b259478_0' },
    { title: 'Reporte INAPI 2019', href: 'https://www.inapi.cl/docs/default-source/default-document-library/reporte_inapi_2019_ab58e9ae60a14a73b35c481cb79337ae.pdf?sfvrsn=87cc78b5_0' },
    { title: 'Reporte INAPI 2018', href: 'https://www.inapi.cl/docs/default-source/default-document-library/reporte_2018fb528fb097db4326833aa5c7db3a4b22.pdf?sfvrsn=2a28bd1b_0' },
    { title: 'Estrategia Nacional de Propiedad Industrial', href: 'https://www.inapi.cl/docs/default-source/default-document-library/estrategia-nacional-de-propiedad-industrial.pdf?sfvrsn=73fc5e67_0' },
    { title: 'PCT: preguntas frecuentes', href: 'https://www.inapi.cl/docs/default-source/2021/centro-de-documentacion/libros-y-reportes/pct_preguntas-frecuentes.pdf?sfvrsn=623fed0f_0' },
    { title: 'Guía de uso ePCT INAPI 2021', href: 'https://www.inapi.cl/docs/default-source/default-document-library/guiia_uso_epct-inapi_2021.pdf?sfvrsn=6dae0b53_0' },
    { title: 'Guía del usuario PCT Chile (3.ª versión)', href: 'https://www.inapi.cl/docs/default-source/2026-doc/pct/tramites/recursos/guia_usuario_pct_chile_3_version.pdf?sfvrsn=ac5eb634_1' },
  ]
  return (
    <div className="space-y-gob-3">
      <PortalSectionTitle>Reportes y guías</PortalSectionTitle>
      {docs.map(doc => (
        <PortalPdfLink key={doc.href} href={doc.href} title={doc.title} size="PDF" />
      ))}
    </div>
  )
}

function InformesPanel() {
  const docs = [
    { title: 'IDP N.° 145 — Patentes caducadas en Chile', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/informes/dominio-publico/idp-n-145-patentes-caducadas-en-chile.pdf?sfvrsn=2f8ed4e0_1' },
    { title: 'IDP N.° 144 — Tecnologías de la astronomía de dominio público', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/informes/dominio-publico/idp-n-144-tecnolog%C3%ADas-de-la-astronom%C3%ADa-de-dominio-p%C3%BAblico-en-chile-f-(1).pdf?sfvrsn=b726e83f_1' },
    { title: 'IDP N.° 143 — Modelos de utilidad caducados en Chile', href: 'https://www.inapi.cl/docs/default-source/2025-doc/centro-documentacion/informes/dominio-publico/idp-n-143-modelos-de-utilidad-caducados-en-chile.pdf?sfvrsn=9e9ab1cc_1' },
    { title: 'IDP N.° 142 — Patentes caducadas en Chile', href: 'https://www.inapi.cl/docs/default-source/2025-doc/centro-documentacion/informes/dominio-publico/idp-n-142-patentes-caducadas-en-chile.pdf?sfvrsn=836ec847_1' },
    { title: 'Informe DP 141', href: 'https://www.inapi.cl/docs/default-source/2024/centro-de-documentacion/informes/dominio-publico/informe_dp141.pdf?sfvrsn=cf13fc5d_1' },
    { title: 'Informe DP 140', href: 'https://www.inapi.cl/docs/default-source/2024/centro-de-documentacion/informes/dominio-publico/informedp140.pdf?sfvrsn=a94d9c34_1' },
    { title: 'Informe DP 139 — Caducadas', href: 'https://www.inapi.cl/docs/default-source/2023/centro-de-documentacion/informes/informe-de-dominio-publico/informe-dp-139-caducadas-p.pdf?sfvrsn=4257a37a_2' },
    { title: 'Informe DP 138', href: 'https://www.inapi.cl/docs/default-source/2023/centro-de-documentacion/informes/informe-de-dominio-publico/informe_dp_138.pdf?sfvrsn=d016e2cc_0' },
    { title: 'Informe DP 137', href: 'https://www.inapi.cl/docs/default-source/2023/centro-de-documentacion/informes/informe-de-dominio-publico/informe_dp_137.pdf?sfvrsn=a7c18b62_2' },
  ]
  return (
    <div className="space-y-gob-3">
      <PortalSectionTitle>Informes de dominio público</PortalSectionTitle>
      <PortalProse>Series de informes sobre tecnologías y derechos caducados, publicadas por INAPI.</PortalProse>
      {docs.map(doc => (
        <PortalPdfLink key={doc.href} href={doc.href} title={doc.title} size="PDF" />
      ))}
    </div>
  )
}

function BalancePanel() {
  const years = [
    ['2024', 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2024.pdf?sfvrsn=4882c7cb_1'],
    ['2023', 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2023.pdf?sfvrsn=c338df15_1'],
    ['2022', 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2022.pdf?sfvrsn=10928714_1'],
    ['2021', 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2021.pdf?sfvrsn=a38fdd9d_1'],
    ['2020', 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/balance/bgi_2020_inapi.pdf?sfvrsn=ff90142b_2'],
  ] as const
  return (
    <div className="space-y-gob-3">
      <PortalSectionTitle>Balance de Gestión Integral</PortalSectionTitle>
      {years.map(([year, href]) => (
        <PortalPdfLink key={year} href={href} title={`Balance de Gestión Integral ${year}`} size="PDF" />
      ))}
      <p className="text-gri-body-sm text-muted-foreground">
        La serie histórica 2009–2019 está también en{' '}
        <a href="/nosotros#balances" className="text-gob-link hover:underline">
          Nosotros → Balances
        </a>
        .
      </p>
    </div>
  )
}

function EstudiosPanel() {
  const docs = [
    { title: 'Análisis de solicitudes de marcas de residentes y creación de empresas (2019–primer semestre)', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/estudios/solicitud-de-marca/estudio_empresas_marcas_2022_inapi.pdf?sfvrsn=9b292bc9_2' },
    { title: 'Análisis de las mujeres inventoras, año 2022', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/estudios/reporte-de-genero/reporte_de_genero_inapi_2022_.pdf?sfvrsn=3cd3a278_2' },
    { title: 'Análisis de las mujeres inventoras, año 2020', href: 'https://www.inapi.cl/docs/default-source/default-document-library/reporte_de_genero_en_chile.pdf?sfvrsn=7b289c88_2' },
    { title: 'Análisis de mujeres emprendedoras (2019-2022)', href: 'https://www.inapi.cl/docs/default-source/2023/centro-de-documentacion/estudios/reporte-de-genero-sobre-marcas-comerciales-en-chile/reporte_genero_marcas_2023_inapi.pdf?sfvrsn=4c41a' },
    { title: 'Análisis de mujeres emprendedoras (2019-2020)', href: 'https://www.inapi.cl/docs/default-source/default-document-library/reporte_de_geenero_marcas_.pdf?sfvrsn=85a918d9_2' },
  ]
  return (
    <div className="space-y-gob-3">
      <PortalSectionTitle>Estudios</PortalSectionTitle>
      <PortalProse>
        Dossiers y reportes de género, empresas y patentamiento publicados en el centro de documentación.
      </PortalProse>
      {docs.map(doc => (
        <PortalPdfLink key={doc.href} href={doc.href} title={doc.title} size="PDF" />
      ))}
    </div>
  )
}

function OpenDataPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Open Data</PortalSectionTitle>
      <PortalProse>
        Los conjuntos de datos de marcas y patentes se descargan desde la plataforma de trámites de INAPI.
      </PortalProse>
      <PortalLinkList
        links={[
          { href: 'https://tramites.inapi.cl/OpenData/TrademarkOpenData', label: 'Datos abiertos de marcas' },
          { href: 'https://tramites.inapi.cl/OpenData/PatentOpenData', label: 'Datos abiertos de patentes' },
          { href: '/datos-abiertos', label: 'Ficha de datos abiertos en este portal' },
        ]}
      />
    </div>
  )
}

const SERIES: Record<string, { title: string; data: { anio: string; solicitudes: number; registros: number }[] }> = {
  'est-marcas': {
    title: 'Marcas',
    data: [
      { anio: '2021', solicitudes: 46820, registros: 31200 },
      { anio: '2022', solicitudes: 42100, registros: 30110 },
      { anio: '2023', solicitudes: 45800, registros: 32440 },
      { anio: '2024', solicitudes: 49200, registros: 35120 },
      { anio: '2025', solicitudes: 52300, registros: 36890 },
    ],
  },
  'est-patentes': {
    title: 'Patentes de invención',
    data: [
      { anio: '2021', solicitudes: 2980, registros: 1210 },
      { anio: '2022', solicitudes: 3050, registros: 1288 },
      { anio: '2023', solicitudes: 3180, registros: 1340 },
      { anio: '2024', solicitudes: 3320, registros: 1412 },
      { anio: '2025', solicitudes: 3490, registros: 1501 },
    ],
  },
  'est-mu': {
    title: 'Modelos de utilidad',
    data: [
      { anio: '2021', solicitudes: 410, registros: 180 },
      { anio: '2022', solicitudes: 438, registros: 192 },
      { anio: '2023', solicitudes: 455, registros: 201 },
      { anio: '2024', solicitudes: 472, registros: 214 },
      { anio: '2025', solicitudes: 490, registros: 221 },
    ],
  },
  'est-disenos': {
    title: 'Diseños y dibujos industriales',
    data: [
      { anio: '2021', solicitudes: 890, registros: 540 },
      { anio: '2022', solicitudes: 920, registros: 561 },
      { anio: '2023', solicitudes: 970, registros: 588 },
      { anio: '2024', solicitudes: 1012, registros: 610 },
      { anio: '2025', solicitudes: 1048, registros: 632 },
    ],
  },
  'est-pct': {
    title: 'PCT presentadas desde Chile',
    data: [
      { anio: '2021', solicitudes: 186, registros: 0 },
      { anio: '2022', solicitudes: 201, registros: 0 },
      { anio: '2023', solicitudes: 214, registros: 0 },
      { anio: '2024', solicitudes: 228, registros: 0 },
      { anio: '2025', solicitudes: 241, registros: 0 },
    ],
  },
}

function EstadisticasPanel({ serie }: { serie: string }) {
  const current = SERIES[serie] ?? SERIES['est-marcas']
  const official: Record<string, string> = {
    'est-marcas': 'https://www.inapi.cl/centro-de-documentacion/estadisticas/marcas',
    'est-patentes': 'https://www.inapi.cl/centro-de-documentacion/estadisticas/patentes',
    'est-mu': 'https://www.inapi.cl/centro-de-documentacion/estadisticas/modelo-de-utilidad',
    'est-disenos': 'https://www.inapi.cl/centro-de-documentacion/estadisticas/disenos',
    'est-pct': 'https://www.inapi.cl/centro-de-documentacion/estadisticas/tratado-de-cooperacion-en-materia-de-patentes',
  }
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>{current.title}</PortalSectionTitle>
      <PortalProse>
        Gráfico de referencia del MVP (solicitudes y registros). Las visualizaciones oficiales en Tableau están en
        inapi.cl.
      </PortalProse>
      <div className="h-72 rounded-gob-md border border-gob-border bg-card p-gob-4">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={current.data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="anio" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="solicitudes" name="Solicitudes" fill="#3d5c80" radius={4} />
            {current.data.some(d => d.registros > 0) ? (
              <Bar dataKey="registros" name="Registros" fill="#7aa2ce" radius={4} />
            ) : null}
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="overflow-x-auto rounded-gob-md border border-gob-border">
        <table className="w-full text-left text-gri-body-sm">
          <thead className="bg-inapi-portal-hero text-gob-text-inverse">
            <tr>
              <th className="p-gob-3">Año</th>
              <th className="p-gob-3">Solicitudes</th>
              <th className="p-gob-3">Registros</th>
            </tr>
          </thead>
          <tbody>
            {current.data.map((row, i) => (
              <tr key={row.anio} className={i % 2 ? 'bg-gob-surface-elevated' : 'bg-card'}>
                <td className="p-gob-3">{row.anio}</td>
                <td className="p-gob-3">{row.solicitudes.toLocaleString('es-CL')}</td>
                <td className="p-gob-3">{row.registros ? row.registros.toLocaleString('es-CL') : '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        <a href={official[serie] ?? official['est-marcas']} className="font-medium text-gob-link hover:underline" target="_blank" rel="noopener noreferrer">
          Abrir las estadísticas oficiales en inapi.cl
        </a>
      </p>
    </div>
  )
}
