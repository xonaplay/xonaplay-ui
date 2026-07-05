import { PanelLeft } from "lucide-react"
import * as React from "react"
import { Slot } from "@radix-ui/react-slot"

import { Button } from "./button"
import { SidebarContext, useSidebar } from "./sidebar-context"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./tooltip"
import { cn } from "../lib/cn"

const SIDEBAR_WIDTH = "16rem"
const SIDEBAR_WIDTH_ICON = "3rem"

function getInitialMobile() {
  if (typeof window === "undefined") return false
  return window.matchMedia("(max-width: 768px)").matches
}

export function SidebarProvider({
  children,
  defaultOpen = true,
}: {
  children: React.ReactNode
  defaultOpen?: boolean
}) {
  const [open, setOpen] = React.useState(defaultOpen)
  const [openMobile, setOpenMobile] = React.useState(false)
  const [isMobile, setIsMobile] = React.useState(getInitialMobile)

  React.useEffect(() => {
    const media = window.matchMedia("(max-width: 768px)")
    const onChange = (event: MediaQueryListEvent) => setIsMobile(event.matches)
    media.addEventListener("change", onChange)
    return () => media.removeEventListener("change", onChange)
  }, [])

  const toggleSidebar = React.useCallback(() => {
    if (isMobile) {
      setOpenMobile((prev) => !prev)
      return
    }
    setOpen((prev) => !prev)
  }, [isMobile])

  return (
    <SidebarContext.Provider
      value={{ open, setOpen, openMobile, setOpenMobile, isMobile, toggleSidebar }}
    >
      <TooltipProvider delayDuration={0}>
        <div
          data-variant="inset"
          className="group/sidebar-wrapper flex min-h-svh w-full flex-1 flex-row bg-background pt-[var(--app-topbar,0px)] data-[variant=inset]:bg-sidebar"
          style={
            {
              "--sidebar-width": SIDEBAR_WIDTH,
              "--sidebar-width-icon": SIDEBAR_WIDTH_ICON,
            } as React.CSSProperties
          }
        >
          {children}
        </div>
      </TooltipProvider>
    </SidebarContext.Provider>
  )
}

