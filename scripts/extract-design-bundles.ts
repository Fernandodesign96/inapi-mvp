/**
 * Extrae HTML legible de los bundles Claude Design (.dc.html)
 * Uso: bun scripts/extract-design-bundles.ts
 */
import fs from 'fs'
import path from 'path'

const root = process.cwd()
const dir = path.join(root, 'docs/claude-design-urls')
const outDir = path.join(root, 'docs/claude-design-urls/extracted')

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(dir).filter(f => f.endsWith('.dc.html'))

function stripTags(html: string): string {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, '')
    .replace(/<style[\s\S]*?<\/style>/gi, '')
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const index: { file: string; slug: string; title: string; h1: string; textPreview: string; htmlLength: number }[] = []

for (const f of files) {
  const html = fs.readFileSync(path.join(dir, f), 'utf8')
  const m = html.match(/<script type="__bundler\/template">\s*([\s\S]*?)<\/script>/)
  if (!m) {
    console.warn('SKIP (no template):', f)
    continue
  }

  let template: string
  try {
    const parsed = JSON.parse(m[1])
    template = typeof parsed === 'string' ? parsed : parsed.html ?? JSON.stringify(parsed)
  } catch {
    console.warn('SKIP (parse error):', f)
    continue
  }

  const slug = f.replace('.dc.html', '')
  const outFile = path.join(outDir, `${slug}.html`)
  fs.writeFileSync(outFile, template, 'utf8')

  const title = template.match(/<title[^>]*>([^<]+)/i)?.[1]?.trim() ?? ''
  const h1 =
    template.match(/<h1[^>]*>([^<]+)/i)?.[1]?.trim() ??
    template.match(/role="heading"[^>]*>([^<]+)/i)?.[1]?.trim() ??
    ''

  index.push({
    file: f,
    slug,
    title,
    h1,
    textPreview: stripTags(template).slice(0, 200),
    htmlLength: template.length,
  })
}

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8')
console.log(`Extracted ${index.length} pages → ${outDir}`)
for (const row of index) {
  console.log(`  ${row.slug.padEnd(30)} | ${(row.title || row.h1 || row.textPreview.slice(0, 40)).slice(0, 60)}`)
}
