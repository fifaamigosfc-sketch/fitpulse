'use client'

import type { FormEvent, ReactNode } from 'react'
import { Calculator, RotateCcw } from 'lucide-react'

type CalculatorFormProps = {
  onCalculate: () => void
  onReset: () => void
  children: ReactNode
  submitLabel?: string
  formError?: string
}

export function CalculatorForm({ onCalculate, onReset, children, submitLabel = 'Calcular', formError }: CalculatorFormProps) {
  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    onCalculate()
  }

  return (
    <form onSubmit={handleSubmit} onReset={onReset} noValidate className="flex flex-col gap-5">
      <div className="grid gap-4 sm:grid-cols-2">{children}</div>
      {formError && (
        <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {formError}
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row">
        <button
          type="submit"
          className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-lg bg-primary px-6 text-base font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
        >
          <Calculator className="size-4.5" aria-hidden="true" />
          {submitLabel}
        </button>
        <button
          type="reset"
          className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-input bg-card px-5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        >
          <RotateCcw className="size-4" aria-hidden="true" />
          Limpar
        </button>
      </div>
    </form>
  )
}
