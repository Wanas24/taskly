import type { ReactNode } from "react";

import ProjectFormHeader from "./ProjectFormHeader";
import ProjectFormTip from "./ProjectFormTip";

type ProjectFormCardProps = {
  title: string;
  children: ReactNode;
};

export default function ProjectFormCard({
  title,
  children,
}: ProjectFormCardProps) {
  return (
    <section className="m-auto mt-10 mb-10 max-w-2xl rounded-lg bg-white pt-8 max-sm:mt-0 max-sm:bg-transparent max-sm:pt-0">
      <ProjectFormHeader title={title} />

      <div className="p-8 max-sm:px-0">
        {children}
      </div>

      <ProjectFormTip />
    </section>
  );
}