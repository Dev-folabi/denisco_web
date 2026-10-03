"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBasket, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { SITE } from "@/lib/constants";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Shop", href: "/shop" },
  { label: "Consultation", href: "/consultation" },
  { label: "Contact", href: "/contact" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const { isAuthenticated, user } = useAuth();
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[200] border-b border-line bg-cream">
      <div className="mx-auto flex max-w-[1220px] items-center gap-7 px-6 py-[18px] max-sm:gap-3 max-sm:px-[18px] max-sm:py-3">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          aria-label="DENISCO home"
        >
          <Image
            src={SITE.media.logo}
            alt="Denisco logo"
            width={54}
            height={54}
            className="size-[54px] shrink-0 rounded-full border border-line bg-white object-cover shadow-[var(--shadow-default)] max-sm:size-[44px]"
          />
          <span className="flex flex-col leading-tight max-[390px]:hidden">
            <strong className="font-heading text-[17px] font-bold tracking-[.2px] text-forest max-sm:text-[14px]">
              Denisco Global
            </strong>
            <small className="text-[10.5px] font-bold uppercase tracking-[1.6px] text-olive max-sm:text-[8.5px] max-sm:tracking-[1.2px]">
              Agriculture Ltd
            </small>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav
          className={`fixed right-[-320px] top-0 z-[250] flex h-dvh w-[min(82vw,300px)] flex-col gap-[6px] overflow-y-auto bg-white p-6 pt-24 shadow-lg transition-[right] duration-300 xl:static xl:m-auto xl:h-auto xl:w-auto xl:flex-row xl:gap-[30px] xl:overflow-visible xl:bg-transparent xl:p-0 xl:shadow-none ${
            mobileNavOpen ? "right-0 xl:right-auto" : ""
          }`}
          id="main-nav"
        >
          <div className="absolute left-[22px] right-[18px] top-5 flex items-center justify-between text-forest xl:hidden">
            <span className="font-heading text-xl font-bold">
              Explore Denisco
            </span>
            <button
              type="button"
              onClick={() => setMobileNavOpen(false)}
              className="grid size-[38px] place-items-center rounded-full border border-line bg-white text-forest"
              aria-label="Close navigation"
            >
              <X size={18} />
            </button>
          </div>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileNavOpen(false)}
              className={`relative rounded-xl px-3.5 py-[13px] text-sm font-semibold transition-colors xl:rounded-none xl:px-0 xl:py-2 ${
                isActive(link.href)
                  ? "bg-cream-deep text-forest xl:bg-transparent xl:after:absolute xl:after:bottom-0 xl:after:left-1/2 xl:after:h-0.5 xl:after:w-full xl:after:-translate-x-1/2 xl:after:bg-olive"
                  : "text-ink hover:bg-cream-deep hover:text-forest xl:hover:bg-transparent xl:hover:after:absolute xl:hover:after:bottom-0 xl:hover:after:left-1/2 xl:hover:after:h-0.5 xl:hover:after:w-full xl:hover:after:-translate-x-1/2 xl:hover:after:bg-olive"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Scrim */}
        <button
          type="button"
          className={`fixed inset-0 z-[240] border-0 bg-[rgba(14,34,19,0.52)] transition-all duration-250 xl:hidden ${
            mobileNavOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close navigation"
        />

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2.5 max-sm:gap-[7px] xl:ml-0">
          <form
            className="hidden items-center rounded-full border-[1.5px] border-line bg-white py-[5px] pl-4 pr-[5px] xl:flex"
            role="search"
            action="/shop"
          >
            <input
              type="search"
              name="search"
              placeholder="Search produce…"
              className="w-[140px] border-none bg-transparent text-[13px] outline-none"
            />
            <button
              type="submit"
              className="grid size-8 place-items-center rounded-full border-none bg-forest text-white"
              aria-label="Search"
            >
              <Search size={14} />
            </button>
          </form>

          <Link
            href="/cart"
            className="relative grid size-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white text-forest max-sm:size-10 max-[390px]:size-[38px]"
            aria-label="View cart"
          >
            <ShoppingBasket size={16} />
            <span className="absolute -right-[5px] -top-[5px] flex min-w-[18px] items-center justify-center rounded-full bg-clay px-1 text-[10px] font-extrabold text-white">
              0
            </span>
          </Link>

          {isAuthenticated ? (
            <Link
              href="/account"
              className="inline-flex items-center justify-center gap-[9px] rounded-full bg-forest px-[18px] py-[9px] text-[12.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive max-sm:size-[42px] max-sm:p-0 max-[390px]:size-[38px]"
            >
              <User size={14} />
              <span className="max-sm:hidden">
                {user?.first_name || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center justify-center gap-[9px] rounded-full bg-forest px-[18px] py-[9px] text-[12.5px] font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive max-sm:size-[42px] max-sm:p-0 max-[390px]:size-[38px]"
            >
              <User size={14} />
              <span className="max-sm:hidden">Login</span>
            </Link>
          )}

          <button
            type="button"
            className="grid size-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white text-forest max-sm:size-10 max-[390px]:size-[38px] xl:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation"
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
