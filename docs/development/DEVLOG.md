# Registro de Desarrollo: Portal de Solicitud de Marca (GRI)

Este documento describe el proceso de desarrollo del **Portal de Solicitud de Marca INAPI**, bajo el concepto de **Guided Registration Interface (GRI)**. Es un registro de las decisiones técnicas, aprendizajes, errores mitigados y el progreso del MVP orientado a reducir el abandono en la tramitación ciudadana.

## 📑 Índice
- [[2026-04-10] - Frontend | Sprint 1: Génesis del MVP, Arquitectura Base y Niza N1](#2026-04-10---frontend--sprint-1-génesis-del-mvp-arquitectura-base-y-niza-n1)
- [[2026-04-17] - Frontend | Sprint 2: Optimización de Niza N2 y Refinamiento UX](#2026-04-17---frontend--sprint-2-optimización-de-niza-n2-y-refinamiento-ux)
- [[2026-04-20] - Frontend | Sprint 3: Despliegue, Accesibilidad y Analítica Final](#2026-04-20---frontend--sprint-3-despliegue-accesibilidad-y-analítica-final)

---

## [2026-04-10] - Frontend | Sprint 1: Génesis del MVP, Arquitectura Base y Niza N1

### Contexto y objetivos
Inauguración del desarrollo del **GRI (Guided Registration Interface)**. El objetivo primordial de este sprint fue establecer una base tecnológica de alto rendimiento que permitiera validar la hipótesis de que un formulario guiado reduce el abandono. Se priorizó la velocidad de iteración y la fidelidad visual, actuando bajo estándares de Senior Product Designer para asegurar una experiencia premium desde la primera línea de código.

### Implementación técnica
- **Stack Core & Setup:** Inicialización del proyecto utilizando **Next.js 16 (Turbopack)** y **Bun** como gestor de paquetes. La elección de Next.js 16 permite aprovechar las mejoras de estabilidad en el App Router y tiempos de compilación menores a 400ms.
- **Design System con Tailwind v4:** Implementación de la primera capa de tokens semánticos definidos en `DESIGN_SYSTEM.md`. Se configuraron variables CSS para el Azul Institucional INAPI y el sistema de estados del stepper (naranja/verde/gris).
- **Layout Institucional:** Creación de componentes de identidad visual `HeaderINAPI` y `FooterINAPI` para enmarcar el proceso de solicitud en un entorno de confianza gubernamental.
- **Arquitectura de Persistencia (Firebase):** Configuración de un singleton para **Firebase Firestore** en `lib/firebase.ts`. Se implementó la lógica de autoguardado en `hooks/useSolicitud.ts` utilizando el patrón `addDoc` / `updateDoc` con `useRef` para prevenir escrituras vacías durante el montaje inicial.
- **Niza N1 — Búsqueda Fuzzy Inicial:** Implementación del primer motor de búsqueda inteligente para el catálogo de coberturas utilizando **Fuse.js**. En esta fase (N1), el sistema realiza búsquedas directas sobre el catálogo `coberturas.json` cargado íntegramente en la RAM del cliente para eliminar latencia de red.
- **Componentes Base:** Creación del `StepperSolicitud` con lógica de 7 pasos (modelando el embudo oficial de INAPI) y el wrapper `GlosarioTerm` para ayuda contextual inline mediante Radix UI Portals.

### 💡 Repaso técnico: Fuse.js vs RegExp
A diferencia de una búsqueda exacta por `RegExp`, Fuse.js nos permite manejar errores tipográficos y sinónimos (palabras clave extendidas) en el catálogo. Esto es crítico porque el ciudadano rara vez conoce el término técnico exacto de la Clasificación de Niza. La instancia de Fuse se declaró fuera del ciclo de vida de React para evitar re-indexaciones costosas en cada pulsación de tecla.

### Errores y Soluciones
1. **WSL2 Permission Denied:**
   - *Problema:* Errores de permisos al intentar ejecutar scripts de Bun desde el volumen de Windows en WSL2.
   - *Solución:* Migración del proyecto íntegramente al sistema de archivos de Linux y configuración de variables de entorno locales para evitar conflictos de sistema.
2. **Hydration Mismatch en Portals:**
   - *Problema:* El renderizado de los Popovers del glosario causaba desincronización entre el servidor (SSR) y el cliente.
   - *Solución:* Implementación de un flag de montaje en un hook personalizado para asegurar que los componentes que usan Portals solo se rendericen tras la hidratación del cliente.

---

## [2026-04-17] - Frontend | Sprint 2: Optimización de Niza N2 y Refinamiento UX

### Contexto y objetivos
Este sprint marcó la evolución hacia el **Clasificador N2**, gatillado por los hallazgos cualitativos de la reunión con **Beatriz Olivares (Asesora de Marca en INAPI)**. La conclusión fue clara: el nombre de la marca no basta para clasificar; se requiere información sobre el producto/servicio. El foco fue optimizar el flujo de búsqueda inteligente y simplificar la carga cognitiva de los campos legales.

### Implementación técnica
- **Flujo de Búsqueda Optimizado (Niza N2):**
  - **Concatenación de Contexto:** Se rediseñó el hook `useClaseSugerida` para recibir tanto la `query` de búsqueda como el `rubro` seleccionado. El motor ahora busca sobre un string combinado, ponderando el rubro para forzar resultados de clases específicas (ej: "café" + "alimentos" -> Clase 30).
  - **Desestructuración y Operador OR:** Refactorización de la lógica de Fuse para utilizar búsquedas extendidas. Se implementó un operador lógico OR implícito entre términos desestructurados para cubrir variaciones como "software nube" o "aplicación digital".
  - **Búsqueda Fuzzy Ponderada:** Ajuste de pesos (`weights`) en Fuse.js: `descripcion` (0.5), `palabrasClave` (0.35) y `rubros` (0.15).
- **Cálculo de Tasas Dinámico (UTM a CLP):** Implementación de una constante global `UTM_VALOR` para proyectar el costo total de la solicitud en tiempo real basado en el número de clases seleccionadas.
- **Validación de Identidad (RUT):** Integración de un algoritmo de validación de RUT chileno (Módulo 11) con feedback visual inmediato en el componente `FormPersona`, diferenciando además entre personas naturales y jurídicas.
- **Selector de Rubro Visual:** Desarrollo del componente `SelectorRubro.tsx` con un grid de 8 categorías industriales para capturar la "segunda pregunta" sugerida por Beatriz de forma no intrusiva.
- **Humanización de Campos Legales:**
  - "Denominación" pasó a ser "Nombre de tu marca".
  - "Prioridad" se ocultó tras un toggle condicional, reduciendo el ruido visual para el 95% de los usuarios.
  - "Solicitante" se renombró a "¿Quién será el dueño?", con microcopy aclaratorio para evitar confusiones entre el llenador y el titular legal.

### 💡 Repaso técnico: `shouldFilter={false}` y el "Bug del Buscador Vacío"
Durante la integración de **shadcn/ui Command** con Fuse.js, se detectó que el componente `Command` filtraba los resultados de Fuse internamente, resultando en listas vacías. Fue imperativo setear `shouldFilter={false}` para permitir que Fuse.js sea el único motor de filtrado, delegando a `Command` únicamente la responsabilidad de renderizado y navegación por teclado.

### Errores y Soluciones
1. **Escrituras Fantasma en Firestore:**
   - *Problema:* Cada vez que se montaba la pantalla de clasificación, el `useEffect` detectaba un cambio en el objeto inicial (vacío) y creaba un documento en Firestore.
   - *Solución:* Implementación de un `useRef` llamado `isFirstRender` seteado en `true`. El efecto de guardado solo procede si la referencia es `false` y hay datos válidos (clases seleccionadas), cambiando a `false` tras el primer renderizado exitoso.
2. **Desincronización de Estados en el Stepper:**
   - *Problema:* Al navegar hacia atrás ("Anterior"), el estado de las secciones completadas se perdía o quedaba en naranja incorrectamente.
   - *Solución:* Centralización de la lógica de transición en una función pura `avanzarSecciones` dentro del hook `useSolicitud`. Se eliminó la manipulación manual de estados en los componentes de página.

---

## [2026-04-20] - Frontend | Sprint 3: Despliegue, Accesibilidad y Analítica Final

### Contexto y objetivos
Finalización del MVP para su despliegue estático y preparación para las pruebas de usabilidad con usuarios reales. El foco se desplazó hacia el cumplimiento de estándares de accesibilidad (A11Y), la configuración de analítica avanzada para el seguimiento de métricas y la optimización del build de producción para su alojamiento en GitHub Pages.

### Implementación técnica
- **Configuración de Static Export (GitHub Pages):** Ajuste de `next.config.ts` para habilitar `output: 'export'`, gestión de `basePath` para entornos de subdirectorio y optimización de imágenes nativas (`unoptimized: true`) para compatibilidad estática completa.
- **Integración de Analítica UX:** Inyección de scripts de **Microsoft Clarity** para mapas de calor/grabación de sesiones y **Google Analytics 4 (GA4)** para el seguimiento del funnel de conversión, permitiendo validar la reducción de drop-off planeada en el PRD.
- **Auditoría de Accesibilidad (A11Y):** Resolución de advertencias críticas en componentes de Radix UI (`Dialog`, `Tooltip`). Se aseguraron etiquetas `DialogTitle` y descripciones accesibles en todos los modales de confirmación y éxito.
- **Pantalla de Introducción (Landing):** Creación de la página raíz (`app/page.tsx`) que comunica las 3 oportunidades de intervención del MVP y anticipa los costos totales, preparando el modelo mental del usuario antes de iniciar el flujo.
- **Chat FAB & Soporte:** Integración de un Floating Action Button (FAB) para simular el acceso a soporte contextual durante el proceso de registro.

### 💡 Repaso técnico: Despliegue Estático vs App Router
El uso de `output: 'export'` en Next.js 16 con App Router requiere un manejo cuidadoso de las rutas. Se garantizó que todas las rutas dinámicas y assets se resuelvan correctamente bajo el `basePath` del repositorio, evitando errores de 404 al refrescar páginas profundas en GitHub Pages.

### Errores y Soluciones
1. **Fallas en el Build por Rutas Dinámicas:**
   - *Problema:* El build de producción fallaba al intentar generar páginas estáticas sin parámetros predefinidos para rutas opcionales.
   - *Solución:* Ajuste de la estructura de rutas para favorecer parámetros de búsqueda (query params) o rutas estáticas puras compatibles con el modelo de exportación de Next.js.
2. **Advertencias de Accesibilidad en Modales:**
   - *Problema:* Consola de desarrollo inundada por avisos de Radix UI indicando falta de títulos accesibles en los modales de éxito.
   - *Solución:* Refactorización de los componentes `Dialog` para incluir `DialogTitle` (incluso si se ocultan visualmente) cumpliendo con el estándar de lectores de pantalla.

---

## [2026-04-24] - Full Stack | Sprint 4: Optimización Institucional y Motor de Inteligencia

### Contexto y objetivos
El objetivo final del MVP fue elevar la fidelidad del portal a un estándar de producción institucional. Se eliminaron fricciones de navegación (landing de solicitud), se rediseñó el acceso de seguridad y se implementó el motor de "Pesquisa de Marca" para reducir el riesgo de rechazo legal.

### Implementación técnica
- **Rediseño de Autenticación:** Migración del modal de login a una `AuthPage` independiente. Se implementó una UI premium con placeholders institucionales ("Mail Usuario") y un acceso destacado para **Clave Única**, utilizando el sistema de diseño de 8px y sombras profundas.
- **Flujo de Registro Optimizado (4 Pasos):**
  - Se eliminó el "Paso 0" (Landing) para permitir un inicio inmediato del trámite.
  - El stepper se consolidó en 4 hitos críticos: Datos Titular, Pesquisa, Configuración de Marca y Revisión/Pago.
- **Motor de Pesquisa (Fuse.js):** Integración de un validador de marcas en `components/PesquisaMarca.tsx`. Utiliza una base de datos `marcas-mock.json` para calcular un porcentaje de similitud basado en denominación y descripción, alertando visualmente al usuario si su marca tiene alto riesgo de rechazo.
- **Asistente IA (Claude 3 Haiku):** Implementación de un endpoint API (`api/chat/route.ts`) que consume Anthropic para resolver dudas ciudadanas sobre la Clasificación de Niza y procesos legales en lenguaje cotidiano.
- **Sistema Visual (Inter):** Migración global de la familia tipográfica a **Inter** en `app/layout.tsx` y actualización de tokens en `DESIGN_SYSTEM.md` para cumplir con la identidad corporativa INAPI.

### 💡 Repaso técnico: Sanitización de Firestore
Se detectó un error crítico `FirebaseError: Function updateDoc() called with invalid data. Unsupported field value: undefined`. Para mitigarlo, se desarrolló la utilidad `sanitizeForFirestore` en el hook `useSolicitud`, la cual recorre el objeto de estado de forma recursiva y elimina cualquier propiedad con valor `undefined` (común en campos opcionales como el representante) antes de la persistencia.

### Errores y Soluciones
1. **Fallo de Hidratación en Analytics:**
   - *Problema:* El script de Microsoft Clarity causaba desincronización al inyectarse directamente en el HTML estático.
   - *Solución:* Creación del componente `ClarityScript.tsx` que utiliza `useEffect` para asegurar que la inyección ocurra únicamente en el lado del cliente y solo en entornos de producción.
2. **Error de Persistencia por Campos Vacíos:**
   - *Problema:* El formulario fallaba al intentar actualizar documentos de Firestore con campos de representante opcionales no definidos.
   - *Solución:* Implementación de un middleware de limpieza de datos previo a cada escritura, garantizando que solo datos primitivos válidos lleguen a la base de datos.

### Próximos Pasos
- **Integración API Real:** Reemplazar el mock de marcas por la API oficial de consulta de INAPI.
- **Pasarela de Pago:** Conexión con el portal de Tesorería para el pago de la primera tasa (1 UTM).
- **Auditoría de Ciberseguridad:** Validación de los flujos de Clave Única con el equipo de infraestructura.

---

*Documento v1.0 · Registro de Ingeniería · Proyecto GRI INAPI · Abril 2026*