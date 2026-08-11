import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import {
  PortalBlockquote,
  PortalImagePlaceholder,
  PortalMain,
  PortalSectionTitle,
} from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'

export const metadata: Metadata = {
  title: 'Cuenta Pública Participativa 2026 — INAPI',
  description:
    'INAPI realizó su Cuenta Pública Participativa 2026 en Valparaíso y reforzó su compromiso con la descentralización.',
}

const relatedNews = [
  {
    href: '/sala-de-prensa/patentes-nacionales-2026',
    date: '21 de junio de 2026',
    title: 'Chile alcanza su mayor cifra de solicitudes de patentes nacionales en más de una década',
    imgAlt: 'Patentes nacionales',
  },
  {
    href: '#',
    date: '15 de julio de 2026',
    title: 'INAPI consolida su agenda de cooperación internacional en las Asambleas de la OMPI',
    imgAlt: 'Asambleas de la OMPI',
  },
]

export default function CuentaPublica2026Page() {
  return (
    <PortalShell
      {...portalShellProps('/sala-de-prensa/cuenta-publica-2026', {
        pageTitle: 'INAPI realizó su Cuenta Pública Participativa 2026 en Valparaíso',
        active: 'prensa',
      })}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <article>
            <p className="text-gri-body-sm text-muted-foreground mb-gob-2">
              <time dateTime="2026-06-21">21 de junio de 2026</time> · Publicado por INAPI
            </p>

            <PortalImagePlaceholder
              label="Foto de la Cuenta Pública 2026 en Valparaíso"
              className="w-full h-[380px] mb-gob-5"
            />

            <p className="text-lg font-medium text-gob-text leading-relaxed mb-gob-6 pl-gob-4 border-l-4 border-inapi-cta max-w-3xl">
              La jornada mostró los avances de INAPI en eficiencia, liderazgo internacional, descentralización y
              modernización, y los desafíos para seguir fortaleciendo la innovación y la protección de la propiedad
              industrial en Chile.
            </p>

            <div className="text-gri-body text-muted-foreground leading-relaxed space-y-gob-4 max-w-3xl">
              <p>
                En la Casa Central de la Pontificia Universidad Católica de Valparaíso, INAPI realizó su Cuenta Pública
                Participativa 2026. La instancia estuvo encabezada por el director nacional,{' '}
                <strong className="text-gob-text">Esteban Figueroa Nagel</strong>, quien presentó los avances de 2025 y los
                desafíos proyectados para los próximos años.
              </p>
              <p>
                La actividad reunió a autoridades regionales y nacionales y a representantes de la innovación, la academia,
                el emprendimiento y el sector productivo, como un espacio de diálogo y transparencia sobre el rol de la
                propiedad industrial.
              </p>

              <PortalBlockquote>
                &ldquo;La propiedad industrial dejó de ser solo un trámite administrativo para transformarse en una
                herramienta clave para proteger la capacidad de crear valor, impulsar la innovación y fortalecer la
                competitividad del país.&rdquo;
              </PortalBlockquote>

              <h3 className="font-heading text-xl font-medium text-gob-text mt-gob-6 mb-gob-3">Avances en eficiencia</h3>
              <p>
                Durante 2025, el tiempo promedio de tramitación de patentes llegó a{' '}
                <strong className="text-gob-text">2,3 años</strong> y el <strong className="text-gob-text">97%</strong> de
                las solicitudes de marcas se resolvió en menos de siete meses. El rezago en juicios de oposición bajó del
                56% al <strong className="text-gob-text">3%</strong>.
              </p>
              <p>
                INAPI también renovó su rol como Autoridad Internacional de Búsqueda y Examen del Tratado de Cooperación en
                materia de Patentes (PCT) hasta <strong className="text-gob-text">2038</strong>, lo que le permite seguir
                examinando invenciones en español e inglés para usuarios de distintos países.
              </p>

              <h3 className="font-heading text-xl font-medium text-gob-text mt-gob-6 mb-gob-3">Descentralización</h3>
              <p>La ceremonia se realizó en Valparaíso como parte de una estrategia para acercar la propiedad industrial a las regiones.</p>

              <PortalBlockquote>
                &ldquo;El desafío es que la innovación y la propiedad industrial no estén concentradas en unos pocos
                territorios o sectores, sino que lleguen a todos los rincones de Chile.&rdquo;
              </PortalBlockquote>

              <p>
                En esa línea, el director destacó los resultados de <strong className="text-gob-text">INAPI+Cerca</strong>,
                una campaña piloto en las regiones de Coquimbo, Maule y Los Lagos que conectó con comunidades rurales y
                personas mayores.
              </p>

              <h3 className="font-heading text-xl font-medium text-gob-text mt-gob-6 mb-gob-3">Compromisos para 2026</h3>
              <ul className="list-disc pl-gob-5 space-y-gob-2">
                <li>Modernizar el sitio web institucional.</li>
                <li>Incorporar herramientas de inteligencia artificial en el examen de solicitudes.</li>
                <li>Implementar el Tratado sobre el Derecho de Patentes (PLT).</li>
                <li>Impulsar el financiamiento basado en activos intangibles.</li>
                <li>Iniciar la Estrategia Nacional de Propiedad Industrial.</li>
              </ul>

              <p>
                La jornada cerró con la presentación de <strong className="text-gob-text">María José García</strong>,
                subdirectora de Patentes, sobre el valor de las patentes para la innovación y la transferencia tecnológica,
                y con una invitación a participar mediante el{' '}
                <a href="#" className="font-bold text-gob-link hover:text-gob-primary-dark">
                  formulario de participación ciudadana de la Cuenta Pública 2026
                </a>
                .
              </p>
            </div>

            <p className="mt-gob-8">
              <Link
                href="/sala-de-prensa"
                className="inline-flex items-center gap-gob-2 font-bold text-gob-link hover:text-gob-primary-dark"
              >
                <ArrowLeft className="w-5 h-5" aria-hidden />
                Volver a Sala de Prensa
              </Link>
            </p>
          </article>

          <section aria-label="Otras noticias" className="mt-gob-10 pt-gob-8 border-t border-gob-border">
            <PortalSectionTitle>Otras noticias</PortalSectionTitle>
            <div className="grid min-[600px]:grid-cols-2 gap-gob-5">
              {relatedNews.map(item => (
                <Link
                  key={item.title}
                  href={item.href}
                  className="bg-card border border-gob-border rounded-gob-md overflow-hidden hover:border-gob-link transition-colors no-underline text-inherit"
                >
                  <PortalImagePlaceholder label={item.imgAlt} className="h-[150px] rounded-none border-0 border-b border-gob-border" />
                  <div className="p-gob-4">
                    <p className="text-gri-body-xs text-muted-foreground mb-1.5">{item.date}</p>
                    <p className="text-gri-body-sm font-bold text-gob-text leading-snug">{item.title}</p>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
