import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHead } from "@/components/layout/section-head";
import { CompanyFlow } from "@/components/about/company-flow";
import { ServiceIcon } from "@/components/services/service-icon";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = pageMetadata({
  title: "Our Services",
  description:
"Explore DENISCO's 12 agricultural services — from seed production to value addition, farm development, consulting, and training.",
  path: "/services",
});

export default function ServicesPage() {
  return (
    <>
      <PageHero
        title="Our Agricultural Services"
        description="Integrated agriculture, quality production and sustainable value across the agricultural value chain."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Services" },
        ]}
      />

      {/* ===== SERVICE DETAIL GRID ===== */}
      <section className="section section-white">
        <div className="container">
          <SectionHead
            eyebrow="Integrated Agriculture"
            title="Services Built for Productive Growth"
            description="From quality planting materials to farm management, training and value addition."
          />
          <div className="service-detail-grid">
            {SITE.services.map((service) => (
              <article
                className="card service-detail-card"
                key={service.title}
              >
                <div className="service-icon">
                  <ServiceIcon service={service} />
                </div>
                <h3>{service.title}</h3>
                <p className="muted">{service.description}</p>
                <ul>
                  {service.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ===== VALUE CHAIN + CTA ===== */}
      <section className="section section-deep">
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: "980px" }}
        >
          <span className="eyebrow">Denisco Agricultural Value Chain</span>
          <h2>Connected Enterprises. Responsible Value.</h2>
          <CompanyFlow />
          <p className="muted">
            This integrated approach supports better resource utilization,
            reduced waste, diversification and greater resilience.
          </p>
          <Link href="/consultation" className="btn btn-primary">
            Book a Consultation
          </Link>
        </div>
      </section>
    </>
  );
}
