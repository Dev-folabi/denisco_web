interface SortOption {
  value: string;
  label: string;
}

interface SortDropdownProps {
  options: SortOption[];
  value: string;
  onChange: (value: string) => void;
}

export function SortDropdown({ options, value, onChange }: SortDropdownProps) {
  return (
    <div className="shop-sort">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        // The options carry the word "Sort", but the control itself has no
        // visible label in the prototype's layout.
        aria-label="Sort products"
      >
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
