# DENISCO Web (Customer Frontend) — Implementation Plan

**Technology:** Next.js 15 (App Router), TypeScript, Tailwind CSS, shadcn/ui, TanStack Query, Zod, React Hook Form, Lucide
**Source of truth:** `denisco_prototype.html`

---

> **UI & Design Rule — Non-negotiable:** Every visual decision must match `denisco_prototype.html` exactly. Treat it as the final design spec. Before implementing any UI element, component, or page, check the prototype AND `design-system.md` for exact values (colors, font sizes, spacing, copy, icons). Do not guess or use Tailwind defaults — always use the design system tokens.

---

## 1. Project Setup

- [x] Run `npx create-next-app@latest denisco_web --typescript --tailwind --app --src-dir`
- [x] Run `npx shadcn@latest init`
- [x] Install dependencies: `@tanstack/react-query zod react-hook-form @hookform/resolvers lucide-react`
- [x] Set up directory structure (below)
- [x] Configure Tailwind with design system tokens
- [x] Set up `next/font/google` for Fraunces + Manrope

### Directory Structure
```
src/
├── app/
│   ├── (public)/              # Public pages with main header/footer layout
│   │   ├── page.tsx           # Home
│   │   ├── about/page.tsx
│   │   ├── services/page.tsx
│   │   ├── shop/
│   │   │   ├── page.tsx       # Product listing
│   │   │   └── [slug]/page.tsx # Product detail
│   │   ├── consultation/page.tsx
│   │   ├── contact/page.tsx
│   │   ├── gallery/page.tsx   # Optional
│   │   └── policy/page.tsx
│   ├── (auth)/                # Auth pages (minimal layout)
│   │   ├── login/page.tsx
│   │   ├── register/page.tsx
│   │   ├── forgot-password/page.tsx
│   │   └── reset-password/page.tsx
│   ├── (customer)/            # Protected customer area
│   │   ├── account/
│   │   │   ├── page.tsx       # Dashboard
│   │   │   ├── orders/
│   │   │   │   ├── page.tsx
│   │   │   │   └── [id]/page.tsx
│   │   │   ├── payments/page.tsx
│   │   │   └── consultations/page.tsx
│   │   ├── cart/page.tsx
│   │   └── checkout/page.tsx
│   ├── payment/callback/page.tsx
│   ├── layout.tsx
│   ├── providers.tsx
│   ├── globals.css            # Design tokens
│   ├── loading.tsx
│   ├── error.tsx
│   └── not-found.tsx
├── components/
│   ├── ui/                    # shadcn/ui components
│   ├── layout/                # Header, Footer, MobileNav, Breadcrumb
│   ├── navigation/            # MainNav, AccountMobileNav
│   ├── product/               # ProductCard, ProductGrid, StockBadge, CategoryFilter
│   ├── cart/                   # CartRow, CartSummary, QtySteppper
│   ├── checkout/              # CheckoutForm, DeliveryMethodSelector, PaymentModal
│   ├── consultation/          # ConsultTypeCard, DateScroller, TimeSlotGrid, BookingForm
│   └── account/               # DashSidebar, StatCard, OrderDetailCard
├── features/
│   ├── auth/                  # api.ts, schemas.ts, types.ts, hooks.ts
│   ├── products/
│   ├── cart/
│   ├── orders/
│   ├── payments/
│   ├── consultations/
│   └── users/
├── lib/
│   ├── api/
│   │   ├── client.ts          # Fetch wrapper with auth, refresh, error handling
│   │   ├── errors.ts
│   │   └── endpoints.ts       # API URL constants
│   ├── auth/
│   │   ├── token-store.ts     # In-memory access token
│   │   └── auth-provider.tsx  # AuthContext, useAuth hook
│   ├── query/
│   │   └── query-client.ts
│   ├── utils/
│   │   ├── format.ts          # Money(), fmtDate(), fmtDateTime()
│   │   └── validation.ts      # isValidEmail(), isValidPhone()
│   └── constants/
│       └── index.ts           # SITE data (company info, services list)
├── hooks/
├── types/
└── config/
```

