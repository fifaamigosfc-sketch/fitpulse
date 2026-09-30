export function formatNumber(value: number, maximumFractionDigits = 0, minimumFractionDigits = 0) {
  return new Intl.NumberFormat('pt-BR', { maximumFractionDigits, minimumFractionDigits }).format(value)
}

/** Formata segundos como h:mm:ss ou mm:ss. */
export function formatDuration(totalSeconds: number) {
  const rounded = Math.round(totalSeconds)
  const hours = Math.floor(rounded / 3600)
  const minutes = Math.floor((rounded % 3600) / 60)
  const seconds = rounded % 60
  const pad = (n: number) => String(n).padStart(2, '0')
  return hours > 0 ? `${hours}:${pad(minutes)}:${pad(seconds)}` : `${pad(minutes)}:${pad(seconds)}`
}
