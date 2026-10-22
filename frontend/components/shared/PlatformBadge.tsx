import { cn } from '@/lib/utils'

export function PlatformBadge({
  platform,
}: {
  platform: 'informativo' | 'tramites'
}) {
  const tramites = platform === 'tramites'
  return (
    <span
      className={cn(
        'inline-flex min-h-6 items-center rounded-gob-sm px-gob-2 text-[0.75rem] font-semibold tracking-wide text-gob-text-inverse',
        tramites ? 'border border-gob-accent/40 bg-gob-accent/20' : 'bg-white/15',
      )}
      aria-label={tramites ? 'Estás en el Portal de Trámites de INAPI' : 'Estás en el sitio informativo de INAPI'}
    >
      {tramites ? 'Portal de trámites' : 'Sitio informativo'}
    </span>
  )
}
