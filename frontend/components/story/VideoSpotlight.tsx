import { Layers, Lightbulb, MonitorPlay, Stamp } from 'lucide-react'
import { StorySection } from '@/components/story/StorySection'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import { Reveal } from '@/components/story/Reveal'
import { VideoCard } from '@/components/story/VideoCard'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import type { StoryTone } from '@/components/story/EyebrowPill'
import { INAPI_VIDEOS, INAPI_YOUTUBE_CHANNEL, type InapiVideoKey } from '@/lib/inapi-videos'
import { cn } from '@/lib/utils'

/** Banda con un video embebido y su explicación en 3 puntos. */
export function VideoSpotlight({
  video,
  eyebrow = 'En video',
  title,
  lead,
  points,
  tone = 'mist',
  reverse = false,
  id,
}: {
  video: InapiVideoKey
  eyebrow?: string
  title: string
  lead?: string
  points: { title: string; body: string }[]
  tone?: StoryTone
  reverse?: boolean
  id?: string
}) {
  const night = tone === 'night'
  return (
    <StorySection tone={tone} id={id}>
      <div className={cn('grid items-center gap-gob-7 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]', reverse && 'min-[1100px]:[&>*:first-child]:order-2')}>
        <Reveal>
          <VideoCard video={video} tone={night ? 'night' : 'paper'} showText={false} size="lg" />
        </Reveal>
        <Reveal delay={0.1} className="flex flex-col gap-gob-5">
          <span
            className={cn(
              'inline-flex w-fit items-center gap-gob-2 rounded-full border px-gob-3 py-gob-1 text-gri-body-xs font-semibold uppercase tracking-[0.08em]',
              night ? 'border-white/20 bg-white/8 text-white' : 'border-gob-border bg-card text-gob-text',
            )}
          >
            <MonitorPlay className="size-4 text-inapi-header" aria-hidden />
            {eyebrow}
          </span>
          <h2 className={cn('portal-h2 text-balance', night ? 'text-white' : 'text-gob-text')}>{title}</h2>
          {lead ? <p className={cn('text-gri-body leading-[1.6]', night ? 'text-white/82' : 'text-muted-foreground')}>{lead}</p> : null}
          <ol className="flex flex-col gap-gob-3">
            {points.map((p, i) => (
              <li
                key={p.title}
                className={cn('flex gap-gob-4 rounded-gob-lg p-gob-4', night ? 'story-glass' : 'border border-gob-border bg-card shadow-elevation-01')}
              >
                <span
                  aria-hidden
                  className="story-tabular inline-flex size-8 shrink-0 items-center justify-center rounded-full bg-inapi-header font-heading text-gri-body-sm font-semibold text-white"
                >
                  {i + 1}
                </span>
                <div className="space-y-0.5">
                  <p className={cn('font-medium', night ? 'text-white' : 'text-gob-text')}>{p.title}</p>
                  <p className={cn('text-gri-body-sm leading-[1.55]', night ? 'text-white/78' : 'text-muted-foreground')}>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
      </div>
    </StorySection>
  )
}

/** Carrusel de videos con el enlace al canal como pie. */
export function VideoGallery({
  videos,
  title = 'Aprende en video',
  lead,
  tone = 'paper',
}: {
  videos: InapiVideoKey[]
  title?: string
  lead?: string
  tone?: StoryTone
}) {
  const night = tone === 'night'
  return (
    <StorySection tone={tone} eyebrow="Videos INAPI" title={title} lead={lead}>
      <StoryCarousel
        label={title}
        tone={tone}
        footer={
          <a
            href={INAPI_YOUTUBE_CHANNEL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'mr-gob-2 inline-flex min-h-11 items-center gap-gob-2 text-gri-body-sm font-medium underline-offset-4 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gob-focus',
              night ? 'text-white' : 'text-gob-link',
            )}
          >
            <MonitorPlay className="size-4 text-inapi-header" aria-hidden />
            Canal de INAPI en YouTube
            <span className="sr-only">(se abre en una pestaña nueva)</span>
          </a>
        }
      >
        {videos.map(v => (
          <VideoCard key={v} video={v} tone={night ? 'night' : 'paper'} />
        ))}
      </StoryCarousel>
    </StorySection>
  )
}

const SHOWCASE_VIDEOS: InapiVideoKey[] = [
  'solicitarMarca',
  'tramitarPatente',
  'queEsPatente',
  'costosPatente',
  'selloOrigen',
  'cuentaPublica',
]

const SHOWCASE_POINTS = [
  {
    id: 'marca',
    title: 'La marca identifica',
    summary: 'Protege el nombre, el logo o el signo con el que te reconocen tus clientes.',
    icon: <Stamp />,
    bullets: [
      'El nombre, logo o eslogan de mi negocio o producto.',
      'Protege el nombre, el logo o el signo con el que te reconocen tus clientes.',
    ],
  },
  {
    id: 'patente',
    title: 'La patente protege una invención',
    summary: 'Cubre un producto o un procedimiento nuevo que resuelve un problema técnico.',
    icon: <Lightbulb />,
    bullets: [
      'Una invención, mecanismo, fórmula o proceso técnico.',
      'Cubre un producto o un procedimiento nuevo que resuelve un problema técnico.',
    ],
  },
  {
    id: 'juntas',
    title: 'Pueden ir juntas',
    summary: 'Un producto innovador puede tener una patente por cómo funciona y una marca por su nombre.',
    icon: <Layers />,
    bullets: [
      'Cuando necesitas una marca, cuándo una patente y cuándo ambas.',
      'Un producto innovador puede tener una patente por cómo funciona y una marca por su nombre.',
    ],
  },
]

/** Home: video principal, tres cards a la derecha y seis barras debajo. */
export function VideoShowcase({
  video = 'patenteVsMarca',
  title,
  lead,
  tone = 'paper',
}: {
  video?: InapiVideoKey
  title: string
  lead?: string
  tone?: StoryTone
}) {
  const night = tone === 'night'
  const v = INAPI_VIDEOS[video]
  const leftVideos = SHOWCASE_VIDEOS.slice(0, 3)
  const rightVideos = SHOWCASE_VIDEOS.slice(3)
  return (
    <StorySection tone={tone} eyebrow="En video" title={title} lead={lead} align="left">
      <div className="grid items-stretch gap-gob-5 min-[1100px]:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)]">
        <Reveal className="flex h-full flex-col gap-gob-4">
          <VideoCard video={video} tone={night ? 'night' : 'paper'} showText={false} size="lg" />
          <div>
            <h3 className={cn('font-heading text-gri-h2 font-medium', night ? 'text-white' : 'text-gob-text')}>{v.title}</h3>
            <p className={cn('mt-gob-1 text-gri-body-sm leading-[1.55]', night ? 'text-white/78' : 'text-muted-foreground')}>{v.description}</p>
          </div>
        </Reveal>
        <Reveal delay={0.08} className="flex h-full min-h-0">
          <SectionAccordion
            className="flex h-full flex-1 flex-col [&>*]:flex-1"
            tone={night ? 'night' : 'paper'}
            items={SHOWCASE_POINTS.map(point => ({
              id: point.id,
              title: point.title,
              summary: point.summary,
              icon: point.icon,
              content: (
                <ul>
                  {point.bullets.map(bullet => (
                    <li key={bullet}>{bullet}</li>
                  ))}
                </ul>
              ),
            }))}
          />
        </Reveal>
      </div>
      <div className="mt-gob-6 grid gap-gob-4 min-[905px]:grid-cols-2">
        {[leftVideos, rightVideos].map((column, i) => (
          <SectionAccordion
            key={i}
            tone={night ? 'night' : 'paper'}
            items={column.map(key => {
              const item = INAPI_VIDEOS[key]
              return {
                id: key,
                title: item.title,
                summary: item.description,
                icon: <MonitorPlay />,
                content: <VideoCard video={key} tone={night ? 'night' : 'paper'} showText={false} />,
              }
            })}
          />
        ))}
      </div>
    </StorySection>
  )
}
