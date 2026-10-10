'use client'

import { useCallback, useEffect, useState } from 'react'
import { Eye, Flag } from 'lucide-react'
import { SectionPills, SectionSubnav } from '@/components/portal/SectionPills'
import { PortalBulletList, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'

const PILLS = [
  { id: 'inapi', label: 'INAPI' },
  { id: 'indicadores', label: 'Indicadores' },
  { id: 'balances', label: 'Balances' },
  { id: 'compromisos', label: 'Compromisos de calidad' },
  { id: 'trabaje', label: 'Trabaje con nosotros' },
  { id: 'rse', label: 'INAPI socialmente responsable' },
] as const

const INAPI_SUB = [
  { id: 'funciones', label: 'Funciones' },
  { id: 'objetivos', label: 'Objetivos' },
  { id: 'director', label: 'Director nacional' },
  { id: 'organigrama', label: 'Organigrama' },
]

type PillId = (typeof PILLS)[number]['id']
type SubId = (typeof INAPI_SUB)[number]['id']

const HASH_TO_STATE: Record<string, { pill: PillId; sub?: SubId }> = {
  inapi: { pill: 'inapi', sub: 'funciones' },
  funciones: { pill: 'inapi', sub: 'funciones' },
  objetivos: { pill: 'inapi', sub: 'objetivos' },
  'director-nacional': { pill: 'inapi', sub: 'director' },
  director: { pill: 'inapi', sub: 'director' },
  organigrama: { pill: 'inapi', sub: 'organigrama' },
  indicadores: { pill: 'indicadores' },
  balances: { pill: 'balances' },
  'compromisos-de-calidad': { pill: 'compromisos' },
  compromisos: { pill: 'compromisos' },
  'trabaje-con-nosotros': { pill: 'trabaje' },
  trabaje: { pill: 'trabaje' },
  'inapi-socialmente-responsable': { pill: 'rse' },
  rse: { pill: 'rse' },
}

function hashFor(pill: PillId, sub: SubId) {
  if (pill === 'inapi') return sub === 'funciones' ? 'inapi' : sub === 'director' ? 'director-nacional' : sub
  if (pill === 'compromisos') return 'compromisos-de-calidad'
  if (pill === 'trabaje') return 'trabaje-con-nosotros'
  if (pill === 'rse') return 'inapi-socialmente-responsable'
  return pill
}

const MEI = [
  { year: '2024', href: 'https://www.inapi.cl/docs/default-source/2026-doc/nosotros/indicadores/mei-2024.pdf?sfvrsn=7b17b716_1' },
  { year: '2023', href: 'https://www.inapi.cl/docs/default-source/2026-doc/nosotros/indicadores/mei-2023.pdf?sfvrsn=b672fd13_1' },
  { year: '2022', href: 'https://www.inapi.cl/docs/default-source/2024/acerca-de/indicadores/resultados_mei_2022.pdf?sfvrsn=e305901f_2' },
  { year: '2021', href: 'https://www.inapi.cl/docs/default-source/2024/acerca-de/indicadores/resultados_mei_2021.pdf?sfvrsn=6e8695ed_2' },
  { year: '2020', href: 'https://www.inapi.cl/docs/default-source/2022/acerca-de/indicadores/resultados-meta-eficiencia-2020/resultados_mei_2020.pdf?sfvrsn=b452910f_2' },
  { year: '2019', href: 'https://www.inapi.cl/docs/default-source/default-document-library/cumplimientoindicadores2019.pdf?sfvrsn=f0e603bf_0' },
  { year: '2018', href: 'https://www.inapi.cl/docs/default-source/default-document-library/cumplimiento-indicadores2018.pdf?sfvrsn=addea497_0' },
  { year: '2017', href: 'https://www.inapi.cl/docs/default-source/default-document-library/resultados-metas-eficiencia-institucional-ano-2017.pdf?sfvrsn=fe574948_0' },
  { year: '2016', href: 'https://www.inapi.cl/docs/default-source/default-document-library/resultados-metas-eficiencia-institucional-ano-2016.pdf?sfvrsn=fad43d96_0' },
]

const BGI = [
  { year: '2024', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2024.pdf?sfvrsn=4882c7cb_1' },
  { year: '2023', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2023.pdf?sfvrsn=c338df15_1' },
  { year: '2022', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2022.pdf?sfvrsn=10928714_1' },
  { year: '2021', href: 'https://www.inapi.cl/docs/default-source/2026-doc/centro-de-documentacion/balances/bgi-2021.pdf?sfvrsn=a38fdd9d_1' },
  { year: '2020', href: 'https://www.inapi.cl/docs/default-source/2022/centro-documentacion/balance/bgi_2020_inapi.pdf?sfvrsn=ff90142b_2' },
  { year: '2019', href: 'https://www.inapi.cl/docs/default-source/default-document-library/bgi_20197ead6ef86c6e4e4ba259bb5941ae0b03.pdf?sfvrsn=f995508_0' },
  { year: '2018', href: 'https://www.inapi.cl/docs/default-source/default-document-library/bgi-2018_20190328.pdf?sfvrsn=465c0b90_0' },
  { year: '2017', href: 'https://www.inapi.cl/docs/default-source/default-document-library/bgi_2017_final.pdf?sfvrsn=3444643f_0' },
  { year: '2016', href: 'https://www.inapi.cl/docs/default-source/default-document-library/bgi-2016_20170320e1c3f6e52e004751a1480c89046f9097.pdf?sfvrsn=e1362d33_0' },
  { year: '2015', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-8413_recurso_161b17d466c7b4d53b3552161ad7cac93.pdf?sfvrsn=31f7a3e8_0' },
  { year: '2014', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-6051_recurso_18dd5a55444564e5c98a74cc7a30cc1d6.pdf?sfvrsn=d05c825e_0' },
  { year: '2013', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-5416_recurso_184e4b509a22344b998c82e2abc2910a5.pdf?sfvrsn=bd932e54_0' },
  { year: '2012', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-3441_recurso_1729e41abe49347be8ea40bc0d1eb15e2.pdf?sfvrsn=359fe703_0' },
  { year: '2011', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-2585_recurso_1039ddb2becfb4f07b8a8f976107629d8.pdf?sfvrsn=8391a5b2_0' },
  { year: '2010', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-668_recurso_1405dae87c2fd4fce9db928e5bef0e3a5.pdf?sfvrsn=b334971a_0' },
  { year: '2009', href: 'https://www.inapi.cl/docs/default-source/default-document-library/articles-641_recurso_1046fc4fe0d32468eb1ed3c0494cd61b2.pdf?sfvrsn=6591377d_0' },
]

export function NosotrosHub() {
  const [pill, setPill] = useState<PillId>('inapi')
  const [sub, setSub] = useState<SubId>('objetivos')

  const applyHash = useCallback(() => {
    const raw = window.location.hash.replace('#', '').toLowerCase()
    const mapped = HASH_TO_STATE[raw]
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
    const nextSub = next === 'inapi' ? sub : 'funciones'
    const hash = hashFor(next, next === 'inapi' ? nextSub : 'funciones')
    window.history.replaceState(null, '', `#${hash}`)
  }

  function selectSub(id: string) {
    const next = id as SubId
    setSub(next)
    setPill('inapi')
    window.history.replaceState(null, '', `#${hashFor('inapi', next)}`)
  }

  return (
    <div className="space-y-gob-5">
      <div className="overflow-hidden rounded-gob-md border border-gob-border bg-card">
        <div className="p-gob-4">
          <SectionPills items={[...PILLS]} active={pill} onSelect={selectPill} ariaLabel="Secciones de Nosotros" />
        </div>
        {pill === 'inapi' ? <SectionSubnav items={INAPI_SUB} active={sub} onSelect={selectSub} /> : null}
      </div>
      <div role="tabpanel" aria-labelledby={`pill-${pill}`}>
        {pill === 'inapi' && sub === 'funciones' ? <FuncionesPanel /> : null}
        {pill === 'inapi' && sub === 'objetivos' ? <ObjetivosPanel /> : null}
        {pill === 'inapi' && sub === 'director' ? <DirectorPanel /> : null}
        {pill === 'inapi' && sub === 'organigrama' ? <OrganigramaPanel /> : null}
        {pill === 'indicadores' ? <IndicadoresPanel /> : null}
        {pill === 'balances' ? <BalancesPanel /> : null}
        {pill === 'compromisos' ? <CompromisosPanel /> : null}
        {pill === 'trabaje' ? <TrabajePanel /> : null}
        {pill === 'rse' ? <RsePanel /> : null}
      </div>
    </div>
  )
}

function FuncionesPanel() {
  return (
    <div className="space-y-gob-6" id="funciones">
      <PortalSectionTitle>Funciones</PortalSectionTitle>
      <PortalProse>
        INAPI concentra las actuaciones administrativas para reconocer y mantener vigente la protección que la ley otorga
        a la propiedad industrial: registros, anotaciones, transferencias, títulos, certificados y la publicidad de la
        documentación cuando corresponde.
      </PortalProse>
      <PortalBulletList
        items={[
          'Asesorar al Presidente de la República en materias de propiedad industrial e informar proyectos de ley, tratados y reglamentos cuando lo pidan las autoridades competentes.',
          'Promover la protección, el uso estratégico y la difusión de la información tecnológica disponible.',
          'Actuar como autoridad de búsqueda y de examen preliminar internacional en el marco del PCT, cuando corresponda.',
          'Cooperar con oficinas extranjeras y organismos internacionales en materia de propiedad industrial.',
        ]}
      />
      <PortalSectionTitle>Funciones de las áreas</PortalSectionTitle>
      <dl className="max-w-none space-y-gob-4">
        {[
          ['Dirección Nacional', 'Administra, controla y vela por el cumplimiento de los fines institucionales, según el artículo 4° de la Ley N.° 20.254.'],
          ['Subdirección de Marcas', 'Examina y resuelve las solicitudes de marcas, frases de propaganda, sellos de origen e indicaciones geográficas, y mantiene el registro.'],
          ['Subdirección de Patentes', 'Examina invenciones, modelos de utilidad, diseños y dibujos industriales, y gestiona la participación de Chile en el PCT.'],
          ['Subdirección Jurídica', 'Acompaña los procedimientos contenciosos, los recursos y la defensa institucional de los actos administrativos.'],
        ].map(([title, body]) => (
          <div key={title}>
            <dt className="font-bold text-gob-text">{title}</dt>
            <dd className="mt-1 text-gri-body-sm text-muted-foreground leading-relaxed">{body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function ObjetivosPanel() {
  return (
    <div className="space-y-gob-6" id="objetivos">
      <PortalSectionTitle>¿Qué hace INAPI?</PortalSectionTitle>
      <PortalProse>
        INAPI <strong className="text-gob-text">administra los derechos de propiedad industrial</strong> en Chile.
        Registra y resguarda marcas, patentes, diseños y otros derechos, y entrega los servicios asociados a cada trámite.
      </PortalProse>
      <PortalProse>
        También difunde la información técnica y tecnológica que reúne, y apoya la innovación, el emprendimiento y la
        transferencia de conocimiento a la comunidad.
      </PortalProse>
      <div className="grid max-w-none gap-gob-4 min-[600px]:grid-cols-2">
        <div className="rounded-gob-md bg-gob-surface-elevated p-gob-5">
          <Eye className="mb-gob-3 h-8 w-8 text-inapi-cta" aria-hidden />
          <h3 className="mb-gob-2 font-bold text-gob-text">Visión</h3>
          <p className="text-gri-body-sm leading-relaxed text-muted-foreground">
            Ser un referente mundial en el registro, la gestión, la promoción y la calidad de la propiedad industrial,
            como motor del emprendimiento y la innovación para aumentar la productividad y la diversificación de la
            economía.
          </p>
        </div>
        <div className="rounded-gob-md bg-gob-surface-elevated p-gob-5">
          <Flag className="mb-gob-3 h-8 w-8 text-inapi-cta" aria-hidden />
          <h3 className="mb-gob-2 font-bold text-gob-text">Misión</h3>
          <p className="text-gri-body-sm leading-relaxed text-muted-foreground">
            Consolidar el Sistema Nacional de Propiedad Industrial protegiendo los derechos, difundiendo el conocimiento
            y fomentando una visión equilibrada e integral, para contribuir al desarrollo económico y social de Chile.
          </p>
        </div>
      </div>
      <PortalSectionTitle>Objetivos estratégicos</PortalSectionTitle>
      <PortalBulletList
        items={[
          'Mejorar la calidad de los servicios de marcas y patentes, con oportunidad en el examen de las solicitudes.',
          'Aumentar el uso de los derechos de propiedad industrial por parte de personas usuarias nacionales, en Chile y en el exterior, con una promoción territorial.',
          'Aportar al desarrollo tecnológico sostenible, publicando datos de propiedad industrial que sirvan a la política pública de innovación y transferencia, con perspectiva de género.',
          'Consolidar la equidad de género tanto en la atención como en la gestión interna.',
        ]}
      />
      <PortalSectionTitle>Valores institucionales</PortalSectionTitle>
      <dl className="max-w-none space-y-gob-4">
        {[
          ['Calidad de servicio', 'Los productos y servicios incorporan la perspectiva de satisfacción de las personas usuarias y se adoptan medidas de mejora continua.'],
          ['Trabajo en equipo', 'Las personas funcionarias impulsan la colaboración como un atributo de excelencia.'],
          ['Calidad de vida', 'Se favorecen medidas de equilibrio entre la vida laboral y familiar, con gestión por objetivos.'],
          ['Innovación', 'Se reconoce el potencial creativo del equipo y se canalizan aportes para nuevos procesos y servicios.'],
          ['Socialmente responsable', 'Se consideran el impacto ambiental, la inclusión y el pago oportuno a proveedores.'],
        ].map(([title, body]) => (
          <div key={title}>
            <dt className="font-bold text-gob-text">{title}</dt>
            <dd className="mt-1 text-gri-body-sm leading-relaxed text-muted-foreground">{body}</dd>
          </div>
        ))}
      </dl>
    </div>
  )
}

function DirectorPanel() {
  return (
    <div className="space-y-gob-5" id="director-nacional">
      <PortalSectionTitle>Director nacional</PortalSectionTitle>
      <PortalProse>
        Esteban Figueroa Nagel es el Director Nacional del Instituto Nacional de Propiedad Industrial. Sus atribuciones
        y deberes están en el artículo 4° de la Ley N.° 20.254: administrar, controlar y velar por el cumplimiento de
        los fines institucionales.
      </PortalProse>
      <PortalProse>
        Es químico farmacéutico de la Universidad de Concepción y diplomado en Gestión en Empresas Farmacéuticas de la
        Universidad de Chile. Entre 2009 y abril de 2025 se desempeñó como Subdirector de Patentes, seleccionado en dos
        oportunidades por Alta Dirección Pública.
      </PortalProse>
      <p>
        <a
          href="https://www.inapi.cl/acerca-de/inapi/director-nacional"
          className="font-medium text-gob-link hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ver la ficha completa en inapi.cl
        </a>
      </p>
    </div>
  )
}

function OrganigramaPanel() {
  return (
    <div className="space-y-gob-5" id="organigrama">
      <PortalSectionTitle>Organigrama</PortalSectionTitle>
      <PortalProse>
        La estructura institucional se publica en el organigrama vigente. El documento incluye la Dirección Nacional, las
        subdirecciones y las unidades de apoyo.
      </PortalProse>
      <PortalPdfLink
        href="https://www.inapi.cl/docs/default-source/2026-doc/acerca-de/inapi/organigrama/organigrama_jun26.pdf?sfvrsn=62bb529a_1"
        title="Organigrama INAPI (junio 2026)"
        size="PDF institucional"
      />
    </div>
  )
}

function IndicadoresPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Indicadores</PortalSectionTitle>
      <PortalProse>
        Aquí se publican los resultados de las Metas de Eficiencia Institucional (MEI). Los archivos corresponden a los
        informes oficiales de cada año.
      </PortalProse>
      <div className="grid gap-gob-3 min-[600px]:grid-cols-2">
        {MEI.map(item => (
          <PortalPdfLink key={item.year} href={item.href} title={`Resultados MEI ${item.year}`} size="PDF" />
        ))}
      </div>
    </div>
  )
}

function BalancesPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Balances de Gestión Integral</PortalSectionTitle>
      <PortalProse>Puedes revisar los Balances de Gestión Integral de INAPI desde 2009 en adelante.</PortalProse>
      <div className="grid gap-gob-3 min-[600px]:grid-cols-2">
        {BGI.map(item => (
          <PortalPdfLink key={item.year} href={item.href} title={`Balance de Gestión Integral ${item.year}`} size="PDF" />
        ))}
      </div>
    </div>
  )
}

function CompromisosPanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Compromisos de calidad</PortalSectionTitle>
      <PortalProse>
        En estos documentos INAPI da a conocer su política y compromisos de calidad: objetivos, compromisos de
        servicio, y derechos y deberes de las personas usuarias.
      </PortalProse>
      <PortalPdfLink
        href="https://www.inapi.cl/docs/default-source/2026-doc/nosotros/compromisos/resoluci%C3%B3n-454-29112024-aprueba-pol%C3%ADtica-csyeu-inapi.pdf?sfvrsn=7205c59e_1"
        title="Política de calidad, INAPI (Resolución 454, 29-11-2024)"
        size="PDF"
        description="Publicada el 3 de marzo de 2026 en el sitio institucional."
      />
    </div>
  )
}

function TrabajePanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>Trabaje con nosotros</PortalSectionTitle>
      <PortalProse>
        INAPI publica aquí información general de sus procesos de selección. El detalle de postulaciones y plazos está
        en el portal Empleos Públicos.
      </PortalProse>
      <p>
        <a
          href="https://www.empleospublicos.cl"
          className="font-medium text-gob-link hover:underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Ir a empleospublicos.cl
        </a>
      </p>
      <PortalProse>
        Convocatoria abierta: Profesional de Gestión de la Innovación interna. Revisa el llamado vigente en Empleos
        Públicos.
      </PortalProse>
      <PortalSectionTitle>Inclusión laboral</PortalSectionTitle>
      <div className="space-y-gob-3">
        <PortalPdfLink
          href="https://www.inapi.cl/docs/default-source/2024/acerca-de/trabaja-con-nosotros/inclusi%C3%B3n-laboral-2023.pdf?sfvrsn=4b05828f_2"
          title="Inclusión laboral 2023"
          size="PDF"
        />
        <PortalPdfLink
          href="https://www.inapi.cl/docs/default-source/2024/acerca-de/trabaja-con-nosotros/inclusi%C3%B3n-laboral-2022.pdf?sfvrsn=3c9f8089_2"
          title="Inclusión laboral 2022"
          size="PDF"
        />
      </div>
    </div>
  )
}

function RsePanel() {
  return (
    <div className="space-y-gob-5">
      <PortalSectionTitle>INAPI socialmente responsable</PortalSectionTitle>
      <ul className="max-w-none list-none space-y-gob-3">
        <li>
          <a href="https://www.senadis.gob.cl" className="font-medium text-gob-link hover:underline" target="_blank" rel="noopener noreferrer">
            Sello Chile Inclusivo
          </a>
        </li>
        <li>
          <a href="https://www.economia.gob.cl" className="font-medium text-gob-link hover:underline" target="_blank" rel="noopener noreferrer">
            Sello Pro Pyme
          </a>
        </li>
        <li>
          <span className="font-medium text-gob-text">Iniciativa de Paridad de Género</span>
        </li>
      </ul>
      <PortalPdfLink
        href="https://www.inapi.cl/docs/default-source/2024/acerca-de/inapi-socialmente/protocolo_de_atencion_a_personas_usuarias_con_enfoque_de_genero_y_no_disc.pdf?sfvrsn=48c59ad5_1"
        title="Protocolo de atención a personas usuarias con enfoque de género y no discriminación para personas LGTBIQA+"
        size="PDF"
      />
    </div>
  )
}
