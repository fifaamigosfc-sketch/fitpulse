import { BookOpen } from 'lucide-react'
import { siteConfig } from '@/lib/site'

export function BlogReference() {
  return (
    <aside aria-labelledby="blog-referencia" className="flex flex-col gap-3 rounded-xl border bg-muted/60 p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex items-start gap-3">
        <BookOpen className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <div>
          <h2 id="blog-referencia" className="font-sans text-base font-semibold">
            Conteúdo sobre treino, hábitos e resultados
          </h2>
          <p className="text-sm text-muted-foreground">Artigos e guias práticos para aplicar os números no dia a dia.</p>
        </div>
      </div>
      <a
        href={siteConfig.blog.url}
        className="shrink-0 text-sm font-semibold text-primary hover:underline"
        rel="noopener"
      >
        Visitar o {siteConfig.blog.name}
      </a>
    </aside>
  )
}
