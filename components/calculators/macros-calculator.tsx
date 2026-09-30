'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult } from '@/components/calculator/calculator-result'
import { NumberField, SelectField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { MACRO_GOALS, calculateMacros, type MacroGoal } from '@/lib/calculations/nutrition'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

type MacroResult = Extract<ReturnType<typeof calculateMacros>, { ok: true }> & { calories: number }

const initial = { calories: '', weight: '', goal: 'maintain' }

const BAR_COLORS = {
  protein: 'bg-primary',
  carbs: 'bg-highlight',
  fat: 'bg-foreground/70',
} as const

export function MacrosCalculator() {
  const { fields, setField, errors, formError, result, fail, succeed, reset } = useCalculator<typeof initial, MacroResult>(initial)

  function handleCalculate() {
    const v = validateFields({
      calories: { value: fields.calories, label: 'as calorias diárias', unit: 'kcal', min: 1000, max: 6000, integer: true },
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight },
    })
    if (!v.valid) return fail(v.errors)
    const macros = calculateMacros(v.values.calories, v.values.weight, fields.goal as MacroGoal)
    if (!macros.ok) return fail({}, macros.error)
    succeed({ ...macros, calories: v.values.calories })
  }

  const rows = result
    ? ([
        { key: 'protein', label: 'Proteínas', grams: result.protein, percent: result.percents.protein },
        { key: 'carbs', label: 'Carboidratos', grams: result.carbs, percent: result.percents.carbs },
        { key: 'fat', label: 'Gorduras', grams: result.fat, percent: result.percents.fat },
      ] as const)
    : []

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset} formError={formError}>
        <NumberField
          id="calories"
          label="Calorias diárias"
          unit="kcal"
          integer
          value={fields.calories}
          onChange={setField('calories')}
          error={errors.calories}
          placeholder="Ex.: 2200"
          hint="Use o resultado da calculadora de TDEE ou de déficit."
        />
        <NumberField id="weight" label="Peso" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 75" />
        <SelectField id="goal" label="Objetivo" value={fields.goal} onChange={setField('goal')} options={MACRO_GOALS} className="sm:col-span-2" />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Distribuição diária"
        value={result ? formatNumber(result.calories) : ''}
        unit="kcal"
        stats={rows.map((r) => ({ label: r.label, value: formatNumber(r.grams), unit: 'g' }))}
      >
        {result && (
          <div className="flex flex-col gap-3">
            <div className="flex h-3 overflow-hidden rounded-full" aria-hidden="true">
              {rows.map((r) => (
                <div key={r.key} className={BAR_COLORS[r.key]} style={{ width: `${r.percent}%` }} />
              ))}
            </div>
            <ul className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
              {rows.map((r) => (
                <li key={r.key} className="flex items-center gap-2">
                  <span className={`size-2.5 rounded-full ${BAR_COLORS[r.key]}`} aria-hidden="true" />
                  {r.label}: {formatNumber(r.percent)}% das calorias
                </li>
              ))}
            </ul>
          </div>
        )}
      </CalculatorResult>
    </>
  )
}
