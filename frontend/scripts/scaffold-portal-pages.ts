/**
 * Genera páginas stub del portal desde PORTAL_PAGES.
 * Uso: bun scripts/scaffold-portal-pages.ts
 */
import fs from 'fs'
import path from 'path'
import { PORTAL_PAGES } from '../lib/portal-routes'

const APP = path.join(process.cwd(), 'app')

const SKIP = new Set(['/', '/marcas/buscador-similitud'])

for (const page of PORTAL_PAGES) {
  if (SKIP.has(page.path)) continue

  const segments = page.path.split('/').filter(Boolean)
  const dir = path.join(APP, ...segments)
  const file = path.join(dir, 'page.tsx')

  if (fs.existsSync(file)) {
    console.log('SKIP exists:', page.path)
    continue
  }

  fs.mkdirSync(dir, { recursive: true })

  const breadcrumbs = [
    page.section ? `{ label: '${page.section.label}', href: '${page.section.href}' }` : null,
    page.current && page.current !== page.title
      ? `{ label: '${page.current}' }`
      : page.current
        ? `{ label: '${page.current}' }`
        : null,
  ].filter(Boolean)

  const navActive = page.navActive ? `\n      active="${page.navActive}"` : ''
  const subtitle = page.description
    ? `\n      pageSubtitle="${page.description.replace(/"/g, '\\"')}"`
    : ''
  const bcProp =
    breadcrumbs.length > 0
      ? `\n      breadcrumbs={[${breadcrumbs.join(', ')}]}`
      : ''

  const content = `import type { Metadata } from 'next'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'

export const metadata: Metadata = {
  title: '${page.title.replace(/'/g, "\\'")} — INAPI',
  description: '${(page.description ?? page.title).replace(/'/g, "\\'")}',
}

export default function Page() {
  return (
    <PortalShell
      variant="page"
      pageTitle="${page.title.replace(/"/g, '\\"')}"${subtitle}${navActive}${bcProp}
    >
      <ContainerGRI size="portal" className="py-gob-6 pb-gob-8">
        <p className="text-gri-body text-muted-foreground leading-relaxed">
          Contenido en construcción. Referencia de diseño:{' '}
          <code className="text-gri-body-sm bg-gob-surface-elevated px-1.5 py-0.5 rounded">${page.slug}.dc.html</code>
        </p>
      </ContainerGRI>
    </PortalShell>
  )
}
`

  fs.writeFileSync(file, content, 'utf8')
  console.log('Created:', page.path)
}

console.log('Done.')
