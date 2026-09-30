'use client'

import { useState } from 'react'

/** Estado de formulário + erros + resultado, compartilhado por todas as calculadoras. */
export function useCalculator<F extends Record<string, string>, R>(initial: F) {
  const [fields, setFields] = useState<F>(initial)
  const [errors, setErrors] = useState<Partial<Record<keyof F, string>>>({})
  const [formError, setFormError] = useState<string>()
  const [result, setResult] = useState<R | null>(null)

  function setField<K extends keyof F>(key: K) {
    return (value: string) => {
      setFields((prev) => ({ ...prev, [key]: value }))
      setErrors((prev) => (prev[key] ? { ...prev, [key]: undefined } : prev))
    }
  }

  function fail(nextErrors: Partial<Record<keyof F, string>>, message?: string) {
    setErrors(nextErrors)
    setFormError(message)
    setResult(null)
  }

  function succeed(next: R) {
    setErrors({})
    setFormError(undefined)
    setResult(next)
  }

  function reset() {
    setFields(initial)
    setErrors({})
    setFormError(undefined)
    setResult(null)
  }

  return { fields, setField, errors, formError, result, fail, succeed, reset }
}
