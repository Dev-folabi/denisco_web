export interface OrderItem {
  product_id: string;
  name: string;
  unit?: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

export interface Order {
  id: string;
  order_number: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  status: string;
  payment_status: string;
  delivery_method: string;
  address?: string;
  payment_method?: string;
  payment_ref?: string;
  created_at: string;
}

export interface Transaction {
  id: string;
  ref: string;
  order_number: string;
  amount: number;
  method: string;
  status: string;
  date: string;
}

export interface Booking {
  id: string;
  ref: string;
  type_name: string;
  date: string;
  time: string;
  status: string;
}
