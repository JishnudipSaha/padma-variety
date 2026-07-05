"use client";

import { cn } from "@/lib/utils";
import { InputHTMLAttributes, forwardRef } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-dark-brown mb-1.5">
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 rounded-lg border border-cream-dark bg-white text-dark-brown",
            "placeholder:text-dark-brown/40 focus:outline-none focus:ring-2 focus:ring-rose-gold/30 focus:border-rose-gold",
            "transition-all duration-200",
            error && "border-red-400 focus:ring-red-400/30 focus:border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-dark-brown/50">{helperText}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;
