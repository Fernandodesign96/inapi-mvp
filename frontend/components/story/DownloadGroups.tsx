import { Download, FileArchive, FileText } from 'lucide-react'
import { BentoCard, BentoGrid } from '@/components/story/Bento'
import { SectionAccordion } from '@/components/story/SectionAccordion'
import { StoryCarousel } from '@/components/story/StoryCarousel'
import type { DownloadDoc, DownloadGroup } from '@/lib/downloadable-docs'

function DocCard({ doc }: { doc: DownloadDoc }) {
  const Icon = doc.format === 'ZIP' ? FileArchive : FileText
  return (
    <BentoCard
      icon={<Icon />}
      eyebrow={`${doc.format} · ${doc.size}`}
      title={`${doc.code}: ${doc.title}`}
      href={doc.href}
      cta="Descargar en inapi.cl"
    >
      <p className="mt-gob-2 inline-flex items-center gap-gob-2 text-gri-body-sm text-muted-foreground">
        <Download className="size-4" aria-hidden />
        Formato {doc.format}. El peso exacto se confirma al descargar el archivo oficial.
      </p>
    </BentoCard>
  )
}

export function DownloadGroups({ groups }: { groups: DownloadGroup[] }) {
  return (
    <SectionAccordion
      items={groups.map(group => ({
        id: group.id,
        title: group.title,
        summary: group.lead,
        icon: <FileText />,
        content: (
          <StoryCarousel label={group.title} arrows="sides" itemClassName="basis-[90%] min-[600px]:basis-1/2 min-[1100px]:basis-1/3">
            {group.items.map(doc => (
              <DocCard key={`${doc.code}-${doc.title}`} doc={doc} />
            ))}
          </StoryCarousel>
        ),
      }))}
    />
  )
}

export function DownloadGrid({ items }: { items: DownloadDoc[] }) {
  return (
    <BentoGrid cols={3}>
      {items.map(doc => (
        <DocCard key={`${doc.code}-${doc.title}`} doc={doc} />
      ))}
    </BentoGrid>
  )
}
