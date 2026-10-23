import { ArrowUpRight } from 'lucide-react'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import { GuillocheBg } from '@/components/story/PiSeal'
import { Reveal } from '@/components/story/Reveal'
import { cn } from '@/lib/utils'

export function BentoGrid({
  children,
  cols = 3,
  className,
}: {
  children: React.ReactNode
  cols?: 2 | 3 | 4
  className?: string
}) {
  return (
    <div
      className={cn(
        'grid auto-rows-[minmax(0,auto)] gap-gob-4 min-[600px]:grid-cols-2 min-[905px]:gap-gob-5',
        cols === 3 && 'min-[1100px]:grid-cols-3',
        cols === 4 && 'min-[1100px]:grid-cols-4',
        className,
      )}
    >
      {children}
    </div>
  )
}

export type BentoVariant = 'plain' | 'accent' | 'glass' | 'night' | 'marcas' | 'patentes'

export type BentoCardProps = {
  title: string
  body?: React.ReactNode
  eyebrow?: string
  icon?: React.ReactNode
  /** Área visual superior (cifra, mini gráfico, ilustración). */
  visual?: React.ReactNode
  href?: string
  cta?: string
  variant?: BentoVariant
  span?: 'col-2' | 'row-2' | 'full'
  className?: string
  delay?: number
  nativeTitle?: string
  children?: React.ReactNode
}

const VARIANT: Record<BentoVariant, string> = {
  plain: 'border border-gob-border bg-card text-gob-text shadow-elevation-02',
  accent: 'bg-inapi-cta text-white shadow-elevation-04',
  glass: 'story-glass text-white',
  night: 'story-night text-white shadow-elevation-04',
  marcas: 'border border-inapi-marcas-border/50 bg-inapi-marcas-surface text-gob-text shadow-elevation-02',
  patentes: 'border border-inapi-patentes-border/40 bg-inapi-patentes-surface text-gob-text shadow-elevation-02',
}

export function BentoCard({
  title,
  body,
  eyebrow,
  icon,
  visual,
  href,
  cta,
  variant = 'plain',
  span,
  className,
  delay = 0,
  nativeTitle,
  children,
}: BentoCardProps) {
  const dark = variant === 'accent' || variant === 'glass' || variant === 'night'
  const inner = (
    <>
      {variant === 'accent' || variant === 'night' ? <GuillocheBg className="text-white opacity-50" /> : null}
      {visual ? <div className="relative mb-gob-5">{visual}</div> : null}
      <div className="relative flex flex-1 flex-col gap-gob-2">
        {icon || eyebrow ? (
          <div className="mb-gob-1 flex items-center gap-gob-3">
            {icon ? (
              <span
                aria-hidden
                className={cn(
                  'inline-flex size-11 shrink-0 items-center justify-center rounded-gob-md [&_svg]:size-5',
                  dark ? 'bg-white/12 text-white' : 'bg-gob-primary/10 text-gob-primary-dark',
                  variant === 'marcas' && 'bg-inapi-marcas-accent/15 text-[#8A4B00]',
                  variant === 'patentes' && 'bg-inapi-patentes-accent/15 text-[#035E80]',
                )}
              >
                {icon}
              </span>
            ) : null}
            {eyebrow ? (
              <span className={cn('text-gri-body-xs font-semibold uppercase tracking-[0.08em]', dark ? 'text-white/75' : 'text-muted-foreground')}>
                {eyebrow}
              </span>
            ) : null}
          </div>
        ) : null}
        <h3 className={cn('font-heading text-[1.1875rem] font-medium leading-[1.35]', dark ? 'text-white' : 'text-gob-text')}>{title}</h3>
        {body ? (
          <div className={cn('text-gri-body-sm leading-[1.6]', dark ? 'text-white/82' : 'text-muted-foreground')}>{body}</div>
        ) : null}
        {children}
        {href ? (
          <span
            className={cn(
              'mt-auto inline-flex items-center gap-gob-1 pt-gob-3 text-gri-body-sm font-medium',
              dark ? 'text-white' : 'text-gob-link',
            )}
          >
            {cta ?? 'Ver más'}
            <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" aria-hidden />
          </span>
        ) : null}
      </div>
    </>
  )

  const base = cn(
    'group relative flex h-full flex-col overflow-hidden rounded-gob-xl p-gob-5 min-[905px]:p-gob-6',
    VARIANT[variant],
    variant === 'plain' && 'story-card-hover-paper',
    (variant === 'glass' || variant === 'night') && 'story-glass-interactive',
    href && 'story-lift focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:ring-offset-2',
  )

  return (
    <Reveal
      delay={delay}
      className={cn(
        'h-full',
        span === 'col-2' && 'min-[600px]:col-span-2',
        span === 'row-2' && 'min-[1100px]:row-span-2',
        span === 'full' && 'min-[600px]:col-span-full',
        className,
      )}
    >
      {href ? (
        href.startsWith('http') ? (
          <a href={href} target="_blank" rel="noopener noreferrer" title={nativeTitle} className={base}>
            {inner}
          </a>
        ) : (
          <TramitesLink href={href} title={nativeTitle} className={base}>
            {inner}
          </TramitesLink>
        )
      ) : (
        <article className={base}>{inner}</article>
      )}
    </Reveal>
  )
}
