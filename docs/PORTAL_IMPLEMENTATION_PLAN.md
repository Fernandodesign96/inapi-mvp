# Plan de implementación — Portal INAPI v3

**Design system:** UI Kit Gobierno Digital v3.0.1  
**Referencias de diseño:** `docs/claude-design-urls/` y `docs/ctrlu-htmls/` (30 pantallas Claude Design)  
**HTML extraído:** `docs/ctrlu-htmls/extracted/` (`*-main.html`, `index.json`)  
**Checklist contenido:** `docs/LENGUAJE_CLARO_CHECKLIST.md`

---

## Estado general (11 agosto 2026)

| Fase | Estado | Notas |
| --- | --- | --- |
| Fase 1 — Fundamentos | ✅ Completada | Tokens portal, `SiteHeader`, `PortalShell`, `FooterINAPI`, `Breadcrumbs` |
| Fase 2 — Páginas críticas | ✅ Completada | Home, marcas, patentes, buscador similitud, solicitud nueva |
| Fase 3 — Contenido informativo | ✅ Completada | ~22 páginas restantes con contenido del HTML extraído |
| Fase 4 — Interactividad | 🔄 Parcial | Buscador global y carrusel observancia listos; Fuse similitud y login pendientes |

**Build:** `bun run build` — 35 rutas estáticas bajo `basePath: /inapi-mvp`.

---

## Fases

### Fase 1 — Fundamentos ✅

- [x] Dependencias instaladas (`bun install`)
- [x] Script de extracción de bundles Claude Design (`scripts/extract-design-bundles.ts`)
- [x] Script de extracción Ctrl+U / bundles (`scripts/extract-ctrlu-all.ts`)
- [x] Catálogo de 30 pantallas (`docs/ctrlu-htmls/extracted/index.json`)
- [x] Tokens portal: hero/nav `#092039`, subnav `#F2F2F2`, CTAs `#0051A8`, footer institucional
- [x] `SiteHeader`, `PortalShell`, `Breadcrumbs`
- [x] Footer con licencia CC, fecha de actualización y enlace ARCO

### Fase 2 — Páginas críticas ✅

| Prioridad | Ruta | Diseño fuente | Estado |
| --- | --- | --- | --- |
| P0 | `/` | INAPI.dc.html | ✅ Home + `HomeExtraSections` |
| P0 | `/marcas/buscador-similitud` | Buscador-de-Anterioridades.dc.html | ✅ Aviso legal + búsqueda |
| P0 | `/marcas` | Marcas.dc.html | ✅ Hub de trámites |
| P1 | `/marcas/solicitud-nueva` | Solicitud-Nueva-de-Marca.dc.html | ✅ Enlace al flujo GRI `/auth` |
| P1 | `/patentes` | Patentes.dc.html | ✅ Hub patentes |
| P1 | `/preguntas-frecuentes` | Preguntas-Frecuentes.dc.html | ✅ Acordeón FAQ |

### Fase 3 — Contenido informativo ✅

Implementadas desde HTML extraído con checklist de 39 criterios de lenguaje claro.

Rutas incluidas: `/nosotros`, `/conoce-mas`, `/tramites-digitales`, `/contacto`, `/contacto/siac`, `/aprende`, `/conecta`, `/glosario`, `/observancia`, `/sello-de-origen`, `/documentacion`, `/documentacion/estadisticas`, `/datos-abiertos`, `/transparencia/gasto-presupuestario`, `/notificaciones-diarias`, `/sala-de-prensa`, `/sala-de-prensa/cuenta-publica-2026`, `/sala-de-prensa/patentes-nacionales-2026`, `/marcas/como-registrar`, `/marcas/sistema-de-madrid`, `/patentes/como-registrar`, `/patentes/pct`, `/buscar`.

### Fase 4 — Interactividad y consistencia 🔄

- [x] Homepage: carrusel Observancia, novedades, enlaces reales
- [x] Buscador global del sitio (`/buscar`, `BuscadorSitio`)
- [x] Navegación activa en `SiteHeader`
- [ ] Buscador de similitud: calibración Fuse.js + clases Niza (umbrales 75/50/0)
- [ ] Modal de login / ClaveÚnica unificado
- [ ] Imágenes reales (hero, noticias, banners)

---

## Mapa de rutas

| Slug Claude Design | Ruta Next.js |
| --- | --- |
| INAPI | `/` |
| Marcas | `/marcas` |
| Buscador-de-Anterioridades | `/marcas/buscador-similitud` |
| Marcas-Para-Informarse | `/marcas/como-registrar` |
| Marcas-Solicitud-Nueva | `/marcas/solicitud-nueva` |
| Sistema-de-Madrid | `/marcas/sistema-de-madrid` |
| Patentes | `/patentes` |
| Patentes-Para-Informarse | `/patentes/como-registrar` |
| PCT | `/patentes/pct` |
| Acerca-de-INAPI | `/nosotros` |
| Tramites-Digitales | `/tramites-digitales` |
| Preguntas-Frecuentes | `/preguntas-frecuentes` |
| Glosario | `/glosario` |
| Contacto | `/contacto` |
| SIAC | `/contacto/siac` |
| Aprende | `/aprende` |
| Conecta | `/conecta` |
| Conoce-Mas | `/conoce-mas` |
| Sala-de-Prensa | `/sala-de-prensa` |
| Noticia-* | `/sala-de-prensa/[slug]` |
| Centro-de-Documentacion | `/documentacion` |
| Estadisticas | `/documentacion/estadisticas` |
| Datos-Abiertos | `/datos-abiertos` |
| Gasto-Presupuestario | `/transparencia/gasto-presupuestario` |
| Notificaciones-Diarias | `/notificaciones-diarias` |
| Observancia | `/observancia` |
| Sello-de-Origen | `/sello-de-origen` |
| Buscador | `/buscar` |

---

## Componentes clave

| Componente | Ubicación | Rol |
| --- | --- | --- |
| `SiteHeader` | `components/layout/SiteHeader.tsx` | Nav 4 niveles |
| `FooterINAPI` | `components/layout/FooterINAPI.tsx` | Footer institucional |
| `PortalShell` | `components/layout/PortalShell.tsx` | Wrapper de página |
| `content.tsx` | `components/portal/content.tsx` | Primitivos reutilizables |
| `portal-routes.ts` | `lib/portal-routes.ts` | Metadatos y navegación |

---

## Comandos útiles (Windows)

```powershell
cd c:\Users\FArriagada\Downloads\inapi-mvp
bun install
bun run dev
bun scripts/extract-design-bundles.ts
bun scripts/extract-ctrlu-all.ts
bun run build
bun run typecheck
```

---

*Actualizado: 11 agosto 2026 · Equipo UX INAPI*
