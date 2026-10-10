import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/layout/section-head";
import {
  FEATURED_LIMIT,
  FeaturedProducts,
} from "@/components/product/featured-products";
import { ServiceIcon } from "@/components/services/service-icon";
import { SITE } from "@/lib/constants";
import { fetchProducts } from "@/lib/api/server";
import { Sprout, Leaf, Users, Check } from "lucide-react";

// The featured products are read on the server and the page is regenerated
// every minute, so the grid is in the HTML rather than appearing after a
// client fetch.
// Next reads this at build time, so it has to be a literal: it is the same
// sixty seconds as CATALOGUE_REVALIDATE_SECONDS in lib/api/server.ts.
export const revalidate = 60;

const WHO_WE_ARE_POINTS = [
  "Quality production from soil to marketplace",
  "Responsible care for land, animals and people",
  "Knowledge that supports farmers and communities",
];

export default async function HomePage() {
  const featured = await fetchProducts({
    featured: true,
    limit: FEATURED_LIMIT,
  });

  const services = SITE.services.slice(0, 4);
  const videos = [
    SITE.media.videos.farmIntroduction,
    SITE.media.videos.agriculturalEducation,
  ];

  return (
    <>
      {/* ===== HERO ===== */}
      <section className="hero">
        <div className="container hero-inner">
          <div className="hero-copy">
            <span className="eyebrow">Integrated Agriculture</span>
            <h1>
              Growing with Nature. <mark>Creating Value</mark> for Life.
            </h1>
            <p>
              Denisco Global Agriculture Limited builds sustainable value from
              seed to harvest through responsible production, practical
              knowledge and integrated farming.
            </p>
            <div className="hero-ctas">
              <Link href="/shop" className="btn btn-accent">
                Explore Our Products
              </Link>
              <Link href="/consultation" className="btn btn-outline">
                Book a Consultation
              </Link>
            </div>
            <div className="trust-strip">
              <div className="trust-item">
                <Leaf className="trust-icon" size={17} />
                Sustainable Practices
              </div>
              <div className="trust-item">
                <Sprout className="trust-icon" size={17} />
                Integrated Agriculture
              </div>
              <div className="trust-item">
                <Users className="trust-icon" size={17} />
                Practical Training
              </div>
            </div>
          </div>
          <div className="hero-media">
            <div className="hero-dots" />
            <div className="blob-frame">
              <Image
                src={SITE.media.heroImage}
                alt="Integrated farm operations at Denisco Global Agriculture Limited"
                width={600}
                height={480}
                // The frame is at most 600px wide and full-width on a phone;
                // without this the browser downloads a source sized for the
                // viewport rather than for the frame.
                sizes="(max-width: 760px) 100vw, 600px"
                priority
              />
            </div>
            <div className="hero-badge">
              <Sprout className="badge-icon" size={24} />
              <div>
                <strong>From Seed to Harvest</strong>
                <span>Creating value across the value chain</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== WHO WE ARE ===== */}
      <section className="section section-white">
        <div className="container split">
          <div className="img-blob">
            <Image
              src={SITE.media.farmland}
              alt="Denisco agricultural land"
              width={600}
              height={400}
            sizes="(max-width: 760px) 100vw, 600px"
              />
          </div>
          <div>
            <span className="eyebrow">Who We Are</span>
            <h2>An Integrated Agricultural Enterprise</h2>
            <p className="muted">
              We produce crops, livestock, poultry and related agricultural
              products while creating opportunities through seed development,
              plantain and banana propagation, forage and feed production,
              consulting, training and value addition.
            </p>
            <ul className="check-list">
              {WHO_WE_ARE_POINTS.map((point) => (
                <li key={point}>
                  <span className="mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-full bg-olive text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {point}
                </li>
              ))}
            </ul>
            <Link href="/about" className="btn btn-primary">
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="section section-deep">
        <div className="container">
          <SectionHead
            eyebrow="Featured Products"
            title="Fresh From Our Farms"
            description="A selection of available livestock, poultry and crop products."
          />
          <FeaturedProducts initialProducts={featured?.data} />

          <div className="mt-[44px] text-center">
            <Link href="/shop" className="btn btn-outline">
              View All Products
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="section section-white">
        <div className="container">
          <SectionHead
            eyebrow="What We Do"
            title="Our Agricultural Services"
            description="Practical, integrated services designed to grow productivity and sustainable value."
          />
          <div>
            {services.map((service, index) => (
              <div className="service-row" key={service.title}>
                <div className="service-num">
                  {String(index + 1).padStart(2, "0")}
                </div>
                <div className="service-icon">
                  <ServiceIcon service={service} />
                </div>
                <div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                {/* The visible label stays "Learn More", as the prototype
                    has it; the accessible name names the service, so four
                    identical links are distinguishable to a screen reader and
                    to a crawler. */}
                <Link
                  href="/services"
                  aria-label={`Learn more about ${service.title}`}
                  className="btn btn-ghost btn-sm"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/services" className="btn btn-outline">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CEO ===== */}
      <section className="section section-deep">
        <div className="container ceo-section">
          <div className="ceo-photo">
            <div className="blob-frame">
              <Image
                src={SITE.media.ceoPhoto1}
                alt="Chief Executive Officer of Denisco Global Agriculture Limited"
                width={500}
                height={500}
              sizes="(max-width: 760px) 100vw, 500px"
                />
            </div>
          </div>
          <div>
            <span className="eyebrow">Meet Our CEO</span>
            <h2>{SITE.ceo.name}</h2>
            <p className="muted font-extrabold tracking-[0.4px]">
              {SITE.ceo.title}
            </p>
            <span className="quote-mark">&ldquo;</span>
            <p className="ceo-quote">{SITE.ceo.hero_quote}</p>
            <p className="ceo-signature">{SITE.ceo.name}, CEO</p>
            <Link href="/about" className="btn btn-ghost mt-[10px]">
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FARM VIDEOS ===== */}
      <section className="section section-white">
        <div className="container">
          <SectionHead
            eyebrow="Farm Footage"
            title="See Our Farm In Motion"
            description="Meet the leadership and explore agricultural knowledge from Denisco."
          />
          <div className="video-two-col">
            {videos.map((video) => (
              <div className="video-block" key={video.title}>
                <div className="video-frame">
                  <video
                    controls
                    // The poster carries the frame, so nothing is fetched from
                    // the video until a visitor presses play: two farm videos
                    // at metadata preload cost two requests on every home-page
                    // view for no visible benefit.
                    preload="none"
                    poster={video.poster}
                    aria-label={video.title}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded video.{" "}
                    <a href={video.src}>Open the video</a>.
                  </video>
                </div>
                <h3>{video.title}</h3>
                <p className="muted" style={{ maxWidth: "360px" }}>
                  {video.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="section section-deep">
        <div className="container">
          <div className="cta-banner">
            <h2>Ready to Grow With Denisco?</h2>
            <p>
              Explore our products, build agricultural knowledge or speak with
              our team about your farm.
            </p>
            <div className="cta-actions">
              <Link href="/shop" className="btn btn-accent">
                Explore Products
              </Link>
              <Link href="/consultation" className="btn btn-outline-light">
                Book a Consultation
              </Link>
              <Link href="/policy" className="btn btn-outline-light">
                Read Our Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
