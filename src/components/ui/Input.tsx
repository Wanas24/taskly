import type { InputHTMLAttributes, Ref } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  error?: string;
  ref?: Ref<HTMLInputElement>;
};

export default function Input({ label, error, id, ref, ...props }: InputProps) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>

      <input
        ref={ref}
        id={id}
        {...props}
        className="h-12 w-full rounded-lg border border-slate-light bg-white px-4 text-sm text-foreground outline-none transition focus:border-primary"
      />

      {error && <p className="text-sm text-error">{error}</p>}
    </div>
  );
}
