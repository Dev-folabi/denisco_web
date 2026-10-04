import { Signpost } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { EmptyState } from "@/components/ui/empty-state";

export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main id="app-view">
        <section className="section">
          <div className="container">
            <EmptyState
              icon={Signpost}
              title="Page Not Found"
              description="The page you are looking for does not exist."
              ctaLabel="Back to Home"
              ctaHref="/"
            />
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
