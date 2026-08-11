import { SiteHeader, type SiteHeaderProps } from '@/components/layout/SiteHeader'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { SkipLink } from '@/components/layout/SkipLink'
import { ChatFAB } from '@/components/layout/ChatFAB'

type PortalShellProps = SiteHeaderProps & {
  children: React.ReactNode
  /** Ocultar FAB del asistente (p. ej. en flujos GRI) */
  showChat?: boolean
}

/**
 * Layout del portal institucional INAPI (páginas informativas y buscadores).
 * Distinto del layout GRI (`HeaderINAPI` + stepper en `/solicitud`).
 */
export function PortalShell({
  children,
  showChat = true,
  ...headerProps
}: PortalShellProps) {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <SkipLink />
      <SiteHeader {...headerProps} />
      <div id="contenido-principal" tabIndex={-1} className="flex-1 outline-none">
        {children}
      </div>
      <FooterINAPI />
      {showChat && <ChatFAB />}
    </div>
  )
}
