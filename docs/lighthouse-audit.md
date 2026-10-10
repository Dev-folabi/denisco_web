# Lighthouse audit — denisco_web

**Date:** 2026-10-06
**Build:** production (`npm run build && npm run start`), served at `localhost:3000` against a local API with the prototype's catalogue seeded.
**Tool:** `lighthouse@12`, headless Chromium, default throttling for each preset.

Reproduce:

```bash
# Terminal 1 — the API
cd denisco_backend && make run-api

# Terminal 2 — the site
cd denisco_web && npm run build && npm run start

# Terminal 3 — the audit
npx lighthouse@12 http://localhost:3000/ --preset=desktop \
  --only-categories=performance,accessibility,best-practices,seo --view
```

---

## Scores

### Desktop

| Page | Performance | Accessibility | Best practices | SEO |
|---|---|---|---|---|
| `/` | 97 | 94 | 96 | 92 |
| `/shop` | 99 | 94 | 96 | 100 |
| `/shop/broiler-chicken` | 100 | 90 | 96 | 100 |
| `/consultation` | 100 | 96 | 96 | 100 |
| `/about` | 100 | 94 | 96 | 100 |

### Mobile (slow 4G and 4× CPU throttling, as the preset applies)

| Page | Performance | Accessibility | Best practices | SEO | LCP |
|---|---|---|---|---|---|
| `/` | 81 | 90 | 96 | 92 | 4.6 s |
| `/shop` | 83 | 90 | 96 | 100 | 4.0 s |
| `/shop/broiler-chicken` | 79 | 86 | 96 | 100 | 4.5 s |
| `/consultation` | 86 | 92 | 96 | 100 | 3.0 s |

Cumulative layout shift is 0 on every page measured, and total blocking time is
under 200 ms.

---

## What the audit changed

| Finding | Change |
|---|---|
| Home page performance 86, LCP 1.6 s (desktop) | The two farm videos were fetching metadata on load. They now use `preload="none"`: the poster is already visible, so nothing is fetched from a 20 MB MP4 until a visitor presses play. |
| `uses-responsive-images`, 73 KiB | The hero, farmland and CEO images had no `sizes`, so the browser picked a source for the viewport rather than for the frame they sit in. |
| `image-delivery`, 340 KiB on mobile | The video posters are the `poster` attribute of a `<video>`, which `next/image` never sees, so they were full-size PNGs — 215 KB for the pair. They now go through ImageKit's own transformations (`?tr=w-900,q-70,f-auto`), which serves ~94 KB of WebP to a browser that accepts it. |
| `select-name` on `/shop` | The sort dropdown had no accessible name — its options say "Sort: Featured", but the control itself said nothing. It now carries `aria-label="Sort products"`. |
| `label-content-name-mismatch` | The brand link's and the cart link's accessible names did not contain their visible text, and the date buttons in the booking scroller dropped the weekday. All three now include what is on screen, so voice control can reach them. |
| `canonical` missing on `/consultation` | The booking page is a client component and cannot export metadata, so the route gained a `layout.tsx` that carries its title, description and canonical URL. |
| Product pages had the site's default title | `generateMetadata` now builds the title, description and share card from the product itself. |

Server-side rendering of the catalogue pages (home, shop, product) came out of
the same work: the product grid is in the HTML a crawler receives rather than
appearing after a client fetch, which is what moved `/shop` and the product
pages to SEO 100.

---

## What was left alone, and why

Three findings are left open on purpose. The project's UI rule makes
`denisco_prototype.html` the final design spec, and each of these would mean
overriding it.

**`color-contrast` (33–42 elements per page).** The flagged elements are the
design system's own tokens: olive `#4E7A38` on cream `#FAF6EC` for the eyebrow
labels and small caps, and muted `#6B6456` for secondary copy. They sit between
3.6:1 and 4.4:1 against their backgrounds, below the 4.5:1 that WCAG AA asks for
body text. Fixing it means darkening brand colours across every page, which is a
decision for the client rather than for this phase. Worth raising with them: a
slightly darker olive would clear AA without changing the character of the
design.

**`heading-order` (1–2 elements per page).** The footer column heads and the
product card titles are `<h4>` under an `<h2>`, matching the prototype's markup,
and `globals.css` styles `.footer-col h4` and `.product-body h4` by element.
Promoting them to `<h3>` would need those rules rewritten, with a real risk of
visual drift for a heuristic finding.

**`link-text` on `/` (SEO 92).** The four service rows each link with the words
"Learn More", which is the prototype's copy. The links now carry a descriptive
`aria-label` ("Learn more about Poultry Production"), so assistive technology and
crawlers reading the accessible name are served, but Lighthouse scores the
visible text, and changing that copy is the client's call.

**`errors-in-console` (best practices 96).** One console entry on every page
load: the `POST /auth/refresh` that restores a session returns 401 for a visitor
who has none. The access token is deliberately held in memory only, so the
client cannot know whether a session exists without asking — and the refresh
cookie is `HttpOnly`, which is the point. The 401 is handled, not an error in
behaviour; removing the console line would mean adding a readable
"has-session" hint cookie, which is a change to the auth design rather than a
performance fix.

---

## Responsive checks

The breakpoints in the plan (1240 / 1024 / 760 / 640 / 390 px) are covered by
the Playwright suite rather than by Lighthouse:

- `e2e/responsive.spec.ts` runs at 390 × 844 and asserts the sliding navigation
  opens, links through and closes; that the product grid becomes one column; and
  that nothing overflows sideways.
- The desktop project runs the remaining specs at 1440 × 900.

`npm run test:e2e` runs both.
