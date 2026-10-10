import type { Metadata } from "next";
import { SITE, SITE_URL } from "@/lib/constants";

/**
 * Shared metadata, kept in one place because Next replaces nested metadata
 * objects rather than merging them: a page that sets `openGraph` loses every
 * field the layout set, so the common parts have to be spread back in.
 */

/** The image a shared link shows. The company logo is the only brand asset. */
export const SHARE_IMAGE = SITE.media.logo;

/**
 * Fields every Open Graph tag set carries. Not `as const`: Next's metadata
 * types take a mutable image array, and these are spread into page metadata.
 */
export const openGraphBase = {
  siteName: SITE.company.name,
  locale: "en_NG",
  images: [{ url: SHARE_IMAGE, alt: SITE.company.name }],
};

interface PageSeo {
  /** Page title, without the site suffix the root template adds. */
  title: string;
  description: string;
  /** Path the page is served at, for the canonical and Open Graph URLs. */
  path: string;
  /** Overrides the share image, for pages about one product. */
  image?: string;
}

/**
 * Builds a page's metadata: title, description, canonical URL and a complete
 * set of Open Graph and Twitter tags.
 */
export function pageMetadata({
  title,
  description,
  path,
  image,
}: PageSeo): Metadata {
  const url = `${SITE_URL}${path}`;
  const images = image ? [{ url: image, alt: title }] : openGraphBase.images;

  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...openGraphBase,
      images,
      title: `${title} | DENISCO`,
      description,
      url,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} | DENISCO`,
      description,
      images: images.map((entry) => entry.url),
    },
  };
}
