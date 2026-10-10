import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = pageMetadata({
  title: "Contact Us",
  description:
"Get in touch with DENISCO Global Agriculture — visit our farm, call us, or send us a message.",
  path: "/contact",
});

const INFO_CARDS = [
  { icon: MapPin, label: "Business Address", text: SITE.company.address },
  { icon: Phone, label: "Phone", text: SITE.company.phone },
  { icon: Mail, label: "Email", text: SITE.company.email },
  {
    icon: Clock,
    label: "Business Hours",
    text: SITE.company.hours,
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        title="Contact Us"
        description="We'd love to hear from you. Reach out with any questions about our products or services."
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Contact" },
        ]}
      />

      <section className="section section-white">
        <div className="container contact-grid">
          {/* Info Cards */}
          <div>
            {INFO_CARDS.map((info) => (
              <div key={info.label} className="card contact-info-card">
                <span className="contact-icon">
                  <info.icon size={19} />
                </span>
                <div>
                  <strong>{info.label}</strong>
                  <p className="muted" style={{ margin: 0 }}>
                    {info.text}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Form */}
          <div className="card" style={{ padding: 36 }}>
            <h3>Send Us a Message</h3>
            <ContactForm />
          </div>
        </div>
      </section>
    </>
  );
}
