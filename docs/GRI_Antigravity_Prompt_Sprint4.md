# PROMPT PARA ANTIGRAVITY — GRI v2
## Portal de Solicitud de Registro de Marca · INAPI
**Fecha:** 24 de abril, 2026
**Desde:** Sprint 3 completado (DEVLOG 2026-04-20)
**Rol requerido:** Senior Product Designer + Senior Fullstack Developer

---

## CONTEXTO DEL PROYECTO

Estás trabajando en el **GRI (Guided Registration Interface)**, el rediseño del flujo de solicitud de registro de marca del portal de INAPI. Es un MVP funcional construido en Next.js 16 con Turbopack.

### Estado actual tras Sprint 3 (lo que ya existe):
- `app/page.tsx` — Landing page de introducción (existe, necesita rediseño completo)
- `app/solicitud/page.tsx` — Formulario de solicitud ('use client')
- `components/StepperSolicitud.tsx` — Stepper semáforo (4 estados: naranja/verde/gris/rojo) — **necesita actualización a nueva estructura**
- `components/BuscadorClases.tsx` — Fuse.js N2 con segunda pregunta integrada ✅
- `components/SelectorRubro.tsx` — Grid 2×4 de 8 rubros ✅
- `components/GlosarioTerm.tsx` — Popover inline para términos técnicos ✅
- `hooks/useSolicitud.ts` — Estado central + autoguardado Firebase ✅
- `hooks/useClaseSugerida.ts` — Fuse.js N2 con query + rubro ✅
- `lib/firebase.ts` — Singleton Firestore ✅
- `lib/types.ts` — Interfaces TypeScript (Cobertura, SeccionEstado, SolicitudBorrador) ✅
- `data/coberturas.json` — Catálogo enriquecido con rubros[] ✅
- `data/glosario.json` — 8 términos con definición + ejemplo ✅
- Microsoft Clarity + GA4 inyectados (Clarity con problemas — ver más abajo)
- Chat FAB flotante implementado (necesita mejora)
- Static export configurado para GitHub Pages (`output: 'export'`)

### Stack (NO cambiar):
```
Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Bun
Fuentes: DM Sans (primaria) + DM Mono (numéricos/código)
```

### Design System (tokens existentes — respetar siempre):
```css
--color-primary: #1A56DB;        /* Azul Institucional — CTA, links, tabs activos */
--color-primary-dark: #1E3A8A;   /* Header, navbar, botón presentar */
--color-primary-foreground: #FFFFFF;

/* Semáforo del Stepper */
--stepper-active: #D97706;       /* Naranja — paso activo */
--stepper-active-bg: #FEF3C7;
--stepper-done: #059669;         /* Verde — paso completado */
--stepper-done-bg: #D1FAE5;
--stepper-pending: #9CA3AF;      /* Gris — paso pendiente */
--stepper-pending-bg: #F3F4F6;
--stepper-error: #DC2626;        /* Rojo — error */
--stepper-error-bg: #FEE2E2;

/* Neutros */
--background: #F9FAFB;           /* Fondo pantalla */
--surface: #FFFFFF;              /* Cards, modales, inputs */
--surface-elevated: #F3F4F6;     /* Inputs inactivos, SelectorRubro */
--foreground: #111827;           /* Títulos, texto principal */
--foreground-secondary: #4B5563; /* Instrucciones, microcopys */
--foreground-muted: #9CA3AF;     /* Placeholders, hints, timestamps */
--border: #E5E7EB;
--border-strong: #D1D5DB;        /* Bordes de inputs en default (WCAG 1.4.11) */
--ring: #1A56DB;                 /* Focus ring */
```

---

## TAREA 1 — REDISEÑO COMPLETO DE `app/page.tsx` (Homepage)

### Referente principal: Australia IP (IP.gov.au)
El portal de marcas de Australia estructura su homepage con:
- **Hero** con H1 claro + subtítulo contextual + CTA primario
- **Above the fold**: qué es una marca / cómo se protege / cuál es el proceso
- **Sección de pasos verticales** que guía al usuario desde "¿es viable registrar mi marca?" hasta monitorizar el estado
- **CTA secundario** al final de los pasos, antes del footer

