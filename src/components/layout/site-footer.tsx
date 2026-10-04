import Link from "next/link";
import Image from "next/image";
import { MapPin, Phone, Mail } from "lucide-react";
import {
  FacebookIcon,
  InstagramIcon,
  XIcon,
  WhatsAppIcon,
} from "./social-icons";
import { SITE } from "@/lib/constants";

const SOCIAL_ICONS: Record<
  string,
  (props: { size?: number; className?: string }) => React.ReactElement
> = {
  facebook: FacebookIcon,
  instagram: InstagramIcon,
  twitter: XIcon,
  whatsapp: WhatsAppIcon,
};

export function SiteFooter() {
  return (
    <footer className="site-footer relative mt-[90px] overflow-hidden bg-forest-deep text-[#c7dcbe]">
      <div className="footer-watermark" aria-hidden="true">
        DENISCO
      </div>

      <div className="container footer-grid">
        {/* Brand column */}
        <div className="footer-col footer-brand">
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={SITE.media.logo}
              alt="Denisco logo"
              width={54}
              height={54}
              className="size-[54px] shrink-0 rounded-full border border-white/[.35] bg-white object-cover shadow-[var(--shadow-default)]"
            />
            <span className="flex flex-col leading-tight">
              <strong className="font-heading text-[17px] font-bold tracking-[.2px] text-white">
                Denisco Global
              </strong>
              <small className="text-[10.5px] font-bold uppercase tracking-[1.6px] text-olive">
                Agriculture Ltd
              </small>
            </span>
          </Link>
          <p className="my-4 max-w-[340px] text-[13.5px] text-[#a9c69d]">
            Integrated agriculture, quality production and sustainable value
            from seed to harvest.
          </p>
          <div className="socials">
            {SITE.socials.map((s) => {
              const Icon = SOCIAL_ICONS[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.url}
                  aria-label={s.label}
                  className="grid size-[38px] place-items-center rounded-full bg-white/[.08] text-white transition-colors hover:bg-olive-light"
                >
                  {Icon ? <Icon size={17} /> : null}
                </a>
              );
            })}
          </div>
          <small className="text-muted">
            Connect with Denisco Global Agriculture Limited.
          </small>
        </div>

        {/* Quick Links */}
        <div className="footer-col">
          <h4 className="mb-[18px] text-sm font-semibold uppercase tracking-[1px] text-white">
            Quick Links
          </h4>
          {[
            { label: "About Us", href: "/about" },
            { label: "Our Services", href: "/services" },
            { label: "Shop Products", href: "/shop" },
            { label: "Book Consultation", href: "/consultation" },
            { label: "Contact Us", href: "/contact" },
            { label: "Company Policy", href: "/policy" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mb-[11px] block text-sm text-[#a9c69d] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Farm Divisions */}
        <div className="footer-col">
          <h4 className="mb-[18px] text-sm font-semibold uppercase tracking-[1px] text-white">
            Farm Divisions
          </h4>
          {[
            { label: "Poultry Farming", href: "/shop?category=poultry" },
            { label: "Livestock Farming", href: "/shop?category=livestock" },
            { label: "Piggery", href: "/shop?category=piggery" },
            { label: "Snail Farming", href: "/shop?category=snail" },
            { label: "Crop Farming", href: "/shop?category=crops" },
          ].map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="mb-[11px] block text-sm text-[#a9c69d] transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Contact */}
        <div className="footer-col">
          <h4 className="mb-[18px] text-sm font-semibold uppercase tracking-[1px] text-white">
            Contact
          </h4>
          <p className="text-[13.5px] text-[#a9c69d]">
            <MapPin size={13.5} className="mr-1 inline-block" />{" "}
            {SITE.company.address}
          </p>
          <p className="text-[13.5px] text-[#a9c69d]">
            <Phone size={13.5} className="mr-1 inline-block" />{" "}
            {SITE.company.phone}
          </p>
          <p className="text-[13.5px] text-[#a9c69d]">
            <Mail size={13.5} className="mr-1 inline-block" />{" "}
            {SITE.company.email}
          </p>
        </div>
      </div>

      <div className="footer-bottom relative border-t border-white/10">
        <div className="container footer-bottom-inner">
          <span>
            &copy; {new Date().getFullYear()} DENISCO GLOBAL AGRICULTURE LTD.
            All rights reserved.
          </span>
          <Link
            href="/policy"
            className="text-[#847E6C] hover:text-forest"
          >
            Company Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
