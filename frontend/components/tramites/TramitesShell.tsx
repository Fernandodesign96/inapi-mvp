'use client'

import { usePathname } from 'next/navigation'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { SkipLink } from '@/components/layout/SkipLink'
import { TramitesContextRail } from '@/components/tramites/TramitesContextRail'
import { TooltipProvider } from '@/components/ui/tooltip'
import { DownloadToast } from '@/components/tramites/DownloadToast'
import { FocusOnHeading } from '@/components/shared/FocusOnHeading'
import { PlatformContextBanner } from '@/components/shared/PlatformContextBanner'
import { TramitesSidebar } from '@/components/tramites/TramitesSidebar'
import { TramitesSubheader } from '@/components/tramites/TramitesSubheader'
import { TramitesTopbar } from '@/components/tramites/TramitesTopbar'
import { useInapiChrome } from '@/hooks/useInapiChrome'

const BARE_ROUTES = new Set(['/tramites/solicitudmarca', '/tramites/pago-tgr', '/tramites/pago'])

export function TramitesFrame({ children }: { children: React.ReactNode }) {
  return (
    <TooltipProvider delayDuration={200}>
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
    </TooltipProvider>
  )
}

export function TramitesShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  useInapiChrome('tramites-layout')

  if (BARE_ROUTES.has(pathname)) {
    return <>{children}</>
  }

  return <TramitesFrame>{children}</TramitesFrame>
}
