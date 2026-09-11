import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  className = "",
  ...props
}: ButtonProps) {
  return (
    <button
      {...props}
      className={`h-12 rounded-lg bg-primary-grad px-6 text-base font-semibold text-white cursor-pointer ${className}`}
    >
      {children}
    </button>
  );
}