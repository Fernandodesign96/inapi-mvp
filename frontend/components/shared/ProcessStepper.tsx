import Link from 'next/link'
import type { LucideIcon } from 'lucide-react'
import { Bell, FilePlus, LayoutGrid, Search } from 'lucide-react'
import { CrossPlatformLink } from '@/components/shared/CrossPlatformLink'
import { GlosarioTerm } from '@/components/GlosarioTerm'

const ICONS: Record<string, LucideIcon> = {
  search: Search,
  grid: LayoutGrid,
  'file-plus': FilePlus,
  bell: Bell,
}

export type ProcessStep = {
  number: number
  label: string
  description: string
  duration?: string
  href: string
  external?: boolean
  requiresAuth?: boolean
  icon?: keyof typeof ICONS
  glossary?: string
}

export function ProcessStepper({
  title,
  steps,
}: {
  title: string
  steps: ProcessStep[]
}) {
  return (
    <section className="space-y-gob-4" aria-labelledby="process-stepper-title">
      <h2 id="process-stepper-title" className="font-heading text-2xl font-medium text-gob-text">
        {title}
      </h2>
      <ol className="grid gap-gob-4 min-[905px]:grid-cols-4">
        {steps.map(step => {
          const Icon = ICONS[step.icon ?? 'search']
          return (
            <li
              key={step.number}
              className="flex flex-col gap-gob-3 rounded-gob-lg border border-gob-border bg-card p-gob-5 shadow-elevation-01"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-full bg-gob-primary text-gob-text-inverse font-heading font-medium">
                {step.number}
              </span>
              <h3 className="font-heading text-gri-h2 font-medium text-gob-text">{step.label}</h3>
              <p className="flex-1 text-gri-body-sm leading-relaxed text-gob-text">
                {step.description}
                {step.glossary ? (
                  <>
                    {' '}
                    <GlosarioTerm termino={step.glossary}>{step.glossary}</GlosarioTerm>
                  </>
                ) : null}
              </p>
              {step.duration ? <p className="text-gri-body-xs text-muted-foreground">{step.duration}</p> : null}
              {step.external ? (
                <CrossPlatformLink
                  href={step.href}
                  label={step.label}
                  targetPlatform="tramites"
                  requiresAuth={step.requiresAuth}
                  variant="link"
                  className="mt-auto"
                />
              ) : (
                <Link
                  href={step.href}
                  className="mt-auto inline-flex min-h-11 items-center font-medium text-gob-link underline underline-offset-4 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus"
                >
                  {step.label}
                </Link>
              )}
              <Icon className="sr-only" />
            </li>
          )
        })}
      </ol>
    </section>
  )
}
