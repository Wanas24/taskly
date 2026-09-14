import type { InputHTMLAttributes, ReactNode, Ref } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  optional?: boolean;
  error?: string;
  endElement?: ReactNode;
  ref?: Ref<HTMLInputElement>;
};

export default function Input({
  optional,
  label,
  error,
  endElement,
  id,
  ref,
  ...props
}: InputProps) {
  return (
    <div className="mb-6 flex flex-col gap-1.5">
      <div className="flex gap-0.5">
        <label htmlFor={id} className="ms-1 text-[11px] font-bold text-slate-medium">
          {label}
        </label>

        {optional && <span className="text-[11px] text-slate-medium">(Optional)</span>}
      </div>

      <div className="relative">
        <input
          ref={ref}
          id={id}
          aria-invalid={!!error}
          aria-describedby={error && id ? `${id}-error` : undefined}
          {...props}
          className="h-12 w-full rounded-sm bg-surface-highest px-4 py-3.5 text-base placeholder-surface-medium outline-none"
        />

        {endElement && (
          <div className="absolute end-4 top-1/2 -translate-y-1/2 end-[16.5px] cursor-pointer">
            {endElement}
          </div>
        )}
      </div>

      {error && (
        <p id={id ? `${id}-error` : undefined} role="alert" className="text-sm text-error">
          {error}
        </p>
      )}
    </div>
  );
}
