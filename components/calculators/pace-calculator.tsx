'use client'

import { CalculatorForm } from '@/components/calculator/calculator-form'
import { CalculatorResult, ResultTable } from '@/components/calculator/calculator-result'
import { NumberField, SegmentedField } from '@/components/calculator/fields'
import { useCalculator } from '@/components/calculator/use-calculator'
import { RACE_DISTANCES, paceFromTime, timeFromPace } from '@/lib/calculations/performance'
import { validateFields } from '@/lib/calculations/validation'
import { formatDuration, formatNumber } from '@/lib/format'

const MODE_OPTIONS = [
  { value: 'pace', label: 'Descobrir o pace' },
  { value: 'time', label: 'Descobrir o tempo' },
] as const

type PaceResult = { mode: 'pace' | 'time'; paceSeconds: number; totalSeconds: number; speedKmh: number; distance: number }

const initial = { mode: 'pace', distance: '', hours: '', minutes: '', seconds: '', paceMin: '', paceSec: '' }

export function PaceCalculator() {
  const { fields, setField, errors, formError, result, fail, succeed, reset } = useCalculator<typeof initial, PaceResult>(initial)
  const isPaceMode = fields.mode === 'pace'

  function handleCalculate() {
    if (isPaceMode) {
      const v = validateFields({
        distance: { value: fields.distance, label: 'a distância', unit: 'km', min: 0.1, max: 300 },
        hours: { value: fields.hours, label: 'as horas', min: 0, max: 72, integer: true, optional: true },
        minutes: { value: fields.minutes, label: 'os minutos', min: 0, max: 59, integer: true, optional: true },
        seconds: { value: fields.seconds, label: 'os segundos', min: 0, max: 59, integer: true, optional: true },
      })
      if (!v.valid) return fail(v.errors)
      const totalSeconds = v.values.hours * 3600 + v.values.minutes * 60 + v.values.seconds
      if (totalSeconds === 0) return fail({}, 'Informe o tempo total da corrida.')
      const { paceSeconds, speedKmh } = paceFromTime(v.values.distance, totalSeconds)
      if (paceSeconds < 150) return fail({}, 'O pace resultante está abaixo de 2:30 min/km, mais rápido que recordes mundiais. Confira os valores.')
      return succeed({ mode: 'pace', paceSeconds, totalSeconds, speedKmh, distance: v.values.distance })
    }

    const v = validateFields({
      distance: { value: fields.distance, label: 'a distância', unit: 'km', min: 0.1, max: 300 },
      paceMin: { value: fields.paceMin, label: 'os minutos do pace', min: 2, max: 20, integer: true },
      paceSec: { value: fields.paceSec, label: 'os segundos do pace', min: 0, max: 59, integer: true, optional: true },
    })
    if (!v.valid) return fail(v.errors)
    const paceSeconds = v.values.paceMin * 60 + v.values.paceSec
    const { totalSeconds, speedKmh } = timeFromPace(v.values.distance, paceSeconds)
    succeed({ mode: 'time', paceSeconds, totalSeconds, speedKmh, distance: v.values.distance })
  }

  return (
    <>
      <CalculatorForm onCalculate={handleCalculate} onReset={reset} formError={formError}>
        <SegmentedField name="mode" label="O que você quer calcular?" value={fields.mode} onChange={setField('mode')} options={MODE_OPTIONS} className="sm:col-span-2" />
        <NumberField id="distance" label="Distância" unit="km" value={fields.distance} onChange={setField('distance')} error={errors.distance} placeholder="Ex.: 10" className="sm:col-span-2" />
        {isPaceMode ? (
          <fieldset className="grid grid-cols-3 gap-3 sm:col-span-2">
            <legend className="mb-1.5 text-sm font-medium">Tempo total</legend>
            <NumberField id="hours" label="Horas" unit="h" integer value={fields.hours} onChange={setField('hours')} error={errors.hours} placeholder="0" />
            <NumberField id="minutes" label="Minutos" unit="min" integer value={fields.minutes} onChange={setField('minutes')} error={errors.minutes} placeholder="55" />
            <NumberField id="seconds" label="Segundos" unit="s" integer value={fields.seconds} onChange={setField('seconds')} error={errors.seconds} placeholder="0" />
          </fieldset>
        ) : (
          <fieldset className="grid grid-cols-2 gap-3 sm:col-span-2">
            <legend className="mb-1.5 text-sm font-medium">Pace por quilômetro</legend>
            <NumberField id="paceMin" label="Minutos" unit="min" integer value={fields.paceMin} onChange={setField('paceMin')} error={errors.paceMin} placeholder="5" />
            <NumberField id="paceSec" label="Segundos" unit="s" integer value={fields.paceSec} onChange={setField('paceSec')} error={errors.paceSec} placeholder="30" />
          </fieldset>
        )}
      </CalculatorForm>

      <CalculatorResult
        show={result !== null}
        label={result?.mode === 'time' ? 'Tempo estimado' : 'Seu pace'}
        value={result ? (result.mode === 'time' ? formatDuration(result.totalSeconds) : formatDuration(result.paceSeconds)) : ''}
        unit={result?.mode === 'time' ? undefined : 'min/km'}
        stats={
          result
            ? [
                result.mode === 'time'
                  ? { label: 'Pace', value: formatDuration(result.paceSeconds), unit: 'min/km' }
                  : { label: 'Tempo total', value: formatDuration(result.totalSeconds) },
                { label: 'Velocidade média', value: formatNumber(result.speedKmh, 1), unit: 'km/h' },
              ]
            : undefined
        }
      >
        {result && (
          <ResultTable
            caption="Tempo projetado por distância no mesmo pace"
            headers={['Distância', 'Tempo no mesmo pace']}
            rows={RACE_DISTANCES.map((d) => [d.label, formatDuration(result.paceSeconds * d.km)])}
          />
        )}
      </CalculatorResult>
    </>
  )
}
