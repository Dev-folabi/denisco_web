import Link from "next/link";

interface PageHeroProps {
  title: string;
  description?: string;
  breadcrumbs?: { label: string; href?: string }[];
}

export function PageHero({ title, description, breadcrumbs }: PageHeroProps) {
  return (
    <section className="page-hero relative overflow-hidden bg-forest py-[70px] text-center text-white [@media(max-width:760px)]:py-[54px]">
      <div className="absolute -bottom-[220px] -left-[140px] size-[400px] rounded-full bg-olive opacity-20" />
      <div className="container relative">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav className="breadcrumb text-[#bcdaab]">
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
        <h1 className="relative mb-[10px] text-[38px] font-semibold text-white [@media(max-width:760px)]:text-[clamp(28px,8vw,36px)]">
          {title}
        </h1>
        {description && (
          <p className="relative mx-auto max-w-[560px] text-[#d3e7c8]">
            {description}
          </p>
        )}
      </div>
    </section>
  );
}
