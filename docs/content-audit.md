# Content and documentation audit

Reviewed 9 September 2026 against the supplied repository content and project reference documents.

## Factual baseline

- Alexander Belik, Dublin, Ireland; GitHub username `Abelik1`.
- B.A. Theoretical Physics, Trinity College Dublin, 2022-2026.
- Current M.Sc. High-Performance Computing at Trinity College Dublin.
- Inhabis is the public home-platform name. Its former name was Home OS.
- Experience dates and project claims follow `src/content.ts` and the supplied repository guidance. Private upstream repositories were not independently audited.

## Project correspondence

| Website project | Supplied source | Updated illustration |
| --- | --- | --- |
| Inhabis | Existing `src/content.ts` and repository guidance | Isometric home model with energy, policy, and devices |
| ORION | `README_orion.md` | Voice waveform and orchestration stages |
| Orion Mini | Existing `src/content.ts` | Local workspace concept |
| Leonardo Visual Demos | Existing `src/content.ts` | Flow-field concept |
| LabFlow | Existing `src/content.ts` | Sample-to-record structure |
| CarCove | `README_car_website.md` | Illustrative keep/switch cost curves |
| EchoState and Heisenberg Chain | `README_echostate.md` | Illustrative dynamics and spin chain |
| Locally Thermal from Global Athermality | Existing research copy, report and slide assets | Correlated Gibbs marginals |
| Ferronematic Liquid-Crystal Research | Existing research copy and publication URL | Illustrative spectrum |
| DFT Hamilton | `README_hamilton_trust.md` | Molecular structure concept |

No new claims of deployment, usage, numerical accuracy, or completed work were added. Inhabis, ORION, and Orion Mini retain their in-progress status. All concept curves are illustrative; the thesis explainer retains original slides.

## Corrections made

- Added a website-specific README with accurate setup, build, deployment, content, and testing instructions.
- Replaced obsolete CSS-illustration and fixed timeline-layout guidance in `CLAUDE.md`.
- Marked copied project READMEs as reference snapshots, converted missing local document links to named upstream paths, and replaced the EchoState GitHub placeholder with `Abelik1`.
- Updated both public CVs to the documented degree status, current master's course, experience dates, and newer projects. Added a content-driven regeneration workflow.
- Kept historical CV/application drafts and original research PDFs intact. Historical drafts are explicitly distinguished from served documents.
- Added thesis URLs and browser-history support, local project illustrations, the restored animated branching experience timeline with automatic card spacing, search, category filtering, and an empty-state reset.
- Restored the original full-page, pointer-responsive vector simulation, with tab-visibility handling and live reduced-motion support.
- Removed third-party skill-logo requests. The site uses bundled Lucide icons and system fonts.

## Maintenance checklist

1. Update `src/content.ts` when a role, degree, project status, or public link changes.
2. Rebuild and visually inspect both CVs if factual content changes.
3. Keep public names consistent across cards, workstreams, downloads, and metadata.
4. Run type checks, production build, and browser tests after changes.
5. Reconcile reference snapshots with their upstream project owners before describing them as current upstream documentation. This repository alone cannot establish changes in private projects.

## Project media provenance

Added 10 September 2026. Files live under `public/media/` and are served locally. Each item is captioned on the site with what it actually shows.

| Website project | Source repository | Files | Treatment |
| --- | --- | --- | --- |
| Leonardo Visual Demos | `Abelik1/HPC_Visual_Demos`, `docs/assets/demos` | 13 demo animations | GIF re-encoded to H.264 MP4 at the source 480x270, with a poster frame taken from frame 110 |
| LabFlow | `Abelik1/CRANN_Digitising`, `public/screenshots` | 5 interface screenshots | PNG converted to WebP at 1440px wide |
| ORION | `Abelik1/orion_assistant`, `assistant/ui/static/img` | 2 interface artworks | PNG converted to WebP, downscaled |
| Locally Thermal from Global Athermality | `Abelik1/SDP`, `png` | 4 solver result figures | PNG converted to WebP at 1100px wide |
| EchoState and Heisenberg Chain | `Abelik1/physics_echostate`, `Heisenberg_Chain/saved` | 1 prediction overlay | PDF rasterised at 150 dpi, converted to WebP |

Captions describe the demo or view shown, taken from the source repository's own README where one exists. The ORION images are the artwork the assistant's interface ships with, and they are captioned as artwork. Demo videos are muted, looping, `preload="none"`, and play only while scrolled into view, so a closed project card costs nothing.

Projects with no media: Inhabis, Orion Mini, CarCove, Ferronematic Liquid-Crystal Research, and DFT Hamilton. Their repositories hold no product screenshots or result figures. The Inhabis repository has marketing renders of a house rather than pictures of the software, so they were left out. Every project keeps its concept illustration on the card face.

## Naming and hero panel

Updated 10 September 2026.

- The assistant is called ORION everywhere. The former "Big Brother Assistant" name is gone from `src/content.ts`, `README_orion.md`, this audit, the historical `cv/alexander-belik-computing-cv.tex` draft, and the regenerated software CV PDF.
- The car project is called CarCove everywhere, matching the `Abelik1/CarCove` repository. The old "Choose Car" name is gone from the same set of files.
- Both public CVs were regenerated with `npm run build:cvs` after the renames and inspected. Only the software CV carried either name.
- The LabFlow gallery was cut from eleven screenshots to five: workspace overview, samples, new experiment, data, and export. The other WebP files were deleted.
- The hero dome was an empty frame. It had held the vector field before the field moved to a full-page fixed background, and it kept only its label after that. `FluidField` now takes a `variant` prop, and the dome runs its own instance of the same simulation, sized to the dome, denser and brighter for the smaller area, with pointer interaction mapped into local coordinates. The full-page field is unchanged.
