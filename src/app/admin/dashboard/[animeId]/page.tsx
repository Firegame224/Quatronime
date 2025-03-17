import prisma from "@/libs/prisma";
import Image from "next/image";
import React from "react";

interface DashboardAdminParam {
  params: {
    animeId: string;
  };
}
export default async function page({ params }: DashboardAdminParam) {
  const AnimeId = Number(params.animeId);

  const anime = await prisma.anime2.findFirst({
    where: {
      id: AnimeId,
    },
  });

  return (
    <div className="w-full flex flex-col justify-start p-8">
        <h1 className="text-2xl">{anime?.title}</h1>
        <Image
          src={
            anime?.imageUrl ||
            "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
          }
          alt={anime?.title || ""}
          width={400}
          height={400}
        />
    </div>
  );
}
