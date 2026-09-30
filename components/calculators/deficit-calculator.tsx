'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult } from '@/components/calculator/calculator-result'
import { NumberField, SEX_OPTIONS, SegmentedField, SelectField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { ACTIVITY_LEVELS, calculateDeficit, type Sex } from '@/lib/calculations/energy'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

const PACE_OPTIONS = [
  { value: '0.25', label: '0,25 kg por semana', description: 'gradual' },
  { value: '0.5', label: '0,5 kg por semana', description: 'recomendado' },
  { value: '0.75', label: '0,75 kg por semana', description: 'moderado' },
  { value: '1', label: '1 kg por semana', description: 'agressivo' },
] as const

const initial = { sex: 'female', age: '', weight: '', height: '', activity: '1.375', pace: '0.5' }

export function DeficitCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateDeficit>>(initial)

  function handleCalculate() {
    const v = validateFields({
      age: { value: fields.age, label: 'a idade', unit: 'anos', ...LIMITS.age, integer: true },
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight },
      height: { value: fields.height, label: 'a altura', unit: 'cm', ...LIMITS.height },
    })
    if (!v.valid) return fail(v.errors)
    succeed(
      calculateDeficit({ sex: fields.sex as Sex, ...v.values, activity: Number(fields.activity), kgPerWeek: Number(fields.pace) }),
    )
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <SegmentedField name="sex" label="Sexo" value={fields.sex} onChange={setField('sex')} options={SEX_OPTIONS} />
        <NumberField id="age" label="Idade" unit="anos" integer value={fields.age} onChange={setField('age')} error={errors.age} placeholder="Ex.: 35" />
        <NumberField id="weight" label="Peso atual" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 80" />
        <NumberField id="height" label="Altura" unit="cm" value={fields.height} onChange={setField('height')} error={errors.height} placeholder="Ex.: 165" />
        <SelectField id="activity" label="Nível de atividade" value={fields.activity} onChange={setField('activity')} options={ACTIVITY_LEVELS} />
        <SelectField id="pace" label="Ritmo de perda de peso" value={fields.pace} onChange={setField('pace')} options={PACE_OPTIONS} />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Meta diária de calorias"
        value={result ? formatNumber(Math.max(result.target, 0)) : ''}
        unit="kcal/dia"
        caption={
          result
            ? `Consumindo cerca desse valor, a perda estimada é de ${fields.pace.replace('.', ',')} kg por semana.`
            : undefined
        }
        stats={
          result
            ? [
                { label: 'Calorias de manutenção', value: formatNumber(result.tdee), unit: 'kcal' },
                { label: 'Déficit diário', value: formatNumber(result.dailyDeficit), unit: 'kcal' },
                { label: 'Déficit relativo', value: formatNumber(result.deficitPercent), unit: '%' },
              ]
            : undefined
        }
        warnings={result?.warnings}
      />
    </>
  )
}
