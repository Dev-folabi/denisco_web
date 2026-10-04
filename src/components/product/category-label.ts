import { SITE } from "@/lib/constants";

export function categoryLabel(category: string): string {
  const found = SITE.categories.find((c) => c.slug === category);
  return found ? found.label : category;
}
