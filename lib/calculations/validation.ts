/** Aceita vírgula ou ponto como separador decimal. */
export function parseNumber(raw: string): number | null {
  const normalized = raw.trim().replace(/\s/g, '').replace(',', '.')
  if (normalized === '' || !/^-?\d*\.?\d+$/.test(normalized)) return null
  const value = Number(normalized)
  return Number.isFinite(value) ? value : null
}

export type FieldRule = {
  value: string
  label: string
  min: number
  max: number
  unit?: string
  integer?: boolean
  optional?: boolean
}

export type ValidationResult<K extends string> =
  | { valid: true; values: Record<K, number>; errors: Partial<Record<K, string>> }
  | { valid: false; values: Partial<Record<K, number>>; errors: Partial<Record<K, string>> }

export function validateFields<K extends string>(rules: Record<K, FieldRule>): ValidationResult<K> {
  const values: Partial<Record<K, number>> = {}
  const errors: Partial<Record<K, string>> = {}

  for (const key of Object.keys(rules) as K[]) {
    const rule = rules[key]
    if (rule.optional && rule.value.trim() === '') {
      values[key] = 0
      continue
    }
    const parsed = parseNumber(rule.value)
    const unit = rule.unit ? ` ${rule.unit}` : ''
    if (parsed === null) {
      errors[key] = `Informe ${rule.label} usando apenas números.`
    } else if (rule.integer && !Number.isInteger(parsed)) {
      errors[key] = `Informe ${rule.label} como número inteiro.`
    } else if (parsed < rule.min || parsed > rule.max) {
      errors[key] = `Informe ${rule.label} entre ${rule.min}${unit} e ${rule.max}${unit}.`
    } else {
      values[key] = parsed
    }
  }

  if (Object.keys(errors).length > 0) return { valid: false, values, errors }
  return { valid: true, values: values as Record<K, number>, errors }
}

export const LIMITS = {
  age: { min: 15, max: 100 },
  weight: { min: 30, max: 300 },
  height: { min: 120, max: 230 },
} as const