### Estructura requerida para `app/page.tsx` (Server Component):

#### A) HERO SECTION
```
Fondo: gradiente institucional del azul primario (#1A56DB → #1E3A8A)
H1: "Registra tu marca con seguridad y sin complicaciones"
Subtítulo: "El portal oficial de INAPI te guía paso a paso para proteger el nombre, logo o símbolo que identifica tu negocio en Chile."
CTA primario: "Comenzar mi registro" → redirige a /auth (no a /solicitud directamente)
Imagen/ilustración de fondo: abstracta institucional (puedes usar un patrón SVG geométrico con opacidad 10% sobre el gradiente)
```

#### B) ABOVE THE FOLD — 3 columnas o cards
Título de sección: "¿Qué necesitas saber antes de empezar?"

**Card 1 — ¿Qué es una marca?**
Ícono: Lucide `BadgeCheck`
Texto: "Una marca es el signo que distingue tus productos o servicios de los de otros. Puede ser una palabra, un logo, una combinación de ambos o incluso un sonido."

**Card 2 — ¿Cómo se protege?**
Ícono: Lucide `ShieldCheck`
Texto: "Al registrar tu marca en INAPI, obtienes derechos exclusivos de uso en Chile por 10 años renovables. Sin registro, no tienes protección legal frente a terceros que usen un signo similar."

**Card 3 — ¿Cuánto tiempo toma?**
Ícono: Lucide `Clock`
Texto: "El proceso completo toma entre 6 y 8 meses desde que presentas tu solicitud. Durante ese tiempo, INAPI examina tu marca, la publica y —si no hay oposiciones— la registra."

#### C) SECCIÓN "CÓMO FUNCIONA EL PROCESO" — Stepper vertical (inspirado en Australia)
Título: "El proceso de registro, paso a paso"
Subtítulo: "Antes de empezar, conoce exactamente qué vas a hacer y cuánto te va a costar."

**5 pasos verticales con ícono + número + título + descripción corta:**

```
Paso 1 — ¿Puedo registrar mi marca?
Ícono: Lucide `Lightbulb`
Descripción: "No todas las denominaciones son registrables. Antes de invertir tiempo y dinero, verifica que tu marca sea distintiva, no descriptiva y no esté prohibida por la ley."

Paso 2 — Busca si tu marca ya existe
Ícono: Lucide `Search`
Descripción: "Nuestro sistema compara tu marca con todas las ya registradas en INAPI. Si hay similitudes importantes, te avisamos antes de que pagues — para que puedas ajustar tu propuesta."

Paso 3 — Elige qué protege tu marca (Clases de Niza)
Ícono: Lucide `Tags`
Descripción: "Tu marca protege productos o servicios específicos, organizados en categorías llamadas 'Clases de Niza'. Nosotros te ayudamos a encontrar la correcta según lo que vendes o haces."

Paso 4 — Presenta tu solicitud y paga
Ícono: Lucide `Send`
Descripción: "Una vez completado el formulario, presentas tu solicitud pagando la tasa de registro. El costo base es de ~$70.000 CLP por clase (varía según UTM vigente)."

Paso 5 — Seguimiento y registro final
Ícono: Lucide `CheckCircle`
Descripción: "INAPI publica tu solicitud en el Diario Oficial. Si no hay oposiciones en 30 días hábiles, se emite el certificado de registro. El proceso total toma entre 6 y 8 meses."
```

**Nota de costos (debajo de los pasos):**
```
Box destacado con ícono Lucide `Info` y fondo --surface-elevated:
"¿Cuánto voy a pagar en total?
• Tasa de solicitud: ~$70.000 CLP por clase de Niza
• Publicación en Diario Oficial: costo adicional cobrado por INAPI
• Arancel de registro: costo final al emitirse el certificado
Los montos exactos se calculan en UTM y pueden variar. Te mostraremos el total actualizado antes de que confirmes el pago."
```

