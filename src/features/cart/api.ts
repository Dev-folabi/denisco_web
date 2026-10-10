import { apiClient } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { Cart } from "./types";

/** Retrieves the signed-in customer's cart. */
export async function getCart(): Promise<Cart> {
  return apiClient.get<Cart>(API.cart.get);
}

/** Adds a product, or increases its quantity when already present. */
export async function addCartItem(
  productId: string,
  quantity = 1,
): Promise<Cart> {
  return apiClient.post<Cart>(API.cart.addItem, {
    product_id: productId,
    quantity,
  });
}

/** Replaces a line's quantity. */
export async function updateCartItem(
  productId: string,
  quantity: number,
): Promise<Cart> {
  return apiClient.patch<Cart>(API.cart.updateItem(productId), { quantity });
}

/** Removes a line from the cart. */
export async function removeCartItem(productId: string): Promise<Cart> {
  return apiClient.delete<Cart>(API.cart.removeItem(productId));
}

/** Empties the cart. */
export async function clearCart(): Promise<Cart> {
  return apiClient.delete<Cart>(API.cart.clear);
}
