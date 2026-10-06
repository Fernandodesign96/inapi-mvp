'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  Bell,
  FileSearch,
  FileText,
  FolderOpen,
  IdCard,
  Landmark,
  PenLine,
  Save,
  Stamp,
} from 'lucide-react'
import { ClaveUnicaButton } from '@/components/auth/ClaveUnicaButton'
import { Button } from '@/components/ui/button'
import { TipWrap } from '@/components/tramites/HelpTooltip'
import { TramitesMain } from '@/components/tramites/ui-helpers'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

const MARCAS_ACCIONES = [
  { href: '/tramites/notificaciones?ambito=marcas', label: 'Notificaciones', icon: Bell, tip: 'Avisos de tus marcas' },
  { href: '/tramites/marcas/documentos', label: 'Tus documentos', icon: FolderOpen, tip: 'Expediente digital de una marca' },
  { href: '/tramites/marcas/solicitudes-guardadas', label: 'Solicitudes guardadas', icon: Save, tip: 'Retoma un borrador' },
  { href: '/tramites/marcas/escritos', label: 'Escritos', icon: PenLine, tip: 'Presenta un escrito' },
  { href: '/tramites/marcas/solicitar', label: 'Solicitar marca', icon: Stamp, tip: 'Inicia una solicitud nueva' },
  { href: '/marcas/buscador-similitud', label: 'Buscador de Marcas', icon: FileSearch, tip: 'Compara tu nombre con marcas anteriores' },
  { href: '/tramites/marcas/formularios', label: 'Formularios', icon: FileText, tip: 'Descarga PDFs de marcas' },
  { href: '/tramites/marcas/certificados', label: 'Certificados', icon: IdCard, tip: 'Pide un certificado de marca' },
]

const PATENTES_ACCIONES = [
  { href: '/tramites/notificaciones?ambito=patentes', label: 'Notificaciones', icon: Bell, tip: 'Avisos de tus patentes' },
  { href: '/tramites/patentes/documentos', label: 'Tus documentos', icon: FolderOpen, tip: 'Expediente digital de una patente' },
  { href: '/tramites/patentes/solicitudes-guardadas', label: 'Solicitudes guardadas', icon: Save, tip: 'Retoma un borrador' },
  { href: '/tramites/patentes/escritos', label: 'Escritos', icon: PenLine, tip: 'Presenta un escrito' },
  { href: '/tramites/patentes/solicitar', label: 'Solicitar patente o MU', icon: Landmark, tip: 'Patente o modelo de utilidad' },
  { href: '/tramites/patentes/solicitar-diseno', label: 'Solicitar diseño', icon: Stamp, tip: 'Diseño o dibujo industrial' },
  { href: '/tramites/patentes/buscador', label: 'Buscador de Patentes', icon: FileSearch, tip: 'Busca patentes y diseños' },
  { href: '/tramites/patentes/formularios', label: 'Formularios', icon: FileText, tip: 'Descarga PDFs de patentes' },
  { href: '/tramites/patentes/certificados', label: 'Certificados', icon: IdCard, tip: 'Pide un certificado de patente' },
]

function ActionGrid({
  items,
  accent,
}: {
  items: typeof MARCAS_ACCIONES
  accent: 'marcas' | 'patentes'
}) {
  return (
    <ul className="grid gap-gob-3 min-[600px]:grid-cols-2 min-[905px]:grid-cols-3">
      {items.map(item => {
        const Icon = item.icon
        return (
          <li key={item.href + item.label}>
            <TipWrap text={item.tip}>
              <Link
                href={item.href}
                className={cn(
                  'flex min-h-11 items-center gap-gob-3 rounded-gob-md border border-gob-border bg-card px-gob-4 py-gob-4 hover:border-gob-primary/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                  accent === 'marcas' ? 'hover:border-gob-accent/60' : 'hover:border-gob-primary',
                )}
              >
                <span
                  className={cn(
                    'flex size-10 items-center justify-center rounded-gob-md',
                    accent === 'marcas' ? 'bg-gob-accent/10 text-gob-accent' : 'bg-gob-primary/10 text-gob-primary',
                  )}
                >
                  <Icon className="w-5 h-5" aria-hidden />
                </span>
                <span className="text-gri-body font-medium text-gob-text">{item.label}</span>
              </Link>
            </TipWrap>
          </li>
        )
      })}
    </ul>
  )
}

export default function TramitesHomePage() {
  const { session, ready } = useTramitesSession()
  const router = useRouter()

  if (!ready) {
    return <TramitesMain>Cargando…</TramitesMain>
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
          <ActionGrid items={MARCAS_ACCIONES} accent="marcas" />
        </section>
        <section className="space-y-gob-4">
          <h2 className="font-heading text-xl font-medium text-gob-text border-l-4 border-gob-primary pl-gob-3">Patentes</h2>
          <ActionGrid items={PATENTES_ACCIONES} accent="patentes" />
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
