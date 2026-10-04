interface ProductGridProps {
  children: React.ReactNode;
  id?: string;
}

export function ProductGrid({ children, id }: ProductGridProps) {
  return (
    <div id={id} className="grid grid-4">
      {children}
    </div>
  );
}
