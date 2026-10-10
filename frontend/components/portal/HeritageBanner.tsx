import { ArrowRight, Plus } from 'lucide-react'
import Link from 'next/link'

const LIBRO_MARCAS = 'https://www.inapi.cl/libro_marca/mobile/index.html#p=1'
const LIBRO_PATENTES = 'https://www.inapi.cl/libro1_patente/index.html'
const MUSEO = 'https://www.inapi.cl/galeria/'

export function HeritageBanner() {
  return (
    <section aria-label="Conoce más" className="overflow-hidden rounded-gob-md bg-[#3d5c80] text-white">
      <div className="relative grid min-[905px]:grid-cols-3">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'radial-gradient(circle at 12% 70%, #9ec4ea 1.5px, transparent 2px), radial-gradient(circle at 80% 30%, #9ec4ea 1.5px, transparent 2px)',
            backgroundSize: '48px 48px',
          }}
        />
        <div className="relative z-[1] flex flex-col justify-center gap-gob-4 border-white/20 p-gob-6 min-[905px]:border-r min-[905px]:p-gob-8">
          <a
            href={LIBRO_MARCAS}
            className="group inline-flex items-start gap-2 text-gri-body-sm font-medium leading-snug text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Primer libro de registro de marcas - 1885 a 1891
            <ArrowRight className="mt-0.5 size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
          <a
            href={LIBRO_PATENTES}
            className="group inline-flex items-start gap-2 text-gri-body-sm font-medium leading-snug text-white hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Primer libro de patentes - 1840 a 1912
            <ArrowRight className="mt-0.5 size-4 shrink-0 transition-transform group-hover:translate-x-0.5" aria-hidden />
          </a>
        </div>
        <Link
          href="/conoce-mas/historia-propiedad-industrial"
          className="relative z-[1] flex min-h-[11rem] flex-col items-center justify-center gap-gob-3 border-white/20 p-gob-6 text-center hover:bg-white/5 min-[905px]:border-r"
        >
          <span className="font-heading text-2xl font-medium leading-tight">
            Historia de
            <br />
            la propiedad industrial
          </span>
          <span className="flex size-9 items-center justify-center rounded-full border border-white/70" aria-hidden>
            <Plus className="size-4" />
          </span>
        </Link>
        <a
          href={MUSEO}
          className="relative z-[1] flex min-h-[11rem] flex-col items-center justify-center gap-gob-3 p-gob-6 text-center hover:bg-white/5"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="font-heading text-2xl font-medium leading-tight">
            Museo virtual
            <br />
            de INAPI
          </span>
          <span className="flex size-9 items-center justify-center rounded-full border border-white/70" aria-hidden>
            <Plus className="size-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