#### D) CTA PRIMARIO FINAL
```
Fondo: --color-primary
H2: "¿Listo para proteger tu marca?"
Subtítulo: "Completa el formulario guiado en menos de 15 minutos."
CTA: "Comenzar mi registro" → /auth
CTA secundario (ghost, texto blanco): "Tengo dudas — hablar con un ejecutivo"
```

#### E) Navbar (mantener igual al existente)
#### F) Footer (mantener igual al existente)

---

## TAREA 2 — PANTALLA DE AUTENTICACIÓN `/auth`

### Objetivo:
Cuando el usuario hace clic en "Comenzar mi registro" desde el homepage, se redirige a `/auth` en lugar de ir directamente al formulario. Aquí aparece un **modal de autenticación centrado en pantalla** sobre un fondo con blur del homepage.

### Implementación:
- Crear `app/auth/page.tsx` como Client Component
- El fondo muestra el hero del homepage con `backdrop-blur-sm` y `bg-white/60`
- En el centro: un card `surface` con `shadow-modal`, `radius-lg`

### Contenido del modal de auth:
```
Logo INAPI (pequeño, centrado)
H2: "Ingresa a tu cuenta para continuar"
Body SM: "Tu progreso se guarda automáticamente. Puedes continuar donde lo dejaste."

─── Separador ───

[Botón primario — ancho completo]
Ícono: escudo o llave
Texto: "Ingresar con Clave Única"
Subtexto bajo el botón (muted): "El sistema de identidad digital del Estado de Chile"

─── o ───

[Botón outline — ancho completo]
Ícono: Lucide `Building2`
Texto: "Ingresar con cuenta institucional INAPI"

─── Separador ───

[Link ghost, centrado]
"¿No tienes cuenta? Crear una cuenta institucional →"
```

### Comportamiento post-auth:
- Al autenticarse (simular con `localStorage.setItem('authenticated', 'true')` para el MVP)
- Redirigir a `/solicitud`

---

## TAREA 3 — REDISEÑO DEL STEPPER: NUEVA ESTRUCTURA DE 4 PASOS

### La nueva estructura del formulario (definida en el benchmark post-Álvaro):

```
PASO 1 — Datos del Solicitante
  ├── Datos del Solicitante (acordeón desplegado por defecto — OBLIGATORIO)
  ├── Datos del Representante (acordeón colapsado — OPCIONAL)
  ├── Reivindicaciones / Prioridades (acordeón colapsado — OPCIONAL)
  └── Consentimientos iniciales (acordeón — según tipo: requerido u opcional)

PASO 2 — Pesquisa de Marca  ← NUEVO (no existía en el MVP anterior)
  ├── Input: nombre de la marca + descripción breve
  ├── Barra térmica de similitud (0–100%)
  ├── Tabla de marcas similares encontradas (nombre, clase, estado, % similitud)
  └── CTA: "Continuar de todas formas" o "Ajustar mi marca"

PASO 3 — Tu Marca
  ├── Nombre de tu marca (reemplaza "Denominación")
  ├── Traducción (si aplica, opcional)
  ├── Transliteración (solo si aplica, opcional)
  ├── ¿Qué productos o servicios ofreces? (Pregunta 1 — texto libre → Fuse.js)
  ├── Describe tu marca en palabras clave (Pregunta 2 — texto libre)
  └── Selector de Clases de Niza + Coberturas (BuscadorClases existente)

PASO 4 — Tasas, Revisión y Pago
  ├── Resumen visual de todos los datos ingresados (colapsable por sección)
  ├── Desglose de tasas por clase (DM Mono para valores CLP)
  ├── Total actualizado en CLP
  ├── Aviso de pagos futuros (Diario Oficial + Registro)
  └── Botón de pago → TGR (con borrador ya guardado en Firebase)
```

### Actualizar `StepperSolicitud.tsx`:

```typescript
// Nueva constante SECCIONES_INICIALES en useSolicitud.ts:
const SECCIONES_INICIALES: SeccionEstado[] = [
  { id: 'solicitante',  nombre: 'Tus Datos',      estado: 'activa'    },
  { id: 'pesquisa',     nombre: 'Tu Marca Existe?', estado: 'pendiente' },
  { id: 'marca',        nombre: 'Tu Marca',         estado: 'pendiente' },
  { id: 'revision',     nombre: 'Revisión y Pago',  estado: 'pendiente' },
]
```

