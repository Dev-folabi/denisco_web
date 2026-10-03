import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/lib/constants";

export function SiteFooter() {
  return (
    <footer className="relative mt-[90px] overflow-hidden bg-forest-deep text-[#c7dcbe]">
      <div className="pointer-events-none absolute bottom-[-60px] left-0 right-0 text-center font-heading text-[min(18vw,220px)] font-black leading-none text-white/[.03]">
        DENISCO
      </div>

      <div className="relative mx-auto grid max-w-[1220px] grid-cols-[2fr_1fr_1fr_1.3fr] gap-10 px-6 pb-11 pt-[70px] max-[860px]:grid-cols-2 max-sm:grid-cols-1">
        {/* Brand column */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <Image
              src={SITE.media.logo}
              alt="Denisco logo"
              width={54}
              height={54}
              className="size-[54px] rounded-full border border-white/[.35] bg-white object-cover"
            />
            <span className="flex flex-col leading-tight">
              <strong className="font-heading text-[17px] font-bold text-white">
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
          <div className="mb-2.5 flex gap-2.5">
            {SITE.socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="grid size-[38px] place-items-center rounded-full bg-white/[.08] text-white transition-colors hover:bg-olive-light"
              >
                <span className="text-sm">{s.icon}</span>
              </a>
            ))}
          </div>
          <small className="text-muted">
            Connect with Denisco Global Agriculture Limited.
          </small>
        </div>

        {/* Quick Links */}
        <div>
          <h4 className="mb-[18px] text-sm font-bold uppercase tracking-[1px] text-white">
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
        <div>
          <h4 className="mb-[18px] text-sm font-bold uppercase tracking-[1px] text-white">
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
        <div>
          <h4 className="mb-[18px] text-sm font-bold uppercase tracking-[1px] text-white">
            Contact
          </h4>
          <p className="text-[13.5px] text-[#a9c69d]">
            📍 {SITE.company.address}
          </p>
          <p className="text-[13.5px] text-[#a9c69d]">
            📞 {SITE.company.phone}
          </p>
          <p className="text-[13.5px] text-[#a9c69d]">
            ✉️ {SITE.company.email}
          </p>
        </div>
      </div>

      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-[1220px] flex-wrap items-center justify-between gap-1.5 px-6 py-5 text-xs text-[#93b087]">
          <span>
            &copy; {new Date().getFullYear()} DENISCO GLOBAL AGRICULTURE LTD.
            All rights reserved.
          </span>
          <Link href="/policy" className="text-[#93b087] hover:text-white">
            Company Policy
          </Link>
        </div>
      </div>
    </footer>
  );
}
