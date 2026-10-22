import { ArrowRight, ExternalLink } from 'lucide-react'
import { TramitesLink } from '@/components/tramites/TramitesLink'
import type { StoryTone } from '@/components/story/EyebrowPill'
import { cn } from '@/lib/utils'

export type StoryCtaProps = {
  href: string
  label: string
  variant?: 'primary' | 'secondary' | 'link' | 'conversion'
  tone?: StoryTone
  className?: string
  icon?: React.ReactNode
}

export function storyCtaClass(variant: StoryCtaProps['variant'] = 'primary', tone: StoryTone = 'paper') {
  const night = tone === 'night'
  return cn(
    'group inline-flex min-h-12 items-center justify-center gap-gob-2 rounded-full text-gri-body font-medium transition-[background-color,border-color,color,transform] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus focus-visible:ring-offset-2',
    night ? 'focus-visible:ring-offset-[var(--story-night)]' : 'focus-visible:ring-offset-background',
    variant === 'conversion' &&
      'bg-[#FF5722] px-gob-5 text-white shadow-elevation-03 hover:bg-[#E64A19] focus-visible:ring-white',
    variant === 'primary' &&
      (night
        ? 'bg-white px-gob-5 text-[#092039] shadow-elevation-03 hover:bg-[#E6EEF7]'
        : 'bg-inapi-cta px-gob-5 text-white shadow-elevation-02 hover:bg-gob-primary-darken-5'),
    variant === 'secondary' &&
      (night
        ? 'min-h-11 border border-white/35 px-gob-4 text-gri-body-sm text-white hover:border-white hover:bg-white/8'
        : 'min-h-11 border border-gob-border-strong bg-card px-gob-4 text-gri-body-sm text-gob-text hover:border-gob-primary'),
    variant === 'link' &&
      (night
        ? 'min-h-11 text-white underline-offset-4 hover:underline'
        : 'min-h-11 text-gob-link underline-offset-4 hover:text-gob-link-hover hover:underline'),
  )
}

export function StoryCta({ href, label, variant = 'primary', tone = 'paper', className, icon }: StoryCtaProps) {
  const external = href.startsWith('http')
  const content = (
    <>
      {icon}
      <span>{label}</span>
      {external ? (
        <ExternalLink className="size-4" aria-hidden />
      ) : (
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
      )}
    </>
  )
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(storyCtaClass(variant, tone), className)}>
        {content}
        <span className="sr-only">(se abre en una pestaña nueva)</span>
      </a>
    )
  }
  return (
    <TramitesLink href={href} className={cn(storyCtaClass(variant, tone), className)}>
      {content}
    </TramitesLink>
  )
}
