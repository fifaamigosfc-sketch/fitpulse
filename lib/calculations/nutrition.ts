export const PROTEIN_GOALS = [
  {
    value: 'sedentary',
    label: 'Saúde geral (pouco ativo)',
    min: 0.8,
    max: 1.0,
    note: 'A ingestão diária recomendada (RDA) para adultos é de 0,8 g/kg.',
  },
  {
    value: 'active',
    label: 'Ativo, sem objetivo específico',
    min: 1.2,
    max: 1.6,
    note: 'Pessoas fisicamente ativas costumam se beneficiar de valores acima da RDA.',
  },
  {
    value: 'gain',
    label: 'Ganho de massa muscular',
    min: 1.6,
    max: 2.2,
    note: 'Meta-análises indicam benefício até cerca de 1,6 g/kg, com limite superior prático próximo de 2,2 g/kg.',
  },
  {
    value: 'loss',
    label: 'Emagrecimento preservando músculo',
    min: 1.6,
    max: 2.4,
    note: 'Em déficit calórico, ingestões mais altas ajudam a preservar a massa magra.',
  },
] as const

export type ProteinGoal = (typeof PROTEIN_GOALS)[number]['value']

export function calculateProtein(weight: number, goal: ProteinGoal, meals: number) {
  const config = PROTEIN_GOALS.find((g) => g.value === goal) ?? PROTEIN_GOALS[0]
  const min = weight * config.min
  const max = weight * config.max
  const target = (min + max) / 2
  return { min, max, target, perMeal: target / meals, config }
}

export const MACRO_GOALS = [
  { value: 'loss', label: 'Emagrecimento', proteinPerKg: 2.0, fatPercent: 25 },
  { value: 'maintain', label: 'Manutenção', proteinPerKg: 1.6, fatPercent: 30 },
  { value: 'gain', label: 'Ganho de massa', proteinPerKg: 1.8, fatPercent: 25 },
] as const

export type MacroGoal = (typeof MACRO_GOALS)[number]['value']

export const KCAL_PER_GRAM = { protein: 4, carbs: 4, fat: 9 } as const

/** Gordura mínima de referência para não comprometer funções hormonais. */
const MIN_FAT_PER_KG = 0.5

export function calculateMacros(
  calories: number,
  weight: number,
  goal: MacroGoal,
): { ok: true; protein: number; fat: number; carbs: number; percents: { protein: number; fat: number; carbs: number } } | { ok: false; error: string } {
  const config = MACRO_GOALS.find((g) => g.value === goal) ?? MACRO_GOALS[1]
  const protein = weight * config.proteinPerKg
  const fat = Math.max((calories * (config.fatPercent / 100)) / KCAL_PER_GRAM.fat, weight * MIN_FAT_PER_KG)
  const remaining = calories - protein * KCAL_PER_GRAM.protein - fat * KCAL_PER_GRAM.fat
  if (remaining < 0) {
    return {
      ok: false,
      error:
        'As calorias informadas são baixas demais para cobrir a proteína e a gordura mínimas para o seu peso. Revise a meta calórica.',
    }
  }
  const carbs = remaining / KCAL_PER_GRAM.carbs
  return {
    ok: true,
    protein,
    fat,
    carbs,
    percents: {
      protein: ((protein * KCAL_PER_GRAM.protein) / calories) * 100,
      fat: ((fat * KCAL_PER_GRAM.fat) / calories) * 100,
      carbs: ((carbs * KCAL_PER_GRAM.carbs) / calories) * 100,
    },
  }
}

export const WATER_ML_PER_KG = 35
export const WATER_ML_PER_EXERCISE_HOUR = 500
export const WATER_ML_HOT_CLIMATE = 500

export function calculateWater(weight: number, exerciseMinutes: number, hotClimate: boolean) {
  const base = weight * WATER_ML_PER_KG
  const exercise = (exerciseMinutes / 60) * WATER_ML_PER_EXERCISE_HOUR
  const climate = hotClimate ? WATER_ML_HOT_CLIMATE : 0
  const totalMl = base + exercise + climate
  return { base, exercise, climate, totalMl, cups250: totalMl / 250 }
}
