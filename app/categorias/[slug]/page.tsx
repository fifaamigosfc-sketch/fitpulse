import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { CategorySection } from '@/components/tools/category-section'
import { categories, findCategory } from '@/lib/tools/categories'
import { categoryPath } from '@/lib/tools/registry'
import { buildMetadata } from '@/lib/seo'

type Props = { params: Promise<{ slug: string }> }

export const dynamicParams = false
export function generateStaticParams() { return categories.map(({ slug }) => ({ slug })) }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const category = findCategory(slug)
  if (!category) return {}
  return buildMetadata({ title: `${category.name} | Ferramentas fitness`, description: category.intro, path: categoryPath(category.slug) })
}

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params
  const category = findCategory(slug)
  if (!category) notFound()
  const Icon = category.icon
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-10 sm:px-6 lg:py-16">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <Link href="/" className="hover:text-primary hover:underline">Início</Link><span aria-hidden="true"> / </span><Link href="/categorias/" className="hover:text-primary hover:underline">Categorias</Link><span aria-hidden="true"> / </span><span>{category.name}</span>
      </nav>
      <header className="flex max-w-3xl flex-col gap-4">
        <span className="flex size-10 items-center justify-center rounded-xl bg-primary/10 text-primary" aria-hidden="true"><Icon className="size-5" /></span>
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Categoria</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{category.name}</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">{category.intro}</p>
      </header>
      <CategorySection category={category} showLink={false} />
      <aside className="rounded-2xl border bg-card p-6">
        <h2 className="text-xl font-bold tracking-tight">Explore outras categorias</h2>
        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
          {categories.filter((item) => item.slug !== category.slug).map((item) => <Link key={item.slug} href={categoryPath(item.slug)} className="text-sm font-medium text-primary hover:underline">{item.name}</Link>)}
        </div>
      </aside>
    </div>
  )
}
