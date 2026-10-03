import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import {
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
  ArrowRight,
  CheckCircle,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Our Services",
  description:
    "Explore DENISCO's 12 agricultural services — from seed production to value addition, farm development, consulting, and training.",
};

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

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Services"
        description="Comprehensive agricultural services spanning the entire value chain — from seed to market."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {/* Service Detail Grid */}
      <section className="px-6 py-24 max-sm:py-16">
        <div className="container">
          <div className="grid grid-cols-3 gap-[22px] max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
            {SITE.services.map((service) => {
              const Icon = SERVICE_ICONS[service.icon] || Sprout;
              return (
                <div
                  key={service.title}
                  className="flex flex-col rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] transition-transform hover:-translate-y-1 max-sm:p-[22px]"
                >
                  <div className="mb-[18px] grid size-[52px] place-items-center rounded-full bg-cream-deep text-xl text-forest">
                    <Icon size={22} />
                  </div>
                  <h3 className="mb-1.5 text-xl font-semibold">
                    {service.title}
                  </h3>
                  <p className="mb-3 text-[13.8px] text-muted">
                    {service.description}
                  </p>
                  <ul className="mt-auto pt-3">
                    {service.items.map((item) => (
                      <li
                        key={item}
                        className="relative mb-1.5 pl-4 text-[12.5px] text-muted before:absolute before:left-0 before:font-extrabold before:text-olive before:content-['✓']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Value Chain + CTA */}
      <section className="bg-cream-deep px-6 py-24 max-sm:py-16">
        <div className="container text-center">
          <span className="eyebrow mb-4">Integrated Value Chain</span>
          <h2 className="text-[38px] font-semibold max-sm:text-[31px]">
            From Seed to Market
          </h2>
          <div className="mx-auto my-6 flex max-w-[700px] flex-wrap items-center justify-center gap-[9px]">
            {SITE.company.integratedFlow.map((step, i) => (
              <span key={step}>
                <span className="inline-block rounded-full border border-line bg-cream-deep px-3.5 py-2 text-xs font-extrabold text-forest">
                  {step}
                </span>
                {i < SITE.company.integratedFlow.length - 1 && (
                  <ArrowRight size={12} className="ml-2 inline text-olive" />
                )}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <Link
              href="/consultation"
              className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
            >
              Book a Consultation <ArrowRight size={16} />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
