import Link from 'next/link'
import { CheckCircle2, ChevronRight, CreditCard, HelpCircle, Layers, Search, ShieldCheck } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { Button } from '@/components/ui/button'
import { PortalImagePlaceholder } from '@/components/portal/content'
import { HomeObservanciaCarousel } from '@/components/portal/HomeObservanciaCarousel'

const cifras = [
  { valor: '+50.000', texto: 'marcas registradas al año' },
  { valor: '6 a 8 meses', texto: 'tiempo promedio del proceso' },
  { valor: '10 años', texto: 'de protección renovable' },
]

const saberCards = [
  {
    icon: HelpCircle,
    titulo: '¿Qué es una marca?',
    texto: 'Es el signo que distingue tus productos o servicios. Puede ser una palabra, un logo o una combinación de ambos.',
  },
  {
    icon: ShieldCheck,
    titulo: '¿Cómo se protege?',
    texto: 'Al registrarla en INAPI obtienes derechos exclusivos en Chile por 10 años renovables.',
  },
  {
    icon: Layers,
    titulo: '¿Cuánto tiempo toma?',
    texto: 'El proceso completo suele tardar entre 6 y 8 meses desde que presentas tu solicitud.',
  },
]

const pasosGrid = [
  { n: 1, icon: Search, title: '¿Puedo registrar mi marca?', body: 'Verifica que sea distintiva y no esté prohibida por la ley.' },
  { n: 2, icon: Search, title: 'Busca si ya existe', body: 'Compara con marcas registradas antes de pagar la solicitud.' },
  { n: 3, icon: Layers, title: 'Elige las clases de Niza', body: 'Define qué productos o servicios protege tu marca.' },
  { n: 4, icon: CreditCard, title: 'Presenta y paga', body: 'Completa el formulario y paga la tasa por cada clase.' },
  { n: 5, icon: CheckCircle2, title: 'Seguimiento y registro', body: 'INAPI publica tu solicitud y emite el certificado si no hay oposiciones.' },
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
  imageLabel,
  children,
  dark = false,
}: {
  title: string
  imageLabel: string
  children: React.ReactNode
  dark?: boolean
}) {
  return (
    <section className="mt-gob-8 flex flex-col overflow-hidden">
      <div className="bg-card py-gob-4 text-center border-b-4 border-gob-primary">
        <h2 className="portal-h2 text-gob-text">{title}</h2>
      </div>
      <div className="relative min-h-[280px] flex items-center justify-end">
        <PortalImagePlaceholder label={imageLabel} className="absolute inset-0 rounded-none border-0 min-h-[280px]" />
        <div
          className={`absolute inset-0 ${dark ? 'bg-inapi-portal-hero/55' : 'bg-background/50'}`}
          aria-hidden
        />
        <div className={`relative z-[1] p-gob-7 min-[600px]:p-gob-8 ${dark ? 'text-gob-text-inverse' : 'text-gob-text'}`}>
          {children}
        </div>
      </div>
    </section>
  )
}

