import { SiteHeader, type SiteHeaderProps } from '@/components/layout/SiteHeader'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { SkipLink } from '@/components/layout/SkipLink'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { CommitPortalChrome } from '@/components/layout/CommitPortalChrome'
import { DownloadToast } from '@/components/tramites/DownloadToast'
import { TooltipProvider } from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

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
  return (
    <TooltipProvider delayDuration={200}>
      {lockChrome ? null : <CommitPortalChrome />}
      <div className="min-h-screen flex flex-col bg-background">
        <SkipLink />
        <SiteHeader {...headerProps} />
        <div
          id="contenido-principal"
          tabIndex={-1}
          className={cn(
            'flex-1 outline-none',
            headerProps.variant === 'page' && 'pt-gob-8 min-[905px]:pt-gob-8',
          )}
        >
          {children}
        </div>
        <FooterINAPI />
        <DownloadToast />
        {showChat && <ChatFAB />}
      </div>
    </TooltipProvider>
  )
}