---

## 2. Page Implementation (from Prototype)

### 2.1 Home Page (`/`)
- [x] **Implement Home Page**

**Rendering:** Server-rendered or ISR with revalidation
**Sections (exact order from prototype):**
1. **Hero** — Grid 1.05fr/0.95fr. Left: eyebrow "Integrated Agriculture", h1 with italic `<mark>` highlight, description, two CTA buttons (Explore Products + Book Consultation), trust strip (3 items with icons). Right: blob-frame image with dots decoration and badge.
2. **About Split** — Image blob left, text right. Checklist with green circle check icons. "Discover Our Story" CTA.
3. **Featured Products** — Section with eyebrow + h2. 4-column product card grid. "View All Products" CTA.
4. **Services Preview** — Numbered editorial rows (4 of 12 services). "View All Services" CTA.
5. **CEO Section** — Photo blob left, quote with large `"` mark, CEO name and title.
6. **Farm Videos** — Two-column video blocks with tilted phone-shaped frames. Actual `<video>` elements with posters.
7. **CTA Banner** — Forest green rounded banner with 3 CTAs.

**Data needed:** Featured products (first 4), services (first 4), SITE constants.

### 2.2 About Page (`/about`)
- [x] **Implement About Page**

**Rendering:** Static
**Sections:**
1. Page hero (forest green, breadcrumb, title, tagline)
2. Company overview split section (philosophy quote)
3. Vision & Mission cards (2-column grid)
4. Core Values (4-column card grid: Quality, Integrity, Sustainability, Innovation, People)
5. Purpose & Promise (centered, integrated flow visualization, promise quote)
6. CEO section (photo blob + bio)

### 2.3 Services Page (`/services`)
- [x] **Implement Services Page**

**Rendering:** Static
**Sections:**
1. Page hero
2. Service detail grid (3-column, 12 cards with icon, title, description, checklist items)
3. Value chain flow + CTA

**12 Services from prototype:**
1. Seed Production and Development
2. Crop Production
3. Livestock Farming
4. Poultry Production
5. Snail Farming
6. Plantain and Banana Propagation
7. Forage and Feed Production
8. Integrated Farming
9. Farm Development and Management
10. Agricultural Consulting
11. Agricultural Training and Capacity Development
12. Agricultural Value Addition

### 2.4 Shop Page (`/shop`)
- [x] **Implement Shop Page**

**Rendering:** Server-rendered with revalidation (60s)
**Features:**
- Page hero
- Category filter chips: All Products, Poultry, Livestock, Piggery, Snail Farming, Crop Farming
- Sort dropdown: Featured, Price Low→High, Price High→Low, Name A→Z
- Results count text
- 4-column product grid
- Product card: image with category badge + stock badge, name, truncated description (78 chars), price per unit, Details + Add to Cart buttons
- URL params: `?category=poultry&search=chicken&sort=price-asc`
- Empty state when no products match

### 2.5 Product Detail (`/shop/[slug]`)
- [x] **Implement Product Detail Page**

**Rendering:** Server-rendered with revalidation
**Layout:** 2-column grid (0.9fr image blob, 1.1fr content)
**Content:**
- Breadcrumb: Home / Shop / {name}
- Category badge (static position)
- Product name (h1)
- Price display: serif font, 28px, forest color, "/ {unit}" suffix
- Description
- Stock badge + "{stock} {unit}(s) available"
- Quantity stepper (min 1, max stock)
- "Add to Cart" primary button + "View Cart" outline button
- Related products section (same category, max 4)

### 2.6 Cart Page (`/cart`)
- [x] **Implement Cart Page**

**Rendering:** Client-side
**Layout:** 2-column (1.6fr items, 1fr summary)
**Features:**
- Cart row: 74px image, name + price/unit, qty stepper, line subtotal, remove (trash) button
- "Continue Shopping" link
- Sticky summary card: subtotal, "Calculated at checkout" delivery, total, "Proceed to Checkout" button
- Empty state: basket icon, "Your cart is empty", Start Shopping CTA

