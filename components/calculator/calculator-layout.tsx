import type { ReactNode } from 'react'
import { ShieldCheck } from 'lucide-react'
import { AdPlaceholder } from '@/components/ads/ad-placeholder'
import { JsonLd } from '@/components/seo/json-ld'
import { BlogReference } from '@/components/site/blog-reference'
import { Breadcrumbs } from '@/components/site/breadcrumbs'
import { RelatedTools } from '@/components/tools/related-tools'
import { faqJsonLd, webPageJsonLd } from '@/lib/seo'
import { getCategory } from '@/lib/tools/categories'
import { categoryPath, toolPath } from '@/lib/tools/registry'
import type { Tool, ToolContent } from '@/lib/tools/types'
import {
  CalculatorExample,
  CalculatorExplanation,
  CalculatorFAQ,
  CalculatorFormula,
  CalculatorInterpretation,
  CalculatorNotes,
} from './content-sections'

type CalculatorLayoutProps = {
  tool: Tool
  content: ToolContent
  calculator: ReactNode
}

export function CalculatorLayout({ tool, content, calculator }: CalculatorLayoutProps) {
  const category = getCategory(tool.category)
  const path = toolPath(tool.slug)

  return (
    <article className="mx-auto flex max-w-3xl flex-col px-4 py-8 sm:px-6 sm:py-10">
      <Breadcrumbs
        items={[
          { name: 'Home', href: '/' },
          { name: 'Ferramentas', href: '/ferramentas/' },
          { name: category.name, href: categoryPath(category.slug) },
          { name: tool.shortName, href: path },
        ]}
      />

      <header className="mt-6 flex flex-col gap-4">
        <h1 className="text-3xl leading-tight font-bold tracking-tight sm:text-4xl">{tool.name}</h1>
        {content.intro.map((p) => (
          <p key={p} className="text-lg leading-relaxed text-foreground/80">
            {p}
          </p>
        ))}
      </header>

      <AdPlaceholder position="beforeCalculator" />

      <section aria-labelledby="calculadora" className="mt-8 rounded-2xl border bg-card p-5 shadow-sm sm:p-7">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-2">
          <h2 id="calculadora" className="text-xl font-bold tracking-tight">
            Calculadora
          </h2>
          <p className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
            <ShieldCheck className="size-3.5 text-primary" aria-hidden="true" />
            Calculado no seu navegador. Nada é enviado.
          </p>
        </div>
        {calculator}
      </section>

      <AdPlaceholder position="afterResult" />

      <div className="mt-12 flex flex-col gap-12">
        <CalculatorExplanation paragraphs={content.howItWorks} />
        {content.formula && <CalculatorFormula formula={content.formula} />}
        <AdPlaceholder position="inContent" className="my-0" />
        <CalculatorInterpretation interpretation={content.interpretation} />
        {content.example && <CalculatorExample example={content.example} />}
        <CalculatorNotes notes={content.notes} references={content.references} />
        <CalculatorFAQ faq={content.faq} />
        <RelatedTools tool={tool} />
        <AdPlaceholder position="endOfPage" className="my-0" />
        <BlogReference />
      </div>

      <JsonLd data={webPageJsonLd({ name: tool.name, description: tool.seo.description, path })} />
      <JsonLd data={faqJsonLd(content.faq)} />
    </article>
  )
}
