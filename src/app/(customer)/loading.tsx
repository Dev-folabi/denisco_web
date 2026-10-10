import { Loader2 } from "lucide-react";

/**
 * Shown while a server-rendered page is still being produced — the catalogue
 * pages, when their ISR copy has expired and the API is slow to answer.
 */
export default function Loading() {
  return (
    <main id="app-view">
      <section className="section">
        <div className="container flex min-h-[50vh] items-center justify-center">
          <Loader2
            size={30}
            className="animate-spin text-olive"
            aria-label="Loading"
          />
        </div>
      </section>
    </main>
  );
}
