import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/page-hero";
import { SectionHead } from "@/components/layout/section-head";
import { CompanyFlow } from "@/components/about/company-flow";
import { SITE } from "@/lib/constants";
import {
  Award,
  ShieldCheck,
  Leaf,
  Lightbulb,
  Users,
  Eye,
  Target,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about DENISCO Global Agriculture — our vision, mission, values, and integrated approach to sustainable farming in Nigeria.",
};

const VALUES = [
  {
    icon: Award,
    title: "Quality",
    description: "High standards in what we produce, purchase, process and deliver.",
  },
  {
    icon: ShieldCheck,
    title: "Integrity",
    description: "Honest, transparent and responsible business conduct.",
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description:
      "Responsible practices that protect productivity for the future.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Better methods, technology and practical solutions.",
  },
  {
    icon: Users,
    title: "People",
    description: "Dignity, teamwork, learning and community value.",
  },
];

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

      {/* ===== COMPANY OVERVIEW ===== */}
      <section className="section section-white">
        <div className="container split">
          <div>
            <span className="eyebrow">Company Overview</span>
            <h2>{SITE.about.purpose}</h2>
            <p className="muted">
              Denisco Global Agriculture Limited is an integrated agricultural
              enterprise creating value from the soil to the marketplace. Our
              work covers seed and crop production, livestock, poultry, snails,
              plantain and banana propagation, forage and feed, training,
              consulting and value addition.
            </p>
            <p className="muted">
              We believe good agriculture protects the resources on which future
              production depends and creates opportunities beyond the farm gate.
            </p>
            <p className="ceo-quote" style={{ fontSize: "19px" }}>
              {SITE.about.philosophy}
            </p>
          </div>
          <div className="img-blob">
            <Image
              src={SITE.media.workers}
              alt="Denisco farm operations"
              width={600}
              height={400}
            />
          </div>
        </div>
      </section>

      {/* ===== VISION & MISSION ===== */}
      <section className="section section-deep">
        <div className="container grid grid-2 gap-7">
          <div className="card p-9">
            <div className="service-icon">
              <Eye size={20} />
            </div>
            <h3>Our Vision</h3>
            <p className="muted">{SITE.about.vision}</p>
          </div>
          <div className="card p-9">
            <div className="service-icon">
              <Target size={20} />
            </div>
            <h3>Our Mission</h3>
            <p className="muted">{SITE.about.mission}</p>
          </div>
        </div>
      </section>

      {/* ===== CORE VALUES ===== */}
      <section className="section section-white">
        <div className="container">
          <SectionHead eyebrow="What Drives Us" title="Our Core Values" />
          <div className="grid grid-4 gap-7">
            {VALUES.map((value) => (
              <div className="card value-card" key={value.title}>
                <value.icon className="value-icon mx-auto" size={30} />
                <h4>{value.title}</h4>
                <p className="muted" style={{ fontSize: "13px" }}>
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== PURPOSE & PROMISE ===== */}
      <section className="section section-deep">
        <div
          className="container"
          style={{ textAlign: "center", maxWidth: "960px" }}
        >
          <span className="eyebrow">Our Purpose and Promise</span>
          <h2>{SITE.about.purpose}</h2>
          <p className="muted">
            At Denisco, agriculture is an opportunity to create wealth, build
            communities, develop people and secure the future. We seek to build
            a value chain where each enterprise strengthens the next.
          </p>
          <CompanyFlow />
          <p className="ceo-quote" style={{ fontSize: "19px" }}>
            {SITE.about.promise}
          </p>
        </div>
      </section>

      {/* ===== LEADERSHIP ===== */}
      <section className="section section-white">
        <div className="container ceo-section">
          <div className="ceo-photo">
            <div className="blob-frame">
              <Image
                src={SITE.media.ceoPhoto2}
                alt="Chief Executive Officer of Denisco Global Agriculture Limited"
                width={500}
                height={500}
              />
            </div>
          </div>
          <div>
            <span className="eyebrow">Leadership</span>
            <h2>{SITE.ceo.name}</h2>
            <p className="muted font-extrabold">{SITE.ceo.title}</p>
            <p className="muted">{SITE.ceo.quote}</p>
            <Link href="/policy" className="btn btn-primary">
              Read Our Company Policy
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
