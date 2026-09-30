import Link from 'next/link'
import { categoryPath, getToolsByCategory } from '@/lib/tools/registry'
import type { Category } from '@/lib/tools/types'
import { ToolCard } from './tool-card'

export function CategorySection({ category, showLink = true }: { category: Category; showLink?: boolean }) {
  const Icon = category.icon
  const categoryTools = getToolsByCategory(category.slug)
  if (categoryTools.length === 0) return null
  const headingId = `categoria-${category.slug}`

  return (
    <section id={category.slug} aria-labelledby={headingId} className="flex flex-col gap-5">
      <div className="flex flex-wrap items-end justify-between gap-2">
        <div className="flex items-center gap-3">
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary" aria-hidden="true">
            <Icon className="size-4.5" />
          </span>
          <div>
            <h2 id={headingId} className="text-xl font-bold tracking-tight">
              {category.name}
            </h2>
            <p className="text-sm text-muted-foreground">{category.description}</p>
          </div>
        </div>
        {showLink && (
          <Link href={categoryPath(category.slug)} className="text-sm font-medium text-primary hover:underline">
            Ver categoria
          </Link>
        )}
      </div>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categoryTools.map((tool) => (
          <li key={tool.slug}>
            <ToolCard tool={tool} />
          </li>
        ))}
      </ul>
    </section>
  )
}
