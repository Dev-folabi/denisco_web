import Link from "next/link";
import { Sprout } from "lucide-react";

export default function NotFound() {
  return (
    <section className="flex min-h-[70vh] items-center justify-center px-6 py-24">
      <div className="text-center">
        <div className="mx-auto mb-6 grid size-[80px] place-items-center rounded-full bg-cream-deep text-olive">
          <Sprout size={36} />
        </div>
        <h1 className="mb-3 text-[80px] font-heading font-bold leading-none text-forest max-sm:text-[60px]">
          404
        </h1>
        <h2 className="mb-3 text-[28px] font-semibold max-sm:text-[22px]">
          Page Not Found
        </h2>
        <p className="mx-auto mb-8 max-w-[400px] text-muted">
          The page you&rsquo;re looking for doesn&rsquo;t exist or has been
          moved.
        </p>
        <Link
          href="/"
          className="inline-flex items-center gap-[9px] rounded-full bg-forest px-7 py-[15px] text-sm font-bold text-white transition-all hover:-translate-y-0.5 hover:bg-olive"
        >
          Back to Home
        </Link>
      </div>
    </section>
  );
}
