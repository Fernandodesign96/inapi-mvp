# GRI — Roadmap de Desarrollo
## Portal de Solicitud de Registro de Marca INAPI
**Actualizado:** 15 de abril, 2026
**Rol:** Senior Product Designer + Senior FE Developer
**Estado general:** Semana 2 — Rediseño post-reunión Betty

---

## Contexto

- **Stack:** Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Bun
- **Herramienta de desarrollo:** Antigravity + VS Code (PC personal)
- **Restricción:** Sin acceso a consola/GitHub desde PC INAPI — todo el trabajo técnico desde PC personal
- **Nombre conceptual:** Guided Registration Interface (GRI)
- **Replanteamiento clave:** Post-reunión Betty (8 abril) — la clasificación de Niza requiere una segunda pregunta sobre el producto o servicio. El formulario pasa de 3 a 4 secciones.

---

## Estado actual del MVP inicial (completado)

### ✅ Lo que está implementado y se mantiene

| Componente | Estado | Notas |
|---|---|---|
| `StepperSolicitud.tsx` | ✅ Completo | Sistema semáforo naranja/verde/gris. Secuencia correcta. |
| `GlosarioTerm.tsx` | ✅ Completo | Popover inline, fallback silencioso, búsqueda case-insensitive |
| `BuscadorClases.tsx` | 🔄 Ampliar | Agregar segunda pregunta + selector de rubro (N2) |
| `hooks/useSolicitud.ts` | 🔄 Ampliar | Agregar campos `descripcionProducto` y `rubro` |
| `hooks/useClaseSugerida.ts` | 🔄 Ampliar | Combinar query + rubro en Fuse.js (N2) |
| Firebase Firestore | ✅ Completo | Singleton, addDoc/updateDoc, primeraVez useRef |
| `lib/types.ts` | 🔄 Ampliar | Agregar `rubros[]` a Cobertura, `descripcionProducto` y `rubro` a SolicitudBorrador |
| `data/glosario.json` | ✅ Completo | 8 términos clave con definición + ejemplo |
| Modal confirmación + éxito | ✅ Completo | Confirmación cancelable, éxito bloqueante |

### 🔴 Lo que cambia después de la reunión con Betty (8 abril)

1. **El formulario pasa de 3 a 4 secciones:** se agrega "Tu producto o servicio" entre Datos y Solicitante
2. **El stepper debe actualizarse** a 4 pasos con los nuevos IDs
3. **Se agrega `SelectorRubro.tsx`** — grid visual de 8 categorías de industria
4. **Se agrega pantalla de introducción** (`app/page.tsx`) con costo total y requisitos
5. **Los campos jurídicos se renombran** y algunos pasan a condicionales
6. **`coberturas.json` se enriquece** con campo `rubros[]` por cobertura

---

## SEMANA 2 — Rediseño post-Betty (14–18 de abril)

> **Por qué esta priorización:** el componente de clasificación es la causa raíz del 40% de abandono. Antes de continuar con el pulido visual, el componente central debe estar correcto. Todo lo demás es secundario.

### Lunes 14 — Enriquecimiento del catálogo y tipos

*Por qué primero:* Fuse.js N2 necesita el campo `rubros[]` en el catálogo antes de poder implementar el hook actualizado. Los tipos deben actualizarse antes de cualquier otro cambio.

- [ ] Agregar campo `rubros?: string[]` a la interfaz `Cobertura` en `lib/types.ts`
- [ ] Agregar campos `descripcionProducto?: string` y `rubro?: string` a `SolicitudBorrador` en `lib/types.ts`
- [ ] Enriquecer `data/coberturas.json`: agregar `rubros[]` a cada cobertura existente
- [ ] Crear los 8 rubros como constante exportable en `lib/rubros.ts`: `alimentos`, `tecnologia`, `moda`, `servicios`, `salud`, `arte`, `educacion`, `otro`

**Criterio de done:** TypeScript compila sin errores con los nuevos campos.

---

### Martes 15 — Hook useClaseSugerida N2

*Por qué:* el hook actualizado es el motor del componente de clasificación. Sin él, no se puede construir el componente.

- [ ] Actualizar `hooks/useClaseSugerida.ts`:
  - Modificar la instancia de Fuse para incluir `rubros` como key con weight 0.15
  - Actualizar la firma: `useClaseSugerida(query: string, rubro: string)`
  - Combinar `${query} ${rubro}` como input de búsqueda
  - Mantener `useMemo([query, rubro])` — recalcula si cambia cualquiera de los dos

```typescript
// Cambio en la instancia de Fuse (scope del módulo — fuera del hook)
const fuse = new Fuse(coberturas as Cobertura[], {
  keys: [
    { name: 'descripcion',   weight: 0.5  },
    { name: 'palabrasClave', weight: 0.35 },
    { name: 'rubros',        weight: 0.15 },  // ← NUEVO en N2
  ],
  threshold: 0.4,
  includeScore: true,
  shouldSort: true,
})
```

**Criterio de done:** escribir "café" + seleccionar rubro "alimentos" devuelve Clase 30 como primera sugerencia.

