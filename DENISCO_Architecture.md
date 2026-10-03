# Customer Web Architecture

Next.js

TypeScript

TanStack Query

Tailwind CSS

Responsive

This document defines the architecture for the customer-facing DENISCO GLOBAL AGRICULTURE LTD website, including its product catalogue, e-commerce experience, customer accounts, checkout and consultation booking.

The website will be built with Next.js App Router and TypeScript, following the functional HTML/CSS/JavaScript prototype in the project root as the primary reference for UI design, features, interactions and workflows.

The web application is an independent project. It communicates directly with the Go backend over HTTPS and does not use a BFF, API proxy or shared generated TypeScript package.

Core architectural decisions

* Framework: Next.js App Router

* Language: TypeScript

* Data fetching and server state: TanStack Query

* Forms: React Hook Form

* Validation: Zod

* Styling: Tailwind CSS

* UI components: shadcn/ui

* Icons: Lucide

* API communication: Native `fetch` through a typed API client

* Authentication: JWT access token and refresh-token flow

* Payments: Paystack checkout

* Deployment: Docker, VPS (Namecheap) 

# 1. Project structure

The customer website is maintained in its own repository, separate from the backend, admin dashboard and root prototype.

```
denisco/
├── denisco_prototype.html
│
├── denisco_backend/
│
├── denisco_web/
│   ├── public/
│   │   ├── images/
│   │   ├── videos/
│   │   ├── icons/
│   │   └── fonts/
│   │
│   ├── src/
│   │   ├── app/
│   │   │   ├── (marketing)/
│   │   │   │   ├── page.tsx
│   │   │   │   ├── about/
│   │   │   │   ├── services/
│   │   │   │   ├── shop/
│   │   │   │   ├── consultations/
│   │   │   │   └── contact/
│   │   │   │
│   │   │   ├── (account)/
│   │   │   │   ├── login/
│   │   │   │   ├── register/
│   │   │   │   ├── forgot-password/
│   │   │   │   └── reset-password/
│   │   │   │
│   │   │   ├── (customer)/
│   │   │   │   └── account/
│   │   │   │       ├── page.tsx
│   │   │   │       ├── profile/
│   │   │   │       ├── orders/
│   │   │   │       ├── payments/
│   │   │   │       └── bookings/
│   │   │   │
│   │   │   ├── checkout/
│   │   │   ├── cart/
│   │   │   ├── payment/
│   │   │   │   └── callback/
│   │   │   ├── layout.tsx
│   │   │   ├── globals.css
│   │   │   ├── error.tsx
│   │   │   ├── not-found.tsx
│   │   │   └── loading.tsx
│   │   │
│   │   ├── components/
│   │   │   ├── ui/
│   │   │   ├── layout/
│   │   │   ├── navigation/
│   │   │   ├── products/
│   │   │   ├── cart/
│   │   │   ├── checkout/
│   │   │   ├── consultations/
│   │   │   └── forms/
│   │   │
│   │   ├── features/
│   │   │   ├── auth/
│   │   │   ├── users/
│   │   │   ├── products/
│   │   │   ├── categories/
│   │   │   ├── cart/
│   │   │   ├── orders/
│   │   │   ├── payments/
│   │   │   └── consultations/
│   │   │
│   │   ├── hooks/
│   │   ├── lib/
│   │   │   ├── api/
│   │   │   ├── auth/
│   │   │   ├── query/
│   │   │   ├── utils/
│   │   │   └── constants/
│   │   │
│   │   ├── providers/
│   │   ├── types/
│   │   └── middleware.ts
│   │
│   ├── tests/
│   ├── .github/
│   │   └── workflows/
│   ├── .env.example
│   ├── .gitignore
│   ├── components.json
│   ├── next.config.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
│
└── denisco_admin/
```

## 1.1 Directory responsibilities

| Directory                  | Responsibility                                                 |
| -------------------------- | -------------------------------------------------------------- |
| `app`                      | App Router pages, layouts, loading and error boundaries        |
| `components/ui`            | Reusable primitive UI components                               |
| `components/layout`        | Header, footer, page containers and layout components          |
| `components/products`      | Product cards, galleries, filters and product-related UI       |
| `components/cart`          | Cart items, summaries and quantity controls                    |
| `components/checkout`      | Checkout forms, order summaries and payment UI                 |
| `components/consultations` | Consultation selection, availability and booking UI            |
| `features`                 | Feature-specific components, hooks, schemas and API operations |
| `hooks`                    | Reusable client-side hooks                                     |
| `lib/api`                  | Typed API client and endpoint functions                        |
| `lib/auth`                 | Authentication utilities and token handling                    |
| `lib/query`                | TanStack Query configuration and query keys                    |
| `lib/utils`                | Formatting and other shared utilities                          |
| `providers`                | Application-level React providers                              |
| `types`                    | Frontend-owned TypeScript types                                |
| `tests`                    | Unit, integration and end-to-end tests                         |
| `public`                   | Static assets that are part of the frontend                    |

Keep feature-specific logic within its feature directory. Do not turn `components` or `lib` into a repository for unrelated business logic.

# 2. Architectural style

The frontend will use a feature-oriented architecture within the Next.js App Router.

Presentation layer

Next.js pages · Layouts · React components

Feature layer

Products · Cart · Checkout · Orders · Consultations · Auth

Data access layer

Typed API functions · TanStack Query · Authentication utilities

Go backend API

HTTPS · JSON · REST · `/api/v1`

### Architectural rules

1. Use Server Components by default and Client Components only where interactivity requires them.

2. Keep business logic out of page components.

3. Centralize API communication in typed API functions.

4. Use TanStack Query for client-side server state.

5. Use React Hook Form and Zod for complex forms.

6. Keep local UI state separate from server state.

7. Do not duplicate backend business rules as authoritative frontend validation.

8. Do not access MongoDB, Redis or payment secrets from the browser.

9. Do not introduce a BFF or proxy layer.

10. Keep the customer website independent of the admin frontend.

# 3. Technology stack

| Component     | Technology                              | Responsibility                               |
| ------------- | --------------------------------------- | -------------------------------------------- |
| Framework     | Next.js App Router                      | Routing, rendering and application structure |
| Language      | TypeScript                              | Static typing                                |
| Server state  | TanStack Query                          | Fetching, caching and mutations              |
| Forms         | React Hook Form                         | Form state and submission                    |
| Validation    | Zod                                     | Client-side schema validation                |
| Styling       | Tailwind CSS                            | Responsive design and utility styling        |
| UI components | shadcn/ui                               | Accessible reusable components               |
| Icons         | Lucide                                  | Consistent iconography                       |
| API client    | Native `fetch`                          | Backend communication                        |
| Notifications | Sonner or an equivalent toast component | User feedback                                |
| Testing       | Vitest and Playwright                   | Component and browser testing                |
| Deployment    | Docker, VPS (Namecheap)               | Hosting                                      |

Avoid introducing additional state-management libraries unless a concrete requirement justifies them. TanStack Query handles server state; React state and context are sufficient for most local interface state.

# 4. Prototype-driven implementation

The root `denisco_prototype.html` file is the canonical product and design reference.

It is a functional, responsive demonstration built with HTML, CSS and JavaScript, with demo data persisted in Local Storage. It does not connect to the production backend.

The Next.js implementation must reproduce the approved prototype's:

* Page structure and navigation.

* Colours, typography and visual hierarchy.

* Responsive layouts and breakpoints.

* Product cards and product detail views.

* Shopping cart interactions.

* Checkout and payment flow.

* Customer account screens.

* Consultation selection and booking experience.

* Loading, empty, error and success states.

* Relevant admin-independent customer workflows.

Implementation rule

Do not redesign or omit prototype functionality during implementation without an agreed scope change. Where the prototype uses simulated data or browser-only behaviour, replace it with the corresponding production API workflow while preserving the approved user experience.

The prototype governs the agreed product experience. The backend governs real authentication, pricing, payment status, inventory, booking availability and other authoritative state.

# 5. Application routes

The following routes define the initial customer website.

| Route                  | Page                   | Rendering                                   |
| ---------------------- | ---------------------- | ------------------------------------------- |
| `/`                    | Home                   | Static or dynamic server rendering          |
| `/about`               | About the company      | Static                                      |
| `/services`            | Agricultural services  | Static or dynamic                           |
| `/shop`                | Product catalogue      | Server-rendered with appropriate caching    |
| `/shop/[slug]`         | Product details        | Server-rendered                             |
| `/cart`                | Shopping cart          | Client-interactive                          |
| `/checkout`            | Checkout               | Client-interactive                          |
| `/payment/callback`    | Payment return         | Client-interactive with server verification |
| `/consultations`       | Consultation services  | Server-rendered                             |
| `/consultations/book`  | Booking workflow       | Client-interactive                          |
| `/contact`             | Contact page           | Static                                      |
| `/login`               | Customer login         | Client-interactive                          |
| `/register`            | Customer registration  | Client-interactive                          |
| `/forgot-password`     | Password-reset request | Client-interactive                          |
| `/reset-password`      | Password-reset form    | Client-interactive                          |
| `/account`             | Customer dashboard     | Authenticated                               |
| `/account/profile`     | Customer profile       | Authenticated                               |
| `/account/orders`      | Order history          | Authenticated                               |
| `/account/orders/[id]` | Order details          | Authenticated                               |
| `/account/payments`    | Payment history        | Authenticated                               |
| `/account/bookings`    | Consultation bookings  | Authenticated                               |

Route groups such as `(marketing)`, `(account)` and `(customer)` should be used to organize layouts without exposing the group names in URLs.

# 6. UI and design system

The website must follow the prototype's visual system rather than introduce a separate design language.

The exact production design tokens should be extracted from the approved prototype and documented centrally.

## 6.1 Design tokens

Centralize the following:

| Token group | Examples                                                                   |
| ----------- | -------------------------------------------------------------------------- |
| Colours     | Primary, secondary, accent, background, surface, text and semantic colours |
| Typography  | Font families, sizes, weights and line heights                             |
| Spacing     | Consistent spacing scale                                                   |
| Borders     | Border colours and widths                                                  |
| Radius      | Button, input, card and modal radius                                       |
| Shadows     | Card and overlay shadows                                                   |
| Breakpoints | Mobile, tablet and desktop                                                 |
| Transitions | Duration and easing                                                        |
| Layers      | Header, dropdown, modal and toast stacking                                 |

Use CSS variables as the design-token source and expose them to Tailwind where appropriate.

Example structure:

CSS

```
:root {
  --color-primary: /* prototype value */;
  --color-secondary: /* prototype value */;
  --color-accent: /* prototype value */;

  --color-background: /* prototype value */;
  --color-surface: /* prototype value */;
  --color-text: /* prototype value */;
  --color-muted: /* prototype value */;

  --radius-card: /* prototype value */;
  --radius-button: /* prototype value */;

  --font-heading: /* prototype font */;
  --font-body: /* prototype font */;
}
```

