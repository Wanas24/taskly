import Image from "next/image";
import logo from "@/assets/images/logo.png"

function AuthFormLogo() {
  return (
    <div className="flex gap-2 py-6.5 ms-10 max-sm:ms-6 mb-4">
      <Image src={logo} alt="Taskly" className="object-contain" />
      <h1 className="font-bold text-xl text-slate-dark">TASKLY</h1>
    </div>
  );
}

export default AuthFormLogo;
