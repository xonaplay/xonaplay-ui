import * as React from "react"

import { Checkbox } from "./checkbox"
import { cn } from "../lib/cn"

export type PermMatrixItem = { key: string; label: string; short?: string }
export type PermMatrixGroup = { title: string; permissions: PermMatrixItem[] }

/**
 * Matriz de permisos de un rol (compartida app + panel): cada MÓDULO es una
 * card con su título arriba y los checkboxes de acciones en fila debajo.
 * Muestra `short` si existe (View/Manage…), si no el `label` largo.
 */
export function RolePermissionMatrix({
  groups,
  selected,
  onChange,
  className,
}: {
  groups: PermMatrixGroup[]
  selected: string[]
  onChange: (keys: string[]) => void
  className?: string
}) {
  const set = new Set(selected)
  const toggle = (key: string) => {
    const next = new Set(set)
    next.has(key) ? next.delete(key) : next.add(key)
    onChange([...next])
  }

  return (
    <div className={cn("space-y-4", className)}>
      {groups.map((group) => (
        <div key={group.title} className="rounded-lg border border-border bg-card">
          <div className="border-b border-border px-4 py-3">
            <h3 className="text-sm font-semibold">{group.title}</h3>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 p-4">
            {group.permissions.map((perm) => (
              <label
                key={perm.key}
                title={perm.label}
                className="flex cursor-pointer items-center gap-2 text-sm"
              >
                <Checkbox checked={set.has(perm.key)} onCheckedChange={() => toggle(perm.key)} />
                <span>{perm.short ?? perm.label}</span>
              </label>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
