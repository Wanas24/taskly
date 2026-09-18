import Link from "next/link";

import Button from "@/components/ui/Button";

export default function ProjectPageHeader() {
  return (
    <header className="mb-8 flex items-center justify-between gap-6">
      <div>
        <h1 className="text-3xl font-semibold text-slate-dark">Projects</h1>

        <p className="mt-1 text-base text-slate-medium">
            Manage and curate your projects </p>
      </div>

      <Link href="/project/add" className="shrink-0 max-sm:hidden">
        <Button type="button">Create New Project</Button>
      </Link>
    </header>
  );
}
