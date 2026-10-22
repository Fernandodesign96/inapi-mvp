'use client'

import { motion, useReducedMotion } from 'framer-motion'
import { cn } from '@/lib/utils'

/** Entrada progresiva al hacer scroll; estática con prefers-reduced-motion. */
export function Reveal({
  children,
  className,
  delay = 0,
  as = 'div',
}: {
  children: React.ReactNode
  className?: string
  delay?: number
  as?: 'div' | 'li'
}) {
  const reduce = useReducedMotion()
  if (reduce) {
    const Tag = as
    return <Tag className={className}>{children}</Tag>
  }
  const MotionTag = as === 'li' ? motion.li : motion.div
  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -12% 0px' }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}
