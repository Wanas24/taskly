import Link from "next/link";

import Button from "@/components/ui/Button";
import Image from "next/image";
import emptyImage from "@/assets/images/Blueprint_ Visual Element.png";

export default function ProjectEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center   px-6 py-16 text-center">
        <Image src={emptyImage} alt="" className="mb-10.75"/>
      <h2 className="text-2xl font-semibold text-slate-dark mb-4">No Projects</h2>

      <p className="mt-3 max-w-md text-sm leading-6 text-slate-medium">
        You don’t have any projects yet. Start by defining your first architectural workspace to
        begin tracking tasks and epics.
      </p>

      <Link href="/projects/add" className="mt-10.75">
        <Button type="button">Create New Project</Button>
      </Link>
    </div>
  );
}
