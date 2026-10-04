interface Category {
  slug: string;
  label: string;
}

interface CategoryFilterProps {
  categories: Category[];
  active: string;
  onChange: (slug: string) => void;
}

export function CategoryFilter({
  categories,
  active,
  onChange,
}: CategoryFilterProps) {
  return (
    <div className="shop-filters">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onChange(cat.slug)}
          className={`filter-chip${active === cat.slug ? " active" : ""}`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
