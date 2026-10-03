import { StatusPill } from "./status-pill";
import { MoneyFromKobo } from "@/lib/utils/format";
import { fmtDate } from "@/lib/utils/format";

interface OrderItem {
  product_id: string;
  name: string;
  unit_price: number;
  quantity: number;
  line_total: number;
}

interface Order {
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
  created_at: string;
}

interface OrderDetailCardProps {
  order: Order;
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  return (
    <div className="rounded-[18px] border border-line bg-white p-7 shadow-[var(--shadow-default)] max-[760px]:p-[18px]">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-2.5">
        <div>
          <h2 className="m-0 text-[22px] font-semibold">
            Order {order.order_number}
          </h2>
          <span className="text-xs text-muted">
            Placed on {fmtDate(order.created_at)}
          </span>
        </div>
        <div className="flex gap-2">
          <StatusPill status={order.payment_status} />
          <StatusPill status={order.status} />
        </div>
      </div>

      <div className="mb-6 overflow-x-auto rounded-[18px] border border-line">
        <table className="w-full min-w-[480px] border-collapse">
          <thead>
            <tr>
              {["Product", "Price", "Qty", "Total"].map((h) => (
                <th
                  key={h}
                  className="bg-cream-deep px-[18px] py-3.5 text-left text-[11.5px] font-extrabold uppercase tracking-[.5px] text-forest"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {order.items.map((item) => (
              <tr key={item.product_id} className="border-b border-line">
                <td className="px-[18px] py-3.5 text-sm">{item.name}</td>
                <td className="px-[18px] py-3.5 text-sm">
                  {MoneyFromKobo(item.unit_price)}
                </td>
                <td className="px-[18px] py-3.5 text-sm">{item.quantity}</td>
                <td className="px-[18px] py-3.5 text-sm font-bold">
                  {MoneyFromKobo(item.line_total)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="ml-auto max-w-[300px]">
        <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
          <span>Subtotal</span>
          <span>{MoneyFromKobo(order.subtotal)}</span>
        </div>
        <div className="flex justify-between border-b border-dotted border-line py-[9px] text-[14.5px]">
          <span>Delivery Fee</span>
          <span>
            {order.delivery_fee === 0 ? "Free" : MoneyFromKobo(order.delivery_fee)}
          </span>
        </div>
        <div className="mt-2.5 flex justify-between pt-4 text-lg font-extrabold text-forest">
          <span>Total</span>
          <span>{MoneyFromKobo(order.total)}</span>
        </div>
      </div>

      {order.address && (
        <div className="mt-6 rounded-[14px] bg-cream-deep p-5">
          <strong className="mb-1 block text-[12px] font-extrabold uppercase tracking-[.5px] text-muted">
            Delivery Address
          </strong>
          <p className="text-sm">{order.address}</p>
        </div>
      )}
    </div>
  );
}
