import type { ReactNode } from 'react'
import { TriangleAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

export type ResultStat = { label: string; value: string; unit?: string }

type CalculatorResultProps = {
  /** Mantém a região aria-live sempre montada para leitores de tela anunciarem o resultado. */
  show: boolean
  label: string
  value: string
  unit?: string
  caption?: string
  stats?: ResultStat[]
  warnings?: string[]
  children?: ReactNode
}

export function CalculatorResult({ show, label, value, unit, caption, stats, warnings, children }: CalculatorResultProps) {
  return (
    <div aria-live="polite" aria-atomic="true">
      {show && (
        <section aria-label="Resultado" className="mt-6 flex flex-col gap-5 border-t border-primary/20 pt-6">
          <div className="relative overflow-hidden rounded-xl border border-primary/25 bg-accent p-5 shadow-[0_0_30px_oklch(0.82_0.19_132/0.08)] sm:p-6">
            <p className="text-sm font-medium text-accent-foreground">{label}</p>
            <p className="mt-1 flex items-baseline gap-2 font-heading text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              <span>{value}</span>
              {unit && <span className="text-lg font-semibold text-muted-foreground sm:text-xl">{unit}</span>}
            </p>
            {caption && <p className="mt-2 text-sm leading-relaxed text-accent-foreground">{caption}</p>}
          </div>

          {stats && stats.length > 0 && (
            <dl className={cn('grid gap-3', stats.length > 2 ? 'grid-cols-2 lg:grid-cols-3' : 'grid-cols-2')}>
              {stats.map((stat) => (
                <div key={stat.label} className="rounded-lg border bg-card p-4">
                  <dt className="text-xs text-muted-foreground">{stat.label}</dt>
                  <dd className="mt-1 text-lg font-semibold">
                    {stat.value}
                    {stat.unit && <span className="ml-1 text-sm font-normal text-muted-foreground">{stat.unit}</span>}
                  </dd>
                </div>
              ))}
            </dl>
          )}

          {warnings?.map((warning) => (
            <p key={warning} className="flex gap-2.5 rounded-lg bg-warning px-4 py-3 text-sm leading-relaxed text-warning-foreground">
              <TriangleAlert className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
              {warning}
            </p>
          ))}

          {children}

          <p className="text-xs text-muted-foreground">
            Resultado estimado. Não substitui avaliação de um profissional de saúde ou educação física.
          </p>
        </section>
      )}
    </div>
  )
}

export function ResultTable({ caption, headers, rows }: { caption: string; headers: string[]; rows: (string | number)[][] }) {
  return (
    <div className="overflow-x-auto rounded-lg border">
      <table className="w-full text-left text-sm">
        <caption className="sr-only">{caption}</caption>
        <thead className="bg-muted">
          <tr>
            {headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className={cn('px-4 py-2.5', j === 0 && 'font-medium')}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
