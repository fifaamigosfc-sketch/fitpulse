import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { toolPath } from '@/lib/tools/registry'
import type { Tool } from '@/lib/tools/types'

export function ToolCard({ tool, headingLevel = 'h3' }: { tool: Tool; headingLevel?: 'h2' | 'h3' }) {
  const Icon = tool.icon
  const Heading = headingLevel
  return (
    <article className="group relative flex h-full flex-col gap-4 rounded-xl border bg-card p-5 transition-colors hover:border-primary/40">
      <span className="flex size-10 items-center justify-center rounded-lg bg-accent text-accent-foreground" aria-hidden="true">
        <Icon className="size-5" />
      </span>
      <div className="flex flex-1 flex-col gap-1.5">
        <Heading className="font-sans text-base leading-snug font-semibold">
          <Link href={toolPath(tool.slug)} className="after:absolute after:inset-0 after:rounded-xl focus-visible:outline-none">
            {tool.name}
          </Link>
        </Heading>
        <p className="text-sm leading-relaxed text-muted-foreground">{tool.description}</p>
      </div>
      <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary" aria-hidden="true">
        Calcular
        <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </article>
  )
}
