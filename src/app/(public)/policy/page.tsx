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

      <section className="section section-white">
        <div className="container policy-layout">
          {/* Sidebar nav */}
          <aside className="policy-nav">
            <h3>Policy Contents</h3>
            {COMPANY_POLICY.map((section, i) => (
              <Link key={i} href={`#policy-${i + 1}`}>
                {i + 1}. {section.title}
              </Link>
            ))}
          </aside>

          {/* Content */}
          <div className="policy-content">
            {/* Intro box */}
            <div className="policy-intro">
              <span className="eyebrow">DENISCO GLOBAL AGRICULTURE LIMITED</span>
              <h2>Growing With Nature. Creating Value for Life.</h2>
              <p>
                Our company policy guides responsible, productive and
                sustainable agriculture throughout our operations.
              </p>
            </div>

            {COMPANY_POLICY.map((section, i) => (
              <article key={i} id={`policy-${i + 1}`} className="policy-section">
                <span className="eyebrow">Policy {i + 1}</span>
                <h2>{section.title}</h2>
                {section.paragraphs.map((para, j) => (
                  <p key={j}>{para}</p>
                ))}
                {section.items.length > 0 && (
                  <ul className="policy-list">
                    {section.items.map((item, k) => (
                      <li key={k}>{item}</li>
                    ))}
                  </ul>
                )}
                {section.principle && (
                  <p className="policy-principle">{section.principle}</p>
                )}
              </article>
            ))}

            {/* Promise box */}
            <div className="policy-promise">
              <h2>Denisco&apos;s Policy Promise</h2>
              <p>
                At Denisco Global Agriculture Limited, agriculture is more than
                the production of food. It is about land, life, people,
                livelihood and the future.
              </p>
              <p>
                We commit to farming responsibly, producing carefully, treating
                animals humanely, respecting our people, protecting natural
                resources, serving customers honestly and continuously improving
                the way we work.
              </p>
              <p>
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
