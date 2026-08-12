# Full site refresh: Noir & Gold, real cartoon animation, 20 games, SEO content

## Honest note up front

Ranking #1 for "neosoftware" or "neobiz" is not achievable — those are other companies' brand names and Google strongly favours the brand owner's own domain. What *is* achievable: ranking for intent terms like "ERP developer Nepal", "HR software Nepal", "freelance software developer Kathmandu", "AI agent developer Nepal", and appearing on pages *about* those companies (e.g. an honest "ERP options in Nepal" comparison article) but do try for neobiz and neosoftware as i work in neosoftware as peoject manager fro NeoBiz. The plan targets that.

## 1. New visual identity — Noir & Gold

- Rebuild the token set in `index.css`: near-black `#0d0d0d` background, `#1a1a1a` surfaces, gold `#c9a84c` primary, light gold `#f0d78c` accent. Replace the current acid-lime tokens everywhere.
- Typography: Instrument Serif for display headings, Work Sans for body, JetBrains Mono kept for labels/code chrome. Editorial-premium, not terminal.
- Drop the green grid background for a subtle gold vignette + fine noise texture; thin gold hairline rules between sections.
- Refresh every section (Nav, Hero, About, Experience, Tools, Games, Contact, Footer) to the new tokens and type scale. No hardcoded colors.

## 2. Tom & Jerry — proper animation

Current version is CSS blobs pinned to a static PNG, which reads as cringe. Replace with:

- Generated multi-frame sprite sheets (run cycle, ~6 frames each for Tom and Jerry) rendered as stepped CSS `steps()` animation instead of separately-animated limb divs.
- Squash-and-stretch on turns, dust puffs behind feet, motion-blur streak at high speed, proper facing flip.
- Cleaner chase AI: Jerry uses smooth curved evasion paths instead of jitter; Tom gets an anticipation crouch before lunging.
- Idle state when off-screen focus, plus a toggle that persists.

## 3. Arcade — 20 games

Keep the 6 existing (Tic Tac Toe, Connect Four, Snake, Dots & Boxes, Dino, Memory) and add 14, all popup-based like today:
2048, Minesweeper, Breakout, Tetris, Flappy, Whack-a-Mole, Simon Says, Sudoku, Word Scramble, Hangman, Rock-Paper-Scissors, Pong, Reaction Test, Typing Speed Test.
Add an arcade shell: search/filter, category chips, and a local high-score board (localStorage) — the "hook" that brings people back.

## 4. Hooks that keep people on the page

- Live "high scores" strip on the games section.
- A free **Nepal Salary Tax Estimator** and **ERP Cost Estimator** as flagship interactive tools (these also double as SEO landing magnets).
- Shareable result cards (copy-to-clipboard summary) from tools/games.

## 5. SEO build (full)

- Add `react-helmet-async` for per-route titles/descriptions/canonicals, plus a build-time prerender step so GitHub Pages serves real static HTML per route (crawlers can't run the SPA otherwise).
- New routes with real, substantial content:
  - `/services/erp-development`
  - `/services/hr-software`
  - `/services/freelance-software-development`
  - `/services/ai-agents-automation`
  - `/consulting`
  - `/tools` and `/games` hub pages (each mini-app also gets its own indexable route while still opening as a popup from the home page)
  - `/blog` with 5 seed articles: ERP buyer's guide for Nepali SMEs, HR/payroll software comparison in Nepal, cost of custom software in Nepal, AI agents for Nepali businesses, hiring a freelance developer vs an agency.
- Per-page FAQ blocks + JSON-LD: `Person`, `ProfessionalService`, `FAQPage`, `BreadcrumbList`, `SoftwareApplication` for tools.
- `sitemap.xml`, updated `robots.txt`, internal linking between services ↔ blog ↔ tools, descriptive alt text, single H1 per page.
- Keyword validation with Semrush before finalising the page titles/H1s.

## Technical notes

- Stays a Vite + React SPA deployed by the existing GitHub Actions workflow; the prerender step runs in `npm run build` and emits static HTML per route into `dist/`, so the 404.html SPA fallback still works.
- Page count stays well under publish limits.
- All new game/tool components live under `src/components/apps/`, registered in a single manifest so hub pages, popups, and the sitemap read from one source.

## Suggested order

1. Design tokens + all sections restyled (visible change first)
2. Tom & Jerry rebuild
3. SEO routes, content, schema, prerender
4. 14 new games + arcade shell + high scores