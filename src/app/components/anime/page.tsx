import prisma from "@/libs/prisma";
import React from "react";
import Kartu from "./card";
import Headernime from "./headernime";
import AnimeCarousel from "./anime-carousel";

export default async function AnimePage() {
  const TopAnime = await prisma.anime2.findMany({
    where: { ranking: { lt: 25 } },
    orderBy: {
      ranking: "asc",
    },
  });
  const fullAnime = await prisma.anime2.findMany({
    where: { favorites: { gt: 2 } },
  });
  const top10 = await prisma.anime2.findMany({
    where: {
      ranking: {
        lte: 10,
      },
    },orderBy : {

      ranking : "asc"
    }
  });
  return (
    <div className="w-full min-h-screen">
      <div className="w-full p-3 md:p-5">
        <AnimeCarousel data={top10} />
      </div>
      <Headernime Teks="Top Anime" href="Lihat Semua.." link="/allnime" />
      <div className="flex flex-col justify-between items-center w-full">
        <Kartu Api={TopAnime} />
      </div>
      <Headernime Teks="Rekomendasi" href="" link="" />
      <div className="flex flex-col justify-between items-center w-full">
        <Kartu Api={fullAnime} />
      </div>
    </div>
  );
}