export function SidebarRail({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar()
  return (
    <button
      type="button"
      data-slot="sidebar-rail"
      data-sidebar="rail"
      aria-label="Toggle Sidebar"
      title="Toggle Sidebar"
      tabIndex={-1}
      onClick={toggleSidebar}
      className={cn(
        "hover:after:bg-sidebar-border absolute inset-y-0 z-20 hidden w-4 -translate-x-1/2 cursor-col-resize transition-all ease-linear after:absolute after:inset-y-0 after:left-1/2 after:w-[2px] group-data-[side=left]:-right-4 md:flex",
        className,
      )}
    />
  )
}

export function Sidebar({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open, openMobile, setOpenMobile, isMobile } = useSidebar()

  if (isMobile) {
    return (
      <>
        {openMobile ? (
          <button
            type="button"
            className="fixed inset-0 z-30 bg-black/50"
            onClick={() => setOpenMobile(false)}
            aria-label="Close sidebar backdrop"
          />
        ) : null}
        <div className={cn("relative z-40 md:hidden", className)}>
          <aside
            className={cn(
              "fixed bottom-0 left-0 top-[var(--app-topbar,0px)] flex h-[calc(100svh-var(--app-topbar,0px))] w-[var(--sidebar-width)] max-w-[85vw] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-transform duration-200 ease-linear",
              openMobile ? "translate-x-0" : "-translate-x-full",
            )}
            style={{ "--sidebar-width": SIDEBAR_WIDTH } as React.CSSProperties}
          >
            <div data-side="left" className="group relative flex h-full min-h-0 w-full flex-col">
              {children}
            </div>
          </aside>
        </div>
      </>
    )
  }

  return (
    <div
      className={cn(
        "relative hidden h-[calc(100svh-var(--app-topbar,0px))] shrink-0 transition-[width] duration-200 ease-linear md:block",
        open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
        className,
      )}
    >
      <div
        data-side="left"
        className={cn(
          "group fixed bottom-0 left-0 top-[var(--app-topbar,0px)] z-10 hidden h-[calc(100svh-var(--app-topbar,0px))] flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground transition-[width] duration-200 ease-linear md:flex",
          open ? "w-[var(--sidebar-width)]" : "w-[var(--sidebar-width-icon)]",
        )}
      >
        <div className="relative flex h-full w-full min-w-0 flex-col">
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
          <SidebarRail />
        </div>
      </div>
    </div>
  )
}

export function SidebarHeader({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("flex flex-col gap-2 p-2", className)}>{children}</div>
}

export function SidebarContent({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div className={cn("flex min-h-0 flex-1 flex-col gap-2 overflow-auto overflow-x-hidden p-2", className)}>
      {children}
    </div>
  )
}

export function SidebarFooter({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  return <div className={cn("mt-auto flex flex-col gap-2 border-t border-sidebar-border p-2", className)}>{children}</div>
}

export function SidebarGroup({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn("flex flex-col gap-2", className)}>{children}</div>
}

export function SidebarGroupLabel({
  children,
  className,
}: {
  children: React.ReactNode
  className?: string
}) {
  const { open } = useSidebar()
  // Plegado: en lugar de desaparecer (lo que hacía "saltar" los íconos hacia
  // arriba), dejamos un divisor que ocupa el MISMO alto que el label de texto.
  if (!open) {
    return (
      <div className="flex h-4 items-center px-2" aria-hidden>
        <span className="h-px w-full rounded bg-sidebar-border" />
      </div>
    )
  }
  return (
    <p className={cn("px-2 text-xs font-medium text-sidebar-foreground/70", className)}>{children}</p>
  )
}

export function SidebarMenu({ children, className }: { children: React.ReactNode; className?: string }) {
  return <ul className={cn("flex w-full min-w-0 flex-col gap-1", className)}>{children}</ul>
}

// Reenvía ...props (incl. data-state del Collapsible asChild) para que el
// selector group-data-[state=open]/collapsible funcione y la flecha rote.
export const SidebarMenuItem = React.forwardRef<HTMLLIElement, React.ComponentProps<"li">>(
  ({ className, ...props }, ref) => (
    <li ref={ref} data-sidebar="menu-item" className={cn("group/menu-item relative", className)} {...props} />
  ),
)
SidebarMenuItem.displayName = "SidebarMenuItem"

const menuButtonVariants = cn(
  // h-8 fija: la fila mide lo mismo PLEGADA (solo ícono) que DESPLEGADA (ícono +
  // texto). Sin esto, el texto agranda la fila al desplegar y los íconos "saltan".
  "peer/menu-button flex h-8 w-full items-center gap-2 overflow-hidden rounded-md p-2 text-left text-sm text-sidebar-foreground outline-none ring-sidebar-ring transition-[width,height,padding] focus-visible:ring-1",
  "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
  "active:bg-sidebar-accent active:text-sidebar-accent-foreground",
  "data-[active=true]:bg-sidebar-accent data-[active=true]:font-medium data-[active=true]:text-sidebar-accent-foreground",
)

export function SidebarMenuButton({
  asChild = false,
  isActive,
  size = "default",
  tooltip,
  className,
  ...props
}: React.ComponentProps<"button"> & {
  asChild?: boolean
  isActive?: boolean
  size?: "default" | "lg"
  tooltip?: string
}) {
  const Comp = asChild ? Slot : "button"
  const { open, isMobile } = useSidebar()
  const button = (
    <Comp
      type={asChild ? undefined : "button"}
      data-slot="sidebar-menu-button"
      data-sidebar="menu-button"
      data-size={size}
      data-active={isActive ? "true" : "false"}
      className={cn(
        menuButtonVariants,
        size === "lg" && "h-12 p-2 text-sm",
        // Plegado: ancho FIJO de 32px (w-8) + centrado. Clave: al ser fijo NO se
        // anima junto con la barra, así que justify-center no recalcula el centro
        // sobre un ancho cambiante → el ícono no "vuela" al centro durante la
        // animación, queda quieto y la barra se achica a su alrededor. Y como mide
        // 32px exactos, el avatar (32px) entra justo sin que overflow le coma el borde.
        !open && "w-8 justify-center gap-0 p-0",
        className,
      )}
      {...props}
    />
  )

  // Tooltip con la etiqueta solo cuando la barra está colapsada (estilo sidebar-07).
  if (!tooltip || open || isMobile) return button
  return (
    <Tooltip>
      <TooltipTrigger asChild>{button}</TooltipTrigger>
      <TooltipContent side="right" align="center">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  )
}

export function SidebarInset({
  children,
  className,
  ...props
}: React.ComponentProps<"div"> & { children: React.ReactNode }) {
  return (
    <div
      id="content"
      className={cn("bg-background text-foreground flex min-h-0 min-w-0 flex-1 flex-col", className)}
      {...props}
    >
      {children}
    </div>
  )
}

export function SidebarTrigger({ className }: { className?: string }) {
  const { toggleSidebar } = useSidebar()
  return (
    <Button variant="ghost" size="icon" className={className} onClick={toggleSidebar}>
      <PanelLeft className="h-5 w-5" />
      <span className="sr-only">Toggle Sidebar</span>
    </Button>
  )
}

export function SidebarMenuSub({ children, className }: { children: React.ReactNode; className?: string }) {
  const { open } = useSidebar()
  if (!open) return null
  return (
    <ul
      className={cn(
        "mx-3.5 flex min-w-0 translate-x-px flex-col gap-1 border-l border-sidebar-border px-2.5 py-0.5",
        className,
      )}
    >
      {children}
    </ul>
  )
}

export function SidebarMenuSubItem({ children }: { children: React.ReactNode }) {
  return <li>{children}</li>
}

export function SidebarMenuSubButton({
  asChild = false,
  isActive,
  className,
  ...props
}: React.ComponentProps<"a"> & { asChild?: boolean; isActive?: boolean }) {
  const Comp = asChild ? Slot : "a"
  return (
    <Comp
      data-sidebar="menu-sub-button"
      data-active={isActive ? "true" : "false"}
      className={cn(
        "flex h-7 min-w-0 -translate-x-px items-center gap-2 overflow-hidden rounded-md px-2 text-sm text-sidebar-foreground/70 outline-none ring-sidebar-ring transition-colors focus-visible:ring-1",
        "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        // Seleccionado: pill con tinte de marca (azul suave + texto azul), no caja con borde.
        "data-[active=true]:bg-primary/10 data-[active=true]:font-medium data-[active=true]:text-primary",
        className,
      )}
      {...props}
    />
  )
}
