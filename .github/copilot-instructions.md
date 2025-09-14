# Copilot Instructions for radio_weesper_web

These repo-specific notes help AI agents work productively in this Hugo site. Edit sources (layouts, assets, content), not generated output.

## Big picture
- Static site built with Hugo using theme `themes/radio-weesper-theme` (`config.toml`).
- Content in `content/` (shows under `content/post/`). Templates in `themes/.../layouts`. SCSS in `assets/scss` compiled via Hugo Pipes.
- JS in `static/js`; anything under `static/` is copied verbatim.
- Don’t edit `public/` or `resources/_gen/` (build artifacts).

## Page assembly
- Base: `layouts/_default/baseof.html` loads compiled CSS from `assets/scss/main.scss` via `resources.Get | css.Sass` (expanded in dev, compressed otherwise), plus fonts and Bootstrap Icons CDN.
- Home: `layouts/index.html` shows `partials/live-banner.html` and either `player-online.html` or `player-offline.html` based on `[params] radio_online`.
- Schedule/upcoming: `partials/schedule.html` (next 3 weeks from `.Site.Pages`) and `partials/upcoming-shows.html` (future posts, carousel).
- Search: `search/list.html` fetches `/post/index.json` and uses Fuse.js. JSON is produced by `_default/section.json.json` (enabled by `[outputs] section = ["HTML","JSON"]`).

## Content model (posts = shows)
- Each show is a Markdown file under `content/post/` with: `title`, `date` (past vs upcoming), `showtime`, `showendtime`, `tags`, `image`, `description` (or `.Summary`). See `content/post/mor-lov*.md`.

## SCSS conventions
- Import order in `assets/scss/main.scss`: base → layouts → components → utilities. Preserve order.
- Use design tokens from `assets/scss/base/_tokens.scss` (colors, spacing, radii, fonts). Avoid hardcoded values.
- Lint with `npm run lint:css` (or `lint:css:fix`).

## CSS usage/purge
- Analyze selectors: `npm run css:check` → writes `static/css/used-selectors.txt` and `unused-selectors.txt`.
- Optionally write purged CSS: `npm run css:check:write` → `static/css/style.purged.css` (not used by templates).
- Dynamic classes safelist: `scripts/purge-safelist.json` (default `['open','active','live']` in `scripts/purge-check.mjs`).
- Note: site loads Hugo-compiled CSS; `npm run css:min` only affects `static/css/style.min.css`.

## JS & dynamic classes
- Included scripts: `static/js/live-marquee.js` and `static/js/upcoming-carousel.js`.
- Header menu toggles `open` on `.hamburger` and `#main-nav` (`partials/header.html`).
- Upcoming carousel hooks use `data-upcoming-track`, `data-upcoming-prev`, `data-upcoming-next` in markup. If you add classes toggled by JS, update the purge safelist.

## Navigation & params
- Menu: `[menu.main]` in `config.toml` → rendered in `partials/header.html`.
- Live/offline: `[params] radio_online = true|false` controls banner and player partials.

## Do / Don’t
- Do edit: `themes/.../layouts/**`, `assets/scss/**`, `static/js/**`, `content/**`, `config.toml`.
- Don’t edit: `public/**`, `resources/_gen/**`; don’t assume static CSS files are the ones actually loaded.

## When adding features
- Create reusable partials in `themes/.../layouts/partials/` and include from pages or `baseof.html`.
- Extend `_tokens.scss` for new design variables and import new SCSS in `main.scss` respecting order.
- Ensure new content types needing search produce JSON (mirror `_default/section.json.json`).

If anything is unclear (front matter expectations, search index fields, CSS pipeline choices), say what you’re changing and we’ll extend these rules.
