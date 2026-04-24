# GRI — Roadmap de Desarrollo
## Portal de Solicitud de Registro de Marca INAPI
**Actualizado:** 24 de abril, 2026
**Rol:** Senior Product Designer + Senior Full Stack Developer
**Estado general:** Semana 3 — Optimización Institucional y Motor de Inteligencia (Sprint 4)

---

## Contexto

- **Stack:** Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Anthropic Claude 3 · Bun
- **Herramienta de desarrollo:** Antigravity + VS Code (PC personal)
- **Nombre conceptual:** Guided Registration Interface (GRI)
- **Hito Reciente:** Rediseño total de autenticación, integración de Pesquisa de Marca y Asistente IA.

---

## Estado actual del MVP (Sprint 4 Completado)

### ✅ Componentes Implementados y Optimizados

| Componente | Estado | Notas |
|---|---|---|
| `StepperSolicitud.tsx` | ✅ Finalizado | Flujo de 4 pasos con sistema de colores institucional/semáforo. |
| `PesquisaMarca.tsx` | ✅ Finalizado | Motor de semejanza con Fuse.js y base de datos mock. Calibración pendiente. |
| `Chat IA (Claude 3)` | ✅ Finalizado | Asistente contextual integrado en FAB y ruta API segura. |
| `AuthPage.tsx` | ✅ Finalizado | Pantalla dedicada con Clave Única y Login Institucional (simulado). |
| `useSolicitud.ts` | ✅ Finalizado | Incluye sanitización de datos (fix undefined) y persistencia en Firestore. |
| `GlosarioTerm.tsx` | ✅ Finalizado | Popovers funcionales y accesibles en todo el formulario. |
| `layout.tsx` (Inter) | ✅ Finalizado | Unificación tipográfica global bajo estándar institucional. |

---

## SEMANA 4 — Corrección y Planificación Backend (27 abril – 1 mayo)

> **Objetivo:** Validar el MVP con la jefatura y definir la arquitectura de integración con los sistemas core de INAPI.

### Lunes 27 — Corrección del MVP con Álvaro y Bernarda

*Sesión crítica de validación de producto y arquitectura técnica.*

- [ ] **Presentación del GRI v1.0:** Recorrido completo desde la landing hasta la revisión final.
- [ ] **Discusión de Implementación Backend:**
  - Definir estrategia de integración: ¿Middleware en NestJS o conexión directa a servicios legados?
  - Evaluación de seguridad para la persistencia de borradores sensibles.
- [ ] **Calibración del Verificador de Semejanza:**
  - **Método de Tasa de Rechazos:** Utilizar la data histórica de rechazos por semejanza para ajustar los umbrales (`thresholds`) de Fuse.js.
  - Objetivo: Encontrar el punto de equilibrio donde el sistema no sea "demasiado permisivo" ni "excesivamente alarmista".
  - Definir los parámetros de ponderación entre denominación y descripción del producto.

### Martes 28 — Refinamiento de Pesquisa con Data Real

- [ ] Solicitar acceso a muestras anonimizadas de marcas rechazadas vs aceptadas.
- [ ] Ajustar pesos de búsqueda en `components/PesquisaMarca.tsx` basados en los hallazgos de la sesión del lunes.
- [ ] Documentar la lógica de "Fuzzy Search" para aprobación del equipo legal.

### Miércoles 29 — Preparación para Test de Usabilidad

- [ ] Ajustar microcopy del Chat IA basado en feedback de Bernarda.
- [ ] Protocolo de test: tarea "Registra la marca de tu negocio", think-aloud, grabación.

---

## SEMANA 5+ — Escalamiento e Integración (Mayo)

- [ ] **Integración API Real:** Reemplazar `marcas-mock.json` por consulta a base de datos institucional.
- [ ] **Pasarela de Pago (TGR):** Implementar el puente hacia el portal de Tesorería General.
- [ ] **Dashboard de Administración:** Vista interna para que el equipo de INAPI analice métricas de abandono y uso del Chat IA.

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