**Visuales del Stepper (mantener sistema semáforo existente):**
- Círculos conectados por barra de progreso lineal
- Estado activo: círculo naranja `#D97706` con `!` o número
- Estado completado: círculo verde `#059669` con `✓` (Lucide `Check`)
- Estado pendiente: círculo gris `#9CA3AF` con número
- Estado error: círculo rojo `#DC2626` con `✕` (Lucide `X`)
- Etiqueta de texto bajo cada círculo (DM Sans, 11px, uppercase, semibold)
- Porcentaje de avance numérico visible (ej. "50% completado")
- En móvil: stepper colapsado mostrando solo paso activo + "Paso 2 de 4"

**ARIA del Stepper:**
```tsx
<nav aria-label="Progreso del formulario" role="progressbar"
  aria-valuenow={porcentaje} aria-valuemin={0} aria-valuemax={100}>
```

---

## TAREA 4 — NUEVO PASO 2: PESQUISA DE MARCA (componente nuevo)

### Crear `components/PesquisaMarca.tsx`

Este es el componente más estratégico del GRI. Permite al usuario verificar si su marca tiene similitudes con marcas ya registradas **antes de pagar**, reduciendo rechazos en el Examen de Fondo.

### Lógica del MVP (sin API real aún):

```typescript
// En el MVP, simular con un subset del catálogo de coberturas o datos mock.
// La integración real con la BD de marcas INAPI se hará en Fase 2 (coordinación con Álvaro).
// El componente debe estar preparado para recibir datos de una API futura:
// GET /api/pesquisa?nombre={nombre}&descripcion={descripcion}

// Por ahora, usar Fuse.js sobre un archivo data/marcas-mock.json con ~50 marcas ficticias
// con campos: { nombre, clase, estado: 'vigente'|'caducada'|'en_tramite', descripcion }
```

### UI del componente:

```
HEADER DE SECCIÓN:
H2: "¿Existe una marca similar a la tuya?"
Body: "Antes de continuar, buscamos en el registro de INAPI si ya existe una marca similar.
       Esto te ayuda a saber las probabilidades de éxito de tu solicitud."

─── FORMULARIO DE BÚSQUEDA ───
Label: "¿Cómo se llama tu marca?"
Input: texto libre — placeholder: "Ej: Patagonia, CopperBox, Lúmina..."

Label: "¿Qué hace o qué vende tu marca? (opcional)"
Textarea: placeholder: "Ej: Software para gestión de licencias empresariales..."

[Botón primario]: "Buscar marcas similares"

─── RESULTADOS (aparecen tras la búsqueda) ───

BARRA TÉRMICA DE SIMILITUD:
┌─────────────────────────────────────────────────────────┐
│ Nivel de similitud encontrado                           │
│ ████████████████░░░░░░░░░░░░░░  65%                    │
│ [Verde 0-25%] [Amarillo 26-60%] [Naranja 61-85%] [Rojo 86-100%] │
└─────────────────────────────────────────────────────────┘

NIVELES DE LA BARRA TÉRMICA:
- 0–25%:  Verde  #059669 — "Alta probabilidad de registro exitoso"
- 26–60%: Amarillo #D97706 — "Existen marcas similares. Analiza las diferencias."
- 61–85%: Naranja #EA580C — "Riesgo moderado. Considera ajustar tu marca."
- 86–100%: Rojo #DC2626 — "Alta probabilidad de rechazo. Revisa las similitudes."

TABLA DE MARCAS SIMILARES:
Columnas: Marca | Clase Niza | Estado | Similitud
─ usar DM Mono para el % de similitud
─ Badge de estado: vigente (verde), caducada (gris), en trámite (amarillo)

ADVERTENCIA CONTEXTUAL (solo si similitud > 60%):
Box con fondo --stepper-error-bg y borde izquierdo rojo:
"⚠️ Encontramos marcas con alta similitud a la tuya. Esto puede afectar la aprobación 
de tu solicitud. Te recomendamos revisar las diferencias antes de continuar."

─── ACCIONES ───
[CTA primario]: "Continuar con mi solicitud" → avanza al Paso 3
[CTA ghost]:    "Quiero ajustar mi marca" → regresa al campo de nombre
```

