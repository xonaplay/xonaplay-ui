# @xonaplay/ui

Sistema de diseño unificado de Xonaplay: **tokens de color, preset de Tailwind y componentes** compartidos por la web (`apps/web`, Next.js) y el dashboard (`apps/dashboard`, Vite). Fuente única de verdad para que las dos apps se vean iguales.

## Qué exporta

- `@xonaplay/ui` → componentes: `Button` (+ variant `brand`), `Input`, `Textarea`, `Label`, `Card` (+ partes), `Badge`, `Separator`, y el helper `cn()`.
- `@xonaplay/ui/styles.css` → los tokens (`:root` / `.dark`) + utilidades de marca (`.text-brand-gradient`, `.btn-glow`, `.bg-grid-brand`).
- `@xonaplay/ui/tailwind-preset` → preset de Tailwind (colores → CSS vars, radio, keyframes).

## Cómo lo instala cada app

Cada app es su propio repo y deploya solo → se instala como **dependencia de git** (se descarga sola con `npm/bun install`, no hay que clonar nada a mano):

```jsonc
// package.json de apps/web y apps/dashboard
"@xonaplay/ui": "github:xonaplay/xonaplay-ui#v0.1.0"
```

> En desarrollo local dentro de este repo se usa `file:../../xonaplay-ui`. Para producción/deploy se cambia a la línea `github:` de arriba.

Luego, en cada app:

1. **Tailwind** (`tailwind.config`):
   ```js
   presets: [require("@xonaplay/ui/tailwind-preset")],
   content: [/* ... */, "./node_modules/@xonaplay/ui/dist/**/*.{js,cjs}"],
   ```
2. **Estilos** (una vez, en el entrypoint): `import "@xonaplay/ui/styles.css"`.
3. **Componentes**: `import { Button } from "@xonaplay/ui"`.
4. **Next.js**: agregar `transpilePackages: ["@xonaplay/ui"]` en `next.config`.

## Desarrollo

```bash
npm install
npm run build      # tsup → dist/ (ESM + CJS + tipos)
npm run dev        # build en watch
```

El paquete trae un `prepare` que corre `tsup` automáticamente al instalarlo como dependencia de git (npm lo buildea solo).

## Publicar una versión

1. Cambiás componentes/tokens.
2. Subís la versión en `package.json` y creás un tag (`git tag v0.1.1 && git push --tags`).
3. Cada app actualiza la línea `github:xonaplay/xonaplay-ui#v0.1.1` cuando quiera.
