import { forwardRef } from "react";

interface FormControlProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

export const FormControl = forwardRef<HTMLInputElement, FormControlProps>(
  ({ label, error, hint, className = "", id, ...props }, ref) => {
    const inputId = id || props.name;
    return (
      <div className={`form-group ${error ? "field-invalid" : ""}`}>
        {label && <label htmlFor={inputId}>{label}</label>}
        <input
          ref={ref}
          id={inputId}
          className={`form-control ${className}`}
          {...props}
        />
        {hint && !error && <p className="form-hint">{hint}</p>}
        {error && <p className="form-error">{error}</p>}
      </div>
    );
  },
);

FormControl.displayName = "FormControl";
