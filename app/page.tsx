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
      <section className="relative overflow-hidden border-b border-primary/25 bg-background/75">
        <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-[radial-gradient(circle_at_70%_40%,oklch(0.45_0.16_210/0.18),transparent_58%)]" aria-hidden="true" />
        <div className="pointer-events-none absolute right-8 top-10 hidden h-64 w-64 rounded-full border border-primary/20 md:block" aria-hidden="true" />
        <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-16 sm:px-6 lg:py-24">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-[0.24em] text-primary uppercase"><span className="size-2 rounded-full bg-primary shadow-[0_0_16px_oklch(0.78_0.17_205/0.9)]" aria-hidden="true" />Sistema ativo <span className="text-muted-foreground/70">/ MF-01</span></p>
          <h1 className="max-w-3xl text-4xl font-bold tracking-tight text-balance sm:text-6xl">Dados melhores.<br /><span className="text-primary">Treinos mais inteligentes.</span></h1>
          <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">Ferramentas de precisão para transformar seus dados em decisões melhores sobre calorias, composição corporal, musculação e corrida.</p>
          <Link href="/ferramentas/" className="inline-flex w-fit items-center gap-3 border border-primary/50 bg-primary/10 px-5 py-3 text-sm font-semibold text-primary transition-colors hover:bg-primary/20">
            Acessar painel de ferramentas
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

