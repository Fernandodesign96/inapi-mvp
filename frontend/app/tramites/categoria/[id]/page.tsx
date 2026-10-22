import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { CategoryView } from '@/components/tramites/TramitesDashboard'
import { TRAMITES_CATEGORIES, categoryById } from '@/lib/tramites/dashboard'

export function generateStaticParams() {
  return TRAMITES_CATEGORIES.map(cat => ({ id: cat.id }))
}

export const dynamicParams = false

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params
  const category = categoryById(id)
  return {
    title: `${category?.label ?? 'Trámites'} — Portal de trámites INAPI`,
    description: category?.description,
  }
}

export default async function TramitesCategoriaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const category = categoryById(id)
  if (!category) notFound()
  return <CategoryView id={category.id} />
}
