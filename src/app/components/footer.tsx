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
          <p>
            &copy; {new Date().getFullYear()} Quatronime. Dibuat dengan penuh ❤️
            oleh Kelompok 8
          </p>
          <p className="mt-2">
            <a href="mailto:quatronime@gmail.com" target="_blank" className="hover:underline">
              Kontak
            </a>
          </p>
        </footer>
      )}
    </>
  );
}