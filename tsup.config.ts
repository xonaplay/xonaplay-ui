import { defineConfig } from "tsup"

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["esm", "cjs"],
  dts: true,
  clean: true,
  treeshake: true,
  // React lo provee la app que consume; el resto (cva/clsx/tailwind-merge/slot)
  // se bundlea para que el paquete sea autónomo y no choque versiones.
  external: ["react", "react-dom", "lucide-react", "country-flag-icons"],
  // Todos nuestros primitives son client components → marcamos el bundle.
  banner: { js: '"use client";' },
})
