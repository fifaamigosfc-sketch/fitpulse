import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowDown, ArrowRight, Calculator, ShieldCheck, Sparkles } from 'lucide-react'
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
const quickTools = tools.slice(3, 7)

export default function Page() {
  return (
    <div className="flex flex-col gap-10 pb-16">
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:pt-12" aria-labelledby="hero-title">
        <div className="tools-home-hero relative overflow-hidden rounded-3xl border border-primary/25 p-6 sm:p-10 lg:p-14">
          <div className="relative z-10 max-w-2xl">
            <p className="mb-4 inline-flex items-center gap-2 text-xs font-bold tracking-[0.18em] text-primary uppercase"><Sparkles className="size-4" aria-hidden="true" /> FIQUE FIT // FERRAMENTAS</p>
            <h1 id="hero-title" className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">Seu próximo nível começa com <span className="text-primary">dados claros.</span></h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">Calculadoras gratuitas para entender seu corpo, ajustar sua rotina e treinar com mais confiança.</p>
            <a href="#principais-ferramentas" className="mt-7 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 text-sm font-bold text-primary-foreground transition-transform hover:-translate-y-0.5">Explorar ferramentas <ArrowDown className="size-4" aria-hidden="true" /></a>
          </div>
          <div className="tools-hero-orbit" aria-hidden="true"><Calculator className="size-16 text-primary" /><span>PRECISÃO</span><span>PROGRESSO</span></div>
        </div>
        <section className="tools-stats" aria-label="Resumo das ferramentas">
          <div><strong>{tools.length}</strong><span>ferramentas gratuitas</span></div><div><strong>{categories.length}</strong><span>áreas do seu treino</span></div><div><ShieldCheck className="size-5 text-primary" /><span>sem cadastro e sem envio de dados</span></div>
        </section>
      </section>

      <section className="mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="team-hiit-ad-title">
        <a
          href="https://teamhiit.com.br"
          className="hud-ad-slot hud-team-hiit-ad"
          aria-label="Conheça o Team HIIT — Entre em forma do seu jeito"
        >
          <div className="hud-team-hiit-logo-wrap">
            <img
              src="/team-hiit-logo.png"
              alt="Team HIIT"
              className="hud-team-hiit-logo"
            />
          </div>
          <div className="hud-team-hiit-copy">
            <h2 id="team-hiit-ad-title">Entre em forma do seu jeito.</h2>
            <p className="hud-team-hiit-description">Treinos rápidos, intensos e adaptados à sua rotina.</p>
            <span className="hud-team-hiit-cta">CONHEÇA O APP <span aria-hidden="true">→</span></span>
          </div>
        </a>
      </section>

      <section id="principais-ferramentas" className="tools-discovery mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="principais-ferramentas-title">
        <div className="tools-discovery-heading"><div><p className="hud-kicker">// COMECE PELO SEU OBJETIVO</p><h2 id="principais-ferramentas-title">Encontre sua ferramenta</h2><p>Escolha uma calculadora e transforme seus dados em uma próxima ação.</p></div><Link href="/categorias/" className="hud-link">VER CATEGORIAS <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <ul className="tools-featured-grid">{featuredTools.map((tool, index) => <li key={tool.slug} className={index === 0 ? 'tools-featured-main' : ''}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul>
        <div className="quick-tools-row"><div className="quick-tools-label"><span>ATÉ 2 MINUTOS</span><strong>Resultados rápidos</strong><p>Sem cadastro. Sem complicação.</p></div><ul>{quickTools.map((tool) => <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul></div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">{categories.map((category) => <CategorySection key={category.slug} category={category} />)}</div>
    </div>
  )
}

