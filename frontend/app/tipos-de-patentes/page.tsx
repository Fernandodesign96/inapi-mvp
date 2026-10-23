import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  Bell,
  Bolt,
  CalendarClock,
  ClipboardCheck,
  CreditCard,
  Factory,
  FileText,
  Headphones,
  HelpCircle,
  Layers,
  Lightbulb,
  ListChecks,
  NotebookPen,
  Search,
  Shapes,
  Sparkles,
  UserRound,
} from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { GlosarioTerm } from '@/components/GlosarioTerm'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'
import { PortalFeeTable } from '@/components/portal/content'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { ChartCard } from '@/components/story/ChartCard'
import { JourneyRail } from '@/components/story/JourneyRail'
import { KpiStrip } from '@/components/story/KpiStrip'
import { IconList } from '@/components/story/IconList'
import { ShortcutBand } from '@/components/story/ShortcutBand'
import { SplitAccordion } from '@/components/story/SplitAccordion'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { StoryHero } from '@/components/story/StoryHero'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { ProcessTimeline } from '@/components/story/ProcessTimeline'
import { VideoCard } from '@/components/story/VideoCard'
import { patentesOrigenViews, patentesPorAnio, patentesTipoViews } from '@/components/home/HomeStats'
import { FUENTE_REPORTE_ANUAL_2025 } from '@/lib/inapi-official-stats'

export const metadata: Metadata = {
  title: 'Tipos de patentes — INAPI',
  description:
    'Patentes: registra una patente para proteger un invento y obtener el derecho exclusivo a usarlo y explotarlo.',
}

const TOOLS = [
  { href: '/tramites/patentes/buscador', title: 'Buscador de patentes', body: 'Revisa si tu invento ya fue solicitado antes.', icon: <Search /> },
  { href: '/notificaciones-diarias/patentes', title: 'Notificaciones INAPI de patentes', body: 'Consulta los avisos diarios publicados por INAPI.', icon: <Bell /> },
  {
    href: '/patentes/pct',
    title: 'PCT',
    body: 'Tratado de Cooperación en materia de Patentes: presenta una solicitud internacional.',
    icon: <Bolt />,
  },
  { href: '/tramites/patentes/solicitar', title: 'Tramitar una patente', body: 'Presenta tu invención en el Portal de trámites.', icon: <NotebookPen /> },
  { href: '/tramites', title: 'Pedir títulos y certificados', body: 'Solicita documentos oficiales de tu patente.', icon: <Award /> },
  { href: '/contacto', title: 'Escribir a atención ciudadana', body: 'Resuelve dudas sobre tu expediente con nuestro equipo.', icon: <Headphones /> },
  { href: '/patentes/como-registrar', title: 'Guía para registrar una patente', body: 'Etapas, tasas y documentos técnicos.', icon: <FileText /> },
]

const REQUISITOS = [
  { icon: <Sparkles />, title: 'Ser nuevo', body: 'No existe antes en ninguna parte del mundo.' },
  { icon: <Lightbulb />, title: 'Tener nivel inventivo', body: 'No resulta obvio para alguien del rubro.' },
  { icon: <Factory />, title: 'Aplicarse en la industria', body: 'Se puede fabricar o usar en alguna actividad.' },
]

