interface ProductGridProps {
  children: React.ReactNode;
}

export function ProductGrid({ children }: ProductGridProps) {
  return (
    <div className="grid grid-cols-4 gap-7 max-[1024px]:grid-cols-2 max-sm:grid-cols-1">
      {children}
    </div>
  );
}
