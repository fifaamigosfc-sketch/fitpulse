import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Política de Privacidade',
  description: 'Saiba como o Fique Fit trata informações ao oferecer calculadoras fitness gratuitas.',
  path: '/politica-de-privacidade/',
})

export default function PrivacidadePage() {
  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
      <header className="flex flex-col gap-4"><p className="text-sm font-semibold uppercase tracking-wider text-primary">Legal</p><h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">Política de Privacidade</h1><p className="text-sm text-muted-foreground">Última atualização: {siteConfig.legal.lastUpdated}</p></header>
      <section className="flex flex-col gap-6 leading-relaxed text-muted-foreground">
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Dados informados nas calculadoras</h2><p>As calculadoras são executadas no navegador. Os valores digitados para realizar os cálculos não são enviados ou armazenados pelo site, salvo se alguma funcionalidade informar expressamente o contrário.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Cadastro e contato</h2><p>O site não exige cadastro para utilizar as ferramentas. Caso você entre em contato por um canal disponibilizado no site, as informações fornecidas serão utilizadas apenas para responder à sua mensagem.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Serviços futuros</h2><p>Podemos disponibilizar publicidade ou outros recursos no futuro. Qualquer mudança que envolva coleta, armazenamento ou compartilhamento de dados será refletida nesta política antes ou junto da implementação correspondente.</p></div>
        <div><h2 className="mb-2 text-xl font-semibold text-foreground">Resultados informativos</h2><p>Os resultados são estimativas e não substituem orientação médica, nutricional, física ou de qualquer outro profissional qualificado.</p></div>
      </section>
    </article>
  )
}
