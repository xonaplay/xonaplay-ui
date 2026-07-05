import * as React from "react"

// Contexto + hook del sidebar viven acá (no en sidebar.tsx) para que ese archivo
// exporte SOLO componentes y el Fast Refresh de Vite funcione: editar el sidebar
// se aplica en caliente sin recargar a mano ni quedar con render viejo.
export type SidebarContextValue = {
  open: boolean
  setOpen: (open: boolean) => void
  openMobile: boolean
  setOpenMobile: (open: boolean) => void
  isMobile: boolean
  toggleSidebar: () => void
}

export const SidebarContext = React.createContext<SidebarContextValue | null>(null)

export function useSidebar() {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used inside SidebarProvider")
  }
  return context
}
