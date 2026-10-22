import type { Metadata } from 'next'
import {
  Award,
  FilePen,
  FileSignature,
  FileText,
  Headset,
  Lightbulb,
  Stamp,
  Users,
} from 'lucide-react'
import { CatalogDetails, tramitesPrincipales, tramitesSecundarios } from '@/components/portal/ProcedureCatalog'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { CtaBand } from '@/components/story/CtaBand'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { SectionTabs } from '@/components/story/SectionTabs'
import { StoryPage } from '@/components/story/StoryPage'
import { StorySection } from '@/components/story/StorySection'
import { VideoGallery } from '@/components/story/VideoSpotlight'
import { getPageMeta } from '@/lib/portal-routes'

const meta = getPageMeta('/tramites-digitales')

export const metadata: Metadata = {
  title: `${meta?.title ?? 'Trámites digitales'} — INAPI`,
  description: meta?.description,
}

type Grupo = 'solicitudes' | 'anotaciones' | 'documentos' | 'atencion'

const TRAMITES: {
  grupo: Grupo
  title: string
  body: string
  footnote?: string
  href: string
  cta: string
  icon: React.ReactNode
}[] = [
  {
    grupo: 'solicitudes',
    title: 'Registro de marcas comerciales',
    body: 'Protege el signo que identifica tus productos, servicios o establecimientos en Chile. Te da el derecho de usarlo y de impedir que otras personas usen uno igual o parecido sin tu permiso.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/marcas/solicitud-nueva',
    cta: 'Ingresar solicitud de marca',
    icon: <Stamp />,
  },
  {
    grupo: 'solicitudes',
    title: 'Registro de patente de invención',
    body: 'Pide el derecho exclusivo sobre una invención, un modelo de utilidad, un diseño o un esquema de trazado de circuito integrado.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/tramites/patentes/solicitar',
    cta: 'Ingresar solicitud de patente',
    icon: <Lightbulb />,
  },
  {
    grupo: 'anotaciones',
    title: 'Anotaciones de marcas',
    body: 'Informa cambios que afectan un registro de marca: titular, representante, dirección u otras menciones al margen.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/tramites/marcas/tramites',
    cta: 'Presentar una anotación de marca',
    icon: <FilePen />,
  },
  {
    grupo: 'anotaciones',
    title: 'Anotaciones de patentes',
    body: 'Informa los mismos tipos de cambio cuando el derecho es una patente u otro título de invención.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/tramites/patentes/anotaciones',
    cta: 'Presentar una anotación de patente',
    icon: <FilePen />,
  },
  {
    grupo: 'documentos',
    title: 'Documentos de representación legal',
    body: 'Deja una sola vez el poder original o su copia digital. Después no lo adjuntas en cada marca o patente.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/tramites/custodia-poderes',
    cta: 'Registrar un poder',
    icon: <FileSignature />,
  },
  {
    grupo: 'documentos',
    title: 'Títulos y certificados de marcas',
    body: 'Pide el título del registro y certificados para presentarlos en otras instituciones.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/tramites/marcas/certificados',
    cta: 'Solicitar un certificado de marca',
    icon: <Award />,
  },
  {
    grupo: 'documentos',
    title: 'Títulos y certificados de patentes',
    body: 'Pide el título o certificados del registro de invención, modelo de utilidad o diseño.',
    footnote: 'Requiere ClaveÚnica.',
    href: '/tramites/patentes/certificados',
    cta: 'Solicitar un certificado de patente',
    icon: <Award />,
  },
  {
    grupo: 'atencion',
    title: 'Atención ciudadana (SIAC)',
    body: 'Consultas, opiniones, sugerencias, felicitaciones o reclamos. Este canal no pide ClaveÚnica.',
    href: '/contacto/siac',
    cta: 'Ir al formulario SIAC',
    icon: <Headset />,
  },
]

const GRUPOS: { id: Grupo | 'todos'; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'solicitudes', label: 'Solicitudes' },
  { id: 'anotaciones', label: 'Anotaciones' },
  { id: 'documentos', label: 'Poderes y certificados' },
  { id: 'atencion', label: 'Atención' },
]

