# Proceso de diseño — GRI: Portal de Solicitud de Marca INAPI

**Autor:** Fernando Arriagada
**Rol:** Diseñador UX/UI · Senior Product Designer · Senior FE Developer
**Contexto:** INAPI · Proyecto CORFO · Abril 2026
**Stack:** Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Bun

---

## Índice

1. [Problema identificado](#1-problema-identificado)
2. [Evidencia cualitativa — Reunión con Betty Olivares (8 abril)](#2-evidencia-cualitativa--reunión-con-betty-olivares-8-abril)
3. [Hipótesis de diseño](#3-hipótesis-de-diseño)
4. [Decisiones de diseño y trade-offs](#4-decisiones-de-diseño-y-trade-offs)
5. [Implementación — arquitectura de capas](#5-implementación--arquitectura-de-capas)
6. [Problemas encontrados en el desarrollo del MVP inicial](#6-problemas-encontrados-en-el-desarrollo-del-mvp-inicial)
7. [Replanteamiento post-reunión Betty — lo que cambia](#7-replanteamiento-post-reunión-betty--lo-que-cambia)
8. [Métricas de validación](#8-métricas-de-validación)
9. [Próximos pasos](#9-próximos-pasos)

---

## 1. Problema identificado

### Contexto

INAPI opera una plataforma de tramitación online donde ciudadanos, pymes y agentes de propiedad industrial inician solicitudes de registro de marcas y patentes en `tmchl.inapi.cl`. El proceso de registro de marca tiene 7 secciones secuenciales.

El análisis heurístico realizado en marzo de 2026 identificó que **la sección de selección de coberturas de Niza es el cuello de botella principal del proceso completo**. La reunión con Betty Olivares (8 de abril) confirmó este diagnóstico y añadió una complejidad significativa que el MVP inicial no había contemplado completamente.

### Evidencia heurística (UX Audit — Marzo 2026)

| Heurística | Problema | Severidad |
|---|---|---|
| H2 — Prevención de errores | Sin sugerencia automática de clase. 505 resultados paginados sin orientación. La vinculación nombre de marca → clase no es directa — requiere información sobre el producto o servicio. | **Catastrófico (4)** |
| H1 — Visibilidad del sistema | Sin stepper de progreso. El usuario no sabe en qué paso está ni cuánto falta. | Mayor (3) |
| H3 — Lenguaje del usuario | Términos "Prioridad", "Código DAS", "Solicitante", "Representante" generan errores sistémicos y predecibles. | Mayor (3) |
| H4 — Ayuda y documentación | Tooltips redirigen a OMPI y páginas externas. Interrumpen el flujo. | Mayor (3) |
| H5 — Eficiencia | Sin autocompletado. Sin indicación de costos futuros (publicación + registro). | Menor–Mayor (2–3) |

### Impacto de negocio (datos confirmados por Betty Olivares)

- **5.000** solicitudes de marca por mes
- **2.000** abandonos/rechazos mensuales (40%) — *nota: no son rechazos formales, son abandonos*: el usuario no completa etapas, incumple plazos o comete errores de clasificación
- **NPS −2** de usuarios ocasionales como consecuencia directa de esta frustración
- **4.550** consultas mensuales al call center por estado de trámite
- La mayoría de usuarios frustrados no retoman su solicitud

> *Betty Olivares, 8 de abril:* "Los 2.000 'rechazos' se refieren a abandonos por no completar las etapas, incumplimiento de plazos o errores de clase, lo que significa que la solicitud ni siquiera llega a registrarse."

---

## 2. Evidencia cualitativa — Reunión con Betty Olivares (8 abril)

Betty Olivares es jefa del equipo de Atención al Cliente de INAPI. Esta reunión reveló una complejidad mayor a la contemplada en el MVP inicial y redefinió los requerimientos del componente de clasificación.

### Hallazgos críticos de la reunión

**La clasificación de Niza no puede resolverse solo con el nombre de la marca:**

La marca (denominación) es un elemento distintivo que no determina directamente la clase. La clase la determina el **producto o servicio** que la marca protege. El sistema actual le pide al usuario que seleccione la clase justo después de ingresar el nombre, sin ninguna pregunta sobre qué vende o qué ofrece.

> *Betty, 8 abril:* "La relación entre la categoría, el tipo de marca y la denominación con la clase es compleja y no siempre evidente. El sistema tiene que hacer una segunda pregunta para obtener más detalles sobre el producto o servicio que se intenta registrar."

**El equipo de Betty lleva 2+ años desarrollando un sistema de preguntas cotidianas:**

El equipo de Atención al Cliente trabaja con un sistema de 4 preguntas simples, no técnicas, para extraer la información necesaria y transformarla en la clasificación correcta. Este conocimiento acumulado debe ser el insumo principal para el diseño de la segunda pregunta.

> *Betty, 8 abril:* "Hemos estado trabajando en esto por más de dos años, adquiriendo conocimiento sobre el tipo de lenguaje necesario para extraer la información requerida."

**Referencia validada — Proyecto Marca Mujer (INAPI):**

Un proyecto anterior de INAPI implementó un sistema similar de preguntas simples con buenos resultados. Es la referencia más directa del equipo.

**El borrador se pierde si el sistema de pago TGR falla:**

El borrador está vinculado al pago, no al formulario. Si el sitio de TGR falla, el usuario pierde todo el trabajo. Betty investiga si es técnicamente posible guardar antes del paso de pago.

**Los campos jurídicos generan errores sistémicos y predecibles:**

| Campo | Error sistemático | Frecuencia |
|---|---|---|
| "Prioridad" | El usuario lo interpreta como velocidad de procesamiento | Alta |
| "Solicitante" | Pone sus propios datos en vez del titular del derecho | Muy alta |
| "Representante" | Personas naturales se ponen a sí mismas como representantes generando problemas legales | Alta |
| "Código DAS" | Concepto completamente desconocido | Total |

**Los pagos futuros no se anticipan:**

El usuario no sabe que después de la tasa inicial vienen los pagos de publicación y registro. El proceso parece un "videojuego donde no sabes lo que viene después".

---

## 3. Hipótesis de diseño

### Hipótesis principal

> Si el Portal de Solicitud de Marca de INAPI guía al usuario con lenguaje cotidiano, anticipa los pagos y consecuencias del proceso, asiste la clasificación de Niza con preguntas progresivas y un sistema de sugerencias inteligentes, y persiste el borrador ante fallas técnicas, entonces la tasa de abandono del formulario disminuirá en al menos un 25%, la tasa de error en clasificación de clase bajará a menos del 20%, y el NPS de usuarios ocasionales pasará de −2 a más de +15 en los primeros 6 meses de operación del sistema rediseñado.

### Condición de falsabilidad

La hipótesis se refuta si, tras instalar herramientas de analítica (Clarity + GA4) y correr un test de usabilidad con 5 usuarios del segmento pyme/persona natural sin agente, el task success rate en la sección Clasificación no mejora respecto al baseline del sistema actual.

### Hipótesis secundarias

| # | Hipótesis | Métrica de validación |
|---|---|---|
| H2 | Si el formulario hace una segunda pregunta específica sobre el producto, la precisión de la sugerencia de clase de Niza superará el 90% | % de clases sugeridas correctamente en test de usabilidad |
| H3 | Si los campos Prioridad, Solicitante y Representante se renombran y contextualizan, los errores en esos campos disminuirán en al menos el 40% | Tasa de error por campo en test de usabilidad |
| H4 | Si el stepper es visible en todo momento, el tiempo promedio de completitud del formulario disminuirá | Time on task con Clarity |
| H5 | Si el borrador se guarda antes del paso de pago TGR, las pérdidas de solicitud por falla de pago se eliminarán | Datos de soporte post-lanzamiento |
| H6 | Si el costo total se muestra antes de iniciar, el abandono en el paso de pago disminuirá | Drop-off rate en paso de pago (GA4) |

### Las 5 oportunidades priorizadas del rediseño

| Prioridad | Oportunidad | Heurística | Novedad vs MVP inicial |
|---|---|---|---|
| 1 | **Segunda pregunta + clasificación asistida** | H2 | 🆕 Nueva — replanteamiento post Betty |
| 2 | **Stepper de progreso con semáforo** | H1 | ✅ Implementado — mantener |
| 3 | **Renombrado y contextualización de campos jurídicos** | H3 | 🆕 Nueva — post Betty |
| 4 | **Glosario inline contextual** | H3 + H4 | ✅ Implementado — mantener |
| 5 | **Pantalla de introducción con costo total** | H1 + H2 | 🆕 Nueva — post Betty |

---

## 4. Decisiones de diseño y trade-offs

### 4.1 La segunda pregunta — por qué y cómo

**Decisión:** agregar una sección dedicada "Tu producto o servicio" antes del selector de coberturas. La sección tiene dos campos: texto libre ("¿Qué vende o qué servicio ofrece tu marca?") y un selector visual de rubro/industria.

**Razonamiento:** Betty confirmó que la clasificación correcta no se logra con el nombre de la marca. Se necesita información sobre el producto o servicio. El sistema Marca Mujer de INAPI demostró que preguntas simples en lenguaje cotidiano funcionan mejor que pedirle al usuario que conozca la nomenclatura técnica.

**Trade-off asumido:** se agrega un paso más al formulario (de 3 a 4 pasos). La fricción de un paso adicional es menor que la fricción de seleccionar la clase incorrecta y recibir un rechazo semanas después.

---

### 4.2 Fuse.js N2 — clasificador enriquecido con rubro

**Decisión:** mantener Fuse.js como motor de búsqueda pero combinar el texto libre de la segunda pregunta con el rubro seleccionado para generar la sugerencia.

| Nivel | Tecnología | Cobertura | Costo | Estado |
|---|---|---|---|---|
| N1 | Fuse.js + catálogo básico | ~60% | Cero | ✅ MVP inicial |
| **N2** | **Fuse.js + segunda pregunta + rubro** | **~85%** | **Cero** | **🔄 Rediseño** |
| N3 | Embeddings semánticos (Gemini API) | ~95%+ | Por consulta | ⏸ Fase 2 |

**Razonamiento:** La arquitectura del hook `useClaseSugerida` está diseñada para escalar. El hook encapsula la lógica de búsqueda completamente. Para pasar a N3, solo cambia el contenido del hook sin modificar ningún componente de UI.

---

### 4.3 Instancia Fuse fuera del hook (decisión mantenida del MVP)

**Decisión:** `const fuse = new Fuse(...)` declarado en el scope del módulo, fuera de la función del hook.

**Razonamiento:** Fuse construye un índice de todos los textos del catálogo al instanciarse. Si estuviera dentro del hook, se recrearía en cada keystroke — destruyendo y reconstruyendo el índice con cada letra. Fuera del hook, el índice se construye una vez al cargar el módulo y persiste en RAM durante toda la sesión.

---

### 4.4 `shouldFilter={false}` en Command de shadcn/ui (bug conocido)

**Decisión:** es **obligatorio** en cualquier integración de Fuse.js con el componente `Command` de shadcn/ui.

**Razonamiento:** Command tiene su propio sistema de filtrado interno. Sin desactivarlo, filtra los resultados de Fuse antes de renderizarlos, resultando en cero resultados visibles. Con `shouldFilter={false}`, Command solo renderiza lo que Fuse devuelve.

**Consecuencia de no aplicarlo:** el buscador parece funcionar pero no muestra resultados. Es el primer bug que ocurrirá si se reimplementa el componente sin este conocimiento.

---

### 4.5 Campos jurídicos como condicionales, no como eliminaciones

**Decisión:** el campo "Prioridad" no se elimina — se oculta detrás de un toggle "¿Tienes una solicitud previa en otro país?". El campo "Representante" no se elimina — aparece condicionalmente si el usuario activa "Actúo como representante o agente".

**Razonamiento:** eliminar campos que aplican a casos específicos crea problemas para los usuarios que los necesitan (agentes PI, solicitudes internacionales). Ocultarlos condicionalmente reduce la carga cognitiva para el caso general sin sacrificar la funcionalidad avanzada.

---

### 4.6 Borrador en Firebase antes del pago TGR

**Decisión:** el autoguardado en Firebase Firestore ocurre en cada cambio de sección, no solo al final. El borrador existe en Firestore **antes** de que el usuario llegue al paso de pago.

**Razonamiento:** Betty confirmó que el borrador actual de INAPI está vinculado al pago — si TGR falla, se pierde el borrador. La desvinculación del borrador del pago es crítica para el perfil de usuario prioritario, que puede no tener el método de pago disponible inmediatamente.

**Trade-off asumido:** Firebase Firestore guarda borradores de usuarios que nunca completan el proceso. Para el MVP esto es aceptable. En producción se necesita una política de limpieza de borradores (TTL) y autenticación para evitar almacenamiento de datos sensibles sin usuario identificado.

---

### 4.7 Pantalla de introducción antes del formulario

**Decisión:** agregar una pantalla previa al formulario que muestra: qué es registrar una marca, costo total estimado desglosado (tasa + publicación + registro), tiempo promedio del proceso, y qué necesito tener a mano.

**Razonamiento:** Betty confirmó que el proceso actual parece un "videojuego donde el usuario no sabe lo que viene después". La pantalla de introducción anticipa las consecuencias antes de que el usuario invierta tiempo en el formulario, reduciendo el abandono en el paso de pago por sorpresa de costo.

---

## 5. Implementación — arquitectura de capas

La arquitectura sigue el principio de **cada capa solo conoce a la capa inmediatamente inferior**. Los componentes consumen hooks; los hooks consumen lib y data; las páginas orquestan componentes.

### Relación entre archivos y problemas que resuelven

| Archivo | Problema que resuelve | Heurística |
|---|---|---|
| `data/coberturas.json` (enriquecido con `rubros`) | Catálogo de coberturas con vocabulario cotidiano extendido por rubro | H2 |
| `data/glosario.json` | Términos técnicos con definición cotidiana + ejemplo | H3 + H4 |
| `hooks/useClaseSugerida.ts` (N2 + rubro) | Clasificación inteligente sin conocimiento técnico previo | H2 |
| `hooks/useSolicitud.ts` | Persistencia del borrador, estado del stepper, autoguardado pre-TGR | H1 + H2 + H5 |
| `components/BuscadorClases.tsx` | UI del clasificador con segunda pregunta y confirmación | H2 |
| `components/StepperSolicitud.tsx` | Progreso visible y orientación continua | H1 |
| `components/GlosarioTerm.tsx` | Ayuda contextual inline sin salir del flujo | H3 + H4 |
| `components/SelectorRubro.tsx` | Segunda pregunta — selector visual de industria | H2 |
| `app/page.tsx` | Pantalla de introducción con costo total anticipado | H1 + H5 |
| `app/solicitud/page.tsx` | Orquestación del formulario de 4 pasos | — |

### El ciclo de datos completo

```
coberturas.json (disco)
    → Turbopack embebe en bundle (build time)
    → RAM del browser al cargar la app
    → Fuse.js indexa en el scope del módulo
    → Usuario escribe en BuscadorClases
    → useClaseSugerida(query, rubro) con useMemo
    → fuse.search(query + rubro)
    → Sugerencias en Command (shouldFilter={false})
    → Dialog de confirmación
    → agregarClase() en useSolicitud
    → setSolicitud (objeto inmutable con spread)
    → React re-renderiza stepper y lista de clases
    → useEffect [solicitud.clases] detecta cambio
    → primeraVez.current previene guardado en montaje
    → guardarEnFirestore() async en segundo plano
    → UI ya actualizada — Firebase es efecto secundario
    → Firebase devuelve docId → setDocId para updates futuros
```

---

## 6. Problemas encontrados en el desarrollo del MVP inicial

### Bug 1 — Buscador sin resultados (shouldFilter)

**Síntoma:** al escribir en el buscador no aparecía ninguna sugerencia aunque Fuse.js tuviera resultados.

**Causa:** Command de shadcn/ui filtra internamente los resultados antes de renderizarlos. Fuse devolvía resultados correctos, pero Command los eliminaba con su propio filtrado.

**Solución:** `shouldFilter={false}` en `<Command>`. Una sola prop. Requirió entender la interacción entre dos sistemas de filtrado paralelos.

**Aprendizaje:** cuando se integran dos sistemas que operan sobre el mismo dato, hay que desactivar explícitamente el que no controlas.

---

### Bug 2 — Stepper con estados incorrectos en la progresión

**Síntoma:** al avanzar de sección, los estados del stepper no seguían el patrón semáforo definido. La sección 4 aparecía en naranja (debería ser gris) y secciones completadas perdían el estado verde.

**Causa:** la lógica de transición estaba distribuida en múltiples lugares — parte en el hook, parte en la página, con efectos secundarios implícitos. Las transiciones se pisaban entre sí.

**Solución:** función pura `avanzarSecciones(secciones, completarId, activarId)` centralizada en el hook. La página llama a `completarSeccion(completarId, activarId)` con IDs explícitos — es la única forma de avanzar el stepper.

**Aprendizaje:** el estado con múltiples caminos de actualización genera comportamiento impredecible. Una sola función de transición elimina la ambigüedad.

---

### Bug 3 — Autoguardado ejecutándose en el montaje inicial

**Síntoma:** al cargar el formulario, Firebase recibía una escritura inmediata con datos vacíos, creando documentos fantasma en Firestore.

**Causa:** `useEffect` con dependencia `[solicitud.clases]` se ejecuta también en el montaje inicial, cuando `clases` es un array vacío.

**Solución:** bandera `primeraVez` con `useRef(true)`. Al primer render, la bandera es `true`, el efecto sale sin guardar, y la cambia a `false`. En renders posteriores, el efecto corre normalmente.

**Por qué `useRef` y no `useState`:** cambiar la bandera no debe causar re-render. `useRef` persiste entre renders sin activar el ciclo de renderizado.

---

### Decisión post-bug — separar `completarTodo` de `completarSeccion`

El modal de éxito necesitaba poner todas las secciones en verde simultáneamente. `completarSeccion` solo transiciona de a una sección. Se creó `completarTodo()` como función separada que mapea todas las secciones a `completada`.

Separación correcta: `completarSeccion` es para el flujo normal paso a paso. `completarTodo` es exclusivamente para el estado final de éxito.

---

## 7. Replanteamiento post-reunión Betty — lo que cambia

La reunión del 8 de abril con Betty Olivares reveló que el MVP inicial era conceptualmente correcto pero incompleto en el componente más crítico. Los cambios no invalidan el MVP — lo amplían.

### Lo que se mantiene del MVP inicial

- ✅ Stepper de progreso con semáforo (4 estados)
- ✅ Glosario inline con `GlosarioTerm` y Popover
- ✅ Autoguardado en Firebase Firestore
- ✅ Modal de confirmación antes de agregar cobertura
- ✅ Modal de éxito bloqueante post-envío
- ✅ Fuse.js con `shouldFilter={false}` en Command
- ✅ Instancia Fuse en scope del módulo

### Lo que cambia o se agrega en el rediseño

| Cambio | Razón | Origen |
|---|---|---|
| 🆕 Pantalla de introducción con costo total | Los pagos no se anticipan; el proceso parece un videojuego | Betty, 8 abril |
| 🆕 Sección "Tu producto o servicio" (segunda pregunta) | La clasificación no puede resolverse solo con el nombre de la marca | Betty, 8 abril |
| 🆕 Selector visual de rubro/industria | Enriquecer el input para Fuse N2 | Betty, 8 abril |
| 🆕 Enriquecimiento de coberturas.json con campo `rubros[]` | Fuse N2 necesita datos de rubro para mayor precisión | Decisión técnica |
| 🆕 Renombrado de campos jurídicos | Errores sistémicos y predecibles por malinterpretación | Betty, 8 abril |
| 🆕 Campo "Prioridad" oculto por defecto (condicional) | El 95% de usuarios no lo necesita | Betty, 8 abril |
| 🆕 Campo "Representante" condicional | Personas naturales se ponen a sí mismas como representantes | Betty, 8 abril |
| 🔄 De 3 pasos a 4 pasos en el stepper | Agregar sección "Tu producto o servicio" | Replanteamiento |

---

## 8. Métricas de validación

### Paso 1 — Establecer baseline con Clarity + GA4

Instalar Microsoft Clarity en `tmchl.inapi.cl` con las credenciales institucionales de INAPI y configurar un funnel de conversión en GA4.

| Métrica | Descripción | Herramienta |
|---|---|---|
| Drop-off rate por sección | % de usuarios que llegan a cada sección y no continúan | GA4 funnel |
| Time on task — sección Clases | Tiempo promedio en completar la selección de coberturas | Clarity + GA4 |
| Task success rate — sección Clases | % de usuarios que seleccionan al menos una cobertura correcta | GA4 events |
| Dead clicks en campos críticos | Clicks en elementos no interactivos (Solicitante, Prioridad) | Clarity |
| Rage clicks en clasificación | Clicks repetidos en el selector (frustración) | Clarity |
| Solicitudes rechazadas por error de clase | Datos históricos de motivos de rechazo | Datos internos INAPI |

### Paso 2 — Test de usabilidad con usuarios reales

Correr una sesión de prueba moderada con 5 usuarios del segmento pyme / persona natural sin agente.

**Protocolo:**
1. Tarea: "Registra la marca de tu negocio"
2. Pensar en voz alta durante el proceso
3. Sin intervención del moderador salvo en abandono total
4. Grabar pantalla + audio (Pía facilita)
5. Registrar: tiempo por sección, clase seleccionada, errores cometidos

**Criterio de éxito:** task success rate > 85% en la sección de Clasificación con el sistema de segunda pregunta activo.

### Paso 3 — Sesión de prueba real con Betty

Realizar una solicitud real en el sistema actual (sin completar el pago) para:
- Identificar todos los puntos de mayor dificultad del flujo real
- Validar que el contenido de la segunda pregunta del GRI produce la clase correcta
- Determinar si es posible guardar el borrador antes del paso de pago

---

## 9. Próximos pasos

### Inmediato (semana 14-17 abril)

- [ ] Agregar campo `rubros[]` al catálogo `coberturas.json` (enriquecimiento para N2)
- [ ] Diseñar componente `SelectorRubro.tsx` — grid visual de 8 rubros con iconos
- [ ] Actualizar `useClaseSugerida.ts` para combinar query + rubro en la búsqueda Fuse
- [ ] Diseñar pantalla de introducción con costo total estimado
- [ ] Renombrar campos jurídicos y agregar lógica condicional para Prioridad y Representante
- [ ] Agendar sesión de prueba real con Betty (solicitud sin completar el pago)

### Corto plazo (mayo)

- [ ] Instalar Clarity + GA4 con credenciales institucionales INAPI
- [ ] Establecer baseline de métricas en el sistema actual
- [ ] Correr test de usabilidad con 5 usuarios (Pía facilita)
- [ ] Incorporar hallazgos al segundo ciclo de iteración
- [ ] Obtener del equipo de Betty las preguntas que usan en atención al cliente para clasificar — son el insumo directo para la segunda pregunta

### Deuda técnica planificada

- [ ] Escalar clasificador de N2 (Fuse + segunda pregunta) a N3 (embeddings Gemini) si el acierto de N2 en tests reales es inferior al 85%
- [ ] Definir política de limpieza de borradores en Firestore (TTL) para producción
- [ ] Integración con autenticación real (ClaveÚnica OIDC) — Fase 2
- [ ] Validar viabilidad técnica de guardar borrador antes del paso de pago TGR con el equipo de TI INAPI

---

## Notas finales

Este documento registra el proceso de diseño del rediseño del Portal de Solicitud de Marca de INAPI, incluyendo el replanteamiento post-reunión con Betty Olivares que amplió significativamente el alcance del componente de clasificación.

El criterio de éxito no es que el prototipo sea adoptado tal cual. Es que sirva de base para una conversación informada — con Betty, con TI y con el equipo UX — sobre cómo reducir la tasa de abandono del 40% con decisiones de diseño basadas en evidencia.

El aprendizaje más importante de este proceso: **la complejidad de la clasificación de Niza requiere al menos una segunda pregunta para llegar a más del 85% de acierto.** Eso no es un detalle de implementación — es una decisión de arquitectura de información que cambia toda la estructura del formulario.

---

*Documento v1.0 · GRI — Portal de Solicitud de Marca · INAPI · Proyecto CORFO · Abril 2026*
