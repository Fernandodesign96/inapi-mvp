'use client'

import { usePathname } from 'next/navigation'
import { CtaBand } from '@/components/story/CtaBand'
import { PORTAL_DROPDOWNS } from '@/lib/portal-routes'

const MARCAS_PRIMARY = ['/marcas/buscador-similitud', '/tramites/marcas/solicitar']
const PATENTES_PRIMARY = ['/tramites/patentes/buscador', '/tramites/patentes/solicitar']

function normalize(path: string) {
  return path.replace(/\/$/, '') || '/'
}

export function ShortcutBand({
  kind,
  title,
  eyebrow,
  body,
  seal,
}: {
  kind: 'marcas' | 'patentes'
  title: string
  eyebrow?: string
  body?: React.ReactNode
  seal?: { center: string; caption?: string }
}) {
  const pathname = usePathname() ?? ''
  const current = normalize(pathname.replace(/^\/inapi-mvp/, ''))
  const items = PORTAL_DROPDOWNS[kind].filter(item => normalize(item.href) !== current)
  const primaryHrefs = kind === 'marcas' ? MARCAS_PRIMARY : PATENTES_PRIMARY
  const primaries = items.filter(item => primaryHrefs.includes(item.href))
  const extras = items.filter(item => !primaryHrefs.includes(item.href))
  const first = primaries[0] ?? extras[0]
  if (!first) return null
  const second = primaries[1]
  const rest = [...(second ? [] : primaries.slice(1)), ...extras.filter(e => e.href !== first.href)]

  return (
    <CtaBand
      eyebrow={eyebrow ?? 'Atajos'}
      title={title}
      body={body}
      primary={{ href: first.href, label: first.label }}
      secondary={second ? { href: second.href, label: second.label } : rest[0] ? { href: rest[0].href, label: rest[0].label } : undefined}
      extras={(second ? rest : rest.slice(1)).map(item => ({ href: item.href, label: item.label }))}
      seal={seal ?? (kind === 'marcas' ? { center: 'R', caption: 'MARCA' } : { center: 'P', caption: 'PATENTE' })}
    />
  )
}
