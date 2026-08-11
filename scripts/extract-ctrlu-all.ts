/**
 * Extrae templates legibles de todos los bundles en docs/ctrlu-htmls/
 * Uso: bun scripts/extract-ctrlu-all.ts
 */
import fs from 'fs'
import path from 'path'

const srcDir = path.join(process.cwd(), 'docs/ctrlu-htmls')
const outDir = path.join(process.cwd(), 'docs/ctrlu-htmls/extracted')

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

function extractMain(html: string): string {
  const start = html.search(/<main[\s>]/i)
  const end = html.search(/<dc-import name="SiteFooter"/i)
  if (start >= 0 && end > start) {
    return html.slice(start, end).replace(/^<main[^>]*>/i, '').replace(/<\/main>\s*$/i, '').trim()
  }
  // INAPI mega-page: home section
  const homeStart = html.indexOf('<!-- ============ HOME ============ -->')
  const homeEnd = html.indexOf('<!-- Cifras -->')
  if (homeStart >= 0 && homeEnd > homeStart) {
    return html.slice(homeStart, homeEnd)
  }
  return html
}

if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

const files = fs.readdirSync(srcDir).filter(f => f.endsWith('.dc.html'))
const index: { slug: string; mainLength: number; preview: string }[] = []

for (const f of files) {
  const wrapped = fs.readFileSync(path.join(srcDir, f), 'utf8')
  const raw = decodeViewSource(wrapped)
  const template = parseTemplate(raw)
  if (!template) {
    console.warn('SKIP:', f)
    continue
  }
  const slug = f.replace('.dc.html', '')
  const main = extractMain(template)
  fs.writeFileSync(path.join(outDir, `${slug}-main.html`), main, 'utf8')
  fs.writeFileSync(path.join(outDir, `${slug}-full.html`), template, 'utf8')
  const text = main.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  index.push({ slug, mainLength: main.length, preview: text.slice(0, 120) })
  console.log(`${slug.padEnd(32)} ${String(main.length).padStart(6)} chars`)
}

fs.writeFileSync(path.join(outDir, 'index.json'), JSON.stringify(index, null, 2), 'utf8')
console.log(`\n→ ${outDir}`)
