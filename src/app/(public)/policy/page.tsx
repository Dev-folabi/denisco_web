import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import { COMPANY_POLICY } from "@/lib/constants/policy";

export const metadata: Metadata = {
  title: "Company Policy",
  description:
    "DENISCO Global Agriculture's comprehensive company policy covering farming, animal welfare, food safety, and environmental responsibility.",
};

export default function PolicyPage() {
  return (
    <>
      <PageHero
        title="Company Policy"
        description={SITE.company.tagline}
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company Policy" },
        ]}
      />

      <section className="bg-white px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[260px_minmax(0,1fr)] items-start gap-[46px] max-[1024px]:grid-cols-1">
          {/* Sidebar nav */}
          <nav className="sticky top-[106px] max-h-[calc(100vh-128px)] overflow-auto rounded-[18px] border border-line bg-cream-deep p-5 max-[1024px]:static max-[1024px]:grid max-[1024px]:max-h-none max-[1024px]:grid-cols-2 max-[1024px]:gap-x-[18px] max-sm:block max-sm:p-[18px]">
            <h3 className="mb-[13px] text-[17px] font-semibold max-[1024px]:col-span-full">
              Policy Contents
            </h3>
            {COMPANY_POLICY.map((section, i) => (
              <a
                key={i}
                href={`#policy-${i + 1}`}
                className="block break-words border-b border-olive/[.16] py-2 text-[12.5px] font-bold text-olive transition-colors last:border-b-0 hover:text-forest max-sm:overflow-wrap-anywhere"
              >
                {i + 1}. {section.title}
              </a>
            ))}
          </nav>

          {/* Content */}
          <div className="min-w-0">
            {/* Intro box */}
            <div className="mb-7 rounded-[18px] border-l-4 border-olive bg-cream-deep p-7 max-sm:p-5">
              <span className="eyebrow mb-2">DENISCO GLOBAL AGRICULTURE LIMITED</span>
              <h2 className="mb-3 text-[25px] font-semibold">
                Growing With Nature. Creating Value for Life.
              </h2>
              <p className="m-0 text-[14.5px] text-muted">
                Our company policy guides responsible, productive and sustainable
                agriculture throughout our operations.
              </p>
            </div>

            {COMPANY_POLICY.map((section, i) => (
              <article
                key={i}
                id={`policy-${i + 1}`}
                className="scroll-mt-[120px] border-b border-line py-7 last:border-b-0 max-sm:py-[23px]"
              >
                <span className="eyebrow mb-3">Policy {i + 1}</span>
                <h2 className="mb-4 text-[25px] font-semibold max-sm:text-[22px]">
                  {section.title}
                </h2>
                {section.paragraphs.map((para, j) => (
                  <p key={j} className="text-muted">
                    {para}
                  </p>
                ))}
                {section.items.length > 0 && (
                  <ul className="mt-[18px] grid grid-cols-2 gap-x-[22px] gap-y-2 max-sm:grid-cols-1">
                    {section.items.map((item, k) => (
                      <li
                        key={k}
                        className="flex gap-[9px] text-[13.5px] before:mt-[2px] before:font-extrabold before:text-olive before:content-['•']"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
                {section.principle && (
                  <p className="mt-4 border-l-[3px] border-lime-deep bg-[#f6fae9] px-[15px] py-[10px] font-heading italic text-forest">
                    {section.principle}
                  </p>
                )}
              </article>
            ))}

            {/* Promise box */}
            <div className="mt-[46px] rounded-[28px] bg-forest p-[42px] text-white max-sm:mt-7 max-sm:p-5">
              <h2 className="mb-3 text-[28px] font-semibold text-white">
                Denisco&rsquo;s Policy Promise
              </h2>
              <p className="text-[#d3e7c8]">
                At Denisco Global Agriculture Limited, agriculture is more than
                the production of food. It is about land, life, people,
                livelihood and the future.
              </p>
              <p className="text-[#d3e7c8]">
                We commit to farming responsibly, producing carefully, treating
                animals humanely, respecting our people, protecting natural
                resources, serving customers honestly and continuously improving
                the way we work.
              </p>
              <p className="text-[#d3e7c8]">
                We will grow with nature rather than against it and build value
                today while protecting the opportunity to produce tomorrow.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
