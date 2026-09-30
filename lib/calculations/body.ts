import type { Sex } from './energy'

export type BmiCategory = { label: string; min: number; max: number; tone: 'low' | 'ok' | 'warn' | 'high' }

/** Classificação da Organização Mundial da Saúde para adultos. */
export const BMI_CATEGORIES: BmiCategory[] = [
  { label: 'Abaixo do peso', min: 0, max: 18.5, tone: 'low' },
  { label: 'Peso normal', min: 18.5, max: 25, tone: 'ok' },
  { label: 'Sobrepeso', min: 25, max: 30, tone: 'warn' },
  { label: 'Obesidade grau I', min: 30, max: 35, tone: 'high' },
  { label: 'Obesidade grau II', min: 35, max: 40, tone: 'high' },
  { label: 'Obesidade grau III', min: 40, max: Infinity, tone: 'high' },
]

export function calculateBmi(weightKg: number, heightCm: number) {
  const meters = heightCm / 100
  const bmi = weightKg / (meters * meters)
  const category = BMI_CATEGORIES.find((c) => bmi >= c.min && bmi < c.max) ?? BMI_CATEGORIES[BMI_CATEGORIES.length - 1]
  return { bmi, category, healthyRange: healthyWeightRange(heightCm) }
}

export function healthyWeightRange(heightCm: number) {
  const meters = heightCm / 100
  return { min: 18.5 * meters * meters, max: 24.9 * meters * meters }
}

const CM_PER_INCH = 2.54
const FIVE_FEET_CM = 152.4

/** Fórmulas de peso ideal baseadas em polegadas acima de 5 pés (152,4 cm). */
export function calculateIdealWeight(sex: Sex, heightCm: number) {
  const inchesOver = (heightCm - FIVE_FEET_CM) / CM_PER_INCH
  const isMale = sex === 'male'
  const formulas = [
    { name: 'Devine (1974)', value: isMale ? 50 + 2.3 * inchesOver : 45.5 + 2.3 * inchesOver },
    { name: 'Robinson (1983)', value: isMale ? 52 + 1.9 * inchesOver : 49 + 1.7 * inchesOver },
    { name: 'Miller (1983)', value: isMale ? 56.2 + 1.41 * inchesOver : 53.1 + 1.36 * inchesOver },
    { name: 'Hamwi (1964)', value: isMale ? 48 + 2.7 * inchesOver : 45.5 + 2.2 * inchesOver },
  ]
  const average = formulas.reduce((sum, f) => sum + f.value, 0) / formulas.length
  return {
    formulas,
    average,
    healthyRange: healthyWeightRange(heightCm),
    belowFormulaRange: heightCm < FIVE_FEET_CM,
  }
}

export type BodyFatCategory = { label: string; min: number; max: number }

/** Faixas de referência do American Council on Exercise (ACE). */
export const BODY_FAT_CATEGORIES: Record<Sex, BodyFatCategory[]> = {
  male: [
    { label: 'Gordura essencial', min: 0, max: 6 },
    { label: 'Atleta', min: 6, max: 14 },
    { label: 'Boa forma', min: 14, max: 18 },
    { label: 'Média', min: 18, max: 25 },
    { label: 'Acima da média', min: 25, max: Infinity },
  ],
  female: [
    { label: 'Gordura essencial', min: 0, max: 14 },
    { label: 'Atleta', min: 14, max: 21 },
    { label: 'Boa forma', min: 21, max: 25 },
    { label: 'Média', min: 25, max: 32 },
    { label: 'Acima da média', min: 32, max: Infinity },
  ],
}

/** Método da Marinha dos EUA (Hodgdon & Beckett, 1984), versão em centímetros. */
export function calculateNavyBodyFat(input: {
  sex: Sex
  height: number
  neck: number
  waist: number
  hip?: number
}): { ok: true; bodyFat: number } | { ok: false; error: string } {
  const { sex, height, neck, waist, hip = 0 } = input
  let bodyFat: number
  if (sex === 'male') {
    if (waist <= neck) return { ok: false, error: 'A circunferência da cintura precisa ser maior que a do pescoço.' }
    bodyFat = 495 / (1.0324 - 0.19077 * Math.log10(waist - neck) + 0.15456 * Math.log10(height)) - 450
  } else {
    if (waist + hip <= neck) return { ok: false, error: 'A soma de cintura e quadril precisa ser maior que o pescoço.' }
    bodyFat = 495 / (1.29579 - 0.35004 * Math.log10(waist + hip - neck) + 0.221 * Math.log10(height)) - 450
  }
  if (!Number.isFinite(bodyFat) || bodyFat < 2 || bodyFat > 60) {
    return {
      ok: false,
      error: 'As medidas informadas geram um resultado fora da faixa plausível. Confira se as medidas estão em centímetros.',
    }
  }
  return { ok: true, bodyFat }
}

export function bodyFatCategory(sex: Sex, bodyFat: number) {
  const list = BODY_FAT_CATEGORIES[sex]
  return list.find((c) => bodyFat >= c.min && bodyFat < c.max) ?? list[list.length - 1]
}

/** Fórmulas de massa magra (massa livre de gordura). Peso em kg, altura em cm. */
export function calculateLeanMassFormulas(sex: Sex, weight: number, height: number) {
  const isMale = sex === 'male'
  const ratio = weight / height
  const formulas = [
    { name: 'Boer (1984)', value: isMale ? 0.407 * weight + 0.267 * height - 19.2 : 0.252 * weight + 0.473 * height - 48.3 },
    {
      name: 'James (1976)',
      value: isMale ? 1.1 * weight - 128 * ratio * ratio : 1.07 * weight - 148 * ratio * ratio,
    },
    {
      name: 'Hume (1966)',
      value: isMale ? 0.3281 * weight + 0.33929 * height - 29.5336 : 0.29569 * weight + 0.41813 * height - 43.2933,
    },
  ]
  const valid = formulas.filter((f) => f.value > 0 && f.value < weight)
  if (valid.length === 0) return null
  const average = valid.reduce((sum, f) => sum + f.value, 0) / valid.length
  return { formulas: valid, average, bodyFatPercent: ((weight - average) / weight) * 100 }
}

export function calculateLeanMassFromBodyFat(weight: number, bodyFatPercent: number) {
  const fatMass = weight * (bodyFatPercent / 100)
  return { leanMass: weight - fatMass, fatMass }
}
