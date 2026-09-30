import type { Metadata } from 'next'
import { CategorySection } from '@/components/tools/category-section'
import { categories } from '@/lib/tools/categories'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  title: 'Categorias de ferramentas fitness',
  description: 'Explore as categorias de calculadoras fitness do Métrica Fit.',
  path: '/categorias/',
})

export default function CategoriesPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 lg:py-16">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Métrica Fit</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Categorias de ferramentas fitness</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">Encontre a calculadora certa para seu objetivo, da alimentação à corrida.</p>
      </header>
      <div className="flex flex-col gap-12">
        {categories.map((category) => <CategorySection key={category.slug} category={category} />)}
      </div>
    </div>
  )
}

