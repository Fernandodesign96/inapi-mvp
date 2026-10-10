import type { Metadata } from 'next'
import Link from 'next/link'
import { Search } from 'lucide-react'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { ToolFlowShell } from '@/components/layout/ToolFlowShell'
import { BuscadorSimilitudMarca } from '@/components/portal/BuscadorSimilitudMarca'
import { GlosarioTerm } from '@/components/GlosarioTerm'
import { Button } from '@/components/ui/button'

export const metadata: Metadata = {
  title: 'Buscador de marcas',
  description:
    'Compara tu marca con las ya solicitadas o registradas en INAPI. Los resultados aparecen en esta misma página.',
}

export default function MarcasBuscadoresPage() {
  return (
    <ToolFlowShell
      active="buscador"
      variant="page"
      pageTitle="Buscador de marcas"
      pageSubtitle="Compara tu signo con marcas ya solicitadas o registradas. Los resultados se muestran aquí, sin cambiar de dirección."
      breadcrumbs={[
        { label: 'Marcas', href: '/marcas' },
        { label: 'Buscador de marcas' },
      ]}
    >
      <ContainerGRI size="portal" className="py-gob-6 pb-gob-8 space-y-gob-7">
        <section className="rounded-gob-lg border border-gob-border bg-card p-gob-5 space-y-gob-3 text-left">
          <h2 className="portal-h3 text-gob-text">Buscador de patentes</h2>
          <p className="text-gri-body text-muted-foreground leading-[1.5]">
            Si tu consulta es sobre un invento, usa el buscador de patentes. Es una herramienta distinta: no compara nombres de marca ni{' '}
            <GlosarioTerm termino="Niza">clases de Niza</GlosarioTerm>.
          </p>
          <Button variant="outline" size="form" className="rounded-full" asChild>
            <Link href="/tramites/patentes/buscador">
              <Search className="w-5 h-5 mr-2" aria-hidden />
              Abrir el buscador de patentes
            </Link>
          </Button>
        </section>
        <BuscadorSimilitudMarca />
      </ContainerGRI>
    </ToolFlowShell>
  )
}
