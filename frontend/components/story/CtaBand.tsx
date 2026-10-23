import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { EyebrowPill } from '@/components/story/EyebrowPill'
import { GuillocheBg, PiSeal } from '@/components/story/PiSeal'
import { Reveal } from '@/components/story/Reveal'
import { StoryCta, type StoryCtaProps } from '@/components/story/StoryCta'

type Cta = Pick<StoryCtaProps, 'href' | 'label'>

export function CtaBand({
  eyebrow,
  title,
  body,
  primary,
  secondary,
  extras,
  seal = { center: 'R', caption: 'REGISTRO' },
}: {
  eyebrow?: string
  title: string
  body?: React.ReactNode
  primary: Cta
  secondary?: Cta
  extras?: Cta[]
  seal?: { center: string; caption?: string }
}) {
  return (
    <section className="story-paper py-gob-8 min-[905px]:py-20" aria-label={title}>
      <ContainerGRI size="portal">
        <Reveal className="story-night relative overflow-hidden rounded-[2rem] px-gob-5 py-gob-7 shadow-elevation-05 min-[905px]:px-gob-8 min-[905px]:py-16">
          <GuillocheBg className="text-white opacity-60" />
          <div className="relative flex flex-col items-start gap-gob-6 min-[905px]:flex-row min-[905px]:items-center min-[905px]:justify-between">
            <div className="flex max-w-2xl flex-col items-start gap-gob-4">
              {eyebrow ? <EyebrowPill tone="night">{eyebrow}</EyebrowPill> : null}
              <h2 className="portal-h2 text-balance text-white">{title}</h2>
              {body ? <p className="text-gri-body leading-[1.6] text-white/82 min-[600px]:text-[1.125rem]">{body}</p> : null}
              <div className="mt-gob-2 flex flex-wrap gap-gob-3">
                <StoryCta {...primary} tone="night" />
                {secondary ? <StoryCta {...secondary} tone="night" variant="secondary" /> : null}
                {extras?.map(extra => (
                  <StoryCta key={extra.href} {...extra} tone="night" variant="secondary" />
                ))}
              </div>
            </div>
            <PiSeal center={seal.center} caption={seal.caption} size={168} className="hidden text-white/55 min-[905px]:block" />
          </div>
        </Reveal>
      </ContainerGRI>
    </section>
  )
}
