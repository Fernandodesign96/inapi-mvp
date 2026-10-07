'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { Button } from '@/components/ui/button'
import { TipWrap } from '@/components/tramites/HelpTooltip'
import { Spinner, TramitesMain } from '@/components/tramites/ui-helpers'
import { MARCAS_MEGA, PATENTES_MEGA, type MegaColumn, type MegaItem } from '@/lib/tramites/nav'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

function ShortcutLink({
  item,
  accent,
}: {
  item: MegaItem
  accent: 'marcas' | 'patentes'
}) {
  const className = cn(
    'flex min-h-11 items-center gap-gob-3 rounded-gob-md border border-gob-border bg-card px-gob-4 py-gob-4 transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
    accent === 'marcas' ? 'hover:border-gob-accent/60 hover:shadow-elevation-02' : 'hover:border-gob-primary hover:shadow-elevation-02',
    item.stub && 'opacity-80',
  )
  const inner = <span className="text-gri-body font-medium text-gob-text">{item.label}</span>
  if (item.external) {
    return (
      <TipWrap text={item.tooltip}>
        <a href={item.href} className={className} rel="noopener noreferrer">
          {inner}
        </a>
      </TipWrap>
    )
  }
  return (
    <TipWrap text={item.tooltip}>
      <Link href={item.href} className={className}>
        {inner}
      </Link>
    </TipWrap>
  )
}

function MegaGrid({ columns, accent }: { columns: MegaColumn[]; accent: 'marcas' | 'patentes' }) {
  return (
    <div className="space-y-gob-6">
      {columns.map(col => (
        <section key={col.title} className="space-y-gob-3">
          <h3 className="text-gri-label font-semibold uppercase tracking-wider text-muted-foreground">{col.title}</h3>
          <ul className="grid gap-gob-3 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3">
            {col.items.map(item => (
              <li key={item.href + item.label}>
                <ShortcutLink item={item} accent={accent} />
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  )
}

export default function TramitesHomePage() {
  const { session, ready } = useTramitesSession()
  const router = useRouter()

  if (!ready) {
    return (
      <TramitesMain>
        <Spinner label="Cargando tu sesión" />
      </TramitesMain>
    )
  }

  if (session.authenticated) {
    return (
      <TramitesMain>
        <div className="space-y-gob-2">
          <h1 className="font-heading text-gri-h2 font-medium text-gob-text">Hola, {session.nombre.split(' ')[0]}</h1>
          <p className="text-gri-body text-muted-foreground max-w-3xl">
            Elige un trámite de marcas o de patentes. RUN {session.run}. Último ingreso con{' '}
            {session.metodo === 'clave-unica' ? 'ClaveÚnica' : 'Clave INAPI'}.
          </p>
        </div>
        <section className="space-y-gob-4">
          <h2 className="font-heading text-xl font-medium text-gob-text border-l-4 border-gob-accent pl-gob-3">Marcas</h2>
          <MegaGrid columns={MARCAS_MEGA} accent="marcas" />
        </section>
        <section className="space-y-gob-4">
          <h2 className="font-heading text-xl font-medium text-gob-text border-l-4 border-gob-primary pl-gob-3">Patentes</h2>
          <MegaGrid columns={PATENTES_MEGA} accent="patentes" />
        </section>
      </TramitesMain>
    )
  }

  return (
    <TramitesMain>
      <div className="grid gap-gob-6 min-[905px]:grid-cols-2">
        <section className="rounded-gob-lg border border-gob-border bg-card p-gob-6 space-y-gob-4">
          <h1 className="font-heading text-gri-h2 font-medium text-gob-text">Trámites en línea</h1>
          <p className="text-gri-body text-gob-text leading-relaxed">
            Desde aquí solicitas marcas y patentes, revisas notificaciones, abres tus documentos y pides certificados.
          </p>
          <ul className="list-disc pl-gob-5 text-gri-body text-gob-text space-y-gob-2">
            <li>Presentar una solicitud nueva</li>
            <li>Seguir un expediente ya ingresado</li>
            <li>Usar el Buscador de Marcas o el Buscador de Patentes</li>
          </ul>
        </section>
        <section className="rounded-gob-lg border border-gob-border bg-card p-gob-6 space-y-gob-4">
          <h2 className="font-heading text-xl font-medium text-gob-text">Inicia sesión</h2>
          <p className="text-gri-body-sm text-muted-foreground">
            Si es tu primera vez, valida tu identidad con ClaveÚnica. Después puedes entrar con ClaveÚnica o con Clave INAPI.
          </p>
          <TipWrap text="Te lleva a una simulación de ClaveÚnica. No es el sitio oficial del Estado.">
            <span className="block">
              <ClaveUnicaButton
                onClick={() => {
                  router.push('/tramites/clave-unica?next=/tramites')
                }}
              />
            </span>
          </TipWrap>
          <Button asChild variant="outline" size="form" className="w-full">
            <Link href="/tramites/auth">Ingresar con Clave INAPI</Link>
          </Button>
          <p className="text-gri-body-sm">
            ¿Primera vez?{' '}
            <Link href="/tramites/registrarse" className="text-gob-link underline underline-offset-4">
              Regístrate
            </Link>
            . Primero validamos tu identidad con ClaveÚnica.
          </p>
        </section>
      </div>
    </TramitesMain>
  )
}
