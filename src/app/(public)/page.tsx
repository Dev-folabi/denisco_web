import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/layout/section-head";
import { SITE } from "@/lib/constants";
import {
  Sprout,
  ShieldCheck,
  Award,
  ArrowRight,
  Play,
  CheckCircle,
  ChevronRight,
} from "lucide-react";

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="px-6 py-[70px] max-[760px]:py-12">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[1.05fr_0.95fr] items-center gap-[60px] max-[1024px]:grid-cols-1 max-[760px]:gap-9">
          <div>
            <span className="eyebrow mb-4">Integrated Agriculture</span>
            <h1 className="mb-5 text-[min(6vw,50px)] leading-[1.1] max-[760px]:text-[clamp(30px,10vw,40px)] max-sm:text-[32px]">
              Growing with Nature.{" "}
              <em className="relative not-italic text-forest">
                From Seed
                <span className="absolute -left-1 bottom-1.5 -right-1 -z-10 h-3.5 bg-lime opacity-70" />
              </em>{" "}
              to Harvest.
            </h1>
            <p className="max-w-[480px] text-[17px] text-muted">
              {SITE.company.tagline}
            </p>
            <div className="mt-[30px] mb-[38px] flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
              >
                Explore Products <ArrowRight size={16} />
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
              >
                Book Consultation
              </Link>
            </div>
            <div className="flex flex-wrap gap-[30px] max-[760px]:gap-3.5">
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-forest">
                <Sprout size={17} className="text-olive" />
                Integrated Farming
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-forest">
                <ShieldCheck size={17} className="text-olive" />
                Quality Assured
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-forest">
                <Award size={17} className="text-olive" />
                Expert Advisory
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[38%_62%_65%_35%/48%_42%_58%_52%] shadow-[var(--shadow-lg)]">
              <div className="h-[480px] bg-cream-deep max-[1024px]:h-[340px] max-[760px]:h-[300px]">
                <Image
                  src={SITE.media.ceoPhoto1}
                  alt="DENISCO farm"
                  width={600}
                  height={480}
                  className="size-full object-cover"
                  priority
                />
              </div>
            </div>
            <div className="absolute -right-6 -top-6 -z-10 size-[110px] bg-[radial-gradient(var(--color-olive-light)_2.5px,transparent_2.5px)] [background-size:14px_14px] opacity-50" />
            <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-[18px] border border-line bg-white p-4 px-5 shadow-[var(--shadow-lg)] max-[760px]:bottom-[-16px] max-[760px]:left-0 max-[760px]:max-w-[calc(100%-8px)] max-[760px]:p-3">
              <Sprout size={24} className="text-olive" />
              <div>
                <strong className="block font-heading text-sm text-forest">
                  Farm to Fork
                </strong>
                <span className="text-[11.5px] text-muted">
                  Sustainable agriculture
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== ABOUT SPLIT ===== */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-2 items-center gap-16 max-[1024px]:grid-cols-1">
          <div className="overflow-hidden rounded-[48%_52%_40%_60%/55%_45%_55%_45%] shadow-[var(--shadow-default)]">
            <Image
              src={SITE.media.ceoPhoto2}
              alt="DENISCO farmland"
              width={600}
              height={400}
              className="h-[400px] w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow mb-4">About Denisco</span>
            <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
              Integrated Agriculture, Quality Production
            </h2>
            <p className="mb-5 text-muted">{SITE.about.philosophy}</p>
            <ul className="mb-6 space-y-3">
              {[
                "Seed to harvest value chain",
                "Modern, sustainable farming practices",
                "Expert agricultural consultation",
                "Quality products, fair pricing",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14.5px]"
                >
                  <CheckCircle
                    size={20}
                    className="mt-0.5 shrink-0 text-olive"
                  />
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Discover Our Story <ChevronRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="container">
          <SectionHead
            eyebrow="Our Products"
            title="Farm-Fresh Produce"
            description="Quality agricultural products from our integrated farm — poultry, livestock, crops and more."
          />
          <div className="grid grid-cols-4 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {/* Product cards will be populated from API — placeholder grid */}
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="flex flex-col"
              >
                <div className="h-[210px] rounded-[18px] bg-cream-deep shadow-[var(--shadow-default)]" />
                <div className="px-1 pt-[22px]">
                  <div className="mb-1.5 h-5 w-3/4 rounded bg-cream-deep" />
                  <div className="mb-3.5 h-3 w-full rounded bg-cream-deep" />
                  <div className="h-4 w-1/2 rounded bg-cream-deep" />
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
            >
              View All Products <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SERVICES PREVIEW ===== */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="container">
          <SectionHead
            eyebrow="What We Do"
            title="Our Services"
            description="Comprehensive agricultural services from seed production to value addition."
          />
          <div>
            {SITE.services.slice(0, 4).map((service, i) => (
              <div
                key={service.title}
                className="grid grid-cols-[90px_60px_1fr_auto] items-center gap-6 border-b border-line py-8 first:border-t max-[760px]:grid-cols-1 max-[760px]:gap-3 max-[760px]:text-left"
              >
                <span className="font-heading text-[40px] font-light text-transparent [-webkit-text-stroke:1.4px_var(--color-olive-light)] max-[760px]:hidden">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="grid size-[52px] place-items-center rounded-full bg-cream-deep text-xl text-forest">
                  <Sprout size={20} />
                </div>
                <div>
                  <h3 className="mb-1.5 text-[19px] font-semibold">
                    {service.title}
                  </h3>
                  <p className="m-0 max-w-[560px] text-[13.8px] text-muted">
                    {service.description}
                  </p>
                </div>
                <Link
                  href="/services"
                  className="shrink-0 rounded-full bg-cream-deep px-[18px] py-[9px] text-[12.5px] font-bold text-forest transition-all hover:bg-olive hover:text-white max-[760px]:self-start"
                >
                  Learn More
                </Link>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/services"
              className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
            >
              View All Services <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* ===== CEO SECTION ===== */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[0.8fr_1.2fr] items-center gap-16 max-[1024px]:grid-cols-1">
          <div>
            <div className="overflow-hidden rounded-[60%_40%_45%_55%/50%_60%_40%_50%] shadow-[var(--shadow-lg)]">
              <Image
                src={SITE.media.ceoPhoto2}
                alt={SITE.ceo.name}
                width={500}
                height={500}
                className="min-h-[360px] w-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="font-heading text-[80px] leading-[0.5] text-lime">
              &ldquo;
            </span>
            <p className="my-1.5 font-heading text-[22px] italic leading-[1.5] text-forest">
              {SITE.ceo.quote}
            </p>
            <p className="mt-[22px] font-heading text-base italic text-olive">
              — {SITE.ceo.name}, {SITE.ceo.title}
            </p>
          </div>
        </div>
      </section>

      {/* ===== FARM VIDEOS ===== */}
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container">
          <SectionHead
            eyebrow="From the Farm"
            title="See Our Work"
            description="Watch our CEO introduce the farm and share practical agricultural knowledge."
          />
          <div className="grid grid-cols-2 gap-[60px] max-[1024px]:grid-cols-1 max-sm:gap-[34px]">
            {Object.values(SITE.media.videos).map((video, i) => (
              <div
                key={video.label}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`relative w-full max-w-[380px] overflow-hidden rounded-3xl border-[6px] border-white bg-forest-deep shadow-[var(--shadow-lg)] [aspect-ratio:9/16] ${
                    i === 0 ? "-rotate-2" : "rotate-2"
                  }`}
                >
                  <video
                    poster={video.poster}
                    className="size-full object-cover"
                    preload="none"
                    controls
                  >
                    <source src={video.src} type="video/mp4" />
                  </video>
                  <button
                    type="button"
                    className="absolute inset-0 m-auto grid size-16 place-items-center rounded-full border-none bg-lime text-[22px] text-forest-deep shadow-[0_10px_24px_rgba(0,0,0,0.3)]"
                    aria-label={`Play ${video.label}`}
                  >
                    <Play size={22} fill="currentColor" />
                  </button>
                  <div className="absolute inset-x-3.5 bottom-3.5 rounded-[10px] bg-black/40 p-2 px-3 text-left text-[11.5px] text-white">
                    {video.label}
                  </div>
                </div>
                <h3 className="mt-6 text-[19px] font-semibold">{video.title}</h3>
                <p className="mt-1 max-w-[360px] text-center text-xs text-muted">
                  {video.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA BANNER ===== */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-[28px] bg-forest p-16 text-center text-white max-sm:p-6 max-sm:px-[22px]">
            <div className="absolute -right-[120px] -top-[160px] size-[340px] rounded-full bg-olive opacity-25" />
            <h2 className="relative text-[38px] font-semibold text-white max-sm:text-[31px]">
              Ready to Get Started?
            </h2>
            <p className="relative mx-auto mb-7 max-w-[560px] text-[#d3e7c8]">
              Whether you&rsquo;re looking for quality farm products, expert
              consultation, or agricultural training — we&rsquo;re here to help.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-[9px] rounded-full bg-lime px-7 py-[15px] text-sm font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-lime-deep"
              >
                Shop Products
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-[9px] rounded-full border-2 border-white/60 bg-transparent px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-forest"
              >
                Book Consultation
              </Link>
              <Link
                href="/contact"
                className="inline-flex items-center gap-[9px] rounded-full border-2 border-white/60 bg-transparent px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-forest"
              >
                Contact Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