### Accesibilidad de la barra térmica:
```tsx
// El nivel de similitud debe comunicarse en texto, no solo en color:
<div role="status" aria-live="polite" aria-label={`Similitud: ${porcentaje}%. ${mensajeNivel}`}>
  <div className="barra-termica" style={{width: `${porcentaje}%`}} />
  <span className="sr-only">{mensajeNivel}</span>
</div>
```

### Crear `data/marcas-mock.json`:
```json
[
  { "id": "m001", "nombre": "OPTIMA", "clase": 42, "estado": "vigente",
    "descripcion": "Software de gestión empresarial", "similitud_base": 0.9 },
  { "id": "m002", "nombre": "OPTIMUS", "clase": 9, "estado": "en_tramite",
    "descripcion": "Aplicaciones móviles", "similitud_base": 0.75 },
  { "id": "m003", "nombre": "LUMINA", "clase": 35, "estado": "vigente",
    "descripcion": "Servicios de consultoría", "similitud_base": 0.6 },
  // ... agregar ~50 marcas mock representativas de diferentes rubros y clases
]
```

---

## TAREA 5 — MEJORAS AL CHAT FAB FLOTANTE

### Problema actual:
El FAB tiene ícono genérico y al desplegarse solo muestra la opción de hablar con un ejecutivo.

### Nueva implementación del FAB:

**Ícono:** reemplazar por Lucide `MessageCircleQuestion` o `BotMessageSquare`
**Posición:** esquina inferior derecha, `fixed bottom-6 right-6 z-50`
**Animación de entrada:** slide-up sutil con `animation-delay: 1s`

**Al hacer clic, desplegar panel flotante (no modal completo):**
```
┌─────────────────────────────────────┐
│  🤖 Asistente GRI             [✕]  │
│─────────────────────────────────────│
│  ¿Cómo puedo ayudarte hoy?         │
│                                     │
│  [🤖 Chatear con IA]               │
│  Respuestas automáticas sobre el    │
│  proceso de registro de marcas      │
│                                     │
│  [👤 Hablar con un ejecutivo]       │
│  Atención personalizada de INAPI    │
│  Lun–Vie, 9:00–18:00               │
└─────────────────────────────────────┘
```

**Funcionalidad del chat con IA:**
Al elegir "Chatear con IA", mostrar una interfaz de chat minimalista dentro del mismo panel:
```typescript
// Integrar con la API de Anthropic directamente (ya existe la infra de Antigravity)
// System prompt para el chatbot:
const SYSTEM_PROMPT = `Eres el asistente virtual del portal de solicitud de marcas de INAPI Chile.
Tu rol es ayudar a ciudadanos y emprendedores a entender el proceso de registro de marcas.
Responde siempre en español, con lenguaje claro y cotidiano (nunca técnico-legal).
Si el usuario pregunta sobre su solicitud específica, indícale que para eso puede hablar con un ejecutivo.
Temas que puedes responder: qué es una marca, clases de Niza, costos, plazos, diferencia entre
marca denominativa y figurativa, qué hace el examen de fondo, cómo se publica en el Diario Oficial.`

// UI del chat: input de texto + lista de mensajes con scroll
// Burbujas: usuario (derecha, azul primario) / IA (izquierda, surface-elevated)
// Indicador de escritura: 3 puntos animados mientras espera respuesta
```

---

## TAREA 6 — CORRECCIÓN DE MICROSOFT CLARITY

### Problema detectado:
Tras 3+ días de tener el script inyectado, solo se registró 1 usuario (el desarrollador en prueba). El script no está siendo ejecutado correctamente en el entorno de exportación estática de GitHub Pages.

### Causa probable y solución:

