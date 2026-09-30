import type { LucideIcon } from 'lucide-react'

export type CategorySlug = 'calorias-emagrecimento' | 'nutricao' | 'composicao-corporal' | 'treino' | 'corrida'

export type Category = {
  slug: CategorySlug
  name: string
  description: string
  intro: string
  icon: LucideIcon
}

export type ToolSlug =
  | 'calculadora-calorias-tdee'
  | 'calculadora-deficit-calorico'
  | 'calculadora-peso-ideal'
  | 'calculadora-proteina'
  | 'calculadora-macros'
  | 'calculadora-agua'
  | 'calculadora-imc'
  | 'calculadora-percentual-gordura'
  | 'calculadora-massa-magra'
  | 'calculadora-1rm'
  | 'calculadora-pace'

export type Tool = {
  slug: ToolSlug
  name: string
  shortName: string
  category: CategorySlug
  description: string
  icon: LucideIcon
  related: ToolSlug[]
  seo: {
    title: string
    description: string
  }
}

export type FormulaItem = {
  label: string
  expression: string
}

export type ContentTable = {
  caption: string
  headers: string[]
  rows: string[][]
}

export type ToolContent = {
  intro: string[]
  howItWorks: string[]
  formula?: {
    intro?: string
    items: FormulaItem[]
    variables?: string[]
  }
  interpretation: {
    paragraphs: string[]
    table?: ContentTable
  }
  example?: {
    title: string
    steps: string[]
  }
  notes: string[]
  faq: { question: string; answer: string }[]
  references?: string[]
}
