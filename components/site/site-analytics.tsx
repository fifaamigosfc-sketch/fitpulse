import { Analytics } from '@vercel/analytics/next'
import { analyticsConfig } from '@/lib/site'

/** Ponto único para analytics. Desativado em lib/site.ts; remova este componente para retirar totalmente. */
export function SiteAnalytics() {
  if (!analyticsConfig.vercelAnalytics || process.env.NODE_ENV !== 'production') return null
  return <Analytics />
}
