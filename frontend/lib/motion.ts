import type { Variants } from 'framer-motion'

/** Figma Gentle / desaceleración suave */
export const easeGentle = [0.22, 1, 0.36, 1] as const

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: easeGentle },
  },
}

export const fadeIn: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.4 } },
}

export const staggerChildren: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
}

export const cardHover = {
  rest: { y: 0, scale: 1 },
  hover: {
    y: -6,
    scale: 1.012,
    transition: { duration: 0.45, ease: easeGentle },
  },
}
