"use client";

import Image from "next/image";
import UserInfo from "./UserInfo";
import burgerMenu from "@/assets/icons/burger-menu.svg";

type NavbarProps = {
  onMenuClick: () => void;
};

export default function Navbar({ onMenuClick }: NavbarProps) {
  return (
    <header className="sticky top-0 z-40 py-3 px-6 border-b border-[#0000001A] bg-background">
      <div className="flex h-full items-center justify-between ">
        <div className="hidden max-sm:flex gap-4 items-center justify-center">
          <button
            type="button"
            onClick={onMenuClick}
            aria-label="Open navigation menu"
            className="flex h-5 w-6.5  items-center justify-center"
          >
            <Image src={burgerMenu} alt="" />
          </button>
          <h2 className="font-bold text-xl uppercase text-slate-dark">Taskly</h2>
        </div>

        <div className="ml-auto">
          <UserInfo />
        </div>
      </div>
    </header>
  );
}
