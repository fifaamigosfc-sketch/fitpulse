import { Apple, Dumbbell, Flame, Footprints, Scale } from 'lucide-react'
import type { Category, CategorySlug } from './types'

export const categories: Category[] = [
  {
    slug: 'calorias-emagrecimento',
    name: 'Calorias e Emagrecimento',
    description: 'Gasto calórico, déficit e metas de peso.',
    intro:
      'Ferramentas para estimar quanta energia seu corpo gasta por dia, planejar um déficit calórico sustentável e ter uma referência de peso para a sua altura.',
    icon: Flame,
  },
  {
    slug: 'nutricao',
    name: 'Nutrição',
    description: 'Proteína, macronutrientes e hidratação.',
    intro:
      'Calculadoras para distribuir calorias entre proteínas, carboidratos e gorduras, definir uma meta de proteína diária e estimar sua necessidade de água.',
    icon: Apple,
  },
  {
    slug: 'composicao-corporal',
    name: 'Composição Corporal',
    description: 'IMC, gordura corporal e massa magra.',
    intro:
      'Métricas que ajudam a entender a relação entre peso, altura, gordura e massa magra — indo além do número da balança.',
    icon: Scale,
  },
  {
    slug: 'treino',
    name: 'Treino',
    description: 'Força e cargas de musculação.',
    intro: 'Ferramentas para planejar cargas e acompanhar a evolução de força na musculação.',
    icon: Dumbbell,
  },
  {
    slug: 'corrida',
    name: 'Corrida',
    description: 'Ritmo, velocidade e tempos de prova.',
    intro: 'Calculadoras para planejar treinos e provas de corrida a partir de ritmo, distância e tempo.',
    icon: Footprints,
  },
]

export function getCategory(slug: CategorySlug) {
  const category = categories.find((c) => c.slug === slug)
  if (!category) throw new Error(`Categoria desconhecida: ${slug}`)
  return category
}

export function findCategory(slug: string) {
  return categories.find((c) => c.slug === slug)
}
