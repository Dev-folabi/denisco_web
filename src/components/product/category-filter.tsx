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
    <div className="flex flex-wrap gap-2.5">
      {categories.map((cat) => (
        <button
          key={cat.slug}
          type="button"
          onClick={() => onChange(cat.slug)}
          className={`rounded-full border-[1.5px] px-5 py-2.5 text-[13px] font-bold transition-colors ${
            active === cat.slug
              ? "border-forest bg-forest text-white"
              : "border-line bg-white text-ink hover:border-forest"
          }`}
        >
          {cat.label}
        </button>
      ))}
    </div>
  );
}
