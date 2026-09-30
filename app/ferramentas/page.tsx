import type { Metadata } from 'next'
import { CategorySection } from '@/components/tools/category-section'
import { categories } from '@/lib/tools/categories'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Calculadoras e Ferramentas Fitness',
  description:
    'Encontre calculadoras gratuitas para calorias, nutrição, composição corporal, musculação e corrida.',
  alternates: {
    canonical: `${siteConfig.url}/ferramentas/`,
  },
}

export default function ToolsPage() {
  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-12 sm:px-6 lg:py-16">
      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Métrica Fit</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Calculadoras e Ferramentas Fitness</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">
          Explore todas as nossas ferramentas gratuitas para acompanhar sua alimentação, composição corporal e evolução nos treinos.
        </p>
      </header>

      <div className="flex flex-col gap-12">
        {categories.map((category) => (
          <CategorySection key={category.slug} category={category} showLink={false} />
        ))}
      </div>
    </div>
  )
}
