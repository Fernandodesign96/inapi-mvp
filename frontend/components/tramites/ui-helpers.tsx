import { ContainerGRI } from '@/components/layout/ContainerGRI'

export function TramitesMain({ children }: { children: React.ReactNode }) {
  return (
    <ContainerGRI size="portal" className="py-gob-6 space-y-gob-6">
      {children}
    </ContainerGRI>
  )
}

export function EmptyState({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-gri-body text-gob-text border border-dashed border-gob-border rounded-gob-md px-gob-4 py-gob-5 bg-gob-surface">
      {children}
    </p>
  )
}

export function selectClass() {
  return 'w-full h-11 px-gob-3 border border-gob-border rounded-md bg-gob-surface text-gri-body-sm focus-visible:ring-2 focus-visible:ring-ring outline-none'
}