---

### Miércoles 16 — SelectorRubro.tsx + BuscadorClases actualizado

*Por qué:* una vez que el hook está listo, se construye el componente visual de la segunda pregunta.

- [ ] Crear `components/SelectorRubro.tsx`:
  - Grid 2×4 de 8 rubros con emoji + label
  - Estado seleccionado: fondo `primary/10%`, borde `primary`, texto `primary`
  - Rubro seleccionado no es obligatorio — el usuario puede buscar sin seleccionar rubro
  - Prop `onSeleccionar: (rubro: string) => void`

- [ ] Actualizar `components/BuscadorClases.tsx`:
  - Agregar sección "¿En qué rubro o industria opera tu marca?" antes del buscador de texto
  - Integrar `SelectorRubro` como subcomponente
  - Pasar `rubro` al hook `useClaseSugerida(query, rubro)`
  - El campo de texto libre va primero, el selector de rubro va segundo

**Criterio de done:** el flujo completo "escribir → seleccionar rubro → ver sugerencias mejoradas → confirmar" funciona correctamente.

---

### Jueves 17 — Stepper de 4 pasos + hook useSolicitud actualizado

*Por qué:* el formulario ahora tiene 4 secciones. El stepper y el hook deben reflejar esto.

- [ ] Actualizar `SECCIONES_INICIALES` en `hooks/useSolicitud.ts` a 4 secciones:
  ```typescript
  const SECCIONES_INICIALES: SeccionEstado[] = [
    { id: 'datos',        nombre: 'Datos',        estado: 'activa'   },
    { id: 'clases',       nombre: 'Clases',        estado: 'pendiente' },
    { id: 'solicitante',  nombre: 'Solicitante',   estado: 'pendiente' },
    { id: 'revision',     nombre: 'Revisión',      estado: 'pendiente' },
  ]
  ```

- [ ] Agregar `descripcionProducto` y `rubro` al estado inicial de `SolicitudBorrador`
- [ ] Actualizar `guardarEnFirestore` para incluir los nuevos campos
- [ ] Verificar que `avanzarSecciones()` y `completarTodo()` funcionan con 4 secciones

- [ ] Actualizar `components/StepperSolicitud.tsx`:
  - Verificar que el cálculo del porcentaje se adapta automáticamente a 4 secciones
  - Verificar que la barra de progreso lineal conecta los 4 círculos correctamente

**Criterio de done:** secuencia 🟠⚪⚪⚪ → ✅🟠⚪⚪ → ✅✅🟠⚪ → ✅✅✅🟠 → ✅✅✅✅ funciona correctamente.

---

### Viernes 18 — Campos jurídicos + pantalla de introducción

*Por qué:* Betty identificó que los campos jurídicos generan errores sistémicos. Son cambios de microcopy y lógica condicional que no requieren nueva infraestructura.

- [ ] Actualizar `app/solicitud/page.tsx`:
  - Renombrar campo "Denominación o signo" → "Nombre de tu marca"
  - Campo "Prioridad": oculto por defecto, aparece con toggle "¿Tienes una solicitud previa en otro país?"
  - Campo "Solicitante" → "¿Quién será el dueño de esta marca?"
  - Microcopy bajo el campo: "Si tú eres el dueño y quien llena este formulario, aquí van tus datos."
  - Campo "Representante": condicional — aparece solo con toggle "Actúo como representante o agente"
  - Separador visual claro entre sección Titular y sección Representante

- [ ] Crear/actualizar `app/page.tsx` (pantalla de introducción):
  - Explicación de qué es registrar una marca (2 líneas, lenguaje cotidiano)
  - Costo total estimado desglosado: tasa inicial + publicación + registro en CLP
  - Tiempo promedio del proceso
  - Lista de qué necesitar: nombre de la marca, RUT, descripción del negocio
  - CTA único: "Comenzar mi registro" → `/solicitud`

**Criterio de done:** un usuario que llega por primera vez a la página ve los costos totales antes de iniciar el formulario. Los campos jurídicos en el formulario no generan confusión en un test manual.

---

## SEMANA 3 — Testing y baseline de métricas (21–25 de abril)

### Lunes 21 — Sesión de prueba real con Betty

- [ ] Completar una solicitud de prueba real en `tmchl.inapi.cl` (sin completar el pago) junto a Betty
- [ ] Identificar todos los puntos de mayor dificultad del flujo real actual
- [ ] Validar que las sugerencias de clase del GRI son correctas para los casos de prueba
- [ ] Levantar: ¿es posible técnicamente guardar el borrador antes del paso de pago TGR?

### Martes 22 — Instalación de analytics

- [ ] Solicitar acceso a Clarity y GA4 con credenciales institucionales de INAPI
- [ ] Configurar Microsoft Clarity en `tmchl.inapi.cl`:
  - Heatmaps por sección del formulario
  - Session recording activado
  - Rage clicks en el selector de coberturas
- [ ] Configurar GA4 con funnel de conversión:
  - Inicio → Clases → Solicitante → Revisión → Presentada

