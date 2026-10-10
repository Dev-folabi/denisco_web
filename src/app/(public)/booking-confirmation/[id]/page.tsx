import { BookingConfirmationContent } from "./confirmation-content";

export default async function BookingConfirmationPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ ref?: string }>;
}) {
  const { id } = await params;
  const { ref } = await searchParams;

  return <BookingConfirmationContent bookingId={id} reference={ref} />;
}
