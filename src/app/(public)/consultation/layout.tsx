import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";

/**
 * The booking page itself is a client component — it is an interactive form
 * over live availability — and a client component cannot export metadata, so
 * the route's title, description and canonical URL live here.
 */
export const metadata: Metadata = pageMetadata({
  title: "Book a Farm Consultation",
  description:
    "Book a consultation with DENISCO's agricultural specialists: farm setup, poultry and livestock health, piggery, snail farming, crop production and soil advisory.",
  path: "/consultation",
});

export default function ConsultationLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
