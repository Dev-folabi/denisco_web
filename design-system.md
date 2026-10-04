# DENISCO Web — Design System

**Extracted from:** `denisco_prototype.html` (the source of truth)
**Implementation:** Tailwind CSS custom theme + shadcn/ui component overrides

> **MANDATORY:** Always read and follow this file AND `denisco_prototype.html` before implementing any UI component or page. All values here are extracted directly from the prototype CSS. Do not guess — use the exact tokens listed.

---

## 1. Color Palette

### Brand Colors (CSS Custom Properties → Tailwind Config)

| Token | Hex | Usage |
|---|---|---|
| `cream` | `#FAF6EC` | Primary page background |
| `cream-deep` | `#F1EAD8` | Secondary background, section alternation, hover states |
| `white` | `#FFFFFF` | Card backgrounds, inputs |
| `ink` | `#1E2A1B` | Primary body text |
| `forest` | `#173620` | Primary brand, headings, primary button bg, active nav |
| `forest-deep` | `#0E2213` | Dark brand, header top bar bg, footer bg, admin sidebar bg |
| `olive` | `#5B7B45` | Secondary brand, links, accents, eyebrow text, focus borders |
| `olive-light` | `#8FAE6E` | Decorative dots, light accents |
| `lime` | `#CBE36B` | Highlight accent, mark underlines, play buttons, accent button bg |
| `lime-deep` | `#A9C93B` | Accent button hover, quote marks |
| `clay` | `#C97A4A` | Cart badge background, warm accent |
| `line` | `#E6DFC9` | Borders, dividers, table borders |
| `muted` | `#847E6C` | Secondary text, descriptions, hints |
| `red` | `#B3462C` | Error, danger, out-of-stock |
| `blue` | `#3B6E8F` | Info, processing status |

### Status Badge Colors

