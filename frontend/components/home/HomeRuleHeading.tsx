import type { ReactNode } from 'react'

export function HomeRuleHeading({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <div className="relative flex items-center justify-center px-gob-4 py-gob-4 min-[905px]:py-gob-6">
      <span className="absolute inset-x-0 top-1/2 h-px bg-gob-border" aria-hidden />
      <h2
        id={id}
        className="relative bg-card px-gob-5 text-center portal-h2 text-gob-text"
      >
        {children}
      </h2>
    </div>
  )
}
