import Image from "next/image";
import Link from "next/link";

import addProjectIcon from "@/assets/icons/addCircle.svg";

function AddProjectCard() {
  return (
    <Link
      href="/project/add"
      className="flex min-h-48 items-center justify-center rounded-lg bg-white p-6 transition-shadow hover:shadow-md"
    >
      <div className="flex items-center justify-center rounded-xl bg-surface-low p-3.5">
        <Image src={addProjectIcon} alt="" />
      </div>
    </Link>
  );
}

export default AddProjectCard;