import type { Metadata } from 'next'
import { ArrowDown, Calculator, ShieldCheck, Sparkles } from 'lucide-react'
import { CategorySection } from '@/components/tools/category-section'
import { categories } from '@/lib/tools/categories'
import { tools } from '@/lib/tools/registry'
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
    <div className="tools-hub mx-auto flex w-full max-w-6xl flex-col gap-10 px-4 py-8 sm:px-6 lg:py-12">
      <header className="tools-hero relative overflow-hidden rounded-3xl border border-primary/25 p-6 sm:p-10 lg:p-14">
        <div className="relative z-10 max-w-2xl">
          <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-primary uppercase"><Sparkles className="size-4" aria-hidden="true" /> FIQUE FIT // FERRAMENTAS</p>
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Seu próximo nível começa com <span className="text-primary">dados claros.</span></h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Calculadoras gratuitas para entender seu corpo, ajustar sua rotina e treinar com mais confiança.</p>
          <a href="#categorias" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">Explorar ferramentas <ArrowDown className="size-4" aria-hidden="true" /></a>
        </div>
        <div className="tools-hero-orbit" aria-hidden="true"><Calculator className="size-16 text-primary" /><span>PRECISÃO</span><span>PROGRESSO</span></div>
      </header>

      <section className="tools-stats" aria-label="Resumo das ferramentas">
        <div><strong>{tools.length}</strong><span>ferramentas gratuitas</span></div><div><strong>{categories.length}</strong><span>áreas do seu treino</span></div><div><ShieldCheck className="size-5 text-primary" /><span>sem cadastro e sem envio de dados</span></div>
      </section>

      <div id="categorias" className="flex scroll-mt-24 flex-col gap-12">
        {categories.map((category) => (<CategorySection key={category.slug} category={category} showLink={false} />))}
      </div>
    </div>
  )
}
