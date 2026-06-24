# Ecom Experts Task - Mohamed Elazap

A Wyze-inspired, multi-step security bundle configurator built with React. Users pick cameras, plans, sensors, and accessories across a stepped accordion flow while a live review panel updates quantities, pricing, and savings.

## Live demo

**[https://ecom-experts-task.vercel.app](https://ecom-experts-task.vercel.app)**

## Prerequisites

- **Node.js** 20 or later
- **pnpm** 9+ (recommended) — npm and yarn also work

## Run from a clean clone

```bash
git clone <your-repo-url>
cd security-builder
pnpm install
pnpm dev
```

Open [http://localhost:5173](http://localhost:5173).

### Production build

```bash
pnpm install
pnpm build
pnpm preview
```

`pnpm preview` serves the production build at [http://localhost:4173](http://localhost:4173).

### Other scripts

| Command           | Description                          |
| ----------------- | ------------------------------------ |
| `pnpm dev`        | Start Vite dev server with HMR       |
| `pnpm build`      | Type-check and build for production  |
| `pnpm preview`    | Preview the production build locally |
| `pnpm lint`       | Run ESLint                           |
| `pnpm format`     | Format with Prettier + Tailwind sort |

## Project structure

```
src/
├── components/
│   ├── builder/          # ProductCard, ReviewPanel, StepSection, etc.
│   ├── layout/           # PageLayout, Footer
│   └── ui/               # shadcn / Base UI primitives
├── data/                 # Product & plan JSON + typed loaders
│   ├── cameras.json
│   ├── sensors.json
│   ├── plans.json
│   └── protection.json
├── lib/                  # catalog, pricing, formatting helpers
├── pages/home/           # Main builder page
├── store/                # Zustand store + selectors
└── types/                # Shared TypeScript types

public/
├── cameras/              # Product images (webp)
├── sensors/
└── accessories/
```

## Data

Catalog data lives in **`src/data/*.json`**. Thin TypeScript files (`cameras.ts`, etc.) import the JSON and cast to shared types so the app stays type-safe while the source of truth remains editable JSON.

**Pricing model**

- `price` — list price (shown struck through when discounted)
- `discount` — percentage off (e.g. `22` = 22% off)
- Sale price = `price × (1 - discount / 100)`

There is **no backend** in this submission; all data is static and bundled at build time.

## Tech stack

- **React 19** + **TypeScript** + **Vite 8**
- **Tailwind CSS 4** with custom Wyze design tokens
- **Zustand** for builder state (quantities, color options, selected plan)
- **shadcn/ui** (Base UI) for Accordion, Button, ScrollArea, etc.
- **Gilroy Medium** (local font in `src/fonts/`)

## Features

- Four-step accordion builder (cameras → plan → sensors → protection)
- Product cards with color variants, quantity controls, and dynamic images
- Sticky review panel with grouped line items, shipping, totals, and savings
- Expanded accordion step styling (light background, 10px radius)
- Responsive two-column layout (builder + review panel)

## Decisions & tradeoffs

| Decision | Rationale |
| -------- | --------- |
| **Static JSON over API** | Faster to ship, easy to review in the repo, no deploy complexity. A backend would be the natural next step for real inventory/pricing. |
| **Zustand vs Context** | Minimal boilerplate for cart-like state; selectors stay colocated with the store. |
| **JSON + typed imports** | Satisfies the deliverable (readable data files) while keeping compile-time safety via `Product` / `Plan` types. |
| **shadcn / Base UI** | Accessible accordion and form primitives without building from scratch. |
| **Single page** | `react-router-dom` is installed but unused; the assignment scope is one builder view. |
| **Default selections** | Store seeds demo quantities so the review panel matches the design mock on first load. |

## Not finished / out of scope

- **Backend bonus** — no server, database, or checkout API
- **Checkout flow** — button is presentational only
- **Cart persistence** — selections reset on refresh (no `localStorage` / URL state)
- **Automated tests** — no unit or E2E test suite

## License

Private / submission project — adjust as needed before publishing.
