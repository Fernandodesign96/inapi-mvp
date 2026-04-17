<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Portal INAPI MVP v1.0

## Estado Actual
- **Buscador**: Optimizado con lógica multitérmino (OR) y persistencia de consulta.
- **UI**: Header y Footer institucionales integrados. Sistema de tooltips basado en Radix Portals.
- **Flujo**: Stepper de 7 etapas con tabla de revisión final detallada.
- **CI/CD**: Configurado vía GitHub Actions (`nextjs.yml`) para despliegue estático.

## Directrices de Seguridad
1. **Variables de Entorno**: Nunca subir archivos `.env` al repositorio. Las claves de Firebase deben configurarse como *Secrets* en el repositorio de GitHub.
2. **Ignorados**: Asegurar que `.gitignore` incluya `.next/`, `out/`, `node_modules/` y `.env*`.
3. **Firestore**: Las reglas de seguridad de Firestore deben ser estrictas, permitiendo solo operaciones necesarias desde el origen validado.
