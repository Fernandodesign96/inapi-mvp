# Design System: GRI — Portal de Solicitud de Marca INAPI

> **Contexto:** Este Design System aplica al rediseño del flujo de solicitud de registro de marca de INAPI (Guided Registration Interface). Comparte fundamentos con el Design System de MiINAPI App, adaptados al contexto de formulario web progresivo.

| Metadatos | Detalle |
| --- | --- |
| **Versión** | 2.0.0 |
| **Fuente visual institucional** | **UI Kit v3.0.1** — Secretaría de Gobierno Digital (Transformación Digital). Referencias visuales en [`docs/uikit_gob/references/`](uikit_gob/references/). Documento de referencia cruzada: [`docs/uikit_gob/references/DESIGN_SYSTEM.md`](uikit_gob/references/DESIGN_SYSTEM.md). |
| **Stack técnico** | Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Lucide React |

---

## Tabla de contenidos

1. [Filosofía y Principios de Diseño](#1-filosofía-y-principios-de-diseño)
2. [Color System — UI Kit v3.0.1](#2-color-system--ui-kit-v301)
3. [Texto accesible (AA)](#3-texto-accesible-aa)
4. [Tema claro / oscuro](#4-tema-claro--oscuro)
5. [Sistema Tipográfico](#5-sistema-tipográfico)
6. [Spacing System](#6-spacing-system)
7. [Grilla y responsividad](#7-grilla-y-responsividad)
8. [Borders y Radius](#8-borders-y-radius)
9. [Elevation (Sombras)](#9-elevation-sombras)
10. [Mapeo GRI — tokens de producto](#10-mapeo-gri--tokens-de-producto)
11. [Component Library](#11-component-library)
12. [Patrones de Pantalla](#12-patrones-de-pantalla)
13. [Accessibility (A11Y)](#13-accessibility-a11y)
14. [Tokens CSS (globals.css)](#14-tokens-css-globalscss)
15. [Tokens Tailwind (tailwind.config.ts)](#15-tokens-tailwind-tailwindconfigts)
16. [Referencias visuales del kit](#16-referencias-visuales-del-kit)

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

### Coherencia con UI Kit v3.0.1

A partir de v2.0.0, los fundamentos visuales del GRI adoptan los tokens oficiales del **UI Kit Gobierno Digital v3.0.1**: paleta `GOB.COLOR.*`, tipografías **Roboto Slab** / **Roboto Sans**, escala de espaciado, grilla responsiva, radios, grosores de borde y niveles de elevación. Los componentes y patrones propios del flujo de solicitud de marca (stepper, buscador de clases, glosario) se mantienen; solo cambian los tokens base que los sustentan.

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

## 2. Color System — UI Kit v3.0.1

Los valores hex de esta sección provienen de las láminas oficiales del kit (capturas en `docs/uikit_gob/references/`).

### 2.1 Primario (`GOB.COLOR.PRIMARIO`)

| Variante | Hex |
| --- | --- |
| Lighten 1 | `#BFEEFF` |
| Lighten 2 | `#A1D2FF` |
| Lighten 3 | `#83B6FF` |
| Lighten 4 | `#649CFD` |
| **Base** | **`#4282E0`** |
| Darken 1 | `#0F69C4` |
| Darken 2 | `#0051A8` |
| Darken 3 | `#003B8D` |
| Darken 4 | `#002673` |
| Darken 5 | `#00135A` |

### 2.2 Accent (`GOB.COLOR.ACCENT`)

| Variante | Hex |
| --- | --- |
| Lighten 1 | `#FFECEF` |
| Lighten 2 | `#FFCFD3` |
| Lighten 3 | `#FA9E9B` |
| Lighten 4 | `#F37874` |
| **Base** | **`#FF4731`** |
| Darken 1 | `#F63E32` |
| Darken 2 | `#E4332C` |
| Darken 3 | `#D72C25` |
| Darken 4 | `#C82018` |

> **Nota de calidad del arte:** en una lámina del kit, un swatch de la escala *accent* aparece etiquetado con `#4282E0` (color del primario base). Ese valor es inconsistente con el tono rojizo del muestreo; **no usar `#4282E0` como rojo accent**.

### 2.3 Gris (`GOB.COLOR.GRIS`)

Escala nominal del kit (de claro a oscuro): **5 · 10 · 20 · 30 · 40 · 50 (base) · 60 · 70 · 80 · 90**.

Los hex por paso no estaban legibles en las capturas utilizadas; completar desde el PDF/Figma oficial en una futura revisión. Mientras tanto, usar los tokens neutros de producto definidos en [§10](#10-mapeo-gri--tokens-de-producto).

### 2.4 Blanco y negro

| Token | Valor |
| --- | --- |
| `GOB.COLOR.BLANCO` / Base | `#FFFFFF` |
| `GOB.COLOR.BLANCO` opacidad (referencias kit) | **26 %** y **78 %** sobre el fondo que corresponda |
| `GOB.COLOR.NEGRO` opacidad | **87 %**, **54 %**, **26 %**, **12 %** |
| Texto sobre fondos (ver §3) | `#FFFFFF` o `#373737` |

### 2.5 Estados semánticos (`GOB.COLOR`)

Orden de lectura en lámina: del tono más oscuro (izquierda) al más claro (derecha). **Base** es el token central de cada familia.

#### Éxito (`GOB.COLOR.EXITO`)

`#1B5E20` · `#2E7D32` · `#388E3C` · `#43A047` · **`#4CAF50` (base)** · `#66BB6A` · `#81C784` · `#A5D6A7` · `#C8E6C9` · `#E8F5E9`

#### Info (`GOB.COLOR.INFO`)

`#0D47A1` · `#1565C0` · `#1976D2` · `#1E88E5` · **`#2196F3` (base)** · `#42A5F5` · `#64B5F6` · `#90CAF9` · `#BBDEFB` · `#E3F2FD`

#### Advertencia (`GOB.COLOR.ADVERTENCIA`)

`#BF360C` · `#D84315` · `#E64A19` · `#F4511E` · **`#FF5722` (base)** · `#FF7043` · `#FFAB91` · `#FF8A65` · `#FFCCBC` · `#FBE9E7`

#### Error (`GOB.COLOR.ERROR`)

`#BE0A1F` · `#CD1E2C` · `#D32F2F` · `#EC313A` · **`#FB3B3B` (base)** · `#F54E53` · `#E97175` · `#F2999C` · `#FFCDD2` · `#FFEBEF`

#### Focus (`GOB.COLOR.FOCUS`)

| Uso | Hex |
| --- | --- |
| Anillo / resalte cálido | `#FFBE5C` |
| Contraste neutro | `#373737` |

#### Enlaces (`GOB.COLOR.LINK`)

| Rol | Hex |
| --- | --- |
| Primario | `#1D70B8` |
| Oscuro | `#003078` |
| Visitado / morado | `#4C2C92` |
| Neutro / contexto | `#373737` |

### 2.6 Visualización de datos (referencia)

Solo si el GRI incluye gráficos o dashboards. Paletas del kit:

**Cualitativa (18 colores):** `#FA4D56` · `#6929C4` · `#198038` · `#009D9A` · `#000070` · `#D3354F` · `#FAE250` · `#C9EE63` · `#61B258` · `#70D1F0` · `#4A62D1` · `#A56EFF` · `#DD45DF` · `#F1C0D3` · `#F9D9B6` · `#FEFACD` · `#BDFDC8` · `#D7BFFA`

**Secuencial (azul, 10 pasos):** `#001141` · `#001D6C` · `#002D9C` · `#005DDA` · `#0043CE` · `#0F62FE` · `#4589FF` · `#78A9FF` · `#D0E2FF` · `#EDF5FF`

**Grupo fijo (4 variables):** `#000070` · `#6929C4` · `#009D9A` · `#D7BFFA`

**Divergente (11 pasos):** `#294090` · `#3A6EAE` · `#5D9BC7` · `#88C3DC` · `#B9E1EE` · `#E8EAC5` · `#FFD581` · `#FFAA5C` · `#F97145` · `#DC2D2A` · `#9D0024`

---

## 3. Texto accesible (AA)

El kit recomienda **dos** colores de texto para garantizar contraste sobre fondos de marca y de estado:

| Token | Hex | Uso |
| --- | --- | --- |
| Blanco / base | `#FFFFFF` | Sobre fondos **oscuros** de primario, accent, neutro, éxito, info, error y advertencia |
| Negro / texto | `#373737` | Sobre fondos **claros** de las mismas familias y sobre blanco |

**Regla práctica:** si el fondo es tono **darken** o **base** saturado → preferir **texto blanco**; si el fondo es **lighten** o pastel → preferir **`#373737`**.

---

## 4. Tema claro / oscuro

El kit incluye comparación **Light theme / Dark theme** para primario, sobre-primario, accent, éxito, error y focus ([`5.PNG`](uikit_gob/references/5.PNG)).

| Token | Light theme | Dark theme (referencia visual) |
| --- | --- | --- |
| `GOB.COLOR.PRIMARIO` | Base `#4282E0`, variante `#0F69C4` | Tono más claro sobre fondo oscuro |
| `GOB.COLOR.SOBRE-PRIMARIO` | `#FFFFFF` | `#FFFFFF` |
| `GOB.COLOR.ACCENT` | Base `#FF4731` | Misma familia, ajustar contraste |
| `GOB.COLOR.EXITO` | Base `#4CAF50` | Base `#4CAF50` |
| `GOB.COLOR.ERROR` | Base `#FB3B3B` | Variante lighten (p. ej. `#F2999C`) |
| `GOB.COLOR.FOCUS` | Base `#FFBE5C` | Variante más suave sobre fondo oscuro |

> **Regla de implementación:** algunas etiquetas hex en la lámina light/dark **repiten valores** que no coinciden con el color mostrado (por ejemplo primario en modo oscuro). Para implementación web, **priorizar las tablas de las secciones 2 y 3** de este documento; usar la lámina light/dark solo como guía visual hasta contar con tokens exportados oficialmente.

**Enfoque GRI (MVP):** implementar primero **tema claro** completo. El tema oscuro queda documentado como referencia; activarlo solo cuando los tokens oficiales estén validados.

---

## 5. Sistema Tipográfico

### 5.1 Familias tipográficas

| Familia | Fuente | Rol | Import |
|---|---|---|---|
| **Encabezados institucionales** | Roboto Slab | Títulos de página, encabezados de sección destacados | `next/font/google` |
| **UI y cuerpo** | Roboto Sans | UI, cuerpo, enlaces, botones, labels, microcopy | `next/font/google` |
| **Mono (secundaria)** | `ui-monospace` o sistema | Números de solicitud, RUT, IDs, costos | Sistema |

```tsx
// app/layout.tsx
import { Roboto, Roboto_Slab } from 'next/font/google'

const robotoSans = Roboto({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-sans',
})

const robotoSlab = Roboto_Slab({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-roboto-slab',
})
```

### 5.2 Reglas de accesibilidad (kit)

- Párrafos: mínimo recomendado **16 px** (1 rem).
- No usar texto regular **por debajo de 12 px**; evitar fuentes *display* para cuerpo.
- **Line-height ≥ 1,5 ×** tamaño de fuente; en las tablas siguientes el kit usa **1,5** de forma uniforme.

### 5.3 Roboto Slab — encabezados

*En la lámina del kit, L / M / S coinciden en desktop y mobile; solo **Heading-XL** cambia de tamaño.*

| Estilo | Desktop | Mobile |
| --- | --- | --- |
| Heading-XL | 48 px (3 rem), weight **400**, lh **1,5** | 32 px (2 rem), weight **400**, lh **1,5** |
| Heading-L | 36 px (2,25 rem), **500**, lh 1,5 | Igual que desktop |
| Heading-M | 31 px (2 rem), **500**, lh 1,5 | Igual |
| Heading-S | 25 px (1,6 rem), **500**, lh 1,5 | Igual |

### 5.4 Roboto Sans — desktop

| Estilo | Tamaño | Peso | Line-height |
| --- | --- | --- | --- |
| Heading-XL | 48 px (3 rem) | Bold **700** | 1,5 |
| Heading-L | 36 px (2,25 rem) | Medium **500** | 1,5 |
| Heading-M | 31 px (2 rem) | **500** | 1,5 |
| Heading-S | 19 px (1,1875 rem) | **500** | 1,5 |
| Body-L | 24 px (1,5 rem) | 400 / **700** | 1,5 |
| Body-M | 19 px (1,1875 rem) | 400 / **700** | 1,5 |
| Body-S | 16 px (1 rem) | 400 / **700** | 1,5 |
| Body-XS | 14 px (0,875 rem) | 400 / **700** | 1,5 |
| Body-button | 19 px (1,1875 rem) | **500** | 1,5 |
| Body-button-small | 16 px (1 rem) | **500** | 1,5 |
| Body-Link | 19 px (1,1875 rem) | **500** | 1,5 |
| Body-Link-Bold | 19 px (1,1875 rem) | **500** | 1,5 |
| Body-Link-Small | 16 px (1 rem) | **400** | 1,5 |

### 5.5 Roboto Sans — mobile

| Estilo | Tamaño | Peso | Line-height |
| --- | --- | --- | --- |
| Heading-XL | 32 px (2 rem) | **400** | 1,5 |
| Heading-L | 24 px (1,5 rem) | **500** | 1,5 |
| Heading-M | 18 px (1,125 rem) | **500** | 1,5 |
| Heading-S | 16 px (1 rem) | **500** | 1,5 |
| Body-L | 18 px (1,125 rem) | 500 / **700** | 1,5 |
| Body-M | 16 px (1 rem) | 400 / **700** | 1,5 |
| Body-S | 14 px (0,875 rem) | 400 / **700** | 1,5 |
| Body-XS | 12 px (0,75 rem) | 400 / **700** | 1,5 |
| Body-button | 16 px (1 rem) | **500** | 1,5 |
| Body-button-small | 16 px (1 rem) | **500** | 1,5 |
| Body-Link | 16 px (1 rem) | **500** | 1,5 |
| Body-Link-Small (Regular) | 14 px | **400** | 1,5 |
| Body-Link-Small (Bold) | 14 px | **700** | 1,5 |

> **Nota de implementación:** en algunas láminas móviles del kit aparecen conversiones **px → rem** poco estándar. En código se recomienda **normalizar a 16 px = 1 rem** salvo corrección explícita del equipo de diseño.

### 5.6 Escala tipográfica — contexto formulario GRI

Mapeo práctico de los estilos del kit al flujo de solicitud de marca:

| Nivel GRI | Estilo kit | Uso en GRI |
|---|---|---|
| H1 (sección) | Roboto Slab Heading-S (desktop) / Heading-M (mobile) | Título de sección activa ("Clases y coberturas") |
| H2 (subsección) | Roboto Sans Heading-S | Subtítulos dentro de sección |
| Body | Roboto Sans Body-S | Instrucciones de campo, microcopy principal |
| Body SM | Roboto Sans Body-XS | Descripciones de cobertura, textos de popover |
| Body XS | Roboto Sans Body-XS (12 px) | Hints bajo inputs, timestamps de guardado |
| Button | Roboto Sans Body-button-small | Texto de CTAs |
| Label | Roboto Sans Body-XS, weight 600, UPPERCASE | Labels de campo |
| Mono | 13 px / 20px, weight 500 | Números de clase (`Clase 42`), costos (`$69.889 CLP`), RUT |

---

## 6. Spacing System

Escala única del UI Kit v3.0.1 (px). **No introducir pasos intermedios no definidos en el kit** (p. ej. 20 px) salvo excepción documentada.

| Token | Valor | Uso típico en GRI |
|---|---|---|
| `space-1` | 4px | Micro espacios entre elementos inline |
| `space-2` | 8px | Padding interno de badges, gaps entre iconos y texto |
| `space-3` | 12px | Padding interno de inputs |
| `space-4` | 16px | Gap entre campos de formulario; margen mobile |
| `space-5` | 24px | Padding interno de cards de sección; gap entre secciones |
| `space-6` | 36px | Separación entre bloques de contenido |
| `space-7` | 48px | Padding vertical de pantalla |
| `space-8` | 64px | Margen amplio entre secciones principales |

---

## 7. Grilla y responsividad

### 7.1 Tabla de layout (kit)

| Categoría | Pantalla (dp) | Margen | Cuerpo (área útil) | Columnas |
| --- | --- | --- | --- | --- |
| Extra-small (phone) | 0–599 | 16 dp | Escalado (fluido) | **4** |
| Small (tablet) | 600–904 | 32 dp | Fluido | **8** |
| Small (tablet) | 905–1239 | Fluido | **840 dp** fijo | **12** |
| Medium (laptop) | 1240–1439 | 200 dp | Fluido | **12** |
| Large (desktop) | 1440+ | Fluido | **1040** dp (ancho de cuerpo) | **12** |

En **CSS / Tailwind**, usar **px** equivalentes a **dp** en web (`1dp ≈ 1px` en media estándar).

**Breakpoints sugeridos:** `min-width: 600px`, `905px`, `1240px`, `1440px`.

**Contenedores máximos:** `max-width: 840px` y `1040px` donde la tabla fija cuerpo.

### 7.2 Nombres de dispositivo (diagrama de grilla)

| Dispositivo | Columnas |
| --- | --- |
| 4K / Desktop | 12 |
| LG Tablet / Tablet | 8 |
| Mobile | 4 |

Variantes con sidebar / cabecera se toman del diagrama visual del kit ([`10.PNG`](uikit_gob/references/10.PNG)).

### 7.3 Enfoque GRI

**Mobile-first.** El formulario progresivo debe ser usable en 4 columnas (mobile) y expandirse a 12 columnas en escritorio. El stepper y la card de sección activa respetan el ancho de cuerpo fijo en tablet/desktop (840 dp / 1040 dp).

---

## 8. Borders y Radius

### 8.1 Grosor de borde (kit)

| Token | Valor | Uso |
|---|---|---|
| `border-1` | 1px | Bordes estándar de inputs, cards, separadores |
| `border-2` | 2px | Énfasis en estados activos o seleccionados |
| `border-3` | 3px | Uso excepcional (focus visible reforzado) |
| `border-4` | 4px | Uso excepcional (componentes de alta visibilidad) |

### 8.2 Border radius (kit)

| Token | Valor | Uso en GRI |
|---|---|---|
| `radius-none` | 0px | Tablas, elementos flush |
| `radius-sm` | 4px | Badges de clase (Clase 42, ICPA) |
| `radius-md` | 8px | Inputs, selects |
| `radius-lg` | 16px | Cards de sección del formulario |
| `radius-xl` | 24px | Cards de cobertura en el buscador |
| `radius-full` | 9999px | Círculos del stepper, pills de filtro de rubro |

---

## 9. Elevation (Sombras)

El kit define **cinco niveles** de elevación progresiva ([`6.PNG`](uikit_gob/references/6.PNG)):

| Token | Nivel kit | Uso en GRI |
|---|---|---|
| `elevation-01` | Elevation-01 | Elementos planos con separación mínima |
| `elevation-02` | Elevation-02 | Cards de sección del formulario |
| `elevation-03` | Elevation-03 | Buscador de coberturas, stepper |
| `elevation-04` | Elevation-04 | Dropdowns, popovers |
| `elevation-05` | Elevation-05 | Modales de confirmación y éxito |

> Los valores CSS exactos de cada nivel deben calibrarse contra el PNG del kit o el export de Figma. Volcar los valores numéricos en `globals.css` cuando estén disponibles oficialmente.

**Valores de referencia (calibración inicial):**

| Token | Valor CSS sugerido |
|---|---|
| `elevation-01` | `0 1px 2px rgba(0,0,0,0.06)` |
| `elevation-02` | `0 1px 3px rgba(0,0,0,0.08)` |
| `elevation-03` | `0 4px 12px rgba(0,0,0,0.10)` |
| `elevation-04` | `0 6px 16px rgba(0,0,0,0.12)` |
| `elevation-05` | `0 8px 24px rgba(0,0,0,0.15)` |

---

## 10. Mapeo GRI — tokens de producto

Traducción de los tokens del UI Kit al contexto del portal de solicitud de marca.

### 10.1 Tokens base

| Token de producto | Hex (UI Kit) | Uso en GRI |
| --- | --- | --- |
| `color.primary` | `#4282E0` | CTA primarios, tabs activos, links, términos del glosario |
| `color.primary-dark` | `#0F69C4` | Header, navbar, botón "Presentar solicitud" |
| `color.primary-foreground` | `#FFFFFF` | Texto sobre fondos primarios |
| `color.accent` | `#FF4731` | Reservado para CTAs de alta visibilidad si aplica |
| `color.text` | `#373737` | Cuerpo principal, títulos sobre fondo claro |
| `color.surface` | `#FFFFFF` | Cards de sección, modales, inputs |
| `color.background` | `#F9FAFB` | Fondo de pantalla principal (neutro claro) |
| `color.surface-elevated` | `#F3F4F6` | Fondos de inputs inactivos, tabs del stepper |
| `color.foreground-muted` | derivado de `GOB.COLOR.GRIS` | Placeholders, microcopy, timestamps |
| `color.border` | derivado de `GOB.COLOR.GRIS` lighten | Bordes de cards, separadores |
| `color.link` | `#1D70B8` | Enlaces; visitado `#4C2C92` |
| `color.focus-ring` | `#FFBE5C` | Anillo foco visible + borde `#373737` si hace falta doble indicación |

### 10.2 Sistema semáforo en el Stepper

En el GRI, el sistema semáforo se aplica al **stepper de progreso**, mapeado a los colores de estado del kit:

| Estado del paso | Color kit | Hex | Hex Fondo (lighten) | Significado |
|---|---|---|---|---|
| 🟠 Activo | Advertencia base | `#FF5722` | `#FBE9E7` | Sección que el usuario está completando ahora |
| ✅ Completado | Éxito base | `#4CAF50` | `#E8F5E9` | Sección completada con datos válidos |
| ⚪ Pendiente | Gris (nivel 40–50) | *TBD* | `#F3F4F6` | Sección que no corresponde completar aún |
| ❌ Error | Error base | `#FB3B3B` | `#FFEBEF` | Sección con datos inválidos que requiere corrección |

> **Regla crítica:** la secuencia del stepper es siempre 🟠⚪⚪⚪ → ✅🟠⚪⚪ → ✅✅🟠⚪ → ✅✅✅🟠. Nunca puede haber un paso en naranja sin que todos los anteriores estén en verde.

### 10.3 Estados interactivos

| Estado | Modificación | Duración |
|---|---|---|
| Default | `color.primary` (`#4282E0`) | — |
| Hover | `#0F69C4` (primario darken 1) | 150ms |
| Active | Oscurecer 15% + scale 0.98 | 100ms |
| Focus | Ring `#FFBE5C` + borde `#373737` si aplica | Inmediato |
| Disabled | `opacity-40 cursor-not-allowed` | — |
| Loading | Spinner + `opacity-70` | Inmediato |

### 10.4 Toast / feedback contextual

| Tipo | Color kit | Hex | Uso |
|---|---|---|---|
| `success` | Éxito | `#4CAF50` | "Borrador guardado automáticamente" |
| `error` | Error | `#FB3B3B` | "Error de conexión — reintentando..." |
| `info` | Info | `#2196F3` | "Tu pago está siendo verificado con TGR" |
| `warning` | Advertencia | `#FF5722` | "Esta cobertura ya está en tu solicitud" |

---

## 11. Component Library

### 11.1 StepperSolicitud

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
| `pendiente` | Número (1,2,3,4) | Gris (TBD) | Gris |
| `activa` | ! | Advertencia `#FF5722` | Naranja bold |
| `completada` | ✓ | Éxito `#4CAF50` | Verde |
| `error` | ✕ | Error `#FB3B3B` | Rojo |

**Regla de secuencia:** la función `avanzarSecciones(secciones, completarId, activarId)` es la única forma de cambiar estados. Garantiza que nunca haya un paso activo sin todos los anteriores completados.

**Anti-patterns:**
- ❌ No modificar el estado del stepper directamente desde la página
- ❌ No tener dos secciones en estado `activa` simultáneamente
- ❌ No omitir el porcentaje de avance numérico

---

### 11.2 BuscadorClases

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

### 11.3 GlosarioTerm

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

### 11.4 SelectorRubro

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

### 11.5 CTAButton (adaptado para formulario)

**Variantes en el contexto GRI:**

| Variante | Color | Uso |
|---|---|---|
| `primary` | `#4282E0` | Avanzar al siguiente paso ("Siguiente — Seleccionar clases") |
| `primary-dark` | `#0F69C4` | Presentar solicitud (acción definitiva) |
| `outline` | Borde neutro | Guardar borrador |
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

### 11.6 FormInput

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
- Default: borde neutro (`--border`)
- Focus: borde `#4282E0` + ring `#FFBE5C`
- Error: borde `#FB3B3B` + hint en rojo
- Disabled: `opacity-40 cursor-not-allowed`

---

### 11.7 Toast / Feedback contextual

Usado para confirmar acciones de guardado, errores de conexión y estados del proceso. Ver [§10.4](#104-toast--feedback-contextual) para colores del kit.

---

## 12. Patrones de Pantalla

### Patrón: Sección de formulario activa

```
┌─────────────────────────────────────────────────┐
│ StepperSolicitud (4 pasos, sticky top)          │
│ ✅ Datos  →  🟠 Clases  →  ⚪ Solicitante  →  ⚪ Revisión 
│ Barra de progreso                               │
├─────────────────────────────────────────────────┤
│ Card de sección (elevation-02, radius-lg)       │
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

## 13. Accessibility (A11Y)

### Requisitos mínimos WCAG AA para el GRI

| Criterio | Requisito | Verificación |
|---|---|---|
| Contraste de texto | Mínimo 4.5:1 para body, 3:1 para elementos grandes | Chrome DevTools → Accessibility |
| Targets táctiles | Mínimo 44×44px para todos los botones e inputs (referencia kit) | Inspección manual |
| Navegación por teclado | Tab order lógico en todos los campos del formulario | Prueba manual con Tab |
| Labels de inputs | Todos los inputs tienen `<label>` asociado | HTML semántico |
| Mensajes de error | Los errores se describen en texto, no solo con color | Aria attributes |
| Focus visible | Anillo `#FFBE5C` con contraste `#373737` si aplica | Inspección visual |
| Roles ARIA | Stepper con `role="progressbar"` y `aria-valuenow` | HTML semántico |
| Formulario | `<form>` con `onSubmit` en lugar de `onClick` en el CTA | — |
| Texto mínimo | Párrafos ≥ 16 px; nunca < 12 px | Tokens §5.2 |

**Nota:** el stack usa React + Next.js. No se usan etiquetas `<form>` HTML nativas con `action` — se usa `onSubmit` del event handler o los CTAs con `onClick` según el patrón de shadcn/ui.

---

## 14. Tokens CSS (globals.css)

```css
/* globals.css — UI Kit v3.0.1 + mapeo GRI */

@layer base {
  :root {
    /* Primario (GOB.COLOR.PRIMARIO) */
    --color-primary: #4282E0;
    --color-primary-dark: #0F69C4;
    --color-primary-foreground: #FFFFFF;

    /* Accent (GOB.COLOR.ACCENT) */
    --color-accent: #FF4731;

    /* Semáforo del stepper (mapeo a estados del kit) */
    --stepper-active: #FF5722;
    --stepper-active-bg: #FBE9E7;
    --stepper-done: #4CAF50;
    --stepper-done-bg: #E8F5E9;
    --stepper-pending: #9CA3AF; /* TBD: reemplazar con GOB.COLOR.GRIS */
    --stepper-pending-bg: #F3F4F6;
    --stepper-error: #FB3B3B;
    --stepper-error-bg: #FFEBEF;

    /* Estados semánticos */
    --color-success: #4CAF50;
    --color-success-bg: #E8F5E9;
    --color-warning: #FF5722;
    --color-warning-bg: #FBE9E7;
    --color-danger: #FB3B3B;
    --color-danger-bg: #FFEBEF;
    --color-info: #2196F3;
    --color-info-bg: #E3F2FD;

    /* Enlaces y focus */
    --color-link: #1D70B8;
    --color-link-visited: #4C2C92;
    --color-focus: #FFBE5C;
    --color-focus-contrast: #373737;

    /* Neutros */
    --background: #F9FAFB;
    --surface: #FFFFFF;
    --surface-elevated: #F3F4F6;
    --foreground: #373737;
    --foreground-secondary: #4B5563;
    --foreground-muted: #9CA3AF;
    --border: #E5E7EB;
    --border-strong: #D1D5DB;
    --ring: #FFBE5C;

    /* Tipografía */
    --font-slab: 'Roboto Slab', Georgia, serif;
    --font-sans: 'Roboto Sans', 'Roboto', system-ui, sans-serif;
    --font-mono: ui-monospace, 'Courier New', monospace;

    /* Border radius (kit) */
    --radius-none: 0px;
    --radius-sm: 4px;
    --radius-md: 8px;
    --radius-lg: 16px;
    --radius-xl: 24px;
    --radius-full: 9999px;

    /* Border width (kit) */
    --border-width-1: 1px;
    --border-width-2: 2px;
    --border-width-3: 3px;
    --border-width-4: 4px;

    /* Elevación (kit — calibrar contra PNG oficial) */
    --elevation-01: 0 1px 2px rgba(0,0,0,0.06);
    --elevation-02: 0 1px 3px rgba(0,0,0,0.08);
    --elevation-03: 0 4px 12px rgba(0,0,0,0.10);
    --elevation-04: 0 6px 16px rgba(0,0,0,0.12);
    --elevation-05: 0 8px 24px rgba(0,0,0,0.15);

    /* Espaciado (kit) */
    --space-1: 4px;
    --space-2: 8px;
    --space-3: 12px;
    --space-4: 16px;
    --space-5: 24px;
    --space-6: 36px;
    --space-7: 48px;
    --space-8: 64px;
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

## 15. Tokens Tailwind (tailwind.config.ts)

```typescript
// tailwind.config.ts — UI Kit v3.0.1 + mapeo GRI
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#4282E0',
          dark:    '#0F69C4',
          light:   '#BFEEFF',
        },
        accent: {
          DEFAULT: '#FF4731',
        },
        // Semáforo del stepper (GRI)
        stepper: {
          active:      '#FF5722',
          'active-bg': '#FBE9E7',
          done:        '#4CAF50',
          'done-bg':   '#E8F5E9',
          pending:     '#9CA3AF',
          'pending-bg':'#F3F4F6',
          error:       '#FB3B3B',
          'error-bg':  '#FFEBEF',
        },
        // Estados semánticos (kit)
        danger:  { DEFAULT: '#FB3B3B', bg: '#FFEBEF' },
        warning: { DEFAULT: '#FF5722', bg: '#FBE9E7' },
        info:    { DEFAULT: '#2196F3', bg: '#E3F2FD' },
        success: { DEFAULT: '#4CAF50', bg: '#E8F5E9' },
        link:    { DEFAULT: '#1D70B8', visited: '#4C2C92' },
        focus:   { DEFAULT: '#FFBE5C', contrast: '#373737' },
        // Neutros
        surface: '#FFFFFF',
        'surface-elevated': '#F3F4F6',
        border:  '#E5E7EB',
      },
      fontFamily: {
        slab: ['Roboto Slab', 'Georgia', 'serif'],
        sans: ['Roboto', 'system-ui', 'sans-serif'],
        mono: ['ui-monospace', 'Courier New', 'monospace'],
      },
      fontSize: {
        'heading-xl': ['48px', { lineHeight: '1.5', fontWeight: '400' }],
        'heading-l':  ['36px', { lineHeight: '1.5', fontWeight: '500' }],
        'heading-m':  ['31px', { lineHeight: '1.5', fontWeight: '500' }],
        'heading-s':  ['25px', { lineHeight: '1.5', fontWeight: '500' }],
        'body-l':     ['24px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-m':     ['19px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-s':     ['16px', { lineHeight: '1.5', fontWeight: '400' }],
        'body-xs':    ['14px', { lineHeight: '1.5', fontWeight: '400' }],
        'btn':        ['16px', { lineHeight: '1.5', fontWeight: '500' }],
        'label':      ['11px', { lineHeight: '1.5', fontWeight: '600', letterSpacing: '0.05em' }],
        'mono':       ['13px', { lineHeight: '1.5', fontWeight: '500' }],
      },
      spacing: {
        '1': '4px',  '2': '8px',  '3': '12px', '4': '16px',
        '5': '24px', '6': '36px', '7': '48px', '8': '64px',
      },
      borderRadius: {
        'none': '0px',
        'sm':   '4px',
        'md':   '8px',
        'lg':   '16px',
        'xl':   '24px',
        'full': '9999px',
      },
      borderWidth: {
        '1': '1px',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      boxShadow: {
        'elevation-01': '0 1px 2px rgba(0,0,0,0.06)',
        'elevation-02': '0 1px 3px rgba(0,0,0,0.08)',
        'elevation-03': '0 4px 12px rgba(0,0,0,0.10)',
        'elevation-04': '0 6px 16px rgba(0,0,0,0.12)',
        'elevation-05': '0 8px 24px rgba(0,0,0,0.15)',
      },
      screens: {
        'sm':  '600px',
        'md':  '905px',
        'lg':  '1240px',
        'xl':  '1440px',
      },
      maxWidth: {
        'body-tablet':  '840px',
        'body-desktop': '1040px',
      },
    },
  },
  plugins: [],
}

export default config
```

---

## 16. Referencias visuales del kit

Capturas en `docs/uikit_gob/references/`:

| Lámina | Archivo |
| --- | --- |
| Colores básicos | [`1.PNG`](uikit_gob/references/1.PNG) |
| Colores / estados | [`2.PNG`](uikit_gob/references/2.PNG) |
| Texto (AA) | [`3.PNG`](uikit_gob/references/3.PNG) |
| Data visualization | [`4.PNG`](uikit_gob/references/4.PNG) |
| Tema claro / oscuro | [`5.PNG`](uikit_gob/references/5.PNG) |
| Tokens / efectos | [`6.PNG`](uikit_gob/references/6.PNG) |
| Roboto Slab | [`7.PNG`](uikit_gob/references/7.PNG) |
| Roboto Sans | [`8.PNG`](uikit_gob/references/8.PNG) |
| Grilla (tabla) | [`9.PNG`](uikit_gob/references/9.PNG) |
| Grilla (diagramas) | [`10.PNG`](uikit_gob/references/10.PNG) |
| Token espaciado | [`11.PNG`](uikit_gob/references/11.PNG) |

### Próxima revisión documental

- Añadir fila **hex por nivel** de `GOB.COLOR.GRIS` cuando se disponga de la lámina o export JSON oficial.
- Volcar valores CSS numéricos exactos de **Elevation-01…05** desde Figma/PDF oficial.
- Validar tokens de **tema oscuro** contra export oficial antes de implementar `.dark`.

---

*Design System v2.0.0 · GRI — Portal de Solicitud de Marca · UI Kit Gobierno Digital v3.0.1 · Equipo UX INAPI · Junio 2026*
*Revisar y actualizar tras sesiones de testing con usuarios y validación de tokens oficiales pendientes (grises, elevación, dark mode).*
