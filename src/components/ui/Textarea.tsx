"use client";

import {
  useState,
  type TextareaHTMLAttributes,
  type Ref,
} from "react";

type TextareaProps =
  TextareaHTMLAttributes<HTMLTextAreaElement> & {
    label: string;
    optional?: boolean;
    error?: string;
    maxLength?: number;
    ref?: Ref<HTMLTextAreaElement>;
  };

export default function Textarea({
  optional,
  label,
  error,
  id,
  ref,
  maxLength,
  defaultValue,
  value,
  onChange,
  ...props
}: TextareaProps) {
  const [characterCount, setCharacterCount] = useState(
    String(value ?? defaultValue ?? "").length,
  );

  const handleChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setCharacterCount(event.target.value.length);
    onChange?.(event);
  };

  return (
    <div className="mb-6 flex flex-col gap-1.5">
      <div className="flex gap-0.5">
        <label
          htmlFor={id}
          className="ms-1 text-[11px] font-bold text-slate-medium"
        >
          {label}
        </label>

        {optional && (
          <span className="text-[11px] text-slate-medium">
            (Optional)
          </span>
        )}
      </div>

      <textarea
        ref={ref}
        id={id}
        value={value}
        defaultValue={defaultValue}
        maxLength={maxLength}
        aria-invalid={!!error}
        aria-describedby={
          error && id ? `${id}-error` : undefined
        }
        onChange={handleChange}
        {...props}
        className="min-h-32 w-full resize-none rounded-sm bg-surface-highest px-4 py-3.5 text-base placeholder-surface-medium outline-none"
      />

      <div className="flex justify-between">
        {error ? (
          <p
            id={id ? `${id}-error` : undefined}
            role="alert"
            className="text-sm text-error"
          >
            {error}
          </p>
        ) : (
          <span />
        )}

        {maxLength && (
          <span className="text-[11px] text-slate-medium">
            {characterCount} / {maxLength} characters
          </span>
        )}
      </div>
    </div>
  );
}