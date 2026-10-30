"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Leaf, Sprout, Users } from "lucide-react";
import { SITE } from "@/lib/constants";

/** How long each hero slide is shown before cross-fading, in milliseconds. */
const SLIDE_MS = 5000;

/**
 * The home hero: a full-bleed, cross-fading photographic slideshow of the four
 * farm slides with a forest scrim, white editorial copy, clickable slide
 * indicators and a frosted "From Seed to Harvest" badge.
 *
 * It is a client component because the slideshow and its indicators share
 * state. Auto-advance runs continuously and never pauses. The first slide is
 * `priority` (the LCP candidate); the rest load lazily, and the background is
 * hidden from assistive tech since it is decorative.
 */
export function HeroSection() {
  const slides = SITE.media.heroSlides;
  const [active, setActive] = useState(0);

  // The slideshow runs continuously and never pauses.
  useEffect(() => {
    if (slides.length <= 1) return;
    const timer = setInterval(
      () => setActive((index) => (index + 1) % slides.length),
      SLIDE_MS,
    );
    return () => clearInterval(timer);
  }, [slides.length]);

  return (
    <section className="hero" aria-label="Denisco Global Agriculture">
      <div className="hero-bg" aria-hidden="true">
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
        <div className="hero-scrim" />
      </div>

      <div className="container hero-content">
        <span className="hero-eyebrow">Integrated Agriculture</span>
        <h1 className="hero-title">
          Growing with Nature.
          <br />
          <mark>Creating Value</mark> for Life.
        </h1>
        <p className="hero-lead">
          Denisco Global Agriculture Limited builds sustainable value from seed
          to harvest through responsible production, practical knowledge and
          integrated farming.
        </p>
        <div className="hero-actions">
          <Link href="/shop" className="btn btn-accent btn-lg">
            Explore Our Products
          </Link>
          <Link href="/consultation" className="btn btn-glass btn-lg">
            Book a Consultation
          </Link>
        </div>
        <div className="hero-trust">
          <span className="hero-trust-item">
            <Leaf size={17} /> Sustainable Practices
          </span>
          <span className="hero-trust-item">
            <Sprout size={17} /> Integrated Agriculture
          </span>
          <span className="hero-trust-item">
            <Users size={17} /> Practical Training
          </span>
        </div>
      </div>

      {slides.length > 1 && (
        <div className="hero-indicators" role="tablist" aria-label="Hero slides">
          {slides.map((src, index) => (
            <button
              key={src}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show slide ${index + 1}`}
              className={`hero-dot${index === active ? " active" : ""}`}
              onClick={() => setActive(index)}
            />
          ))}
        </div>
      )}

      <div className="hero-badge-glass">
        <Sprout size={24} />
        <div>
          <strong>From Seed to Harvest</strong>
          <span>Creating value across the value chain</span>
        </div>
      </div>
    </section>
  );
}
