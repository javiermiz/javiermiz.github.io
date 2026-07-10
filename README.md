# javiermiz.github.io

Sitio personal construido con [Astro](https://astro.build/) (salida estática, GitHub Pages). En español.

Tres partes independientes:

- **Link-in-bio de afiliados** (`/`): el visitante introduce un código y llega a una mini-landing del producto con enlaces de referido.
- **Blog** (`/blog`): posts en Markdown vía content collections.
- **CV** (`/cv`): currículum a partir de datos en JSON.

## Requisitos

- Node.js 18+
- pnpm (`npm install -g pnpm`)

## Desarrollo

```bash
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # astro check + build a dist/
pnpm preview
```

## Estructura

```
src/
├── pages/
│   ├── index.astro        # Link-in-bio (buscador de códigos)
│   ├── [product].astro    # Mini-landing de producto (generada desde products.json)
│   ├── cv.astro           # CV
│   ├── blog/              # Índice y posts del blog
│   └── sitemap.xml.ts     # Sitemap generado
├── data/products.json     # Fuente de verdad de los productos de afiliado
├── content/blog/          # Posts en Markdown
├── locales/es/            # Textos de UI (blog, cv, layout)
├── assets/products/       # Imágenes hero de cada producto (<slug>.<ext>)
└── components/            # Layout, BioLayout y templates
```

## Añadir un producto de afiliado

1. Añade una entrada a `src/data/products.json` (`code`, `slug`, `name`, `badge`, `tagline`, `description`, `bg`, `accent`, `ctaText`, `links`).
2. Coloca la imagen hero en `src/assets/products/<slug>.<ext>` (avif/jpg/png/webp).

La ruta `/<slug>` y la tarjeta del buscador en la home se generan automáticamente.

## Analítica

Los clics de afiliado se miden con GoatCounter mediante `data-goatcounter-click` en cada CTA (formato `bio-<slug>-<store>`).

## Licencia

Uso personal. Sin uso comercial.
