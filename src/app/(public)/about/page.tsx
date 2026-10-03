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
  Eye,
  Target,
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
        title={`About ${SITE.company.name}`}
        description={SITE.company.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "About Us" },
        ]}
      />

      {/* Company overview */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-2 items-center gap-16 max-[1024px]:grid-cols-1">
          <div>
            <span className="eyebrow mb-4">Company Overview</span>
            <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
              {SITE.about.purpose}
            </h2>
            <p className="mb-4 text-muted">
              Denisco Global Agriculture Limited is an integrated agricultural
              enterprise creating value from the soil to the marketplace. Our
              work covers seed and crop production, livestock, poultry, snails,
              plantain and banana propagation, forage and feed, training,
              consulting and value addition.
            </p>
            <p className="mb-4 text-muted">
              We believe good agriculture protects the resources on which future
              production depends and creates opportunities beyond the farm gate.
            </p>
            <p className="font-heading text-[19px] italic leading-[1.5] text-forest">
              {SITE.about.philosophy}
            </p>
          </div>
          <div className="overflow-hidden rounded-[48%_52%_40%_60%/55%_45%_55%_45%] shadow-[var(--shadow-default)]">
            <Image
              src={SITE.media.farmland}
              alt="Denisco farm operations"
              width={600}
              height={400}
              className="h-[400px] w-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="grid grid-cols-2 gap-7 max-sm:grid-cols-1">
            <div className="rounded-[18px] border border-line bg-white p-9 shadow-[var(--shadow-default)]">
              <div className="mb-[18px] grid size-[52px] place-items-center rounded-full bg-cream-deep text-xl text-forest">
                <Eye size={22} />
              </div>
              <h3 className="mb-3 text-[19px] font-semibold">Our Vision</h3>
              <p className="text-[14.5px] text-muted">{SITE.about.vision}</p>
            </div>
            <div className="rounded-[18px] border border-line bg-white p-9 shadow-[var(--shadow-default)]">
              <div className="mb-[18px] grid size-[52px] place-items-center rounded-full bg-cream-deep text-xl text-forest">
                <Target size={22} />
              </div>
              <h3 className="mb-3 text-[19px] font-semibold">Our Mission</h3>
              <p className="text-[14.5px] text-muted">{SITE.about.mission}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="mx-auto mb-[54px] max-w-[620px] text-center">
            <span className="eyebrow mb-4">What Drives Us</span>
            <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
              Our Core Values
            </h2>
          </div>
          <div className="grid grid-cols-4 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {SITE.about.values.map((value) => {
              const Icon = VALUE_ICONS[value.icon] || Award;
              return (
                <div
                  key={value.title}
                  className="rounded-[18px] border border-line bg-white px-5 py-[30px] text-center transition-transform hover:-translate-y-1 shadow-[var(--shadow-default)]"
                >
                  <Icon size={30} className="mb-3.5 text-olive" />
                  <h4 className="mb-2 text-[16.5px] font-semibold">
                    {value.title}
                  </h4>
                  <p className="m-0 text-[13px] text-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Purpose & Promise */}
      <section className="bg-cream-deep px-6 py-24 text-center max-sm:py-16">
        <div className="container" style={{ maxWidth: "960px" }}>
          <span className="eyebrow mb-4">Our Purpose and Promise</span>
          <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
            {SITE.about.purpose}
          </h2>
          <p className="mx-auto mb-0 max-w-[560px] text-muted">
            At Denisco, agriculture is an opportunity to create wealth, build
            communities, develop people and secure the future. We seek to build
            a value chain where each enterprise strengthens the next.
          </p>
          <div className="mx-auto my-[26px] flex max-w-[700px] flex-wrap items-center justify-center gap-[9px]">
            {SITE.company.integratedFlow.map((step, i) => (
              <span key={step}>
                <span className="inline-block rounded-full border border-line bg-white px-3.5 py-2 text-xs font-extrabold text-forest">
                  {step}
                </span>
                {i < SITE.company.integratedFlow.length - 1 && (
                  <ArrowRight size={12} className="ml-2 inline text-olive" />
                )}
              </span>
            ))}
          </div>
          <p className="mx-auto max-w-[560px] font-heading text-[19px] italic text-forest">
            {SITE.about.promise}
          </p>
        </div>
      </section>

      {/* CEO Section */}
      <section className="bg-white px-6 py-24 max-sm:py-16">
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
            <h2 className="mb-1 text-[30px] font-semibold max-sm:text-[31px]">
              {SITE.ceo.name}
            </h2>
            <p className="mb-4 text-[13.5px] font-extrabold text-muted">
              {SITE.ceo.title}
            </p>
            <p className="mb-6 text-muted">
              {SITE.ceo.quote}
            </p>
            <Link
              href="/policy"
              className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Read Our Company Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
