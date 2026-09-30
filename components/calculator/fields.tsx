import { cn } from '@/lib/utils'

const inputBase =
  'h-12 w-full rounded-lg border border-input bg-card px-3.5 text-base text-foreground transition-colors placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/25 focus-visible:outline-none aria-invalid:border-destructive aria-invalid:ring-destructive/20'

type NumberFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  unit?: string
  error?: string
  hint?: string
  placeholder?: string
  integer?: boolean
  className?: string
}

export function NumberField({ id, label, value, onChange, unit, error, hint, placeholder, integer, className }: NumberFieldProps) {
  const describedBy = [hint ? `${id}-hint` : null, error ? `${id}-error` : null].filter(Boolean).join(' ') || undefined
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          name={id}
          type="text"
          inputMode={integer ? 'numeric' : 'decimal'}
          autoComplete="off"
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(inputBase, unit && 'pr-14')}
        />
        {unit && (
          <span className="pointer-events-none absolute inset-y-0 right-3.5 flex items-center text-sm text-muted-foreground" aria-hidden="true">
            {unit}
          </span>
        )}
      </div>
      {hint && !error && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-sm text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

type Option = { value: string; label: string; description?: string }

type SelectFieldProps = {
  id: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly Option[]
  hint?: string
  className?: string
}

export function SelectField({ id, label, value, onChange, options, hint, className }: SelectFieldProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <label htmlFor={id} className="text-sm font-medium">
        {label}
      </label>
      <select
        id={id}
        name={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-describedby={hint ? `${id}-hint` : undefined}
        className={cn(inputBase, 'appearance-none bg-[url("data:image/svg+xml,%3Csvg%20xmlns%3D%27http%3A//www.w3.org/2000/svg%27%20width%3D%2716%27%20height%3D%2716%27%20fill%3D%27none%27%20stroke%3D%27%23556%27%20stroke-width%3D%272%27%20viewBox%3D%270%200%2024%2024%27%3E%3Cpath%20d%3D%27m6%209%206%206%206-6%27/%3E%3C/svg%3E")] bg-[position:right_0.9rem_center] bg-no-repeat pr-10')}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.description ? `${option.label} — ${option.description}` : option.label}
          </option>
        ))}
      </select>
      {hint && (
        <p id={`${id}-hint`} className="text-xs text-muted-foreground">
          {hint}
        </p>
      )}
    </div>
  )
}

type SegmentedFieldProps = {
  name: string
  label: string
  value: string
  onChange: (value: string) => void
  options: readonly Option[]
  className?: string
}

export function SegmentedField({ name, label, value, onChange, options, className }: SegmentedFieldProps) {
  return (
    <fieldset className={cn('flex flex-col gap-1.5', className)}>
      <legend className="mb-1.5 text-sm font-medium">{label}</legend>
      <div className="flex gap-1 rounded-lg border border-input bg-muted p-1">
        {options.map((option) => {
          const id = `${name}-${option.value}`
          return (
            <div key={option.value} className="flex-1">
              <input
                type="radio"
                id={id}
                name={name}
                value={option.value}
                checked={value === option.value}
                onChange={() => onChange(option.value)}
                className="peer sr-only"
              />
              <label
                htmlFor={id}
                className="flex h-10 cursor-pointer items-center justify-center rounded-md px-2 text-center text-sm font-medium text-muted-foreground transition-colors peer-checked:bg-card peer-checked:text-foreground peer-checked:shadow-sm peer-focus-visible:ring-2 peer-focus-visible:ring-ring hover:text-foreground"
              >
                {option.label}
              </label>
            </div>
          )
        })}
      </div>
    </fieldset>
  )
}

export const SEX_OPTIONS = [
  { value: 'male', label: 'Masculino' },
  { value: 'female', label: 'Feminino' },
] as const
