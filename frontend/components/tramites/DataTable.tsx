import { cn } from '@/lib/utils'

export function DataTable({
  headers,
  children,
  caption,
}: {
  headers: string[]
  children: React.ReactNode
  caption?: string
}) {
  return (
    <div className="overflow-x-auto rounded-gob-md border-2 border-gob-border bg-card shadow-elevation-01">
      <table className="w-full border-collapse text-left text-gri-body-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-gob-surface-elevated">
          <tr>
            {headers.map(h => (
              <th key={h} className="border border-gob-border px-gob-4 py-gob-3 font-medium whitespace-nowrap text-gob-text">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="[&_tr]:transition-colors [&_tr]:duration-150 [&_tr:hover]:bg-gob-surface-elevated">{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn('border border-gob-border bg-card px-gob-4 py-gob-3 align-middle text-gob-text', className)}>{children}</td>
}