### 2.7 Checkout Page (`/checkout`)
- [x] **Implement Checkout Page**

**Rendering:** Client-side (requires auth)
**Layout:** 2-column (form, summary)
**Form sections:**
1. **01 · Contact Details** — Name (prefilled), email (prefilled), phone (prefilled)
2. **02 · Delivery Method** — Radio cards: Home Delivery (₦2,500) selected by default, Farm Pickup (Free). Address textarea (shown only for delivery).
**Summary sidebar:** Item breakdown, subtotal, delivery fee, total, "Place Order" button.
**On submit:** Validate fields → call backend → redirect to Paystack → callback page

### 2.8 Payment Callback (`/payment/callback`)
- [x] **Implement Payment Callback Page**

**Rendering:** Client-side
**States:**
1. **Processing:** Spinner, "Confirming Your Order..."
2. **Success:** Green check, "Payment Successful!", order number in dashed box, "View Order" + "Continue Shopping" buttons
3. **Failed:** Red X, "Payment Failed", "Try Again" + "Cancel" buttons

### 2.9 Consultation Page (`/consultation`)
- [x] **Implement Consultation Page** — types, dates and time slots come from the API; a taken time is struck through for the chosen service, and booking works signed in or as a guest

**Rendering:** Client-side (availability from API)
**Sections:**
1. Page hero
2. Consultation type cards (3-column grid). Each: name, description, duration, price. Click to select (highlighted border).
3. Booking form card: selected type (hidden input), date scroller (horizontal scroll with snap), time slot grid (4-column), name, email, phone, notes textarea, Submit button.
**Date scroller:** Each date button shows weekday, day number, month. Selected: forest bg + white text.
**Time slots:** Pill buttons. Disabled + strikethrough if already booked for selected type+date.

### 2.10 Contact Page (`/contact`)
- [x] **Implement Contact Page**

**Rendering:** Static
**Layout:** 2-column (info cards, form)
**Info cards:** Address, Phone, Email, Business Hours
**Form:** Name, Email, Subject, Message textarea, Send Message button

### 2.11 Company Policy Page (`/policy`)
- [x] **Implement Company Policy Page**

**Rendering:** Static
**Layout:** Sidebar (260px) + content
**Sidebar:** Sticky nav with numbered policy section links
**Content:** Intro box (olive left border), 25 policy sections with eyebrow, h2, paragraphs, bullet lists, principle quotes. Policy promise box at end (forest bg).

### 2.12 Auth Pages
- [x] **Implement Login Page** — Card (440px), email + password fields, "Forgot password?" link → `/forgot-password`, register link. `?redirect=` support, restricted to same-site paths.
- [x] **Implement Register Page** — Card (480px), name + email + phone + password + confirm password, login link.
- [x] **Implement Forgot Password Page** — Card (440px), email field, success state.
- [x] **Implement Reset Password Page** — Card (440px), new password + confirm, token from URL.

### 2.13 Customer Account Pages
- [x] **Implement Account Layout** — `dash-shell`: Sidebar (270px, sticky) + main content. Sidebar: avatar circle with initials, name, email, nav links (Dashboard, My Orders, My Consultations, Transaction History, Logout). Mobile: bottom nav bar (fixed, 5 tabs).
- [x] **Implement Dashboard** (`/account`) — 4 stat cards (Total Orders, Total Spent, Consultations Booked, Account Status). Recent orders table (last 4) with "View All" link.
- [x] **Implement My Orders** (`/account/orders`) — Table: Order No., Date, Items, Total, Payment status, Fulfillment status, View link.
- [x] **Implement Order Detail** (`/account/orders/[id]`) — Breadcrumb, order detail card (order number, date, payment + fulfillment pills, items table, subtotal/delivery/total summary, delivery info, payment info).
- [x] **Implement Transactions** (`/account/payments`) — Table: Reference, Order No., Amount, Method, Status, Date.
- [x] **Implement My Bookings** (`/account/consultations`) — Table: Reference, Type, Date, Time, Status, with cancellation for a booking that still holds its time.

