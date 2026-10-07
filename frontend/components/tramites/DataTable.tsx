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
    <div className="overflow-x-auto border border-gob-border rounded-gob-md bg-card">
      <table className="w-full text-left text-gri-body-sm">
        {caption && <caption className="sr-only">{caption}</caption>}
        <thead className="bg-gob-surface-elevated border-b border-gob-border">
          <tr>
            {headers.map(h => (
              <th key={h} className="px-gob-4 py-gob-3 font-medium text-gob-text whitespace-nowrap">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gob-border">{children}</tbody>
      </table>
    </div>
  )
}

export function Td({ children, className }: { children: React.ReactNode; className?: string }) {
  return <td className={cn('px-gob-4 py-gob-3 text-gob-text align-middle', className)}>{children}</td>
}
