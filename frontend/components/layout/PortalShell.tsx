import { SiteHeader, type SiteHeaderProps } from '@/components/layout/SiteHeader'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { SkipLink } from '@/components/layout/SkipLink'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { CommitPortalChrome } from '@/components/layout/CommitPortalChrome'
import { DownloadToast } from '@/components/tramites/DownloadToast'
import { TooltipProvider } from '@/components/ui/tooltip'

export type PortalShellProps = SiteHeaderProps & {
  children: React.ReactNode
  /** Ocultar FAB del asistente (p. ej. en flujos GRI) */
  showChat?: boolean
  /** Si es false, no cambia el flujo de header (herramienta compartida). */
  lockChrome?: boolean
}

/**
 * Layout del portal institucional INAPI (páginas informativas y buscadores).
 * Distinto del layout GRI (`HeaderINAPI` + stepper en `/solicitud`).
 */
export function PortalShell({
  children,
  showChat = true,
  lockChrome = false,
  ...headerProps
}: PortalShellProps) {
  const isHome = headerProps.variant === 'home'

  return (
    <TooltipProvider delayDuration={200}>
      {lockChrome ? null : <CommitPortalChrome />}
      <div className="flex min-h-screen min-w-0 max-w-full flex-col bg-background">
        <SkipLink />
        {isHome ? (
          <div className="home-atmosphere flex min-h-screen min-w-0 flex-col">
            <SiteHeader {...headerProps} />
            <div id="contenido-principal" tabIndex={-1} className="relative z-[1] flex-1 outline-none">
              {children}
            </div>
            <FooterINAPI />
          </div>
        ) : (
          <>
            <div className="home-atmosphere">
              <SiteHeader {...headerProps} />
            </div>
            <div id="contenido-principal" tabIndex={-1} className="relative z-[1] flex-1 outline-none">
              {children}
            </div>
            <div className="home-atmosphere">
              <FooterINAPI />
            </div>
          </>
        )}
        <DownloadToast />
        {showChat && <ChatFAB />}
      </div>
    </TooltipProvider>
  )
}