Replace the placeholders with the actual values from the prototype rather than guessing new brand colours.

## 6.2 Reusable components

Build shared components for repeated interface patterns:

* `Button`

* `Input`

* `Textarea`

* `Select`

* `Dialog`

* `DropdownMenu`

* `Badge`

* `Card`

* `Skeleton`

* `EmptyState`

* `ErrorState`

* `Pagination`

* `ConfirmDialog`

* `PageHeader`

* `SectionHeading`

* `LoadingButton`

Feature components should compose these primitives instead of implementing their own inconsistent versions.

## 6.3 Responsive design

Support the mobile, tablet and desktop layouts demonstrated by the prototype.

Requirements:

* Mobile-first CSS.

* Responsive navigation.

* Touch-friendly interactive controls.

* Responsive product grids.

* Readable forms and checkout layouts on small screens.

* No horizontal overflow at supported viewport sizes.

* Appropriate image aspect ratios and cropping.

* Responsive account navigation.

* Keyboard-accessible interactions.

Responsive behaviour should be tested against representative viewport sizes, including narrow mobile screens.

# 7. Rendering strategy

Next.js Server Components should be the default.

| Page or feature | Recommended rendering                                 | Reason                                 |
| --------------- | ----------------------------------------------------- | -------------------------------------- |
| Home            | Server-rendered                                       | SEO and fast initial rendering         |
| About           | Static                                                | Mostly stable content                  |
| Services        | Static or server-rendered                             | Public content                         |
| Shop            | Server-rendered                                       | Product SEO and initial data           |
| Product details | Server-rendered                                       | Search indexing and metadata           |
| Cart            | Client-interactive                                    | Frequent local interactions            |
| Checkout        | Client-interactive                                    | Forms and payment workflow             |
| Login/register  | Client-interactive                                    | Form handling                          |
| Account         | Authenticated server/client composition               | Protected customer data                |
| Orders          | Authenticated                                         | Customer-specific data                 |
| Consultations   | Server-rendered availability with client interactions | Public content and booking interaction |

Do not make every route a Client Component. Keep static and SEO-sensitive content server-rendered, and introduce client boundaries only where needed.

For protected pages, authentication must be verified by the backend. Hiding a page in the frontend is not an authorization control.

# 8. API architecture

The frontend communicates directly with the Go backend using HTTPS and JSON.

Next.js customer website

Pages · Features · Hooks

Typed API client

Fetch · Authentication · Error handling

Go REST API

`/api/v1`

The production API base URL should be configured using a public frontend environment variable, for example:

dotenv

```
NEXT_PUBLIC_API_BASE_URL=https://api.denisco.example/api/v1
```

Use the actual production API domain during deployment.

## 8.1 Typed API client

All API requests should go through a central client. Feature-specific API functions should use it rather than calling `fetch` independently throughout the application.

Example:

TypeScript

```
// src/lib/api/client.ts

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL;

export class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public code?: string,
    public details?: unknown,
  ) {
    super(message);
    this.name = "ApiError";
  }
}

export async function apiRequest<T>(
  path: string,
  init: RequestInit = {},
): Promise<T> {
  if (!API_BASE_URL) {
    throw new Error("API URL is not configured");
  }

  const response = await fetch(
    `${API_BASE_URL}${path}`,
    {
      ...init,
      headers: {
        Accept: "application/json",
        ...init.headers,
      },
    },
  );

  const body = await response.json();

  if (!response.ok || body.success === false) {
    throw new ApiError(
      body.message ?? "Request failed",
      response.status,
      body.error?.code,
      body.error?.details,
    );
  }

  return body;
}
```

This is a starting point. The production client should also handle request cancellation, non-JSON responses, multipart requests, refresh-token coordination and the agreed response envelope.

Do not automatically retry mutations such as checkout or booking creation unless the operation has an idempotency strategy.

## 8.2 Feature API functions

Organize API operations by feature.

```
src/
└── features/
    ├── products/
    │   ├── api/
    │   │   ├── get-products.ts
    │   │   └── get-product.ts
    │   ├── hooks/
    │   │   ├── use-products.ts
    │   │   └── use-product.ts
    │   └── types.ts
    │
    ├── cart/
    │   ├── api/
    │   ├── hooks/
    │   └── types.ts
    │
    ├── orders/
    │   ├── api/
    │   ├── hooks/
    │   └── types.ts
    │
    └── consultations/
        ├── api/
        ├── hooks/
        └── types.ts
```

Example:

TypeScript

```
// src/features/products/api/get-products.ts

import { apiRequest } from "@/lib/api/client";
import type { ProductListResponse } from "../types";

export function getProducts(params?: {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
}) {
  const query = new URLSearchParams();

  if (params?.page) {
    query.set("page", String(params.page));
  }

  if (params?.limit) {
    query.set("limit", String(params.limit));
  }

  if (params?.category) {
    query.set("category", params.category);
  }

  if (params?.search) {
    query.set("search", params.search);
  }

  return apiRequest<ProductListResponse>(
    `/products?${query.toString()}`,
  );
}
```

Types must be maintained within the customer website repository. They should reflect the documented backend contract, without importing types from the admin or backend repositories.

# 9. Data fetching and state management

Use TanStack Query for server state and React's built-in state mechanisms for local interface state.

## 9.1 State ownership

| State                         | Recommended owner                                  |
| ----------------------------- | -------------------------------------------------- |
| Product catalogue             | TanStack Query                                     |
| Product details               | TanStack Query                                     |
| Categories                    | TanStack Query                                     |
| Customer profile              | TanStack Query                                     |
| Order history                 | TanStack Query                                     |
| Payment history               | TanStack Query                                     |
| Consultation availability     | TanStack Query                                     |
| Consultation bookings         | TanStack Query                                     |
| Cart quantities               | Backend cart, with temporary optimistic UI         |
| Modal visibility              | React state                                        |
| Dropdown visibility           | Component state                                    |
| Form inputs                   | React Hook Form                                    |
| Temporary checkout selections | React state                                        |
| Authentication status         | Authentication provider, synchronized with backend |
| URL filters and pagination    | Search parameters                                  |

Avoid storing complete copies of server responses in React Context. That creates unnecessary synchronization problems.

## 9.2 Query configuration

Use a central `QueryClient` configuration.

TypeScript

```
// src/lib/query/query-client.ts

import { QueryClient } from "@tanstack/react-query";

export function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 30_000,
        refetchOnWindowFocus: true,
        retry: 1,
      },
      mutations: {
        retry: 0,
      },
    },
  });
}
```

Adjust caching and retry policies per feature. For example, public product data can tolerate a longer stale time than consultation availability.

## 9.3 Query keys

Use consistent query keys to make invalidation predictable.

TypeScript

```
export const queryKeys = {
  products: {
    all: ["products"] as const,
    lists: () => ["products", "list"] as const,
    list: (params: object) =>
      ["products", "list", params] as const,
    detail: (slug: string) =>
      ["products", "detail", slug] as const,
  },

  cart: {
    current: ["cart", "current"] as const,
  },

  orders: {
    all: ["orders"] as const,
    list: (params: object) =>
      ["orders", "list", params] as const,
    detail: (id: string) =>
      ["orders", "detail", id] as const,
  },

  consultations: {
    availability: (params: object) =>
      ["consultations", "availability", params] as const,
    bookings: ["consultations", "bookings"] as const,
  },
};
```

After a successful cart mutation, invalidate or update the relevant cart query. After a successful order creation, update the order and cart state accordingly.

Optimistic updates should only be used where rollback is reliable and the operation is safe to represent optimistically.

# 10. Authentication architecture

The customer website will use the backend's JWT authentication flow.

## 10.1 Authentication lifecycle

Diagram options

