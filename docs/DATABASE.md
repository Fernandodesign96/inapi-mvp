# Capa de Datos: GRI — Portal de Solicitud de Marca INAPI

> Este documento define la capa de persistencia del MVP del GRI. En Fase 1, la persistencia se implementa con **Firebase Firestore** (BaaS) para maximizar velocidad de desarrollo sin backend propio. La arquitectura está diseñada para migrar a PostgreSQL + Prisma en Fase 2 sin modificar los componentes de UI.

| Metadatos | Detalle |
|---|---|
| **Fase 1 (MVP)** | Firebase Firestore — modo prueba |
| **Fase 2 (Post-MVP)** | PostgreSQL 16 + Prisma 5 + NestJS |
| **ORM Fase 1** | Firebase SDK v10 (Client SDK) |
| **Acceso** | Desde browser vía singleton `lib/firebase.ts` |

---

## Tabla de Contenidos

1. [Modelo de Datos en Firestore](#1-modelo-de-datos-en-firestore)
2. [Interfaces TypeScript — La fuente de verdad de los tipos](#2-interfaces-typescript--la-fuente-de-verdad-de-los-tipos)
3. [Catálogo de Coberturas — coberturas.json](#3-catálogo-de-coberturas--coberturasjson)
4. [Glosario de Términos — glosario.json](#4-glosario-de-términos--glosariojson)
5. [Estrategia de Persistencia — addDoc vs updateDoc](#5-estrategia-de-persistencia--adddoc-vs-updatedoc)
6. [Variables de Entorno](#6-variables-de-entorno)
7. [Reglas de Seguridad Firestore](#7-reglas-de-seguridad-firestore)
8. [Migración a Fase 2 — PostgreSQL + Prisma](#8-migración-a-fase-2--postgresql--prisma)

---

## 1. Modelo de Datos en Firestore

Firestore organiza los datos en **colecciones de documentos**. Cada documento es un objeto JSON flexible que se guarda en el servidor de Google.

### Colección: `solicitudes`

Cada documento en esta colección representa un borrador de solicitud de marca guardado por un usuario durante el proceso de llenado del formulario.

```
solicitudes/
└── {docId}                          ← ID autogenerado por Firestore
    ├── tipo: string                 ← 'marca' | 'patente' | 'diseño'
    ├── denominacion: string         ← Nombre de la marca
    ├── rubro: string                ← Rubro seleccionado por el usuario (N2)
    ├── descripcionProducto: string  ← Texto libre de la segunda pregunta (N2)
    ├── clases: Cobertura[]          ← Array de coberturas seleccionadas
    │   └── { id, clase, descripcion, tipo, palabrasClave?, rubros? }
    ├── secciones: SeccionEstado[]   ← Estado del stepper (4 secciones)
    │   └── { id, nombre, estado: 'pendiente'|'activa'|'completada'|'error' }
    ├── solicitante: object          ← Datos del titular del derecho
    │   ├── nombre: string
    │   ├── rut: string
    │   └── email: string
    ├── representante?: object       ← Condicional — solo si hay agente PI
    │   ├── nombre: string
    │   └── rut: string
    ├── estado: string               ← 'borrador' | 'presentada'
    ├── creadoEn: Timestamp          ← serverTimestamp() — NO new Date()
    └── actualizadoEn: Timestamp     ← serverTimestamp() — se actualiza en cada guardado
```

### Por qué `serverTimestamp()` y no `new Date()`

Los relojes de los dispositivos del usuario pueden estar desincronizados (zona horaria incorrecta, batería baja, etc.). `serverTimestamp()` garantiza que la marca de tiempo proviene del servidor de Firestore, no del reloj local del browser.

---

## 2. Interfaces TypeScript — La fuente de verdad de los tipos

Las interfaces en `lib/types.ts` son el contrato entre los datos (Firestore, JSON) y el código. TypeScript verifica en build time que los datos tengan la forma correcta.

```typescript
// lib/types.ts

/** Una cobertura de clase de Niza del catálogo preaprobado de INAPI */
export interface Cobertura {
  id: string                          // Identificador único: 'c042-01'
  clase: number                       // Número de clase Niza (1-45)
  descripcion: string                 // Descripción formal preaprobada
  tipo: 'ICPA' | 'personalizada'     // ICPA = cobertura preaprobada, menor riesgo
  palabrasClave?: string[]           // Vocabulario cotidiano para Fuse.js
  rubros?: string[]                  // Rubros que aplican (N2 — segunda pregunta)
}

/** Estado de una sección del stepper */
export interface SeccionEstado {
  id: string                          // 'datos' | 'clases' | 'solicitante' | 'revision'
  nombre: string                      // Texto visible en el stepper
  estado: 'pendiente' | 'activa' | 'completada' | 'error'
}

/** Datos del titular del derecho */
export interface Solicitante {
  nombre: string                      // Nombre completo o razón social
  rut: string                         // RUT con formato: 12.345.678-9
  email: string                       // Correo de contacto
}

/** Representante o agente PI (condicional) */
export interface Representante {
  nombre: string
  rut: string
}

/** La solicitud completa — lo que vive en Firestore */
export interface SolicitudBorrador {
  id?: string                         // Ausente hasta el primer guardado en Firestore
  tipo: 'marca' | 'patente' | 'diseno'
  denominacion: string                // Nombre de la marca
  descripcionProducto?: string        // Segunda pregunta (N2)
  rubro?: string                      // Rubro seleccionado (N2)
  clases: Cobertura[]                 // Coberturas seleccionadas
  secciones: SeccionEstado[]          // Estado del stepper
  solicitante?: Solicitante
  representante?: Representante       // Condicional
  estado: 'borrador' | 'presentada'
}

/** Término del glosario inline */
export interface TerminoGlosario {
  termino: string                     // Clave de búsqueda (case-insensitive)
  definicion: string                  // Explicación en lenguaje cotidiano
  ejemplo: string                     // Caso concreto de aplicación
}
```

### Por qué `id?: string` es opcional

El campo `id` no existe hasta que Firestore crea el documento por primera vez (`addDoc`). Antes del primer guardado, el borrador vive solo en el estado de React. Una vez guardado, Firestore devuelve el ID autogenerado y se almacena en el estado del hook (`setDocId`).

---

## 3. Catálogo de Coberturas — coberturas.json

El archivo `data/coberturas.json` es la base de datos local del clasificador. Turbopack lo embebe en el bundle durante el build: no es una petición de red en runtime, vive en la RAM del browser desde el momento de la hydration.

### Estructura de una cobertura (N2 — enriquecida con rubros)

```json
[
  {
    "id": "c009-01",
    "clase": 9,
    "descripcion": "software de computación",
    "tipo": "ICPA",
    "palabrasClave": ["software", "programa", "aplicación", "app", "sistema", "código"],
    "rubros": ["tecnologia", "servicios"]
  },
  {
    "id": "c042-01",
    "clase": 42,
    "descripcion": "servicios de software como servicio SaaS",
    "tipo": "ICPA",
    "palabrasClave": ["saas", "nube", "cloud", "servicio digital", "plataforma online"],
    "rubros": ["tecnologia", "servicios"]
  },
  {
    "id": "c025-01",
    "clase": 25,
    "descripcion": "prendas de vestir",
    "tipo": "ICPA",
    "palabrasClave": ["ropa", "vestimenta", "indumentaria", "moda", "camisas", "pantalones", "zapatillas"],
    "rubros": ["moda"]
  },
  {
    "id": "c030-01",
    "clase": 30,
    "descripcion": "café tostado",
    "tipo": "ICPA",
    "palabrasClave": ["café", "coffee", "espresso", "tostado", "grano", "molido", "infusión"],
    "rubros": ["alimentos"]
  },
  {
    "id": "c035-01",
    "clase": 35,
    "descripcion": "servicios de marketing y publicidad",
    "tipo": "ICPA",
    "palabrasClave": ["marketing", "publicidad", "diseño", "branding", "comunicación", "agencia"],
    "rubros": ["servicios"]
  }
]
```

### Reglas del catálogo

1. El campo `id` sigue el formato `c{clase}-{índice}` para facilitar debugging.
2. El campo `tipo: 'ICPA'` indica cobertura preaprobada — menor riesgo de rechazo en examen de fondo.
3. `palabrasClave` debe incluir: sinónimos en español, variaciones de idioma, términos del rubro en inglés de uso común en Chile.
4. `rubros` debe incluir al menos uno de: `alimentos`, `tecnologia`, `moda`, `servicios`, `salud`, `arte`, `educacion`, `otro`.
5. Toda cobertura nueva al catálogo debe ser validada contra el listado oficial de coberturas preaprobadas de INAPI antes de publicarse.

---

## 4. Glosario de Términos — glosario.json

El archivo `data/glosario.json` alimenta el componente `GlosarioTerm`. Se busca por el campo `termino` de forma case-insensitive.

```json
[
  {
    "termino": "clase de Niza",
    "definicion": "La categoría que define qué productos o servicios protege tu marca. Hay 45 clases posibles, desde alimentos hasta tecnología.",
    "ejemplo": "Si vendes café, probablemente necesitas la Clase 30. Si ofreces servicios de diseño web, probablemente la Clase 42."
  },
  {
    "termino": "cobertura preaprobada",
    "definicion": "Una descripción de producto o servicio que ya fue revisada y aprobada por los examinadores de INAPI, lo que reduce el riesgo de rechazo.",
    "ejemplo": "'Software de computación' es una cobertura preaprobada para la Clase 9."
  },
  {
    "termino": "ICPA",
    "definicion": "Identifica coberturas del catálogo preaprobado de INAPI. Usar una cobertura ICPA reduce el riesgo de observaciones en el examen de fondo.",
    "ejemplo": "Al buscar 'software', las coberturas con el badge ICPA son las más seguras para tu solicitud."
  },
  {
    "termino": "marca denominativa",
    "definicion": "Una marca compuesta solo por palabras o letras, sin diseño gráfico ni colores específicos.",
    "ejemplo": "'Coca-Cola' como texto puro, sin el diseño del logotipo, sería una marca denominativa."
  },
  {
    "termino": "titular",
    "definicion": "La persona natural o empresa que será la dueña legal de la marca. Es quien tiene el derecho de uso y puede cederlo o licenciarlo.",
    "ejemplo": "Si tú eres el dueño del negocio, tú eres el titular. Si registras en nombre de tu empresa, la empresa es el titular."
  },
  {
    "termino": "arancel",
    "definicion": "El costo oficial que cobra INAPI por tramitar tu solicitud. Se paga a través de la Tesorería General de la República (TGR).",
    "ejemplo": "El arancel de una marca por una clase es aproximadamente $69.889 CLP. Si eliges más clases, el costo se multiplica."
  },
  {
    "termino": "examen de forma",
    "definicion": "La primera revisión que hace INAPI: verifica que el formulario esté completo y que todos los datos estén correctos.",
    "ejemplo": "Si pusiste bien tu RUT, el nombre de la marca y la clase correcta, el examen de forma debería pasar sin problemas."
  },
  {
    "termino": "examen de fondo",
    "definicion": "La segunda revisión de INAPI: analiza si tu marca puede registrarse o si hay conflictos con marcas ya registradas.",
    "ejemplo": "Si tu marca es muy parecida a una ya existente, el examen de fondo generará una observación."
  }
]
```

---

## 5. Estrategia de Persistencia — addDoc vs updateDoc

### El flujo de guardado en Firestore

```typescript
// hooks/useSolicitud.ts (extracto)

const [docId, setDocId] = useState<string | null>(null)
const primeraVez = useRef(true)         // useRef no causa re-render al cambiar

const guardarEnFirestore = async () => {
  setGuardando(true)
  try {
    if (!docId) {
      // Primera vez: crea el documento, obtiene el ID
      const ref = await addDoc(collection(db, 'solicitudes'), {
        ...solicitud,
        estado: 'borrador',
        creadoEn: serverTimestamp(),
        actualizadoEn: serverTimestamp(),
      })
      setDocId(ref.id)
    } else {
      // Veces siguientes: actualiza el documento existente
      await updateDoc(doc(db, 'solicitudes', docId), {
        ...solicitud,
        actualizadoEn: serverTimestamp(),
      })
    }
  } catch (error) {
    console.error('Error guardando en Firestore:', error)
    // En producción: Toast de error + retry automático
  } finally {
    setGuardando(false)
  }
}

// Autoguardado cuando cambian las clases seleccionadas
useEffect(() => {
  if (primeraVez.current) {
    primeraVez.current = false
    return              // Evita guardar en el montaje inicial (borrador vacío)
  }
  if (solicitud.clases.length > 0) {
    guardarEnFirestore()
  }
}, [solicitud.clases])
```

### Por qué `useRef` para `primeraVez` y no `useState`

`useEffect` se ejecuta siempre en el montaje inicial del componente. Sin la bandera `primeraVez`, el autoguardado crearía un documento vacío en Firestore en el momento de cargar el formulario.

`useRef` en lugar de `useState` porque cambiar el valor de la bandera no debe causar un re-render. Solo necesitamos persistir ese valor entre renders, no reaccionar a su cambio.

---

## 6. Variables de Entorno

Las credenciales de Firebase se guardan en `.env.local` y **nunca se commitean al repositorio**. Next.js expone las variables con prefijo `NEXT_PUBLIC_` al browser.

```bash
# .env.local — NO commitear, agregar a .gitignore

NEXT_PUBLIC_FIREBASE_API_KEY=AIza...
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=inapi-gri.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=inapi-gri
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=inapi-gri.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=123456789
NEXT_PUBLIC_FIREBASE_APP_ID=1:123456789:web:abc123
```

```bash
# .gitignore — verificar que esté incluido
.env.local
.env*.local
```

---

## 7. Reglas de Seguridad Firestore

### Fase 1 — Modo prueba (MVP)

Las reglas actuales permiten lectura y escritura sin autenticación durante 30 días. Esto es aceptable para el MVP de validación con datos mock.

```javascript
// firestore.rules — Fase 1 (MVP)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes/{docId} {
      allow read, write: if true;    // ⚠️ Solo para MVP — expira en 30 días
    }
  }
}
```

### Fase 2 — Producción (con autenticación)

```javascript
// firestore.rules — Fase 2 (con ClaveÚnica o auth real)
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /solicitudes/{docId} {
      // Solo el usuario autenticado puede leer y escribir sus propias solicitudes
      allow read, write: if request.auth != null
        && request.auth.uid == resource.data.userId;
      // Solo crear si el userId del documento coincide con el usuario autenticado
      allow create: if request.auth != null
        && request.resource.data.userId == request.auth.uid;
    }
  }
}
```

---

## 8. Migración a Fase 2 — PostgreSQL + Prisma

Cuando el proyecto escale a producción con un backend NestJS real, el schema de Prisma mapea directamente las interfaces TypeScript del MVP.

### Schema Prisma equivalente

```prisma
// prisma/schema.prisma — Fase 2

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

model Solicitud {
  id                 String      @id @default(cuid())
  tipo               String      // 'marca' | 'patente' | 'diseno'
  denominacion       String
  descripcionProducto String?
  rubro              String?
  clases             Json        // Array de coberturas — JSONB en PostgreSQL
  secciones          Json        // Estado del stepper
  solicitante        Json?       // { nombre, rut, email }
  representante      Json?       // Condicional — { nombre, rut }
  estado             String      @default("borrador")
  createdAt          DateTime    @default(now())
  updatedAt          DateTime    @updatedAt

  @@index([estado])
  @@index([createdAt])
}
```

### Por qué `Json` para `clases` y `secciones`

El campo `clases` contiene un array de coberturas cuya estructura puede variar (la segunda pregunta añadió campos `rubro` y `descripcionProducto`). PostgreSQL almacena estos campos como `JSONB`, que permite búsquedas dentro del JSON con índices GIN sin requerir docenas de tablas satélite.

### Estrategia de migración de datos

Los borradores de Firestore del MVP no necesitan migrarse a PostgreSQL en producción. Los borradores son efímeros — su propósito es sobrevivir el proceso de llenado del formulario, no ser historial permanente. Una vez presentada la solicitud, el registro permanente vive en el sistema interno de INAPI.

---

*Documento v1.0 · GRI — Portal de Solicitud de Marca · Equipo UX INAPI · Proyecto CORFO · Abril 2026*
