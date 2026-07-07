"use client";

import { cn } from "@/lib/utils";
import { TextareaHTMLAttributes, forwardRef } from "react";

interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="block text-sm font-medium text-primary mb-1.5">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            "w-full px-4 py-2.5 rounded-md border border-border bg-white text-primary",
            "placeholder:text-text-muted focus:outline-none focus:border-primary",
            "transition-all duration-200 min-h-[100px] resize-y",
            error && "border-red-400 focus:border-red-400",
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
        {helperText && !error && <p className="mt-1 text-sm text-text-muted">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";
export default Textarea;
