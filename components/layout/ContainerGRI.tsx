import { cn } from '@/lib/utils'

type ContainerGRIProps = {
  children: React.ReactNode
  /** Ancho máximo según grilla kit §7 */
  size?: 'fluid' | 'tablet' | 'desktop'
  className?: string
  as?: 'div' | 'main' | 'section'
}

/**
 * Contenedor de layout alineado a la grilla UI Kit v3.0.1.
 * - Mobile (0–599): margen 16px, ancho fluido
 * - Tablet (905+): max 840px
 * - Desktop (1440+): max 1040px
 */
export function ContainerGRI({
  children,
  size = 'desktop',
  className,
  as: Component = 'div',
}: ContainerGRIProps) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-gob-4',                          // 16px margen mobile
        'min-[600px]:px-gob-5',                             // 24px tablet pequeña
        size === 'tablet' && 'max-w-[var(--container-gob-tablet)]',
        size === 'desktop' && 'max-w-[var(--container-gob-desktop)]',
        className,
      )}
    >
      {children}
    </Component>
  )
}