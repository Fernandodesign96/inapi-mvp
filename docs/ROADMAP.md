# GRI — Roadmap de Desarrollo
## Portal de Solicitud de Registro de Marca INAPI
**Actualizado:** 11 de agosto, 2026
**Rol:** Senior Product Designer + Senior Full Stack Developer
**Estado general:** Sprint 6 — Portal institucional completo (UI Kit v3.0.1 + 34 rutas públicas)

---

## Contexto

- **Stack:** Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Anthropic Claude 3 · Bun
- **Herramienta de desarrollo:** Cursor + Antigravity
- **Nombre conceptual:** Guided Registration Interface (GRI) + Portal institucional INAPI
- **Hito reciente:** Implementación de ~34 páginas públicas desde diseños Claude Design; layout global con header de 4 niveles y tokens de portal.

---

## Estado actual del MVP (Sprint 6 completado)

### ✅ Portal institucional

| Área | Estado | Notas |
| --- | --- | --- |
| Layout global (`SiteHeader`, `FooterINAPI`, `PortalShell`) | ✅ | Nav principal + subheader + buscador |
| Home extendida | ✅ | Hero, cifras, proceso, novedades, carrusel observancia |
| Hubs Marcas / Patentes | ✅ | Enlaces a trámites, guías y GRI |
| Páginas informativas (~22 rutas) | ✅ | Contenido desde HTML extraído + lenguaje claro |
| Buscador global `/buscar` | ✅ | Índice estático + `BuscadorSitio` |
| Build estático | ✅ | 35 rutas, `basePath: /inapi-mvp` |

### ✅ Flujo GRI (Sprints 1–5)

| Componente | Estado | Notas |
|---|---|---|
| `StepperSolicitud.tsx` | ✅ Finalizado | Flujo de 4 pasos con sistema de colores institucional/semáforo. |
| `PesquisaMarca.tsx` | ✅ Finalizado | Motor de semejanza con Fuse.js y base de datos mock. Calibración pendiente. |
| `Chat IA (Claude 3)` | ✅ Finalizado | Asistente contextual integrado en FAB y ruta API segura. |
| `AuthPage.tsx` | ✅ Finalizado | Pantalla dedicada con Clave Única y Login Institucional (simulado). |
| `useSolicitud.ts` | ✅ Finalizado | Incluye sanitización de datos (fix undefined) y persistencia en Firestore. |
| UI Kit v3.0.1 | ✅ Finalizado | Tokens GOB, Roboto/Roboto Slab, tema claro/oscuro. |

---

## Sprint 7 — Pulido y validación (agosto–septiembre 2026)

> **Objetivo:** Cerrar gaps de Fase 4, assets visuales y validación con usuarios.

### Prioridades

- [ ] **Assets reales:** hero home, imágenes de noticias y banners (Plataforma de datos, Guías, Cuenta pública).
- [ ] **Buscador de similitud:** calibración Fuse.js con umbrales 75/50/0 y clases Niza.
- [ ] **Login unificado:** modal ClaveÚnica en header y `/auth`.
- [ ] **Tokens pendientes:** escala `GOB.COLOR.GRIS` y elevaciones oficiales del kit.
- [ ] **Test de usabilidad:** recorrido portal completo + flujo GRI con checklist de lenguaje claro (39 criterios).

### Integración backend (heredado Sprint 4)

- [ ] Presentación del GRI v1.0 + portal a jefatura INAPI.
- [ ] Calibración del verificador de semejanza con data histórica de rechazos.
- [ ] Integración API real de consulta de marcas.
- [ ] Pasarela de pago TGR.

---

## Criterios de "Done" Actualizados

| Componente | Criterio de done |
|---|---|
| `PesquisaMarca.tsx` | Calibrado con el método de "tasa de rechazos" (85% precisión). |
| `Auth Flow` | Redirección segura post-login y persistencia de sesión en localStorage/AuthContext. |
| `IA Assistant` | Respuesta en < 1.5s y manejo de errores de API Anthropic. |
| `Sanitización` | Cero errores `undefined` en las escrituras de Firestore. |

---

## Deuda Técnica y Observaciones

| Deuda | Estado |
|---|---|
| Integración TGR | Pendiente de definición de endpoints por parte de TI. |
| Clasificador N3 (Embeddings) | En evaluación, dependiendo de la precisión lograda con el método de tasa de rechazos. |
| Sesión de Clave Única Real | Requiere configuración de client_id y secret en entorno de staging. |

---

*Roadmap v1.2 · GRI — Portal de Solicitud de Marca · Equipo UX INAPI · Abril 2026*
*Actualizado tras cierre de Sprint 4 (24 de abril). Próximo hito: Corrección con Álvaro y Bernarda.*

