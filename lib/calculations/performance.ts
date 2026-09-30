export function calculateOneRepMax(weight: number, reps: number) {
  if (reps === 1) {
    return {
      formulas: [
        { name: 'Epley', value: weight },
        { name: 'Brzycki', value: weight },
        { name: 'Lombardi', value: weight },
      ],
      average: weight,
    }
  }
  const formulas = [
    { name: 'Epley', value: weight * (1 + reps / 30) },
    { name: 'Brzycki', value: weight * (36 / (37 - reps)) },
    { name: 'Lombardi', value: weight * Math.pow(reps, 0.1) },
  ]
  const average = formulas.reduce((sum, f) => sum + f.value, 0) / formulas.length
  return { formulas, average }
}

/** Repetições aproximadas por percentual de 1RM (tabela usual de referência). */
export const PERCENT_TABLE = [
  { percent: 100, reps: '1' },
  { percent: 95, reps: '2' },
  { percent: 90, reps: '4' },
  { percent: 85, reps: '6' },
  { percent: 80, reps: '8' },
  { percent: 75, reps: '10' },
  { percent: 70, reps: '12' },
  { percent: 65, reps: '15' },
  { percent: 60, reps: '18–20' },
] as const

export const RACE_DISTANCES = [
  { label: '5 km', km: 5 },
  { label: '10 km', km: 10 },
  { label: 'Meia maratona (21,1 km)', km: 21.0975 },
  { label: 'Maratona (42,2 km)', km: 42.195 },
] as const

export function paceFromTime(distanceKm: number, totalSeconds: number) {
  const paceSeconds = totalSeconds / distanceKm
  return { paceSeconds, speedKmh: distanceKm / (totalSeconds / 3600) }
}

export function timeFromPace(distanceKm: number, paceSeconds: number) {
  return { totalSeconds: paceSeconds * distanceKm, speedKmh: 3600 / paceSeconds }
}