---

## 3. Components to Build

### Layout Components
- [x] `SiteHeader` — Sticky header: brand logo/text, main nav, search form, cart icon with badge, login/account button, mobile toggle
- [x] `SiteFooter` — Forest-deep bg: 4-column grid (brand + socials, Quick Links, Farm Divisions, Contact), copyright bar
- [x] `MobileNav` — Full-screen sliding panel (right), nav links with close button, scrim overlay
- [x] `PageHero` — Forest bg section: breadcrumb, h1, description
- [x] `Breadcrumb` — Simple text breadcrumb with links

### Product Components
- [x] `ProductCard` — Image with category + stock badge, name, description, price/unit, Details + Add buttons
- [x] `ProductGrid` — 4-column responsive grid
- [x] `StockBadge` — Green/amber/red pill with text
- [x] `CategoryFilter` — Horizontal chip buttons (pill shape, active state)
- [x] `SortDropdown` — Select element
- [x] `QtySteppper` — Bordered group: - button, input, + button

### Cart Components
- [x] `CartRow` — 5-column grid: image, info, qty stepper, subtotal, remove
- [x] `CartSummary` — Sticky card: line items, subtotal, delivery, total, CTA button

### Consultation Components
- [x] `ConsultTypeCard` — Selectable card: name, description, duration, price
- [x] `DateScroller` — Horizontal scroll container with date buttons (weekday, day, month)
- [x] `TimeSlotGrid` — 4-column grid of pill buttons, disabled state for taken slots

### Account Components
- [x] `DashSidebar` — Avatar, name, nav links (desktop). Bottom tab bar (mobile).
- [x] `StatCard` — Left border accent, icon circle, value, label
- [x] `OrderDetailCard` — Full order info card with items table and summary
- [x] `StatusPill` — Colored pill badge for order/payment/booking status

### Shared UI Components (via shadcn/ui + custom)
- [x] `Button` — Pill shape (rounded-full), variants: primary, accent, outline, ghost, danger
- [x] `Card` — White bg, line border, rounded-[18px], shadow
- [x] `Modal` — Centered overlay with close button, wide variant
- [x] `Toast` — Bottom-right stack: left colored border, icon + message, auto-dismiss
- [x] `ConfirmDialog` — Modal with title, message, Cancel + Confirm buttons
- [x] `EmptyState` — Centered: large icon, h3, description, optional CTA
- [x] `FormControl` — Input with olive focus border
- [x] `SectionHead` — Eyebrow (green line + uppercase text) + h2 + optional description

---

## 4. API Integration

### API Client (`lib/api/client.ts`)
- [x] Base URL from `NEXT_PUBLIC_API_URL`
- [x] Attach `Authorization: Bearer {accessToken}` for authenticated requests
- [x] Single-flight refresh: if 401, refresh token via cookie, retry original request
- [x] Parse response: extract `data` from `{success, message, data}` envelope
- [x] Throw typed errors for `{success: false, error: {code, message}}`

### Auth Integration (live)
- [x] `NEXT_PUBLIC_API_URL` holds the API origin; `lib/api/endpoints.ts` carries the `/api/v1` paths
- [x] Register, login, logout, forgot-password, reset-password and change-password call the backend through `apiClient`
- [x] Session restore on load: `POST /auth/refresh` runs before `GET /auth/me`, because the in-memory access token does not survive a page load
- [x] `RequireAuth` guards `(customer)/account`, redirecting to `/login?redirect=…` and returning the customer there after signing in

### Feature API Pattern
- [x] Set up feature API pattern per module (`features/*/api.ts`) — `products`, `cart`, `orders`, `payments` and `consultations` implemented
```typescript
export async function getProducts(params?: ProductListParams): Promise<PaginatedResponse<Product>> {
  return apiClient.get('/api/v1/products', { params });
}
```