| Status | Background | Text Color |
|---|---|---|
| Green (paid, confirmed, in stock, success) | `#e5f0da` | `forest` (#173620) |
| Amber (pending, low stock) | `#faecd8` | `#a2651b` |
| Red (failed, cancelled, out of stock) | `#f8e2db` | `red` (#B3462C) |
| Grey (default/unknown) | `#efece2` | `muted` (#847E6C) |
| Blue (processing, dispatched, info) | `#e1edf4` | `blue` (#3B6E8F) |

### Tailwind Config Extension
```typescript
// tailwind.config.ts
const config = {
  theme: {
    extend: {
      colors: {
        cream: { DEFAULT: '#FAF6EC', deep: '#F1EAD8' },
        ink: '#1E2A1B',
        forest: { DEFAULT: '#173620', deep: '#0E2213' },
        olive: { DEFAULT: '#5B7B45', light: '#8FAE6E' },
        lime: { DEFAULT: '#CBE36B', deep: '#A9C93B' },
        clay: '#C97A4A',
        line: '#E6DFC9',
        muted: '#847E6C',
        danger: '#B3462C',
        info: '#3B6E8F',
        // Status badge tokens
        badge: {
          green: { bg: '#e5f0da', text: '#173620' },
          amber: { bg: '#faecd8', text: '#a2651b' },
          red: { bg: '#f8e2db', text: '#B3462C' },
          grey: { bg: '#efece2', text: '#847E6C' },
          blue: { bg: '#e1edf4', text: '#3B6E8F' },
        }
      },
    },
  },
};
```

---

## 2. Typography

### Font Families

| Role | Family | Google Fonts |
|---|---|---|
| Serif (headings, prices, quotes) | `Fraunces` | `Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500;1,9..144,600` |
| Sans (body, UI, buttons) | `Manrope` | `Manrope:wght@400;500;600;700;800` |

### Font Loading
```html
<!-- app/layout.tsx or next/font -->
<link href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,300;0,9..144,500;0,9..144,600;0,9..144,700;0,9..144,900;1,9..144,500;1,9..144,600&family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet">
```

Prefer `next/font/google` for self-hosting:
```typescript
import { Fraunces, Manrope } from 'next/font/google';
const fraunces = Fraunces({ subsets: ['latin'], variable: '--font-serif' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-sans' });
```

### Tailwind Config
```typescript
fontFamily: {
  serif: ['var(--font-serif)', 'Fraunces', 'serif'],
  sans: ['var(--font-sans)', 'Manrope', 'sans-serif'],
},
```

### Type Scale (from Prototype)

| Element | Size | Weight | Family | Color |
|---|---|---|---|---|
| h1 (hero) | `min(6vw, 50px)` / clamp(30px, 10vw, 50px) | 600 | Serif | `forest` |
| h1 (page hero) | 38px (mobile: clamp 28-36px) | 600 | Serif | white |
| h2 (section) | 38px (mobile: 28-31px) | 600 | Serif | `forest` |
| h3 | 19px | 600 | Serif | `forest` |
| h4 | 16.5px | 600 | Serif | `forest` |
| Body text | 16px (page base; prototype body sets no font-size) | 400 | Sans | `ink` |
| Body line-height | 1.65 | — | — | — |
| Inputs / selects / textarea | 14px | 400 | Sans | — |
| Button text | 14px (sm: 12.5px) | 700 | Sans | — |
| Eyebrow | 11.5px | 800 | Sans | `olive` |
| Price (large) | 28px | 700 | Serif | `forest` |
| Price (card) | 11.5px | — | Sans | `muted` |
| Muted text | 13-13.5px | 400 | Sans | `muted` |
| Table header | 11.5px | 800 | Sans | `forest` |

### Global Heading CSS Rule (required in `globals.css`)

The prototype sets all `h1`–`h4` globally to Fraunces serif. This rule **must** exist in `globals.css` so headings render correctly even without an explicit `font-heading` class:

```css
h1, h2, h3, h4 {
  font-family: var(--font-heading);   /* Fraunces */
  color: var(--color-forest);         /* #173620 */
  margin: 0 0 0.45em;
  line-height: 1.15;
  font-weight: 600;
}
```

Tailwind utility classes (`text-muted`, `text-ink`, etc.) override the element-level color when needed.

---

## 3. Spacing & Layout

### Container
- Max width: `1220px`
- Padding: `0 24px` (mobile: `0 18px`, tiny: `0 12px`)

### Section Spacing
- Vertical padding: `96px 0` (mobile: `64px 0`)
- Section head margin-bottom: `54px`

### Grid System
- Gap: `28px` (default)
- 4-column: product grids, stat cards (desktop)
- 3-column: service detail cards, consultation types
- 2-column: splits, checkout, vision/mission, form rows
- 1-column: all grids collapse to single column on mobile

---

## 4. Border Radius

| Token | Value | Usage |
|---|---|---|
| `r-lg` | `28px` | CTA banners, modal overlay radius |
| `r-md` | `18px` | Cards, panels, product images, table wraps, modals |
| `r-sm` | `10px` | Form inputs, smaller cards, accordion items |
| Pill | `100px` / `9999px` | Buttons, filter chips, status pills, badges |
| Circle | `50%` | Avatar, icon buttons, service icons |

### Tailwind Mapping

**Do NOT remap Tailwind's built-in `rounded-sm/lg/xl/2xl/3xl` tokens** (they are used by shadcn/ui internals and have Tailwind defaults). Instead use the CSS vars or arbitrary values:

| Prototype radius | Use |
|---|---|
| `28px` (`--r-lg`) | `var(--r-lg)` in CSS / `rounded-[28px]` |
| `24px` (modal, rounded nav panel) | `rounded-3xl` (Tailwind default = 24px) or `rounded-[24px]` |
| `20px` (mobile modal top) | `rounded-t-[20px]` |
| `18px` (`--r-md`) | `rounded-[18px]` |
| `14px` (cart thumbs, stacked rows) | `rounded-[14px]` / `rounded-[13px]` per prototype |
| `12px` (off-canvas nav links) | `rounded-xl` (Tailwind default = 12px) |
| `10px` (`--r-sm`) | `rounded-[10px]` |
| Pill `100px`/`9999px` | `rounded-full` |

---

## 5. Shadows

| Token | Value | Usage |
|---|---|---|
| `shadow` | `0 10px 30px rgba(23,54,32,.10)` | Cards, product images, logo |
| `shadow-lg` | `0 26px 60px rgba(14,34,19,.18)` | Hero image, CEO photo, modals, toasts |

### Tailwind Config
```typescript
boxShadow: {
  DEFAULT: '0 10px 30px rgba(23,54,32,.10)',
  lg: '0 26px 60px rgba(14,34,19,.18)',
},
```

---

## 6. Button System

All buttons use `border-radius: 100px` (pill shape).

| Variant | Background | Text | Border | Hover |
|---|---|---|---|---|
| Primary | `forest` | white | transparent | `olive` bg, translateY(-2px) |
| Accent | `lime` | `forest-deep` | transparent | `lime-deep` bg, translateY(-2px) |
| Outline | transparent | `forest` | `forest` 2px | `forest` bg, white text |
| Outline Light | transparent | white | rgba(255,255,255,.6) | white bg, `forest` text |
| Ghost | `cream-deep` | `forest` | transparent | `olive` bg, white text |
| Danger | `#fbe7e1` | `red` | transparent | `red` bg, white text |

### Sizes
| Size | Padding | Font Size |
|---|---|---|
| Default | `15px 28px` | 14px |
| Small (`btn-sm`) | `9px 18px` | 12.5px |
| Block (`btn-block`) | full width | — |

### States
- Disabled: `opacity: 0.45`, `cursor: not-allowed`, no transform
- Hover: `translateY(-2px)` lift effect (except disabled)
- Gap between icon and text: `9px`
- Letter spacing: `0.2px`

---

## 7. Card System

### Standard Card
```css
background: white;
border: 1px solid #E6DFC9;
border-radius: 18px;
box-shadow: 0 10px 30px rgba(23,54,32,.10);
transition: transform .25s, box-shadow .25s;
```
Hover: `translateY(-5px)`, shadow-lg

### Product Card (flat variant)
```css
background: transparent;
border: none;
box-shadow: none;
/* Image wrapper has the shadow and border-radius */
```
Image hover: `transform: scale(1.06)`

### Consultation Type Card
```css
padding: 26px;
border: 2px solid #E6DFC9;
cursor: pointer;
```
Selected: `border-color: olive; background: cream-deep;`

---

## 8. Form System

### Form Control (Input/Select/Textarea)
```css
width: 100%;
padding: 13px 16px;
border: 1.5px solid #E6DFC9;
border-radius: 10px;
background: white;
font-size: 14px;
```
Focus: `border-color: olive;`
Error: `border-color: red;`

### Form Layout
- `form-group`: `margin-bottom: 20px`
- `form-row`: 2-column grid with `gap: 20px`
- Label: `font-weight: 700; font-size: 13px; color: forest; margin-bottom: 8px;`
- Hint: `font-size: 12px; color: muted;`
- Error message: `font-size: 12px; color: red;`

### Fieldset
```css
border: 1.5px solid #E6DFC9;
border-radius: 18px;
padding: 22px;
background: white;
```
Legend: `font-weight: 800; color: forest; font-size: 13px; uppercase; letter-spacing: 0.6px;`

### Radio Card
```css
display: flex;
align-items: center;
gap: 12px;
border: 1.5px solid #E6DFC9;
border-radius: 10px;
padding: 14px 16px;
cursor: pointer;
```
Selected: `border-color: olive; background: cream-deep;`

---

## 9. Header

> **Note:** The prototype's rendered markup (lines 571–609) has **no `header-top` strip** — the `.header-top-inner` CSS rule is stale/unused. Do not implement a top bar.

Actual structure — single sticky row inside `<header>`:

```
header: position sticky; top 0; z-index 200; bg cream; border-bottom 1px line
  └ container header-main-inner (padding 18px 24px; ≤640 → 12px 18px; ≤390 → 10px 12px)
      ├ brand: logo 54px circle (≤640 → 44px) + text stack
      │   strong: Fraunces 17px bold, tracking .2px, forest (≤640 → 14px)
      │   small: 10.5px bold uppercase tracking 1.6px, olive (≤640 → 8.5px / 1.2px)
      │   brand text hidden entirely ≤390px
      ├ nav (≥1241px): centered horizontal links, 14px/600, olive underline animation
      │   ≤1240px: off-canvas right panel, width min(82vw,300px), scrim,
      │            links 15px rounded 12px, cream-deep hover, "Explore Denisco" head
      │   ≤760px: panel becomes floating card (inset 8px, radius 24px, border)
      └ actions (.header-actions: gap 10px; 7px ≤640; 5px ≤390; ml-auto ≤1240):
          + search form (.header-search, hidden ≤1240)
          + cart .icon-btn 42px (40px ≤640, 38px ≤390) with .cart-badge
          + login/account .btn.btn-primary.btn-sm
            (≤640 → 42px circle, padding 0, inner text span hidden; 38px ≤390)
          + menu toggle .icon-btn.menu-toggle (display:none ≥1241; flex ≤1240)
```

---

## 10. Navigation

### Main Nav (Desktop)
- Horizontal links with underline animation (center-out, 2px olive)
- Active: olive underline, forest color
- Font: 14px, weight 600

### Main Nav (Mobile, ≤1240px)
- Full-height sliding panel from right
- Width: `min(82vw, 300px)` (≤760px: `calc(100vw - 16px)`, rounded 24px)
- Scrim overlay behind
- Close button in header
- Links: 15px, padded, rounded 12px, cream-deep hover bg

### Account Sidebar (Desktop)
- 270px wide, sticky at top: 110px
- White bg, line border, rounded 18px
- User avatar circle (46px, initials, serif font, cream-deep bg)
- Nav links: 14px bold, 12px padding, active: cream-deep bg

### Account Bottom Nav (Mobile, ≤760px)
- Fixed bottom bar, white bg, blur backdrop
- 5 equal-width tabs: icon (15px) + label (9px)
- Active: forest color, icon gets cream-deep rounded bg

---

## 11. Specific Component Specs

### Hero Badge (floating on hero image)
```css
position: absolute;
bottom: -24px; left: -24px;
background: white;
border-radius: 18px;
padding: 16px 20px;
display: flex; gap: 12px;
box-shadow: shadow-lg;
border: 1px solid line;
```
Content: olive icon (24px) + bold title (serif 14px) + description (11.5px muted)

### Eyebrow Label
```css
display: inline-flex;
align-items: center;
gap: 8px;
color: olive;
font-weight: 800;
font-size: 11.5px;
letter-spacing: 2px;
text-transform: uppercase;
```
Has `::before` pseudo-element: `width: 26px; height: 2px; background: olive;`

### Trust Strip Items
```css
display: flex;
align-items: center;
gap: 10px;
font-weight: 700;
font-size: 13px;
color: forest;
```
Icon: olive, 17px

### Stock Badges
| State | Background | Text |
|---|---|---|
| In Stock | `#e5f0da` | `forest` |
| Low Stock | `#faecd8` | `#a2651b` |
| Out of Stock | `#f8e2db` | `red` |

Position on product card: `top: 12px; right: 12px;`
Style: `font-size: 10.5px; padding: 5px 11px; border-radius: 999px; font-weight: 800;`

### Qty Stepper
```css
display: inline-flex;
border: 1.5px solid line;
border-radius: 10px;
overflow: hidden;
```
Buttons: `40px × 42px; background: cream-deep; color: forest;`
Input: `54px wide; text-align: center; height: 42px;`

### Toast Notifications
```css
position: fixed;
bottom: 26px; right: 26px;
z-index: 1200;
```
Each toast: `white bg; left border 4px; shadow-lg; padding: 15px 20px; border-radius: 10px; font-size: 13.5px; font-weight: 700; max-width: 320px;`
Animate in: `opacity 0→1; translateX(30px→0); transition: 0.3s;`
Auto-dismiss: 3.5 seconds
Types: success (olive border), error (red border), info (blue border)

### Modal
```css
.overlay: position fixed; inset 0; background rgba(14,34,19,.6); z-index 1000;
.box: white bg; border-radius 24px; max-width 560px (wide: 820px); max-height 90vh; overflow-y auto; padding 30px; shadow-lg;
.close: position absolute; top 18px; right 18px; 36px circle; cream-deep bg;
```

### Page Hero
```css
background: forest;
padding: 70px 0 (mobile: 54px 0);
color: white;
text-align: center;
overflow: hidden;
```
Decorative circle: olive, 400px, 0.2 opacity, bottom-left positioned
Breadcrumb: 12px, `#bcdaab`, links underlined

### Service Row (numbered editorial)
Grid: `90px 60px 1fr auto` columns
- Number: serif 40px, transparent text with olive-light stroke (1.4px)
- Icon circle: 52px, cream-deep bg, forest color
- Title: serif 19px
- CTA: ghost button

### Video Frame
```css
max-width: 280px–380px;
aspect-ratio: 9/16;
border-radius: 24px;
overflow: hidden;
border: 6px solid white;
transform: rotate(-2deg); /* first block */
transform: rotate(2deg);  /* second block */
box-shadow: shadow-lg;
background: forest-deep;
```

### CTA Banner
```css
background: forest;
border-radius: 28px;
padding: 64px (mobile: 40px 22px);
text-align: center;
color: white;
```
Decorative circle: olive, 340px, 0.25 opacity, top-right positioned

### Footer
```css
background: forest-deep;
color: #c7dcbe;
```
Grid: `2fr 1fr 1fr 1.3fr` (tablet: 1fr 1fr, mobile: 1fr)
Link color: `#a9c69d`, hover: white
Social icons: 38px circles, `rgba(255,255,255,.08)` bg, hover: olive-light
Watermark: serif, `min(18vw, 220px)`, `rgba(255,255,255,.03)`, bottom positioned

---

## 12. Icons

**Library:** Lucide React (maps to Font Awesome icons used in prototype)

> **Brand icons:** `lucide-react` no longer exports `Facebook`/`Instagram`/`Twitter`. Footer socials use inline SVGs in `src/components/layout/social-icons.tsx` (`FacebookIcon`, `InstagramIcon`, `XIcon`, `WhatsAppIcon`).

| Prototype (FA) | Lucide Equivalent |
|---|---|
| `fa-seedling` | `Sprout` |
| `fa-leaf` | `Leaf` |
| `fa-wheat-awn` | `Wheat` |
| `fa-cow` | `Beef` (or custom) |
| `fa-egg` | `Egg` |
| `fa-tree` | `TreeDeciduous` |
| `fa-bowl-food` | `Soup` |
| `fa-arrows-spin` | `RefreshCcw` |
| `fa-compass-drafting` | `Compass` |
| `fa-comments` | `MessageCircle` |
| `fa-chalkboard-user` | `Presentation` |
| `fa-box-open` | `PackageOpen` |
| `fa-basket-shopping` | `ShoppingBasket` |
| `fa-cart-plus` | `ShoppingCart` + `Plus` |
| `fa-magnifying-glass` | `Search` |
| `fa-user` | `User` |
| `fa-bars` | `Menu` |
| `fa-xmark` | `X` |
| `fa-check` | `Check` |
| `fa-trash` | `Trash2` |
| `fa-pen` | `Pencil` |
| `fa-plus` | `Plus` |
| `fa-arrow-left` | `ArrowLeft` |
| `fa-arrow-right` | `ArrowRight` |
| `fa-chevron-down` | `ChevronDown` |
| `fa-circle-check` | `CheckCircle2` |
| `fa-circle-xmark` | `XCircle` |
| `fa-circle-info` | `Info` |
| `fa-spinner` | `Loader2` (with animate-spin) |
| `fa-lock` | `Lock` |
| `fa-tag` | `Tag` |
| `fa-gauge` | `Gauge` |
| `fa-box` | `Package` |
| `fa-sack-dollar` | `Coins` (or `DollarSign`) |
| `fa-calendar-check` | `CalendarCheck` |
| `fa-receipt` | `Receipt` |
| `fa-right-from-bracket` | `LogOut` |
| `fa-location-dot` | `MapPin` |
| `fa-map-signs` | `Signpost` (**not** `MapSigns` — it does not exist in lucide-react) |
| `fa-phone` | `Phone` |
| `fa-envelope` | `Mail` |
| `fa-clock` | `Clock` |
| `fa-eye` | `Eye` |
| `fa-bullseye` | `Target` |
| `fa-award` | `Award` |
| `fa-shield-heart` | `ShieldCheck` |
| `fa-lightbulb` | `Lightbulb` |
| `fa-people-group` | `Users` |
| `fa-triangle-exclamation` | `TriangleAlert` |

---

## 13. Animations & Transitions

| Element | Property | Duration | Easing |
|---|---|---|---|
| Links | `color` | 0.2s | ease |
| Cards | `transform, box-shadow` | 0.25s | ease |
| Product image | `transform` (scale) | 0.4s | ease |
| Buttons | `all` | 0.25s | ease |
| Nav underline | `width` | 0.25s | ease |
| Mobile nav | `right` position | 0.3s | ease |
| Toast | `opacity, transform` | 0.3s | ease |
| Accordion body | `max-height` | 0.3s | ease |
| Admin sidebar | `transform` | 0.25s | ease |

---

## 14. Currency Formatting

```typescript
function Money(amount: number): string {
  return '₦' + Number(amount || 0).toLocaleString('en-NG');
}
```
- Always display prices as naira with ₦ prefix
- Backend stores as kobo (integer); frontend divides by 100 for display if needed
- Locale: `en-NG`

---

## 15. Image Handling

- Static images live in **`denisco_web/public/images/`** (copied from the prototype's `assets/media/`) and are referenced as **`/images/<filename>`** (e.g. `/images/local-chickens.png`, `/images/hero-crop-field.jpg`). The prototype's `assets/media/...` paths are relative to the prototype file only — never use them in the app.
- Product images (future): served via ImageKit URL endpoint
- Product card images: `height: 210px; object-fit: cover; border-radius: 18px;`
- Product detail image: blob shape `border-radius: 44% 56% 60% 40%/50% 45% 55% 50%; height: 460px;`
- CEO photo: blob shape `border-radius: 60% 40% 45% 55%/50% 60% 40% 50%;`
- Cart thumbnails: `74px × 74px; object-fit: cover; border-radius: 14px;`
- Admin product thumbnails: `48px × 48px; object-fit: cover; border-radius: 10px;`

---

## 16. Responsive Breakpoints (from prototype)

All prototype breakpoints, in cascade order (later rules win):

| Max width | Key behavior |
|---|---|
| **1240px** | Header nav becomes off-canvas right panel; header search hidden; header main row `justify-content: space-between`; off-canvas link refinements (rounded 12px, cream-deep hover, "Explore Denisco" panel head, scrim) |
| **1024px** | `.hero-inner`, `.ceo-section`, `.split`, `.pd-grid`, `.cart-layout`, `.video-two-col`, `.contact-grid`, `.policy-layout` → single column; `.grid-3`/`.grid-4`/`.stat-cards`/`.service-detail-grid`/`.policy-nav` → 2 columns; `.hero-media img` → 340px; `.dash-shell` → single column (sidebar `order:2`, content `order:1`) |
| **860px** | Footer grid → `1fr 1fr` |
| **760px** | Hero/pd-grid/cart-layout/contact-grid stack; hero image → 300px, hero h1 → `clamp(30px,10vw,40px)`, hero badge max-width + compact padding; page-hero padding 54px; nav panel becomes floating card (inset 8px, radius 24, border); cart row → `64px minmax(0,1fr)` with `nth-child(n+3)` reflow to column 2; `.dash-side` hidden + `.account-mobile-nav` fixed bottom bar; **account tables stack**: `thead` hidden, rows become cards, each `td` shows `data-label` (`::before`) left, value right, dotted separators; toast max-width → none |
| **640px** | Container side padding → 18px; `.section` padding → 64px; `.section-head h2` → 31px; hero badge → `left:0; bottom:-16px`; all `.grid-2/3/4` → 1 column; header actions compact (actions gap 7px, `.icon-btn` → 40px, account btn → 42px circle icon-only, label span hidden); footer grid → 1 column; cart row → `56px 1fr` + `row-gap:10px`; `.stat-cards` → `repeat(2, minmax(0,1fr))`; `.panel-head > div` → full width; form rows stack; slot grid → 2 columns |
| **480px** | Booking date buttons compact (70px basis) |
| **420px** | Account stat cards → 1 column; stacked `td` gap 8px, label basis 38%; order-detail-card padding 15px |
| **390px** | Header: padding 10px 12px, brand text hidden, action gap 5px, buttons 38px; `.section-head h2` → 28px; stat cards → 1 column; service-row padding 24px; policy intro/promise padding 20px 16px |

### Stacked tables (≤760px)

Tables inside `.dash-shell` (`.account-table`) and `.order-detail-card .table-wrap` (`.responsive-stack-table`) stack via `data-label` on every `<td>` — the `data-label` value is the prototype's own (often shorter than the `<th>`, e.g. `Order` for "Order No.", `Unit price` for "Unit Price", `Consultation` for "Type"). Keep labels verbatim from the prototype.

### In Tailwind

Use **inclusive** arbitrary media variants: `[@media(max-width:Npx)]:…` (compiles verbatim). Do **not** use Tailwind's `max-[Npx]:` or `max-sm:` — v4 compiles them to `@media not all and (min-width:Npx)`, which is **exclusive of exactly N** (a 390px iPhone would miss every `max-[390px]:` rule). Also do not use `max-md`/`max-lg` (480/768 don't match the prototype).

Compiled order of `[@media(max-width:Npx)]:` blocks is **not** width-descending (observed: 1240 → 390 → 640 → 760), so when one element carries utilities from two tiers that set the same property, the wider tier's block can come later and wrongly win at ≤390 (e.g. `size-10` at 640 beating `size-[38px]` at 390). Fix by adding `!` to the narrower tier's utility (`[@media(max-width:390px)]:size-[38px]!`) — see `site-header.tsx` and `section-head.tsx`. Where the prototype uses a reusable class (`.icon-btn`, `.header-actions`), prefer an unlayered rule in `globals.css` (unlayered beats all layered utilities regardless of order).