```typescript
// El problema más común en Next.js con static export + Clarity:
// Clarity necesita cargarse en el cliente DESPUÉS de la hidratación.
// Si se inyecta en _document.tsx o en el layout como script normal, puede no dispararse.

// SOLUCIÓN: Crear un componente dedicado que use useEffect:

// components/ClarityScript.tsx
'use client'
import { useEffect } from 'react'

export function ClarityScript() {
  useEffect(() => {
    // Solo ejecutar en producción
    if (process.env.NODE_ENV !== 'production') return
    
    // Verificar que no esté ya inicializado
    if (typeof window !== 'undefined' && !window.clarity) {
      const script = document.createElement('script')
      script.type = 'text/javascript'
      script.async = true
      script.innerHTML = `
        (function(c,l,a,r,i,t,y){
          c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
          t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
          y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
        })(window, document, "clarity", "script", "TU_CLARITY_ID_AQUÍ");
      `
      document.head.appendChild(script)
    }
  }, [])
  
  return null
}

// Agregar en app/layout.tsx (dentro del <body>, como primer hijo):
// <ClarityScript />
```

**Verificación:**
- Después de implementar, navegar en incógnito al sitio desplegado
- Abrir DevTools → Network → filtrar por "clarity.ms"
- Debe aparecer una request a `https://www.clarity.ms/tag/TU_ID`
- En el dashboard de Clarity, esperar ~15 minutos para ver la primera sesión registrada

**IMPORTANTE:** Asegurarse de que el ID de Clarity en el componente sea el mismo que se configuró en el dashboard. Verificar que el dominio del sitio esté whitelisted en la configuración de Clarity.

---

## TAREA 7 — ACTUALIZAR `useSolicitud.ts` PARA LA NUEVA ESTRUCTURA

```typescript
// Agregar a lib/types.ts:
export interface PesquisaResultado {
  nombre: string
  clase: number
  estado: 'vigente' | 'caducada' | 'en_tramite'
  descripcion: string
  similitud: number  // 0–100
}

// Agregar a SolicitudBorrador en lib/types.ts:
export interface SolicitudBorrador {
  // ... campos existentes ...
  nombreMarca?: string          // Campo del Paso 3 (antes "denominacion")
  descripcionMarca?: string     // Descripción breve para pesquisa
  pesquisaRealizada?: boolean   // Flag: ¿el usuario completó la pesquisa?
  pesquisaSimilitud?: number    // Porcentaje de similitud encontrado
  // ... resto sin cambios ...
}

// Actualizar SECCIONES_INICIALES en useSolicitud.ts:
const SECCIONES_INICIALES: SeccionEstado[] = [
  { id: 'solicitante', nombre: 'Tus Datos',         estado: 'activa'    },
  { id: 'pesquisa',    nombre: '¿Ya existe?',        estado: 'pendiente' },
  { id: 'marca',       nombre: 'Tu Marca',            estado: 'pendiente' },
  { id: 'revision',    nombre: 'Revisión y Pago',     estado: 'pendiente' },
]
```

---

## INSTRUCCIONES GENERALES DE IMPLEMENTACIÓN

### Lenguaje claro — reglas absolutas:
- ❌ "Denominación o signo" → ✅ "Nombre de tu marca"
- ❌ "Solicitante" → ✅ "¿Quién será el dueño de esta marca?"
- ❌ "Titular" → ✅ "La persona o empresa que será dueña de la marca"
- ❌ "Prioridad" → ✅ ocultar por defecto con toggle "¿Ya registraste esta marca en otro país?"
- ❌ "Representante" → ✅ aparece solo con toggle "Actúo como representante o agente"
- ❌ "Clase de Niza" → ✅ usar GlosarioTerm con Popover que explica el concepto
- ❌ "Error en el campo" → ✅ "¿Olvidaste el nombre de tu marca? Escríbelo tal como aparecerá en tu registro."
- ❌ "Continuar" → ✅ "Siguiente — [nombre del paso siguiente]"

