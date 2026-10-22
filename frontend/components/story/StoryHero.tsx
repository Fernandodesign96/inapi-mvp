import { Breadcrumbs } from '@/components/layout/Breadcrumbs'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { EyebrowPill } from '@/components/story/EyebrowPill'
import { GuillocheBg, PiSeal } from '@/components/story/PiSeal'
import { StoryCta, type StoryCtaProps } from '@/components/story/StoryCta'
import { HEADING_NATIVE_TITLE, type BreadcrumbItem } from '@/lib/portal-routes'
import { cn } from '@/lib/utils'

type Cta = Pick<StoryCtaProps, 'href' | 'label'>

/**
 * Hero oscuro del portal informativo. Se monta dentro de la atmósfera del header
 * (prop `hero` de PortalShell), por eso no define fondo propio.
 */
export function StoryHero({
  eyebrow,
  title,
  lead,
  primary,
  secondary,
  breadcrumbs = [],
  panel,
  aside,
  seal,
  dot = 'accent',
  eyebrowStyle = 'pill',
  primaryVariant,
}: {
  eyebrow?: string
  title: string
  lead?: React.ReactNode
  primary?: Cta
  secondary?: Cta
  breadcrumbs?: BreadcrumbItem[]
  /** Panel tipo producto bajo el texto (bento de KPIs). */
  panel?: React.ReactNode
  /** Columna derecha opcional (video o ilustración). */
  aside?: React.ReactNode
  seal?: { center: string; caption?: string }
  dot?: React.ComponentProps<typeof EyebrowPill>['dot']
  eyebrowStyle?: 'pill' | 'subtle'
  primaryVariant?: StoryCtaProps['variant']
}) {
  return (
    <div className="relative z-[1] overflow-hidden text-white">
      <GuillocheBg className="text-white/70 opacity-60" />
      <ContainerGRI size="portal" className="relative pb-gob-8 pt-gob-6 min-[905px]:pb-20 min-[905px]:pt-gob-7">
        {breadcrumbs.length > 0 ? (
          <div className="mb-gob-6">
            <Breadcrumbs items={breadcrumbs} tone="inverse" />
          </div>
        ) : null}
        <div className={cn('grid items-center gap-gob-7 min-[1100px]:gap-x-gob-8', aside && 'min-[1100px]:grid-cols-[minmax(0,1.35fr)_minmax(0,0.65fr)]')}>
          <div className="flex flex-col items-start gap-gob-4">
            {eyebrow ? (
              eyebrowStyle === 'subtle' ? (
                <p className="text-gri-body-xs font-semibold tracking-[0.04em] text-white/60">{eyebrow}</p>
              ) : (
                <EyebrowPill tone="night" dot={dot}>
                  {eyebrow}
                </EyebrowPill>
              )
            ) : null}
            <h1
              tabIndex={-1}
              data-skip-focus-ring
              title={HEADING_NATIVE_TITLE[title]}
              className="max-w-4xl font-heading text-[2.25rem] font-medium leading-[1.15] tracking-[-0.01em] text-balance min-[600px]:text-[3rem] min-[1240px]:text-[3.5rem]"
            >
              {title}
            </h1>
            {lead ? <p className="max-w-3xl text-gri-body leading-[1.6] text-white/85 min-[600px]:text-[1.1875rem]">{lead}</p> : null}
            {primary || secondary ? (
              <div className="mt-gob-6 flex flex-wrap items-center gap-gob-3">
                {primary ? <StoryCta {...primary} tone="night" variant={primaryVariant ?? 'primary'} /> : null}
                {secondary ? <StoryCta {...secondary} tone="night" variant="secondary" /> : null}
              </div>
            ) : null}
          </div>
          {aside ? (
            <div className="relative min-w-0">
              {aside}
            </div>
          ) : seal ? (
            <PiSeal
              center={seal.center}
              caption={seal.caption}
              size={176}
              className="absolute right-gob-8 top-gob-7 hidden text-white/50 min-[1240px]:block"
            />
          ) : null}
        </div>
        {panel ? (
          <div className="mt-gob-7 min-[905px]:mt-gob-8">
            {panel}
          </div>
        ) : null}
      </ContainerGRI>
    </div>
  )
}
