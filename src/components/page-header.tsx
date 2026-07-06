import { ChevronRight } from "lucide-react"
import * as React from "react"

import { cn } from "../lib/cn"

export type BreadcrumbItem = { label: string; href?: string }

/**
 * Encabezado de página CANÓNICO (app + panel): título grande + breadcrumb
 * debajo, con acciones opcionales a la derecha. Presentacional — la navegación
 * la inyecta cada app vía `renderLink` (react-router en app y panel).
 */
export function PageHeader({
  title,
  breadcrumbs = [],
  actions,
  renderLink,
  className,
}: {
  title: string
  breadcrumbs?: BreadcrumbItem[]
  actions?: React.ReactNode
  /** Cómo renderizar un item con href (p.ej. <Link> de react-router). */
  renderLink?: (item: BreadcrumbItem) => React.ReactNode
  className?: string
}) {
  return (
    <div
      className={cn(
        "mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between",
        className,
      )}
    >
      <div className="flex min-w-0 flex-col gap-1">
        <h1 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h1>
        {breadcrumbs.length > 0 ? (
          <nav
            className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground"
            aria-label="Breadcrumb"
          >
            {breadcrumbs.map((item, i) => (
              <React.Fragment key={`${item.label}-${i}`}>
                {i > 0 ? (
                  <ChevronRight className="size-3.5 shrink-0 opacity-60" aria-hidden />
                ) : null}
                {item.href && renderLink ? (
                  renderLink(item)
                ) : (
                  <span className="text-foreground">{item.label}</span>
                )}
              </React.Fragment>
            ))}
          </nav>
        ) : null}
      </div>
      {actions ? (
        <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>
      ) : null}
    </div>
  )
}
