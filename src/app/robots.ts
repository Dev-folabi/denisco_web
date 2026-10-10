import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";

/**
 * Crawlers are welcome on the shop and the public pages, and nowhere a
 * customer signs in. The disallowed paths hold nothing a search result should
 * ever point at: a cart belongs to one person, a payment callback is a
 * one-time redirect, and an order confirmation is reachable only with its id.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: [
        "/account",
        "/cart",
        "/checkout",
        "/payment/",
        "/order-confirmation/",
        "/booking-confirmation/",
        "/login",
        "/register",
        "/forgot-password",
        "/reset-password",
      ],
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
