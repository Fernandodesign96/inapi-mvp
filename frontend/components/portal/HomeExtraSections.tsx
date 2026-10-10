import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import {
  CheckCircle2,
  ChevronRight,
  Clock,
  CreditCard,
  FileSearch,
  Globe,
  HelpCircle,
  Layers,
  Lightbulb,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'
import { PortalImagePlaceholder } from '@/components/portal/content'
import { HomeObservanciaCarousel } from '@/components/portal/HomeObservanciaCarousel'
import { GlosarioTerm } from '@/components/GlosarioTerm'
import { cn } from '@/lib/utils'

const cifras = [
  { valor: '+50.000', texto: 'marcas registradas al año' },
  { valor: '6 a 8 meses', texto: 'tiempo promedio del proceso' },
  { valor: '10 años', texto: 'de protección renovable' },
]

type TopicCardData = {
  icon: LucideIcon
  titulo: string
  texto: string
  href: string
  cta: string
}

type Paso = { n: number; icon: LucideIcon; title: string; body: string }

type CostoItem = { title: string; body: string }

const marcasTopics: TopicCardData[] = [
  {
    icon: HelpCircle,
    titulo: '¿Qué es una marca?',
    texto: 'Es el signo que distingue tus productos o servicios: una palabra, un logo, una frase o una combinación de ambos.',
    href: '/marcas',
    cta: 'Leer qué es una marca',
  },
  {
    icon: ShieldCheck,
    titulo: '¿Cómo se protege?',
    texto: 'El registro en INAPI te da el derecho exclusivo de usarla en Chile por 10 años, con opción de renovarla.',
    href: '/marcas/como-registrar',
    cta: 'Ver cómo se protege una marca',
  },
  {
    icon: Clock,
    titulo: '¿Cuánto tiempo toma?',
    texto: 'Desde que presentas la solicitud hasta el certificado suelen pasar entre 6 y 8 meses, si no hay oposiciones.',
    href: '/marcas/como-registrar',
    cta: 'Revisar plazos del registro',
  },
  {
    icon: CreditCard,
    titulo: 'Tasas y pagos',
    texto: 'Pagas 1 UTM por clase al presentar y 2 UTM si se acepta a registro, más la publicación en el Diario Oficial.',
    href: '/marcas#tasas',
    cta: 'Ver tasas de marcas',
  },
  {
    icon: Search,
    titulo: 'Buscador de marcas',
    texto: 'Compara tu nombre con marcas ya solicitadas o registradas antes de pagar la solicitud.',
    href: '/marcas/buscadores',
    cta: 'Abrir el buscador de marcas',
  },
  {
    icon: Layers,
    titulo: 'Clases de Niza',
    texto: 'Elige los productos o servicios que cubre tu marca. Cada clase se paga por separado.',
    href: '/tramites/marcas/clasificador',
    cta: 'Clasificar productos y servicios',
  },
  {
    icon: Globe,
    titulo: 'Sistema de Madrid',
    texto: 'Si ya tienes una marca en Chile, puedes extender la protección a otros países desde una sola solicitud.',
    href: '/marcas/sistema-de-madrid',
    cta: 'Conocer el Sistema de Madrid',
  },
]

const patentesTopics: TopicCardData[] = [
  {
    icon: Lightbulb,
    titulo: '¿Qué es una patente?',
    texto: 'Es el derecho exclusivo que el Estado otorga sobre un invento para fabricarlo, usarlo o venderlo en Chile.',
    href: '/patentes',
    cta: 'Leer qué es una patente',
  },
  {
    icon: ShieldCheck,
    titulo: 'Requisitos de patentabilidad',
    texto: 'Debe ser nueva, tener nivel inventivo y poder aplicarse en la industria. Esos tres puntos se evalúan en el examen.',
    href: '/patentes/como-registrar',
    cta: 'Ver requisitos de una patente',
  },
  {
    icon: Clock,
    titulo: 'Vigencia de 20 años',
    texto: 'La protección dura hasta 20 años desde la fecha de presentación, solo en el país donde se otorgó.',
    href: '/patentes',
    cta: 'Revisar vigencia de una patente',
  },
  {
    icon: FileSearch,
    titulo: 'Buscador de patentes',
    texto: 'Revisa si tu invento, modelo o diseño ya fue solicitado antes de invertir en la documentación técnica.',
    href: '/tramites/patentes/buscador',
    cta: 'Abrir el buscador de patentes',
  },
  {
    icon: Globe,
    titulo: 'Sistema PCT',
    texto: 'Una vía internacional para buscar protección en varios países a partir de una misma solicitud.',
    href: '/patentes/pct',
    cta: 'Conocer el tratado PCT',
  },
  {
    icon: CreditCard,
    titulo: 'Tasas del trámite',
    texto: 'Pagas 1 UTM al presentar, un arancel pericial durante el examen y 2 UTM por cada 5 años al otorgar el derecho.',
    href: '/patentes#tasas',
    cta: 'Ver tasas de patentes',
  },
]

const pasosMarcas: Paso[] = [
  { n: 1, icon: ShieldCheck, title: '¿Puedo registrar mi marca?', body: 'Verifica que sea distintiva y que la ley no prohíba ese signo.' },
  { n: 2, icon: Search, title: 'Busca si ya existe', body: 'Compara con marcas anteriores antes de pagar la solicitud.' },
  { n: 3, icon: Layers, title: 'Elige las clases', body: 'Define los productos o servicios. Cada clase de Niza se paga por separado.' },
  { n: 4, icon: CreditCard, title: 'Presenta y paga', body: 'Completa el formulario y paga 1 UTM por cada clase.' },
  { n: 5, icon: CheckCircle2, title: 'Seguimiento y registro', body: 'INAPI publica tu solicitud y emite el certificado si no hay oposiciones.' },
]

const pasosPatentes: Paso[] = [
  { n: 1, icon: CreditCard, title: 'Presenta y paga', body: 'Adjuntas la memoria técnica y pagas 1 UTM de presentación.' },
  { n: 2, icon: FileSearch, title: 'Examen de forma', body: 'INAPI revisa que la solicitud cumpla los requisitos formales mínimos.' },
  { n: 3, icon: Globe, title: 'Publicación y oposición', body: 'Publicas en el Diario Oficial y terceros pueden oponerse en 45 días.' },
  { n: 4, icon: Lightbulb, title: 'Peritaje', body: 'Un perito evalúa novedad, nivel inventivo y aplicación industrial.' },
  { n: 5, icon: CheckCircle2, title: 'Resolución y registro', body: 'INAPI acepta o rechaza. Si se otorga, pagas los derechos de vigencia.' },
]

const costosMarcas: CostoItem[] = [
  { title: 'Tasa de solicitud:', body: '1 UTM por cada clase de Niza al presentar.' },
  { title: 'Publicación en el Diario Oficial:', body: 'costo adicional según la extensión del extracto.' },
  { title: 'Arancel de registro:', body: '2 UTM por clase si la marca se acepta a registro.' },
]

const costosPatentes: CostoItem[] = [
  { title: 'Tasa de presentación:', body: '1 UTM al ingresar la solicitud (o dentro de 30 días).' },
  { title: 'Arancel pericial:', body: 'se informa en el expediente según el área técnica.' },
  { title: 'Derechos de otorgamiento:', body: '2 UTM por cada 5 años de vigencia del derecho.' },
]

const novedades = [
  {
    fecha: 'Lunes 13 julio de 2026',
    titulo: 'Asamblea de la OMPI ratifica por unanimidad a INAPI como Autoridad Internacional PCT por 10 años más',
    resumen:
      'La decisión de la Unión del PCT en Ginebra da continuidad al rol de la oficina chilena como prestadora de servicios de búsqueda y examen preliminar internacional.',
    href: '/sala-de-prensa',
  },
  {
    fecha: 'Viernes 10 julio de 2026',
    titulo: 'INAPI despliega intensa agenda de reuniones bilaterales en las Asambleas de la OMPI',
    resumen:
      'La delegación chilena busca consolidar alianzas estratégicas con oficinas líderes de Europa, Asia y América Latina.',
    href: '/sala-de-prensa',
  },
  {
    fecha: 'Viernes 10 julio de 2026',
    titulo: 'Startup chilena Drovid obtiene Premio Mundial de la OMPI 2026',
    resumen:
      'Reconocimiento por una tecnología con drones e inteligencia artificial para detectar riesgo de incendios forestales.',
    href: '/sala-de-prensa/patentes-nacionales-2026',
  },
]

function BannerSection({
  title,
  children,
}: {
  title: string
  imageLabel?: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section className="mt-gob-8 flex flex-col overflow-hidden">
      <div className="bg-card py-gob-4 text-center border-b-4 border-gob-primary">
        <h2 className="portal-h2 text-gob-text">{title}</h2>
      </div>
      <div className="portal-ambient-hero flex min-h-[280px] items-center justify-center">
        <div className="relative z-[1] p-gob-7 min-[600px]:p-gob-8 text-gob-text-inverse">{children}</div>
      </div>
    </section>
  )
}

function TopicCard({ card, accent }: { card: TopicCardData; accent: 'marcas' | 'patentes' }) {
  const Icon = card.icon
  const isMarcas = accent === 'marcas'
  return (
    <article
      className={cn(
        'flex h-full flex-col rounded-gob-lg border bg-card p-gob-6 shadow-elevation-02 transition-shadow hover:shadow-elevation-03',
        isMarcas ? 'border-inapi-marcas-border/35' : 'border-inapi-patentes-border/30',
      )}
    >
      <span
        className={cn(
          'inline-flex size-11 items-center justify-center rounded-gob-md',
          isMarcas ? 'bg-inapi-marcas-surface text-inapi-marcas-accent' : 'bg-gob-info-bg text-gob-primary',
        )}
      >
        <Icon className="w-6 h-6" aria-hidden />
      </span>
      <h3 className="mt-gob-4 portal-h3 text-gob-text leading-[1.35]">{card.titulo}</h3>
      <p className="mt-gob-3 flex-1 text-gri-body text-muted-foreground leading-[1.5]">{card.texto}</p>
      <Link
        href={card.href}
        className={cn(
          'mt-gob-4 inline-flex min-h-11 items-center gap-gob-2 text-gri-body font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
          isMarcas ? 'text-inapi-marcas-accent' : 'text-gob-primary',
        )}
      >
        {card.cta}
        <ChevronRight className="size-4" aria-hidden />
      </Link>
    </article>
  )
}

function ProcessGrid({ pasos, accent }: { pasos: Paso[]; accent: 'marcas' | 'patentes' }) {
  const isMarcas = accent === 'marcas'
  return (
    <ol className="grid list-none min-[600px]:grid-cols-2 min-[905px]:grid-cols-5 gap-gob-4">
      {pasos.map(paso => {
        const Icon = paso.icon
        return (
          <li
            key={paso.n}
            className="flex min-h-[16rem] flex-col justify-between rounded-gob-lg bg-inapi-portal-hero p-gob-5 text-gob-text-inverse shadow-elevation-03"
          >
            <div className="flex items-start justify-between gap-gob-3 mb-gob-4">
              <span className="font-heading text-[1.75rem] font-medium tabular-nums leading-none text-gob-focus">
                {String(paso.n).padStart(2, '0')}
              </span>
              <Icon
                className={cn('w-6 h-6', isMarcas ? 'text-inapi-marcas-accent' : 'text-inapi-patentes-accent')}
                aria-hidden
              />
            </div>
            <div>
              <h3 className="font-heading font-medium text-gob-text-inverse text-gri-h2 mb-gob-2 leading-[1.5]">
                {paso.title}
              </h3>
              <p className="text-gri-body-sm text-gob-text-inverse leading-[1.5]">{paso.body}</p>
            </div>
          </li>
        )
      })}
    </ol>
  )
}

function CostBox({
  items,
  note,
}: {
  items: CostoItem[]
  note: string
}) {
  return (
    <div className="bg-card border border-gob-border rounded-gob-lg p-gob-6 flex flex-wrap gap-gob-5 items-start shadow-elevation-01">
      <div className="flex items-center gap-gob-3">
        <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg">
          <CreditCard className="w-6 h-6 text-gob-primary" aria-hidden />
        </span>
        <h3 className="font-heading text-gri-h1 font-medium text-gob-text">¿Cuánto vas a pagar en total?</h3>
      </div>
      <ul className="flex-1 min-w-[280px] space-y-gob-3 text-gri-body text-muted-foreground list-none">
        {items.map(item => (
          <li key={item.title} className="flex gap-gob-3">
            <CheckCircle2 className="w-5 h-5 text-gob-success shrink-0 mt-0.5" aria-hidden />
            <span>
              <strong className="text-gob-text font-medium">{item.title}</strong> {item.body}
            </span>
          </li>
        ))}
        <li className="text-gri-body-sm pl-8">
          {note} Los montos se expresan en <GlosarioTerm termino="UTM">UTM</GlosarioTerm>.
        </li>
      </ul>
    </div>
  )
}

function DomainGuide({
  id,
  accent,
  kicker,
  title,
  lead,
  topics,
  processTitle,
  processLead,
  pasos,
  costos,
  costNote,
  ctaHref,
  ctaLabel,
}: {
  id: string
  accent: 'marcas' | 'patentes'
  kicker: string
  title: string
  lead: string
  topics: TopicCardData[]
  processTitle: string
  processLead: string
  pasos: Paso[]
  costos: CostoItem[]
  costNote: string
  ctaHref: string
  ctaLabel: string
}) {
  const isMarcas = accent === 'marcas'
  return (
    <section id={id} className={cn('py-gob-8', !isMarcas && 'bg-gob-surface-elevated border-y border-gob-border')}>
      <ContainerGRI size="portal" className="space-y-gob-7">
        <div className="space-y-gob-3">
          <p
            className={cn(
              'portal-kicker',
              isMarcas ? 'text-inapi-marcas-accent' : 'text-inapi-patentes-accent',
            )}
          >
            {kicker}
          </p>
          <h2 className="portal-h2 text-gob-text">{title}</h2>
          <p className="portal-lead text-muted-foreground">{lead}</p>
        </div>
        <div className="grid gap-gob-5 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3">
          {topics.map(card => (
            <TopicCard key={card.titulo} card={card} accent={accent} />
          ))}
        </div>
        <div className="space-y-gob-6 pt-gob-4">
          <div className="space-y-gob-3">
            <h3 className="portal-h2 text-gob-text">{processTitle}</h3>
            <p className="portal-lead text-muted-foreground">{processLead}</p>
          </div>
          <ProcessGrid pasos={pasos} accent={accent} />
          <CostBox items={costos} note={costNote} />
          <Button
            size="form"
            className={cn(
              'rounded-full font-medium h-11 px-gob-6',
              isMarcas ? 'bg-inapi-marcas-accent hover:bg-inapi-marcas-hover text-gob-text-inverse' : 'bg-inapi-cta hover:bg-gob-primary-dark',
            )}
            asChild
          >
            <Link href={ctaHref}>
              {ctaLabel}
              <ChevronRight className="w-5 h-5 ml-1" aria-hidden />
            </Link>
          </Button>
        </div>
      </ContainerGRI>
    </section>
  )
}

export function HomeExtraSections() {
  return (
    <>
      <section className="portal-ambient-hero">
        <ContainerGRI size="portal" className="relative z-[1] py-gob-7 flex flex-wrap justify-around gap-gob-6 text-center">
          {cifras.map(c => (
            <div key={c.valor} className="min-w-[160px] space-y-gob-2">
              <p className="font-heading text-[2rem] min-[600px]:text-[2.25rem] font-medium leading-[1.5] text-gob-focus">
                {c.valor}
              </p>
              <p className="text-gri-body text-gob-text-inverse">{c.texto}</p>
            </div>
          ))}
        </ContainerGRI>
      </section>

      <DomainGuide
        id="guia-marcas"
        accent="marcas"
        kicker="Marcas"
        title="¿Qué necesitas saber antes de registrar una marca?"
        lead="Conceptos, herramientas y etapas para preparar tu solicitud con información oficial."
        topics={marcasTopics}
        processTitle="El proceso de registro de marca, paso a paso"
        processLead="Antes de empezar, conoce qué vas a hacer y cuánto te costará."
        pasos={pasosMarcas}
        costos={costosMarcas}
        costNote="Los montos se calculan en UTM. Verás el total actualizado antes de confirmar el pago."
        ctaHref="/tramites/marcas/solicitar"
        ctaLabel="Comenzar registro de marca"
      />

      <DomainGuide
        id="guia-patentes"
        accent="patentes"
        kicker="Patentes"
        title="¿Qué necesitas saber antes de patentar?"
        lead="Requisitos, búsqueda previa, tasas y el recorrido del examen hasta el otorgamiento."
        topics={patentesTopics}
        processTitle="El proceso de patente, paso a paso"
        processLead="La tramitación es más larga que una marca. Estas son las etapas principales."
        pasos={pasosPatentes}
        costos={costosPatentes}
        costNote="Los montos se calculan en UTM. El detalle aparece en el expediente antes de cada pago."
        ctaHref="/tramites/patentes/solicitar"
        ctaLabel="Comenzar solicitud de patente"
      />

      <section className="portal-ambient-hero py-gob-8">
        <ContainerGRI size="portal" className="relative z-[1] flex flex-col min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between gap-gob-6">
          <div className="max-w-xl space-y-gob-3">
            <h2 className="portal-h2 text-gob-text-inverse">¿Listo para proteger tu marca?</h2>
            <p className="portal-lead text-gob-text-inverse/90">Completa el formulario guiado en menos de 15 minutos.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-gob-3">
            <Button size="form" className="rounded-full bg-gob-primary hover:bg-gob-primary-dark font-medium h-11 px-gob-6" asChild>
              <Link href="/tramites/marcas/solicitar">Comenzar mi registro</Link>
            </Button>
            <Button
              variant="outline"
              size="form"
              className="rounded-full border-2 border-white/70 bg-transparent text-gob-text-inverse hover:bg-white/10 font-medium h-11 px-gob-6"
              asChild
            >
              <Link href="/contacto">Tengo dudas, hablar con un ejecutivo</Link>
            </Button>
          </div>
        </ContainerGRI>
      </section>

      <section className="py-gob-8">
        <ContainerGRI size="portal" className="space-y-gob-6">
          <div className="text-center space-y-gob-3 max-w-2xl mx-auto">
            <h2 className="portal-h2 text-gob-text">Novedades</h2>
            <p className="portal-lead text-muted-foreground">Mantente informado de los últimos anuncios y noticias de INAPI.</p>
          </div>
          <div className="grid min-[600px]:grid-cols-3 gap-gob-5">
            {novedades.map(n => (
              <article
                key={n.titulo}
                className="border border-gob-border rounded-gob-lg overflow-hidden bg-card shadow-elevation-02 flex flex-col"
              >
                <PortalImagePlaceholder label="Imagen de noticia" className="h-48 rounded-none border-0 border-b" />
                <div className="p-gob-5 flex flex-col flex-1 space-y-gob-3">
                  <p className="portal-kicker text-gob-primary">{n.fecha}</p>
                  <h3 className="font-heading font-medium text-gob-text leading-[1.5] text-gri-h2">
                    <Link href={n.href} className="hover:text-gob-link hover:underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus">
                      {n.titulo}
                    </Link>
                  </h3>
                  <p className="text-gri-body text-muted-foreground flex-1 leading-[1.5]">{n.resumen}</p>
                </div>
              </article>
            ))}
          </div>
          <p className="text-center">
            <Button size="form" className="rounded-full bg-inapi-cta hover:bg-gob-primary-dark font-medium" asChild>
              <Link href="/sala-de-prensa">Ir a la sala de prensa</Link>
            </Button>
          </p>
        </ContainerGRI>
      </section>

      <BannerSection title="Plataforma de datos">
        <div className="max-w-xl mx-auto text-center space-y-gob-4 text-gob-text-inverse">
          <h3 className="portal-h3">Información tecnológica de patentes</h3>
          <p className="text-gri-h2 font-medium">Programa de desarrollo productivo sostenible</p>
          <span className="inline-block rounded-gob-sm bg-inapi-portal-hero px-gob-4 py-gob-2 text-gri-body-sm font-medium">
            Datos abiertos
          </span>
          <div>
            <Button size="form" className="rounded-full bg-background text-inapi-portal-hero hover:bg-white/90 font-medium" asChild>
              <Link href="/datos-abiertos">Abrir la plataforma de datos</Link>
            </Button>
          </div>
        </div>
      </BannerSection>

      <BannerSection title="Guías para usuarios">
        <div className="flex flex-col gap-gob-3 max-w-xs mx-auto text-center">
          <Button size="form" className="rounded-full bg-inapi-cta hover:bg-gob-primary-dark font-medium text-gri-btn" asChild>
            <Link href="/marcas/como-registrar">Descargar guía de marcas</Link>
          </Button>
          <Button size="form" className="rounded-full bg-inapi-cta hover:bg-gob-primary-dark font-medium text-gri-btn" asChild>
            <Link href="/patentes/como-registrar">Descargar guía de patentes</Link>
          </Button>
        </div>
      </BannerSection>

      <BannerSection title="Cuenta pública 2026">
        <div className="max-w-xs mx-auto text-center">
          <Button size="form" className="rounded-full bg-gob-primary hover:bg-gob-primary-dark font-medium" asChild>
            <Link href="/sala-de-prensa/cuenta-publica-2026">Leer la cuenta pública 2026</Link>
          </Button>
        </div>
      </BannerSection>

      <HomeObservanciaCarousel />
    </>
  )
}
