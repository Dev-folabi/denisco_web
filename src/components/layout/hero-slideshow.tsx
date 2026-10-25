"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/constants";

/** How long each hero slide is shown before cross-fading, in milliseconds. */
const SLIDE_MS = 5000;

/**
 * A cross-fading photographic background for the hero section.
 *
 * It sits behind the hero content (globals.css gives it z-index 0 and the
 * hero copy z-index 1) under a cream wash that keeps the dark hero text
 * legible over the photos. The first slide is marked `priority` so it is the
 * LCP candidate; the rest load lazily. The cycle is decorative, so the
 * container is hidden from assistive tech.
 */
export function HeroSlideshow() {
  const slides = SITE.media.heroSlides;
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <div className="hero-slideshow" aria-hidden="true">
      {slides.map((src, index) => (
        <div
          key={src}
          className={`hero-slide${index === active ? " active" : ""}`}
        >
          <Image
            src={src}
            alt=""
            fill
            sizes="100vw"
            priority={index === 0}
            style={{ objectFit: "cover" }}
          />
        </div>
      ))}
      <div className="hero-slideshow-overlay" />
    </div>
  );
}
