import type { Metadata } from 'next'
import { buildMetadata } from '@/lib/seo'
import { siteConfig } from '@/lib/site'

export const metadata: Metadata = buildMetadata({
  title: 'Contato',
  description: 'Entre em contato com a equipe do Métrica Fit.',
  path: '/contato/',
})

export default function ContatoPage() {
  const { email, responseTime } = siteConfig.contact

  return (
    <article className="mx-auto flex w-full max-w-3xl flex-col gap-8 px-4 py-10 sm:px-6 lg:py-16">
      <header className="flex flex-col gap-4">
        <p className="text-sm font-semibold uppercase tracking-wider text-primary">Contato</p>
        <h1 className="font-[family-name:var(--font-sora)] text-3xl font-bold tracking-tight sm:text-4xl">Fale conosco</h1>
        <p className="text-lg leading-relaxed text-muted-foreground">Encontrou um problema ou tem uma sugestão para as ferramentas? Consulte abaixo o canal disponível para contato.</p>
      </header>
      <section className="rounded-2xl border bg-card p-6 sm:p-8">
        {email ? (
          <>
            <h2 className="font-[family-name:var(--font-sora)] text-xl font-semibold">E-mail</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground"><a className="font-medium text-primary underline underline-offset-4" href={`mailto:${email}`}>{email}</a></p>
            <p className="mt-2 text-sm text-muted-foreground">Prazo estimado de resposta: {responseTime}.</p>
          </>
        ) : (
          <p className="leading-relaxed text-muted-foreground">Ainda não há um endereço de e-mail de contato definido. Quando esse canal estiver disponível, ele será publicado nesta página.</p>
        )}
      </section>
    </article>
  )
}
