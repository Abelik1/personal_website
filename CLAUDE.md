# CLAUDE.md

Guidance for Claude Code working in this repository.

## Project

Alexander Belik's personal site. Vite, React 19, TypeScript, no framework beyond that.

- `src/content.ts` holds profile facts, project data, education, experience, research copy, and document URLs. Keep factual changes here; interface labels live in components.
- `src/App.tsx` renders portfolio, project and thesis views. Thesis anchors use a `#thesis-` prefix and project pages use `#project/<slug>`, so direct links, refresh, and browser history retain the correct view. Project cards are links: hover reveals a peek panel and agitates the background particles (through `src/fieldBus.ts`), click opens the page. Rich project pages come from `projects[].detail` in content.
- Card covers come from the projects themselves (`presentation` in content sets hue, cover, hover facts, and an optional external `href`; Inhabis opens inhabis.ie). `src/ProjectArtwork.tsx` holds SVG concept illustrations used only when a project has no cover; they are concept studies, not product screenshots or measured data.
- `src/skillBrands.ts` gives every skill its brand colour and logo (bundled Simple Icons) or a coloured Lucide icon. Add new skills there and in `skillClusters`.
- `src/styles.css` is plain CSS with tokens on `:root`. The project grid is two columns on desktop and one on narrow screens. Skill, note, and education grids have responsive layouts.
- `src/ExperienceTimeline.tsx` preserves the animated branching timeline, ordered by start date. Card heights are measured and spaced automatically. On mobile the spine moves to the left; branches and colours remain. Add experience entries in content.
- `src/FluidField.tsx` renders the original full-page particle/vector simulation with pointer interaction. It pauses when the tab is hidden and draws a static field for reduced motion.
- Preserve the interactive vector background and branching timeline when upgrading the design. The owner specifically wants these distinctive features improved, not removed.
- Public CV PDFs are generated from site content by `npm run build:cvs` (Python and ReportLab required). Inspect both outputs after regeneration. The files in `cv/` are historical drafts.
- Copied `README_*.md` files document separate projects. See `README.md` for this website and `docs/content-audit.md` for provenance.

Verify with `npm run check`, `npm run build`, and `npm run test:e2e`. The browser tests require Chromium; see the README for setup.

## Writing rules

These apply to everything written for or as Alex: site copy, applications, cover letters, READMEs, commit messages. They are the tells that mark text as machine-written, and he will send it back.

**1. No em dashes.** Use commas, colons, full stops or brackets.

**2. No "instead of X" or "rather than X" contrastive tails.** State the thing directly.

- Bad: streamed to disk instead of buffered in memory
- Good: streamed straight to disk so memory never had to hold them

**3. No "not X, but Y" negation flips.**

- Bad: what I built was wrong, not technically, but because I had guessed
- Good: my first version worked fine and still missed the point, because I had guessed

**4. No rhetorical closing kickers.** Any punchy one-line finality at the end of a paragraph or answer gets cut.

- Cut from a draft: "I'd come back with a decision, not a notebook."

**5. No empty metaphors.**

- Bad: a wrong action isn't a bad screen, it's a cold house

**6. No keyword padding.** Listing jargon that carries no weight reads as filler and shows off the wrong things. Name the genuinely hard engineering.

- Bad: wake-word gating, guarded tools, memory
- Good: Entra ID SSO, tenant and project RBAC, CUDA Whisper transcription, SLURM jobs on an A100 partition, Matter fabric commissioning

Prefer shorter and denser over longer and balanced. Write the plain sentence first, then check it against these six before showing him.

## Facts to get right

- Degree is **theoretical physics**, not physics. B.A., Trinity College Dublin, 2022 to 2026.
- Currently doing an **M.Sc. in High-Performance Computing at Trinity**.
- The home automation project is **Inhabis**. It was called Home OS until September 2026. The company is Havenware, which stays off the public site.
- GitHub username is `Abelik1`. Repos he owns are only part of the picture; `Havenware/Home-OS` and other org repos do not appear in `gh repo list Abelik1`.
