'use client'

import { usePathname } from 'next/navigation'
import { ChatFAB } from '@/components/layout/ChatFAB'
import { FooterINAPI } from '@/components/layout/FooterINAPI'
import { TooltipProvider } from '@/components/ui/tooltip'
import { TramitesHeader } from '@/components/tramites/TramitesHeader'
import { TramitesSubheader } from '@/components/tramites/TramitesSubheader'

const BARE_ROUTES = new Set(['/tramites/auth', '/tramites/solicitudmarca'])

export function TramitesShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  if (BARE_ROUTES.has(pathname)) {
    return <>{children}</>
  }

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex flex-col bg-background">
        <TramitesHeader />
        <TramitesSubheader />
        <main className="flex-1">{children}</main>
        <FooterINAPI />
        <ChatFAB title="Chat INAPI" />
      </div>
    </TooltipProvider>
  )
}
