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
          <div className="hud-frame-top"><span>METRICA.FIT // SISTEMA DE INTELIGÊNCIA FITNESS</span><span>STATUS: <b>ONLINE</b></span></div>
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

      <section className="mx-auto grid w-full max-w-6xl gap-3 px-4 sm:px-6 md:grid-cols-3" aria-label="Resumo do sistema">
        <HudPanel label="CALORIAS // DAILY"><div className="hud-metric"><strong>2.240</strong><span>KCAL ESTIMADAS</span></div><div className="hud-bars"><i /><i /><i /><i /><i /><i /><i /></div></HudPanel>
        <HudPanel label="COMPOSIÇÃO // BODY"><div className="hud-metric"><strong>68.4</strong><span>KG ATUAL</span></div><div className="hud-line"><span style={{ width: '72%' }} /></div><p>Progresso consistente <b>+12%</b></p></HudPanel>
        <HudPanel label="STATUS // SYSTEM"><div className="hud-status"><span className="hud-status-ring">98</span><div><strong>EM EVOLUÇÃO</strong><p>Todos os sistemas ativos</p></div></div><div className="hud-scanline" /></HudPanel>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 sm:px-6" aria-labelledby="principais-ferramentas">
        <div className="hud-section-heading"><div><p className="hud-kicker">// MÓDULOS DISPONÍVEIS</p><h2 id="principais-ferramentas">Ferramentas de precisão</h2></div><Link href="/ferramentas/" className="hud-link">VER TODAS <ArrowRight className="size-4" aria-hidden="true" /></Link></div>
        <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{featuredTools.map((tool) => <li key={tool.slug}><ToolCard tool={tool} headingLevel="h3" /></li>)}</ul>
      </section>

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 sm:px-6">{categories.map((category) => <CategorySection key={category.slug} category={category} />)}</div>
    </div>
  )
}

