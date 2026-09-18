import Image from "next/image";
import formIcon from "@/assets/icons/form.svg";

type ProjectFormHeaderProps = {
  title: string;
};

export default function ProjectFormHeader({
  title,
}: ProjectFormHeaderProps) {
  return (
    <header>
      <div className="flex items-center gap-4 border-b border-b-surface-low px-8 pb-10 max-sm:px-0">
        <div className="flex items-center justify-center rounded-sm bg-[#0052CC1A] p-3 max-sm:hidden">
          <Image src={formIcon} alt="" />
        </div>

        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold text-slate-dark">
            {title}
          </h2>

          <p className="text-sm text-slate-medium">
            Define the scope and foundational details of your project.
          </p>
        </div>
      </div>
    </header>
  );
}