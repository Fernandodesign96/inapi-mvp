import type { Metadata } from 'next'
import Link from 'next/link'
import {
  Award,
  Bell,
  CalendarClock,
  ClipboardCheck,
  CreditCard,
  Globe2,
  HelpCircle,
  Layers,
  LayoutGrid,
  ListChecks,
  NotebookPen,
  Pencil,
  RefreshCw,
  Search,
  Shapes,
  Sparkles,
  Timer,
  UserRound,
} from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { GlosarioTerm } from '@/components/GlosarioTerm'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'
import { PortalFeeTable } from '@/components/portal/content'
import { BentoCard } from '@/components/story/Bento'
import { ChartCard } from '@/components/story/ChartCard'
import { CtaBand } from '@/components/story/CtaBand'
import { JourneyRail } from '@/components/story/JourneyRail'
import { KpiStrip } from '@/components/story/KpiStrip'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { StoryHero } from '@/components/story/StoryHero'
import { StorySection } from '@/components/story/StorySection'
import { VideoSpotlight } from '@/components/story/VideoSpotlight'
import { marcasMadridViews, marcasOrigenViews, marcasPorAnio } from '@/components/home/HomeStats'
import { FUENTE_REPORTE_ANUAL_2025 } from '@/lib/inapi-official-stats'

export const metadata: Metadata = {
  title: 'Marcas — INAPI',
  description:
    'Registra una marca para proteger el nombre, el logo o la frase que identifica lo que ofreces.',
}

const TOOLS = [
  { href: '/marcas/buscadores', title: 'Buscador de marcas', body: 'Compara tu marca con las ya inscritas antes de solicitar.', icon: <Search /> },
  {
    href: '/tramites/notificaciones?ambito=marcas',
    title: 'Estado de mis solicitudes de marca',
    body: 'Revisa avisos, plazos y el estado de tu expediente.',
    icon: <Bell />,
  },
  { href: '/marcas/como-registrar', title: 'Cómo registrar una marca, paso a paso', body: 'Lee cada etapa con ejemplos y plazos.', icon: <Layers /> },
  { href: '/marcas/solicitud-nueva', title: 'Ingresar una solicitud nueva', body: 'Prepara lo que necesitas antes de abrir el formulario.', icon: <NotebookPen /> },
  { href: '/tramites', title: 'Renovar un registro', body: 'Mantén tu marca vigente por otros diez años.', icon: <RefreshCw /> },
  { href: '/tramites', title: 'Anotar un cambio', body: 'Actualiza titular, domicilio u otros datos del registro.', icon: <Pencil /> },
  { href: '/tramites', title: 'Pedir títulos y certificados', body: 'Solicita documentos oficiales de tu marca.', icon: <Award /> },
  { href: '/marcas/sistema-de-madrid', title: 'Sistema de Madrid', body: 'Protege tu marca en otros países con una sola solicitud.', icon: <Globe2 /> },
]

