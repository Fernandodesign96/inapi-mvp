'use client'

import { usePathname } from 'next/navigation'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { SkipLink } from '@/components/layout/SkipLink'
import { TramitesContextRail } from '@/components/tramites/TramitesContextRail'
import { TramitesChromeProvider } from '@/components/tramites/TramitesScreenChrome'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DownloadToast } from '@/components/tramites/DownloadToast'
import { FocusOnHeading } from '@/components/shared/FocusOnHeading'
import { PlatformContextBanner } from '@/components/shared/PlatformContextBanner'
import { TramitesSidebar } from '@/components/tramites/TramitesSidebar'
import { TramitesSubheader } from '@/components/tramites/TramitesSubheader'
import { TramitesTopbar } from '@/components/tramites/TramitesTopbar'
import { useInapiChrome } from '@/hooks/useInapiChrome'
import { isAuthPath } from '@/lib/tramites/entry'
import { useTramitesSession } from '@/lib/tramites/use-session'

const BARE_ROUTES = new Set(['/tramites/pago-tgr', '/tramites/pago'])
const PUBLIC_CHROME = new Set([
  '/tramites/patentes/buscador',
  '/tramites/patentes/buscador/avanzada',
  '/tramites/marcas/clasificador',
])

export function TramitesFrame({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
      <TramitesChromeProvider>
      <div className="tramites-dashboard flex min-h-screen min-w-0 max-w-full bg-[var(--story-mist)]">
        <SkipLink />
        <FocusOnHeading />
        <TramitesSidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <TramitesTopbar />
          <div id="contenido-principal" tabIndex={-1} data-skip-focus-ring className="relative z-0 flex-1 outline-none">
            <PlatformContextBanner platform="tramites" />
            <TramitesSubheader />
            <TramitesContextRail />
            {children}
          </div>
        </div>
        <DownloadToast />
        <ChatFAB title="Chatbot INAPI" />
      </div>
      </TramitesChromeProvider>
    </TooltipProvider>
  )
}

export function TramitesShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const { session } = useTramitesSession()
  useInapiChrome('tramites-layout')

  const hideChrome =
    BARE_ROUTES.has(pathname) ||
    (isAuthPath(pathname) && (pathname !== '/tramites' || !session.authenticated)) ||
    (!session.authenticated && !PUBLIC_CHROME.has(pathname))

  if (hideChrome) {
    return <>{children}</>
  }

  return <TramitesFrame>{children}</TramitesFrame>
}
