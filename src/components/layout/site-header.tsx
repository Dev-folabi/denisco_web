"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { ShoppingBasket, User, Menu, X, Search } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";
import { useCart } from "@/features/cart/hooks";
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
  const { data: cart } = useCart();
  const cartCount = cart?.item_count ?? 0;
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header className="sticky top-0 z-[200] border-b border-line bg-cream">
      <div className="container header-main-inner">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-3"
          // The accessible name has to contain the visible text, or a voice
          // control user asking for "Denisco Global" cannot reach it.
          aria-label="Denisco Global Agriculture Ltd home"
        >
          <Image
            src={SITE.media.logo}
            alt="Denisco Global Agriculture Limited logo"
            width={54}
            height={54}
            className="size-[54px] shrink-0 rounded-full border border-line bg-white object-cover shadow-[var(--shadow-default)] [@media(max-width:640px)]:size-[44px]"
          />
          <span className="flex flex-col leading-tight [@media(max-width:390px)]:hidden">
            <strong className="font-heading text-[17px] font-bold tracking-[.2px] text-forest [@media(max-width:640px)]:text-[14px]">
              Denisco Global
            </strong>
            <small className="text-[10.5px] font-bold uppercase tracking-[1.6px] text-olive [@media(max-width:640px)]:text-[8.5px] [@media(max-width:640px)]:tracking-[1.2px]">
              Agriculture Ltd
            </small>
          </span>
        </Link>

        {/* Nav — off-canvas panel ≤1240px, horizontal ≥1241px */}
        <nav
          className={`fixed top-0 z-[250] flex h-dvh w-[min(82vw,300px)] flex-col gap-[6px] overflow-y-auto bg-white pb-7 pt-[88px] pr-6 pl-6 shadow-lg transition-[right] duration-300 min-[1241px]:static min-[1241px]:m-auto min-[1241px]:h-auto min-[1241px]:w-auto min-[1241px]:flex-row min-[1241px]:gap-[30px] min-[1241px]:overflow-visible min-[1241px]:bg-transparent min-[1241px]:p-0 min-[1241px]:shadow-none [@media(max-width:760px)]:top-2 [@media(max-width:760px)]:h-[calc(100dvh-16px)] [@media(max-width:760px)]:w-[calc(100vw-16px)] [@media(max-width:760px)]:max-w-none [@media(max-width:760px)]:gap-[7px] [@media(max-width:760px)]:border [@media(max-width:760px)]:border-line [@media(max-width:760px)]:rounded-3xl [@media(max-width:760px)]:p-[86px_18px_22px] ${
            mobileNavOpen
              ? "right-0 [@media(max-width:760px)]:right-2 min-[1241px]:right-auto"
              : "right-[-320px] [@media(max-width:760px)]:right-[-110%] min-[1241px]:right-auto"
          }`}
          id="main-nav"
          aria-label="Primary navigation"
        >
          <div className="absolute left-[22px] right-[18px] top-5 flex items-center justify-between text-forest min-[1241px]:hidden [@media(max-width:760px)]:left-5 [@media(max-width:760px)]:right-4 [@media(max-width:760px)]:top-[18px]">
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
              className={`relative text-sm font-semibold transition-all duration-[250ms] min-[1241px]:px-0 min-[1241px]:py-2 min-[1241px]:after:absolute min-[1241px]:after:bottom-0 min-[1241px]:after:left-1/2 min-[1241px]:after:h-0.5 min-[1241px]:after:w-0 min-[1241px]:after:-translate-x-1/2 min-[1241px]:after:bg-olive min-[1241px]:after:transition-all min-[1241px]:after:duration-[250ms] min-[1241px]:after:content-[''] [@media(max-width:1240px)]:rounded-xl [@media(max-width:1240px)]:border-0 [@media(max-width:1240px)]:px-3.5 [@media(max-width:1240px)]:py-[13px] [@media(max-width:760px)]:text-[15px] [@media(max-width:760px)]:px-4 [@media(max-width:760px)]:py-[15px] ${
                isActive(link.href)
                  ? "[@media(max-width:1240px)]:bg-cream-deep [@media(max-width:1240px)]:text-forest min-[1241px]:text-forest min-[1241px]:after:w-full"
                  : "text-ink [@media(max-width:1240px)]:hover:bg-cream-deep [@media(max-width:1240px)]:hover:text-forest min-[1241px]:hover:text-forest min-[1241px]:hover:after:w-full"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Scrim */}
        <button
          type="button"
          className={`fixed inset-0 z-[240] border-0 bg-[rgba(14,34,19,0.52)] transition-all duration-250 min-[1241px]:hidden ${
            mobileNavOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
          onClick={() => setMobileNavOpen(false)}
          aria-label="Close navigation"
        />

        {/* Actions */}
        <div className="ml-auto flex items-center gap-2.5 min-[1241px]:ml-0 [@media(max-width:1240px)]:ml-auto [@media(max-width:390px)]:gap-[5px]! [@media(max-width:640px)]:gap-[7px]">
          <form
            className="hidden items-center rounded-full border-[1.5px] border-line bg-white py-[5px] pl-4 pr-[5px] min-[1241px]:flex"
            role="search"
            action="/shop"
          >
            <input
              type="search"
              name="search"
              placeholder="Search produce…"
              aria-label="Search products"
              className="w-[140px] border-none bg-transparent text-[13px] outline-none"
            />
            <button
              type="submit"
              className="grid size-8 place-items-center rounded-full border-none bg-forest text-white"
              aria-label="Search"
            >
              <Search size={16} />
            </button>
          </form>

          <Link
            href="/cart"
            className="relative grid size-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white text-forest transition-all duration-[250ms] [@media(max-width:640px)]:size-10 [@media(max-width:390px)]:size-[38px]!"
            aria-label={`View cart, ${cartCount} ${cartCount === 1 ? "item" : "items"}`}
          >
            <ShoppingBasket size={15.5} />
            <span className="absolute -right-[5px] -top-[5px] flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-clay px-1 text-[10px] font-extrabold text-white [@media(max-width:390px)]:-right-[3px] [@media(max-width:390px)]:-top-[4px]">
              {cartCount}
            </span>
          </Link>

          {isAuthenticated ? (
            <Link
              href="/account"
              className="btn btn-primary btn-sm [@media(max-width:640px)]:size-[42px] [@media(max-width:640px)]:p-0! [@media(max-width:390px)]:size-[38px]!"
            >
              <User size={14} />
              <span className="[@media(max-width:640px)]:hidden">
                {user?.first_name || "Account"}
              </span>
            </Link>
          ) : (
            <Link
              href="/login"
              className="btn btn-primary btn-sm [@media(max-width:640px)]:size-[42px] [@media(max-width:640px)]:p-0! [@media(max-width:390px)]:size-[38px]!"
            >
              <User size={14} />
              <span className="[@media(max-width:640px)]:hidden">Login</span>
            </Link>
          )}

          <button
            type="button"
            className="grid size-[42px] place-items-center rounded-full border-[1.5px] border-line bg-white text-forest [@media(max-width:640px)]:size-10 [@media(max-width:390px)]:size-[38px]! min-[1241px]:hidden"
            onClick={() => setMobileNavOpen(true)}
            aria-label="Open navigation"
            aria-controls="main-nav"
            aria-expanded={mobileNavOpen}
          >
            <Menu size={18} />
          </button>
        </div>
      </div>
    </header>
  );
}
