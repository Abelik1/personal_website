# Alexander Belik's personal website

A responsive portfolio for theoretical physics, scientific computing, and software projects. Built with React 19, TypeScript, Vite 6, plain CSS, Lucide icons, and bundled Simple Icons paths for skill logos. The site is static and needs no backend, account, API key, or database.

## Run locally

Use Node.js 22.12+ and npm. Install the locked dependencies and start Vite:

```sh
npm ci
npm run dev
```

Open the local URL printed by Vite. To check and build the production site:

```sh
npm run check
npm run build
npm run preview
```

Publish the contents of `dist/` to a static host. The current asset URLs assume deployment at the domain root. A subdirectory deployment also needs the absolute document and slide URLs in `src/content.ts` adjusted alongside Vite's `base` setting.

## Site structure

| File | Purpose |
| --- | --- |
| `src/content.ts` | Profile, education, experience, projects, categories, research text, and document URLs |
| `src/App.tsx` | Portfolio, project and thesis views, project search/filtering, hover-reveal cards, project pages, navigation |
| `src/ProjectArtwork.tsx` | Ten original SVG concept illustrations, used as a card cover only when a project has no image or clip of its own |
| `src/skillBrands.ts` | Maps each skill to its brand logo and colour (Simple Icons, imported locally) or a coloured Lucide icon |
| `src/FluidField.tsx` | Full-page interactive vector-field simulation with pointer-driven particle swirls and card-hover agitation |
| `src/fieldBus.ts` | Tiny shared state that lets a hovered project card tell the particle field where to get restless |
| `src/ExperienceTimeline.tsx` | Animated branching experience timeline with measured card spacing |
| `src/styles.css` | Shared colours, type, components, responsive layouts, focus states |
| `public/documents/` | The four published PDF downloads |
| `public/thesis-slides/` | Original presentation images used in the thesis explainer |
| `scripts/build-cvs.mjs`, `scripts/build-cvs.py` | Rebuild the public CVs from the site's factual content |
| `tests/portfolio.spec.ts` | Browser checks for discovery, navigation, documents, and responsive layouts |

The main view uses `#work`, `#experience`, and `#contact`. Each project has a page at `#project/<slug>`, where the slug is the lower-cased title with dashes (`#project/inhabis`, `#project/eurohpc-demo-lab`). Thesis links use `#thesis-overview`, `#thesis-explainer`, `#thesis-technical`, and `#thesis-contact`. Hash-based navigation works on static hosting and survives refresh, Back, and Forward.

## Editing content and previews

Update profile facts and project descriptions in `src/content.ts`. A project has a category, illustration key, summary, engineering details, stack, and optional public link. An optional `detail` block (lead paragraphs, key-figure tiles, and sections with text, bullets, tables, images, and videos) fills the project page; projects without one get a page built from `summary`, `problem`, `built`, `media`, and `impact`. Put images and clips under `public/media/<project>/`, converting GIFs to H.264 MP4 first. Only add verified public links. Projects without a public repository still expose their case-study details.

The work section searches titles, subjects, descriptions, and tools. Filters and search combine. Hovering a card lifts it, reveals the summary and first three build points beneath it, and makes the background particles around it vibrate in the project's accent colour. Clicking opens the project page. Touch devices skip the hover reveal and open the page on tap. Reduced-motion users get no lift and no particle agitation. The grid uses two columns on desktop and one below 540px, and the search and category filter are kept when returning from a project page.

Each card takes its cover from the project itself: a screenshot, a chart drawn from the repository's own data, or a clip that plays on hover. `presentation` in `src/content.ts` sets each project's hue (which colours the card, its glow, and the particles around it), its cover, three hover facts, and an optional `href`. A card with an `href` opens that address in a new tab (Inhabis goes to inhabis.ie). Every project now has a real cover. `ProjectArtwork` remains only as a fallback for a project added later without one, and its illustrations are labelled concept studies, not measured data. Convert GIFs to H264 MP4 before adding them, and keep images under about 250 KB.

The original vector simulation runs behind the whole site. Cursor movement bends particle paths into swirls. The canvas is cleared and each particle's trail is redrawn from its recent positions every frame, so no haze builds up, and the cursor has no glow. Drawing pauses while the tab is hidden, responds to live reduced-motion changes with a static field, and limits pixel density to 2x. The experience timeline retains coloured strands, animated branches, and endpoint markers. It measures card heights to prevent overlaps and moves the spine to the left on narrow screens. Timeline animation pauses outside the viewport. No remote fonts or logo services are required.

## CV downloads

The published CVs are `public/documents/alexander-belik-software-cv.pdf` and `public/documents/alexander-belik-physics-cv.pdf`. Both are two pages and derive their profile, education, experience, and selected project descriptions from `src/content.ts`.

To regenerate them, install Python 3.10+ and ReportLab:

```sh
python -m pip install reportlab
npm run build:cvs
```

Set the `PYTHON` environment variable if your interpreter is not named `python`. Inspect both PDFs after rebuilding, especially if longer text changes pagination. Rebuild the site after updating PDF files. The thesis report and presentation PDFs are original research artifacts and are maintained separately.

The files under `cv/` and the loose application documents in the repository root are historical drafts. Their LaTeX sources do not generate the current public downloads. Preserve them as source history; use the builders above for the website CVs.

## Browser verification

```sh
npx playwright install chromium
npm run test:e2e
```

The suite starts its own Vite server on `127.0.0.1:5175` and runs desktop and mobile Chromium checks. To use an installed Chrome executable, set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` to its full path. Screenshots and traces for failures go into ignored `test-results/`.

To test a server you have already started, set `PLAYWRIGHT_BASE_URL` to its URL. This bypasses automatic server startup and shutdown.

Coverage includes project filters, keyboard disclosure, search and empty-state recovery, thesis deep links and history, local PDF signatures, thesis image loading, reduced-motion styles, and page width at 320, 390, 768, and 1440 pixels. Additional checks cover the full-page simulation, live reduced-motion changes, restored timeline branches, and card overlap at desktop and mobile sizes.

## Project reference documents

`README_orion.md`, `README_car_website.md`, `README_echostate.md`, and `README_hamilton_trust.md` are supplied snapshots from separate projects. Their commands apply inside those projects, not this website. The snapshots are retained for provenance, with known broken local links marked as upstream paths. See [the content audit](docs/content-audit.md) for the source mapping and review limits.
