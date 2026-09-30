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
          <div className="home-hero-grid">
            <div className="hud-hero-main">
              <p className="hud-kicker">DADOS <b>+</b> TECNOLOGIA <b>+</b> PERFORMANCE</p>
              <h1 id="hero-title">Ferramentas Fitness<br /><strong>Gratuitas</strong></h1>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Calcule, planeje e evolua com nossas ferramentas baseadas em métricas reais. Mais precisão para os seus objetivos de saúde, treino e performance.</p>
              <Link href="/ferramentas/" className="hud-button">EXPLORAR FERRAMENTAS <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <div className="hero-trust"><span><b>11</b> calculadoras especializadas</span><span><b>100%</b> gratuito e seguro</span><span><b>RESULTADOS</b> instantâneos</span></div>
            </div>
            <div className="hero-visual" aria-label="Painel visual de métricas fitness">
              <div className="hero-silhouette" aria-hidden="true"><span /></div>
              <div className="hero-data-card hero-data-card-top"><b>COMPOSIÇÃO CORPORAL</b><strong>78%</strong><span>composição estimada</span></div>
              <div className="hero-data-card hero-data-card-mid"><b>PERFORMANCE</b><div className="mini-bars">{Array.from({ length: 12 }, (_, i) => <i key={i} style={{ height: `${25 + i * 5}%` }} />)}</div></div>
              <div className="hero-data-card hero-data-card-bottom"><b>TDEE</b><strong>2.450 <small>kcal</small></strong><span>gasto energético diário</span></div>
            </div>
          </div>
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

      <section className="reference-tools-section mx-auto w-full max-w-6xl px-4 sm:px-6" aria-labelledby="principais-ferramentas">
        <div className="hud-section-heading"><div><p className="hud-kicker">FERRAMENTAS EM DESTAQUE</p><h2 id="principais-ferramentas">Principais Ferramentas</h2></div><Link href="/ferramentas/" className="hud-link">Ver todas as ferramentas <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <ul className="reference-tool-grid">{featuredTools.map((tool) => <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul>
        <ul className="reference-tool-grid reference-tool-grid-secondary">{tools.slice(5).map((tool) => <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul>
      </section>

      <section className="reference-previews mx-auto w-full max-w-6xl px-4 sm:px-6" aria-label="Pré-visualizações da plataforma">
        <div className="preview-panel preview-calculator"><span>CALCULADORA DE TDEE</span><strong>Resultados claros para seus objetivos</strong><div className="preview-lines" /></div>
        <div className="preview-panel preview-categories"><span>CATEGORIAS</span><strong>Explore por Categoria</strong><div className="preview-mini-grid"><i /><i /><i /><i /></div></div>
        <div className="preview-panel preview-mobile"><span>TEAM HIIT // MOBILE</span><strong>Treine do seu jeito.</strong><div className="preview-phone" /></div>
        <div className="preview-panel preview-about"><span>SOBRE A MÉTRICA FIT</span><strong>Nossa missão é ajudar você a evoluir.</strong><p>Informação prática para uma rotina mais saudável e consistente.</p></div>
        <div className="preview-panel preview-nutrition"><span>NUTRIÇÃO</span><strong>Ferramentas para melhorar sua alimentação.</strong></div>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">{categories.slice(0, 1).map((category) => <CategorySection key={category.slug} category={category} />)}</div>
    </div>
  )
}

