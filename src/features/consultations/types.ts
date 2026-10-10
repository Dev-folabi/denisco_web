/** A consultation service the farm offers. Prices are integers in kobo. */
export interface ConsultationType {
  id: string;
  name: string;
  description: string;
  /** The label the prototype shows, e.g. "60 mins". */
  duration: string;
  duration_minutes: number;
  price: number;
  currency: string;
  active: boolean;
  position: number;
}

/** One offered time, with whether it can still be booked. */
export interface Slot {
  id: string;
  date: string;
  time: string;
  /**
   * False when any consultation is already booked at this date and time. A
   * slot holds one session, whichever service took it, because the farm
   * cannot run two consultations at once.
   */
  available: boolean;
}

/** The booking calendar. */
export interface Availability {
  dates: string[];
  times: string[];
  slots: Slot[];
}

/** The state of a booking's consultation fee. */
export type BookingPaymentStatus =
  | "not_required"
  | "pending"
  | "paid"
  | "failed"
  | "refunded";

/** Booking lifecycle, matching the admin dashboard's dropdown. */
export type BookingStatus =
  | "pending"
  | "confirmed"
  | "completed"
  | "cancelled"
  | "no_show";

/** A booked consultation. */
export interface Booking {
  id: string;
  reference: string;
  user_id?: string;
  type_id: string;
  type_name: string;
  type_price: number;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
  status: BookingStatus;
  payment_status: BookingPaymentStatus;
  payment_ref?: string;
  paid_at?: string;
  /** True while the fee can still be settled, so a "pay now" action applies. */
  payable: boolean;
  created_at: string;
}

/** The booking form's payload. */
export interface BookInput {
  type_id: string;
  date: string;
  time: string;
  name: string;
  email: string;
  phone: string;
  notes?: string;
}
