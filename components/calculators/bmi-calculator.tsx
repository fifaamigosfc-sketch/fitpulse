'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult } from '@/components/calculator/calculator-result'
import { NumberField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { BMI_CATEGORIES, calculateBmi } from '@/lib/calculations/body'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'
import { cn } from '@/lib/utils'

const initial = { weight: '', height: '' }

const SCALE_MIN = 15
const SCALE_MAX = 40

export function BmiCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateBmi>>(initial)

  function handleCalculate() {
    const v = validateFields({
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight },
      height: { value: fields.height, label: 'a altura', unit: 'cm', ...LIMITS.height },
    })
    if (!v.valid) return fail(v.errors)
    succeed(calculateBmi(v.values.weight, v.values.height))
  }

  const markerPosition = result ? ((Math.min(Math.max(result.bmi, SCALE_MIN), SCALE_MAX) - SCALE_MIN) / (SCALE_MAX - SCALE_MIN)) * 100 : 0

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <NumberField id="weight" label="Peso" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 72" />
        <NumberField id="height" label="Altura" unit="cm" value={fields.height} onChange={setField('height')} error={errors.height} placeholder="Ex.: 170" />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Seu IMC"
        value={result ? formatNumber(result.bmi, 1, 1) : ''}
        unit="kg/m²"
        caption={result ? `Classificação: ${result.category.label}.` : undefined}
        stats={
          result
            ? [
                {
                  label: 'Peso saudável para sua altura',
                  value: `${formatNumber(result.healthyRange.min, 1)} – ${formatNumber(result.healthyRange.max, 1)}`,
                  unit: 'kg',
                },
                { label: 'Classificação OMS', value: result.category.label },
              ]
            : undefined
        }
      >
        {result && (
          <div aria-hidden="true" className="flex flex-col gap-2">
            <div className="relative flex h-3 overflow-hidden rounded-full">
              <div className="bg-sky-400" style={{ width: `${((18.5 - SCALE_MIN) / 25) * 100}%` }} />
              <div className="bg-primary" style={{ width: `${(6.5 / 25) * 100}%` }} />
              <div className="bg-amber-400" style={{ width: `${(5 / 25) * 100}%` }} />
              <div className="flex-1 bg-destructive/80" />
            </div>
            <div className="relative h-4">
              <span
                className="absolute top-0 size-0 -translate-x-1/2 border-x-[6px] border-b-[8px] border-x-transparent border-b-foreground"
                style={{ left: `${markerPosition}%` }}
              />
            </div>
            <ul className="grid grid-cols-2 gap-1 text-xs text-muted-foreground sm:grid-cols-3">
              {BMI_CATEGORIES.map((c) => (
                <li key={c.label} className={cn(c.label === result.category.label && 'font-semibold text-foreground')}>
                  {c.label}: {c.max === Infinity ? `≥ ${formatNumber(c.min, 1)}` : `${formatNumber(c.min, 1)}–${formatNumber(c.max - 0.1, 1)}`}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CalculatorResult>
    </>
  )
}
