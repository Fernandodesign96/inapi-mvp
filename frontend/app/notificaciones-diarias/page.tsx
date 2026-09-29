import type { Metadata } from 'next'
import Link from 'next/link'
import { Bell } from 'lucide-react'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain } from '@/components/portal/content'
import { portalShellProps } from '@/lib/portal-page-props'
import { cn } from '@/lib/utils'

export const metadata: Metadata = {
  title: 'Notificaciones diarias — INAPI',
  description: 'Consulta las notificaciones diarias de marcas y patentes publicadas por INAPI.',
}

const items = [
  {
    href: 'https://tramites.inapi.cl/EstadosDiariosMarcas',
    title: 'Notificaciones diarias de marcas',
  },
  {
    href: 'https://tramites.inapi.cl/EstadosDiariosPatentes',
    title: 'Notificaciones diarias de patentes',
  },
]

export default function NotificacionesDiariasPage() {
  return (
    <PortalShell {...portalShellProps('/notificaciones-diarias')}>
      <ContainerGRI size="portal">
        <PortalMain>
          <div className="grid min-[600px]:grid-cols-2 gap-gob-5 max-w-3xl">
            {items.map(item => (
              <Link
                key={item.title}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={cn(
                  'bg-card border border-gob-border rounded-gob-md p-gob-6',
                  'flex flex-col gap-gob-3 text-gob-text hover:border-gob-link transition-colors',
                )}
              >
                <Bell className="w-7 h-7 text-inapi-cta" aria-hidden />
                <span className="text-gri-body font-bold">{item.title}</span>
              </Link>
            ))}
          </div>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
