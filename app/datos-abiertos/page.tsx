import type { Metadata } from 'next'
import Link from 'next/link'
import { Database } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain } from '@/components/portal/content'

export const metadata: Metadata = {
  title: 'Datos abiertos — INAPI',
  description:
    'Conjuntos de datos de INAPI disponibles para descarga y reutilización en formatos abiertos.',
}

const datasets = [
  {
    title: 'Solicitudes y registros de marcas',
    href: '#',
  },
  {
    title: 'Solicitudes y registros de patentes',
    href: '#',
  },
  {
    title: 'Indicaciones geográficas y denominaciones de origen',
    href: '#',
  },
]

export default function DatosAbiertosPage() {
  return (
    <PortalShell
      variant="page"
      pageTitle="Datos abiertos"
      pageSubtitle="Estos conjuntos de datos están disponibles para su descarga y reutilización, en formatos abiertos y bajo licencia Creative Commons."
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <div className="grid min-[600px]:grid-cols-3 gap-gob-4">
            {datasets.map(dataset => (
              <article
                key={dataset.title}
                className="border border-gob-border rounded-gob-md p-gob-5 flex flex-col gap-gob-3 bg-card"
              >
                <Database className="w-7 h-7 text-inapi-cta" aria-hidden />
                <h2 className="font-bold text-gob-text text-gri-body-sm leading-snug">{dataset.title}</h2>
                <Link
                  href={dataset.href}
                  className="text-gri-body-xs font-bold text-gob-link hover:text-gob-primary-dark"
                >
                  Descargar conjunto de datos
                </Link>
              </article>
            ))}
          </div>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
