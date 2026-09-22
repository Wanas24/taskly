import Link from "next/link";
import BreadcrumbArrow from "@/assets/icons/breadcrumbArrow.svg";

type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  currentLabel: string;
};

export default function Breadcrumb({ items, currentLabel }: BreadcrumbProps) {
  return (
    <div className="max-sm:hidden">
      <nav aria-label="Breadcrumb">
        <ol className="flex items-center gap-2 text-sm uppercase">
          {items.map((item) => (
            <li key={item.label} className="flex items-center gap-2">
              <Link href={item.href ?? "#"} className="text-[#43465499] font-bold text-[12px]">
                {item.label}
              </Link>
              <BreadcrumbArrow/>
            </li>
          ))}

          <li className="text-primary font-bold text-[12px]" aria-current="page">
            {currentLabel}
          </li>
        </ol>
      </nav>
      <h2 className="mt-4 font-semibold text-4xl text-slate-dark capitalize">{currentLabel}</h2>
    </div>
  );
}
