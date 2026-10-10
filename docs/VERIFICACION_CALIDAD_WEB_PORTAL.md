# Verificación — Dimensiones 1 y 2 (portal informativo)

Fecha: 2026-10-09. Alcance: homepage, `/marcas`, `/patentes`, `/tramites-digitales`, `/marcas/buscadores` y chrome (header/footer). Códigos del Checklist Editorial INAPI (C1–C48, U1–U34). Leyenda: **C** cumple · **N/A** no aplica en esta URL · **P** pendiente de dato oficial (peso de PDF real, Lighthouse en producción).

## Resumen por URL

| Criterio | Home | Marcas | Patentes | Trámites digitales | Buscadores |
| --- | --- | --- | --- | --- | --- |
| C1–C3 Ortografía | C | C | C | C | C |
| C4–C9 Lenguaje plano | C | C | C | C | C |
| C10 Título fiel | C | C | C | C | C |
| C11 Sin “en construcción” | C | C | C | C | C |
| C12 Datos clave | C | C | C | C | C |
| C13 Autonomía del trámite | C | C | C | C | N/A |
| C14–C19 Claridad / FAQ | C | C | C | C | C |
| C20–C25 Concisión | C | C | C | C | C |
| C26–C27 Fuente y fecha | C | C | C | C | C |
| C33–C35 Legibilidad | C | C | C | C | C |
| C36–C44 Escritura web / CTAs | C | C | C | C | C |
| C43–C44 PDF con metadatos | C | C | C | N/A | N/A |
| C48 Apoyo visual (ícono+cifra) | C | C | C | N/A | N/A |
| U1–U9 Coherencia / UI Kit | C | C | C | C | C |
| U10 CTAs destacados | C | C | C | C | C |
| U11–U16 Errores | N/A | N/A | N/A | N/A | C |
| U17–U20 Modales | C | C | C | C | C |
| U22 Zonas delimitadas | C | C | C | C | C |
| U23–U28 Avance / retroceso | C | C | C | C | C |
| U29 Favicon | C | C | C | C | C |
| U30–U32 Ayuda en contexto | C | C | C | C | C |
| U33–U34 Filtros | N/A | N/A | N/A | N/A | C |

Criterios C28–C32, C45–C47, C49–C51 y U21 no están en el recorte Dimensiones 1–2 usado en esta oleada (el PDF interno numera C1–C48 y U1–U34). U33 se cubre en el buscador de similitud (clase / paginación).

## Patrones prohibidos

| Patrón | Estado |
| --- | --- |
| Hamburguesa en desktop (≥768 px) | Corregido: `min-[768px]` muestra nav |
| Noticias above the fold | Novedades debajo de acciones ciudadanas |
| ALL CAPS en párrafos / kickers del portal | Kickers en sentence case |
| CTAs “Ver más” / “Acceder” / “Haga clic aquí” | Reemplazados por verbos descriptivos |
| Términos PI sin definir | Glosario: Niza, UTM, oposición, PCT, representante |
| PDF sin formato/peso | `PortalPdfLink` |
| Autoplay | Carrusel de observancia sigue siendo manual |
| `prefers-reduced-motion` | Cubierto en `globals.css` |

## Performance (Fase 6)

| Métrica | Meta | Nota |
| --- | --- | --- |
| LCP | ≤ 2,5 s | Hero WebP `inapi-banner.webp` (~90 KB) |
| INP | ≤ 200 ms | Sin scripts bloqueantes nuevos above the fold |
| CLS | ≤ 0,1 | `fill` + `sizes` en el banner; overlay absoluto |
| Contraste AA | 4,5:1 texto | Overlay del hero reforzado; `muted-foreground` `#4B5563` |
| Foco | ≥ 3:1 | `--gob-focus`; skip link existente |

Medición Lighthouse/axe en producción: **P**. Recorrido local de las cinco URLs y vista &lt;768 px / desktop: ver sesión de verificación en browser.
