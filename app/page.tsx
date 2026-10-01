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

const featuredTools = tools.slice(0, 3)

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
    <div className="flex flex-col gap-10 pb-16">
      <section className="mx-auto w-full max-w-6xl px-4 pt-8 sm:px-6 lg:pt-12" aria-labelledby="hero-title">
        <div className="hud-frame">
          <div className="hud-frame-top"><span>FIQUE FIT // SISTEMA DE INTELIGÊNCIA FITNESS</span><span>STATUS: <b>ONLINE</b></span></div>
          <div className="grid gap-0 lg:grid-cols-[1.25fr_0.75fr]">
            <div className="hud-hero-main">
              <p className="hud-kicker">// CENTRAL DE PERFORMANCE <span>MF-01</span></p>
              <h1 id="hero-title">SEUS DADOS.<br /><strong>SUA EVOLUÇÃO.</strong></h1>
              <p className="max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">Monitore, calcule e compreenda o que move seu corpo. Um painel de ferramentas objetivas para decisões melhores no treino.</p>
              <Link href="/ferramentas/" className="hud-button">ABRIR PAINEL <ArrowRight className="size-4" aria-hidden="true" /></Link>
            </div>
            <div className="hud-orbit-panel" aria-hidden="true">
              <div className="hud-orbit"><div className="hud-orbit-core">FIT<br /><span>SYS</span></div></div>
              <span className="hud-orbit-caption top-8 right-8">LIVE DATA<br /><b>ACTIVE</b></span>
              <span className="hud-orbit-caption bottom-8 left-8">PROGRESS<br /><b>SYNCED</b></span>
            </div>
          </div>
          <div className="hud-frame-bottom"><span>PRECISION / CLARITY / PROGRESS</span><span>v.2.026</span></div>
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
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featuredTools.map((tool) => <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">{categories.map((category) => <CategorySection key={category.slug} category={category} />)}</div>
    </div>
  )
}

