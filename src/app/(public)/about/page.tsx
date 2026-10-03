import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import {
  Award,
  Shield,
  Leaf,
  Lightbulb,
  Heart,
  ChevronRight,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DENISCO Global Agriculture — our vision, mission, values, and integrated approach to sustainable farming in Nigeria.",
};

const VALUE_ICONS: Record<string, React.ElementType> = {
  Award,
  Shield,
  Leaf,
  Lightbulb,
  Heart,
};

export default function AboutPage() {
  return (
    <>
      <PageHero
        title="About Us"
        description="Integrated agriculture, quality production, and sustainable value — from seed to harvest."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* Company overview */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-2 items-center gap-16 max-[1024px]:grid-cols-1">
          <div className="overflow-hidden rounded-[48%_52%_40%_60%/55%_45%_55%_45%] shadow-[var(--shadow-default)]">
            <Image
              src={SITE.media.ceoPhoto1}
              alt="DENISCO farm overview"
              width={600}
              height={400}
              className="h-[400px] w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow mb-4">Our Philosophy</span>
            <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
              {SITE.about.philosophy}
            </h2>
            <p className="text-muted">
              DENISCO Global Agriculture Limited is an integrated agricultural
              enterprise focused on quality production, responsible farming, and
              creating value from the soil to the marketplace. Our approach
              combines modern farming methods with sustainable practices that
              protect the land and nourish communities.
            </p>
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-7 max-sm:grid-cols-1">
            <div className="rounded-[18px] border border-line bg-white p-8 shadow-[var(--shadow-default)]">
              <span className="eyebrow mb-4">Our Vision</span>
              <h3 className="mb-4 text-[22px] font-semibold">
                Where We&rsquo;re Going
              </h3>
              <p className="text-[14.5px] text-muted">{SITE.about.vision}</p>
            </div>
            <div className="rounded-[18px] border border-line bg-white p-8 shadow-[var(--shadow-default)]">
              <span className="eyebrow mb-4">Our Mission</span>
              <h3 className="mb-4 text-[22px] font-semibold">
                What We Do
              </h3>
              <p className="text-[14.5px] text-muted">{SITE.about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="mx-auto mb-[54px] max-w-[620px] text-center">
            <span className="eyebrow mb-4">What Guides Us</span>
            <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-5 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {SITE.about.values.map((value) => {
              const Icon = VALUE_ICONS[value.icon] || Award;
              return (
                <div
                  key={value.title}
                  className="rounded-[18px] border border-line bg-white p-6 text-center shadow-[var(--shadow-default)] transition-transform hover:-translate-y-1"
                >
                  <Icon size={30} className="mx-auto mb-3.5 text-olive" />
                  <h4 className="mb-2 text-[16.5px] font-semibold">
                    {value.title}
                  </h4>
                  <p className="m-0 text-[12.8px] text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purpose & Promise */}
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container text-center">
          <span className="eyebrow mb-4">Our Purpose</span>
          <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
            {SITE.about.purpose}
          </h2>
          <div className="mx-auto my-6 flex max-w-[700px] flex-wrap items-center justify-center gap-[9px]">
            {SITE.company.integratedFlow.map((step, i) => (
              <span key={step}>
                <span className="inline-block rounded-full border border-line bg-cream-deep px-3.5 py-2 text-xs font-extrabold text-forest">
                  {step}
                </span>
                {i < SITE.company.integratedFlow.length - 1 && (
                  <ArrowRight
                    size={12}
                    className="ml-2 inline text-olive"
                  />
                )}
              </span>
            ))}
          </div>
          <p className="mx-auto max-w-[560px] font-heading text-lg italic text-forest">
            &ldquo;{SITE.about.promise}&rdquo;
          </p>
        </div>
      </section>

      {/* CEO Section */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[0.8fr_1.2fr] items-center gap-16 max-[1024px]:grid-cols-1">
          <div className="overflow-hidden rounded-[60%_40%_45%_55%/50%_60%_40%_50%] shadow-[var(--shadow-lg)]">
            <Image
              src={SITE.media.ceoPhoto2}
              alt={SITE.ceo.name}
              width={500}
              height={500}
              className="min-h-[360px] w-full object-cover"
            />
          </div>
          <div>
            <span className="eyebrow mb-4">Leadership</span>
            <h2 className="mb-4 text-[38px] font-semibold max-sm:text-[31px]">
              Meet Our CEO
            </h2>
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
    </>
  );
}
