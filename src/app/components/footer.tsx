"use client";
import React from "react";
import { usePathname } from "next/navigation";

export default function Footer() {
  const pathname = usePathname();
  return (
    <>
      {pathname.startsWith("/auth") ||
      pathname.startsWith("/admin") ||
      pathname.startsWith("/users") ? null : (
        <footer
          className={`bg-[#9e1313] w-full mt-10 py-8 text-center text-sm text-white h-full`}
        >
          <p className="text-[12px] md:text-lg">
            &copy; {new Date().getFullYear()} Quatronime. Dibuat dengan penuh ❤️
            oleh Kelompok 8
          </p>
        </footer>
      )}
    </>
  );
}