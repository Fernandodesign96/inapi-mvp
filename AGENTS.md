<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portal INAPI MVP v1.0

## Estado Actual
- **Portal institucional**: ~34 rutas con contenido real (home, marcas, patentes, trámites, transparencia, sala de prensa, etc.) alineadas a diseños Claude Design / Ctrl+U.
- **Layout**: `SiteHeader` (nav principal + subheader + buscador + login), `FooterINAPI` institucional, `PortalShell` y `Breadcrumbs`.
- **Design system**: UI Kit Gobierno Digital v3.0.1 con tokens de portal (`--inapi-portal-*`, CTAs, acentos marcas/patentes) en `app/globals.css`.
- **Buscador**: Buscador global del sitio (`/buscar`) y buscador de similitud de marcas con lógica multitérmino (OR).
- **Flujo GRI**: Stepper de 7 etapas con tabla de revisión final detallada (rutas `/auth`, `/solicitud`).
- **Contenido**: Checklist de lenguaje claro (39 criterios) en `docs/LENGUAJE_CLARO_CHECKLIST.md`.
- **CI/CD**: Configurado vía GitHub Actions (`nextjs.yml`) para despliegue estático (`basePath: /inapi-mvp`).

## Directrices de Seguridad
1. **Variables de Entorno**: Nunca subir archivos `.env` al repositorio. Las claves de Firebase deben configurarse como *Secrets* en el repositorio de GitHub.
2. **Ignorados**: Asegurar que `.gitignore` incluya `.next/`, `out/`, `node_modules/` y `.env*`.
3. **Firestore**: Las reglas de seguridad de Firestore deben ser estrictas, permitiendo solo operaciones necesarias desde el origen validado.