### Miércoles 23 — Baseline de métricas

- [ ] Levantar drop-off rate por sección en el sistema actual (baseline)
- [ ] Medir time on task en la sección Clases (baseline)
- [ ] Documentar los resultados como punto de comparación post-lanzamiento

### Jueves 24 — Preparar protocolo de test de usabilidad

- [ ] Diseñar guión de test con Pía (5 usuarios perfil ocasional nuevo sin agente)
- [ ] Protocolo: tarea "Registra la marca de tu negocio", think-aloud, grabación
- [ ] Criterio de éxito: task success rate > 85% en la sección Clasificación con segunda pregunta activa

### Viernes 25 — Commit limpio y documentación

- [ ] Commit completo del rediseño con mensaje: `feat: GRI rediseño — segunda pregunta, 4 secciones, campos jurídicos`
- [ ] Actualizar `PROCESO.md` con los hallazgos de la sesión con Betty
- [ ] Verificar que todos los archivos TypeScript compilan sin errores

---

## SEMANA 4 — Test de usabilidad con usuarios reales (28 abril – 2 mayo)

- [ ] 5 sesiones de testing facilitadas por Pía (perfil: persona natural sin agente, primera solicitud)
- [ ] Fernando observa y toma notas UX, Nicole/Camila registran métricas cuantitativas
- [ ] Foco en: ¿la segunda pregunta produce la clase correcta? ¿los campos jurídicos confunden?
- [ ] Análisis de fricciones post-testing
- [ ] Informe de resultados para Álvaro y Betty

---

## SEMANA 5+ — Iteración y escalabilidad (mayo en adelante)

- [ ] Implementar fixes de alta prioridad basados en el test de usabilidad
- [ ] Evaluar si el clasificador N2 (Fuse + segunda pregunta) alcanza el 85% de acierto
- [ ] Si no alcanza el 85%: planificar escalada a N3 (embeddings Gemini)
- [ ] Reunión con equipo de TI INAPI para evaluar integración del componente de clasificación en el portal real
- [ ] Coordinación con Betty para definir el contenido exacto de la segunda pregunta (basado en las preguntas que usa su equipo de atención al cliente)

---

## Criterios de "Done" por componente

| Componente | Criterio de done FE (MVP) |
|---|---|
| `SelectorRubro.tsx` | Grid 2×4 funcional, estado seleccionado visual, sin validación obligatoria |
| `useClaseSugerida.ts` (N2) | "café" + rubro "alimentos" → Clase 30 como primera sugerencia |
| `BuscadorClases.tsx` (N2) | Segunda pregunta visible, selector de rubro integrado, Fuse N2 activo |
| Stepper 4 pasos | Secuencia 🟠⚪⚪⚪ → ✅✅✅✅ sin errores de estado |
| Campos jurídicos | Prioridad oculto por defecto, Representante condicional, Solicitante renombrado |
| Pantalla de introducción | Costo total visible antes del formulario, CTA único, sin login requerido |
| Firebase N2 | `descripcionProducto` y `rubro` guardados en Firestore con el borrador |

---

## Deuda técnica registrada (no bloquea MVP)

| Deuda | Justificación de diferimiento |
|---|---|
| Clasificador N3 (embeddings Gemini) | Depende del resultado del test de usabilidad con N2. Si N2 alcanza 85%, N3 no es urgente. |
| Autenticación real (ClaveÚnica OIDC) | El MVP valida el concepto sin autenticación. Es Fase 2 con backend NestJS. |
| Política de limpieza de borradores Firebase (TTL) | No crítico para MVP. Importante para producción con datos reales. |
| Modo avanzado para agentes PI (acceso directo al selector completo) | El perfil prioritario del MVP es el usuario nuevo. El agente PI puede adaptarse. |
| Simulador de costos con cotización UTM exacta | Requiere integración con tabla oficial de UTM vigente. Fase 2. |
| Integración IA fonética INAPI-U.Chile | Requiere reunión con el equipo técnico que administra esa IA. Fase 2. |

---

## Notas para la sesión de prueba real con Betty

La sesión tiene como objetivo específico validar:

1. **Segunda pregunta:** ¿las preguntas que usa el equipo de Betty para clasificar coinciden con lo que hemos diseñado? Betty lleva 2+ años refinando este proceso — su conocimiento es el insumo más valioso para el diseño final de la segunda pregunta.

2. **Borrador antes del pago:** investigar la restricción técnica de TGR. ¿Es una restricción del portal actual de INAPI o de TGR? ¿Hay otros portales gubernamentales que guarden el borrador antes del pago?

3. **Campos jurídicos:** hacer el recorrido completo del formulario actual para documentar todos los campos que generan confusión, no solo los identificados en el audit.

---

*Roadmap v1.1 · GRI — Portal de Solicitud de Marca · Equipo UX INAPI · Proyecto CORFO · Abril 2026*
*Actualizado post-reunión Betty Olivares (8 abril 2026). Próxima revisión: post-sesión de prueba real.*