export default function TiposDePatentesPage() {
  return (
    <PortalShell
      active="patentes"
      breadcrumbs={[{ label: 'Tipos de patentes' }]}
      hero={
        <StoryHero
          breadcrumbs={[{ label: 'Tipos de patentes' }]}
          eyebrow="Patentes"
          dot="patentes"
          title="Tipos de patentes"
          lead="Una patente protege tu invento en Chile. Aquí ves qué es, quién puede pedirla, qué se necesita, cuánto cuesta, cuánto demora y cómo seguir el trámite."
          primary={{ href: '/tramites/patentes/buscador', label: 'Buscador de patentes' }}
          secondary={{ href: '/tramites/patentes/solicitar', label: 'Iniciar solicitud de patente' }}
          aside={<VideoCard video="queEsPatente" tone="night" showText={false} />}
          panel={
            <KpiStrip
              items={[
                { value: '1 UTM', label: 'Tasa de presentación de la solicitud', icon: <CreditCard /> },
                { value: 'Hasta 20 años', label: 'Vigencia desde la fecha de presentación', icon: <CalendarClock /> },
                { value: '5 etapas', label: 'Presentación, forma, publicación, peritaje y registro', icon: <Layers /> },
              ]}
              footer={
                <Link href="/patentes/como-registrar/costos" className="font-medium text-white underline underline-offset-4 hover:text-[#A1D1FF]">
                  Ver costos y plazos
                </Link>
              }
            />
          }
        />
      }
    >
      <StorySection
        tone="paper"
        eyebrow="Antes de empezar"
        dot="patentes"
        title="¿Qué requisitos cumple un invento?"
        lead="Para obtener una patente, tu invento cumple tres requisitos."
      >
        <BentoGrid cols={3}>
          {REQUISITOS.map((r, i) => (
            <BentoCard key={r.title} icon={r.icon} title={r.title} body={r.body} variant="plain" delay={i * 0.08} />
          ))}
        </BentoGrid>
      </StorySection>

      <StorySection
        tone="mist"
        eyebrow="Paso a paso"
        dot="patentes"
        title="Cómo registrar una patente en 4 pasos"
        lead="Busca y prepara la memoria antes de abrir el formulario. La solicitud y el seguimiento se hacen en el Portal de trámites."
      >
        <JourneyRail
          label="Pasos para registrar una patente"
          steps={[
            {
              title: 'Busca si ya existe',
              body: 'Compara tu invento con patentes publicadas.',
              href: '/tramites/patentes/buscador',
              cta: 'Buscador de patentes',
              tramites: true,
              icon: <Search />,
              meta: 'Portal de trámites',
            },
            {
              title: 'Prepara la memoria',
              body: 'Describe cómo funciona tu invento.',
              href: '/patentes/como-registrar',
              cta: 'Leer la guía',
              icon: <FileText />,
              meta: 'Sitio informativo',
            },
            {
              title: 'Presenta la solicitud',
              body: 'Completa el formulario y paga la tasa de presentación.',
              href: '/tramites/patentes/solicitar',
              cta: 'Solicitar patente',
              tramites: true,
              requiresAuth: true,
              icon: <NotebookPen />,
              meta: 'Con ClaveÚnica',
              status: 'current',
            },
            {
              title: 'Sigue el expediente',
              body: 'Revisa el estado en el Portal de trámites.',
              href: '/tramites/notificaciones?ambito=patentes',
              cta: 'Ver mis solicitudes',
              tramites: true,
              requiresAuth: true,
              icon: <Bell />,
              meta: 'Con ClaveÚnica',
            },
          ]}
        />
      </StorySection>

      <StorySection
        tone="paper"
        eyebrow="Etapas oficiales"
        title="Línea de tiempo de una patente"
        lead="Del ingreso al número de registro, con examen preliminar, publicación, oposición y peritaje."
      >
        <ProcessTimeline kind="patentes" />
      </StorySection>

      <StorySection
        tone="mist"
        eyebrow="Dibujos y diseños"
        title="Línea de tiempo de un dibujo o diseño industrial"
        lead="El procedimiento sigue las Directrices de examen de diseños y dibujos de INAPI."
      >
        <ProcessTimeline kind="disenos" />
      </StorySection>

      <VideoSpotlight
        video="tramitarPatente"
        tone="paper"
        reverse
        title="Así se tramita una patente en línea"
        lead="INAPI revisa la forma, publica la solicitud y abre un plazo de oposición. Luego viene el peritaje."
        points={[
          { title: 'Presentación y examen de forma', body: 'Adjuntas la memoria técnica, pagas la tasa inicial e INAPI revisa que la solicitud esté completa.' },
          { title: 'Publicación y oposición', body: 'La solicitud se publica y se abre un plazo para que terceros presenten oposición.' },
          { title: 'Peritaje, resolución y registro', body: 'Un perito revisa el invento. Si se otorga el derecho, pagas los derechos de vigencia.' },
        ]}
      />

      <StorySection
        tone="night"
        eyebrow="Datos abiertos"
        dot="focus"
        title="Las patentes en Chile, en cifras"
        lead="Incluye invenciones, diseños, modelos de utilidad y solicitudes provisionales publicadas por INAPI."
      >
        <div className="grid gap-gob-5 min-[1100px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <ChartCard
            kind="line"
            tone="night"
            title="Solicitudes de patente por año"
            description="Total combinado de solicitudes publicadas por INAPI."
            views={patentesPorAnio}
            unit="solicitudes"
            source={{ label: 'Reportes de INAPI y Cuenta Pública 2025', href: FUENTE_REPORTE_ANUAL_2025 }}
            height={300}
          />
          <div className="grid gap-gob-5">
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
          </div>
        </div>
      </StorySection>

      <StorySection
        tone="paper"
        align="left"
        eyebrow="Lo que debes saber"
        dot="patentes"
        title="Todo sobre tu patente, en partes cortas"
        lead="Abre solo la sección que necesitas. Puedes abrir varias a la vez."
      >
        <SplitAccordion
          defaultOpen={['que-es']}
          items={[
            {
              id: 'que-es',
              title: '¿Qué es una patente?',
              summary: 'Un derecho exclusivo que el Estado otorga sobre un invento.',
              icon: <HelpCircle />,
              content: (
                <>
                  <p>
                    Una patente es un <strong>derecho exclusivo</strong> que el Estado otorga sobre un invento. Con ella, decides quién puede fabricar, usar o vender tu invención en Chile.
                  </p>
                  <p className="mt-gob-3">
                    La protección dura hasta 20 años desde que presentas la solicitud. A cambio, publicas cómo funciona tu invento, para que aporte al conocimiento.
                  </p>
                </>
              ),
            },
            {
              id: 'quien',
              title: '¿Quién puede pedir una patente?',
              summary: 'El inventor o quien tenga los derechos sobre el invento.',
              icon: <UserRound />,
              content: (
                <p>
                  Puede pedirla el inventor o quien tenga los derechos sobre el invento. Puedes actuar con un{' '}
                  <GlosarioTerm termino="Representante">representante</GlosarioTerm> si no presentas la solicitud tú.
                </p>
              ),
            },
            {
              id: 'necesitas',
              title: '¿Qué necesitas?',
              summary: 'Memoria técnica, tu clave y el pago de presentación.',
              icon: <ListChecks />,
              content: (
                <IconList
                  items={[
                    { text: 'Memoria técnica que explique el invento.' },
                    { text: 'ClaveÚnica o clave INAPI para ingresar.' },
                    {
                      text: (
                        <>
                          Pagar 1 <GlosarioTerm termino="UTM">UTM</GlosarioTerm> de presentación.
                        </>
                      ),
                    },
                    { text: 'Revisar si ya existe una solicitud parecida en el buscador de patentes.' },
                  ]}
                />
              ),
            },
            {
              id: 'ganas',
              title: '¿Qué ganas al registrar una patente?',
              summary: 'Explotación exclusiva, licencias e inversión.',
              icon: <Sparkles />,
              content: (
                <IconList
                  items={[
                    { text: <>Explotar tu invento en forma <strong>exclusiva</strong> durante el plazo de protección.</> },
                    { text: 'Vender la patente o autorizar su uso mediante una licencia.' },
                    { text: 'Atraer inversión y financiamiento con un activo protegido.' },
                    { text: 'Impedir que otros fabriquen o vendan tu invento sin permiso.' },
                  ]}
                />
              ),
            },
            {
              id: 'tasas',
              title: '¿Cuánto cuesta registrar una patente?',
              summary: 'Pagas en distintas etapas del trámite.',
              icon: <CreditCard />,
              content: (
                <>
                  <p className="mb-gob-4">
                    Pagas en <strong>distintas etapas</strong> del trámite. Los valores se expresan en <GlosarioTerm termino="UTM">UTM</GlosarioTerm> y cambian según el tipo de derecho.
                  </p>
                  <PortalFeeTable
                    caption="Valores referenciales de patente de invención, vigentes a 2026."
                    headers={['Etapa', 'Valor']}
                    rows={[
                      ['Al presentar la solicitud', '1 UTM'],
                      ['Al aprobarse (primer decenio)', '4 UTM'],
                    ]}
                  />
                  <div className="mt-gob-5 max-w-xl">
                    <VideoCard video="costosPatente" />
                  </div>
                </>
              ),
            },
            {
              id: 'tipos',
              title: 'Tipos de patente',
              summary: 'Invención, modelo de utilidad, diseño industrial y esquema de trazado.',
              icon: <Shapes />,
              content: (
                <IconList
                  items={[
                    { text: <><strong>Invención:</strong> un producto o procedimiento nuevo que resuelve un problema técnico.</> },
                    { text: <><strong>Modelo de utilidad:</strong> una mejora en la forma o disposición de un objeto que aporta una ventaja.</> },
                    { text: <><strong>Diseño industrial:</strong> la apariencia particular de un producto: su forma, líneas o colores.</> },
                    { text: <><strong>Esquema de trazado de circuitos:</strong> la disposición de los elementos de un circuito integrado.</> },
                  ]}
                />
              ),
            },
            {
              id: 'despues',
              title: '¿Qué pasa después?',
              summary: 'Forma, publicación, oposición, peritaje y derechos de vigencia.',
              icon: <ClipboardCheck />,
              content: (
                <>
                  <p>
                    INAPI revisa la forma, publica la solicitud y abre un plazo de <GlosarioTerm termino="Oposición">oposición</GlosarioTerm>. Luego viene el peritaje. Si se otorga el derecho, pagas los derechos de vigencia.
                  </p>
                  <PortalPdfLink
                    className="mt-gob-4"
                    href="/patentes/como-registrar"
                    title="Guía para registrar una patente 2026"
                    size="890 KB"
                    description="Describe etapas, tasas y documentos técnicos. No reemplaza la memoria que debes adjuntar en el formulario."
                  />
                </>
              ),
            },
          ]}
        />
      </StorySection>

      <StorySection
        tone="mist"
        align="left"
        eyebrow="Herramientas y trámites"
        dot="patentes"
        title="Herramientas, guías y trámites de patentes"
        lead="Desliza para ver herramientas de consulta y trámites del Portal de trámites."
        id="tramites"
      >
        <StoryCarousel label="Herramientas y trámites de patentes" tone="mist" arrows="sides">
          {TOOLS.map(t => (
            <BentoCard
              key={t.title}
              title={t.title}
              body={t.body}
              icon={t.icon}
              href={t.href}
              cta="Abrir"
              variant="plain"
              nativeTitle={t.title === 'PCT' ? String(t.body) : undefined}
            />
          ))}
        </StoryCarousel>
      </StorySection>

      <ShortcutBand
        kind="patentes"
        title="¿Tu invento está listo para protegerse?"
        body="Presenta tu solicitud de patente en el Portal de trámites con ClaveÚnica."
      />
    </PortalShell>
  )
}
