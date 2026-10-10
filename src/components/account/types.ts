// The account area renders what the API returns, so these are the feature
// types rather than a second description of the same data.
export type { Order, OrderItem } from "@/features/orders/types";
export type { Payment as Transaction } from "@/features/payments/types";

/** A consultation booking. The consultation module lands in its own phase. */
export interface Booking {
  id: string;
  ref: string;
  type_name: string;
  date: string;
  time: string;
  status: string;
}
