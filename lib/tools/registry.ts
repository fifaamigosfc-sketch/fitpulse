import {
  ChartPie,
  Droplets,
  Drumstick,
  Dumbbell,
  Flame,
  Gauge,
  Percent,
  PersonStanding,
  Scale,
  Target,
  Timer,
  TrendingDown,
} from 'lucide-react'
import type { CategorySlug, Tool, ToolSlug } from './types'

/**
 * Fonte única de dados das ferramentas.
 * Para adicionar uma nova ferramenta:
 * 1. adicione o slug em ToolSlug (types.ts) e o item abaixo;
 * 2. crie o conteúdo em lib/tools/content/;
 * 3. crie o componente em components/calculators/ e registre em components/calculators/registry.tsx.
 * Home, /ferramentas/, categorias, sitemap e links relacionados são atualizados automaticamente.
 */
export const tools: Tool[] = [
  {
    slug: 'calculadora-calorias-tdee',
    name: 'Calculadora de Calorias e TDEE',
    shortName: 'Calorias e TDEE',
    category: 'calorias-emagrecimento',
    description: 'Estime seu gasto calórico diário e suas calorias de manutenção.',
    icon: Flame,
    related: ['calculadora-deficit-calorico', 'calculadora-macros', 'calculadora-proteina', 'calculadora-peso-ideal'],
    seo: {
      title: 'Calculadora de Calorias e TDEE: gasto calórico diário',
      description:
        'Calcule sua taxa metabólica basal e seu gasto energético total diário (TDEE) com a equação de Mifflin-St Jeor. Grátis, sem cadastro.',
    },
  },
  {
    slug: 'calculadora-deficit-calorico',
    name: 'Calculadora de Déficit Calórico',
    shortName: 'Déficit Calórico',
    category: 'calorias-emagrecimento',
    description: 'Descubra quantas calorias consumir para perder peso em um ritmo seguro.',
    icon: TrendingDown,
    related: ['calculadora-calorias-tdee', 'calculadora-macros', 'calculadora-proteina', 'calculadora-peso-ideal'],
    seo: {
      title: 'Calculadora de Déficit Calórico para emagrecer',
      description:
        'Calcule a meta diária de calorias para perder peso no ritmo escolhido, com alertas para déficits agressivos demais. Estimativa gratuita e sem cadastro.',
    },
  },
  {
    slug: 'calculadora-peso-ideal',
    name: 'Calculadora de Peso Ideal',
    shortName: 'Peso Ideal',
    category: 'calorias-emagrecimento',
    description: 'Veja a faixa de peso de referência para a sua altura por diferentes fórmulas.',
    icon: Target,
    related: ['calculadora-imc', 'calculadora-percentual-gordura', 'calculadora-deficit-calorico', 'calculadora-massa-magra'],
    seo: {
      title: 'Calculadora de Peso Ideal por altura',
      description:
        'Compare o peso de referência pelas fórmulas de Devine, Robinson, Miller e Hamwi e veja a faixa de peso saudável pelo IMC para a sua altura.',
    },
  },
  {
    slug: 'calculadora-proteina',
    name: 'Calculadora de Proteína',
    shortName: 'Proteína',
    category: 'nutricao',
    description: 'Calcule sua meta diária de proteína de acordo com peso e objetivo.',
    icon: Drumstick,
    related: ['calculadora-calorias-tdee', 'calculadora-macros', 'calculadora-massa-magra'],
    seo: {
      title: 'Calculadora de Proteína: quanto consumir por dia',
      description:
        'Descubra quantos gramas de proteína consumir por dia conforme seu peso, nível de atividade e objetivo, com base em recomendações científicas.',
    },
  },
  {
    slug: 'calculadora-macros',
    name: 'Calculadora de Macronutrientes',
    shortName: 'Macronutrientes',
    category: 'nutricao',
    description: 'Divida suas calorias entre proteínas, carboidratos e gorduras.',
    icon: ChartPie,
    related: ['calculadora-calorias-tdee', 'calculadora-proteina', 'calculadora-deficit-calorico', 'calculadora-agua'],
    seo: {
      title: 'Calculadora de Macros: proteínas, carboidratos e gorduras',
      description:
        'Distribua suas calorias diárias entre proteínas, carboidratos e gorduras de acordo com seu peso e objetivo. Resultado em gramas e porcentagem.',
    },
  },
  {
    slug: 'calculadora-agua',
    name: 'Calculadora de Água',
    shortName: 'Água',
    category: 'nutricao',
    description: 'Estime quanta água beber por dia considerando peso e exercícios.',
    icon: Droplets,
    related: ['calculadora-macros', 'calculadora-calorias-tdee', 'calculadora-pace'],
    seo: {
      title: 'Calculadora de Água: quanto beber por dia',
      description:
        'Estime sua necessidade diária de água com base no peso corporal, tempo de exercício e clima. Calculadora gratuita e sem cadastro.',
    },
  },
  {
    slug: 'calculadora-imc',
    name: 'Calculadora de IMC',
    shortName: 'IMC',
    category: 'composicao-corporal',
    description: 'Calcule seu Índice de Massa Corporal e veja a classificação da OMS.',
    icon: Scale,
    related: ['calculadora-peso-ideal', 'calculadora-percentual-gordura', 'calculadora-massa-magra'],
    seo: {
      title: 'Calculadora de IMC: Índice de Massa Corporal',
      description:
        'Calcule seu IMC, veja a classificação da Organização Mundial da Saúde e a faixa de peso saudável para a sua altura. Rápido e gratuito.',
    },
  },
  {
    slug: 'calculadora-percentual-gordura',
    name: 'Calculadora de Percentual de Gordura',
    shortName: 'Percentual de Gordura',
    category: 'composicao-corporal',
    description: 'Estime seu percentual de gordura com medidas de fita métrica.',
    icon: Percent,
    related: ['calculadora-massa-magra', 'calculadora-imc', 'calculadora-peso-ideal'],
    seo: {
      title: 'Calculadora de Percentual de Gordura (método da Marinha dos EUA)',
      description:
        'Estime seu percentual de gordura corporal com medidas de pescoço, cintura e quadril pelo método da Marinha dos EUA. Gratuito e sem cadastro.',
    },
  },
  {
    slug: 'calculadora-massa-magra',
    name: 'Calculadora de Massa Magra',
    shortName: 'Massa Magra',
    category: 'composicao-corporal',
    description: 'Estime sua massa livre de gordura por fórmulas ou pelo seu % de gordura.',
    icon: PersonStanding,
    related: ['calculadora-percentual-gordura', 'calculadora-proteina', 'calculadora-imc'],
    seo: {
      title: 'Calculadora de Massa Magra (massa livre de gordura)',
      description:
        'Calcule sua massa magra pelas fórmulas de Boer, James e Hume ou a partir do seu percentual de gordura. Estimativa gratuita e sem cadastro.',
    },
  },
  {
    slug: 'calculadora-1rm',
    name: 'Calculadora de 1RM',
    shortName: '1RM',
    category: 'treino',
    description: 'Estime sua carga máxima para uma repetição e monte sua tabela de cargas.',
    icon: Dumbbell,
    related: ['calculadora-proteina', 'calculadora-massa-magra', 'calculadora-calorias-tdee'],
    seo: {
      title: 'Calculadora de 1RM: carga máxima e tabela de percentuais',
      description:
        'Estime sua repetição máxima (1RM) pelas fórmulas de Epley, Brzycki e Lombardi e veja a tabela de cargas por percentual para montar seu treino.',
    },
  },
  {
    slug: 'calculadora-pace',
    name: 'Calculadora de Pace',
    shortName: 'Pace',
    category: 'corrida',
    description: 'Calcule seu ritmo por quilômetro, velocidade e tempo de prova.',
    icon: Timer,
    related: ['calculadora-calorias-tdee', 'calculadora-agua', 'calculadora-imc'],
    seo: {
      title: 'Calculadora de Pace: ritmo de corrida por km',
      description:
        'Calcule seu pace (min/km), velocidade média e o tempo de prova para 5 km, 10 km, meia maratona e maratona. Gratuito e sem cadastro.',
    },
  },
]

export const toolIconFallback = Gauge

export function getTool(slug: ToolSlug) {
  const tool = tools.find((t) => t.slug === slug)
  if (!tool) throw new Error(`Ferramenta desconhecida: ${slug}`)
  return tool
}

export function findTool(slug: string) {
  return tools.find((t) => t.slug === slug)
}

export function getToolsByCategory(category: CategorySlug) {
  return tools.filter((t) => t.category === category)
}

export function getRelatedTools(tool: Tool) {
  return tool.related.map(getTool)
}

export function toolPath(slug: ToolSlug) {
  return `/ferramentas/${slug}/`
}

export function categoryPath(slug: CategorySlug) {
  return `/categorias/${slug}/`
}
