import type { ComponentType } from 'react'
import type { ToolSlug } from '@/lib/tools/types'
import { BmiCalculator } from './bmi-calculator'
import { BodyFatCalculator } from './body-fat-calculator'
import { DeficitCalculator } from './deficit-calculator'
import { IdealWeightCalculator } from './ideal-weight-calculator'
import { LeanMassCalculator } from './lean-mass-calculator'
import { MacrosCalculator } from './macros-calculator'
import { OneRepMaxCalculator } from './one-rep-max-calculator'
import { PaceCalculator } from './pace-calculator'
import { ProteinCalculator } from './protein-calculator'
import { TdeeCalculator } from './tdee-calculator'
import { WaterCalculator } from './water-calculator'

export const calculatorComponents: Record<ToolSlug, ComponentType> = {
  'calculadora-calorias-tdee': TdeeCalculator,
  'calculadora-deficit-calorico': DeficitCalculator,
  'calculadora-peso-ideal': IdealWeightCalculator,
  'calculadora-proteina': ProteinCalculator,
  'calculadora-macros': MacrosCalculator,
  'calculadora-agua': WaterCalculator,
  'calculadora-imc': BmiCalculator,
  'calculadora-percentual-gordura': BodyFatCalculator,
  'calculadora-massa-magra': LeanMassCalculator,
  'calculadora-1rm': OneRepMaxCalculator,
  'calculadora-pace': PaceCalculator,
}
