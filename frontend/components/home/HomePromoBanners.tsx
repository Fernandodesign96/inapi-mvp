import Image from 'next/image'
import Link from 'next/link'
import { HomeRuleHeading } from '@/components/home/HomeRuleHeading'

const banners = [
  {
    title: 'Plataforma de datos',
    href: 'https://dps.inapi.cl/',
    external: true,
    src: '/inapi-mvp/home/banner-itp.png',
    width: 2545,
    height: 285,
    alt: 'Plataforma de información tecnológica de patentes. Descubre, analiza y decide.',
  },
  {
    title: 'Programa de asistencia a inventores',
    href: 'https://sites.google.com/inapi.cl/pai2026/inicio',
    external: true,
    src: '/inapi-mvp/home/banner-pai.png',
    width: 2545,
    height: 285,
    alt: 'Programa de Asistencia a Inventores de INAPI.',
  },
  {
    title: 'Cuenta Pública 2026',
    href: '/sala-de-prensa/cuenta-publica-2026',
    external: false,
    src: '/inapi-mvp/home/banner-cuenta-publica.png',
    width: 2545,
    height: 285,
    alt: 'Cuenta Pública Participativa 2026 del Instituto Nacional de Propiedad Industrial.',
  },
] as const

export function HomePromoBanners() {
  return (
    <section aria-label="Programas y plataformas" className="bg-card py-gob-8 min-[905px]:py-12">
      <div className="flex flex-col gap-gob-8 min-[905px]:gap-20">
        {banners.map(banner => {
          const image = (
            <Image
              src={banner.src}
              alt={banner.alt}
              width={banner.width}
              height={banner.height}
              className="mx-auto h-auto w-full max-w-[2545px]"
              sizes="100vw"
              priority={false}
            />
          )
          return (
            <article key={banner.src} className="space-y-gob-6 min-[905px]:space-y-gob-8">
              <HomeRuleHeading>{banner.title}</HomeRuleHeading>
              {banner.external ? (
                <a
                  href={banner.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:ring-offset-2"
                >
                  {image}
                </a>
              ) : (
                <Link
                  href={banner.href}
                  className="block w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:ring-offset-2"
                >
                  {image}
                </Link>
              )}
            </article>
          )
        })}
      </div>
    </section>
  )
}
