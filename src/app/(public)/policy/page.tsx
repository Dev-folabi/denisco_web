import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";

export const metadata: Metadata = {
  title: "Company Policy",
  description:
    "DENISCO Global Agriculture's comprehensive company policy covering farming, animal welfare, food safety, and environmental responsibility.",
};

const POLICY_SECTIONS = [
  "Policy Statement",
  "Our Core Policy Principles",
  "Seed Production Policy",
  "Crop Production Policy",
  "Livestock Management Policy",
  "Poultry Production Policy",
  "Snail Farming Policy",
  "Plantain and Banana Propagation Policy",
  "Forage and Feed Policy",
  "Animal Health and Biosecurity Policy",
  "Food Safety and Product Quality Policy",
  "Environmental Management Policy",
  "Waste Management Policy",
  "Employee Conduct Policy",
  "Health and Safety Policy",
  "Customer Service Policy",
  "Supplier and Partner Policy",
  "Record-Keeping Policy",
  "Financial Responsibility Policy",
  "Community Responsibility Policy",
  "Training and Continuous Improvement Policy",
  "Compliance Policy",
  "Ethical Business Policy",
  "Integrated Farming Policy",
  "Policy on Sustainable Growth",
];

export default function PolicyPage() {
  return (
    <>
      <PageHero
        title="Company Policy"
        description="Our commitment to responsible, productive and sustainable agriculture."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Company Policy" },
        ]}
      />

      <section className="px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[260px_minmax(0,1fr)] items-start gap-[46px] max-[1024px]:grid-cols-1">
          {/* Sidebar nav */}
          <nav className="sticky top-[106px] max-h-[calc(100vh-128px)] overflow-auto rounded-[18px] border border-line bg-cream-deep p-5 max-[1024px]:static max-[1024px]:grid max-[1024px]:max-h-none max-[1024px]:grid-cols-2 max-[1024px]:gap-x-[18px] max-sm:block max-sm:p-[18px]">
            <h3 className="mb-[13px] text-[17px] font-semibold max-[1024px]:col-span-full">
              Policy Sections
            </h3>
            {POLICY_SECTIONS.map((title, i) => (
              <a
                key={i}
                href={`#policy-${i}`}
                className="block break-words border-b border-olive/[.16] py-2 text-[12.5px] font-bold text-olive transition-colors last:border-b-0 hover:text-forest"
              >
                {i + 1}. {title}
              </a>
            ))}
          </nav>

          {/* Content */}
          <div className="min-w-0">
            <div className="mb-7 rounded-[18px] border-l-4 border-olive bg-cream-deep p-7 max-sm:p-5">
              <p className="m-0 text-[14.5px] text-forest">
                Denisco Global Agriculture Limited is committed to building a
                responsible, productive and sustainable agricultural enterprise
                that creates value from the soil to the marketplace. Our
                approach is rooted in respect for the land, animals, people, food,
                resources and communities connected to our work.
              </p>
            </div>

            {POLICY_SECTIONS.map((title, i) => (
              <div
                key={i}
                id={`policy-${i}`}
                className="scroll-mt-[120px] border-b border-line py-7 last:border-b-0 max-sm:py-[23px]"
              >
                <span className="eyebrow mb-3">Section {i + 1}</span>
                <h2 className="text-[25px] font-semibold max-sm:text-[22px]">
                  {title}
                </h2>
                <p className="text-muted">
                  Policy content will be loaded from the data layer. This section
                  covers the key principles and requirements for {title.toLowerCase()}.
                </p>
              </div>
            ))}

            {/* Promise box */}
            <div className="mt-[46px] rounded-[28px] bg-forest p-[42px] text-white max-sm:mt-7 max-sm:p-5">
              <h2 className="mb-3 text-[28px] font-semibold text-white">
                Our Policy Promise
              </h2>
              <p className="text-[#d3e7c8]">
                We are committed to continuous improvement, responsible farming,
                and creating lasting value for our customers, communities, and
                the environment.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
