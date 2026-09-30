'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult } from '@/components/calculator/calculator-result'
import { NumberField, SelectField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { PROTEIN_GOALS, calculateProtein, type ProteinGoal } from '@/lib/calculations/nutrition'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

const MEAL_OPTIONS = ['3', '4', '5', '6'].map((n) => ({ value: n, label: `${n} refeições` }))

const initial = { weight: '', goal: 'active', meals: '4' }

export function ProteinCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateProtein>>(initial)

  function handleCalculate() {
    const v = validateFields({ weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight } })
    if (!v.valid) return fail(v.errors)
    succeed(calculateProtein(v.values.weight, fields.goal as ProteinGoal, Number(fields.meals)))
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <NumberField id="weight" label="Peso" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 70" />
        <SelectField id="meals" label="Refeições por dia" value={fields.meals} onChange={setField('meals')} options={MEAL_OPTIONS} />
        <SelectField
          id="goal"
          label="Objetivo"
          value={fields.goal}
          onChange={setField('goal')}
          options={PROTEIN_GOALS}
          className="sm:col-span-2"
        />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Meta diária de proteína"
        value={result ? formatNumber(result.target) : ''}
        unit="g/dia"
        caption={result ? `Faixa recomendada: ${formatNumber(result.min)} a ${formatNumber(result.max)} g por dia. ${result.config.note}` : undefined}
        stats={
          result
            ? [
                { label: 'Por refeição', value: formatNumber(result.perMeal), unit: 'g' },
                {
                  label: 'Por kg de peso',
                  value: `${formatNumber(result.config.min, 1)}–${formatNumber(result.config.max, 1)}`,
                  unit: 'g/kg',
                },
                { label: 'Calorias da proteína', value: formatNumber(result.target * 4), unit: 'kcal' },
              ]
            : undefined
        }
      />
    </>
  )
}
