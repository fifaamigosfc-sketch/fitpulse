import type { Metadata } from 'next'
import Link from 'next/link'
import { TdeeCalculator } from '@/components/calculators/tdee-calculator'
import { ToolCard } from '@/components/tools/tool-card'
import { getRelatedTools, getTool, toolPath } from '@/lib/tools/registry'
import { siteConfig } from '@/lib/site'

const tool = getTool('calculadora-calorias-tdee')

export const metadata: Metadata = {
  title: tool.seo.title,
  description: tool.seo.description,
  alternates: { canonical: `${siteConfig.url}${toolPath(tool.slug)}` },
  openGraph: {
    title: tool.seo.title,
    description: tool.seo.description,
    url: `${siteConfig.url}${toolPath(tool.slug)}`,
    type: 'article',
    locale: siteConfig.locale,
  },
}

export default function TdeePage() {
  const relatedTools = getRelatedTools(tool)

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-12 px-4 py-8 sm:px-6 lg:py-12">
      <nav aria-label="Breadcrumb" className="text-sm text-muted-foreground">
        <ol className="flex flex-wrap items-center gap-2">
          <li><Link href="/" className="hover:text-foreground">Início</Link></li>
          <li aria-hidden="true">/</li>
          <li><Link href="/ferramentas/" className="hover:text-foreground">Ferramentas</Link></li>
          <li aria-hidden="true">/</li>
          <li aria-current="page" className="text-foreground">Calorias e TDEE</li>
        </ol>
      </nav>

      <header className="flex max-w-3xl flex-col gap-4">
        <p className="text-sm font-semibold tracking-wide text-primary uppercase">Calorias e emagrecimento</p>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">Calculadora de Calorias e TDEE</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">Estime quantas calorias seu corpo gasta por dia e encontre uma referência para manutenção, perda de peso ou ganho de massa.</p>
      </header>

      <section aria-labelledby="calculadora-heading" className="flex flex-col gap-6">
        <div>
          <h2 id="calculadora-heading" className="text-2xl font-bold tracking-tight">Calcule seu gasto calórico diário</h2>
          <p className="mt-2 text-muted-foreground">Informe seus dados para obter uma estimativa personalizada.</p>
        </div>
        <TdeeCalculator />
      </section>

      <article className="prose prose-slate max-w-3xl dark:prose-invert">
        <h2>O que é TDEE?</h2>
        <p>TDEE é a sigla em inglês para gasto energético total diário. Ele representa uma estimativa de quantas calorias você utiliza em um dia, considerando sua taxa metabólica basal e o nível de atividade física informado.</p>
        <h2>Como o cálculo é feito?</h2>
        <p>Primeiro, a calculadora estima a taxa metabólica basal (TMB) pela equação de Mifflin-St Jeor. Para homens, a fórmula é <strong>TMB = 10 × peso + 6,25 × altura − 5 × idade + 5</strong>. Para mulheres, é <strong>TMB = 10 × peso + 6,25 × altura − 5 × idade − 161</strong>, usando peso em kg, altura em cm e idade em anos.</p>
        <p>Em seguida, o TDEE é calculado multiplicando a TMB pelo fator de atividade escolhido: <strong>TDEE = TMB × fator de atividade</strong>. Os fatores disponíveis vão de 1,2 (sedentário) a 1,9 (extremamente ativo).</p>
        <h2>Como interpretar o resultado</h2>
        <p>O valor de manutenção é uma referência para consumir aproximadamente o mesmo número de calorias que você gasta. A tabela também mostra referências com redução ou aumento de 10% e 20%, mas o resultado não é uma prescrição: acompanhe seu peso, medidas, desempenho e fome por algumas semanas e ajuste gradualmente.</p>
        <h2>Limitações da estimativa</h2>
        <p>O cálculo usa médias populacionais e não mede diretamente seu metabolismo, composição corporal, rotina ou variações diárias. O fator de atividade também é uma aproximação. Condições de saúde, uso de medicamentos, gestação e objetivos específicos exigem orientação de um profissional qualificado.</p>
        <h2>Perguntas frequentes</h2>
        <h3>O TDEE é igual todos os dias?</h3>
        <p>Não necessariamente. Exercícios, passos, rotina, sono e outros fatores podem mudar seu gasto de um dia para o outro.</p>
        <h3>Devo consumir exatamente o número indicado?</h3>
        <p>Não. Use o resultado como ponto de partida e observe sua evolução antes de fazer pequenos ajustes.</p>
        <h3>O cálculo serve para emagrecer?</h3>
        <p>Ele ajuda a estimar a manutenção. Para emagrecer, costuma-se usar uma ingestão abaixo desse valor, de forma gradual e compatível com sua saúde e orientação profissional.</p>
      </article>

      <section aria-labelledby="relacionadas-heading" className="flex flex-col gap-5">
        <div>
          <h2 id="relacionadas-heading" className="text-2xl font-bold tracking-tight">Ferramentas relacionadas</h2>
          <p className="mt-2 text-muted-foreground">Continue seu planejamento com outras calculadoras gratuitas.</p>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {relatedTools.map((relatedTool) => <ToolCard key={relatedTool.slug} tool={relatedTool} />)}
        </div>
      </section>
    </div>
  )
}
