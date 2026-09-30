export type Sex = 'male' | 'female'

export const ACTIVITY_LEVELS = [
  { value: '1.2', label: 'Sedentário', description: 'Pouco ou nenhum exercício' },
  { value: '1.375', label: 'Levemente ativo', description: 'Exercício leve 1 a 3 dias por semana' },
  { value: '1.55', label: 'Moderadamente ativo', description: 'Exercício moderado 3 a 5 dias por semana' },
  { value: '1.725', label: 'Muito ativo', description: 'Exercício intenso 6 a 7 dias por semana' },
  { value: '1.9', label: 'Extremamente ativo', description: 'Treino intenso diário ou trabalho físico pesado' },
] as const

/** Equação de Mifflin-St Jeor (1990). Peso em kg, altura em cm, idade em anos. */
export function mifflinStJeor({ sex, weight, height, age }: { sex: Sex; weight: number; height: number; age: number }) {
  const base = 10 * weight + 6.25 * height - 5 * age
  return sex === 'male' ? base + 5 : base - 161
}

export function calculateTdee(input: { sex: Sex; weight: number; height: number; age: number; activity: number }) {
  const bmr = mifflinStJeor(input)
  return { bmr, tdee: bmr * input.activity }
}

/** Aproximação clássica de ~7.700 kcal por kg de tecido corporal perdido. */
export const KCAL_PER_KG = 7700

/** Pisos de ingestão frequentemente citados para dietas sem acompanhamento. */
export const MIN_CALORIES: Record<Sex, number> = { male: 1500, female: 1200 }

export function calculateDeficit(input: {
  sex: Sex
  weight: number
  height: number
  age: number
  activity: number
  kgPerWeek: number
}) {
  const { bmr, tdee } = calculateTdee(input)
  const dailyDeficit = (input.kgPerWeek * KCAL_PER_KG) / 7
  const target = tdee - dailyDeficit
  const deficitPercent = (dailyDeficit / tdee) * 100
  const floor = MIN_CALORIES[input.sex]

  const warnings: string[] = []
  if (target < floor) {
    warnings.push(
      `A meta ficou abaixo de ${floor} kcal/dia, valor frequentemente citado como mínimo para dietas sem acompanhamento profissional. Considere um ritmo mais lento.`,
    )
  } else if (target < bmr) {
    warnings.push('A meta ficou abaixo da sua taxa metabólica basal. Um ritmo mais lento tende a ser mais sustentável.')
  }
  if (deficitPercent > 25) {
    warnings.push(
      `Esse ritmo representa um déficit de ${Math.round(deficitPercent)}% do seu gasto diário. Déficits acima de 20–25% costumam ser difíceis de manter e aumentam a perda de massa magra.`,
    )
  }

  return { bmr, tdee, dailyDeficit, target, deficitPercent, warnings }
}
