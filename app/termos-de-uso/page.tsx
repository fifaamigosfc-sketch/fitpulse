import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Termos de Uso',
  description: 'Consulte os termos para utilização das calculadoras fitness gratuitas do Métrica Fit.',
  path: '/termos-de-uso/',
})

export default function TermosPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
      <header className="flex flex-col gap-4"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Legal</p><h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">Termos de Uso</h1><p className="text-sm text-muted-foreground">Última atualização: {siteConfig.legal.lastUpdated}</p></header>
      <section className="flex flex-col gap-6 leading-relaxed text-muted-foreground">
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Uso das ferramentas</h2><p>O {siteConfig.name} oferece calculadoras fitness gratuitas para fins informativos. Você pode utilizá-las de forma pessoal e responsável, respeitando a legislação aplicável e estes termos.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Caráter estimativo</h2><p>Os resultados dependem dos dados informados e de fórmulas generalizadas. Eles não constituem diagnóstico, prescrição ou recomendação individual e não substituem orientação de profissionais qualificados.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Disponibilidade e alterações</h2><p>Podemos atualizar, corrigir ou remover ferramentas e conteúdos para manter o site útil e adequado. Não garantimos que o serviço estará disponível sem interrupções ou que os resultados serão adequados a todas as situações.</p></div>
      </section>
    </article>
  )
}
