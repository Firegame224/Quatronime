import React from "react";
import MainNavAdmin from "./main-nav-admin";
import AnimeSwitcher from "@/components/ui/anime-switcher";
import prisma from "@/libs/prisma";
import Link from "next/link";

export default async function NavbarAdmin() {
  const animes = await prisma.anime2.findMany({
    select: {
      id: true,
      title: true,
    },
  });
  return (
    <nav className="border border-black px-5">
      <div className="h-32 md:h-20 flex flex-col md:flex-row md:flex justify-center md:justify-between gap-4 items-center">
        <AnimeSwitcher items={animes} />
        <MainNavAdmin className="mx-6" />
        <div className="flex ml-auto items-center space-x-4 w-full justify-center md:justify-end">
          <Link
          className="text-white bg-red-700 border-white border-2 rounded p-1 w-24 hover:bg-slate-700 transition text-center ease-in duration-500"
          href="/admin"
          >
            Kembali
          </Link>
        </div>
      </div>
    </nav>
  );
}
