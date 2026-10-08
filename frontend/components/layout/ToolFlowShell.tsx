'use client'

import { PortalShell, type PortalShellProps } from '@/components/layout/PortalShell'
import { TramitesFrame } from '@/components/tramites/TramitesShell'
import { useInapiChrome } from '@/hooks/useInapiChrome'

export function ToolFlowShell({
  children,
  ...portalProps
}: PortalShellProps) {
  const chrome = useInapiChrome('tool')
  if (chrome === 'tramites') {
    return <TramitesFrame>{children}</TramitesFrame>
  }
  return (
    <PortalShell lockChrome {...portalProps}>
      {children}
    </PortalShell>
  )
}
