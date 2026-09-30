'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult, ResultTable } from '@/components/calculator/calculator-result'
import { NumberField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { PERCENT_TABLE, calculateOneRepMax } from '@/lib/calculations/performance'
import { validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

const initial = { weight: '', reps: '' }

export function OneRepMaxCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateOneRepMax>>(initial)

  function handleCalculate() {
    const v = validateFields({
      weight: { value: fields.weight, label: 'a carga', unit: 'kg', min: 1, max: 500 },
      reps: { value: fields.reps, label: 'as repetições', min: 1, max: 12, integer: true },
    })
    if (!v.valid) return fail(v.errors)
    succeed(calculateOneRepMax(v.values.weight, v.values.reps))
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <NumberField id="weight" label="Carga levantada" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 80" />
        <NumberField
          id="reps"
          label="Repetições completas"
          integer
          value={fields.reps}
          onChange={setField('reps')}
          error={errors.reps}
          placeholder="Ex.: 6"
          hint="Entre 1 e 12. Até 10 repetições a estimativa é mais precisa."
        />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="1RM estimado"
        value={result ? formatNumber(result.average, 1) : ''}
        unit="kg"
        caption="Média das fórmulas de Epley, Brzycki e Lombardi."
        stats={result?.formulas.map((f) => ({ label: f.name, value: formatNumber(f.value, 1), unit: 'kg' }))}
      >
        {result && (
          <ResultTable
            caption="Cargas por percentual do 1RM"
            headers={['% do 1RM', 'Carga', 'Repetições aprox.']}
            rows={PERCENT_TABLE.map((row) => [`${row.percent}%`, `${formatNumber((result.average * row.percent) / 100, 1)} kg`, row.reps])}
          />
        )}
      </CalculatorResult>
    </>
  )
}