![](data\:image/svg+xml;utf8,%3Csvg%20id%3D%22mermaid-_r_1de_%22%20width%3D%22871.57421875%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22flowchart%22%20height%3D%221299.800048828125%22%20viewBox%3D%224%204%20871.57421875%201299.800048828125%22%20role%3D%22graphics-document%20document%22%20aria-roledescription%3D%22flowchart-v2%22%3E%3Cstyle%3E%23mermaid-_r_1de_%7Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bfont-size%3A14px%3Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%40keyframes%20edge-animation-frame%7Bfrom%7Bstroke-dashoffset%3A0%3B%7D%7D%40keyframes%20dash%7Bto%7Bstroke-dashoffset%3A0%3B%7D%7D%23mermaid-_r_1de_%20.edge-animation-slow%7Bstroke-dasharray%3A9%2C5!important%3Bstroke-dashoffset%3A900%3Banimation%3Adash%2050s%20linear%20infinite%3Bstroke-linecap%3Around%3B%7D%23mermaid-_r_1de_%20.edge-animation-fast%7Bstroke-dasharray%3A9%2C5!important%3Bstroke-dashoffset%3A900%3Banimation%3Adash%2020s%20linear%20infinite%3Bstroke-linecap%3Around%3B%7D%23mermaid-_r_1de_%20.error-icon%7Bfill%3Argb\(249%2C%20249%2C%20249\)%3B%7D%23mermaid-_r_1de_%20.error-text%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3Bstroke%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20.edge-thickness-normal%7Bstroke-width%3A1px%3B%7D%23mermaid-_r_1de_%20.edge-thickness-thick%7Bstroke-width%3A3.5px%3B%7D%23mermaid-_r_1de_%20.edge-pattern-solid%7Bstroke-dasharray%3A0%3B%7D%23mermaid-_r_1de_%20.edge-thickness-invisible%7Bstroke-width%3A0%3Bfill%3Anone%3B%7D%23mermaid-_r_1de_%20.edge-pattern-dashed%7Bstroke-dasharray%3A3%3B%7D%23mermaid-_r_1de_%20.edge-pattern-dotted%7Bstroke-dasharray%3A2%3B%7D%23mermaid-_r_1de_%20.marker%7Bfill%3Argb\(93%2C%2093%2C%2093\)%3Bstroke%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1de_%20.marker.cross%7Bstroke%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1de_%20svg%7Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bfont-size%3A14px%3B%7D%23mermaid-_r_1de_%20p%7Bmargin%3A0%3B%7D%23mermaid-_r_1de_%20.label%7Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20.cluster-label%20text%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20.cluster-label%20span%7Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20.cluster-label%20span%20p%7Bbackground-color%3Atransparent%3B%7D%23mermaid-_r_1de_%20.label%20text%2C%23mermaid-_r_1de_%20span%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20.node%20rect%2C%23mermaid-_r_1de_%20.node%20circle%2C%23mermaid-_r_1de_%20.node%20ellipse%2C%23mermaid-_r_1de_%20.node%20polygon%2C%23mermaid-_r_1de_%20.node%20path%7Bfill%3Argb\(222%2C%20234%2C%20251\)%3Bstroke%3Argb\(83%2C%20154%2C%20248\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1de_%20.rough-node%20.label%20text%2C%23mermaid-_r_1de_%20.node%20.label%20text%2C%23mermaid-_r_1de_%20.image-shape%20.label%2C%23mermaid-_r_1de_%20.icon-shape%20.label%7Btext-anchor%3Amiddle%3B%7D%23mermaid-_r_1de_%20.node%20.katex%20path%7Bfill%3A%23000%3Bstroke%3A%23000%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1de_%20.rough-node%20.label%2C%23mermaid-_r_1de_%20.node%20.label%2C%23mermaid-_r_1de_%20.image-shape%20.label%2C%23mermaid-_r_1de_%20.icon-shape%20.label%7Btext-align%3Acenter%3B%7D%23mermaid-_r_1de_%20.node.clickable%7Bcursor%3Apointer%3B%7D%23mermaid-_r_1de_%20.root%20.anchor%20path%7Bfill%3Argb\(93%2C%2093%2C%2093\)!important%3Bstroke-width%3A0%3Bstroke%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1de_%20.arrowheadPath%7Bfill%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1de_%20.edgePath%20.path%7Bstroke%3Argb\(93%2C%2093%2C%2093\)%3Bstroke-width%3A2.0px%3B%7D%23mermaid-_r_1de_%20.flowchart-link%7Bstroke%3Argb\(93%2C%2093%2C%2093\)%3Bfill%3Anone%3B%7D%23mermaid-_r_1de_%20.edgeLabel%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Btext-align%3Acenter%3B%7D%23mermaid-_r_1de_%20.edgeLabel%20p%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3B%7D%23mermaid-_r_1de_%20.edgeLabel%20rect%7Bopacity%3A0.5%3Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Bfill%3Argb\(252%2C%20252%2C%20252\)%3B%7D%23mermaid-_r_1de_%20.labelBkg%7Bbackground-color%3Argba\(252%2C%20252%2C%20252%2C%200.5\)%3B%7D%23mermaid-_r_1de_%20.cluster%20rect%7Bfill%3Argb\(249%2C%20249%2C%20249\)%3Bstroke%3Argba\(0%2C%200%2C%200%2C%200.05\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1de_%20.cluster%20text%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20.cluster%20span%7Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20div.mermaidTooltip%7Bposition%3Aabsolute%3Btext-align%3Acenter%3Bmax-width%3A200px%3Bpadding%3A2px%3Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bfont-size%3A12px%3Bbackground%3Argb\(249%2C%20249%2C%20249\)%3Bborder%3A1px%20solid%20rgba\(0%2C%200%2C%200%2C%200.05\)%3Bborder-radius%3A2px%3Bpointer-events%3Anone%3Bz-index%3A100%3B%7D%23mermaid-_r_1de_%20.flowchartTitleText%7Btext-anchor%3Amiddle%3Bfont-size%3A18px%3Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1de_%20rect.text%7Bfill%3Anone%3Bstroke-width%3A0%3B%7D%23mermaid-_r_1de_%20.icon-shape%2C%23mermaid-_r_1de_%20.image-shape%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Btext-align%3Acenter%3B%7D%23mermaid-_r_1de_%20.icon-shape%20p%2C%23mermaid-_r_1de_%20.image-shape%20p%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Bpadding%3A2px%3B%7D%23mermaid-_r_1de_%20.icon-shape%20rect%2C%23mermaid-_r_1de_%20.image-shape%20rect%7Bopacity%3A0.5%3Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Bfill%3Argb\(252%2C%20252%2C%20252\)%3B%7D%23mermaid-_r_1de_%20.label-icon%7Bdisplay%3Ainline-block%3Bheight%3A1em%3Boverflow%3Avisible%3Bvertical-align%3A-0.125em%3B%7D%23mermaid-_r_1de_%20.node%20.label-icon%20path%7Bfill%3AcurrentColor%3Bstroke%3Arevert%3Bstroke-width%3Arevert%3B%7D%23mermaid-_r_1de_%20.node%20text%7Bfont-size%3A16px%3Bfont-weight%3A600%3Bletter-spacing%3A-0.32px%3Bfill%3A%23004f99%3B%7D%23mermaid-_r_1de_%20.edgeLabels%20text%7Bfont-size%3A13px%3Bfont-weight%3A600%3Bletter-spacing%3A-0.08px%3Bfill%3A%23004f99%3B%7D%23mermaid-_r_1de_%20.node%20tspan%5Bfont-weight%3D%22normal%22%5D%2C%23mermaid-_r_1de_%20.edgeLabels%20tspan%5Bfont-weight%3D%22normal%22%5D%7Bfont-weight%3A600%3B%7D%23mermaid-_r_1de_%20.edgeLabel%20.label%20rect%7Bopacity%3A1%3Brx%3A13px%3Bry%3A13px%3Bfill%3A%23f5faff%3Bstroke%3Argb\(206%2C%20219%2C%20229\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1de_%20.node%20rect%2C%23mermaid-_r_1de_%20.node%20circle%2C%23mermaid-_r_1de_%20.node%20ellipse%2C%23mermaid-_r_1de_%20.node%20polygon%2C%23mermaid-_r_1de_%20.node%20path%7Bfill%3Argb\(229%2C%20243%2C%20255\)%3Bstroke%3Argba\(0%2C%200%2C%200%2C%200.1\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1de_%20.node%20rect%7Brx%3A16px%3Bry%3A16px%3B%7D%23mermaid-_r_1de_%20.node.mermaid-decision%20.label-container%7Bfill%3A%23f5faff%3Bstroke%3Argb\(206%2C%20219%2C%20229\)%3Bstroke-dasharray%3A2%202%3B%7D%23mermaid-_r_1de_%20.edgePaths%20.flowchart-link%7Bstroke%3Argb\(206%2C%20219%2C%20229\)%3Bstroke-width%3A1px%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D%23mermaid-_r_1de_%20.marker%7Bfill%3Argb\(206%2C%20219%2C%20229\)%3Bstroke%3Argb\(206%2C%20219%2C%20229\)%3B%7D%23mermaid-_r_1de_%20.node%7Bcolor-scheme%3Alight%3B%7D%23mermaid-_r_1de_%20%3Aroot%7B--mermaid-font-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3B%7D%3C%2Fstyle%3E%3Cg%3E%3Cmarker%20id%3D%22mermaid-_r_1de__flowchart-v2-pointEnd%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%22-5%20-5%2010%2010%22%20refX%3D%220%22%20refY%3D%220%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2210%22%20markerHeight%3D%2210%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%200%200%20L%204%200%20M%200.8180194846605362%20-3.181980515339464%20L%204%200%20L%200.8180194846605362%203.181980515339464%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%20none%3B%20fill%3A%20none%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1de__flowchart-v2-pointStart%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%22-5%20-5%2010%2010%22%20refX%3D%220%22%20refY%3D%220%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2210%22%20markerHeight%3D%2210%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%200%200%20L%20-4%200%20M%20-0.8180194846605362%20-3.181980515339464%20L%20-4%200%20L%20-0.8180194846605362%203.181980515339464%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%20none%3B%20fill%3A%20none%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1de__flowchart-v2-circleEnd%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%220%200%2010%2010%22%20refX%3D%2211%22%20refY%3D%225%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%225%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fcircle%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1de__flowchart-v2-circleStart%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%220%200%2010%2010%22%20refX%3D%22-1%22%20refY%3D%225%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%225%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fcircle%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1de__flowchart-v2-crossEnd%22%20class%3D%22marker%20cross%20flowchart-v2%22%20viewBox%3D%220%200%2011%2011%22%20refX%3D%2212%22%20refY%3D%225.2%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%201%2C1%20l%209%2C9%20M%2010%2C1%20l%20-9%2C9%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%202%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1de__flowchart-v2-crossStart%22%20class%3D%22marker%20cross%20flowchart-v2%22%20viewBox%3D%220%200%2011%2011%22%20refX%3D%22-1%22%20refY%3D%225.2%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%201%2C1%20l%209%2C9%20M%2010%2C1%20l%20-9%2C9%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%202%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3C%2Fg%3E%3Cg%20class%3D%22subgraphs%22%3E%3C%2Fg%3E%3Cg%20class%3D%22nodes%22%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-A-0%22%20transform%3D%22translate\(665.4388020833333%2C%2042\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-122.5546875%22%20y%3D%22-30%22%20width%3D%22245.109375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ECustomer%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20submits%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20login%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-B-1%22%20transform%3D%22translate\(665.4388020833333%2C%20146.29999923706055\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-102.078125%22%20y%3D%22-34.29999923706055%22%20width%3D%22204.15625%22%20height%3D%2268.5999984741211%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-18.299999237060547\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EBackend%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20validates%3C%2Ftspan%3E%3C%2Ftspan%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%221em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3Ecredentials%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%20%20mermaid-decision%22%20id%3D%22flowchart-C-3%22%20transform%3D%22translate\(665.4388020833333%2C%20250.5999984741211\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-100.55859375%22%20y%3D%22-30%22%20width%3D%22201.1171875%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ECredentials%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20valid%3F%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-D-5%22%20transform%3D%22translate\(436.9510396321614%2C%20416.5999984741211\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-102.18698120117188%22%20y%3D%22-30%22%20width%3D%22204.37396240234375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EDisplay%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20login%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20error%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-E-7%22%20transform%3D%22translate\(698.9583333333333%2C%20420.89999771118164\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-119.8203125%22%20y%3D%22-34.29999923706055%22%20width%3D%22239.640625%22%20height%3D%2268.5999984741211%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-18.299999237060547\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EBackend%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20issues%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20access%3C%2Ftspan%3E%3C%2Ftspan%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%221em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EJWT%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20and%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20refresh%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20token%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-F-9%22%20transform%3D%22translate\(456.70703124999994%2C%20529.4999961853027\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-113.515625%22%20y%3D%22-34.29999923706055%22%20width%3D%22227.03125%22%20height%3D%2268.5999984741211%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-18.299999237060547\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EStore%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20access%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20token%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20in%3C%2Ftspan%3E%3C%2Ftspan%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%221em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3Ememory%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-G-11%22%20transform%3D%22translate\(738.8984375%2C%20525.1999969482422\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-128.67578125%22%20y%3D%22-30%22%20width%3D%22257.3515625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ESet%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20secure%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20refresh%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20cookie%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-H-13%22%20transform%3D%22translate\(456.70703124999994%2C%20633.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-135.71484375%22%20y%3D%22-30%22%20width%3D%22271.4296875%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EAuthenticated%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20API%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20requests%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%20%20mermaid-decision%22%20id%3D%22flowchart-I-15%22%20transform%3D%22translate\(329.99088541666663%2C%20733.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-107.4296875%22%20y%3D%22-30%22%20width%3D%22214.859375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EAccess%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20token%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20valid%3F%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-J-17%22%20transform%3D%22translate\(110.828125%2C%20899.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-98.828125%22%20y%3D%22-30%22%20width%3D%22197.65625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EContinue%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20request%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-K-19%22%20transform%3D%22translate\(365.80078124999994%2C%20899.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-116.14453125%22%20y%3D%22-30%22%20width%3D%22232.2890625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EAttempt%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20token%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20refresh%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%20%20mermaid-decision%22%20id%3D%22flowchart-L-21%22%20transform%3D%22translate\(365.80078124999994%2C%20999.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-109.3046875%22%20y%3D%22-30%22%20width%3D%22218.609375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ERefresh%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20successful%3F%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-M-23%22%20transform%3D%22translate\(464.49739583333326%2C%201165.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-112.34375%22%20y%3D%22-30%22%20width%3D%22224.6875%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EUpdate%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20access%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20token%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-N-27%22%20transform%3D%22translate\(182.29817708333326%2C%201165.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-129.85546875%22%20y%3D%22-30%22%20width%3D%22259.7109375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EClear%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20authentication%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20state%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-O-29%22%20transform%3D%22translate\(182.29817708333326%2C%201265.7999954223633\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-95.32421875%22%20y%3D%22-30%22%20width%3D%22190.6484375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ERedirect%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20to%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20login%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edges%20edgePaths%22%3E%3Cpath%20d%3D%22M665.4388020833333%2C72L665.4388020833333%2C100%22%20id%3D%22L_A_B_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_A_B_0%22%20data-points%3D%22W3sieCI6NjY1LjQzODgwMjA4MzMzMzMsInkiOjcyfSx7IngiOjY2NS40Mzg4MDIwODMzMzMzLCJ5IjoxMDR9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M665.4388020833333%2C180.5999984741211L665.4388020833333%2C208.5999984741211%22%20id%3D%22L_B_C_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_B_C_0%22%20data-points%3D%22W3sieCI6NjY1LjQzODgwMjA4MzMzMzMsInkiOjE4MC41OTk5OTg0NzQxMjExfSx7IngiOjY2NS40Mzg4MDIwODMzMzMzLCJ5IjoyMTIuNTk5OTk4NDc0MTIxMX1d%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M631.9192708333333%2C280.5999984741211L631.9192708333333%2C293.81704244882644Q631.9192708333333%2C295.5999984741211%20630.8334843957064%2C297.0142120364942L630.8334843957064%2C297.0142120364942Q629.7476979580795%2C298.4284255988673%20628.3334843957064%2C299.5142120364942L628.3334843957064%2C299.5142120364942Q626.9192708333333%2C300.5999984741211%20625.1363148080386%2C300.5999984741211L443.73399565745603%2C300.5999984741211Q441.9510396321614%2C300.5999984741211%20440.5368260697883%2C301.685784911748L440.5368260697883%2C301.685784911748Q439.12261250741517%2C302.7715713493749%20438.0368260697883%2C304.185784911748L438.0368260697883%2C304.185784911748Q436.9510396321614%2C305.5999984741211%20436.9510396321614%2C307.38295449941575L436.9510396321614%2C374.5999984741211%22%20id%3D%22L_C_D_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_C_D_0%22%20data-points%3D%22W3sieCI6NjMxLjkxOTI3MDgzMzMzMzMsInkiOjI4MC41OTk5OTg0NzQxMjExfSx7IngiOjYzMS45MTkyNzA4MzMzMzMzLCJ5IjozMDAuNTk5OTk4NDc0MTIxMX0seyJ4Ijo0MzYuOTUxMDM5NjMyMTYxNCwieSI6MzAwLjU5OTk5ODQ3NDEyMTF9LHsieCI6NDM2Ljk1MTAzOTYzMjE2MTQsInkiOjM3OC41OTk5OTg0NzQxMjExfV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M698.9583333333333%2C280.5999984741211L698.9583333333333%2C374.5999984741211%22%20id%3D%22L_C_E_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_C_E_0%22%20data-points%3D%22W3sieCI6Njk4Ljk1ODMzMzMzMzMzMzMsInkiOjI4MC41OTk5OTg0NzQxMjExfSx7IngiOjY5OC45NTgzMzMzMzMzMzMzLCJ5IjozNzguNTk5OTk4NDc0MTIxMX1d%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M659.0182291666667%2C455.1999969482422L659.0182291666666%2C468.1289291363767Q659.0182291666666%2C475.1999969482422%20651.9471613548011%2C475.1999969482422L463.4899872752946%2C475.1999969482422Q461.70703124999994%2C475.1999969482422%20460.29281768762684%2C476.2857833858691L460.29281768762684%2C476.2857833858691Q458.87860412525373%2C477.371569823496%20457.79281768762684%2C478.7857833858691L457.79281768762684%2C478.7857833858691Q456.70703124999994%2C480.1999969482422%20456.70703124999994%2C481.98295297353684L456.70703124999994%2C485.1999969482422%22%20id%3D%22L_E_F_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_E_F_0%22%20data-points%3D%22W3sieCI6NjU5LjAxODIyOTE2NjY2NjcsInkiOjQ1NS4xOTk5OTY5NDgyNDIyfSx7IngiOjY1OS4wMTgyMjkxNjY2NjY2LCJ5Ijo0NzUuMTk5OTk2OTQ4MjQyMn0seyJ4Ijo0NTYuNzA3MDMxMjQ5OTk5OTQsInkiOjQ3NS4xOTk5OTY5NDgyNDIyfSx7IngiOjQ1Ni43MDcwMzEyNDk5OTk5NCwieSI6NDg5LjE5OTk5Njk0ODI0MjJ9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M738.8984374999999%2C455.1999969482422L738.8984375%2C483.1999969482422%22%20id%3D%22L_E_G_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_E_G_0%22%20data-points%3D%22W3sieCI6NzM4Ljg5ODQzNzQ5OTk5OTksInkiOjQ1NS4xOTk5OTY5NDgyNDIyfSx7IngiOjczOC44OTg0Mzc1LCJ5Ijo0ODcuMTk5OTk2OTQ4MjQyMn1d%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M456.70703124999994%2C563.7999954223633L456.70703124999994%2C591.7999954223633%22%20id%3D%22L_F_H_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_F_H_0%22%20data-points%3D%22W3sieCI6NDU2LjcwNzAzMTI0OTk5OTk0LCJ5Ijo1NjMuNzk5OTk1NDIyMzYzM30seyJ4Ijo0NTYuNzA3MDMxMjQ5OTk5OTQsInkiOjU5NS43OTk5OTU0MjIzNjMzfV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M411.46875%2C663.7999954223633L411.46874999999994%2C676.7289276104977Q411.46874999999994%2C683.7999954223633%20404.39768218813447%2C683.7999954223633L336.7738414419613%2C683.7999954223633Q334.99088541666663%2C683.7999954223633%20333.5766718542935%2C684.8857818599902L333.5766718542935%2C684.8857818599902Q332.1624582919204%2C685.9715682976171%20331.0766718542935%2C687.3857818599902L331.0766718542935%2C687.3857818599902Q329.99088541666663%2C688.7999954223633%20329.99088541666663%2C690.5829514476579L329.99088541666663%2C693.7999954223633%22%20id%3D%22L_H_I_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_H_I_0%22%20data-points%3D%22W3sieCI6NDExLjQ2ODc1LCJ5Ijo2NjMuNzk5OTk1NDIyMzYzM30seyJ4Ijo0MTEuNDY4NzQ5OTk5OTk5OTQsInkiOjY4My43OTk5OTU0MjIzNjMzfSx7IngiOjMyOS45OTA4ODU0MTY2NjY2MywieSI6NjgzLjc5OTk5NTQyMjM2MzN9LHsieCI6MzI5Ljk5MDg4NTQxNjY2NjYzLCJ5Ijo2OTcuNzk5OTk1NDIyMzYzM31d%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M294.18098958333326%2C763.7999954223633L294.18098958333326%2C777.0170393970686Q294.18098958333326%2C778.7999954223633%20293.09520314570636%2C780.2142089847364L293.09520314570636%2C780.2142089847364Q292.00941670807947%2C781.6284225471095%20290.59520314570636%2C782.7142089847364L290.59520314570636%2C782.7142089847364Q289.18098958333326%2C783.7999954223633%20287.3980335580386%2C783.7999954223633L117.61108102529465%2C783.7999954223633Q115.828125%2C783.7999954223633%20114.41391143762691%2C784.8857818599902L114.41391143762691%2C784.8857818599902Q112.99969787525382%2C785.9715682976171%20111.91391143762692%2C787.3857818599902L111.91391143762691%2C787.3857818599902Q110.828125%2C788.7999954223633%20110.828125%2C790.5829514476579L110.828125%2C857.7999954223633%22%20id%3D%22L_I_J_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_I_J_0%22%20data-points%3D%22W3sieCI6Mjk0LjE4MDk4OTU4MzMzMzI2LCJ5Ijo3NjMuNzk5OTk1NDIyMzYzM30seyJ4IjoyOTQuMTgwOTg5NTgzMzMzMjYsInkiOjc4My43OTk5OTU0MjIzNjMzfSx7IngiOjExMC44MjgxMjUsInkiOjc4My43OTk5OTU0MjIzNjMzfSx7IngiOjExMC44MjgxMjUsInkiOjg2MS43OTk5OTU0MjIzNjMzfV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M365.80078124999994%2C763.7999954223633L365.80078124999994%2C857.7999954223633%22%20id%3D%22L_I_K_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_I_K_0%22%20data-points%3D%22W3sieCI6MzY1LjgwMDc4MTI0OTk5OTk0LCJ5Ijo3NjMuNzk5OTk1NDIyMzYzM30seyJ4IjozNjUuODAwNzgxMjQ5OTk5OTQsInkiOjg2MS43OTk5OTU0MjIzNjMzfV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M365.80078124999994%2C929.7999954223633L365.80078124999994%2C957.7999954223633%22%20id%3D%22L_K_L_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_K_L_0%22%20data-points%3D%22W3sieCI6MzY1LjgwMDc4MTI0OTk5OTk0LCJ5Ijo5MjkuNzk5OTk1NDIyMzYzM30seyJ4IjozNjUuODAwNzgxMjQ5OTk5OTQsInkiOjk2MS43OTk5OTU0MjIzNjMzfV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M402.23567708333326%2C1029.7999954223633L402.23567708333326%2C1109.0170393970686Q402.23567708333326%2C1110.7999954223633%20403.32146352096015%2C1112.2142089847364L403.32146352096015%2C1112.2142089847364Q404.40724995858704%2C1113.6284225471095%20405.82146352096015%2C1114.7142089847364L405.82146352096015%2C1114.7142089847364Q407.23567708333326%2C1115.7999954223633%20409.0186331086279%2C1115.7999954223633L420.266523141372%2C1115.7999954223633Q422.04947916666663%2C1115.7999954223633%20423.46369272903974%2C1116.8857818599902L423.46369272903974%2C1116.8857818599902Q424.87790629141284%2C1117.971568297617%20425.96369272903974%2C1119.3857818599902L425.96369272903974%2C1119.3857818599902Q427.04947916666663%2C1120.7999954223633%20427.04947916666663%2C1122.582951447658L427.04947916666663%2C1125.7999954223633%22%20id%3D%22L_L_M_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_L_M_0%22%20data-points%3D%22W3sieCI6NDAyLjIzNTY3NzA4MzMzMzI2LCJ5IjoxMDI5Ljc5OTk5NTQyMjM2MzN9LHsieCI6NDAyLjIzNTY3NzA4MzMzMzI2LCJ5IjoxMTE1Ljc5OTk5NTQyMjM2MzN9LHsieCI6NDI3LjA0OTQ3OTE2NjY2NjYzLCJ5IjoxMTE1Ljc5OTk5NTQyMjM2MzN9LHsieCI6NDI3LjA0OTQ3OTE2NjY2NjYzLCJ5IjoxMTI5Ljc5OTk5NTQyMjM2MzN9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M501.9453124999999%2C1135.7999954223633L501.94531249999994%2C1082.7999954223633L501.94531249999994%2C999.7999954223633L501.94531249999994%2C899.7999954223633L501.94531249999994%2C816.7999954223633L501.94531249999994%2C733.7999954223633L501.94531249999994%2C675.7999954223633%22%20id%3D%22L_M_H_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_M_H_0%22%20data-points%3D%22W3sieCI6NTAxLjk0NTMxMjQ5OTk5OTksInkiOjExMzUuNzk5OTk1NDIyMzYzM30seyJ4Ijo1MDEuOTQ1MzEyNDk5OTk5OTQsInkiOjEwODIuNzk5OTk1NDIyMzYzM30seyJ4Ijo1MDEuOTQ1MzEyNDk5OTk5OTQsInkiOjk5OS43OTk5OTU0MjIzNjMzfSx7IngiOjUwMS45NDUzMTI0OTk5OTk5NCwieSI6ODk5Ljc5OTk5NTQyMjM2MzN9LHsieCI6NTAxLjk0NTMxMjQ5OTk5OTk0LCJ5Ijo4MTYuNzk5OTk1NDIyMzYzM30seyJ4Ijo1MDEuOTQ1MzEyNDk5OTk5OTQsInkiOjczMy43OTk5OTU0MjIzNjMzfSx7IngiOjUwMS45NDUzMTI0OTk5OTk5NCwieSI6NjcxLjc5OTk5NTQyMjM2MzN9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M329.36588541666663%2C1029.7999954223633L329.36588541666663%2C1043.0170393970686Q329.36588541666663%2C1044.7999954223633%20328.28009897903974%2C1046.2142089847364L328.28009897903974%2C1046.2142089847364Q327.19431254141284%2C1047.6284225471095%20325.78009897903974%2C1048.7142089847364L325.78009897903974%2C1048.7142089847364Q324.36588541666663%2C1049.7999954223633%20322.582929391372%2C1049.7999954223633L189.0811331086279%2C1049.7999954223633Q187.29817708333326%2C1049.7999954223633%20185.88396352096015%2C1050.8857818599902L185.88396352096015%2C1050.8857818599902Q184.46974995858707%2C1051.971568297617%20183.38396352096018%2C1053.3857818599902L183.38396352096015%2C1053.3857818599902Q182.29817708333326%2C1054.7999954223633%20182.29817708333326%2C1056.582951447658L182.29817708333326%2C1123.7999954223633%22%20id%3D%22L_L_N_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_L_N_0%22%20data-points%3D%22W3sieCI6MzI5LjM2NTg4NTQxNjY2NjYzLCJ5IjoxMDI5Ljc5OTk5NTQyMjM2MzN9LHsieCI6MzI5LjM2NTg4NTQxNjY2NjYzLCJ5IjoxMDQ5Ljc5OTk5NTQyMjM2MzN9LHsieCI6MTgyLjI5ODE3NzA4MzMzMzI2LCJ5IjoxMDQ5Ljc5OTk5NTQyMjM2MzN9LHsieCI6MTgyLjI5ODE3NzA4MzMzMzI2LCJ5IjoxMTI3Ljc5OTk5NTQyMjM2MzN9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M182.29817708333326%2C1195.7999954223633L182.29817708333326%2C1223.7999954223633%22%20id%3D%22L_N_O_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_N_O_0%22%20data-points%3D%22W3sieCI6MTgyLjI5ODE3NzA4MzMzMzI2LCJ5IjoxMTk1Ljc5OTk5NTQyMjM2MzN9LHsieCI6MTgyLjI5ODE3NzA4MzMzMzI2LCJ5IjoxMjI3Ljc5OTk5NTQyMjM2MzN9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1de__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabels%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_A_B_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_B_C_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(436.6971333821614%2C%20333.5999984741211\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_C_D_0%22%20transform%3D%22translate\(-8.74609375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2241.4921875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ENo%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(698.5520833333333%2C%20333.5999984741211\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_C_E_0%22%20transform%3D%22translate\(-11.09375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2246.1875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EYes%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_E_F_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_E_G_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_F_H_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_H_I_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(110.421875%2C%20816.7999954223633\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_I_J_0%22%20transform%3D%22translate\(-11.09375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2246.1875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EYes%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(365.54687499999994%2C%20816.7999954223633\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_I_K_0%22%20transform%3D%22translate\(-8.74609375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2241.4921875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ENo%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_K_L_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(401.82942708333326%2C%201082.7999954223633\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_L_M_0%22%20transform%3D%22translate\(-11.09375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2246.1875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EYes%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_M_H_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(182.04427083333326%2C%201082.7999954223633\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_L_N_0%22%20transform%3D%22translate\(-8.74609375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2241.4921875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ENo%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_N_O_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)

## 10.2 Token storage

Recommended browser storage:

| Token                | Storage                                                 |
| -------------------- | ------------------------------------------------------- |
| Access JWT           | In-memory authentication state                          |
| Refresh token        | Secure, HTTP-only cookie                                |
| Password-reset token | Used only for reset flow; never persisted unnecessarily |

Avoid storing refresh tokens in `localStorage` or `sessionStorage`.

Because the website uses browser cookies for refresh operations, configure the backend's cookie attributes, CORS credentials and CSRF protections consistently with the production domains.

## 10.3 Authentication provider

An application-level authentication provider can expose:

* `user`

* `isAuthenticated`

* `isLoading`

* `login()`

* `logout()`

* `refresh()`

The provider should synchronize with the backend instead of assuming that a locally stored user object represents a valid session.

Avoid implementing independent token-refresh logic in every component. The API client should coordinate refresh attempts to prevent multiple simultaneous refresh requests.

## 10.4 Protected routes

Customer account routes require authentication.

The frontend can redirect unauthenticated visitors to login and preserve their intended destination. However, the backend must still enforce access control for every protected resource.

For example, a customer requesting `/orders/{id}` must only be able to retrieve their own order unless they have an authorized administrative role.

# 11. Feature architecture

## 11.1 Home

The homepage should reproduce the prototype's layout and content, including its approved branding, company introduction, featured products, agricultural services and relevant calls to action.

Use server rendering for public content wherever practical. Avoid unnecessary client-side fetching for static sections.

## 11.2 Products and shop

Responsibilities

* Product catalogue.

* Product details.

* Category filtering.

* Search.

* Pagination.

* Product image galleries.

* Availability display.

* Add-to-cart interactions.

Product listings should be rendered server-side where practical to support search engine indexing and social sharing.

Use descriptive metadata for product detail pages, including titles, descriptions and canonical URLs.

The frontend must display availability from the backend but must not treat that value as a stock reservation.

## 11.3 Shopping cart

The cart should support:

* Adding products.

* Updating quantities.

* Removing items.

* Displaying line totals.

* Displaying the cart subtotal.

* Proceeding to checkout.

For authenticated users, the backend should own the persistent cart. The frontend may optimistically update the interface, but it must reconcile with the server response.

If guest carts are part of the approved prototype, keep their temporary state separate and define how it is merged after login. Do not silently create a second authoritative cart implementation.

## 11.4 Checkout

Checkout should collect the information required by the approved business workflow, such as delivery details and contact information.

The frontend should:

1. Validate required fields.

2. Submit checkout information to the backend.

3. Display server-calculated order totals.

4. Handle order-creation errors.

5. Redirect to the payment authorization URL returned by the backend.

6. Provide clear feedback while payment is being initialized.

Never calculate the final payable amount as an authoritative value in the browser. The backend determines prices, fees and totals.

## 11.5 Payment callback

The payment callback page should provide feedback after the customer returns from Paystack.

It should:

* Read the relevant payment reference.

* Request payment status from the backend.

* Display a pending state while verification is incomplete.

* Display success only when the backend confirms payment.

* Display an appropriate failure or recovery state when payment is unsuccessful.

* Provide a route back to the order details or shop.

The callback page must never mark an order as paid based solely on a URL parameter or a successful browser redirect.

## 11.6 Customer account

The account area should contain:

* Dashboard summary.

* Profile details.

* Order history.

* Order detail pages.

* Payment history.

* Consultation booking history.

* Logout.

Use reusable account navigation components. Customer-specific pages should handle loading, empty, unauthorized and error states.

## 11.7 Consultation booking

The booking experience should follow the prototype's service-selection and scheduling workflow.

Expected interactions:

* Browse available consultation services.

* View service details.

* Select an available date and time.

* Enter required booking details.

* Review booking information.

* Submit a booking.

* View confirmation and booking history.

* Cancel an eligible booking.

The frontend should refresh availability after a successful booking and handle slot conflicts gracefully. A slot can become unavailable between selection and submission.

# 12. Forms and validation

Use React Hook Form for forms with meaningful validation or multiple fields, and Zod for their schemas.

Examples include:

* Registration.

* Login.

* Profile updates.

* Checkout.

* Consultation booking.

* Password reset.

Example:

TypeScript

```
import { z } from "zod";

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1, "Password is required"),
});

export type LoginFormValues = z.infer<
  typeof loginSchema
>;
```

Client validation improves usability but is not a security boundary. The backend must independently validate every request.

For server validation errors, map the returned field details to the relevant form fields wherever possible. Use a general form-level message when the error cannot be associated with a specific input.

# 13. Error handling and user feedback

The application should handle errors consistently across all features.

| Scenario                      | Expected UI behaviour                                |
| ----------------------------- | ---------------------------------------------------- |
| Initial loading               | Skeleton or appropriate loading indicator            |
| Empty product catalogue       | Empty state with relevant navigation                 |
| Product not found             | Not-found page                                       |
| Network failure               | Error message and retry option                       |
| Expired authentication        | Attempt refresh, then redirect if unsuccessful       |
| Invalid form                  | Inline validation messages                           |
| Insufficient stock            | Explain the availability issue and refresh cart      |
| Payment pending               | Display a pending status and allow status rechecking |
| Payment failed                | Show the failure state and appropriate next steps    |
| Consultation slot unavailable | Request another slot                                 |
| Unauthorized access           | Redirect or display an access-denied page            |
| Unexpected error              | Error boundary and a recoverable message             |

Use a consistent toast system for short-lived feedback, such as successful cart updates. Important information, such as payment status and order confirmation, should remain visible on the relevant page rather than appearing only in a toast.

Implement Next.js `error.tsx`, `not-found.tsx` and appropriate loading boundaries for route-level error handling.

Do not display raw backend errors or stack traces to customers.

# 14. SEO and performance

Public pages should be optimized for discoverability and performance.

## 14.1 SEO

Implement:

* Page-specific titles and descriptions.

* Canonical URLs.

* Open Graph metadata.

* Product metadata for product detail pages.

* Semantic HTML.

* Descriptive image alternative text.

* Sitemap generation.

* `robots.txt`.

* Appropriate structured data where the underlying information is accurate.

Use Next.js metadata APIs rather than manually duplicating metadata across components.

## 14.2 Performance

* Prefer Server Components for content that does not require browser interaction.

* Use `next/image` for appropriately hosted images.

* Use responsive image sizes and avoid unnecessarily large assets.

* Lazy-load below-the-fold media where appropriate.

* Minimize client-side JavaScript.

* Avoid unnecessary global providers.

* Keep dependencies limited to those that serve a defined purpose.

* Use caching and revalidation for public data where suitable.

* Monitor Core Web Vitals.

Product and service pages should remain useful even if nonessential client-side enhancements fail.

# 15. Security

| Area                  | Requirement                                              |
| --------------------- | -------------------------------------------------------- |
| Authentication        | Use backend-issued tokens                                |
| Authorization         | Backend-enforced ownership and permissions               |
| Token storage         | Avoid persistent JavaScript-readable refresh tokens      |
| Transport             | HTTPS in production                                      |
| CORS                  | Exact approved origins                                   |
| CSRF                  | Protect cookie-authenticated state-changing operations   |
| Input validation      | React Hook Form and Zod, plus backend validation         |
| XSS                   | Escape untrusted content and avoid unsafe HTML injection |
| Payments              | Verify status through the backend                        |
| Environment variables | Keep secrets server-side                                 |
| Dependencies          | Regular security updates                                 |
| Content               | Validate uploaded media and external URLs                |
| Navigation            | Validate redirect destinations                           |

Only expose variables prefixed with `NEXT_PUBLIC_` when their values are explicitly safe for the browser. Never expose the Paystack secret key, database credentials, signing keys or ImageKit private key.

The website should not directly connect to MongoDB, Redis or other internal infrastructure.

# 16. Environment configuration

Example `.env.example`:

dotenv

```
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1

# Optional public payment key, only if the approved
# Paystack integration requires it in the browser.
NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY=
```

The production API URL, website URL and public payment configuration must match the actual deployment.

Server-only secrets should be provided only to server-side processes that require them. Do not add secret values to `NEXT_PUBLIC_` variables.

# 17. Testing strategy

Use a combination of unit, component, integration and browser tests.

| Test type         | Tool                              | Scope                                     |
| ----------------- | --------------------------------- | ----------------------------------------- |
| Unit              | Vitest                            | Utilities, formatters and feature logic   |
| Component         | Vitest and React Testing Library  | Interactive components and form behaviour |
| API integration   | Vitest with mocked or test API    | API client and query integration          |
| End-to-end        | Playwright                        | Complete customer workflows               |
| Accessibility     | Playwright and axe integration    | Keyboard and accessibility checks         |
| Visual regression | Playwright screenshots, if needed | Prototype design parity                   |

## 17.1 Essential test scenarios

Authentication

* Registration validation.

* Login success and failure.

* Session restoration.

* Token refresh.

* Logout.

* Protected route access.

Shop and cart

* Product listing and filtering.

* Product detail rendering.

* Adding and removing items.

* Quantity updates.

* Empty cart behaviour.

* API failures during cart operations.

Checkout and payments

* Invalid checkout details.

* Checkout submission.

* Server-calculated totals.

* Payment initialization failure.

* Payment callback with pending status.

* Payment callback with confirmed status.

* Failed payment recovery.

Consultations

* Service selection.

* Availability retrieval.

* Booking submission.

* Slot conflict handling.

* Booking cancellation.

* Booking history.

Responsive design

* Mobile navigation.

* Product grids across breakpoints.

* Checkout usability on small screens.

* Account navigation.

* No unintended horizontal overflow.

The end-to-end suite should cover the major customer journeys from browsing through checkout and from consultation selection through booking confirmation.

# 18. Deployment architecture

The customer frontend is independently deployable from the backend and admin dashboard.

Two deployment options are supported by the architecture:

| Option | Deployment                            | Considerations                                               |
| ------ | ------------------------------------- | ------------------------------------------------------------ |
| Docker | Self-hosted Next.js standalone output | Centralized deployment but shares VPS resources              |

Given the planned 2 GB RAM VPS, a managed frontend deployment can reduce the server's resource pressure. If Docker deployment is selected, build the Next.js application using standalone output and measure its production resource consumption.

Regardless of hosting, the frontend should call the Go API directly over HTTPS. Configure the backend's CORS allowlist for the deployed website origin.

# 19. CI/CD workflow

Use GitHub Actions for validation and deployment.

Diagram options

![](data\:image/svg+xml;utf8,%3Csvg%20id%3D%22mermaid-_r_1eh_%22%20width%3D%22520.1080322265625%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20class%3D%22flowchart%22%20height%3D%221108%22%20viewBox%3D%224%204%20520.1080322265625%201108%22%20role%3D%22graphics-document%20document%22%20aria-roledescription%3D%22flowchart-v2%22%3E%3Cstyle%3E%23mermaid-_r_1eh_%7Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bfont-size%3A14px%3Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%40keyframes%20edge-animation-frame%7Bfrom%7Bstroke-dashoffset%3A0%3B%7D%7D%40keyframes%20dash%7Bto%7Bstroke-dashoffset%3A0%3B%7D%7D%23mermaid-_r_1eh_%20.edge-animation-slow%7Bstroke-dasharray%3A9%2C5!important%3Bstroke-dashoffset%3A900%3Banimation%3Adash%2050s%20linear%20infinite%3Bstroke-linecap%3Around%3B%7D%23mermaid-_r_1eh_%20.edge-animation-fast%7Bstroke-dasharray%3A9%2C5!important%3Bstroke-dashoffset%3A900%3Banimation%3Adash%2020s%20linear%20infinite%3Bstroke-linecap%3Around%3B%7D%23mermaid-_r_1eh_%20.error-icon%7Bfill%3Argb\(249%2C%20249%2C%20249\)%3B%7D%23mermaid-_r_1eh_%20.error-text%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3Bstroke%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20.edge-thickness-normal%7Bstroke-width%3A1px%3B%7D%23mermaid-_r_1eh_%20.edge-thickness-thick%7Bstroke-width%3A3.5px%3B%7D%23mermaid-_r_1eh_%20.edge-pattern-solid%7Bstroke-dasharray%3A0%3B%7D%23mermaid-_r_1eh_%20.edge-thickness-invisible%7Bstroke-width%3A0%3Bfill%3Anone%3B%7D%23mermaid-_r_1eh_%20.edge-pattern-dashed%7Bstroke-dasharray%3A3%3B%7D%23mermaid-_r_1eh_%20.edge-pattern-dotted%7Bstroke-dasharray%3A2%3B%7D%23mermaid-_r_1eh_%20.marker%7Bfill%3Argb\(93%2C%2093%2C%2093\)%3Bstroke%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1eh_%20.marker.cross%7Bstroke%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1eh_%20svg%7Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bfont-size%3A14px%3B%7D%23mermaid-_r_1eh_%20p%7Bmargin%3A0%3B%7D%23mermaid-_r_1eh_%20.label%7Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20.cluster-label%20text%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20.cluster-label%20span%7Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20.cluster-label%20span%20p%7Bbackground-color%3Atransparent%3B%7D%23mermaid-_r_1eh_%20.label%20text%2C%23mermaid-_r_1eh_%20span%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20.node%20rect%2C%23mermaid-_r_1eh_%20.node%20circle%2C%23mermaid-_r_1eh_%20.node%20ellipse%2C%23mermaid-_r_1eh_%20.node%20polygon%2C%23mermaid-_r_1eh_%20.node%20path%7Bfill%3Argb\(222%2C%20234%2C%20251\)%3Bstroke%3Argb\(83%2C%20154%2C%20248\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1eh_%20.rough-node%20.label%20text%2C%23mermaid-_r_1eh_%20.node%20.label%20text%2C%23mermaid-_r_1eh_%20.image-shape%20.label%2C%23mermaid-_r_1eh_%20.icon-shape%20.label%7Btext-anchor%3Amiddle%3B%7D%23mermaid-_r_1eh_%20.node%20.katex%20path%7Bfill%3A%23000%3Bstroke%3A%23000%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1eh_%20.rough-node%20.label%2C%23mermaid-_r_1eh_%20.node%20.label%2C%23mermaid-_r_1eh_%20.image-shape%20.label%2C%23mermaid-_r_1eh_%20.icon-shape%20.label%7Btext-align%3Acenter%3B%7D%23mermaid-_r_1eh_%20.node.clickable%7Bcursor%3Apointer%3B%7D%23mermaid-_r_1eh_%20.root%20.anchor%20path%7Bfill%3Argb\(93%2C%2093%2C%2093\)!important%3Bstroke-width%3A0%3Bstroke%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1eh_%20.arrowheadPath%7Bfill%3Argb\(93%2C%2093%2C%2093\)%3B%7D%23mermaid-_r_1eh_%20.edgePath%20.path%7Bstroke%3Argb\(93%2C%2093%2C%2093\)%3Bstroke-width%3A2.0px%3B%7D%23mermaid-_r_1eh_%20.flowchart-link%7Bstroke%3Argb\(93%2C%2093%2C%2093\)%3Bfill%3Anone%3B%7D%23mermaid-_r_1eh_%20.edgeLabel%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Btext-align%3Acenter%3B%7D%23mermaid-_r_1eh_%20.edgeLabel%20p%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3B%7D%23mermaid-_r_1eh_%20.edgeLabel%20rect%7Bopacity%3A0.5%3Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Bfill%3Argb\(252%2C%20252%2C%20252\)%3B%7D%23mermaid-_r_1eh_%20.labelBkg%7Bbackground-color%3Argba\(252%2C%20252%2C%20252%2C%200.5\)%3B%7D%23mermaid-_r_1eh_%20.cluster%20rect%7Bfill%3Argb\(249%2C%20249%2C%20249\)%3Bstroke%3Argba\(0%2C%200%2C%200%2C%200.05\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1eh_%20.cluster%20text%7Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20.cluster%20span%7Bcolor%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20div.mermaidTooltip%7Bposition%3Aabsolute%3Btext-align%3Acenter%3Bmax-width%3A200px%3Bpadding%3A2px%3Bfont-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3Bfont-size%3A12px%3Bbackground%3Argb\(249%2C%20249%2C%20249\)%3Bborder%3A1px%20solid%20rgba\(0%2C%200%2C%200%2C%200.05\)%3Bborder-radius%3A2px%3Bpointer-events%3Anone%3Bz-index%3A100%3B%7D%23mermaid-_r_1eh_%20.flowchartTitleText%7Btext-anchor%3Amiddle%3Bfont-size%3A18px%3Bfill%3Argb\(13%2C%2013%2C%2013\)%3B%7D%23mermaid-_r_1eh_%20rect.text%7Bfill%3Anone%3Bstroke-width%3A0%3B%7D%23mermaid-_r_1eh_%20.icon-shape%2C%23mermaid-_r_1eh_%20.image-shape%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Btext-align%3Acenter%3B%7D%23mermaid-_r_1eh_%20.icon-shape%20p%2C%23mermaid-_r_1eh_%20.image-shape%20p%7Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Bpadding%3A2px%3B%7D%23mermaid-_r_1eh_%20.icon-shape%20rect%2C%23mermaid-_r_1eh_%20.image-shape%20rect%7Bopacity%3A0.5%3Bbackground-color%3Argb\(252%2C%20252%2C%20252\)%3Bfill%3Argb\(252%2C%20252%2C%20252\)%3B%7D%23mermaid-_r_1eh_%20.label-icon%7Bdisplay%3Ainline-block%3Bheight%3A1em%3Boverflow%3Avisible%3Bvertical-align%3A-0.125em%3B%7D%23mermaid-_r_1eh_%20.node%20.label-icon%20path%7Bfill%3AcurrentColor%3Bstroke%3Arevert%3Bstroke-width%3Arevert%3B%7D%23mermaid-_r_1eh_%20.node%20text%7Bfont-size%3A16px%3Bfont-weight%3A600%3Bletter-spacing%3A-0.32px%3Bfill%3A%23004f99%3B%7D%23mermaid-_r_1eh_%20.edgeLabels%20text%7Bfont-size%3A13px%3Bfont-weight%3A600%3Bletter-spacing%3A-0.08px%3Bfill%3A%23004f99%3B%7D%23mermaid-_r_1eh_%20.node%20tspan%5Bfont-weight%3D%22normal%22%5D%2C%23mermaid-_r_1eh_%20.edgeLabels%20tspan%5Bfont-weight%3D%22normal%22%5D%7Bfont-weight%3A600%3B%7D%23mermaid-_r_1eh_%20.edgeLabel%20.label%20rect%7Bopacity%3A1%3Brx%3A13px%3Bry%3A13px%3Bfill%3A%23f5faff%3Bstroke%3Argb\(206%2C%20219%2C%20229\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1eh_%20.node%20rect%2C%23mermaid-_r_1eh_%20.node%20circle%2C%23mermaid-_r_1eh_%20.node%20ellipse%2C%23mermaid-_r_1eh_%20.node%20polygon%2C%23mermaid-_r_1eh_%20.node%20path%7Bfill%3Argb\(229%2C%20243%2C%20255\)%3Bstroke%3Argba\(0%2C%200%2C%200%2C%200.1\)%3Bstroke-width%3A1px%3B%7D%23mermaid-_r_1eh_%20.node%20rect%7Brx%3A16px%3Bry%3A16px%3B%7D%23mermaid-_r_1eh_%20.node.mermaid-decision%20.label-container%7Bfill%3A%23f5faff%3Bstroke%3Argb\(206%2C%20219%2C%20229\)%3Bstroke-dasharray%3A2%202%3B%7D%23mermaid-_r_1eh_%20.edgePaths%20.flowchart-link%7Bstroke%3Argb\(206%2C%20219%2C%20229\)%3Bstroke-width%3A1px%3Bstroke-linecap%3Around%3Bstroke-linejoin%3Around%3B%7D%23mermaid-_r_1eh_%20.marker%7Bfill%3Argb\(206%2C%20219%2C%20229\)%3Bstroke%3Argb\(206%2C%20219%2C%20229\)%3B%7D%23mermaid-_r_1eh_%20.node%7Bcolor-scheme%3Alight%3B%7D%23mermaid-_r_1eh_%20%3Aroot%7B--mermaid-font-family%3A%22-apple-system%22%2C%22BlinkMacSystemFont%22%2C%22Segoe%20UI%22%2C%22Roboto%22%2C%22Oxygen%22%2C%22Ubuntu%22%2C%22Cantarell%22%2C%22Helvetica%20Neue%22%2C%22Arial%22%2C%22sans-serif%22%3B%7D%3C%2Fstyle%3E%3Cg%3E%3Cmarker%20id%3D%22mermaid-_r_1eh__flowchart-v2-pointEnd%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%22-5%20-5%2010%2010%22%20refX%3D%220%22%20refY%3D%220%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2210%22%20markerHeight%3D%2210%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%200%200%20L%204%200%20M%200.8180194846605362%20-3.181980515339464%20L%204%200%20L%200.8180194846605362%203.181980515339464%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%20none%3B%20fill%3A%20none%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1eh__flowchart-v2-pointStart%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%22-5%20-5%2010%2010%22%20refX%3D%220%22%20refY%3D%220%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2210%22%20markerHeight%3D%2210%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%200%200%20L%20-4%200%20M%20-0.8180194846605362%20-3.181980515339464%20L%20-4%200%20L%20-0.8180194846605362%203.181980515339464%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%20none%3B%20fill%3A%20none%3B%20stroke-linecap%3A%20round%3B%20stroke-linejoin%3A%20round%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1eh__flowchart-v2-circleEnd%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%220%200%2010%2010%22%20refX%3D%2211%22%20refY%3D%225%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%225%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fcircle%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1eh__flowchart-v2-circleStart%22%20class%3D%22marker%20flowchart-v2%22%20viewBox%3D%220%200%2010%2010%22%20refX%3D%22-1%22%20refY%3D%225%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Ccircle%20cx%3D%225%22%20cy%3D%225%22%20r%3D%225%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%201%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fcircle%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1eh__flowchart-v2-crossEnd%22%20class%3D%22marker%20cross%20flowchart-v2%22%20viewBox%3D%220%200%2011%2011%22%20refX%3D%2212%22%20refY%3D%225.2%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%201%2C1%20l%209%2C9%20M%2010%2C1%20l%20-9%2C9%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%202%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3Cmarker%20id%3D%22mermaid-_r_1eh__flowchart-v2-crossStart%22%20class%3D%22marker%20cross%20flowchart-v2%22%20viewBox%3D%220%200%2011%2011%22%20refX%3D%22-1%22%20refY%3D%225.2%22%20markerUnits%3D%22userSpaceOnUse%22%20markerWidth%3D%2211%22%20markerHeight%3D%2211%22%20orient%3D%22auto%22%3E%3Cpath%20d%3D%22M%201%2C1%20l%209%2C9%20M%2010%2C1%20l%20-9%2C9%22%20class%3D%22arrowMarkerPath%22%20style%3D%22stroke-width%3A%202%3B%20stroke-dasharray%3A%201%2C%200%3B%22%3E%3C%2Fpath%3E%3C%2Fmarker%3E%3C%2Fg%3E%3Cg%20class%3D%22subgraphs%22%3E%3C%2Fg%3E%3Cg%20class%3D%22nodes%22%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-A-0%22%20transform%3D%22translate\(352.1614583333333%2C%2042\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-108.51953125%22%20y%3D%22-30%22%20width%3D%22217.0390625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EPush%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20or%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20pull%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20request%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-B-1%22%20transform%3D%22translate\(352.1614583333333%2C%20142\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-111.03515625%22%20y%3D%22-30%22%20width%3D%22222.0703125%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EInstall%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20dependencies%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-C-3%22%20transform%3D%22translate\(352.1614583333333%2C%20242\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-103.58203125%22%20y%3D%22-30%22%20width%3D%22207.1640625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ETypeScript%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20checks%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-D-5%22%20transform%3D%22translate\(352.1614583333333%2C%20342\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-59.26171875%22%20y%3D%22-30%22%20width%3D%22118.5234375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EESLint%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-E-7%22%20transform%3D%22translate\(352.1614583333333%2C%20442\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-129.9453125%22%20y%3D%22-30%22%20width%3D%22259.890625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EUnit%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20and%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20component%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20tests%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-F-9%22%20transform%3D%22translate\(352.1614583333333%2C%20542\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-95.8671875%22%20y%3D%22-30%22%20width%3D%22191.734375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EProduction%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20build%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%20%20mermaid-decision%22%20id%3D%22flowchart-G-11%22%20transform%3D%22translate\(352.1614583333333%2C%20642\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-96.0078125%22%20y%3D%22-30%22%20width%3D%22192.015625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EAll%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20checks%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20pass%3F%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-H-13%22%20transform%3D%22translate\(122.25%2C%20808\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-110.25%22%20y%3D%22-30%22%20width%3D%22220.5%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EReport%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20failed%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20checks%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%20%20mermaid-decision%22%20id%3D%22flowchart-I-15%22%20transform%3D%22translate\(384.1640625%2C%20808\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-111.6640625%22%20y%3D%22-30%22%20width%3D%22223.328125%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EDeployment%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20branch%3F%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-J-17%22%20transform%3D%22translate\(191.71744791666669%2C%20974\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-94.9453125%22%20y%3D%22-30%22%20width%3D%22189.890625%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EPublish%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20CI%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20result%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-K-19%22%20transform%3D%22translate\(421.3854166666667%2C%20974\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-94.72265625%22%20y%3D%22-30%22%20width%3D%22189.4453125%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EDeploy%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20frontend%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22node%20default%22%20id%3D%22flowchart-L-21%22%20transform%3D%22translate\(421.3854166666667%2C%201074\)%22%3E%3Crect%20class%3D%22basic%20label-container%22%20style%3D%22%22%20x%3D%22-81.0546875%22%20y%3D%22-30%22%20width%3D%22162.109375%22%20height%3D%2260%22%3E%3C%2Frect%3E%3Cg%20class%3D%22label%22%20style%3D%22%22%20transform%3D%22translate\(0%2C%20-9.5\)%22%3E%3Crect%3E%3C%2Frect%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ESmoke%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20tests%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edges%20edgePaths%22%3E%3Cpath%20d%3D%22M352.1614583333333%2C72L352.1614583333333%2C100%22%20id%3D%22L_A_B_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_A_B_0%22%20data-points%3D%22W3sieCI6MzUyLjE2MTQ1ODMzMzMzMzMsInkiOjcyfSx7IngiOjM1Mi4xNjE0NTgzMzMzMzMzLCJ5IjoxMDR9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M352.1614583333333%2C172L352.1614583333333%2C200%22%20id%3D%22L_B_C_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_B_C_0%22%20data-points%3D%22W3sieCI6MzUyLjE2MTQ1ODMzMzMzMzMsInkiOjE3Mn0seyJ4IjozNTIuMTYxNDU4MzMzMzMzMywieSI6MjA0fV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M352.1614583333333%2C272L352.1614583333333%2C300%22%20id%3D%22L_C_D_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_C_D_0%22%20data-points%3D%22W3sieCI6MzUyLjE2MTQ1ODMzMzMzMzMsInkiOjI3Mn0seyJ4IjozNTIuMTYxNDU4MzMzMzMzMywieSI6MzA0fV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M352.1614583333333%2C372L352.1614583333333%2C400%22%20id%3D%22L_D_E_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_D_E_0%22%20data-points%3D%22W3sieCI6MzUyLjE2MTQ1ODMzMzMzMzMsInkiOjM3Mn0seyJ4IjozNTIuMTYxNDU4MzMzMzMzMywieSI6NDA0fV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M352.1614583333333%2C472L352.1614583333333%2C500%22%20id%3D%22L_E_F_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_E_F_0%22%20data-points%3D%22W3sieCI6MzUyLjE2MTQ1ODMzMzMzMzMsInkiOjQ3Mn0seyJ4IjozNTIuMTYxNDU4MzMzMzMzMywieSI6NTA0fV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M352.1614583333333%2C572L352.1614583333333%2C600%22%20id%3D%22L_F_G_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_F_G_0%22%20data-points%3D%22W3sieCI6MzUyLjE2MTQ1ODMzMzMzMzMsInkiOjU3Mn0seyJ4IjozNTIuMTYxNDU4MzMzMzMzMywieSI6NjA0fV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M320.15885416666663%2C672L320.15885416666663%2C685.2170439747053Q320.15885416666663%2C687%20319.07306772903974%2C688.4142135623731L319.07306772903974%2C688.4142135623731Q317.98728129141284%2C689.8284271247462%20316.57306772903974%2C690.9142135623731L316.57306772903974%2C690.9142135623731Q315.15885416666663%2C692%20313.375898141372%2C692L129.03295602529465%2C692Q127.25%2C692%20125.83578643762691%2C693.0857864376269L125.83578643762691%2C693.0857864376269Q124.42157287525382%2C694.1715728752538%20123.33578643762692%2C695.5857864376269L123.33578643762691%2C695.5857864376269Q122.25%2C697%20122.25%2C698.7829560252947L122.25%2C766%22%20id%3D%22L_G_H_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_G_H_0%22%20data-points%3D%22W3sieCI6MzIwLjE1ODg1NDE2NjY2NjYzLCJ5Ijo2NzJ9LHsieCI6MzIwLjE1ODg1NDE2NjY2NjYzLCJ5Ijo2OTJ9LHsieCI6MTIyLjI1LCJ5Ijo2OTJ9LHsieCI6MTIyLjI1LCJ5Ijo3NzB9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M384.1640625%2C672L384.1640625%2C766%22%20id%3D%22L_G_I_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_G_I_0%22%20data-points%3D%22W3sieCI6Mzg0LjE2NDA2MjUsInkiOjY3Mn0seyJ4IjozODQuMTY0MDYyNSwieSI6NzcwfV0%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M346.94270833333337%2C838L346.94270833333337%2C851.2170439747053Q346.94270833333337%2C853%20345.8569218957065%2C854.4142135623731L345.8569218957065%2C854.4142135623731Q344.7711354580796%2C855.8284271247462%20343.3569218957065%2C856.9142135623731L343.3569218957065%2C856.9142135623731Q341.94270833333337%2C858%20340.1597523080387%2C858L198.50040394196134%2C858Q196.71744791666669%2C858%20195.30323435429358%2C859.0857864376269L195.30323435429358%2C859.0857864376269Q193.8890207919205%2C860.1715728752538%20192.8032343542936%2C861.5857864376269L192.80323435429358%2C861.5857864376269Q191.71744791666669%2C863%20191.71744791666669%2C864.7829560252947L191.71744791666669%2C932%22%20id%3D%22L_I_J_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_I_J_0%22%20data-points%3D%22W3sieCI6MzQ2Ljk0MjcwODMzMzMzMzM3LCJ5Ijo4Mzh9LHsieCI6MzQ2Ljk0MjcwODMzMzMzMzM3LCJ5Ijo4NTh9LHsieCI6MTkxLjcxNzQ0NzkxNjY2NjY5LCJ5Ijo4NTh9LHsieCI6MTkxLjcxNzQ0NzkxNjY2NjY5LCJ5Ijo5MzZ9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M421.38541666666663%2C838L421.3854166666667%2C932%22%20id%3D%22L_I_K_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_I_K_0%22%20data-points%3D%22W3sieCI6NDIxLjM4NTQxNjY2NjY2NjYzLCJ5Ijo4Mzh9LHsieCI6NDIxLjM4NTQxNjY2NjY2NjcsInkiOjkzNn1d%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3Cpath%20d%3D%22M421.3854166666667%2C1004L421.3854166666667%2C1032%22%20id%3D%22L_K_L_0%22%20class%3D%22edge-thickness-normal%20edge-pattern-solid%20edge-thickness-normal%20edge-pattern-solid%20flowchart-link%22%20style%3D%22%3B%22%20data-edge%3D%22true%22%20data-et%3D%22edge%22%20data-id%3D%22L_K_L_0%22%20data-points%3D%22W3sieCI6NDIxLjM4NTQxNjY2NjY2NjcsInkiOjEwMDR9LHsieCI6NDIxLjM4NTQxNjY2NjY2NjcsInkiOjEwMzZ9XQ%3D%3D%22%20marker-end%3D%22url\(%23mermaid-_r_1eh__flowchart-v2-pointEnd\)%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabels%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22stroke%3A%20none%22%3E%3C%2Frect%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_A_B_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_B_C_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_C_D_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_D_E_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_E_F_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_F_G_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(121.99609375%2C%20725\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_G_H_0%22%20transform%3D%22translate\(-8.74609375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2241.4921875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3ENo%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(383.7578125%2C%20725\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_G_I_0%22%20transform%3D%22translate\(-11.09375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2246.1875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EYes%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(191.49479166666669%2C%20891\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_I_J_0%22%20transform%3D%22translate\(-37.27734375%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%2298.5546875%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EPull%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20request%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%20transform%3D%22translate\(421.1705729166667%2C%20891\)%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_I_K_0%22%20transform%3D%22translate\(-53.78515625%2C-8\)%22%3E%3Cg%3E%3Crect%20class%3D%22background%22%20style%3D%22%22%20x%3D%22-12%22%20y%3D%22-5%22%20width%3D%22131.5703125%22%20height%3D%2226%22%3E%3C%2Frect%3E%3Ctext%20y%3D%22-10.1%22%20style%3D%22%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3EApproved%3C%2Ftspan%3E%3Ctspan%20font-style%3D%22normal%22%20class%3D%22text-inner-tspan%22%20font-weight%3D%22normal%22%3E%20branch%3C%2Ftspan%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3Cg%20class%3D%22edgeLabel%22%3E%3Cg%20class%3D%22label%22%20data-id%3D%22L_K_L_0%22%20transform%3D%22translate\(0%2C%200\)%22%3E%3Ctext%20y%3D%22-10.1%22%3E%3Ctspan%20class%3D%22text-outer-tspan%22%20x%3D%220%22%20y%3D%22-0.1em%22%20dy%3D%221.1em%22%3E%3C%2Ftspan%3E%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E)

Recommended checks:

1. Install dependencies using the committed lockfile.

2. Run TypeScript checks.

3. Run ESLint.

4. Run unit and component tests.

5. Build the production application.

6. Run selected end-to-end tests.

7. Deploy approved changes.

8. Verify key pages and API connectivity after deployment.

Use separate environment variables for preview and production deployments.

# 20. Implementation phases

Phase 1

Project foundation

* Initialize Next.js with TypeScript.

* Configure Tailwind CSS and shadcn/ui.

* Establish the design tokens from the prototype.

* Set up App Router layouts and route groups.

* Configure TanStack Query.

* Create the API client and environment configuration.

* Set up linting, testing and CI.

Phase 2

Public website

* Implement the shared header and footer.

* Build the homepage.

* Implement About, Services and Contact.

* Build the product catalogue and detail pages.

* Add SEO metadata and responsive layouts.

Phase 3

Authentication and customer accounts

* Implement registration and login.

* Integrate token refresh and logout.

* Build password-reset pages.

* Implement customer profile management.

* Build account navigation and dashboard.

Phase 4

Cart, checkout and payments

* Implement cart operations.

* Integrate checkout with the backend.

* Display authoritative order totals.

* Implement the Paystack redirect and callback experience.

* Add order history and detail pages.

* Handle payment pending and failure states.

Phase 5

Consultation booking

* Build consultation service pages.

* Implement availability selection.

* Build the booking form.

* Integrate booking creation and cancellation.

* Implement booking history and confirmation.

Phase 6

Quality assurance and deployment

* Compare implemented pages against the prototype.

* Complete responsive and accessibility testing.

* Run end-to-end customer journeys.

* Verify API error and loading states.

* Optimize performance and SEO.

* Deploy and perform production smoke tests.

# 21. Architectural decisions and constraints

| Decision          | Chosen approach                | Reason                                        |
| ----------------- | ------------------------------ | --------------------------------------------- |
| Framework         | Next.js App Router             | Routing, server rendering and SEO             |
| Language          | TypeScript                     | Maintainable frontend contracts               |
| Architecture      | Feature-oriented               | Clear separation of customer features         |
| Server state      | TanStack Query                 | Caching and mutation management               |
| Local state       | React state and context        | Avoid unnecessary state-management complexity |
| Forms             | React Hook Form and Zod        | Consistent validation and form handling       |
| Styling           | Tailwind CSS                   | Responsive, consistent styling                |
| UI components     | shadcn/ui                      | Reusable accessible components                |
| API communication | Direct REST calls              | Avoid unnecessary BFF infrastructure          |
| API types         | Frontend-owned types           | Independent frontend repositories             |
| Authentication    | JWT access and refresh flow    | Integrates with the Go backend                |
| Rendering         | Server Components by default   | SEO and reduced client-side JavaScript        |
| Payments          | Backend-verified Paystack flow | Keep payment state authoritative              |
| Testing           | Vitest and Playwright          | Component and end-to-end coverage             |
| Deployment        | Docker, VPS (Namecheap)       | Independent frontend deployment               |

## Final architecture principle

The customer website must faithfully implement the approved HTML prototype while replacing its Local Storage demo behaviour with real backend integration. The frontend owns presentation, user interaction and temporary UI state. The Go backend remains authoritative for authentication, pricing, inventory, payments, orders and consultation bookings.
