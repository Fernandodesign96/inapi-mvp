# Migración de tokens — Fase 0

## Archivos con hex hardcodeado (orden de prioridad)

| Prioridad | Archivo | Ocurrencias aprox. | Fase |
|-----------|---------|-------------------|------|
| 1 | components/StepperSolicitud.tsx | 15 | 5 |
| 2 | app/solicitud/page.tsx | 40+ | 6 |
| 3 | app/page.tsx | 20+ | 6 |
| 4 | components/PesquisaMarca.tsx | 15 | 5 |
| 5 | components/layout/ChatFAB.tsx | 15 | 6 |
| 6 | app/auth/page.tsx | 8 | 6 |
| 7 | components/layout/HeaderINAPI.tsx | 3 | 4 |
| 8 | components/layout/FooterINAPI.tsx | 1 | 4 |
| 9 | app/globals.css | 6 (legacy INAPI) | 1 |

## Regla de reemplazo

| Si encuentras | Reemplazar por (clase Tailwind) |
|---------------|--------------------------------|
| `bg-[#1A56DB]` | `bg-gob-primary` |
| `hover:bg-[#1E3A8A]` | `hover:bg-gob-primary-dark` |
| `text-[#111827]` | `text-gob-text` |
| `border-[#E5E7EB]` | `border-gob-border` |
| `bg-[#F3F4F6]` | `bg-gob-surface-elevated` |
| `focus:ring-[#1A56DB]` | `focus-gob` o `focus-visible:ring-gob-focus` |
| `rounded-2xl` (en cards) | `rounded-gob-lg` (16px) |
| `shadow-sm` (cards) | `shadow-elevation-02` |
| `p-5` / `p-6` arbitrario | `p-gob-5` (24px) / `p-gob-6` (36px) según contexto |

## Excepciones documentadas

- Header rojo `#FF4134` → `--inapi-header` / `bg-inapi-header` (marca INAPI, no GOB)
- Barra azul `#005fff` → `--inapi-header-sub` (sub-header INAPI)