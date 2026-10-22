export function FieldError({
  id,
  title,
  description,
}: {
  id?: string
  title: string
  description: string
}) {
  return (
    <p id={id} role="alert" className="text-gri-body-sm text-destructive">
      <span className="font-medium">{title}. </span>
      {description}
    </p>
  )
}

export function SystemError({
  title,
  description,
  retryLabel,
  onRetry,
}: {
  title: string
  description: string
  retryLabel?: string
  onRetry?: () => void
}) {
  return (
    <div className="space-y-gob-3 rounded-gob-md border border-destructive/30 bg-gob-danger-bg p-gob-4 text-gob-text" role="alert">
      <p className="font-medium">{title}</p>
      <p className="text-gri-body-sm">{description}</p>
      {onRetry ? (
        <button
          type="button"
          className="inline-flex min-h-11 items-center rounded-gob-md bg-gob-primary px-gob-4 text-gri-body-sm text-gob-text-inverse"
          onClick={onRetry}
        >
          {retryLabel ?? 'Intentar de nuevo'}
        </button>
      ) : null}
    </div>
  )
}
