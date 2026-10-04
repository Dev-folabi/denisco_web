import { PaymentCallbackContent } from "./callback-content";

export default async function PaymentCallbackPage({
  searchParams,
}: {
  searchParams: Promise<{ reference?: string }>;
}) {
  const sp = await searchParams;
  return <PaymentCallbackContent reference={sp.reference} />;
}
