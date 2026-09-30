'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult } from '@/components/calculator/calculator-result'
import { NumberField, SEX_OPTIONS, SegmentedField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { bodyFatCategory, calculateLeanMassFromBodyFat, calculateNavyBodyFat } from '@/lib/calculations/body'
import type { Sex } from '@/lib/calculations/energy'
import { LIMITS, validateFields } from '@/lib/calculations/validation'
import { formatNumber } from '@/lib/format'

type BodyFatResult = {
  bodyFat: number
  category: string
  leanMass?: number
  fatMass?: number
}

const initial = { sex: 'male', height: '', neck: '', waist: '', hip: '', weight: '' }

export function BodyFatCalculator() {
  const { fields, setField, errors, formError, result, fail, succeed, reset } = useCalculator<typeof initial, BodyFatResult>(initial)
  const isFemale = fields.sex === 'female'

  function handleCalculate() {
    const v = validateFields({
      height: { value: fields.height, label: 'a altura', unit: 'cm', ...LIMITS.height },
      neck: { value: fields.neck, label: 'o pescoço', unit: 'cm', min: 20, max: 70 },
      waist: { value: fields.waist, label: 'a cintura', unit: 'cm', min: 40, max: 200 },
      hip: { value: fields.hip, label: 'o quadril', unit: 'cm', min: 50, max: 200, optional: !isFemale },
      weight: { value: fields.weight, label: 'o peso', unit: 'kg', ...LIMITS.weight, optional: true },
    })
    if (!v.valid) return fail(v.errors)
    const sex = fields.sex as Sex
    const navy = calculateNavyBodyFat({ sex, height: v.values.height, neck: v.values.neck, waist: v.values.waist, hip: v.values.hip })
    if (!navy.ok) return fail({}, navy.error)
    const mass = v.values.weight > 0 ? calculateLeanMassFromBodyFat(v.values.weight, navy.bodyFat) : undefined
    succeed({ bodyFat: navy.bodyFat, category: bodyFatCategory(sex, navy.bodyFat).label, ...mass })
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset} formError={formError}>
        <SegmentedField name="sex" label="Sexo" value={fields.sex} onChange={setField('sex')} options={SEX_OPTIONS} />
        <NumberField id="height" label="Altura" unit="cm" value={fields.height} onChange={setField('height')} error={errors.height} placeholder="Ex.: 175" />
        <NumberField
          id="neck"
          label="Pescoço"
          unit="cm"
          value={fields.neck}
          onChange={setField('neck')}
          error={errors.neck}
          placeholder="Ex.: 38"
          hint="Logo abaixo do pomo de adão."
        />
        <NumberField
          id="waist"
          label="Cintura"
          unit="cm"
          value={fields.waist}
          onChange={setField('waist')}
          error={errors.waist}
          placeholder="Ex.: 85"
          hint={isFemale ? 'Na parte mais estreita.' : 'Na altura do umbigo.'}
        />
        {isFemale && (
          <NumberField
            id="hip"
            label="Quadril"
            unit="cm"
            value={fields.hip}
            onChange={setField('hip')}
            error={errors.hip}
            placeholder="Ex.: 100"
            hint="Na parte mais larga dos glúteos."
          />
        )}
        <NumberField
          id="weight"
          label="Peso"
          unit="kg"
          value={fields.weight}
          onChange={setField('weight')}
          error={errors.weight}
          placeholder="Ex.: 78"
          hint="Opcional. Para calcular massa gorda e magra."
        />
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label="Percentual de gordura estimado"
        value={result ? formatNumber(result.bodyFat, 1, 1) : ''}
        unit="%"
        caption={result ? `Classificação (ACE): ${result.category}.` : undefined}
        stats={
          result?.leanMass !== undefined && result.fatMass !== undefined
            ? [
                { label: 'Massa gorda', value: formatNumber(result.fatMass, 1), unit: 'kg' },
                { label: 'Massa magra', value: formatNumber(result.leanMass, 1), unit: 'kg' },
              ]
            : undefined
        }
      />
    </>
  )
}
