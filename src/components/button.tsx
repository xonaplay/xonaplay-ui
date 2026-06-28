import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "../lib/cn"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:opacity-90",
        // CTA de marca: glow + leve elevación (usado en la web)
        brand:
          "bg-primary font-semibold text-primary-foreground shadow-[0_0_20px_-8px_hsl(var(--brand))] transition-all hover:-translate-y-0.5 hover:shadow-[0_0_24px_-6px_hsl(var(--brand))]",
        destructive: "bg-destructive text-destructive-foreground hover:opacity-90",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        secondary: "border border-transparent bg-muted text-foreground hover:bg-muted/80",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
  /** Muestra un spinner y deshabilita el botón mientras está en curso. */
  loading?: boolean
}

const Spinner = () => (
  <span
    aria-hidden
    className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent"
  />
)

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, type, loading = false, disabled, children, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    // Con asChild, Slot exige UN único hijo → no agregamos un sibling (ni null).
    const showSpinner = loading && !asChild
    return (
      <Comp
        ref={ref}
        className={cn(
          buttonVariants({ variant, size, className }),
          // Mientras carga: ocultamos los íconos (svg) y mostramos el spinner
          // (un <span>, no svg) → estilo spinner.js: el ícono se va, queda el giro.
          showSpinner && "[&_svg]:hidden",
        )}
        {...props}
        {...(!asChild
          ? { type: type ?? "button", disabled: disabled || loading }
          : {})}
      >
        {showSpinner ? (
          <>
            <Spinner />
            {children}
          </>
        ) : (
          children
        )}
      </Comp>
    )
  },
)
Button.displayName = "Button"

export { Button, buttonVariants }
