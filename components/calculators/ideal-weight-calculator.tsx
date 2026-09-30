'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult, ResultTable } from '@/components/calculator/calculator-result'
import { NumberField, SEX_OPTIONS, SegmentedField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { calculateIdealWeight } from '@/lib/calculations/body'
import type { Sex } from '@/lib/calculations/energy'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

const initial = { sex: 'male', height: '' }

export function IdealWeightCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateIdealWeight>>(initial)

  function handleCalculate() {
    const v = validateFields({ height: { value: fields.height, label: 'a altura', unit: 'cm', ...LIMITS.height } })
    if (!v.valid) return fail(v.errors)
    succeed(calculateIdealWeight(fields.sex as Sex, v.values.height))
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <SegmentedField name="sex" label="Sexo" value={fields.sex} onChange={setField('sex')} options={SEX_OPTIONS} />
        <NumberField id="height" label="Altura" unit="cm" value={fields.height} onChange={setField('height')} error={errors.height} placeholder="Ex.: 170" />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Faixa de peso saudável pelo IMC"
        value={result ? `${formatNumber(result.healthyRange.min, 1)} – ${formatNumber(result.healthyRange.max, 1)}` : ''}
        unit="kg"
        caption={result ? `Média das fórmulas clássicas: ${formatNumber(result.average, 1)} kg.` : undefined}
        warnings={
          result?.belowFormulaRange
            ? ['As fórmulas clássicas foram criadas para alturas acima de 152 cm. Para a sua altura, priorize a faixa pelo IMC.']
            : undefined
        }
      >
        {result && (
          <ResultTable
            caption="Peso de referência por fórmula"
            headers={['Fórmula', 'Peso de referência']}
            rows={result.formulas.map((f) => [f.name, `${formatNumber(f.value, 1)} kg`])}
          />
        )}
      </CalculatorResult>
    </>
  )
}
