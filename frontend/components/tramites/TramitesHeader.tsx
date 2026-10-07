'use client'

import { useEffect, useId, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { ChevronDown, LogOut, Menu, User, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip'
import { MARCAS_MEGA, PATENTES_MEGA, type MegaColumn } from '@/lib/tramites/nav'
import { useTramitesSession } from '@/lib/tramites/use-session'
import { cn } from '@/lib/utils'

function MegaPanel({ columns, accent }: { columns: MegaColumn[]; accent: 'marcas' | 'patentes' }) {
  const bar = accent === 'patentes' ? 'bg-gob-primary' : 'bg-gob-accent'
  return (
    <div className="absolute left-0 right-0 top-full z-50 border-b border-gob-border bg-card shadow-elevation-04">
      <div className={cn('h-1', bar)} />
      <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-6 grid gap-gob-6 min-[905px]:grid-cols-4">
        {columns.map(col => (
          <div key={col.title} className="space-y-gob-3">
            <p className="text-gri-label font-semibold uppercase tracking-wider text-muted-foreground">{col.title}</p>
            <ul className="space-y-1">
              {col.items.map(item => {
                const className =
                  'flex min-h-11 items-center rounded-gob-sm px-gob-2 text-gri-body-sm font-medium text-gob-link hover:bg-gob-surface-elevated hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus transition-colors duration-150'
                const inner = item.external ? (
                  <a href={item.href} className={className} rel="noopener noreferrer">
                    {item.label}
                  </a>
                ) : (
                  <Link href={item.href} className={className}>
                    {item.label}
                  </Link>
                )
                return (
                  <li key={item.href + item.label}>
                    <Tooltip>
                      <TooltipTrigger asChild>{inner}</TooltipTrigger>
                      <TooltipContent className="max-w-xs">{item.tooltip}</TooltipContent>
                    </Tooltip>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}

export function TramitesHeader() {
  const pathname = usePathname()
  return <TramitesHeaderInner key={pathname} />
}

function TramitesHeaderInner() {
  const router = useRouter()
  const { session, ready, logout } = useTramitesSession()
  const [open, setOpen] = useState<'marcas' | 'patentes' | null>(null)
  const [mobile, setMobile] = useState(false)
  const wrapRef = useRef<HTMLDivElement>(null)
  const marcasId = useId()
  const patentesId = useId()
  const loggedIn = ready && session.authenticated
  const logoHref = loggedIn ? '/tramites' : '/'
  const logoAria = loggedIn
    ? 'Ir a la pantalla principal de trámites'
    : 'Ir al inicio del portal INAPI'

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div ref={wrapRef} className="relative">
      <div className="bg-inapi-portal-nav text-gob-text-inverse">
        <div className="mx-auto max-w-[1140px] px-gob-4 min-[600px]:px-gob-5 py-gob-3 flex items-center justify-between gap-gob-4">
          <div className="flex items-center gap-gob-3 min-w-0">
            <Link
              href={logoHref}
              aria-label={logoAria}
              className="shrink-0 rounded-gob-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              <Image
                src="/inapi-mvp/inapi-logo.jpg"
                alt={logoAria}
                width={120}
                height={48}
                className="h-11 w-auto object-contain"
                priority
              />
            </Link>
            <Link
              href="/tramites"
              className="hidden min-[905px]:block text-gri-body-sm font-medium leading-snug rounded-gob-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
            >
              Trámites en línea
            </Link>
          </div>

          <nav className="hidden lg:flex items-center gap-gob-2" aria-label="Atajos de trámites">
            <button
              type="button"
              aria-expanded={open === 'marcas'}
              aria-controls={marcasId}
              onClick={() => setOpen(o => (o === 'marcas' ? null : 'marcas'))}
              onMouseEnter={() => setOpen('marcas')}
              className={cn(
                'inline-flex min-h-11 items-center gap-1 px-gob-4 text-gri-body font-medium border-b-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                open === 'marcas' ? 'border-gob-accent' : 'border-transparent hover:border-white/40',
              )}
            >
              Marcas
              <ChevronDown className="w-4 h-4" aria-hidden />
            </button>
            <button
              type="button"
              aria-expanded={open === 'patentes'}
              aria-controls={patentesId}
              onClick={() => setOpen(o => (o === 'patentes' ? null : 'patentes'))}
              onMouseEnter={() => setOpen('patentes')}
              className={cn(
                'inline-flex min-h-11 items-center gap-1 px-gob-4 text-gri-body font-medium border-b-[3px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                open === 'patentes' ? 'border-gob-primary' : 'border-transparent hover:border-white/40',
              )}
            >
              Patentes
              <ChevronDown className="w-4 h-4" aria-hidden />
            </button>
          </nav>

          <div className="flex items-center gap-gob-2">
            {ready && session.authenticated ? (
              <div className="hidden min-[600px]:flex items-center gap-gob-3">
                <span className="text-gri-body-xs max-w-[180px] truncate" title={session.nombre}>
                  <User className="inline w-4 h-4 mr-1" aria-hidden />
                  {session.nombre}
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-gob-text-inverse hover:bg-white/10 min-h-11"
                  onClick={() => {
                    logout()
                    router.push('/tramites')
                  }}
                >
                  <LogOut className="w-4 h-4" />
                  Salir
                </Button>
              </div>
            ) : (
              <Button asChild size="sm" className="hidden min-[600px]:inline-flex min-h-11 bg-gob-accent hover:bg-gob-accent/90">
                <Link href="/tramites/auth">Ingresar</Link>
              </Button>
            )}
            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden text-gob-text-inverse hover:bg-white/10"
              aria-label="Abrir menú de trámites"
              onClick={() => setMobile(true)}
            >
              <Menu className="w-6 h-6" />
            </Button>
          </div>
        </div>
      </div>

      {open === 'marcas' && (
        <div id={marcasId} onMouseLeave={() => setOpen(null)}>
          <MegaPanel columns={MARCAS_MEGA} accent="marcas" />
        </div>
      )}
      {open === 'patentes' && (
        <div id={patentesId} onMouseLeave={() => setOpen(null)}>
          <MegaPanel columns={PATENTES_MEGA} accent="patentes" />
        </div>
      )}

      {mobile && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Menú de trámites"
          className="fixed inset-0 z-[100] bg-inapi-portal-hero/98 overflow-y-auto"
        >
          <div className="flex justify-between items-center p-gob-5 border-b border-white/10">
            <Link href={logoHref} aria-label={logoAria} onClick={() => setMobile(false)}>
              <Image src="/inapi-mvp/inapi-logo.jpg" alt={logoAria} width={100} height={40} className="h-10 w-auto" />
            </Link>
            <Button variant="ghost" size="icon" className="text-white" aria-label="Cerrar menú" onClick={() => setMobile(false)}>
              <X className="w-7 h-7" />
            </Button>
          </div>
          <nav className="p-gob-5 space-y-gob-6 text-white">
            {session.authenticated && (
              <p className="text-gri-body-sm">{session.nombre}</p>
            )}
            {[
              { title: 'Marcas', cols: MARCAS_MEGA },
              { title: 'Patentes', cols: PATENTES_MEGA },
            ].map(block => (
              <div key={block.title}>
                <p className="text-gri-label uppercase tracking-wider text-white/60 mb-gob-2">{block.title}</p>
                {block.cols.flatMap(c => c.items).map(item =>
                  item.external ? (
                    <a
                      key={item.href + item.label}
                      href={item.href}
                      className="block py-gob-3 min-h-11 text-gri-body hover:underline"
                      rel="noopener noreferrer"
                      onClick={() => setMobile(false)}
                    >
                      {item.label}
                    </a>
                  ) : (
                    <Link
                      key={item.href + item.label}
                      href={item.href}
                      className="block py-gob-3 min-h-11 text-gri-body hover:underline"
                      onClick={() => setMobile(false)}
                    >
                      {item.label}
                    </Link>
                  ),
                )}
              </div>
            ))}
            <Link href="/" className="block py-gob-3 min-h-11" onClick={() => setMobile(false)}>
              Volver al portal informativo
            </Link>
          </nav>
        </div>
      )}
    </div>
  )
}
