export const DEFAULT_LAST_UPDATED = '22-10-2026'

export function LastUpdated({ date = DEFAULT_LAST_UPDATED }: { date?: string }) {
  return <p className="text-gri-body-sm text-muted-foreground">{`Última actualización: ${date}`}</p>
}
