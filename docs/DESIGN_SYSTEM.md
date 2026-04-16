# Design System: GRI — Portal de Solicitud de Marca INAPI

> **Contexto:** Este Design System aplica al rediseño del flujo de solicitud de registro de marca de INAPI (Guided Registration Interface). Comparte fundamentos con el Design System de MiINAPI App, adaptados al contexto de formulario web progresivo.

**Stack técnico:** Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Lucide React

---

## Tabla de contenidos

1. [Filosofía y Principios de Diseño](#1-filosofía-y-principios-de-diseño)
2. [Color System](#2-color-system)
3. [Sistema Tipográfico](#3-sistema-tipográfico)
4. [Spacing System](#4-spacing-system)
5. [Borders y Radius](#5-borders-y-radius)
6. [Elevation (Sombras)](#6-elevation-sombras)
7. [Component Library](#7-component-library)
8. [Patrones de Pantalla](#8-patrones-de-pantalla)
9. [Accessibility (A11Y)](#9-accessibility-a11y)
10. [Tokens CSS (globals.css)](#10-tokens-css-globalscss)
11. [Tokens Tailwind (tailwind.config.ts)](#11-tokens-tailwind-tailwindconfigts)

---

## 1. Filosofía y Principios de Diseño

### Misión del Design System

El GRI debe ser la interfaz más clara que un ciudadano chileno haya visto al registrar una marca. No es un producto de lujo — es una herramienta de servicio público que debe funcionar con precisión para un usuario de 60 años en su primera solicitud, y con eficiencia para un agente PI con 50 solicitudes activas.

### Los 5 Principios del GRI

| # | Principio | Aplicación práctica |
|---|---|---|
| 1 | **Prevención visible** | El sistema semáforo comunica el estado de cada campo antes de que el usuario lo complete incorrectamente. |
| 2 | **Confianza institucional** | Colores, tipografía y tono refuerzan que esto es una plataforma oficial del Estado chileno. |
| 3 | **Una pantalla, un objetivo** | El formulario muestra solo la sección activa. No hay scroll entre secciones. |
| 4 | **CTA contextual siempre** | Los botones de acción tienen el texto de la acción específica: "Siguiente — Seleccionar clases", nunca "Continuar". |
| 5 | **Formulario primero, siempre** | Todo se diseña para el contexto de formulario web, con atención especial a estados de carga, error y éxito. |

### Diferencias con el Design System de MiINAPI App

| Aspecto | GRI (Portal de Marca) | MiINAPI App |
|---|---|---|
| Contexto | Formulario web progresivo | App móvil de gestión |
| Layout principal | Desktop-compatible + Mobile | Mobile-first estricto |
| Navegación | Stepper lineal de 7 pasos | Bottom Nav de 5 pestañas |
| Componentes críticos | BuscadorClases, StepperSolicitud, GlosarioTerm | SemaphoreCard, NotificationTable, CollapsibleCard |
| Sistema semáforo | Aplicado al stepper (naranja/verde/gris) | Aplicado a notificaciones y solicitudes (rojo/naranja/azul/verde) |
| Guardado de estado | Firebase Firestore | React state local (mock data en MVP) |

---

## 2. Color System

### 2.1 Paleta Base Institucional

| Token CSS | Nombre | Hex | Tailwind | Uso |
|---|---|---|---|---|
| `--color-primary` | Azul Institucional | `#1A56DB` | `blue-600` | CTA primarios, tabs activos, links, términos del glosario |
| `--color-primary-dark` | Azul Marino | `#1E3A8A` | `blue-900` | Header, navbar, botón "Presentar solicitud" |
| `--color-primary-foreground` | Blanco | `#FFFFFF` | `white` | Texto sobre fondos primarios |
| `--color-accent` | Púrpura Auth | `#7C3AED` | `violet-600` | No usado en el formulario principal (reservado para MiINAPI App) |

### 2.2 Sistema Semáforo en el Stepper

En el GRI, el sistema semáforo se aplica al **stepper de progreso**, no a notificaciones. Los colores tienen una semántica diferente al MiINAPI App:

| Estado del paso | Color | Hex | Hex Fondo | Significado |
|---|---|---|---|---|
| 🟠 Activo | Naranja | `#D97706` | `#FEF3C7` | Sección que el usuario está completando ahora |
| ✅ Completado | Verde | `#059669` | `#D1FAE5` | Sección completada con datos válidos |
| ⚪ Pendiente | Gris | `#9CA3AF` | `#F3F4F6` | Sección que no corresponde completar aún |
| ❌ Error | Rojo | `#DC2626` | `#FEE2E2` | Sección con datos inválidos que requiere corrección |

> **Regla crítica:** la secuencia del stepper es siempre 🟠⚪⚪⚪ → ✅🟠⚪⚪ → ✅✅🟠⚪ → ✅✅✅🟠. Nunca puede haber un paso en naranja sin que todos los anteriores estén en verde.

### 2.3 Tokens Neutros de UI

| Token CSS | Hex | Tailwind | Uso |
|---|---|---|---|
| `--background` | `#F9FAFB` | `gray-50` | Fondo de pantalla principal |
| `--surface` | `#FFFFFF` | `white` | Cards de sección, modales, inputs |
| `--surface-elevated` | `#F3F4F6` | `gray-100` | Fondos de inputs inactivos, tabs del stepper |
| `--foreground` | `#111827` | `gray-900` | Títulos, texto de alto impacto |
| `--foreground-secondary` | `#4B5563` | `gray-600` | Subtítulos, descripciones de sección |
| `--foreground-muted` | `#9CA3AF` | `gray-400` | Placeholders, microcopy, timestamps |
| `--border` | `#E5E7EB` | `gray-200` | Bordes de cards de sección, separadores |
| `--ring` | `#1A56DB` | `blue-600` | Focus ring para accesibilidad |

### 2.4 Estados Interactivos

| Estado | Modificación | Duración |
|---|---|---|
| Default | `--color-primary` | — |
| Hover | Oscurecer 8% → `--color-primary-dark` | 150ms |
| Active | Oscurecer 15% + scale 0.98 | 100ms |
| Focus | Ring exterior visible `ring-2 ring-[--ring]` | Inmediato |
| Disabled | `opacity-40 cursor-not-allowed` | — |
| Loading | Spinner + `opacity-70` | Inmediato |

---

## 3. Sistema Tipográfico

### 3.1 Familias Tipográficas

| Familia | Fuente | Rol | Import |
|---|---|---|---|
| **Primaria** | DM Sans | UI, headings, labels, botones, microcopy | `next/font/google` |
| **Secundaria / Mono** | DM Mono | Números de solicitud, RUT, IDs, costos | `next/font/google` |

```tsx
// app/layout.tsx
import { DM_Sans, DM_Mono } from 'next/font/google'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-sans',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono',
})
```

### 3.2 Escala Tipográfica — Contexto Formulario

| Nivel | Tamaño | Peso | Uso en GRI |
|---|---|---|---|
| H1 | 24px / 32px | 700 | Título de sección activa ("Clases y coberturas") |
| H2 | 20px / 28px | 600 | Subtítulos dentro de sección |
| Body | 16px / 24px | 400 | Instrucciones de campo, microcopy principal |
| Body SM | 14px / 22px | 400 | Descripciones de cobertura, textos de popover |
| Body XS | 12px / 18px | 400 | Hints bajo inputs, timestamps de guardado |
| Button | 15px / 20px | 600 | Texto de CTAs |
| Label | 11px / 16px | 600 | Labels de campo en UPPERCASE |
| Mono | 13px / 20px | 500 | Números de clase (`Clase 42`), costos (`$69.889 CLP`), RUT |

---

## 4. Spacing System

Sistema base de 4px. Todos los valores son múltiplos de 4.

| Token | Valor | Uso típico |
|---|---|---|
| `space-1` | 4px | Micro espacios entre elementos inline |
| `space-2` | 8px | Padding interno de badges, gaps entre iconos y texto |
| `space-3` | 12px | Padding interno de inputs |
| `space-4` | 16px | Gap entre campos de formulario |
| `space-5` | 20px | Padding interno de cards de sección |
| `space-6` | 24px | Gap entre secciones |
| `space-8` | 32px | Margen entre card y botón CTA |
| `space-12` | 48px | Padding vertical de pantalla |

---

## 5. Borders y Radius

| Token | Valor | Uso |
|---|---|---|
| `radius-sm` | 6px | Badges de clase (Clase 42, ICPA) |
| `radius-md` | 10px | Inputs, selects |
| `radius-lg` | 14px | Cards de sección del formulario |
| `radius-xl` | 20px | Cards de cobertura en el buscador |
| `radius-full` | 9999px | Círculos del stepper, pills de filtro de rubro |

---

## 6. Elevation (Sombras)

| Token | Valor | Uso |
|---|---|---|
| `shadow-card` | `0 1px 3px rgba(0,0,0,0.08)` | Cards de sección del formulario |
| `shadow-elevated` | `0 4px 12px rgba(0,0,0,0.10)` | Buscador de coberturas, stepper |
| `shadow-modal` | `0 8px 24px rgba(0,0,0,0.15)` | Modales de confirmación y éxito |

---

## 7. Component Library

### 7.1 StepperSolicitud

**Qué hace:** indicador de progreso de 7 pasos con sistema semáforo. Persiste en la parte superior de cada sección del formulario.

**Props:**
```typescript
interface Props {
  secciones: SeccionEstado[]           // Array de 7 secciones con su estado
}

interface SeccionEstado {
  id: string                           // 'datos' | 'clases' | 'solicitante' | 'revision'
  nombre: string                       // Texto visible bajo el círculo
  estado: 'pendiente' | 'activa' | 'completada' | 'error'
}
```

**Variantes visuales:**

| Estado | Círculo | Color | Texto |
|---|---|---|---|
| `pendiente` | Número (1,2,3,4) | Gris `#9CA3AF` | Gris |
| `activa` | ! | Naranja `#D97706` | Naranja bold |
| `completada` | ✓ | Verde `#059669` | Verde |
| `error` | ✕ | Rojo `#DC2626` | Rojo |

**Regla de secuencia:** la función `avanzarSecciones(secciones, completarId, activarId)` es la única forma de cambiar estados. Garantiza que nunca haya un paso activo sin todos los anteriores completados.

**Anti-patterns:**
- ❌ No modificar el estado del stepper directamente desde la página
- ❌ No tener dos secciones en estado `activa` simultáneamente
- ❌ No omitir el porcentaje de avance numérico

---

### 7.2 BuscadorClases

**Qué hace:** el componente de clasificación de Niza. Integra el campo de texto libre, el selector de rubro y el sistema Fuse.js. Es el componente más complejo del GRI.

**Props:**
```typescript
interface Props {
  clasesAgregadas: Cobertura[]         // Estado actual de clases seleccionadas
  onAgregar: (c: Cobertura) => void    // Callback al confirmar una cobertura
  onEliminar: (id: string) => void     // Callback al eliminar una cobertura
}
```

**Flujo interno:**
1. Usuario escribe en el campo de texto libre → `setQuery`
2. Usuario selecciona un rubro → `setRubro`
3. `useClaseSugerida(query, rubro)` con `useMemo` recalcula
4. Fuse.js combina `query + rubro` y devuelve sugerencias
5. Command renderiza sugerencias (`shouldFilter={false}` **obligatorio**)
6. Al seleccionar una cobertura → Dialog de confirmación
7. Al confirmar → `onAgregar(cobertura)`

**Regla crítica:** `shouldFilter={false}` en el componente `<Command>` es **obligatorio** siempre. Sin esto, Command filtra los resultados de Fuse y el buscador parece funcionar pero no muestra nada.

**Anti-patterns:**
- ❌ No crear una instancia de Fuse dentro del componente
- ❌ No omitir el Dialog de confirmación antes de agregar
- ❌ No mostrar coberturas ya agregadas como seleccionables (usar `yaAgregada` para opacidad)

---

### 7.3 GlosarioTerm

**Qué hace:** componente wrapper que envuelve términos técnicos del formulario con un Popover que muestra su definición cotidiana y un ejemplo.

**Props:**
```typescript
interface Props {
  termino: string                      // Clave de búsqueda en glosario.json
  children: React.ReactNode            // Texto visible en la UI
}
```

**Comportamiento:**
- Busca el término en `glosario.json` de forma case-insensitive
- Si lo encuentra: renderiza `children` como trigger del Popover
- Si no lo encuentra: renderiza `children` como `<span>` sin Popover (degradación silenciosa)
- El Popover muestra: definición + ejemplo

**Uso correcto:**
```tsx
<GlosarioTerm termino="clase de Niza">clases de Niza</GlosarioTerm>
<GlosarioTerm termino="cobertura preaprobada">coberturas preaprobadas</GlosarioTerm>
<GlosarioTerm termino="titular">titular</GlosarioTerm>
```

**Anti-patterns:**
- ❌ No usar para decorar texto — solo en términos técnicos con definición en glosario.json
- ❌ No duplicar términos en glosario.json

---

### 7.4 SelectorRubro

**Qué hace:** grid visual de 8 categorías de industria para la segunda pregunta. Complementa el campo de texto libre del buscador.

**Props:**
```typescript
interface Props {
  rubroSeleccionado: string | null
  onSeleccionar: (rubro: string) => void
}

const RUBROS = [
  { id: 'alimentos',   label: 'Alimentos',   icon: '🍽️' },
  { id: 'tecnologia',  label: 'Tecnología',  icon: '💻' },
  { id: 'moda',        label: 'Moda',        icon: '👗' },
  { id: 'servicios',   label: 'Servicios',   icon: '🔧' },
  { id: 'salud',       label: 'Salud',       icon: '🏥' },
  { id: 'arte',        label: 'Arte',        icon: '🎨' },
  { id: 'educacion',   label: 'Educación',   icon: '📚' },
  { id: 'otro',        label: 'Otro',        icon: '⭐' },
]
```

**Estados visuales:**
- Default: fondo `--surface-elevated`, borde `--border`
- Seleccionado: fondo `--color-primary` con transparencia 10%, borde `--color-primary`, texto en `--color-primary`
- Hover: borde `--border-strong`

**Anti-patterns:**
- ❌ No hacer el selector obligatorio — el usuario puede buscar sin seleccionar rubro
- ❌ No agregar más de 8 rubros en el MVP — la carga cognitiva aumenta

---

### 7.5 CTAButton (adaptado para formulario)

**Variantes en el contexto GRI:**

| Variante | Color | Uso |
|---|---|---|
| `primary` | `#1A56DB` | Avanzar al siguiente paso ("Siguiente — Seleccionar clases") |
| `primary-dark` | `#1E3A8A` | Presentar solicitud (acción definitiva) |
| `outline` | Borde `#E5E7EB` | Guardar borrador |
| `ghost` | Sin fondo | Acciones secundarias ("Ver todas las clases") |
| `disabled` | `opacity-40` | CTA bloqueado por campo incompleto |

**Regla de nomenclatura:** el texto del botón siempre incluye la acción específica del siguiente paso. Nunca "Continuar" o "Siguiente" solos.

```tsx
// ✅ CORRECTO
<CTAButton>Siguiente — Seleccionar clases</CTAButton>
<CTAButton>Siguiente — Datos del solicitante</CTAButton>
<CTAButton>Presentar solicitud</CTAButton>

// ❌ INCORRECTO
<CTAButton>Continuar</CTAButton>
<CTAButton>Siguiente</CTAButton>
```

---

### 7.6 FormInput

**Props:**
```typescript
interface Props {
  label: string                        // Label UPPERCASE sobre el input
  placeholder: string                  // Ejemplo en lenguaje cotidiano
  hint?: string                        // Texto de ayuda bajo el input
  error?: string                       // Mensaje de error inline
  value: string
  onChange: (value: string) => void
}
```

**Estados:**
- Default: borde `#E5E7EB`
- Focus: borde `#1A56DB` + ring `ring-2 ring-blue-600/20`
- Error: borde `#DC2626` + hint en rojo
- Disabled: `opacity-40 cursor-not-allowed`

---

### 7.7 Toast / Feedback contextual

Usado para confirmar acciones de guardado, errores de conexión y estados del proceso.

| Tipo | Color | Uso |
|---|---|---|
| `success` | Verde | "Borrador guardado automáticamente" |
| `error` | Rojo | "Error de conexión — reintentando..." |
| `info` | Azul | "Tu pago está siendo verificado con TGR" |
| `warning` | Naranja | "Esta cobertura ya está en tu solicitud" |

---

## 8. Patrones de Pantalla

### Patrón: Sección de formulario activa

```
┌─────────────────────────────────────────────────┐
│ StepperSolicitud (4 pasos, sticky top)          │
│ ✅ Datos  →  🟠 Clases  →  ⚪ Solicitante  →  ⚪ Revisión 
│ Barra de progreso                               │
├─────────────────────────────────────────────────┤
│ Card de sección (shadow-card, radius-lg)        │
│                                                 │
│ H1: Título de la sección                        │
│ Body: Instrucción en lenguaje cotidiano         │
│                                                 │
│ [Contenido específico de la sección]            │
│                                                 │
│ [CTAButton disabled/enabled según validación]   │
└─────────────────────────────────────────────────┘
```

### Patrón: Modal de confirmación

```
┌─────────────────────────────────────────────────┐
│ Overlay con blur del formulario                 │
│                                                 │
│  ┌───────────────────────────────────────────┐  │
│  │ H2: ¿Confirmas el envío?                  │  │
│  │ Body: Resumen de la acción                │  │
│  │                                           │  │
│  │  [Cancelar / Volver]  [Confirmar →]       │  │
│  └───────────────────────────────────────────┘  │
└─────────────────────────────────────────────────┘
```

**Regla:** el modal de confirmación es cancelable (Escape, clic fuera). El modal de éxito post-envío es bloqueante — el usuario solo sale con el CTA "Volver al inicio".

---

## 9. Accessibility (A11Y)

### Requisitos mínimos WCAG AA para el GRI

| Criterio | Requisito | Verificación |
|---|---|---|
| Contraste de texto | Mínimo 4.5:1 para body, 3:1 para elementos grandes | Chrome DevTools → Accessibility |
| Targets táctiles | Mínimo 44×44px para todos los botones e inputs | Inspección manual |
| Navegación por teclado | Tab order lógico en todos los campos del formulario | Prueba manual con Tab |
| Labels de inputs | Todos los inputs tienen `<label>` asociado | HTML semántico |
| Mensajes de error | Los errores se describen en texto, no solo con color | Aria attributes |
| Focus visible | El anillo de foco es siempre visible (`ring-2 ring-blue-600`) | Inspección visual |
| Roles ARIA | Stepper con `role="progressbar"` y `aria-valuenow` | HTML semántico |
| Formulario | `<form>` con `onSubmit` en lugar de `onClick` en el CTA | — |

**Nota:** el stack usa React + Next.js. No se usan etiquetas `<form>` HTML nativas con `action` — se usa `onSubmit` del event handler o los CTAs con `onClick` según el patrón de shadcn/ui.

---

## 10. Tokens CSS (globals.css)

```css
/* globals.css */

@layer base {
  :root {
    /* Institucional */
    --color-primary: #1A56DB;
    --color-primary-dark: #1E3A8A;
    --color-primary-foreground: #FFFFFF;

    /* Semáforo del stepper */
    --stepper-active: #D97706;
    --stepper-active-bg: #FEF3C7;
    --stepper-done: #059669;
    --stepper-done-bg: #D1FAE5;
    --stepper-pending: #9CA3AF;
    --stepper-pending-bg: #F3F4F6;
    --stepper-error: #DC2626;
    --stepper-error-bg: #FEE2E2;

    /* Semáforo de notificaciones (compatibilidad con MiINAPI App) */
    --semaphore-danger: #DC2626;
    --semaphore-danger-bg: #FEE2E2;
    --semaphore-warning: #D97706;
    --semaphore-warning-bg: #FEF3C7;
    --semaphore-info: #2563EB;
    --semaphore-info-bg: #DBEAFE;
    --semaphore-success: #059669;
    --semaphore-success-bg: #D1FAE5;

    /* Neutros */
    --background: #F9FAFB;
    --surface: #FFFFFF;
    --surface-elevated: #F3F4F6;
    --foreground: #111827;
    --foreground-secondary: #4B5563;
    --foreground-muted: #9CA3AF;
    --border: #E5E7EB;
    --border-strong: #D1D5DB;
    --ring: #1A56DB;

    /* Tipografía */
    --font-sans: 'DM Sans', system-ui, sans-serif;
    --font-mono: 'DM Mono', 'Courier New', monospace;

    /* Radius */
    --radius-sm: 6px;
    --radius-md: 10px;
    --radius-lg: 14px;
    --radius-xl: 20px;
    --radius-full: 9999px;

    /* Sombras */
    --shadow-card: 0 1px 3px rgba(0,0,0,0.08);
    --shadow-elevated: 0 4px 12px rgba(0,0,0,0.10);
    --shadow-modal: 0 8px 24px rgba(0,0,0,0.15);
  }
}

/* Shimmer para skeletons de carga */
@keyframes shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}

.skeleton {
  background: linear-gradient(90deg, #F3F4F6 25%, #E5E7EB 50%, #F3F4F6 75%);
  background-size: 200% 100%;
  animation: shimmer 1.5s ease-in-out infinite;
  border-radius: var(--radius-lg);
}
```

---

## 11. Tokens Tailwind (tailwind.config.ts)

```typescript
// tailwind.config.ts
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1A56DB',
          dark:    '#1E3A8A',
          light:   '#DBEAFE',
        },
        // Semáforo del stepper (GRI)
        stepper: {
          active:   '#D97706',
          'active-bg': '#FEF3C7',
          done:     '#059669',
          'done-bg':   '#D1FAE5',
          pending:  '#9CA3AF',
          'pending-bg': '#F3F4F6',
          error:    '#DC2626',
          'error-bg':  '#FEE2E2',
        },
        // Semáforo de notificaciones (compatibilidad MiINAPI App)
        danger:  { DEFAULT: '#DC2626', bg: '#FEE2E2' },
        warning: { DEFAULT: '#D97706', bg: '#FEF3C7' },
        info:    { DEFAULT: '#2563EB', bg: '#DBEAFE' },
        success: { DEFAULT: '#059669', bg: '#D1FAE5' },
        // Neutros
        surface: '#FFFFFF',
        'surface-elevated': '#F3F4F6',
        border:  '#E5E7EB',
      },
      fontFamily: {
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
        mono: ['DM Mono', 'Courier New', 'monospace'],
      },
      fontSize: {
        'h1':      ['24px', { lineHeight: '32px', fontWeight: '700' }],
        'h2':      ['20px', { lineHeight: '28px', fontWeight: '600' }],
        'body':    ['16px', { lineHeight: '24px', fontWeight: '400' }],
        'body-sm': ['14px', { lineHeight: '22px', fontWeight: '400' }],
        'body-xs': ['12px', { lineHeight: '18px', fontWeight: '400' }],
        'btn':     ['15px', { lineHeight: '20px', fontWeight: '600' }],
        'label':   ['11px', { lineHeight: '16px', fontWeight: '600', letterSpacing: '0.05em' }],
        'mono':    ['13px', { lineHeight: '20px', fontWeight: '500' }],
      },
      spacing: {
        '1': '4px', '2': '8px', '3': '12px', '4': '16px',
        '5': '20px', '6': '24px', '8': '32px', '10': '40px',
        '12': '48px', '16': '64px',
      },
      borderRadius: {
        'sm':   '6px',
        'md':   '10px',
        'lg':   '14px',
        'xl':   '20px',
        '2xl':  '24px',
        'full': '9999px',
      },
      boxShadow: {
        'card':     '0 1px 3px rgba(0,0,0,0.08)',
        'elevated': '0 4px 12px rgba(0,0,0,0.10)',
        'modal':    '0 8px 24px rgba(0,0,0,0.15)',
      },
    },
  },
  plugins: [],
}

export default config
```

---

*Design System v1.0 · GRI — Portal de Solicitud de Marca · Equipo UX INAPI · Proyecto CORFO · Abril 2026*
*Revisar y actualizar tras sesiones de testing con usuarios (Semana 3 del roadmap).*
