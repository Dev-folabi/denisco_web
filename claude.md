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
- [x] **Implement Consultation Page**

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
- [x] **Implement Login Page** — Card (440px), email + password fields, demo hint, register link. `?redirect=checkout` support.
- [x] **Implement Register Page** — Card (480px), name + email + phone + password + confirm password, login link.
- [x] **Implement Forgot Password Page** — Card (440px), email field, success state.
- [x] **Implement Reset Password Page** — Card (440px), new password + confirm, token from URL.

### 2.13 Customer Account Pages
- [x] **Implement Account Layout** — `dash-shell`: Sidebar (270px, sticky) + main content. Sidebar: avatar circle with initials, name, email, nav links (Dashboard, My Orders, My Consultations, Transaction History, Logout). Mobile: bottom nav bar (fixed, 5 tabs).
- [x] **Implement Dashboard** (`/account`) — 4 stat cards (Total Orders, Total Spent, Consultations Booked, Account Status). Recent orders table (last 4) with "View All" link.
- [x] **Implement My Orders** (`/account/orders`) — Table: Order No., Date, Items, Total, Payment status, Fulfillment status, View link.
- [x] **Implement Order Detail** (`/account/orders/[id]`) — Breadcrumb, order detail card (order number, date, payment + fulfillment pills, items table, subtotal/delivery/total summary, delivery info, payment info).
- [x] **Implement Transactions** (`/account/payments`) — Table: Reference, Order No., Amount, Method, Status, Date.
- [x] **Implement My Bookings** (`/account/consultations`) — Table: Reference, Type, Date, Time, Status.

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
- [ ] Base URL from `NEXT_PUBLIC_API_URL`
- [ ] Attach `Authorization: Bearer {accessToken}` for authenticated requests
- [ ] Single-flight refresh: if 401, refresh token via cookie, retry original request
- [ ] Parse response: extract `data` from `{success, message, data}` envelope
- [ ] Throw typed errors for `{success: false, error: {code, message}}`

### Feature API Pattern
- [ ] Set up feature API pattern per module (`features/*/api.ts`)
```typescript
export async function getProducts(params?: ProductListParams): Promise<PaginatedResponse<Product>> {
  return apiClient.get('/api/v1/products', { params });
}
```

### TanStack Query Hooks
- [ ] Set up TanStack Query hooks per module (`features/*/hooks.ts`)
```typescript
export function useProducts(params?: ProductListParams) {
  return useQuery({ queryKey: ['products', params], queryFn: () => getProducts(params) });
}
```

### Server-Side Fetching
- [ ] For SSR/ISR pages (home, shop, product detail): fetch directly with `fetch()` + `next: { revalidate: 60 }`

---

## 5. Rendering Strategy

| Page | Strategy | Status | Reason |
|---|---|---|---|
| Home | SSR/ISR (60s) | [ ] | SEO, featured products |
| About | Static | [ ] | No dynamic data |
| Services | Static | [ ] | No dynamic data |
| Policy | Static | [ ] | No dynamic data |
| Shop | SSR/ISR (60s) | [ ] | SEO, product data |
| Product Detail | SSR/ISR (60s) | [ ] | SEO, product data |
| Contact | Static | [ ] | No dynamic data |
| Cart | CSR | [ ] | User-specific, interactive |
| Checkout | CSR | [ ] | Auth-required, interactive |
| Payment Callback | CSR | [ ] | Real-time payment status |
| Consultation | CSR | [ ] | Interactive booking flow |
| Account pages | CSR | [ ] | Auth-required, user-specific |
| Login/Register | CSR | [ ] | Interactive forms |

---

## 6. SEO & Metadata

- [ ] Every page: `<title>`, `<meta name="description">`, Open Graph tags
- [ ] Home: "DENISCO GLOBAL AGRICULTURE LTD | Farm to Fork Agriculture & Agro-Services"
- [ ] Product pages: dynamic title and description from product data
- [ ] Sitemap generation
- [ ] robots.txt

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

### Unit Tests
- [ ] Utility functions (Money formatter, date formatting)
- [ ] Zod schemas (product, order, booking validation)
- [ ] Auth token management

### E2E Tests (Playwright)
- [ ] Home page renders correctly
- [ ] Shop: filter by category, sort, view product
- [ ] Product detail: add to cart with quantity
- [ ] Cart: update qty, remove item, proceed to checkout
- [ ] Login and register flows
- [ ] Consultation: select type, date, time, submit booking
- [ ] Responsive: mobile nav, mobile account nav