export default function MarcasPage() {
  return (
    <PortalShell
      active="marcas"
      breadcrumbs={[{ label: 'Marcas' }]}
      hero={
        <StoryHero
          breadcrumbs={[{ label: 'Marcas' }]}
          eyebrow="Marcas"
          dot="marcas"
          title="Una marca identifica lo que ofreces"
          lead="En esta página ves qué es, quién puede pedirla, qué necesitas, cuánto cuesta, cuánto demora y cómo seguir el trámite."
          primary={{ href: '/marcas/buscador-similitud', label: 'Buscador de marcas' }}
          secondary={{ href: '/tramites/marcas/solicitar', label: 'Iniciar solicitud de marca' }}
          seal={{ center: '®', caption: 'MARCA' }}
          panel={
            <KpiStrip
              items={[
                { value: '1 UTM', label: 'Tasa de presentación', sublabel: 'por cada clase de Niza', icon: <CreditCard /> },
                { value: '6 a 8 meses', label: 'Plazo habitual', sublabel: 'si no hay oposiciones', icon: <Timer /> },
                { value: '3 etapas', label: 'Presentación, publicación y examen', icon: <Layers /> },
                { value: '10 años', label: 'Vigencia del registro', sublabel: 'con opción de renovarla', icon: <CalendarClock /> },
              ]}
              footer={
                <Link href="/marcas/como-registrar/costos" className="font-medium text-white underline underline-offset-4 hover:text-[#A1D1FF]">
                  Ver tabla de tasas 2026
                </Link>
              }
            />
          }
        />
      }
    >
      <StorySection
        tone="paper"
        eyebrow="Paso a paso"
        dot="marcas"
        title="Cómo registrar una marca en 4 pasos"
        lead="Los dos primeros pasos los haces aquí, en el sitio informativo. Los dos últimos, en el Portal de trámites con ClaveÚnica."
      >
        <JourneyRail
          label="Pasos para registrar una marca"
          steps={[
            {
              title: 'Busca si ya existe',
              body: 'Compara tu nombre con marcas registradas en Chile.',
              href: '/marcas/buscador-similitud',
              cta: 'Abrir el Buscador de marcas',
              icon: <Search />,
              meta: 'Sitio informativo',
            },
            {
              title: 'Elige tus clases',
              body: (
                <>
                  Selecciona las categorías de productos o servicios (<GlosarioTerm termino="Niza">clases de Niza</GlosarioTerm>).
                </>
              ),
              href: '/tramites/marcas/clasificador',
              cta: 'Buscador de productos y servicios',
              tramites: true,
              icon: <LayoutGrid />,
              meta: 'Portal de trámites',
            },
            {
              title: 'Presenta la solicitud',
              body: 'Completa el formulario y paga 1 UTM por clase elegida.',
              href: '/tramites/marcas/solicitar',
              cta: 'Solicitar marca',
              tramites: true,
              requiresAuth: true,
              icon: <NotebookPen />,
              meta: 'Con ClaveÚnica',
              status: 'current',
            },
            {
              title: 'Sigue el expediente',
              body: 'Revisa el estado de tu solicitud en el Portal de trámites.',
              href: '/tramites/notificaciones?ambito=marcas',
              cta: 'Ver mis solicitudes',
              tramites: true,
              requiresAuth: true,
              icon: <Bell />,
              meta: 'Con ClaveÚnica',
            },
          ]}
        />
      </StorySection>

      <VideoSpotlight
        video="solicitarMarca"
        tone="mist"
        title="Mira cómo se presenta una marca en línea"
        lead="El registro tiene tres etapas. En total suele tardar entre 5 y 8 meses si no hay observaciones."
        points={[
          {
            title: 'Ingresas y revisamos tu solicitud',
            body: 'Presentas la solicitud en línea y pagas la tasa inicial. INAPI revisa que los datos y documentos estén completos.',
          },
          {
            title: 'Publicamos tu solicitud en el Diario Oficial',
            body: 'Tu marca se publica para que cualquier persona que se sienta afectada pueda presentar una oposición dentro del plazo legal.',
          },
          {
            title: 'Revisamos el fondo y resolvemos',
            body: 'INAPI examina si tu marca cumple la ley. Si la aprueba, pagas la tasa final y recibes tu registro.',
          },
        ]}
      />

      <StorySection
        tone="night"
        eyebrow="Datos abiertos"
        dot="focus"
        title="Las marcas en Chile, en cifras"
        lead="Cada año más personas y empresas protegen su marca. Elige un año para ver de dónde vienen las solicitudes."
      >
        <div className="grid gap-gob-5 min-[1100px]:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
          <ChartCard
            kind="bar"
            tone="night"
            title="Solicitudes de marca por año"
            description="Cada solicitud cuenta una vez, aunque incluya varias clases de productos o servicios."
            views={marcasPorAnio}
            unit="solicitudes"
            source={{ label: 'Reportes de INAPI y Cuenta Pública 2025', href: FUENTE_REPORTE_ANUAL_2025 }}
            height={300}
          />
          <div className="grid gap-gob-5">
            <ChartCard
              kind="doughnut"
              tone="night"
              title="Origen de las solicitudes"
              description="Residentes en Chile frente a no residentes, conteo uniclase."
              views={marcasOrigenViews}
            />
            <ChartCard
              kind="doughnut"
              tone="night"
              title="Marcas de no residentes"
              description="Vía nacional frente a Protocolo de Madrid, conteo uniclase."
              views={marcasMadridViews}
            />
          </div>
        </div>
      </StorySection>

      <StorySection
        tone="paper"
        align="left"
        eyebrow="Lo que debes saber"
        dot="marcas"
        title="Todo sobre tu marca, en partes cortas"
        lead="Abre solo la sección que necesitas. Puedes abrir varias a la vez."
      >
        <SectionAccordion
          defaultOpen={['que-es']}
          items={[
            {
              id: 'que-es',
              title: '¿Qué es una marca?',
              summary: 'Un signo que identifica tus productos, servicios o tu negocio.',
              icon: <HelpCircle />,
              content: (
                <>
                  <p>
                    Una marca es un <strong>signo que identifica</strong> tus productos, servicios o tu negocio y los diferencia del resto en el mercado.
                  </p>
                  <p className="mt-gob-3">
                    Puede ser una palabra, un logo, una frase, un sonido o una combinación de estos elementos. Al registrarla, obtienes el derecho exclusivo a usarla en Chile por diez años, con opción de renovarla.
                  </p>
                </>
              ),
            },
            {
              id: 'quien',
              title: '¿Quién puede pedir el registro?',
              summary: 'Una persona o una empresa, con o sin representante.',
              icon: <UserRound />,
              content: (
                <p>
                  Puede pedir el registro una persona o una empresa, con o sin <GlosarioTerm termino="Representante">representante</GlosarioTerm>. Debes identificar al titular y, si aplica, a quien tramita en su nombre.
                </p>
              ),
            },
            {
              id: 'necesitas',
              title: '¿Qué necesitas?',
              summary: 'El signo, las clases, tu clave y el pago de la tasa.',
              icon: <ListChecks />,
              content: (
                <ul>
                  <li>El signo que quieres proteger (palabra, logo o ambos).</li>
                  <li>
                    Las clases de <GlosarioTerm termino="Niza">Niza</GlosarioTerm> de tus productos o servicios.
                  </li>
                  <li>ClaveÚnica o clave INAPI para ingresar la solicitud.</li>
                  <li>
                    Pagar la tasa de presentación en <GlosarioTerm termino="UTM">UTM</GlosarioTerm>.
                  </li>
                </ul>
              ),
            },
            {
              id: 'ganas',
              title: '¿Qué ganas al registrar tu marca?',
              summary: 'Uso exclusivo en todo el país y respaldo ante copias.',
              icon: <Sparkles />,
              content: (
                <ul>
                  <li>
                    Usar tu marca en forma <strong>exclusiva</strong> en todo el país.
                  </li>
                  <li>Impedir que otros registren o usen una marca igual o parecida.</li>
                  <li>Sumar valor a tu negocio: puedes vender, licenciar o heredar tu marca.</li>
                  <li>Respaldar tu marca ante la justicia si alguien la copia.</li>
                </ul>
              ),
            },
            {
              id: 'tasas',
              title: '¿Cuánto cuesta registrar una marca?',
              summary: 'Pagas en dos momentos y por cada clase.',
              icon: <CreditCard />,
              content: (
                <>
                  <p className="mb-gob-4">
                    Pagas en <strong>dos momentos</strong> y por cada clase de productos o servicios que elijas. Los valores se expresan en <GlosarioTerm termino="UTM">UTM</GlosarioTerm>.
                  </p>
                  <PortalFeeTable
                    caption="Tarifas por clase, vigentes a 2026."
                    headers={['Momento del pago', 'Valor por clase']}
                    rows={[
                      ['Al presentar la solicitud', '0,4 UTM'],
                      ['Al aprobarse el registro', '2 UTM'],
                    ]}
                  />
                </>
              ),
            },
            {
              id: 'tipos',
              title: 'Tipos de marca',
              summary: 'Comercial, colectiva, de certificación y frase de propaganda.',
              icon: <Shapes />,
              content: (
                <ul>
                  <li>
                    <strong>Marca comercial:</strong> identifica productos o servicios de una empresa o persona.
                  </li>
                  <li>
                    <strong>Marca colectiva:</strong> distingue a los miembros de una asociación o gremio.
                  </li>
                  <li>
                    <strong>Marca de certificación:</strong> garantiza que un producto cumple ciertas características o normas.
                  </li>
                  <li>
                    <strong>Frase de propaganda:</strong> protege un eslogan asociado a una marca ya registrada.
                  </li>
                </ul>
              ),
            },
            {
              id: 'despues',
              title: '¿Qué pasa después?',
              summary: 'Revisión de forma, publicación, oposición y examen de fondo.',
              icon: <ClipboardCheck />,
              content: (
                <>
                  <p>
                    Tras presentar, INAPI revisa la forma, publica la solicitud y abre el plazo de <GlosarioTerm termino="Oposición">oposición</GlosarioTerm>. Si no hay oposiciones y el examen de fondo es favorable, pagas la tasa de registro y recibes el certificado.
                  </p>
                  <p className="mt-gob-3">
                    <Link href="/marcas/buscador-similitud">Buscador de marcas</Link> para reducir el riesgo de rechazo.
                  </p>
                  <PortalPdfLink
                    className="mt-gob-4"
                    href="/marcas/como-registrar"
                    title="Guía para registrar una marca 2026"
                    size="1,2 MB"
                    description="Resume etapas, tasas y documentos. Es una guía de lectura, no reemplaza el formulario en línea."
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
        dot="marcas"
        title="Todo lo que puedes hacer con tu marca"
        lead="Desliza para ver herramientas de consulta y trámites del Portal de trámites."
      >
        <StoryCarousel label="Herramientas y trámites de marcas" tone="mist">
          {TOOLS.map(t => (
            <BentoCard
              key={t.title}
              title={t.title}
              body={t.body}
              icon={t.icon}
              href={t.href}
              cta="Abrir"
              variant="plain"
              nativeTitle={t.title === 'Sistema de Madrid' ? t.body : undefined}
            />
          ))}
        </StoryCarousel>
      </StorySection>

      <CtaBand
        eyebrow="Siguiente paso"
        title="¿Listo para proteger tu marca?"
        body="Presenta tu solicitud en el Portal de trámites con ClaveÚnica. Te guiamos paso a paso."
        primary={{ href: '/tramites/marcas/solicitar', label: 'Iniciar solicitud de marca' }}
        secondary={{ href: '/marcas/como-registrar/costos', label: 'Ver costos y plazos' }}
        seal={{ center: '®', caption: 'MARCA' }}
      />
    </PortalShell>
  )
}
