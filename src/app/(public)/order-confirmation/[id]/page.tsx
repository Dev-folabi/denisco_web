import Link from "next/link";
import { CheckCircle, TriangleAlert } from "lucide-react";
import { EmptyState } from "@/components/ui/empty-state";
import { MoneyFromKobo, fmtDateTime } from "@/lib/utils/format";

interface OrderItem {
  product_id: string;
  name: string;
  unit: string;
  price: number;
  quantity: number;
  subtotal: number;
}

interface Order {
  id: string;
  order_number: string;
  items: OrderItem[];
  subtotal: number;
  delivery_fee: number;
  total: number;
  payment_status: string;
  fulfillment: string;
  delivery_method: string;
  address?: string;
  payment_method: string;
  payment_ref: string;
  created_at: string;
}

function statusPill(status: string) {
  const map: Record<string, string> = {
    pending: "badge-amber",
    paid: "badge-green",
    failed: "badge-red",
    processing: "badge-blue",
    dispatched: "badge-blue",
    completed: "badge-green",
    cancelled: "badge-red",
    confirmed: "badge-green",
    success: "badge-green",
  };
  const label = status.charAt(0).toUpperCase() + status.slice(1);
  return (
    <span className={`status-pill ${map[status] ?? "badge-grey"}`}>{label}</span>
  );
}

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const orders: Order[] = [];
  const order = orders.find((o) => o.id === id) ?? null;

  if (!order) {
    return (
      <section className="section">
        <div className="container">
          <EmptyState
            icon={TriangleAlert}
            title="Order Not Found"
            description="This order could not be located."
            ctaLabel="Back to Shop"
            ctaHref="/shop"
          />
        </div>
      </section>
    );
  }

  return (
    <section className="section">
      <div className="container" style={{ maxWidth: "760px" }}>
        <div className="pay-state success">
          <CheckCircle size={58} className="pay-icon block" />
          <h2>Thank You! Your Order Is Confirmed</h2>
          <p className="muted">
            A confirmation has been recorded to your account.
          </p>
        </div>

        <div className="card order-detail-card" style={{ marginBottom: 22 }}>
          <div className="panel-head">
            <div>
              <h3 style={{ marginBottom: 4 }}>Order {order.order_number}</h3>
              <small className="muted">
                Placed on {fmtDateTime(order.created_at)}
              </small>
            </div>
            <div>
              {statusPill(order.payment_status)} {statusPill(order.fulfillment)}
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
                {order.items.map((item) => (
                  <tr key={item.product_id}>
                    <td data-label="Product">{item.name}</td>
                    <td data-label="Unit price">
                      {MoneyFromKobo(item.price)} / {item.unit}
                    </td>
                    <td data-label="Quantity">{item.quantity}</td>
                    <td data-label="Subtotal">
                      {MoneyFromKobo(item.subtotal)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ maxWidth: 280, marginLeft: "auto", marginTop: 18 }}>
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

          <hr
            style={{
              border: "none",
              borderTop: "1px dashed var(--color-line)",
              margin: "22px 0",
            }}
          />

          <div className="grid grid-2">
            <div>
              <h4>Delivery Information</h4>
              <p className="muted" style={{ fontSize: 13.5 }}>
                Method:{" "}
                {order.delivery_method === "delivery"
                  ? "Home Delivery"
                  : "Farm Pickup"}
                <br />
                {order.delivery_method === "delivery"
                  ? `Address: ${order.address ?? ""}`
                  : ""}
              </p>
            </div>
            <div>
              <h4>Payment Information</h4>
              <p className="muted" style={{ fontSize: 13.5 }}>
                Method: {order.payment_method}
                <br />
                Reference: {order.payment_ref}
              </p>
            </div>
          </div>
        </div>

        <div style={{ textAlign: "center" }}>
          <Link href="/account/orders" className="btn btn-primary">
            Go to My Orders
          </Link>{" "}
          <Link href="/shop" className="btn btn-outline">
            Continue Shopping
          </Link>
        </div>
      </div>
    </section>
  );
}
