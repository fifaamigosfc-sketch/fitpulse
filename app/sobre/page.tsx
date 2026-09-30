import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: `Sobre o ${siteConfig.name}`,
  description: 'Conheça o objetivo do Métrica Fit e sua proposta de oferecer ferramentas fitness gratuitas e informativas.',
  path: '/sobre/',
})

export default function SobrePage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Sobre</p>
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">Ferramentas para apoiar sua jornada fitness</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">O {siteConfig.name} reúne ferramentas fitness gratuitas para ajudar você a entender melhor alguns dados relacionados à saúde, nutrição e atividade física.</p>
      </header>
      <section className="flex flex-col gap-4">
        <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold">Nossa proposta</h2>
        <p className="leading-relaxed text-muted-foreground">O objetivo é oferecer cálculos simples, acessíveis e claros, sem exigir cadastro. As ferramentas abrangem temas como calorias, nutrição, composição corporal, treino e corrida.</p>
        <p className="leading-relaxed text-muted-foreground">Buscamos apresentar informações de forma responsável, com explicações que ajudem na interpretação dos resultados. As calculadoras têm caráter exclusivamente informativo e estimativo: não substituem avaliação, diagnóstico ou orientação de profissionais qualificados.</p>
      </section>
    </article>
  )
}

