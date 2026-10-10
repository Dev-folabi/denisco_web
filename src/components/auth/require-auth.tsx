"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useAuth } from "@/lib/auth/auth-provider";

/**
 * Guards a route that requires a signed-in customer.
 *
 * The session is restored from the HttpOnly refresh cookie on first load, so
 * children stay unmounted until that has settled — rendering them earlier
 * would flash an empty account page to a user who is in fact signed in.
 */
export function RequireAuth({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isLoading, isSigningOut } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // A sign-out in progress is not an expired session: the customer is on
    // their way to the home page, and sending them to /login?redirect=… here
    // would undo that.
    if (!isLoading && !isAuthenticated && !isSigningOut) {
      // Preserve where the user was headed so login can return them to it.
      router.replace(`/login?redirect=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, isLoading, isSigningOut, pathname, router]);

  if (isLoading || !isAuthenticated) {
    return (
      <section className="section">
        <div className="container flex min-h-[40vh] items-center justify-center">
          <Loader2
            size={28}
            className="animate-spin text-olive"
            aria-label="Loading your account"
          />
        </div>
      </section>
    );
  }

  return <>{children}</>;
}
