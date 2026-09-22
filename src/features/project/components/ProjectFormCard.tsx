import type { ReactNode } from "react";
import FormIcon from "@/assets/icons/form.svg";

type ProjectFormCardProps = {
  title: string;
  children: ReactNode;
};

export default function ProjectFormCard({ title, children }: ProjectFormCardProps) {
  return (
    <section className="m-auto mt-10 mb-10 max-w-2xl rounded-lg bg-white pt-8 max-sm:mt-0 max-sm:bg-transparent max-sm:pt-0">
      <header>
      <div className="flex items-center gap-4 border-b border-b-surface-low px-8 pb-10 max-sm:px-0">
        <div className="flex items-center justify-center rounded-sm bg-[#0052CC1A] p-3 max-sm:hidden">
          <FormIcon/>
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

      <div className="p-8 max-sm:px-0">{children}</div>

      <div className="bg-surface-low px-8 py-6 text-[12px] text-slate-medium max-sm:px-6">
        <strong>Pro Tip:</strong> You can invite project members and assign epics immediately after
        the initial creation process.
      </div>
    </section>
  );
}
