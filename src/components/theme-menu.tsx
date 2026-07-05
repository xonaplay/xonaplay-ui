import { Check, Monitor, Moon, Sun } from "lucide-react"
import * as React from "react"

import { Button } from "./button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./dropdown-menu"

export type ThemeMenuValue = "light" | "dark" | "system"

export type ThemeMenuLabels = {
  /** aria-label del botón. */
  theme?: string
  light?: string
  dark?: string
  system?: string
}

/**
 * Selector de tema CANÓNICO de la plataforma (Light/Dark/System con check).
 * Presentacional: cada app le inyecta su estado (`useTheme`) y sus labels
 * (i18n en la app; defaults en inglés para el panel).
 */
export function ThemeMenu({
  value,
  onChange,
  labels,
}: {
  value: ThemeMenuValue
  onChange: (value: ThemeMenuValue) => void
  labels?: ThemeMenuLabels
}) {
  const text = {
    theme: labels?.theme ?? "Theme",
    light: labels?.light ?? "Light",
    dark: labels?.dark ?? "Dark",
    system: labels?.system ?? "System",
  }
  const options = [
    { v: "light", label: text.light, Icon: Sun },
    { v: "dark", label: text.dark, Icon: Moon },
    { v: "system", label: text.system, Icon: Monitor },
  ] as const

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button type="button" variant="outline" size="icon" className="size-9" aria-label={text.theme}>
          {value === "light" ? (
            <Sun className="size-4" />
          ) : value === "dark" ? (
            <Moon className="size-4" />
          ) : (
            <Monitor className="size-4" />
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-36">
        {options.map(({ v, label, Icon }) => (
          <DropdownMenuItem key={v} onClick={() => onChange(v)} className="gap-2">
            <Icon className="size-4" />
            {label}
            {value === v && <Check className="ml-auto size-4 text-primary" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