function TramitesBento({ grupo }: { grupo: Grupo | 'todos' }) {
  const items = grupo === 'todos' ? TRAMITES : TRAMITES.filter(t => t.grupo === grupo)
  return (
    <BentoGrid cols={items.length >= 3 ? 3 : 2}>
      {items.map((t, i) => (
        <BentoCard
          key={t.title}
          icon={t.icon}
          title={t.title}
          body={t.body}
          eyebrow={t.footnote}
          href={t.href}
          cta={t.cta}
          variant={i === 0 ? 'night' : 'plain'}
          delay={Math.min(i, 5) * 0.05}
        />
      ))}
    </BentoGrid>
  )
}

export default function TramitesDigitalesPage() {
  return (
    <StoryPage
      path="/tramites-digitales"
      hero={{
        eyebrow: 'Nivel 4 de digitalización',
        dot: 'primary',
        lead: 'Esta lista sigue el Registro Nacional de Trámites del Estado. Todos están en nivel 4: los inicias y terminas por internet.',
        primary: { href: '/tramites', label: 'Ir al Portal de Trámites' },
        secondary: { href: '#catalogo', label: 'Ver el catálogo' },
        panel: (
          <div className="grid gap-gob-4 min-[905px]:grid-cols-2">
            <div className="story-glass rounded-gob-xl p-gob-5">
              <p className="flex items-center gap-gob-2 font-heading text-gri-h2 font-medium text-white">
                <Users className="size-5 text-[#A1D1FF]" aria-hidden />
                Quién puede usarlos
              </p>
              <p className="mt-gob-2 text-gri-body-sm leading-[1.6] text-white/82">Personas y empresas. Casi todos piden ClaveÚnica.</p>
            </div>
            <div className="story-glass rounded-gob-xl p-gob-5">
              <p className="flex items-center gap-gob-2 font-heading text-gri-h2 font-medium text-white">
                <FileText className="size-5 text-[#A1D1FF]" aria-hidden />
                Qué pasa después
              </p>
              <p className="mt-gob-2 text-gri-body-sm leading-[1.6] text-white/82">
                El expediente queda en el Sitio de Trámites. Allí ves plazos, pagos y el estado.
              </p>
            </div>
          </div>
        ),
      }}
    >
      <StorySection tone="paper" id="catalogo" eyebrow="Catálogo" title="Elige tu trámite" lead="Filtra por tipo de gestión.">
        <SectionTabs
          label="Filtrar trámites por tipo"
          tabs={GRUPOS.map(g => ({ id: g.id, label: g.label, content: <TramitesBento grupo={g.id} /> }))}
        />
      </StorySection>

      <VideoGallery
        videos={['solicitarMarca', 'tramitarPatente']}
        tone="night"
        title="Aprende a tramitar en línea"
        lead="Dos guías en video del canal oficial de INAPI."
      />

      <StorySection tone="mist" eyebrow="En detalle" title="Qué es cada trámite">
        <SectionAccordion
          className="mx-auto max-w-5xl"
          items={[...tramitesPrincipales, ...tramitesSecundarios].map(item => {
            const Icon = item.icon
            return {
              id: `tramite-${item.title.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
              title: item.title,
              summary: item.what,
              icon: <Icon />,
              content: <CatalogDetails item={item} />,
            }
          })}
        />
      </StorySection>

      <StorySection tone="paper" eyebrow="Otros trámites del Estado" title="Transparencia y lobby">
        <BentoGrid cols={2}>
          <BentoCard
            icon={<FileText />}
            title="Solicitud de acceso a la información pública (Ley N.° 20.285)"
            href="https://www.portaltransparencia.cl/PortalPdT/ingreso-sai-v2/?idOrg=source=institucion&idOrganismo=AY001"
            cta="Abrir en Portal Transparencia"
          />
          <BentoCard
            icon={<Users />}
            title="Solicitud de audiencia (Ley del Lobby N.° 20.730)"
            href="https://www.leylobby.gob.cl/instituciones"
            cta="Abrir en leylobby.gob.cl"
            delay={0.06}
          />
        </BentoGrid>
      </StorySection>

      <CtaBand
        eyebrow="Portal de trámites"
        title="Inicia y termina tu trámite por internet"
        body="Personas y empresas. Casi todos piden ClaveÚnica."
        primary={{ href: '/tramites', label: 'Ir al Portal de Trámites' }}
        secondary={{ href: '/tramites/clave-unica', label: 'Qué es ClaveÚnica' }}
      />
    </StoryPage>
  )
}
