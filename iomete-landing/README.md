# IOMETE prospect page

A single-page React site (Vite, Tailwind v4, shadcn/ui) for people who are already interested in IOMETE and want everything in one place:
a "how it fits" system diagram, a "tell us what you need" guide that reorders the page, seven audience zones with hand-offs between them,
competitor comparisons, pricing with a vCPU estimator, proof and FAQ.

Every statement comes from iomete.com (scraped 1 Nov 2026). Content lives in `src/data/content.js`,
each item with the source page it was taken from.

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # static output in dist/
```

Brand tokens (colours, Archivo / Inter / DM Mono) are IOMETE’s own Webflow design tokens, mapped onto shadcn’s theme variables in `src/index.css`. UI primitives live in `src/components/ui` (added with `npx shadcn add`).
