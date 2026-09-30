import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { getRelatedTools, toolPath } from '@/lib/tools/registry'
import type { Tool } from '@/lib/tools/types'

export function RelatedTools({ tool }: { tool: Tool }) {
  const related = getRelatedTools(tool)
  if (related.length === 0) return null

  return (
    <section aria-labelledby="ferramentas-relacionadas" className="flex flex-col gap-4">
      <h2 id="ferramentas-relacionadas" className="text-2xl font-bold tracking-tight">
        Você também pode calcular
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {related.map((item) => {
          const Icon = item.icon
          return (
            <li key={item.slug}>
              <Link
                href={toolPath(item.slug)}
                className="group flex items-center gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-accent text-accent-foreground" aria-hidden="true">
                  <Icon className="size-5" />
                </span>
                <span className="flex flex-1 flex-col">
                  <span className="font-semibold">{item.name}</span>
                  <span className="text-sm text-muted-foreground">{item.description}</span>
                </span>
                <ArrowRight className="size-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
              </Link>
            </li>
          )
        })}
      </ul>
    </section>
  )
}
