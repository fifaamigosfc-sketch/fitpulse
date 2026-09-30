import type { Metadata } from 'next'
import type { ReactNode } from 'react'
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

const featuredTools = tools.slice(0, 5)

function HudPanel({ label, children, className = '' }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <div className={`hud-panel ${className}`}>
      <div className="hud-panel-label"><span className="hud-dot" />{label}</div>
      {children}
    </div>
  )
}

export default function Page() {
  return (
    <div className="home-layout">
      <section className="mx-auto w-full max-w-6xl px-4 pt-6 sm:px-6 lg:pt-8" aria-labelledby="hero-title">
        <div className="hud-frame home-hero">
          <div className="hud-frame-top"><span>DADOS <b>+</b> TECNOLOGIA <b>+</b> PERFORMANCE</span><span>STATUS: <b>ONLINE</b></span></div>
          <div className="home-hero-grid">
            <div className="hud-hero-main">
              <p className="hud-kicker">// MÉTRICAS PARA RESULTADOS REAIS</p>
              <h1 id="hero-title">Ferramentas Fitness<br /><strong>Gratuitas</strong></h1>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Calcule, planeje e evolua com ferramentas baseadas em métricas reais. Mais precisão para os seus objetivos de saúde, treino e performance.</p>
              <Link href="/ferramentas/" className="hud-button">EXPLORAR FERRAMENTAS <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <div className="hero-trust"><span><b>11</b> calculadoras especializadas</span><span><b>100%</b> gratuito e seguro</span><span><b>∞</b> evolução contínua</span></div>
            </div>
            <div className="hero-visual" aria-label="Painel visual de métricas fitness">
              <div className="hero-silhouette" aria-hidden="true"><span /></div>
              <div className="hero-data-card hero-data-card-top"><b>COMPOSIÇÃO</b><strong>78%</strong><span>corporal</span></div>
              <div className="hero-data-card hero-data-card-mid"><b>PERFORMANCE</b><div className="mini-bars">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ height: `${25 + i * 5}%` }} />)}</div></div>
              <div className="hero-data-card hero-data-card-bottom"><b>TDEE</b><strong>2.450 <small>kcal</small></strong><span>gasto energético diário</span></div>
            </div>
          </div>
          <div className="hud-frame-bottom"><span>PRECISION / CLARITY / PROGRESS</span><span>MF-01</span></div>
        </div>
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

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6" aria-labelledby="principais-ferramentas">
        <div className="hud-section-heading"><div><p className="hud-kicker">// MÓDULOS DISPONÍVEIS</p><h2 id="principais-ferramentas">Ferramentas de precisão</h2></div><Link href="/ferramentas/" className="hud-link">VER TODAS <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">{featuredTools.map((tool) => <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">{categories.map((category) => <CategorySection key={category.slug} category={category} />)}</div>
    </div>
  )
}

