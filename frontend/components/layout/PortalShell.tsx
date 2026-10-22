import { SiteHeader, type SiteHeaderProps } from '@/components/layout/SiteHeader'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { SkipLink } from '@/components/layout/SkipLink'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { CommitPortalChrome } from '@/components/layout/CommitPortalChrome'
import { DownloadToast } from '@/components/tramites/DownloadToast'
import { FocusOnHeading } from '@/components/shared/FocusOnHeading'
import { PlatformContextBanner } from '@/components/shared/PlatformContextBanner'
import { TooltipProvider } from '@/components/ui/tooltip'

export type PortalShellProps = SiteHeaderProps & {
  children: React.ReactNode
  /** Ocultar FAB del asistente (p. ej. en flujos GRI) */
  showChat?: boolean
  /** Si es false, no cambia el flujo de header (herramienta compartida). */
  lockChrome?: boolean
  /** Hero storytelling montado en la misma atmósfera oscura del header. */
  hero?: React.ReactNode
}

/**
 * Layout del portal institucional INAPI (páginas informativas y buscadores).
 * Distinto del layout GRI (`HeaderINAPI` + stepper en `/solicitud`).
 */
export function PortalShell({
  children,
  showChat = true,
  lockChrome = false,
  hero,
  ...headerProps
}: PortalShellProps) {
  const isHome = headerProps.variant === 'home' && !hero

  if (hero) {
    return (
      <TooltipProvider delayDuration={200}>
        {lockChrome ? null : <CommitPortalChrome />}
        <div className="flex min-h-screen min-w-0 max-w-full flex-col bg-background">
          <SkipLink />
          <FocusOnHeading />
          <div className="home-atmosphere">
            <SiteHeader {...headerProps} pageTitle={undefined} variant="home" />
            <div id="contenido-principal" tabIndex={-1} data-skip-focus-ring className="relative z-[1] outline-none">
              {hero}
            </div>
          </div>
          <div className="relative z-[1] flex-1">
            <PlatformContextBanner platform="informativo" />
            {children}
          </div>
          <div className="home-atmosphere">
            <FooterINAPI />
          </div>
          <DownloadToast />
          {showChat && <ChatFAB />}
        </div>
      </TooltipProvider>
    )
  }

  return (
    <TooltipProvider delayDuration={200}>
      {lockChrome ? null : <CommitPortalChrome />}
      <div className="flex min-h-screen min-w-0 max-w-full flex-col bg-background">
        <SkipLink />
        <FocusOnHeading />
        {isHome ? (
          <div className="home-atmosphere flex min-h-screen min-w-0 flex-col">
            <SiteHeader {...headerProps} />
            <div id="contenido-principal" tabIndex={-1} data-skip-focus-ring className="relative z-[1] flex-1 outline-none">
              <PlatformContextBanner platform="informativo" />
              {children}
            </div>
            <FooterINAPI />
          </div>
        ) : (
          <>
            <div className="home-atmosphere">
              <SiteHeader {...headerProps} />
            </div>
            <div id="contenido-principal" tabIndex={-1} data-skip-focus-ring className="relative z-[1] flex-1 outline-none">
              <PlatformContextBanner platform="informativo" />
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
