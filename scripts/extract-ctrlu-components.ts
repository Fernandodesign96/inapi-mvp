/**
 * Extrae templates y componentes anidados (SiteHeader, SiteFooter) de bundles .dc.html
 * Uso: bun scripts/extract-ctrlu-components.ts
 */
import fs from 'fs'
import path from 'path'

const srcDir = path.join(process.cwd(), 'docs/ctrlu-htmls')
const outDir = path.join(process.cwd(), 'docs/ctrlu-htmls/components')

function decodeViewSource(html: string): string {
  if (!html.includes('class="line-content"')) return html
  const matches = [...html.matchAll(/class="line-content">([\s\S]*?)<\/td>/g)]
  return matches
    .map(m =>
      m[1]
        .replace(/<span class="html-[^"]*">/g, '')
        .replace(/<\/span>/g, '')
        .replace(/&lt;/g, '<')
        .replace(/&gt;/g, '>')
        .replace(/&amp;/g, '&')
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'"),
    )
    .join('\n')
}

function parseTemplate(raw: string): string | null {
  const m = raw.match(/<script type="__bundler\/template">\s*([\s\S]*?)<\/script>/)
  if (!m) return null
  try {
    const parsed = JSON.parse(m[1])
    return typeof parsed === 'string' ? parsed : (parsed.html ?? null)
  } catch {
    return null
  }
}

function parsePageOrder(raw: string): Record<string, string> | null {
  const m = raw.match(/<script type="__bundler\/page_order">\s*([\s\S]*?)<\/script>/)
  if (!m) return null
  try {
    return JSON.parse(m[1]) as Record<string, string>
  } catch {
    return null
  }
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

// Use Marcas bundle — includes SiteHeader + SiteFooter in page_order
const sample = path.join(srcDir, 'Marcas.dc.html')
const wrapped = fs.readFileSync(sample, 'utf8')
const raw = decodeViewSource(wrapped)

const pageOrder = parsePageOrder(raw)
if (!pageOrder) {
  console.error('No page_order found')
  process.exit(1)
}

console.log('page_order keys:', Object.keys(pageOrder))

for (const [id, uuid] of Object.entries(pageOrder)) {
  const slug = id.replace('./', '').replace('.dc.html', '')
  const re = new RegExp(
    `<script type="__bundler/template" data-page="${uuid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>\\s*([\\s\\S]*?)<\\/script>`,
  )
  const altRe = new RegExp(
    `<script type="__bundler/template" data-uuid="${uuid.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}"[^>]*>\\s*([\\s\\S]*?)<\\/script>`,
  )
  let tm = raw.match(re) ?? raw.match(altRe)

  // Fallback: search all template scripts with data attributes
  if (!tm) {
    const all = [...raw.matchAll(/<script type="__bundler\/template"([^>]*)>([\s\S]*?)<\/script>/g)]
    for (const match of all) {
      const attrs = match[1]
      if (attrs.includes(uuid)) {
        tm = [match[0], match[2]]
        break
      }
    }
  }

  if (!tm) {
    console.warn('SKIP (no template for uuid):', slug, uuid.slice(0, 8))
    continue
  }

  let template: string
  try {
    const parsed = JSON.parse(tm[1])
    template = typeof parsed === 'string' ? parsed : (parsed.html ?? JSON.stringify(parsed))
  } catch {
    console.warn('SKIP (parse error):', slug)
    continue
  }

  const outFile = path.join(outDir, `${slug}.html`)
  fs.writeFileSync(outFile, template, 'utf8')
  console.log(`✓ ${slug} (${template.length} chars)`)

  // Preview key strings
  for (const needle of ['NOSOTROS', 'Buscar en el sitio', 'Dónde estamos', 'PCT']) {
    if (template.includes(needle)) console.log(`  contains: ${needle}`)
  }
}

// Also extract main page template
const main = parseTemplate(raw)
if (main) {
  fs.writeFileSync(path.join(outDir, '_Marcas-page.html'), main, 'utf8')
  console.log(`✓ _Marcas-page (${main.length} chars)`)
}
