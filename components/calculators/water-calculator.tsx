'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult } from '@/components/calculator/calculator-result'
import { NumberField, SegmentedField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { calculateWater } from '@/lib/calculations/nutrition'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

const CLIMATE_OPTIONS = [
  { value: 'mild', label: 'Ameno' },
  { value: 'hot', label: 'Quente' },
] as const

const initial = { weight: '', exercise: '', climate: 'mild' }

export function WaterCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateWater>>(initial)

  function handleCalculate() {
    const v = validateFields({
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight },
      exercise: { value: fields.exercise, label: 'o tempo de exercício', unit: 'min', min: 0, max: 480, integer: true, optional: true },
    })
    if (!v.valid) return fail(v.errors)
    succeed(calculateWater(v.values.weight, v.values.exercise, fields.climate === 'hot'))
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <NumberField id="weight" label="Peso" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 70" />
        <NumberField
          id="exercise"
          label="Exercício no dia"
          unit="min"
          integer
          value={fields.exercise}
          onChange={setField('exercise')}
          error={errors.exercise}
          placeholder="Ex.: 60"
          hint="Opcional. Deixe em branco se não treinar."
        />
        <SegmentedField name="climate" label="Clima" value={fields.climate} onChange={setField('climate')} options={CLIMATE_OPTIONS} />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Ingestão diária estimada"
        value={result ? formatNumber(result.totalMl / 1000, 1, 1) : ''}
        unit="litros/dia"
        caption={result ? `Equivale a cerca de ${formatNumber(result.cups250)} copos de 250 ml, somando água e outras bebidas.` : undefined}
        stats={
          result
            ? [
                { label: 'Base pelo peso', value: formatNumber(result.base), unit: 'ml' },
                { label: 'Adicional do exercício', value: formatNumber(result.exercise), unit: 'ml' },
                { label: 'Adicional do clima', value: formatNumber(result.climate), unit: 'ml' },
              ]
            : undefined
        }
      />
    </>
  )
}