export function HomeExtraSections() {
  return (
    <>
      <section className="bg-inapi-portal-deep text-gob-text-inverse border-t border-white/12">
        <ContainerGRI size="portal" className="py-gob-7 flex flex-wrap justify-around gap-gob-6 text-center">
          {cifras.map(c => (
            <div key={c.valor} className="min-w-[160px] space-y-gob-2">
              <p className="font-heading text-[2rem] min-[600px]:text-[2.25rem] font-medium leading-[1.5] text-gob-focus">
                {c.valor}
              </p>
              <p className="text-gri-body text-gob-text-inverse/78">{c.texto}</p>
            </div>
          ))}
        </ContainerGRI>
      </section>

      <section className="py-gob-8">
        <ContainerGRI size="portal" className="space-y-gob-6">
          <div className="max-w-3xl space-y-gob-3">
            <h2 className="portal-h2 text-gob-text">¿Qué necesitas saber antes de empezar?</h2>
            <p className="portal-lead text-muted-foreground">Tres conceptos básicos para preparar tu solicitud.</p>
          </div>
          <div className="grid min-[600px]:grid-cols-3 gap-gob-5">
            {saberCards.map(card => {
              const Icon = card.icon
              return (
                <article
                  key={card.titulo}
                  className="border border-gob-border rounded-gob-lg p-gob-6 bg-card shadow-elevation-02 space-y-gob-4"
                >
                  <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg text-gob-primary">
                    <Icon className="w-6 h-6" aria-hidden />
                  </span>
                  <h3 className="font-heading text-gri-h1 font-medium text-gob-text">{card.titulo}</h3>
                  <p className="text-gri-body text-muted-foreground leading-[1.5]">{card.texto}</p>
                </article>
              )
            })}
          </div>
        </ContainerGRI>
      </section>

      <section id="proceso-grid" className="bg-gob-surface-elevated py-gob-8 border-y border-gob-border">
        <ContainerGRI size="portal" className="space-y-gob-6">
          <div className="max-w-3xl space-y-gob-3">
            <h2 className="portal-h2 text-gob-text">El proceso de registro, paso a paso</h2>
            <p className="portal-lead text-muted-foreground">Antes de empezar, conoce qué vas a hacer y cuánto te costará.</p>
          </div>
          <ol className="grid min-[600px]:grid-cols-2 min-[905px]:grid-cols-5 gap-gob-4 list-none">
            {pasosGrid.map(paso => {
              const Icon = paso.icon
              return (
                <li
                  key={paso.n}
                  className="bg-card rounded-gob-lg p-gob-5 border-t-4 border-gob-primary shadow-elevation-02"
                >
                  <div className="flex items-center gap-gob-3 mb-gob-4">
                    <span className="flex size-11 items-center justify-center rounded-full bg-gob-primary text-gob-text-inverse font-medium text-gri-body">
                      {paso.n}
                    </span>
                    <Icon className="w-6 h-6 text-gob-primary" aria-hidden />
                  </div>
                  <h3 className="font-heading font-medium text-gob-text text-gri-h2 mb-gob-2 leading-[1.5]">{paso.title}</h3>
                  <p className="text-gri-body-sm text-muted-foreground leading-[1.5]">{paso.body}</p>
                </li>
              )
            })}
          </ol>
          <div className="bg-card border border-gob-border rounded-gob-lg p-gob-6 flex flex-wrap gap-gob-5 items-start shadow-elevation-01">
            <div className="flex items-center gap-gob-3">
              <span className="inline-flex size-11 items-center justify-center rounded-gob-md bg-gob-info-bg">
                <CreditCard className="w-6 h-6 text-gob-primary" aria-hidden />
              </span>
              <h3 className="font-heading text-gri-h1 font-medium text-gob-text">¿Cuánto vas a pagar en total?</h3>
            </div>
            <ul className="flex-1 min-w-[280px] space-y-gob-3 text-gri-body text-muted-foreground list-none">
              <li className="flex gap-gob-3">
                <CheckCircle2 className="w-5 h-5 text-gob-success shrink-0 mt-0.5" aria-hidden />
                <span>
                  <strong className="text-gob-text font-medium">Tasa de solicitud:</strong> unos $70.000 por cada clase de Niza.
                </span>
              </li>
              <li className="flex gap-gob-3">
                <CheckCircle2 className="w-5 h-5 text-gob-success shrink-0 mt-0.5" aria-hidden />
                <span>
                  <strong className="text-gob-text font-medium">Publicación en el Diario Oficial:</strong> costo adicional según tarifa vigente.
                </span>
              </li>
              <li className="flex gap-gob-3">
                <CheckCircle2 className="w-5 h-5 text-gob-success shrink-0 mt-0.5" aria-hidden />
                <span>
                  <strong className="text-gob-text font-medium">Arancel de registro:</strong> se paga al emitirse el certificado.
                </span>
              </li>
              <li className="text-gri-body-sm pl-8">
                Los montos se calculan en UTM. Verás el total actualizado antes de confirmar el pago.
              </li>
            </ul>
          </div>
          <Button size="form" className="rounded-gob-md bg-inapi-cta hover:bg-gob-primary-dark font-medium h-11 px-gob-6" asChild>
            <Link href="/auth">
              Comenzar mi registro
              <ChevronRight className="w-5 h-5 ml-1" aria-hidden />
            </Link>
          </Button>
        </ContainerGRI>
      </section>

      <section className="bg-inapi-portal-hero text-gob-text-inverse py-gob-8">
        <ContainerGRI size="portal" className="flex flex-col min-[600px]:flex-row min-[600px]:items-center min-[600px]:justify-between gap-gob-6">
          <div className="max-w-xl space-y-gob-3">
            <h2 className="portal-h2 text-gob-text-inverse">¿Listo para proteger tu marca?</h2>
            <p className="portal-lead text-gob-text-inverse/90">Completa el formulario guiado en menos de 15 minutos.</p>
          </div>
          <div className="flex flex-col sm:flex-row gap-gob-3">
            <Button size="form" className="rounded-gob-md bg-gob-primary hover:bg-gob-primary-dark font-medium h-11 px-gob-6" asChild>
              <Link href="/auth">Comenzar mi registro</Link>
            </Button>
            <Button
              variant="outline"
              size="form"
              className="rounded-gob-md border-2 border-white/70 bg-transparent text-gob-text-inverse hover:bg-white/10 font-medium h-11 px-gob-6"
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
                  <p className="text-gri-body-sm font-medium uppercase tracking-wide text-gob-primary">{n.fecha}</p>
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
            <Button size="form" className="rounded-gob-md bg-inapi-marcas-accent hover:bg-[#E88000] font-medium" asChild>
              <Link href="/sala-de-prensa">Ver todas las noticias</Link>
            </Button>
          </p>
        </ContainerGRI>
      </section>

      <BannerSection title="Plataforma de datos" imageLabel="Imagen Plataforma de Datos" dark>
        <div className="max-w-xl mx-auto text-center space-y-gob-4 text-gob-text-inverse">
          <h3 className="portal-h3">Información tecnológica de patentes</h3>
          <p className="text-gri-h2 font-medium">Programa de desarrollo productivo sostenible</p>
          <span className="inline-block rounded-gob-sm bg-inapi-portal-hero px-gob-4 py-gob-2 text-gri-body-sm font-medium uppercase tracking-wide">
            Plataforma
          </span>
          <div>
            <Button size="form" className="rounded-gob-md bg-background text-inapi-portal-hero hover:bg-white/90 font-medium" asChild>
              <Link href="/datos-abiertos">Acceder</Link>
            </Button>
          </div>
        </div>
      </BannerSection>

      <BannerSection title="Guías para usuarios" imageLabel="Imagen Guías para Usuarios">
        <div className="flex flex-col gap-gob-3 max-w-xs ml-auto mr-gob-5">
          <Button size="form" className="rounded-gob-md bg-inapi-cta hover:bg-gob-primary-dark font-medium text-gri-btn" asChild>
            <Link href="/marcas/como-registrar">Descargar guía de marcas</Link>
          </Button>
          <Button size="form" className="rounded-gob-md bg-inapi-cta hover:bg-gob-primary-dark font-medium text-gri-btn" asChild>
            <Link href="/patentes/como-registrar">Descargar guía de patentes</Link>
          </Button>
        </div>
      </BannerSection>

      <BannerSection title="Cuenta pública 2026" imageLabel="Imagen Cuenta Pública 2026">
        <div className="max-w-xs ml-auto mr-gob-5">
          <Button size="form" className="rounded-gob-md bg-gob-primary hover:bg-gob-primary-dark font-medium" asChild>
            <Link href="/sala-de-prensa/cuenta-publica-2026">Acceder</Link>
          </Button>
        </div>
      </BannerSection>

      <HomeObservanciaCarousel />
    </>
  )
}
