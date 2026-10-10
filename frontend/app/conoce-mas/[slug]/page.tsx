import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PortalShell } from '@/components/layout/PortalShell'
import { ContainerGRI } from '@/components/layout/ContainerGRI'
import { PortalMain, PortalProse, PortalSectionTitle } from '@/components/portal/content'
import { CONOCE_MAS_ARTICULOS } from '@/lib/conoce-mas-articulos'

export function generateStaticParams() {
  return CONOCE_MAS_ARTICULOS.map(item => ({ slug: item.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const article = CONOCE_MAS_ARTICULOS.find(item => item.slug === slug)
  return {
    title: `${article?.title ?? 'Conoce más'} — INAPI`,
    description: article?.body[0],
  }
}

export default async function ConoceMasArticuloPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = CONOCE_MAS_ARTICULOS.find(item => item.slug === slug)
  if (!article) notFound()

  return (
    <PortalShell
      variant="page"
      active="conoce"
      pageTitle={article.title}
      breadcrumbs={[{ label: 'Conoce más', href: '/conoce-mas' }, { label: article.title }]}
    >
      <ContainerGRI size="portal">
        <PortalMain>
          <PortalSectionTitle>{article.title}</PortalSectionTitle>
          {article.body.map(p => (
            <PortalProse key={p}>{p}</PortalProse>
          ))}
          <p>
            <a href={article.official} className="font-medium text-gob-link hover:underline" target="_blank" rel="noopener noreferrer">
              Ver esta ficha en inapi.cl
            </a>
          </p>
        </PortalMain>
      </ContainerGRI>
    </PortalShell>
  )
}