### TanStack Query Hooks
- [x] Set up TanStack Query hooks per module (`features/*/hooks.ts`) — catalogue, cart, order, payment and consultation hooks wired, with cache invalidation on every mutation that changes stock or slot availability
```typescript
export function useProducts(params?: ProductListParams) {
  return useQuery({ queryKey: ['products', params], queryFn: () => getProducts(params) });
}
```

### Server-Side Fetching
- [x] For SSR/ISR pages (home, shop, product detail): fetch directly with `fetch()` + `next: { revalidate: 60 }` — `lib/api/server.ts` reads the catalogue on the server and the pages hand it to the client components as TanStack Query's `initialData`, which then refetches on mount. The HTML a crawler receives holds real products; stock figures stay live

---

## 5. Rendering Strategy

| Page | Strategy | Status | Reason |
|---|---|---|---|
| Home | SSR/ISR (60s) | [x] | SEO, product data |
| About | Static | [x] | No dynamic data |
| Services | Static | [x] | No dynamic data |
| Policy | Static | [x] | No dynamic data |
| Shop | SSR/ISR (60s) | [x] | SEO, product data |
| Product Detail | SSR/ISR (60s) | [x] | SEO, product data |
| Contact | Static | [x] | No dynamic data |
| Cart | CSR | [x] | User-specific, interactive |
| Checkout | CSR | [x] | Auth-required, interactive |
| Payment Callback | CSR | [x] | Real-time payment status |
| Consultation | CSR | [x] | Interactive booking flow |
| Account pages | CSR | [x] | Auth-required, user-specific |
| Login/Register | CSR | [x] | Interactive forms |

---

## 6. SEO & Metadata

- [x] Every page: `<title>`, `<meta name="description">`, Open Graph tags — `lib/seo.ts` builds them in one place, because Next replaces nested metadata objects rather than merging them; the root layout sets `metadataBase` so canonical paths resolve
- [x] Home: "DENISCO GLOBAL AGRICULTURE LTD | Farm to Fork Agriculture & Agro-Services"
- [x] Product pages: dynamic title and description from product data — `generateMetadata` builds both from the product, with its image as the share card; a slug that is not in the catalogue returns a real 404
- [x] Sitemap generation — `app/sitemap.ts`: the public pages plus every listed product, regenerated hourly
- [x] robots.txt — `app/robots.ts`: crawlable everywhere except the account, cart, checkout, payment and confirmation routes

---

## 7. Responsive Breakpoints (from Prototype)

| Breakpoint | Behavior |
|---|---|
| > 1240px | Full desktop layout, horizontal nav |
| 1024px–1240px | Mobile nav (sliding panel), 2-col grids |
| 760px–1024px | Stack hero/split sections, hide sidebar |
| 640px–760px | Single column grids, stacked cart rows |
| < 640px | Compact header, single column everything |
| < 390px | Hide brand text, minimal padding |

---

## 8. Testing

Run them with `npm test` (Vitest, 32 tests) and `npm run test:e2e` (Playwright,
18 tests across a desktop and a phone-sized project). The end-to-end suite needs
the API running with a seeded catalogue, and with `RATE_LIMIT_ENABLED=false` —
it registers an account per spec, and the signup limiter is 10 an hour.

### Unit Tests
- [x] Utility functions (Money formatter, date formatting) — `lib/utils/format.test.ts`, with the timezone pinned to Africa/Lagos so the suite does not depend on the machine's
- [x] Zod schemas (product, order, booking validation) — `lib/validation/schemas.test.ts`; the schemas restate the API's bounds and are wired into the register, checkout, booking and contact forms
- [x] Auth token management — `lib/auth/token-store.test.ts`, including an assertion that the access token never reaches browser storage

