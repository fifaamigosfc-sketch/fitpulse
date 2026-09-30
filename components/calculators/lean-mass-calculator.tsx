'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult, ResultTable } from '@/components/calculator/calculator-result'
import { NumberField, SEX_OPTIONS, SegmentedField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { calculateLeanMassFormulas, calculateLeanMassFromBodyFat } from '@/lib/calculations/body'
import type { Sex } from '@/lib/calculations/energy'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

type LeanMassResult = {
  leanMass: number
  fatMass: number
  bodyFat: number
  source: 'bodyFat' | 'formulas'
  formulas?: { name: string; value: number }[]
}

const initial = { sex: 'male', weight: '', height: '', bodyFat: '' }

export function LeanMassCalculator() {
  const { fields, setField, errors, formError, result, fail, succeed, reset } = useCalculator<typeof initial, LeanMassResult>(initial)

  function handleCalculate() {
    const v = validateFields({
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight },
      height: { value: fields.height, label: 'a altura', unit: 'cm', ...LIMITS.height },
      bodyFat: { value: fields.bodyFat, label: 'o percentual de gordura', unit: '%', min: 3, max: 60, optional: true },
    })
    if (!v.valid) return fail(v.errors)
    const { weight, height, bodyFat } = v.values

    if (bodyFat > 0) {
      const mass = calculateLeanMassFromBodyFat(weight, bodyFat)
      return succeed({ ...mass, bodyFat, source: 'bodyFat' })
    }
    const estimate = calculateLeanMassFormulas(fields.sex as Sex, weight, height)
    if (!estimate) return fail({}, 'Não foi possível estimar com esses valores. Confira peso e altura.')
    succeed({
      leanMass: estimate.average,
      fatMass: weight - estimate.average,
      bodyFat: estimate.bodyFatPercent,
      source: 'formulas',
      formulas: estimate.formulas,
    })
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset} formError={formError}>
        <SegmentedField name="sex" label="Sexo" value={fields.sex} onChange={setField('sex')} options={SEX_OPTIONS} />
        <NumberField id="weight" label="Peso" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 80" />
        <NumberField id="height" label="Altura" unit="cm" value={fields.height} onChange={setField('height')} error={errors.height} placeholder="Ex.: 178" />
        <NumberField
          id="bodyFat"
          label="Percentual de gordura"
          unit="%"
          value={fields.bodyFat}
          onChange={setField('bodyFat')}
          error={errors.bodyFat}
          placeholder="Ex.: 18"
          hint="Opcional. Se souber, o cálculo fica mais preciso."
        />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Massa magra estimada"
        value={result ? formatNumber(result.leanMass, 1, 1) : ''}
        unit="kg"
        caption={
          result?.source === 'bodyFat'
            ? 'Calculada a partir do percentual de gordura informado.'
            : 'Média das fórmulas de Boer, James e Hume, baseadas em peso, altura e sexo.'
        }
        stats={
          result
            ? [
                { label: 'Massa gorda', value: formatNumber(result.fatMass, 1), unit: 'kg' },
                {
                  label: result.source === 'bodyFat' ? 'Gordura corporal' : 'Gordura implícita',
                  value: formatNumber(result.bodyFat, 1),
                  unit: '%',
                },
              ]
            : undefined
        }
      >
        {result?.formulas && (
          <ResultTable
            caption="Massa magra por fórmula"
            headers={['Fórmula', 'Massa magra']}
            rows={result.formulas.map((f) => [f.name, `${formatNumber(f.value, 1)} kg`])}
          />
        )}
      </CalculatorResult>
    </>
  )
}
