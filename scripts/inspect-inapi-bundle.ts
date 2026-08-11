/**
 * Extrae componentes anidados del bundle raíz INAPI (SiteHeader, SiteFooter)
 */
import fs from 'fs'
import path from 'path'

const file = path.join(process.cwd(), 'docs/ctrlu-htmls/parsed/INAPI.html')
const raw = fs.readFileSync(file, 'utf8')

const pageOrderM = raw.match(/<script type="__bundler\/page_order">\s*([\s\S]*?)<\/script>/)
const pageOrder = pageOrderM ? JSON.parse(pageOrderM[1]) : []
console.log('page_order length:', pageOrder.length)
console.log('page_order sample:', pageOrder.slice(0, 5))

const extM = raw.match(/<script type="__bundler\/ext_resources">\s*([\s\S]*?)<\/script>/)
const ext = extM ? JSON.parse(extM[1]) : []
console.log('ext_resources:', ext.filter((e: { id: string }) => e.id.includes('.dc.html')))

// Find all template scripts
const templates = [...raw.matchAll(/<script type="__bundler\/template"([^>]*)>\s*([\s\S]*?)<\/script>/g)]
console.log('template scripts count:', templates.length)

for (const t of templates) {
  const attrs = t[1]
  const uuid = attrs.match(/data-page="([^"]+)"/)?.[1] ?? attrs.match(/data-uuid="([^"]+)"/)?.[1] ?? 'root'
  let content = ''
  try {
    const parsed = JSON.parse(t[2])
    content = typeof parsed === 'string' ? parsed : (parsed.html ?? '')
  } catch {
    content = t[2].slice(0, 200)
  }
  const id = ext.find((e: { uuid: string }) => e.uuid === uuid)?.id ?? uuid
  console.log('\n---', id, `(${content.length} chars) ---`)
  for (const needle of ['NOSOTROS', 'Buscar en el sitio', 'INICIAR SESIÓN', 'PCT', 'Dónde estamos', 'dc-import']) {
    if (content.includes(needle)) console.log('  has:', needle)
  }
  if (content.includes('NOSOTROS')) {
    const idx = content.indexOf('NOSOTROS')
    console.log(content.slice(Math.max(0, idx - 300), idx + 5000))
  }
}
