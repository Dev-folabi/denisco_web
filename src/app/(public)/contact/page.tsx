import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { Button } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DENISCO Global Agriculture — visit our farm, call us, or send us a message.",
};

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
            <form>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="ct-name">Full Name</label>
                  <input
                    type="text"
                    id="ct-name"
                    className="form-control"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="ct-email">Email Address</label>
                  <input
                    type="email"
                    id="ct-email"
                    className="form-control"
                    required
                  />
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="ct-subject">Subject</label>
                <input
                  type="text"
                  id="ct-subject"
                  className="form-control"
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="ct-msg">Message</label>
                <textarea
                  id="ct-msg"
                  rows={5}
                  className="form-control"
                  required
                />
              </div>
              <Button type="submit" variant="primary" block>
                Send Message
              </Button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
