import * as React from "react"
import { ChevronDown, Check } from "lucide-react"
import { US, ES, BR } from "country-flag-icons/react/3x2"

import { cn } from "../lib/cn"

type FlagComp = React.ComponentType<{ className?: string; title?: string }>

// Mapeo locale → bandera. Ampliar acá al sumar idiomas.
const FLAGS: Record<string, FlagComp> = { en: US, es: ES, pt: BR }

export type LanguageOption = { value: string; code: string; label: string }

function Flag({ value, className }: { value: string; className?: string }) {
  const Component = FLAGS[value] ?? US
  return (
    <span className={cn("inline-block overflow-hidden rounded-[3px] ring-1 ring-black/10", className)}>
      <Component className="h-full w-full object-cover" />
    </span>
  )
}

export interface LanguageSwitcherProps {
  value: string
  options: LanguageOption[]
  onChange: (value: string) => void
  /** "dropdown" (default) o "inline" (lista vertical, para menús full-screen). */
  variant?: "dropdown" | "inline"
}

/**
 * Selector de idioma PRESENTACIONAL y compartido (web + dashboard). La lógica de
 * i18n (leer/cambiar el locale) la inyecta cada app vía `value` + `onChange`.
 */
export function LanguageSwitcher({ value, options, onChange, variant = "dropdown" }: LanguageSwitcherProps) {
  const [open, setOpen] = React.useState(false)
  const ref = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener("mousedown", onClick)
    return () => document.removeEventListener("mousedown", onClick)
  }, [])

  const current = options.find((o) => o.value === value) ?? options[0]

  if (variant === "inline") {
    return (
      <div className="space-y-0.5">
        {options.map((opt) => {
          const active = opt.value === value
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={cn(
                "flex w-full items-center gap-3 rounded-md px-2 py-2.5 text-base transition-colors hover:bg-accent",
                active ? "font-medium text-foreground" : "text-muted-foreground",
              )}
            >
              <Flag value={opt.value} className="h-4 w-6 shrink-0" />
              <span>{opt.label}</span>
              {active && <Check className="ml-auto h-4 w-4 text-primary" />}
            </button>
          )
        })}
      </div>
    )
  }

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-md border px-2.5 text-sm font-medium transition-colors",
          open
            ? "border-primary/50 text-foreground"
            : "border-border text-muted-foreground hover:border-primary/40 hover:text-foreground",
        )}
      >
        <Flag value={current.value} className="h-4 w-[22px]" />
        <span>{current.code}</span>
        <ChevronDown className={cn("h-3.5 w-3.5 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 z-50 mt-2 max-h-[min(70vh,20rem)] w-44 overflow-y-auto rounded-md border border-border bg-popover p-1.5 shadow-xl">
          {options.map((opt) => {
            const active = opt.value === value
            return (
              <button
                key={opt.value}
                type="button"
                onClick={() => {
                  onChange(opt.value)
                  setOpen(false)
                }}
                className={cn(
                  "flex w-full items-center gap-2.5 whitespace-nowrap rounded-md px-2.5 py-2 text-sm transition-colors hover:bg-accent",
                  active ? "font-medium text-foreground" : "text-muted-foreground",
                )}
              >
                <Flag value={opt.value} className="h-4 w-6 shrink-0" />
                <span>{opt.label}</span>
                {active && <Check className="ml-auto h-4 w-4 text-primary" />}
              </button>
            )
          })}
        </div>
      )}
    </div>
  )
}
