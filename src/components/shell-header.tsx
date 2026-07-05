import * as React from "react"

import { cn } from "../lib/cn"

/**
 * Contenedor CANÓNICO del header del shell (app y panel): misma altura,
 * borde y paddings en toda la plataforma. El contenido lo pone cada app.
 */
export function ShellHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <header
      className={cn(
        "bg-background flex w-full min-w-0 shrink-0 items-center gap-2 border-b px-4 py-4 sm:gap-3 sm:px-6",
        className,
      )}
    >
      {children}
    </header>
  )
}
