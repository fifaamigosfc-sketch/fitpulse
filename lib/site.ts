/**
 * Configuração central do site.
 * Edite os valores abaixo para definir domínio, responsável e canais de contato.
 */
export const siteConfig = {
  name: 'Fique Fit',
  tagline: 'Ferramentas fitness gratuitas',
  description:
    'Calculadoras fitness gratuitas para calorias, nutrição, composição corporal, treino e corrida. Sem cadastro e com os cálculos feitos no seu navegador.',
  /** Domínio definitivo do site. Defina NEXT_PUBLIC_SITE_URL no deploy. */
  url: (process.env.NEXT_PUBLIC_SITE_URL ?? (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')).replace(/\/$/, ''),
  locale: 'pt_BR',
  language: 'pt-BR',
  /** Quem mantém o site. */
  owner: 'Team HIIT',
  blog: {
    name: 'Blog Team HIIT',
    url: 'https://blog.teamhiit.com.br',
  },
  contact: {
    email: 'contato@renangoncalves.com.br',
    responseTime: 'até 5 dias úteis',
  },
  legal: {
    lastUpdated: '29 de setembro de 2026',
  },
} as const

/**
 * Infraestrutura de publicidade (Google AdSense).
 * Mantida DESATIVADA: nenhum script ou espaço é renderizado enquanto enabled = false.
 */
export const adsConfig = {
  enabled: false,
  /** Ex.: 'ca-pub-0000000000000000' */
  clientId: '',
  slots: {
    beforeCalculator: '',
    afterResult: '',
    inContent: '',
    endOfPage: '',
  },
} as const

/**
 * Analytics. Desativado por padrão.
 * Ao ativar, atualize a Política de Privacidade e a Política de Cookies.
 */
export const analyticsConfig = {
  vercelAnalytics: false,
} as const

export function absoluteUrl(path = '/') {
  return `${siteConfig.url}${path.startsWith('/') ? path : `/${path}`}`
}
