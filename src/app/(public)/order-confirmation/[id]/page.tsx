import { OrderConfirmationContent } from "./confirmation-content";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <OrderConfirmationContent orderId={id} />;
}
