# Arquitectura del Sistema: GRI — Portal de Solicitud de Marca INAPI

> **Nombre conceptual:** Guided Registration Interface (GRI)
> Este documento describe la arquitectura técnica del MVP del rediseño del flujo de solicitud de registro de marca de INAPI.

| Metadatos | Detalle |
|---|---|
| **Stack** | Next.js 16 (Turbopack) · TypeScript · Tailwind CSS · shadcn/ui · Fuse.js · Firebase Firestore · Bun |
| **Tipo de sistema** | Frontend-first · Client-side rendering con Firebase como backend-as-a-service |
| **Renderizado** | Híbrido SSR/CSR — App Router de Next.js 16 |
| **Versión** | 1.0 — MVP Abril 2026 |

---

## Tabla de Contenidos

1. [Visión General y Propósito](#1-visión-general-y-propósito)
2. [Decisión de Stack — Por qué este stack y no otro](#2-decisión-de-stack--por-qué-este-stack-y-no-otro)
3. [Diagrama de Arquitectura](#3-diagrama-de-arquitectura)
4. [Capas Arquitectónicas](#4-capas-arquitectónicas)
5. [Estructura de Directorios](#5-estructura-de-directorios)
6. [Arquitectura de Frontend](#6-arquitectura-de-frontend)
7. [Sistema de Clasificación Fuse.js](#7-sistema-de-clasificación-fusejs)
8. [Capa de Persistencia — Firebase Firestore](#8-capa-de-persistencia--firebase-firestore)
9. [Renderizado Híbrido — SSR + CSR](#9-renderizado-híbrido--ssr--csr)
10. [Tech Stack Completo](#10-tech-stack-completo)
11. [Escalabilidad y Deuda Técnica Planificada](#11-escalabilidad-y-deuda-técnica-planificada)

---

## 1. Visión General y Propósito

El GRI es el MVP del rediseño del flujo de solicitud de registro de marca de INAPI. Su propósito técnico es demostrar que un formulario guiado con clasificación inteligente de Niza puede reducir la tasa de abandono del 40% actual y aumentar la precisión de clasificación a más del 85% — sin necesidad de un backend complejo en la fase inicial.

**Principio arquitectónico rector:** Complejidad mínima para validar el concepto de negocio. El stack fue elegido para maximizar velocidad de construcción y facilidad de iteración sin comprometer la escalabilidad hacia producción.

---

## 2. Decisión de Stack — Por qué este stack y no otro

### Next.js 16 con Turbopack sobre React puro

Next.js 16 proporciona el App Router para separar Server y Client Components, Turbopack que reduce el tiempo de arranque del servidor de desarrollo a menos de 400ms, y routing integrado sin configuración. Para un MVP que necesita escalar a producción, Next.js elimina la configuración manual que React puro requeriría.

Next.js 16 en lugar de Next.js 15: la versión 16 tiene soporte estable para React 19 y mejoras de Turbopack que aceleran el desarrollo. El proyecto MiINAPI App usa Next.js 15 por las restricciones de su roadmap original; el GRI comienza con 16 para no cargar deuda de versión desde el inicio.

### Fuse.js sobre RegExp y sobre embeddings de IA

| Opción | Cobertura | Latencia | Costo | Estado |
|---|---|---|---|---|
| RegExp (búsqueda exacta) | ~30% | < 1ms | Cero | ❌ Rechazado — no cubre vocabulario cotidiano |
| **Fuse.js (búsqueda fuzzy)** | **~60-85%** | **< 5ms** | **Cero** | **✅ MVP actual** |
| Embeddings Gemini API | ~95%+ | 100-300ms | Por consulta | ⏸ Fase 2 |

RegExp busca coincidencias exactas. El problema de clasificación de Niza es de vocabulario: el usuario escribe en lenguaje cotidiano y el catálogo está en lenguaje técnico-legal. Fuse.js tolera errores tipográficos, sinónimos y variaciones del idioma sin latencia de red.

### Firebase Firestore sobre backend NestJS en Fase 1

Para un MVP de validación, un backend completo (NestJS + PostgreSQL + Redis) añadiría semanas de desarrollo sin beneficio para el problema que se está validando. Firebase ofrece persistencia de borradores, autoguardado en tiempo real y acceso sin servidor con dos líneas de código.

**Consecuencia:** Firebase es la solución para el MVP, no necesariamente para producción. La arquitectura está diseñada para que la capa de persistencia sea reemplazable: los hooks `useSolicitud` y `useClaseSugerida` encapsulan completamente el acceso a datos, permitiendo migrar a una API REST sin modificar los componentes de UI.

### Bun sobre npm

Bun instala dependencias 10-25x más rápido que npm. Para un MVP construido en días, el tiempo de setup importa. No cambia cómo funciona el código en producción.

---

## 3. Diagrama de Arquitectura

```
┌─────────────────────────────────────────────────────────────────┐
│                        DISCO (Build time)                       │
│  coberturas.json  ─────┐                                        │
│  glosario.json    ─────┤  Turbopack embebe los datos            │
│  lib/types.ts     ─────┤  en el bundle durante el build.        │
│  lib/firebase.ts  ─────┘  No son archivos en runtime.           │
└──────────────────────────────┬──────────────────────────────────┘
                               │ bun dev / bun build
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    SERVIDOR NEXT.JS 16                          │
│  app/page.tsx (Server Component)                                │
│  ─ Genera HTML estático de la landing del GRI                   │
│  ─ SEO óptimo, no requiere JavaScript activo                    │
│  ─ Una sola solicitud HTTP del servidor al browser              │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTML + JS bundle → HTTP
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                     BROWSER (Client side)                       │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  app/solicitud/page.tsx  ('use client')                  │   │
│  │  ─ Orquesta el formulario de 4 pasos                     │   │
│  │  ─ Maneja sección activa (useState)                      │   │
│  │  ─ Controla modales de confirmación y éxito              │   │
│  └──────────────────┬───────────────────────────────────────┘   │
│                     │ consume                                   │
│  ┌──────────────────▼───────────────────────────────────────┐   │
│  │  hooks/useSolicitud.ts                                   │   │
│  │  ─ Estado central del formulario (useState inmutable)    │   │
│  │  ─ Stepper: avanzarSecciones() función pura              │   │
│  │  ─ Autoguardado Firebase (useEffect + useRef primeraVez) │   │
│  │  ─ addDoc (primera vez) / updateDoc (guardados sucesivos)│   │
│  └──────────────────┬───────────────────────────────────────┘   │
│                     │ consume                                   │
│  ┌──────────────────▼───────────────────────────────────────┐   │
│  │  hooks/useClaseSugerida.ts                               │   │
│  │  ─ Fuse instanciado FUERA del hook (scope del módulo)    │   │
│  │  ─ useMemo([query, rubro]) — recalcula solo si cambian   │   │
│  │  ─ Devuelve: Cobertura[] ordenadas por relevancia        │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  RAM del Browser                                         │   │
│  │  ─ Índice Fuse.js (catálogo completo)                    │   │
│  │  ─ Estado React (SolicitudBorrador)                      │   │
│  │  ─ Instancia Firebase (singleton)                        │   │
│  └──────────────────────────────────────────────────────────┘   │
└──────────────────────────────┬──────────────────────────────────┘
                               │ HTTP async (solo al agregar/cambiar clases)
                               ▼
┌─────────────────────────────────────────────────────────────────┐
│                    FIREBASE FIRESTORE                           │
│  Colección: 'solicitudes'                                       │
│  Documento: { id, tipo, denominacion, clases[], secciones[] }   │
│  ─ addDoc: primera vez → genera docId                           │
│  ─ updateDoc: guardados posteriores → usa docId                 │
│  ─ serverTimestamp(): evita relojes desincronizados             │
│  Reglas: modo prueba 30 días → producción requiere auth         │
└─────────────────────────────────────────────────────────────────┘
```

---

## 4. Capas Arquitectónicas

| Capa | Archivos | Responsabilidad |
|---|---|---|
| **Datos estáticos** | `data/coberturas.json`, `data/glosario.json` | Catálogo de coberturas preaprobadas y términos del glosario. Se embeben en el bundle en build time. |
| **Tipos** | `lib/types.ts` | Contratos TypeScript: `Cobertura`, `SeccionEstado`, `SolicitudBorrador`. El compilador los verifica en build time. |
| **Infraestructura** | `lib/firebase.ts` | Singleton Firestore. Se inicializa una sola vez con `getApps().length === 0`. Evita reinicializaciones por hot reload. |
| **Lógica de búsqueda** | `hooks/useClaseSugerida.ts` | Fuse.js encapsulado. Instancia fuera del hook + useMemo por query/rubro. Intercambiable por embeddings en Fase 2. |
| **Estado del formulario** | `hooks/useSolicitud.ts` | Estado central inmutable + stepper + autoguardado Firebase. La única fuente de verdad del formulario. |
| **Componentes UI** | `components/*.tsx` | Presentación pura. Consumen hooks via props. No acceden a Firebase directamente. |
| **Páginas** | `app/page.tsx`, `app/solicitud/page.tsx` | Orquestación. Conectan hooks y componentes. |

---

## 5. Estructura de Directorios

```
/inapi-gri                         ← Raíz del proyecto
│
├── /app                           ← Next.js App Router
│   ├── layout.tsx                 ← Root layout con fuentes DM Sans + DM Mono
│   ├── page.tsx                   ← Landing GRI (Server Component — SSR)
│   └── /solicitud
│       └── page.tsx               ← Formulario completo ('use client' — CSR)
│
├── /components
│   ├── /ui                        ← shadcn/ui (copiados al proyecto, no dependencia)
│   │   ├── button.tsx
│   │   ├── command.tsx
│   │   ├── dialog.tsx
│   │   ├── popover.tsx
│   │   └── badge.tsx
│   ├── BuscadorClases.tsx         ← Integra Command + Fuse.js + segunda pregunta
│   ├── StepperSolicitud.tsx       ← Semáforo naranja/verde/gris por sección
│   ├── GlosarioTerm.tsx           ← Wrapper Popover para términos técnicos
│   └── SelectorRubro.tsx          ← Grid visual de selección de rubro/industria
│
├── /hooks
│   ├── useClaseSugerida.ts        ← Fuse.js — instancia singleton en módulo
│   └── useSolicitud.ts            ← Estado formulario + autoguardado Firestore
│
├── /data
│   ├── coberturas.json            ← Catálogo preaprobado de Niza (enriquecido con rubro)
│   └── glosario.json              ← Términos técnicos + definición cotidiana + ejemplo
│
├── /lib
│   ├── firebase.ts                ← initializeApp singleton + getFirestore
│   └── types.ts                   ← Interfaces: Cobertura, SeccionEstado, SolicitudBorrador
│
├── /public                        ← Assets estáticos
├── tailwind.config.ts             ← Tokens del Design System (ver DESIGN_SYSTEM.md)
├── globals.css                    ← CSS custom properties
├── next.config.ts                 ← Configuración Next.js 16
├── tsconfig.json                  ← TypeScript con path alias @/
├── .env.local                     ← Variables Firebase (NEXT_PUBLIC_*) — no commitear
└── package.json                   ← Bun como package manager
```

---

## 6. Arquitectura de Frontend

### Separación Server / Client Components

```
app/page.tsx                     → SERVER COMPONENT (sin 'use client')
  └─ Beneficio: HTML pre-renderizado, SEO optimizado, sin JS requerido para ver la landing
  └─ Contenido: descripción del GRI, 3 oportunidades del audit, CTA a /solicitud

app/solicitud/page.tsx           → CLIENT COMPONENT ('use client')
  └─ Razón: usa useState, hooks propios, eventos del usuario
  └─ Contenido: formulario completo de 4 pasos + modales
```

### Flujo de datos en el formulario

```
Usuario escribe en BuscadorClases
    → setQuery (useState local del componente)
    → useClaseSugerida(query, rubro) recalcula con useMemo
    → fuse.search(query + rubro) en RAM
    → sugerencias[] renderizadas en Command
    → Usuario selecciona una cobertura
    → Dialog de confirmación (prevención de errores H2)
    → Usuario confirma
    → onAgregar(cobertura) → useSolicitud.agregarClase()
    → setSolicitud (nuevo objeto inmutable con spread)
    → React re-renderiza stepper + lista de clases
    → useEffect [solicitud.clases] detecta cambio
    → Verificación primeraVez.current (evita escritura en montaje)
    → guardarEnFirestore() — Firebase async en segundo plano
    → UI ya actualizada — usuario no espera Firebase
```

### Inmutabilidad del estado — por qué importa

React detecta cambios comparando referencias de objetos en memoria. Si se muta el objeto de estado directamente, la referencia no cambia y React no re-renderiza. Todos los cambios de estado en `useSolicitud` crean objetos nuevos:

```typescript
// ✅ CORRECTO — spread crea nuevo objeto, nueva referencia
setSolicitud(prev => ({
  ...prev,
  clases: [...prev.clases, nuevaCobertura]
}))

// ❌ INCORRECTO — muta el objeto, React no detecta el cambio
solicitud.clases.push(nuevaCobertura)
setSolicitud(solicitud)
```

---

## 7. Sistema de Clasificación Fuse.js

### Arquitectura del clasificador N2 (rediseño actual)

```typescript
// lib/types.ts
interface Cobertura {
  id: string
  clase: number                          // Número de clase Niza (1-45)
  descripcion: string                    // Descripción formal preaprobada
  tipo: 'ICPA' | 'personalizada'        // ICPA = menor riesgo de rechazo
  palabrasClave?: string[]              // Vocabulario cotidiano extendido
  rubros?: string[]                     // Rubros/industrias que aplican (N2)
}

// hooks/useClaseSugerida.ts

// ── FUERA del hook: se instancia ONCE al cargar el módulo ──────────
const fuse = new Fuse(coberturas as Cobertura[], {
  keys: [
    { name: 'descripcion',   weight: 0.5 },
    { name: 'palabrasClave', weight: 0.35 },
    { name: 'rubros',        weight: 0.15 },   // ← N2: nuevo campo
  ],
  threshold: 0.4,
  includeScore: true,
  shouldSort: true,
})

// ── DENTRO del hook: useMemo por (query, rubro) ────────────────────
export function useClaseSugerida(query: string, rubro: string) {
  const sugerencias = useMemo(() => {
    const combinado = `${query} ${rubro}`.trim()
    if (combinado.length < 2) return []
    return fuse
      .search(combinado)
      .slice(0, 6)
      .map(r => r.item)
  }, [query, rubro])

  return { sugerencias }
}
```

### Enriquecimiento del catálogo para N2

El campo `rubros` en `coberturas.json` mapea cada cobertura a los rubros del selector visual:

```json
{
  "id": "c042-01",
  "clase": 42,
  "descripcion": "servicios de software como servicio SaaS",
  "tipo": "ICPA",
  "palabrasClave": ["saas", "nube", "cloud", "software", "app", "aplicación", "digital"],
  "rubros": ["tecnologia", "servicios"]
}
```

---

## 8. Capa de Persistencia — Firebase Firestore

### Patrón singleton — por qué es crítico

```typescript
// lib/firebase.ts
import { initializeApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey:            process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain:        process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId:         process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket:     process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId:             process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
}

// El patrón singleton evita la reinicialización en hot reload de Next.js
const app = getApps().length === 0
  ? initializeApp(firebaseConfig)
  : getApps()[0]

export const db = getFirestore(app)
```

Sin este patrón, Next.js + Turbopack con hot reload intentaría reinicializar Firebase en cada guardado de archivo, lanzando el error "Firebase App named '[DEFAULT]' already exists".

### Estrategia addDoc / updateDoc

```typescript
// hooks/useSolicitud.ts (extracto)
const guardarEnFirestore = async () => {
  if (!docId) {
    // Primera vez: crea el documento y guarda el ID
    const ref = await addDoc(collection(db, 'solicitudes'), {
      ...solicitud,
      estado: 'borrador',
      creadoEn: serverTimestamp(),      // Timestamp del servidor, no del cliente
      actualizadoEn: serverTimestamp(),
    })
    setDocId(ref.id)                    // Guarda el ID para updates posteriores
  } else {
    // Guardados posteriores: actualiza el documento existente
    await updateDoc(doc(db, 'solicitudes', docId), {
      ...solicitud,
      actualizadoEn: serverTimestamp(),
    })
  }
}
```

### Ciclos paralelos — Firebase no bloquea la UI

El ciclo de React (usuario → estado → render) y el ciclo de Firebase (estado → Firestore → docId) son paralelos, no secuenciales. React actualiza la pantalla inmediatamente. Firebase guarda en segundo plano. El usuario ya ve la UI actualizada mientras Firebase confirma el guardado.

```
Usuario agrega clase → setSolicitud → React re-renderiza (inmediato)
                                    ↓ (en paralelo, no secuencial)
                                    useEffect → guardarEnFirestore() → Firebase (async)
```

---

## 9. Renderizado Híbrido — SSR + CSR

El GRI utiliza renderizado híbrido — el modelo que Next.js App Router está diseñado para implementar.

| Archivo | Tipo | Dónde corre | Razón |
|---|---|---|---|
| `app/page.tsx` | Server Component | Servidor Next.js | No tiene estado ni eventos. HTML pre-renderizado. SEO óptimo. |
| `app/solicitud/page.tsx` | Client Component | Browser | Tiene useState, hooks propios, eventos de usuario. |
| `hooks/useClaseSugerida.ts` | Hook cliente | Browser (RAM) | Fuse.js corre en browser — sin latencia de red. |
| `hooks/useSolicitud.ts` | Hook cliente | Browser + Firebase | Estado local + persistencia async. |
| `lib/firebase.ts` | Módulo singleton | Browser | Firebase SDK corre en browser. |
| `data/coberturas.json` | Dato estático | Build time → RAM | Embebido en bundle por Turbopack. |

### Hydration

Hydration ocurre una vez por carga de página, automáticamente. Para `app/solicitud/page.tsx`, React hidrata el HTML estático del servidor, conecta los componentes con el bundle de JS, inicializa `useSolicitud` e instancia Fuse.js. Desde ese momento el formulario está completamente activo.

---

## 10. Tech Stack Completo

| Capa | Tecnología | Versión | Rol |
|---|---|---|---|
| **Framework** | Next.js | 16 (Turbopack) | App Router, SSR/CSR, routing, bundling |
| **Lenguaje** | TypeScript | 5.x | Tipos, contratos de datos, seguridad |
| **Estilos** | Tailwind CSS | Latest | Utility-first, tokens del Design System |
| **Componentes** | shadcn/ui | Latest | Command, Dialog, Popover, Badge — copiados al proyecto |
| **Búsqueda** | Fuse.js | 7.x | Búsqueda fuzzy en browser — clasificador N2 |
| **Backend** | Firebase Firestore | 10.x | Persistencia de borradores — BaaS |
| **Package manager** | Bun | Latest | Instalación 10-25x más rápida que npm |
| **Fuentes** | DM Sans + DM Mono | — | Via `next/font/google` |
| **Iconos** | Lucide React | Latest | Iconografía consistente |

---

## 11. Escalabilidad y Deuda Técnica Planificada

### Migración del clasificador: Fuse → Embeddings

El hook `useClaseSugerida` encapsula completamente la lógica de búsqueda. Para escalar a embeddings semánticos (Clasificador N3), solo cambia el contenido del hook — los componentes de UI no requieren modificación:

```typescript
// Fase 1 (actual) — Fuse.js
const sugerencias = useMemo(() => fuse.search(query + rubro).map(r => r.item), [query, rubro])

// Fase 2 — Embeddings Gemini (mismo hook, diferente implementación)
const sugerencias = await getEmbeddingSuggestions(query, rubro) // API call
```

### Migración de Firebase a backend propio

Si el proyecto escala a producción con autenticación real (ClaveÚnica), los hooks pueden migrar de Firebase a una API REST sin tocar los componentes:

```typescript
// Fase 1 — Firebase
await addDoc(collection(db, 'solicitudes'), solicitud)

// Fase 2 — API REST (mismo hook)
await fetch('/api/solicitudes', { method: 'POST', body: JSON.stringify(solicitud) })
```

---

*Documento v1.0 · GRI — Portal de Solicitud de Marca · Equipo UX INAPI · Proyecto CORFO · Abril 2026*
