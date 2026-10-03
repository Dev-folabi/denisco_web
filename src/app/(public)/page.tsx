import Image from "next/image";
import Link from "next/link";
import { SectionHead } from "@/components/layout/section-head";
import { SITE } from "@/lib/constants";
import {
  Sprout,
  Leaf,
  Users,
  Check,
  ArrowRight,
  Wheat,
  Beef,
  Egg,
  Shell,
  TreeDeciduous,
  RefreshCcw,
  Compass,
  MessageCircle,
  Presentation,
  PackageOpen,
} from "lucide-react";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  Sprout,
  Wheat,
  Beef,
  Egg,
  Shell,
  TreeDeciduous,
  Leaf,
  RefreshCcw,
  Compass,
  MessageCircle,
  Presentation,
  PackageOpen,
};

export default function HomePage() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section className="px-6 py-[70px] pb-[100px] max-[760px]:py-12 max-[760px]:pb-[74px]">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[1.05fr_0.95fr] items-center gap-[60px] max-[1024px]:grid-cols-1 max-[760px]:gap-9">
          <div>
            <span className="eyebrow mb-4">Integrated Agriculture</span>
            <h1 className="mb-5 text-[min(6vw,50px)] leading-[1.1] max-[760px]:text-[clamp(30px,10vw,40px)] max-sm:text-[32px]">
              Growing with Nature.{" "}
              <em className="relative not-italic text-forest">
                Creating Value
                <span className="absolute -left-1 bottom-1.5 -right-1 -z-10 h-3.5 bg-lime opacity-70" />
              </em>{" "}
              for Life.
            </h1>
            <p className="max-w-[480px] text-[17px] text-muted">
              Denisco Global Agriculture Limited builds sustainable value from
              seed to harvest through responsible production, practical
              knowledge and integrated farming.
            </p>
            <div className="mt-[30px] mb-[38px] flex flex-wrap gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-[9px] rounded-full bg-lime px-7 py-[15px] text-sm font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-lime-deep"
              >
                Explore Our Products
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-[9px] rounded-full border-2 border-forest bg-transparent px-7 py-[15px] text-sm font-bold text-forest transition-all hover:-translate-y-0.5 hover:bg-forest hover:text-white"
              >
                Book a Consultation
              </Link>
            </div>
            <div className="flex flex-wrap gap-[30px] max-[760px]:gap-3.5">
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-forest">
                <Leaf size={17} className="text-olive" />
                Sustainable Practices
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-forest">
                <Sprout size={17} className="text-olive" />
                Integrated Agriculture
              </div>
              <div className="flex items-center gap-2.5 text-[13px] font-bold text-forest">
                <Users size={17} className="text-olive" />
                Practical Training
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="overflow-hidden rounded-[38%_62%_65%_35%/48%_42%_58%_52%] shadow-[var(--shadow-lg)]">
              <div className="h-[480px] bg-cream-deep max-[1024px]:h-[340px] max-[760px]:h-[300px]">
                <Image
                  src={SITE.media.heroImage}
                  alt="Integrated farm operations at Denisco Global Agriculture Limited"
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
                  From Seed to Harvest
                </strong>
                <span className="text-[11.5px] text-muted">
                  Creating value across the value chain
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
              src={SITE.media.farmland}
              alt="Denisco agricultural land"
              width={600}
              height={400}
              className="h-[400px] w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow mb-4">Who We Are</span>
            <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
              An Integrated Agricultural Enterprise
            </h2>
            <p className="mb-5 text-muted">
              We produce crops, livestock, poultry and related agricultural
              products while creating opportunities through seed development,
              plantain and banana propagation, forage and feed production,
              consulting, training and value addition.
            </p>
            <ul className="mb-6 space-y-3">
              {[
                "Quality production from soil to marketplace",
                "Responsible care for land, animals and people",
                "Knowledge that supports farmers and communities",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-[14.5px]"
                >
                  <span className="mt-[3px] flex size-5 shrink-0 items-center justify-center rounded-full bg-olive text-[10px] text-white">
                    <Check size={10} strokeWidth={3} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Link
              href="/about"
              className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Discover Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FEATURED PRODUCTS ===== */}
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container">
          <SectionHead
            eyebrow="Featured Products"
            title="Fresh From Our Farms"
            description="A selection of available livestock, poultry and crop products."
          />
          <div className="grid grid-cols-4 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex flex-col">
                <div className="h-[210px] rounded-[18px] bg-white/60 shadow-[var(--shadow-default)]" />
                <div className="px-1 pt-[22px]">
                  <div className="mb-1.5 h-5 w-3/4 rounded bg-white/60" />
                  <div className="mb-3.5 h-3 w-full rounded bg-white/60" />
                  <div className="h-4 w-1/2 rounded bg-white/60" />
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
            title="Our Agricultural Services"
            description="Practical, integrated services designed to grow productivity and sustainable value."
          />
          <div>
            {SITE.services.slice(0, 4).map((service, i) => {
              const Icon = SERVICE_ICONS[service.icon] || Sprout;
              return (
                <div
                  key={service.title}
                  className="grid grid-cols-[90px_60px_1fr_auto] items-center gap-6 border-b border-line py-8 first:border-t max-[760px]:grid-cols-1 max-[760px]:gap-3 max-[760px]:text-left"
                >
                  <span className="font-heading text-[40px] font-light text-transparent [-webkit-text-stroke:1.4px_var(--color-olive-light)] max-[760px]:hidden">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className="grid size-[52px] place-items-center rounded-full bg-cream-deep text-xl text-forest">
                    <Icon size={20} />
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
              );
            })}
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
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[0.8fr_1.2fr] items-center gap-16 max-[1024px]:grid-cols-1">
          <div>
            <div className="overflow-hidden rounded-[60%_40%_45%_55%/50%_60%_40%_50%] shadow-[var(--shadow-lg)]">
              <Image
                src={SITE.media.ceoPhoto1}
                alt={`${SITE.ceo.name}, ${SITE.ceo.title}`}
                width={500}
                height={500}
                className="min-h-[360px] w-full object-cover"
              />
            </div>
          </div>
          <div>
            <span className="eyebrow mb-4">Meet Our CEO</span>
            <h2 className="mb-1 text-[30px] font-semibold max-sm:text-[31px]">
              {SITE.ceo.name}
            </h2>
            <p className="mb-2 text-[13.5px] font-extrabold tracking-[0.4px] text-muted">
              {SITE.ceo.title}
            </p>
            <span className="block font-heading text-[80px] leading-[0.5] text-lime">
              &ldquo;
            </span>
            <p className="my-1.5 font-heading text-[22px] italic leading-[1.5] text-forest">
              {SITE.ceo.hero_quote}
            </p>
            <p className="mt-[22px] font-heading text-base italic text-olive">
              — {SITE.ceo.name}, CEO
            </p>
            <Link
              href="/about"
              className="mt-[10px] inline-flex items-center gap-[9px] rounded-full bg-cream-deep px-[18px] py-[9px] text-[12.5px] font-bold text-forest transition-all hover:bg-olive hover:text-white"
            >
              Read Our Story
            </Link>
          </div>
        </div>
      </section>

      {/* ===== FARM VIDEOS ===== */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="container">
          <SectionHead
            eyebrow="Farm Footage"
            title="See Our Farm In Motion"
            description="Meet the leadership and explore agricultural knowledge from Denisco."
          />
          <div className="grid grid-cols-2 gap-[60px] max-[1024px]:grid-cols-1 max-sm:gap-[34px]">
            {Object.values(SITE.media.videos).map((video, i) => (
              <div
                key={video.label}
                className="flex flex-col items-center text-center"
              >
                <div
                  className={`relative w-full max-w-[280px] overflow-hidden rounded-3xl border-[6px] border-white bg-forest-deep shadow-[var(--shadow-lg)] [aspect-ratio:9/16] max-[760px]:max-w-[380px] ${
                    i === 0 ? "-rotate-2" : "rotate-2"
                  }`}
                >
                  <video
                    poster={video.poster}
                    className="size-full object-cover"
                    preload="metadata"
                    controls
                    aria-label={video.title}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support embedded video.{" "}
                    <a href={video.src}>Open the video</a>.
                  </video>
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
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="relative overflow-hidden rounded-[28px] bg-forest p-16 text-center text-white max-sm:p-[40px] max-sm:px-[22px]">
            <div className="absolute -right-[120px] -top-[160px] size-[340px] rounded-full bg-olive opacity-25" />
            <h2 className="relative text-[38px] font-semibold text-white max-sm:text-[31px]">
              Ready to Grow With Denisco?
            </h2>
            <p className="relative mx-auto mb-7 max-w-[560px] text-[#d3e7c8]">
              Explore our products, build agricultural knowledge or speak with
              our team about your farm.
            </p>
            <div className="relative flex flex-wrap justify-center gap-4">
              <Link
                href="/shop"
                className="inline-flex items-center gap-[9px] rounded-full bg-lime px-7 py-[15px] text-sm font-bold text-forest-deep transition-all hover:-translate-y-0.5 hover:bg-lime-deep"
              >
                Explore Products
              </Link>
              <Link
                href="/consultation"
                className="inline-flex items-center gap-[9px] rounded-full border-2 border-white/60 bg-transparent px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-forest"
              >
                Book a Consultation
              </Link>
              <Link
                href="/policy"
                className="inline-flex items-center gap-[9px] rounded-full border-2 border-white/60 bg-transparent px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-white hover:text-forest"
              >
                Read Our Policy
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
