import Link from "next/link";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden bg-forest px-6 py-[70px] text-center text-white max-[760px]:py-[54px]">
      <div className="absolute -bottom-[220px] -left-[140px] size-[400px] rounded-full bg-olive opacity-20" />
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="relative mb-3.5 text-xs text-[#bcdaab]">
          {breadcrumbs.map((crumb, i) => (
            <span key={i}>
              {i > 0 && " / "}
              {crumb.href ? (
                <Link href={crumb.href} className="text-[#bcdaab] underline">
                  {crumb.label}
                </Link>
              ) : (
                crumb.label
              )}
            </span>
          ))}
        </nav>
      )}
      <h1 className="relative m-0 text-[38px] font-semibold text-white max-[760px]:text-[clamp(28px,8vw,36px)]">
        {title}
      </h1>
      {description && (
        <p className="relative mx-auto mt-2.5 max-w-[560px] text-[#d3e7c8]">
          {description}
        </p>
      )}
    </section>
  );
}
