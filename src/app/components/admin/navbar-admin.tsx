import React from "react";
import MainNavAdmin from "./main-nav-admin";
import AnimeSwitcher from "@/components/ui/anime-switcher";
import prisma from "@/libs/prisma";
import LogoutButton from "./logout-button";

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
          <LogoutButton />
        </div>
      </div>
    </nav>
  );
}
