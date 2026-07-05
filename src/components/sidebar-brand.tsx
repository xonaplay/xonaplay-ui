import * as React from "react"

import { cn } from "../lib/cn"
import { useSidebar } from "./sidebar-context"

/**
 * Marca CANÓNICA del sidebar (app y panel): wordmark XonaPlay + subtítulo
 * (workspace activo en la app, "Platform admin" en el panel). Fila de alto
 * FIJO 52px: con el p-2 del SidebarHeader da 68px, la misma altura que el
 * ShellHeader → el borde inferior queda alineado en toda la plataforma.
 * Colapsado muestra solo la "X" azul.
 */
export function SidebarBrand({
  subtitle,
  className,
}: {
  subtitle?: React.ReactNode
  className?: string
}) {
  const { open } = useSidebar()
  return (
    <div className="flex h-[52px] items-center">
      <div className={cn("flex items-center", open ? "w-full px-2" : "w-8 justify-center", className)}>
        {open ? (
          <div className="flex min-w-0 flex-col leading-tight">
            <span className="font-display text-base font-bold tracking-tight">
              Xona<span className="text-[#2f6bff]">Play</span>
            </span>
            {subtitle ? (
              <span className="truncate text-[11px] text-muted-foreground">{subtitle}</span>
            ) : null}
          </div>
        ) : (
          <span className="font-display text-lg font-bold tracking-tight text-[#2f6bff]">X</span>
        )}
      </div>
    </div>
  )
}
