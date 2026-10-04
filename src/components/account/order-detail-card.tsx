import { StatusPill } from "./status-pill";
import type { Order } from "./types";
import { MoneyFromKobo, fmtDateTime } from "@/lib/utils/format";

interface OrderDetailCardProps {
  order: Order;
}

export function OrderDetailCard({ order }: OrderDetailCardProps) {
  const isDelivery = order.delivery_method === "delivery";

  return (
    <div className="card order-detail-card" style={{ marginBottom: "22px" }}>
      <div className="panel-head">
        <div>
          <h3 style={{ marginBottom: "4px" }}>Order {order.order_number}</h3>
          <small className="muted">
            Placed on {order.created_at ? fmtDateTime(order.created_at) : "—"}
          </small>
        </div>
        <div>
          <StatusPill status={order.payment_status} />{" "}
          <StatusPill status={order.status} />
        </div>
      </div>

      <div className="table-wrap">
        <table className="responsive-stack-table">
          <thead>
            <tr>
              <th>Product</th>
              <th>Unit Price</th>
              <th>Qty</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.items.length ? (
              order.items.map((item) => (
                <tr key={item.product_id}>
                  <td data-label="Product">{item.name}</td>
                  <td data-label="Unit price">
                    {MoneyFromKobo(item.unit_price)}
                    {item.unit ? ` / ${item.unit}` : ""}
                  </td>
                  <td data-label="Quantity">{item.quantity}</td>
                  <td data-label="Subtotal">{MoneyFromKobo(item.line_total)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td data-label="Product" colSpan={4}>
                  Order items will load from API.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="ml-auto mt-[18px] max-w-[280px]">
        <div className="summary-line">
          <span>Subtotal</span>
          <span>{MoneyFromKobo(order.subtotal)}</span>
        </div>
        <div className="summary-line">
          <span>Delivery Fee</span>
          <span>{MoneyFromKobo(order.delivery_fee)}</span>
        </div>
        <div className="summary-line total">
          <span>Total</span>
          <span>{MoneyFromKobo(order.total)}</span>
        </div>
      </div>

      <hr className="my-[22px] border-t border-dashed border-line" />

      <div className="grid grid-2">
        <div>
          <h4>Delivery Information</h4>
          <p className="muted text-[13.5px]">
            Method: {isDelivery ? "Home Delivery" : "Farm Pickup"}
            {isDelivery && order.address ? (
              <>
                <br />
                Address: {order.address}
              </>
            ) : null}
          </p>
        </div>
        <div>
          <h4>Payment Information</h4>
          <p className="muted text-[13.5px]">
            Method: {order.payment_method || "—"}
            <br />
            Reference: {order.payment_ref || "—"}
          </p>
        </div>
      </div>
    </div>
  );
}
