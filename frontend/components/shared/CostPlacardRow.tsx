import type { LucideIcon } from 'lucide-react'
import { HelpTooltip } from '@/components/tramites/HelpTooltip'
import { PortalPdfLink } from '@/components/portal/PortalPdfLink'
import { PortalStat } from '@/components/portal/PortalStat'
import { cn } from '@/lib/utils'

export function CostPlacardRow({
  items,
  supplementaryLink,
  className,
}: {
  items: {
    icon: LucideIcon
    value: string
    label: string
    sublabel?: string
    tooltip?: string
  }[]
  supplementaryLink?: { href: string; title: string; size: string }
  className?: string
}) {
  return (
    <div className={cn('space-y-gob-4', className)}>
      <div className="grid gap-gob-4 min-[600px]:grid-cols-3">
        {items.map(item => (
          <div key={item.label} className="relative">
            <PortalStat
              icon={item.icon}
              value={item.value}
              label={item.sublabel ? `${item.label}. ${item.sublabel}` : item.label}
            />
            {item.tooltip ? (
              <div className="absolute right-2 top-2">
                <HelpTooltip text={item.tooltip} />
              </div>
            ) : null}
          </div>
        ))}
      </div>
      {supplementaryLink ? (
        <PortalPdfLink href={supplementaryLink.href} title={supplementaryLink.title} size={supplementaryLink.size} />
      ) : null}
    </div>
  )
}
