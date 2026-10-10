import { cn } from '@/lib/utils'

type ContainerGRIProps = {
  children: React.ReactNode
  /** Ancho máximo según grilla kit §7; `portal` y `wide` = 1600px (alineado al header) */
  size?: 'fluid' | 'tablet' | 'desktop' | 'portal' | 'wide'
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
        'mx-auto w-full px-gob-4',
        'min-[600px]:px-gob-5',
        size === 'fluid' && 'max-w-none',
        size === 'tablet' &&
          'min-[905px]:max-w-[var(--container-gob-tablet)]',
        size === 'desktop' &&
          'min-[905px]:max-w-[var(--container-gob-tablet)] min-[1440px]:max-w-[var(--container-gob-desktop)]',
        (size === 'portal' || size === 'wide') && 'max-w-[1600px] min-[905px]:px-gob-8',
        className,
      )}
    >
      {children}
    </Component>
  )
}