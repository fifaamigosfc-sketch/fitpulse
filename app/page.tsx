import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { CategorySection } from '@/components/tools/category-section'
import { ToolCard } from '@/components/tools/tool-card'
import { categories } from '@/lib/tools/categories'
import { tools } from '@/lib/tools/registry'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Ferramentas Fitness Gratuitas',
  description: siteConfig.description,
  alternates: {
    canonical: `${siteConfig.url}/`,
  },
}

const featuredTools = tools.slice(0, 3)

export default function Page() {
  return (
    <div className="flex flex-col gap-16 pb-16">
      <section className="relative overflow-hidden border-b border-primary/15 bg-background/80">
        <div className="pointer-events-none absolute -right-24 top-8 size-80 rounded-full bg-primary/10 blur-3xl" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:py-24">
          <p className="flex items-center gap-2 text-sm font-semibold tracking-[0.18em] text-primary uppercase"><span className="size-2 rounded-full bg-primary shadow-[0_0_12px_oklch(0.82_0.19_132/0.8)]" aria-hidden="true" />Métrica Fit <span className="text-muted-foreground/70">/ 01</span></p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl">Ferramentas Fitness Gratuitas</h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Calculadoras gratuitas para calorias, nutrição, composição corporal, musculação e corrida — sem cadastro e com resultados fáceis de entender.
          </p>
          <Link href="/ferramentas/" className="inline-flex w-fit items-center gap-2 font-semibold text-primary hover:underline">
            Ver todas as ferramentas
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6" aria-labelledby="principais-ferramentas">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div className="flex flex-col gap-2">
            <p className="text-sm font-semibold tracking-wide text-primary uppercase">Comece por aqui</p>
            <h2 id="principais-ferramentas" className="text-2xl font-bold tracking-tight">Principais ferramentas</h2>
          </div>
          <Link href="/ferramentas/" className="text-sm font-medium text-primary hover:underline">Explorar todas</Link>
        </div>
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {featuredTools.map((tool) => (
            <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>
          ))}
        </ul>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">
        {categories.map((category) => (
          <CategorySection key={category.slug} category={category} />
        ))}
      </div>
    </div>
  )
}

