import { apiClient, type ApiMeta } from "@/lib/api/client";
import { API } from "@/lib/api/endpoints";
import type { CheckoutInput, Order } from "./types";

/** Turns the cart into an order and reserves the stock. */
export async function createOrder(input: CheckoutInput): Promise<Order> {
  return apiClient.post<Order>(API.orders.create, input);
}

/** Lists the customer's own orders, newest first. */
export async function getOrders(
  params: { page?: number; limit?: number } = {},
): Promise<{ data: Order[]; meta?: ApiMeta }> {
  return apiClient.getPage<Order[]>(API.orders.list, { params });
}

/** Retrieves one of the customer's orders. */
export async function getOrder(id: string): Promise<Order> {
  return apiClient.get<Order>(API.orders.byId(id));
}

/** Retrieves an order by its customer-facing number. */
export async function getOrderByNumber(number: string): Promise<Order> {
  return apiClient.get<Order>(API.orders.byNumber(number));
}

/** Cancels an unpaid order and releases its stock. */
export async function cancelOrder(id: string): Promise<Order> {
  return apiClient.post<Order>(API.orders.cancel(id));
}
