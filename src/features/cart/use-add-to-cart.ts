"use client";

import { useCallback } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth/auth-provider";
import { useToast } from "@/components/ui/toast";
import { ApiRequestError } from "@/lib/api/client";
import { useAddToCart } from "./hooks";

/**
 * The "add to cart" action shared by the product grid and the detail page.
 *
 * The cart lives on the server, so adding requires a session: a signed-out
 * visitor is sent to sign in and returned to the page they were on.
 */
export function useAddToCartAction() {
  const { isAuthenticated, isLoading } = useAuth();
  const { mutateAsync, isPending } = useAddToCart();
  const { toast } = useToast();
  const router = useRouter();
  const pathname = usePathname();

  const addToCart = useCallback(
    async (productId: string, quantity = 1, productName?: string) => {
      // Only bounce someone who is definitely signed out. The access token
      // lives in memory, so for a moment after every page load the session is
      // still being restored from the refresh cookie — and treating that as
      // signed out would send a signed-in customer to the login page.
      if (!isAuthenticated && !isLoading) {
        toast("info", "Please sign in to add items to your cart.");
        router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
        return false;
      }

      try {
        // While the session is still being restored this runs without a token:
        // the API client answers the 401 by rotating the session once and
        // retrying, which is the same path a token expiring mid-session takes.
        await mutateAsync([productId, quantity]);
        toast("success", `${productName ?? "Item"} added to your cart.`);
        return true;
      } catch (error) {
        if (error instanceof ApiRequestError && error.status === 401) {
          // There was no session to restore after all.
          toast("info", "Please sign in to add items to your cart.");
          router.push(`/login?redirect=${encodeURIComponent(pathname)}`);
          return false;
        }

        toast(
          "error",
          error instanceof ApiRequestError
            ? error.message
            : "Could not add the item to your cart.",
        );
        return false;
      }
    },
    [isAuthenticated, isLoading, mutateAsync, pathname, router, toast],
  );

  return { addToCart, isPending };
}
