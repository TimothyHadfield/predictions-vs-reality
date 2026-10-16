# Predictions vs Reality

An interactive, sourced essay on forecasting: famous predictions vs what actually happened, and the
patterns in how forecasts miss. A single static page Tim built and published as a showcase project.
Readers: anyone with the link, on phone or laptop. No accounts, no backend, no data stored except
the theme choice (`localStorage` key `pvr-theme`).

- **Live:** https://timothyhadfield.github.io/predictions-vs-reality/
- **Repo:** TimothyHadfield/predictions-vs-reality (public)
- **Handoff:** `progress.md` (state, traps, NOT verified). Analysis text lives in `RESEARCH.md`.

## File map
- `index.html`: the page skeleton. Sections (in order): hero stats, `#eras` timeline, `#bias`
  Hope vs Doom chart, `#spectrum` predictability spectrum, `#gallery` Hall of Fame & Shame with
  filters, `#game` predict-first game, `#horizon` 2050/2100 forecasts, `#sources`.
- `app.js`: renders and wires every section from the globals below. No modules, no build step.
  `SPECTRUM` (the 7 spectrum domains) is defined at the top of this file, not in `data/`.
- `data/predictions.js`: `SECTORS`, `OUTCOMES`, `FAILURE_MODES`, `PREDICTIONS` (24 entries).
  Adding an entry here updates the hero stats, chart, cards, game, filters and sources by itself.
- `data/eras.js`: `ERAS` (6 forecasting eras). `data/forecasts2050.js`: `FORECASTS` (6) and
  `CONFIDENCE_META`.
- `styles.css`: all styling. Theme tokens on `:root[data-theme=...]`; dark is the default, phone
  layout under `@media (max-width: 720px)`.
- `README.md` (GitHub showcase, with `docs/screenshots/*.png`), `RESEARCH.md` (written analysis
  and the full source list).

## Run locally
`python -m http.server 8119` in the project folder (background option), then open
http://localhost:8119/. Scripts load in order: the three `data/*.js` files, then `app.js`.

## Test
No test suite and no package.json. Verify with phone-view (WebKit, iPhone size and `--desktop`):
- `--do "click:#biasChart"` etc. to reach a section; `--do "click:#themeToggle"` for the other theme.
- Whole game headless: `--eval` that clicks `.game-btn.came` then `.game-next` until `.game-done`
  appears (22 questions: `pending` predictions are left out of the game).
- Source links: `curl -L` each URL in `data/*.js`. medium.com, cgdev.org and metaculus.com return
  403 to scripts (bot blocking), so check those in a real browser.

## Deploy
GitHub Pages serves `main` from the repo root. Push to `main` and it is live in about a minute;
`python ~/.claude/hooks/live-check.py "<project folder>"` waits for the build.

## Traps
- The game's "Came true" means `outcome === 'nailed'` only. `partial` counts as "did not come true".
- `interleave()` in `app.js` orders the game without `Math.random` (deterministic order every
  visit). Step 7; any item it skips is appended, so a dataset size divisible by 7 still works.
- Sector colours are read in JS (`sectorColor`), so a theme flip re-renders the bias chart,
  filters, cards and forecast cards. The current game card keeps its old accent until the next
  question.
- Bias chart: a bar too short for its number gets class `tiny`, which moves the number just past
  the bar's end (measured at render and again on width change). Don't remove the measuring.
- `<button>`s don't inherit text colour: every button style needs its own `color:` (the spectrum
  pills were near-black on the dark theme until 2026-10-16).
- Text is inserted with `innerHTML` from the data files. Fine for this curated data; never feed it
  user input.

## Standing instructions
- Tim owns the wording, look and the dataset's judgments (outcomes, optimism scores, failure
  modes). Flag doubts about an entry instead of re-scoring it.
