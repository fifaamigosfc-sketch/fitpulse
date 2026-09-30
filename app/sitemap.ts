import type { MetadataRoute } from 'next'
import { siteConfig } from '@/lib/site'
import { categories } from '@/lib/tools/categories'
import { tools, categoryPath, toolPath } from '@/lib/tools/registry'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPaths = ['/', '/ferramentas/', '/categorias/', '/sobre/', '/contato/', '/politica-de-privacidade/', '/termos-de-uso/', '/politica-de-cookies/']
  const categoryPaths = categories.map(({ slug }) => categoryPath(slug))
  const toolPaths = tools.map(({ slug }) => toolPath(slug))
  return [...staticPaths, ...categoryPaths, ...toolPaths].map((path) => ({ url: `${siteConfig.url}${path}`, changeFrequency: 'monthly' as const }))
}
