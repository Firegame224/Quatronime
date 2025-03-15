"use client";

import React from "react";
import Image from "next/image";
import SessionNav from "./Buttonsign";
import { usePathname } from "next/navigation";


export default function Navbar() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/users") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/anime") ? null : (
        <nav className="bg-[#9e1313] border-gray-200 dark:bg-gray-900">
          <div className="w-full  flex flex-wrap items-center  justify-between mx-auto p-4">
            <div className="flex items-center ">
              <Image src={"/img/logo.png"} alt="logo" width={50} height={50} />
              <span className="self-center text-2xl font-semibold whitespace-nowrap text-white">
                Quatronime
              </span>
            </div>
            <div className="flex items-center self-end justify-center" >
              <SessionNav />
            </div>
          </div>
        </nav>
      )}
    </>
  );
}
