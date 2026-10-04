import {
  Sprout,
  Wheat,
  Beef,
  Egg,
  Leaf,
  TreeDeciduous,
  Soup,
  RefreshCcw,
  Compass,
  MessageCircle,
  Presentation,
  PackageOpen,
} from "lucide-react";

const SERVICE_ICONS: Record<string, React.ElementType> = {
  "Seed Production and Development": Sprout,
  "Crop Production": Wheat,
  "Livestock Farming": Beef,
  "Poultry Production": Egg,
  "Snail Farming": Leaf,
  "Plantain and Banana Propagation": TreeDeciduous,
  "Forage and Feed Production": Soup,
  "Integrated Farming": RefreshCcw,
  "Farm Development and Management": Compass,
  "Agricultural Consulting": MessageCircle,
  "Agricultural Training and Capacity Development": Presentation,
  "Agricultural Value Addition": PackageOpen,
};

interface ServiceIconProps {
  service: { title: string };
  size?: number;
}

export function ServiceIcon({ service, size = 20 }: ServiceIconProps) {
  const Icon = SERVICE_ICONS[service.title] ?? Sprout;
  return <Icon size={size} />;
}
