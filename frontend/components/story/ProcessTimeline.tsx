import { cn } from '@/lib/utils'
import { PROCESS_FLOWS, PROCESS_HOME_SUMMARY, type ProcessKind } from '@/lib/inapi-process-timelines'

export function ProcessTimeline({
  kind,
  variant = 'detailed',
  className,
}: {
  kind: ProcessKind
  variant?: 'compact' | 'detailed'
  className?: string
}) {
  const flow = PROCESS_FLOWS[kind]
  const stages = variant === 'compact' ? PROCESS_HOME_SUMMARY[kind] : flow.stages
  const compact = variant === 'compact'

  return (
    <div className={cn('min-w-0', className)}>
      {compact ? null : (
        <header className="mb-gob-5">
          <h3 className="font-heading text-[1.375rem] font-semibold leading-[1.35] text-gob-text">{flow.title}</h3>
          <p className="mt-gob-2 text-gri-body leading-[1.6] text-muted-foreground">{flow.lead}</p>
        </header>
      )}
      <ol className={cn('relative', compact ? 'space-y-gob-4' : 'space-y-gob-6')}>
        <span
          aria-hidden
          className="absolute bottom-2 left-[0.6875rem] top-2 w-px bg-gob-primary/35 dark:bg-white/30"
        />
        {stages.map((stage, i) => (
          <li key={stage.title} className="relative pl-gob-8">
            <span
              aria-hidden
              className="absolute left-0 top-1 inline-flex size-6 items-center justify-center rounded-full bg-gob-primary text-[0.6875rem] font-bold text-white"
            >
              {i + 1}
            </span>
            <p className={cn('font-heading font-semibold leading-[1.35] text-gob-text', compact ? 'text-gri-body-sm' : 'text-gri-h2')}>
              {stage.title}
            </p>
            <p className={cn('mt-1 leading-[1.5] text-muted-foreground', compact ? 'text-gri-body-xs' : 'text-gri-body-sm')}>
              {stage.summary}
            </p>
            <ul className={cn('mt-gob-2 space-y-gob-2', compact ? 'border-l border-gob-border pl-gob-3' : 'mt-gob-3 space-y-gob-3')}>
              {stage.states.map(state => (
                <li key={state.label} className="relative">
                  <span aria-hidden className="absolute -left-[0.97rem] top-1.5 size-1.5 rounded-full bg-gob-primary dark:bg-[#A1D1FF]" />
                  <p className={cn('font-medium text-gob-text', compact ? 'text-gri-body-xs' : 'text-gri-body-sm')}>{state.label}</p>
                  <p className={cn('leading-[1.45] text-muted-foreground', compact ? 'text-[0.75rem]' : 'text-gri-body-sm')}>{state.detail}</p>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
      {compact ? null : (
        <p className="mt-gob-5 text-gri-body-xs text-muted-foreground">{flow.source}</p>
      )}
    </div>
  )
}
