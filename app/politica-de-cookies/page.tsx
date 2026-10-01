import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Política de Cookies',
  description: 'Entenda como cookies e tecnologias semelhantes são tratados no Fique Fit.',
  path: '/politica-de-cookies/',
})

export default function CookiesPage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
      <header className="flex flex-col gap-4"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Legal</p><h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">Política de Cookies</h1><p className="text-sm text-muted-foreground">Última atualização: {siteConfig.legal.lastUpdated}</p></header>
      <section className="flex flex-col gap-6 leading-relaxed text-muted-foreground">
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Como o site funciona hoje</h2><p>As calculadoras executam seus cálculos no navegador e o site não utiliza cookies próprios para armazenar os valores digitados nessas ferramentas.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Publicidade e serviços futuros</h2><p>A publicidade está desativada atualmente. Se recursos de publicidade, analytics ou outros serviços que utilizem cookies forem implementados, esta política será atualizada para explicar quais tecnologias são utilizadas e para qual finalidade.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Atualizações</h2><p>Recomendamos consultar esta página periodicamente para acompanhar eventuais mudanças no uso de cookies e tecnologias semelhantes.</p></div>
      </section>
    </article>
  )
}
