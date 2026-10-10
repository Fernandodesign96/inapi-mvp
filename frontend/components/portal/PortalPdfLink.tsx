import { FileText } from 'lucide-react'
import { DownloadPdfLink } from '@/components/tramites/DownloadToast'
import { cn } from '@/lib/utils'

export function PortalPdfLink({
  href,
  title,
  format = 'PDF',
  size,
  description,
  className,
}: {
  href: string
  title: string
  format?: string
  size: string
  description?: string
  className?: string
}) {
  const label = `${title} (${format}, ${size})`
  return (
    <div
      className={cn(
        'flex items-start gap-gob-4 rounded-gob-md border border-gob-border bg-card p-gob-5 text-left',
        className,
      )}
    >
      <FileText className="size-6 shrink-0 text-gob-primary mt-0.5" aria-hidden />
      <div className="min-w-0 space-y-gob-2">
        <DownloadPdfLink href={href}>{label}</DownloadPdfLink>
        {description ? (
          <p className="text-gri-body-sm text-muted-foreground leading-[1.5]">{description}</p>
        ) : null}
      </div>
    </div>
  )
}
