'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult, ResultTable } from '@/components/calculator/calculator-result'
import { NumberField, SEX_OPTIONS, SegmentedField, SelectField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { ACTIVITY_LEVELS, calculateTdee, type Sex } from '@/lib/calculations/energy'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

const initial = { sex: 'male', age: '', weight: '', height: '', activity: '1.55' }

export function TdeeCalculator() {
  const { fields, setField, errors, result, fail, succeed, reset } = useCalculator<typeof initial, ReturnType<typeof calculateTdee>>(initial)

  function handleCalculate() {
    const v = validateFields({
      age: { value: fields.age, label: 'a idade', unit: 'anos', ...LIMITS.age, integer: true },
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight },
      height: { value: fields.height, label: 'a altura', unit: 'cm', ...LIMITS.height },
    })
    if (!v.valid) return fail(v.errors)
    succeed(calculateTdee({ sex: fields.sex as Sex, ...v.values, activity: Number(fields.activity) }))
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset}>
        <SegmentedField name="sex" label="Sexo" value={fields.sex} onChange={setField('sex')} options={SEX_OPTIONS} />
        <NumberField id="age" label="Idade" unit="anos" integer value={fields.age} onChange={setField('age')} error={errors.age} placeholder="Ex.: 30" />
        <NumberField id="weight" label="Peso" unit="kg" value={fields.weight} onChange={setField('weight')} error={errors.weight} placeholder="Ex.: 75" />
        <NumberField id="height" label="Altura" unit="cm" value={fields.height} onChange={setField('height')} error={errors.height} placeholder="Ex.: 175" />
        <SelectField
          id="activity"
          label="Nível de atividade"
          value={fields.activity}
          onChange={setField('activity')}
          options={ACTIVITY_LEVELS}
          className="sm:col-span-2"
        />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Gasto energético total diário (TDEE)"
        value={result ? formatNumber(result.tdee) : ''}
        unit="kcal/dia"
        caption="É a estimativa de calorias para manter o peso atual com o nível de atividade informado."
        stats={
          result
            ? [
                { label: 'Taxa metabólica basal', value: formatNumber(result.bmr), unit: 'kcal' },
                { label: 'Gasto com atividades', value: formatNumber(result.tdee - result.bmr), unit: 'kcal' },
              ]
            : undefined
        }
      >
        {result && (
          <ResultTable
            caption="Metas calóricas de referência"
            headers={['Objetivo', 'Calorias por dia']}
            rows={[
              ['Perder peso (−20%)', `${formatNumber(result.tdee * 0.8)} kcal`],
              ['Perder peso leve (−10%)', `${formatNumber(result.tdee * 0.9)} kcal`],
              ['Manter o peso', `${formatNumber(result.tdee)} kcal`],
              ['Ganhar massa (+10%)', `${formatNumber(result.tdee * 1.1)} kcal`],
            ]}
          />
        )}
      </CalculatorResult>
    </>
  )
}
