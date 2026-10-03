import { forwardRef } from "react";

interface FormControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div>
        {label && (
          <label
            htmlFor={inputId}
            className="mb-2 block text-[13px] font-bold text-forest"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`w-full rounded-[10px] border-[1.5px] border-line bg-white px-4 py-[13px] text-sm outline-none transition-colors focus:border-olive ${
            error ? "border-danger" : ""
          } ${className}`}
          {...props}
        />
        {error && (
          <p className="mt-1.5 text-[12px] font-bold text-danger">{error}</p>
        )}
      </div>
    );
  },
);

FormControl.displayName = "FormControl";
