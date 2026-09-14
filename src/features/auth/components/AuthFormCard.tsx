import type { FormHTMLAttributes, ReactNode } from "react";

type AuthFormCardProps = FormHTMLAttributes<HTMLFormElement> & {
  children: ReactNode;
};

export default function AuthFormCard({
  children,
  className = "",
  ...props
}: AuthFormCardProps) {
  return (
    <form
      {...props}
      className={`mb-12 max-w-xl m-auto bg-white max-sm:bg-transparent shadow-[0_24px_48px_0_#041B3C0F] max-sm:shadow-none rounded-lg ${className}`}
    >
      <div className="p-12 max-sm:p-6">{children}</div>
    </form>
  );
}