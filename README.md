# Portal INAPI MVP

Portal web institucional y flujo guiado de solicitud de marca (GRI) para INAPI Chile, construido con **Next.js 16**, **UI Kit Gobierno Digital v3.0.1** y contenido derivado de diseños Claude Design.

| Metadatos | Detalle |
| --- | --- |
| **Versión** | 1.0 (MVP) |
| **Stack** | Next.js 16 · TypeScript · Tailwind CSS v4 · shadcn/ui · Fuse.js · Firebase · Bun |
| **Design system** | [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) v2.1.0 |
| **Devlog** | [`docs/development/DEVLOG.md`](docs/development/DEVLOG.md) |
| **Despliegue** | GitHub Pages (`basePath: /inapi-mvp`) |

---

## Inicio rápido

```powershell
cd c:\Users\FArriagada\Downloads\inapi-mvp
bun install
bun run dev
```

Abrir [http://localhost:3000/inapi-mvp](http://localhost:3000/inapi-mvp).

### Comandos útiles

| Comando | Descripción |
| --- | --- |
| `bun run dev` | Servidor de desarrollo (Turbopack) |
| `bun run build` | Build de producción (35 rutas estáticas) |
| `bun run typecheck` | Verificación TypeScript |
| `bun run lint` | ESLint |
| `bun scripts/extract-design-bundles.ts` | Extrae templates de bundles Claude Design |
| `bun scripts/extract-ctrlu-all.ts` | Extrae HTML de `docs/ctrlu-htmls/` |

---

## Estructura del proyecto

```
app/                    # Rutas Next.js App Router (~34 páginas)
components/
  layout/               # SiteHeader, FooterINAPI, PortalShell, Breadcrumbs
  portal/               # Primitivos de contenido, home, buscador, sala de prensa
  theme/                # ThemeProvider, ThemeToggle (claro/oscuro)
lib/
  portal-routes.ts      # Nav principal, subheader y metadatos por pantalla
  portal-search-index.ts
  portal-news.ts
docs/
  DESIGN_SYSTEM.md      # Tokens y componentes UI Kit v3.0.1 + portal
  development/DEVLOG.md # Registro cronológico de sprints
  ctrlu-htmls/          # Bundles HTML fuente + extracted/
  LENGUAJE_CLARO_CHECKLIST.md
scripts/                # Extracción y scaffolding de páginas
```

---

## Alcance funcional

### Portal institucional (Sprint 6 — agosto 2026)

- Home con hero marcas/patentes, cifras, proceso paso a paso, novedades y carrusel de observancia.
- Hubs de **Marcas** y **Patentes** con enlaces a trámites y guías.
- Páginas informativas: nosotros, trámites digitales, FAQ, glosario, contacto, SIAC, transparencia, datos abiertos, etc.
- **Buscador global** (`/buscar`) con índice estático de rutas y contenido.
- Header de 4 niveles y footer con licencia CC, dirección y redes.

### Flujo GRI (Sprints 1–5)

- Formulario guiado de solicitud de marca (`/auth` → `/solicitud`).
- Clasificador Niza con Fuse.js, stepper semáforo, glosario inline y autoguardado Firestore.
- Pesquisa de similitud de marcas y asistente IA (Claude) vía FAB.

---

## Variables de entorno

Copiar `.env.example` a `.env.local` y configurar claves de Firebase y Anthropic. **No subir `.env*` al repositorio** — usar GitHub Secrets en CI.

---

## Documentación

| Documento | Contenido |
| --- | --- |
| [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md) | Tokens, tipografía, componentes |
| [`docs/PORTAL_IMPLEMENTATION_PLAN.md`](docs/PORTAL_IMPLEMENTATION_PLAN.md) | Plan y estado de pantallas |
| [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) | Arquitectura técnica GRI |
| [`docs/ROADMAP.md`](docs/ROADMAP.md) | Roadmap por sprint |
| [`docs/LENGUAJE_CLARO_CHECKLIST.md`](docs/LENGUAJE_CLARO_CHECKLIST.md) | 39 criterios de contenido |

---

## Pendientes conocidos

- Imágenes reales para hero, noticias y banners (placeholders `PortalImagePlaceholder`).
- Calibración Fuse.js del buscador de similitud con umbrales 75/50/0.
- Modal unificado de login ClaveÚnica.
- Escala oficial `GOB.COLOR.GRIS` completa en tokens.

---

*Equipo UX INAPI · Proyecto CORFO · 2026*
