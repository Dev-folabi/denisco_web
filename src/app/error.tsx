"use client";

import { TriangleAlert } from "lucide-react";
import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

/**
 * The boundary every page error bubbles up to: a failed catalogue read on the
 * server, or a render that threw in the browser.
 *
 * It keeps the header and footer so a visitor who hits it is still on the site
 * and can navigate away, and `reset` re-renders the segment, which is enough
 * to recover from a transient API failure without a full reload.
 */
export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <>
      <SiteHeader />
      <main id="app-view">
        <section className="section">
          <div className="container">
            <div className="mx-auto max-w-[520px] rounded-[18px] border border-line bg-white p-9 text-center shadow-[var(--shadow-default)]">
              <span className="mx-auto mb-5 grid size-14 place-items-center rounded-full bg-badge-red-bg text-danger">
                <TriangleAlert size={24} />
              </span>
              <h1 className="m-0 mb-2.5 font-heading text-[26px] font-semibold text-forest">
                Something Went Wrong
              </h1>
              <p className="mb-6 text-sm text-muted">
                We could not load this page. Please try again — if it keeps
                happening, our team is already looking into it.
              </p>
              {/* The digest is the server-side log reference for this error. */}
              {error.digest && (
                <p className="mb-5 text-[11px] text-muted">
                  Reference: {error.digest}
                </p>
              )}
              <button type="button" onClick={reset} className="btn btn-primary">
                Try Again
              </button>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
