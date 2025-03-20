"use client";

import React from "react";
import Image from "next/image";
import SessionNav from "./button/Buttonsign";
import { usePathname } from "next/navigation";
import NavbarSmall from "./navbar-sm";
import SearchNimeComponent from "./search-component";


export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/users") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/anime") ? null : (
        <nav className="bg-[#9e1313] border-gray-200 dark:bg-gray-900">
          <div className="w-full  flex flex-wrap items-center  justify-between mx-auto p-4">
            <div className="flex items-center gap-4">
              <Image src={"/img/logo.png"} alt="logo" width={50} height={50} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Quatronime
              </span>
            </div>
            <div className="flex md:hidden">
            <NavbarSmall/>
          </div>
            <div className="w-full md:w-auto">
              <SearchNimeComponent/>
            </div>
            <div className="hidden items-center self-end justify-center md:flex" >
              <SessionNav />
            </div>
          </div>
          
        </nav>
      )}
    </>
  );
}
