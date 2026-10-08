'use client'

import { usePathname } from 'next/navigation'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { PortalShell } from '@/components/layout/PortalShell'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DownloadToast } from '@/components/tramites/DownloadToast'
import { TramitesHeader } from '@/components/tramites/TramitesHeader'
import { TramitesSubheader } from '@/components/tramites/TramitesSubheader'
import { useInapiChrome } from '@/hooks/useInapiChrome'
import { PAGE_TITLES } from '@/lib/tramites/nav'
import type { PortalNavId } from '@/lib/portal-routes'

const BARE_ROUTES = new Set(['/tramites/auth', '/tramites/solicitudmarca', '/tramites/pago-tgr', '/tramites/pago'])

export function TramitesFrame({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex flex-col bg-background">
        <TramitesHeader />
        <TramitesSubheader />
        <main className="flex-1">{children}</main>
        <FooterINAPI />
        <DownloadToast />
        <ChatFAB title="Chat INAPI" />
      </div>
    </TooltipProvider>
  )
}

function portalActive(pathname: string): PortalNavId {
  if (pathname.includes('/marcas')) return 'marcas'
  if (pathname.includes('/patentes')) return 'patentes'
  return 'tramites'
}

export function TramitesShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const chrome = useInapiChrome('tramites-layout')

  if (BARE_ROUTES.has(pathname)) {
    return <>{children}</>
  }

  if (chrome === 'portal') {
    const meta = PAGE_TITLES[pathname]
    return (
      <PortalShell
        lockChrome
        active={portalActive(pathname)}
        variant="page"
        pageTitle={meta?.title}
        pageSubtitle={meta?.subtitle}
      >
        {children}
      </PortalShell>
    )
  }

  return <TramitesFrame>{children}</TramitesFrame>
}
