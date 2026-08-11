/**
 * Parsea HTML guardado con Ctrl+U (view-source wrapper) y extrae secciones clave.
 * Uso: bun scripts/parse-ctrlu-html.ts Marcas
 */
import fs from 'fs'
import path from 'path'

const slug = process.argv[2] ?? 'Marcas'
const file = path.join(process.cwd(), `docs/ctrlu-htmls/${slug}.dc.html`)
const wrapped = fs.readFileSync(file, 'utf8')

function decodeViewSource(html: string): string {
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

const raw = decodeViewSource(wrapped)
const outDir = path.join(process.cwd(), 'docs/ctrlu-htmls/parsed')
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

fs.writeFileSync(path.join(outDir, `${slug}.html`), raw, 'utf8')

// Extract header-ish chunk
for (const marker of ['NOSOTROS', 'Instituto Nacional', '<header', 'Dónde estamos']) {
  const idx = raw.indexOf(marker)
  if (idx >= 0) console.log(`Found "${marker}" at ${idx}`)
}

// Print nav links
const navMatch = raw.match(/NOSOTROS[\s\S]{0,4000}/)
if (navMatch) console.log('\n--- NAV PREVIEW ---\n', navMatch[0].slice(0, 3500))

const footerMatch = raw.match(/Dónde estamos[\s\S]{0,3000}/)
if (footerMatch) console.log('\n--- FOOTER PREVIEW ---\n', footerMatch[0].slice(0, 2500))

console.log(`\nParsed ${slug} → ${path.join(outDir, `${slug}.html`)} (${raw.length} chars)`)
