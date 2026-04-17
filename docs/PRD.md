# Documento de Requerimientos de Producto (PRD): Portal de Solicitud de Marca INAPI

> **Nombre conceptual del sistema:** Guided Registration Interface (GRI)
> Este documento define los requisitos de producto del MVP del rediseño del flujo de solicitud de registro de marca de INAPI, basado directamente en el *Documento de Fundamentos GRI v1.0*, el UX Audit (Marzo 2026) y las reuniones con equipos internos de INAPI.

| Metadatos | Detalle |
| --- | --- |
| **Proyecto** | GRI — Guided Registration Interface |
| **Versión** | 1.0 (MVP) — Abril 2026 |
| **Estado** | 🟠 En diseño activo — próxima sesión de prueba real con equipos internos de INAPI |
| **Stack** | Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Bun |
| **Propietarios** | Fernando Arriagada (Diseño UX/UI + FE) · Equipo UX INAPI |
| **Audiencia** | Equipo UX, TI INAPI, Equipo Atención al Cliente, Dirección |

---

## Tabla de contenidos

1. [Visión Estratégica y Nombre Conceptual](#1-visión-estratégica-y-nombre-conceptual)
2. [Objetivos y Métricas de Éxito (KPIs)](#2-objetivos-y-métricas-de-éxito-kpis)
3. [Perfiles de Usuario y Modelos Mentales](#3-perfiles-de-usuario-y-modelos-mentales)
4. [Historias de Usuario y Funcionalidades Principales](#4-historias-de-usuario-y-funcionalidades-principales)
5. [Arquitectura de Información y Flujo del Formulario](#5-arquitectura-de-información-y-flujo-del-formulario)
6. [El Componente Central — Sistema de Clasificación de Niza](#6-el-componente-central--sistema-de-clasificación-de-niza)
7. [Lineamientos de UX/UI](#7-lineamientos-de-uxui)
8. [Etapas Críticas del Funnel](#8-etapas-críticas-del-funnel)
9. [Alcance del MVP y Post-MVP](#9-alcance-del-mvp-y-post-mvp)
10. [Decisiones de Diseño y Trade-offs](#10-decisiones-de-diseño-y-trade-offs)

---

## 1. Visión Estratégica y Nombre Conceptual

### ¿Qué tipo de sistema es el GRI?

El Portal de Solicitud de Marca de INAPI **no es un formulario**. Es una **Guided Registration Interface (GRI)**: un sistema que no solo recoge datos del usuario, sino que lo guía activamente hacia las decisiones correctas en el momento en que las toma, previniendo errores antes de que ocurran y eliminando la incertidumbre sobre el proceso completo.

Esta distinción conceptual es crítica porque los errores en el momento del ingreso no se manifiestan de inmediato: aparecen semanas o meses después cuando el examinador rechaza la solicitud. El usuario no tiene feedback inmediato de si lo hizo bien.

> **Beatriz Olivares, 8 de abril:** *"Un usuario no debería perder su marca por no saber cómo manejar el sitio."*

### Por qué no es un "formulario mejorado"

Un formulario mejorado solo cambia la presentación visual. El GRI cambia el modelo de interacción: en vez de pedirle al usuario que conozca la terminología técnica de propiedad industrial para completarlo, el sistema extrae la información con preguntas en lenguaje cotidiano y la traduce internamente a la estructura legal requerida.

### Los 5 pilares filosóficos del GRI

| # | Pilar | Descripción operativa |
|---|-------|-----------------------|
| 1 | **Prevención sobre corrección** | El formulario guía al usuario hacia la decisión correcta antes de tomarla. Mejor prevenir un error ahora que notificarlo en un rechazo semanas después. |
| 2 | **Orientación continua** | El usuario sabe en todo momento en qué paso está, cuánto falta y qué acaba de completar. La incertidumbre es la causa raíz del abandono. |
| 3 | **Lenguaje del usuario, no del abogado** | Todo texto del formulario usa el idioma cotidiano del ciudadano. Los conceptos técnicos se explican en contexto, no en páginas externas. |
| 4 | **Anticipación de consecuencias** | El usuario conoce el costo total, los plazos y los pagos futuros antes de iniciar. No hay sorpresas. |
| 5 | **Persistencia del progreso** | El borrador se guarda antes de cualquier interacción con sistemas externos (TGR). Una falla del sistema de pago no borra el trabajo del usuario. |

---

## 2. Objetivos y Métricas de Éxito (KPIs)

### KPIs de Negocio

| Objetivo | Métrica | Herramienta | Meta (6 meses) |
| --- | --- | --- | --- |
| **Reducir abandono del formulario** | % de solicitudes iniciadas que no se presentan | GA4 funnel + Clarity | **< 15%** (desde 40%) |
| **Reducir error de clasificación Niza** | % de solicitudes rechazadas por error de clase | Datos internos INAPI | **< 20%** |
| **Aumentar NPS usuario ocasional** | NPS encuesta post-solicitud | Encuesta in-app (Pía) | **≥ +15** (desde −2) |
| **Reducir consultas soporte por clasificación** | Volumen de consultas por error de clase | Datos INAPI + Zoho | **↓ 40%** |
| **Eliminar pérdidas por falla TGR** | Borradores perdidos post-falla de pago | Backend INAPI | **Cero** |
| **Aumentar tasa de solicitudes completadas** | % iniciadas → presentadas | GA4 + datos INAPI | **≥ 70%** |

### KPIs de Diseño (UX)

| Indicador | Descripción | Herramienta | Meta |
| --- | --- | --- | --- |
| **Task success rate — Clasificación** | % de usuarios que seleccionan la clase correcta en el primer intento con la segunda pregunta activa | Test usabilidad + Clarity | **> 85%** |
| **Dead clicks en campos críticos** | Clicks en elementos no interactivos en Solicitante, Prioridad y Representante | Microsoft Clarity | **< 5% por campo** |
| **Rage clicks en clasificación** | Clicks repetidos en el selector de coberturas. Indica frustración | Microsoft Clarity | **< 3%** |
| **Scroll depth por sección** | % de usuarios que llegan al CTA de cada sección sin scroll extendido | Clarity heatmaps | **> 80%** |
| **Tiempo en sección Clasificación** | Reducir respecto al baseline actual con Clarity | Clarity session recording | **↓ 40% vs baseline** |
| **Tasa de aceptación sugerencia de clase** | % que acepta la clase sugerida sin ajuste manual | GA4 eventos + backend | **> 50%** |

---

## 3. Perfiles de Usuario y Modelos Mentales

### Perfil A — Usuario Ocasional Nuevo sin Agente (Prioridad MVP)

**Vector:** `0001000` → No habilitado · Solo marca · Persona natural · Sin agente · Fuera RM

- **Quién es:** emprendedor, artesano, pyme, profesional independiente tramitando su primera marca sin representante legal.
- **Modelo mental de referencia:** BancoEstado, Correos Chile, Fonasa. Espera que el estado sea visible, la acción sea un botón claro y el resultado llegue como confirmación.
- **Fricciones críticas:**
  - Términos como "Prioridad", "Código DAS", "Solicitante" son malinterpretados de manera sistemática.
  - "Prioridad" → entiende como velocidad de procesamiento, no como prioridad de la Convención de París.
  - "Solicitante" → pone sus propios datos en vez del titular del derecho.
  - El silencio del sistema post-pago TGR se interpreta como error, generando llamadas al call center.
- **Necesidad principal:** saber qué hace, cuándo lo hace, por qué lo hace y cuánto cuesta, en ese orden.

### Perfil B — Agente PI / Usuario Frecuente

**Vector:** `1x01x10` o similar (habilitado, con agente, alta frecuencia)

- **Quién es:** abogado especializado en PI o agente matriculado gestionando múltiples solicitudes de distintos clientes.
- **Modelo mental:** herramientas profesionales. Espera velocidad, densidad de información y acceso directo.
- **Fricciones:** el flujo guiado puede ralentizarlo. Necesita modo avanzado o prefilling desde solicitudes anteriores.
- **Necesidad principal:** velocidad y trazabilidad.

### Perfil C — Empresa o Institución

**Vector:** `T=2 o T=3`

- PyME, empresa o universidad delegando la gestión a un área administrativa.
- El usuario real puede ser alguien del área legal sin experiencia directa en PI.
- Necesidades intermedias entre Perfil A y B.

### Tabla de modelos mentales por campo crítico

| Campo del sistema actual | Lo que el usuario entiende | Lo que el GRI debe comunicar |
| --- | --- | --- |
| "Prioridad" | Que mi solicitud se procese antes que las demás | Campo para solicitudes con prioridad de otro país (Convención de París). Para el 95% no aplica. Oculto por defecto. |
| "Solicitante" | La persona que llena el formulario ahora | El titular del derecho: quien será dueño de la marca. Campo con ejemplo explícito. |
| "Clase de Niza" | Concepto invisible — no tienen modelo mental | La categoría que define qué productos o servicios protege la marca. Se explica con ejemplos del rubro del usuario. |
| "Representante" | Alguien importante que habla por mí | La persona autorizada legalmente para actuar por el solicitante. Campo condicional — solo aparece si el solicitante no actúa por sí mismo. |
| "Código DAS" | Sin modelo mental | Código del sistema TGR para el pago. Solo relevante en el paso de pago, nunca en el formulario principal. |

---

## 4. Historias de Usuario y Funcionalidades Principales

### F01 — Presentación y costo total previo al formulario

**Historia:** Como usuario nuevo, quiero saber qué voy a hacer, cuánto me va a costar y cuánto tiempo tomará antes de empezar, para poder tomar la decisión informada de iniciar o no la solicitud.

**Aceptación:**
- Pantalla previa al formulario con: explicación de qué es registrar una marca (2 líneas), costo total estimado desglosado (tasa inicial + publicación + registro en CLP), tiempo promedio del proceso, lista de lo que necesito tener a mano.
- CTA único y prominente: "Comenzar mi registro".
- Sin fricción de login requerida para ver esta pantalla.

---

### F02 — Datos de la marca (Paso 1 del formulario)

**Historia:** Como usuario, quiero ingresar el nombre de mi marca y el tipo de marca de forma clara, sin terminología legal que no entiendo.

**Aceptación:**
- Campo "Nombre de tu marca" (reemplaza "Denominación/Signo").
- Tipo de marca: selector visual con iconos, no dropdown (Denominativa, Figurativa, Mixta).
- Campo "Prioridad": oculto por defecto. Aparece solo si el usuario activa "¿Tienes una solicitud previa en otro país?".
- Glosario inline con Popover en cualquier término técnico que permanezca.
- Botón desactivado mientras el campo "Nombre de tu marca" esté vacío.

---

### F03 — Tu producto o servicio — La segunda pregunta (Paso 2 — componente central)

**Historia:** Como usuario, quiero que el sistema me sugiera la clase de Niza correcta basándose en lo que vendo o el servicio que ofrezco, sin tener que conocer la nomenclatura técnica de propiedad industrial.

**Aceptación:**
- Campo de texto libre: "¿Qué vende o qué servicio ofrece tu marca?" — placeholder: "Ej: café tostado artesanal, diseño de páginas web, ropa deportiva..."
- Selector visual de rubro/industria: Alimentos, Tecnología, Moda, Servicios, Salud, Arte, Educación, Otro.
- Sistema Fuse.js procesa ambos inputs y devuelve sugerencias de coberturas preaprobadas de Niza con label de clase y descripción en lenguaje cotidiano.
- Badge "ICPA" en coberturas preaprobadas (reduce riesgo de rechazo).
- Modal de confirmación antes de agregar una cobertura (prevención de errores).
- El usuario puede aceptar la sugerencia o buscar manualmente ("Ver todas las clases").
- El stepper avanza a verde cuando se selecciona al menos una cobertura.

---

### F04 — Solicitante y representante (Paso 3)

**Historia:** Como usuario, quiero entender claramente quién debe ir como "dueño" de la marca y cuándo necesito un representante, para no cometer el error de poner mis propios datos en el campo incorrecto.

**Aceptación:**
- Campo principal: "¿Quién será el dueño de esta marca?" (reemplaza "Solicitante").
- Microcopy contextual: "Si tú serás el dueño y quien llena este formulario, aquí van tus datos."
- Campo "Representante": condicional — aparece solo si el usuario activa "Actúo como representante o agente".
- Distinción visual clara (peso visual diferente, color, separador) entre sección Titular y sección Representante.
- Microcopy de advertencia si el usuario pone el mismo nombre en ambos campos.

---

### F05 — Revisión y pago (Paso 4 — etapa crítica)

**Historia:** Como usuario, quiero revisar toda la información antes de presentar, entender exactamente cuánto voy a pagar y qué pagos adicionales vendrán después, y saber que mi trabajo no se perderá si el sistema de pago falla.

**Aceptación:**
- Resumen completo: nombre de marca, tipo, clase(s) seleccionada(s), coberturas, costo total desglosado.
- Aviso explícito: "La publicación en el Diario Oficial y el registro final tienen costos adicionales. Ve los montos estimados aquí." (expandible inline, no redirección externa).
- Botón "Guardar borrador" disponible antes de redirigir a TGR (Firebase Firestore).
- Microcopy post-pago TGR: "Tu pago está siendo verificado con la Tesorería General de la República. Esto puede tardar hasta 24 horas. Tu solicitud está guardada. No necesitas hacer nada más. Te avisaremos cuando se confirme."
- Modal de confirmación antes del envío final (reversible).
- Modal de éxito bloqueante post-confirmación.

---

### F06 — Stepper de progreso con sistema semáforo

**Historia:** Como usuario, quiero ver en todo momento en qué sección estoy, cuántas completé y cuántas faltan, para no sentir que el formulario es interminable.

**Aceptación:**
- Stepper persistente en la parte superior de cada sección.
- Estados: Naranja (sección activa), Verde con check (completada), Gris (pendiente).
- Porcentaje de avance numérico visible.
- Secuencia correcta: 🟠⚪⚪⚪ → ✅🟠⚪⚪ → ✅✅🟠⚪ → ✅✅✅🟠 → ✅✅✅✅.
- Barra de progreso lineal conectando los círculos del stepper.

---

### F07 — Glosario inline contextual

**Historia:** Como usuario, quiero entender los términos técnicos del formulario sin tener que salir de la página ni abrir un PDF de 30 páginas.

**Aceptación:**
- Componente `GlosarioTerm` como wrapper con Popover de shadcn/ui.
- El Popover muestra: definición en lenguaje cotidiano + ejemplo concreto.
- Si el término no existe en `glosario.json`, el componente renderiza el texto sin Popover (degradación silenciosa, sin error).
- Búsqueda case-insensitive por clave de término.
- Aplicado en: "clase de Niza", "cobertura preaprobada", "marca denominativa", "titular", "arancel".

---

## 5. Arquitectura de Información y Flujo del Formulario

### Estructura de las 5 secciones del GRI

```
GRI — Portal de Solicitud de Registro de Marca
│
├── /intro                    ← Pantalla previa: qué es, cuánto cuesta, qué necesito
│
└── /solicitud                ← Formulario de 4 pasos secuenciales
    ├── /datos                ← Paso 1: Nombre y tipo de marca
    ├── /clasificacion        ← Paso 2: Tu producto/servicio + sugerencia de clase (CORE)
    ├── /solicitante          ← Paso 3: Titular y representante (condicional)
    └── /revision             ← Paso 4: Resumen + borrador + pago TGR
```

### Estado del stepper por sección

| Sección activa | Paso 1 | Paso 2 | Paso 3 | Paso 4 |
|---|---|---|---|---|
| Datos | 🟠 | ⚪ | ⚪ | ⚪ |
| Clasificación | ✅ | 🟠 | ⚪ | ⚪ |
| Solicitante | ✅ | ✅ | 🟠 | ⚪ |
| Revisión | ✅ | ✅ | ✅ | 🟠 |
| Enviado | ✅ | ✅ | ✅ | ✅ |

### Estructura de archivos del proyecto

```
/inapi-mvp (o nombre del proyecto GRI)
├── /app
│   ├── page.tsx                      ← Intro / Landing del GRI
│   └── /solicitud
│       └── page.tsx                  ← Formulario completo (Client Component)
│
├── /components
│   ├── /ui                           ← shadcn/ui components
│   ├── BuscadorClases.tsx            ← Buscador Fuse.js + segunda pregunta
│   ├── StepperSolicitud.tsx          ← Stepper semáforo (4 pasos)
│   ├── GlosarioTerm.tsx              ← Wrapper con Popover para términos técnicos
│   └── SelectorRubro.tsx             ← Grid visual de selección de rubro/industria
│
├── /hooks
│   ├── useClaseSugerida.ts           ← Fuse.js encapsulado (instancia fuera del hook)
│   └── useSolicitud.ts               ← Estado central + autoguardado Firebase
│
├── /data
│   ├── coberturas.json               ← Catálogo de coberturas preaprobadas de Niza
│   └── glosario.json                 ← Términos técnicos + definición + ejemplo
│
└── /lib
    ├── firebase.ts                   ← Singleton Firestore
    └── types.ts                      ← Interfaces TypeScript (Cobertura, SeccionEstado, etc.)
```

---

## 6. El Componente Central — Sistema de Clasificación de Niza

### El problema que justifica la segunda pregunta

El selector actual presenta 505 coberturas paginadas sin filtrado. La marca (denominación) no determina directamente la clase. La clase la determina el **producto o servicio** que la marca protege. El sistema actual le pide al usuario que seleccione la clase inmediatamente después de ingresar el nombre de la marca, sin hacer ninguna pregunta sobre qué vende o qué ofrece.

> Betty Olivares, 8 de abril: *"El sistema tiene que hacer una segunda pregunta para obtener más detalles sobre el producto o servicio. La clasificación correcta no se logra solo con una descripción breve."*

### Niveles de implementación del clasificador

| Nivel | Tecnología | Cobertura estimada | Costo operativo | Estado |
|---|---|---|---|---|
| N1 | Fuse.js + JSON local | ~60% | Cero — corre en browser | ✅ Implementado en MVP |
| **N2** | **Fuse.js + segunda pregunta + rubro** | **~85%** | **Cero — corre en browser** | **🔄 Rediseño actual** |
| N3 | Embeddings semánticos (Gemini API) | ~95%+ | Por consulta ($) | ⏸ Fase 2 |

### Decisión técnica clave: instancia Fuse fuera del hook

```typescript
// ✅ CORRECTO — fuera del hook, se instancia una sola vez al cargar el módulo
const fuse = new Fuse(coberturas, {
  keys: [
    { name: 'descripcion', weight: 0.7 },
    { name: 'palabrasClave', weight: 0.3 },
  ],
  threshold: 0.4,
  includeScore: true,
});

export function useClaseSugerida(query: string, rubro: string) {
  // fuse está disponible sin reconstruirse en cada render
}
```

### Bug conocido: `shouldFilter={false}` en Command de shadcn/ui

El componente `Command` tiene su propio sistema de filtrado que contradice a Fuse.js. Sin `shouldFilter={false}`, Command filtra los resultados de Fuse antes de renderizarlos, resultando en cero resultados visibles aunque Fuse encuentre coincidencias. **Es obligatorio** en cualquier integración de Fuse.js con el componente `Command`.

---

## 7. Lineamientos de UX/UI

El GRI implementa el mismo Design System que MiINAPI app (ver `DESIGN_SYSTEM.md`) con las siguientes especificaciones adicionales para el contexto de formulario web:

### Principios aplicados al formulario

- **Una sección = una pantalla lógica**: el formulario muestra solo la sección activa. Las secciones no se apilan verticalmente.
- **CTA principal siempre visible**: el botón "Siguiente" debe estar visible sin scroll. Si el contenido de la sección es extenso, el CTA se fija al fondo.
- **Botón desactivado semánticamente**: cuando el CTA no está disponible, el color cambia a gris y el cursor indica `not-allowed`. No desaparece.
- **Feedback inmediato**: toda acción del usuario produce una respuesta visual en < 300ms. Si depende de Firestore, el sistema muestra skeleton/loading state.

### Jerarquía de acciones en la sección de Clasificación

1. **Acción primaria:** aceptar sugerencia de clase del sistema.
2. **Acción secundaria:** ajustar manualmente la cobertura dentro de la clase sugerida.
3. **Acción terciaria:** "Ver todas las clases" → accede al selector completo (modo experto).

### Microcopy de etapas críticas

| Etapa | Microcopy requerido |
|---|---|
| Post-pago TGR | "Tu pago está siendo verificado con TGR Chile. Esto puede tardar hasta 24 horas. Tu solicitud está guardada. Te avisaremos cuando se confirme." |
| Guardado de borrador | "Tu solicitud se guardó automáticamente. Puedes continuar más tarde." |
| Error de conexión | "Sin conexión. Tus cambios están guardados localmente y se sincronizarán cuando vuelvas a conectarte." |
| Clase sugerida | "Basado en lo que describes, te recomendamos [Clase X — nombre]. ¿Es correcto?" |

---

## 8. Etapas Críticas del Funnel

| Paso | Etapa | Riesgo de abandono | Intervención del GRI |
|---|---|---|---|
| 0 | Intro / Presentación | 🟠 Medio — sin esta pantalla el usuario no sabe el costo total | Pantalla dedicada con costo total antes de iniciar |
| 1 | Datos de marca | 🟢 Bajo | Renombrar campos, ejemplos en placeholders |
| 2 | **Clasificación Niza** | 🔴 **Muy alto** — causa raíz del 40% de abandonos | **Segunda pregunta + Fuse.js + sugerencia con %** |
| 3 | Solicitante | 🟠 Alto — error sistémico en campo "Solicitante" | Microcopy + campo condicional Representante |
| 4 | Revisión y pago | 🔴 **Muy alto** — sorpresa de costo + posible pérdida de borrador | Desglose de pagos + borrador Firebase antes de TGR |

---

## 9. Alcance del MVP y Post-MVP

### Incluido en MVP (Fase 1)

- [x] Pantalla de introducción con costo total y requisitos previos
- [x] Paso 1 — Datos de la marca con campos renombrados y glosario inline
- [ ] Paso 2 — Segunda pregunta + selector de rubro + Fuse.js N2 (rediseño en curso)
- [x] Paso 3 — Solicitante con campo condicional Representante
- [x] Paso 4 — Revisión con borrador Firebase + microcopy TGR
- [x] Stepper semáforo (4 pasos, secuencia correcta)
- [x] Autoguardado en Firebase Firestore antes del paso de pago
- [x] Modal de confirmación + modal de éxito bloqueante
- [x] Glosario inline con `GlosarioTerm` + `glosario.json`
- [ ] Test de usabilidad con 5 usuarios (Semana 3)
- [ ] Baseline de métricas con Clarity + GA4

### Post-MVP (Fase 2 — deuda planificada)

- Embeddings semánticos (Clasificador N3) — Gemini API integrada en `useClaseSugerida`
- Prefilling de datos desde solicitudes anteriores (para agentes PI y usuarios frecuentes)
- Modo avanzado: acceso directo al selector completo de 505 coberturas sin flujo guiado
- Integración de la IA fonética de INAPI-U.Chile para detección de similitud de marcas
- Simulador de costos con cotización exacta en UTM
- Validación en tiempo real de la denominación contra el registro existente de INAPI

---

## 10. Decisiones de Diseño y Trade-offs

### Trade-off 1 — Guía progresiva vs. Velocidad de Resolución

**Elegido:** Guía progresiva (segunda pregunta, selector de rubro, sugerencia de clase).
**Sacrificado parcialmente:** Velocidad para el agente PI experimentado.
**Mitigación:** opción "Ver todas las clases" siempre disponible como acción terciaria.

**Justificación:** La tasa del 40% de abandonos es el problema crítico. Un agente PI puede adaptarse a un flujo guiado. Un usuario nuevo sin orientación no puede completar un formulario diseñado para expertos.

---

### Trade-off 2 — Prevención de clasificación vs. Libertad total

**Elegido:** El sistema sugiere la clase y las coberturas como acción por defecto.
**Sacrificado parcialmente:** El usuario que quiere elegir directamente sin sugerencia.
**Mitigación:** El selector completo está disponible como alternativa, no se elimina.

---

### Trade-off 3 — Claridad vs. Completitud de información

**Elegido:** Mostrar solo la información accionable por sección.
**Sacrificado parcialmente:** Ver todo el expediente en una sola pantalla.
**Mitigación:** El campo "Prioridad" y opciones avanzadas están en un expansor "Opciones avanzadas", no eliminados.

---

*Documento v1.0 · Portal de Solicitud de Marca (GRI) · Equipo UX INAPI · Proyecto CORFO · Abril 2026*
*Actualizar tras sesión de prueba real con Betty Olivares y tras test de usabilidad con 5 usuarios (Semana 3).*