### Accesibilidad WCAG 2.1 AA — reglas absolutas:
- Todos los inputs tienen `<label>` con `htmlFor` asociado (nunca solo placeholder)
- Errores en texto + ícono + color (nunca solo color)
- Inputs en estado default: usar `--border-strong` (#D1D5DB) no `--border` (#E5E7EB)
- Focus ring visible siempre: `ring-2 ring-[--ring] ring-offset-2`
- Botones interactivos con `<button>` (nunca `<div>` ni `<span>`)
- `aria-required="true"` en campos obligatorios
- `aria-live="polite"` en zonas que cambian dinámicamente (resultados pesquisa, errores)
- Targets táctiles mínimo 44×44px en móvil
- DM Mono para todos los valores numéricos: precios, porcentajes, RUT

### CTA — reglas absolutas:
- Primario: background `--color-primary`, texto blanco, siempre visible (nunca desaparece)
- Deshabilitado: `opacity-40 cursor-not-allowed aria-disabled="true"` (no invisible)
- El CTA está deshabilitado hasta que el campo mínimo de la sección esté completo

### Autoguardado Firebase — mantener comportamiento existente:
- `useRef primeraVez` para evitar escrituras en el montaje
- `addDoc` primera vez → `updateDoc` sucesivas
- `serverTimestamp()` siempre (no `new Date()`)
- Toast: "Borrador guardado automáticamente" — body-xs, muted, desaparece en 3s

### shouldFilter en BuscadorClases — NUNCA ELIMINAR:
```tsx
// CRÍTICO: No eliminar nunca esta prop
<Command shouldFilter={false}>
```
Sin esto, Command filtra los resultados de Fuse antes de renderizarlos → cero resultados.

---

## CRITERIOS DE DONE POR TAREA

| Tarea | Criterio verificable |
|---|---|
| Homepage rediseñada | Hero con gradiente institucional + 3 cards above fold + 5 pasos verticales + CTA final visible |
| Pantalla /auth | Modal centrado con 2 opciones de auth + redirige a /solicitud post-login |
| Stepper 4 pasos | Secuencia 🟠⚪⚪⚪ → ✅🟠⚪⚪ → ✅✅🟠⚪ → ✅✅✅🟠 sin errores |
| PesquisaMarca.tsx | Input nombre + búsqueda en marcas-mock + barra térmica por % + tabla de resultados |
| FAB mejorado | Ícono BotMessageSquare + 2 opciones en panel + chat con IA funcional |
| Clarity corregido | Solicitud visible en DevTools Network → clarity.ms tras navegar en producción |
| useSolicitud.ts | 4 secciones correctas + nuevos campos pesquisa en SolicitudBorrador |

---

## NOTAS FINALES

1. **No romper lo que funciona:** BuscadorClases, GlosarioTerm, SelectorRubro, la lógica Firebase y el hook useClaseSugerida N2 están funcionando — no modificar su núcleo.

2. **Flujo completo post-implementación:**
   `/` (homepage) → clic CTA → `/auth` (modal login) → auth simulada → `/solicitud` (stepper 4 pasos) → Paso 1 Solicitante → Paso 2 Pesquisa → Paso 3 Tu Marca → Paso 4 Revisión/Pago → TGR

3. **Prioridad de implementación si hay tiempo limitado:**
   1. Stepper actualizado a 4 secciones (bloquea todo lo demás)
   2. Componente PesquisaMarca (componente más estratégico)
   3. Homepage rediseñada
   4. Pantalla /auth
   5. FAB mejorado con chat IA
   6. Corrección Clarity

4. **El MVP no tiene autenticación real:** simular con `localStorage` para el MVP. La integración real con Clave Única OIDC es Fase 2.

5. **La API de pesquisa real** (BD de marcas INAPI) está pendiente de coordinación con Álvaro. Por ahora usar `data/marcas-mock.json` con Fuse.js. El componente `PesquisaMarca` debe estar preparado para recibir datos de un `fetch('/api/pesquisa')` en el futuro.

---

*Prompt v1.0 · GRI Sprint 4 · INAPI · Proyecto CORFO · 24 abril 2026*
*Fernando Arriagada · UX/UI & Product Designer · Senior FE Developer*
