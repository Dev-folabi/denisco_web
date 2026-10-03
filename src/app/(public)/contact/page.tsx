import type { Metadata } from "next";
import { PageHero } from "@/components/layout/page-hero";
import { SITE } from "@/lib/constants";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with DENISCO Global Agriculture — visit our farm, call us, or send us a message.",
};

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

      <section className="px-6 py-24 max-sm:py-16">
        <div className="mx-auto grid max-w-[1220px] grid-cols-[1fr_1.2fr] gap-11 max-[1024px]:grid-cols-1 max-[760px]:gap-7">
          {/* Info Cards */}
          <div>
            {[
              {
                icon: MapPin,
                label: "Business Address",
                text: SITE.company.address,
              },
              {
                icon: Phone,
                label: "Phone",
                text: SITE.company.phone,
              },
              {
                icon: Mail,
                label: "Email",
                text: SITE.company.email,
              },
              {
                icon: Clock,
                label: "Business Hours",
                text: SITE.company.hours,
              },
            ].map((info) => (
              <div
                key={info.label}
                className="mb-4 flex gap-4 rounded-[18px] border border-line bg-white p-[22px] shadow-[var(--shadow-default)] max-[760px]:p-[17px]"
              >
                <div className="grid size-[42px] shrink-0 place-items-center rounded-full bg-cream-deep text-[19px] text-forest">
                  <info.icon size={19} />
                </div>
                <div>
                  <h4 className="mb-1 text-sm font-bold text-forest">
                    {info.label}
                  </h4>
                  <p className="m-0 break-words text-[13.5px] text-muted">
                    {info.text}
                  </p>
                </div>
              </div>
            ))}

            {/* Map placeholder */}
            <div className="mt-4 flex h-[230px] flex-col items-center justify-center gap-2 rounded-[18px] bg-[repeating-linear-gradient(45deg,var(--color-cream-deep),var(--color-cream-deep)_12px,#EBE3CE_12px,#EBE3CE_24px)] font-bold text-muted">
              <MapPin size={24} />
              Map coming soon
            </div>
          </div>

          {/* Contact Form */}
          <div className="rounded-[18px] border border-line bg-white p-9 shadow-[var(--shadow-default)]">
            <h3 className="mb-[22px] text-xl font-semibold">
              Send Us a Message
            </h3>
            <form>
              <div className="mb-5 grid grid-cols-2 gap-5 max-sm:grid-cols-1">
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none transition-colors focus:border-olive"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="mb-2 block text-[13px] font-bold text-forest">
                    Email Address
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none transition-colors focus:border-olive"
                    placeholder="you@example.com"
                  />
                </div>
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-[13px] font-bold text-forest">
                  Subject
                </label>
                <input
                  type="text"
                  className="w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none transition-colors focus:border-olive"
                  placeholder="How can we help?"
                />
              </div>
              <div className="mb-5">
                <label className="mb-2 block text-[13px] font-bold text-forest">
                  Message
                </label>
                <textarea
                  rows={5}
                  className="w-full resize-y rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none transition-colors focus:border-olive"
                  placeholder="Your message…"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
