import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { toolPath } from '@/lib/tools/registry'
import type { Tool } from '@/lib/tools/types'

export function ToolCard({ tool, headingLevel = 'h3' }: { tool: Tool; headingLevel?: 'h2' | 'h3' }) {
  const Icon = tool.icon
  const Heading = headingLevel
  return (
    <article className="group relative flex h-full flex-col gap-4 overflow-hidden rounded-xl border border-border/80 bg-card p-5 shadow-[0_12px_35px_oklch(0_0_0/0.15)] transition-all duration-300 hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_16px_40px_oklch(0_0_0/0.28),0_0_24px_oklch(0.78_0.17_205/0.12)]">
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