### E2E Tests (Playwright)
- [x] Home page renders correctly — including that the featured products are in the HTML, not only after hydration
- [x] Shop: filter by category, sort, view product — the filtered grid is checked against the API's own list, so a filter that returned everything would fail
- [x] Product detail: add to cart with quantity
- [x] Cart: update qty, remove item, proceed to checkout
- [x] Login and register flows — register, sign out, sign back in, a wrong password, a mistyped confirmation, and the redirect back after signing in
- [x] Consultation: select type, date, time, submit booking — as a guest, through to the `CB-` reference
- [x] Responsive: mobile nav, mobile account nav — at 390 × 844: the panel slides in, links through and slides out; the grid becomes one column; nothing overflows sideways

---

## 9. Production readiness (2026-10-06)

- **Error and loading states.** `app/error.tsx` keeps the header and footer so a
  visitor who hits it is still on the site, and offers `reset`;
  `app/global-error.tsx` covers a failure in the root layout itself and carries
  its own markup; `app/not-found.tsx` was already there. The loading fallback
  sits at `(customer)/loading.tsx` rather than at the root **on purpose**: a
  root `loading.tsx` starts streaming the response, and a status code cannot
  change once streaming has begun, which turned a removed product into a soft
  404 (200 with the not-found page). Scoped this way, `/shop/<unknown>` returns
  a real 404.
- **Performance and Lighthouse.** Desktop 97–100 across home, shop, product,
  consultation and about; mobile 79–86 under the preset's slow-4G and 4× CPU
  throttling. CLS is 0 everywhere. `docs/lighthouse-audit.md` records the
  scores, what changed (video preload, image `sizes`, ImageKit transformations
  for the video posters) and the three findings left open because fixing them
  would override the prototype: brand-colour contrast, heading order, and the
  "Learn More" link copy.
- **Form validation.** The ad-hoc checks in the register, checkout and booking
  forms were replaced by the shared Zod schemas, which mirror the API's rules;
  the contact form now validates and hands the message to the visitor's mail
  client instead of posting into nothing, since the API has no contact endpoint.
- **Two defects found and fixed while testing.** Signing out from the account
  area landed on `/login?redirect=/account` instead of the home page, because
  the route guard saw the session go before the navigation committed — the guard
  now stands aside while a sign-out is in flight. And adding to the cart in the
  first moment after a page load bounced a signed-in customer to the login page,
  because the in-memory access token has not been restored yet; the action now
  only redirects someone who is definitely signed out, and lets the client's
  refresh-and-retry handle the rest.
- **CI.** `.github/workflows/ci.yml` runs lint, typecheck, the unit tests and a
  production build. The end-to-end suite is left out of CI because it needs the
  Go API, MongoDB as a replica set and Redis, which live in the backend
  repository.

---

## 10. Changes after production readiness (2026-10-10)

See §7 of the root `claude.md` for the reasoning. In this repository:

- **The consultation page** no longer asks for availability per service: a
  booked hour is closed to every service, so there is one calendar. Submitting
  a booking now hands over to Paystack when the service carries a fee. If the
  handover fails — no provider configured, provider down — the visitor still
  reaches the confirmation page with their slot held, rather than losing the
  booking they just made.
- **The confirmation page** shows the fee and its state, and offers the payment
  again while it is outstanding. It works for a guest: the reference from the
  redirect is sent with the request, which is what lets the API return a
  booking that belongs to no account.
- **The payment callback** handles both kinds of payment and no longer waits to
  be authenticated — a guest paying a consultation fee has no session, only the
  reference in the URL.
- **`/account/consultations`** gains Fee and Payment columns and a "Pay Fee"
  action, which is also how a declined card is retried.
- **`/account`**: "Consultations Booked" was hard-coded to `0` and now reads
  the customer's own booking total.
- **`/account/payments`**: the "Order No." column became "For", because a
  transaction now settles an order or a consultation.
- The booking end-to-end test accepts either destination after submitting,
  since whether the handover happens depends on the API having Paystack keys.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
