import { useId } from 'react'
import { cn } from '@/lib/utils'

/** Timbre circular tipo título de registro. Decorativo salvo que se indique `label`. */
export function PiSeal({
  ring = 'INAPI · PROPIEDAD INDUSTRIAL · CHILE · ',
  center = 'R',
  caption,
  size = 112,
  className,
  label,
}: {
  ring?: string
  center?: string
  caption?: string
  size?: number
  className?: string
  label?: string
}) {
  const pathId = `seal-${useId().replace(/:/g, '')}`
  return (
    <svg
      viewBox="0 0 120 120"
      width={size}
      height={size}
      className={cn('shrink-0', className)}
      role={label ? 'img' : undefined}
      aria-label={label}
      aria-hidden={label ? undefined : true}
    >
      <defs>
        <path id={pathId} d="M60,60 m-44,0 a44,44 0 1,1 88,0 a44,44 0 1,1 -88,0" />
      </defs>
      <circle cx="60" cy="60" r="57" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1.5" />
      <circle cx="60" cy="60" r="52" fill="none" stroke="currentColor" strokeOpacity="0.3" strokeWidth="0.75" strokeDasharray="2 3" />
      <circle cx="60" cy="60" r="33" fill="none" stroke="currentColor" strokeOpacity="0.55" strokeWidth="1" />
      <text fontSize="8.5" fontWeight="600" letterSpacing="2.2" fill="currentColor" fillOpacity="0.85">
        <textPath href={`#${pathId}`}>{ring}</textPath>
      </text>
      <text
        x="60"
        y={caption ? 62 : 68}
        textAnchor="middle"
        fontFamily="var(--font-heading)"
        fontSize={center.length > 2 ? 15 : 24}
        fontWeight="600"
        fill="currentColor"
      >
        {center}
      </text>
      {caption ? (
        <text x="60" y="76" textAnchor="middle" fontSize="7" letterSpacing="1" fill="currentColor" fillOpacity="0.75">
          {caption}
        </text>
      ) : null}
    </svg>
  )
}

/** Capa de trama guilloche para fondos de acento. */
export function GuillocheBg({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        'guilloche pointer-events-none absolute inset-0 [mask-image:radial-gradient(ellipse_at_top_right,black_10%,transparent_70%)]',
        className,
      )}
    />
  )
}
