import type { ReactNode } from 'react'
import type { ContentTable, ToolContent } from '@/lib/tools/types'

export function ContentSection({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={id} className="flex flex-col gap-4">
      <h2 id={id} className="text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-foreground/85">{children}</div>
    </section>
  )
}

function Paragraphs({ items }: { items: string[] }) {
  return items.map((p) => <p key={p}>{p}</p>)
}

export function CalculatorExplanation({ paragraphs }: { paragraphs: string[] }) {
  return (
    <ContentSection id="como-funciona" title="Como funciona">
      <Paragraphs items={paragraphs} />
    </ContentSection>
  )
}

export function CalculatorFormula({ formula }: { formula: NonNullable<ToolContent['formula']> }) {
  return (
    <ContentSection id="formula" title="Fórmula">
      {formula.intro && <p>{formula.intro}</p>}
      <div className="flex flex-col gap-3">
        {formula.items.map((item) => (
          <div key={item.label} className="rounded-lg border bg-card p-4">
            <p className="text-sm font-medium text-muted-foreground">{item.label}</p>
            <p className="mt-1 font-mono text-sm break-words text-foreground sm:text-base">{item.expression}</p>
          </div>
        ))}
      </div>
      {formula.variables && (
        <ul className="flex list-disc flex-col gap-1 pl-5 text-sm text-muted-foreground">
          {formula.variables.map((v) => (
            <li key={v}>{v}</li>
          ))}
        </ul>
      )}
    </ContentSection>
  )
}

export function ContentTableView({ table }: { table: ContentTable }) {
  return (
    <div className="overflow-x-auto rounded-lg border bg-card">
      <table className="w-full text-left text-sm">
        <caption className="border-b px-4 py-3 text-left font-medium text-foreground">{table.caption}</caption>
        <thead className="bg-muted">
          <tr>
            {table.headers.map((h) => (
              <th key={h} scope="col" className="px-4 py-2.5 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {table.rows.map((row) => (
            <tr key={row.join('|')} className="border-t">
              {row.map((cell, j) => (
                <td key={j} className="px-4 py-2.5">
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

export function CalculatorInterpretation({ interpretation }: { interpretation: ToolContent['interpretation'] }) {
  return (
    <ContentSection id="interpretacao" title="Como interpretar o resultado">
      <Paragraphs items={interpretation.paragraphs} />
      {interpretation.table && <ContentTableView table={interpretation.table} />}
    </ContentSection>
  )
}

export function CalculatorExample({ example }: { example: NonNullable<ToolContent['example']> }) {
  return (
    <ContentSection id="exemplo" title="Exemplo prático">
      <div className="rounded-xl border bg-card p-5">
        <p className="font-medium text-foreground">{example.title}</p>
        <ol className="mt-3 flex list-decimal flex-col gap-1.5 pl-5 text-sm sm:text-base">
          {example.steps.map((s) => (
            <li key={s}>{s}</li>
          ))}
        </ol>
      </div>
    </ContentSection>
  )
}

export function CalculatorNotes({ notes, references }: { notes: string[]; references?: string[] }) {
  return (
    <ContentSection id="observacoes" title="Observações e limitações">
      <ul className="flex list-disc flex-col gap-2 pl-5">
        {notes.map((n) => (
          <li key={n}>{n}</li>
        ))}
      </ul>
      {references && references.length > 0 && (
        <div className="rounded-lg bg-muted p-4">
          <h3 className="text-sm font-semibold text-foreground">Referências</h3>
          <ul className="mt-2 flex flex-col gap-1.5 text-sm text-muted-foreground">
            {references.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </div>
      )}
    </ContentSection>
  )
}

export function CalculatorFAQ({ faq }: { faq: ToolContent['faq'] }) {
  return (
    <ContentSection id="perguntas-frequentes" title="Perguntas frequentes">
      <div className="flex flex-col divide-y rounded-xl border bg-card">
        {faq.map((item) => (
          <details key={item.question} className="group px-5 py-1">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-4 font-medium text-foreground [&::-webkit-details-marker]:hidden">
              <h3 className="font-sans text-base font-medium">{item.question}</h3>
              <span
                aria-hidden="true"
                className="flex size-6 shrink-0 items-center justify-center rounded-full bg-muted text-muted-foreground transition-transform group-open:rotate-45"
              >
                +
              </span>
            </summary>
            <p className="pb-4 text-foreground/85">{item.answer}</p>
          </details>
        ))}
      </div>
    </ContentSection>
  )
}
