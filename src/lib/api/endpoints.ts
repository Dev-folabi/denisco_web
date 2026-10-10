export const API = {
  auth: {
    register: "/api/v1/auth/register",
    login: "/api/v1/auth/login",
    refresh: "/api/v1/auth/refresh",
    logout: "/api/v1/auth/logout",
    forgotPassword: "/api/v1/auth/forgot-password",
    resetPassword: "/api/v1/auth/reset-password",
    changePassword: "/api/v1/auth/change-password",
    me: "/api/v1/auth/me",
  },
  products: {
    list: "/api/v1/products",
    byId: (id: string) => `/api/v1/products/${id}`,
    bySlug: (slug: string) => `/api/v1/products/slug/${slug}`,
    related: (slug: string) => `/api/v1/products/slug/${slug}/related`,
  },
  categories: {
    list: "/api/v1/categories",
  },
  cart: {
    get: "/api/v1/cart",
    addItem: "/api/v1/cart/items",
    updateItem: (id: string) => `/api/v1/cart/items/${id}`,
    removeItem: (id: string) => `/api/v1/cart/items/${id}`,
    clear: "/api/v1/cart",
  },
  orders: {
    create: "/api/v1/orders",
    list: "/api/v1/orders",
    byId: (id: string) => `/api/v1/orders/${id}`,
    byNumber: (number: string) => `/api/v1/orders/number/${number}`,
    cancel: (id: string) => `/api/v1/orders/${id}/cancel`,
  },
  payments: {
    initialize: "/api/v1/payments/initialize",
    verify: "/api/v1/payments/verify",
    list: "/api/v1/payments",
    byRef: (ref: string) => `/api/v1/payments/${ref}`,
  },
  consultations: {
    types: "/api/v1/consultations/types",
    slots: "/api/v1/consultations/slots",
    bookings: {
      create: "/api/v1/consultations/bookings",
      list: "/api/v1/consultations/bookings",
      byId: (id: string) => `/api/v1/consultations/bookings/${id}`,
      cancel: (id: string) => `/api/v1/consultations/bookings/${id}/cancel`,
    },
  },
} as const;
