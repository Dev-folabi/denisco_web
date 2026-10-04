import { ShopContent } from "./shop-content";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; category?: string }>;
}) {
  const sp = await searchParams;
  return (
    <ShopContent
      initialSearch={sp.search ?? ""}
      initialCategory={sp.category ?? ""}
    />
  );
}
