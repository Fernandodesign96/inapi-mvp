import Link from 'next/link'

export function StepHelper({
  title,
  body,
  example,
  href,
  hrefLabel = 'Ver definición completa',
}: {
  title: string
  body: string
  example?: string
  href?: string
  hrefLabel?: string
}) {
  return (
    <aside className="rounded-gob-md border border-gob-info/30 bg-gob-info-bg p-gob-4 text-gri-body-sm leading-relaxed text-gob-text">
      <p className="font-heading text-gri-body font-medium">{title}</p>
      <p className="mt-gob-2">{body}</p>
      {example ? <p className="mt-gob-2 text-gob-text/90">Ejemplo: {example}</p> : null}
      {href ? (
        <Link href={href} className="mt-gob-3 inline-flex min-h-11 items-center font-medium text-gob-link underline underline-offset-4">
          {hrefLabel}
        </Link>
      ) : null}
    </aside>
  )
}
