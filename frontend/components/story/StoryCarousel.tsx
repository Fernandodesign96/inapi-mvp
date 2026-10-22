'use client'

import { Children, useCallback, useEffect, useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from '@/components/ui/carousel'
import { useI18n } from '@/lib/i18n/LocaleProvider'
import { cn } from '@/lib/utils'

export function StoryCarousel({
  label,
  children,
  itemClassName = 'basis-[86%] min-[600px]:basis-1/2 min-[1100px]:basis-1/3',
  tone = 'paper',
  footer,
  className,
}: {
  label: string
  children: React.ReactNode
  itemClassName?: string
  tone?: 'night' | 'paper' | 'mist'
  footer?: React.ReactNode
  className?: string
}) {
  const { tx } = useI18n()
  const [api, setApi] = useState<CarouselApi>()
  const [selected, setSelected] = useState(0)
  const [snaps, setSnaps] = useState<number[]>([])
  const [canPrev, setCanPrev] = useState(false)
  const [canNext, setCanNext] = useState(false)
  const night = tone === 'night'
  const items = Children.toArray(children)

  const sync = useCallback((a: NonNullable<CarouselApi>) => {
    setSelected(a.selectedScrollSnap())
    setSnaps(a.scrollSnapList())
    setCanPrev(a.canScrollPrev())
    setCanNext(a.canScrollNext())
  }, [])

  useEffect(() => {
    if (!api) return
    const frame = requestAnimationFrame(() => sync(api))
    api.on('select', sync)
    api.on('reInit', sync)
    return () => {
      cancelAnimationFrame(frame)
      api.off('select', sync)
      api.off('reInit', sync)
    }
  }, [api, sync])

  const navBtn = cn(
    'inline-flex size-11 items-center justify-center rounded-full border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus disabled:cursor-not-allowed disabled:opacity-40',
    night ? 'border-white/25 text-white hover:bg-white/10' : 'border-gob-border-strong bg-card text-gob-text hover:border-gob-primary',
  )

  return (
    <div className={cn('flex flex-col gap-gob-5', className)}>
      <Carousel setApi={setApi} opts={{ align: 'start' }} aria-label={tx(label)}>
        <CarouselContent className="-ml-gob-4 min-[905px]:-ml-gob-5">
          {items.map((child, i) => (
            <CarouselItem
              key={i}
              aria-label={`${i + 1} ${tx('de')} ${items.length}`}
              className={cn('pl-gob-4 min-[905px]:pl-gob-5', itemClassName)}
            >
              {child}
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
      <div className="flex flex-wrap items-center justify-between gap-gob-4">
        <div className="flex items-center gap-gob-2" role="group" aria-label={tx('Ir a la diapositiva')}>
          {snaps.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              aria-label={`${tx('Ir a la diapositiva')} ${i + 1}`}
              aria-current={i === selected ? 'true' : undefined}
              className={cn(
                'h-2.5 rounded-full transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
                i === selected ? 'w-8 bg-inapi-header' : night ? 'w-2.5 bg-white/30 hover:bg-white/60' : 'w-2.5 bg-gob-border-strong hover:bg-gob-primary/50',
              )}
            />
          ))}
        </div>
        <div className="flex items-center gap-gob-3">
          {footer}
          <button type="button" className={navBtn} onClick={() => api?.scrollPrev()} disabled={!canPrev} aria-label={tx('Anterior')}>
            <ChevronLeft className="size-5" aria-hidden />
          </button>
          <button type="button" className={navBtn} onClick={() => api?.scrollNext()} disabled={!canNext} aria-label={tx('Siguiente')}>
            <ChevronRight className="size-5" aria-hidden />
          </button>
        </div>
      </div>
    </div>
  )
}
