import prisma from "@/libs/prisma";
import React from "react";
import Kartu from "./card";
import Headernime from "./headernime";



export default async function AnimePage() {
    const TopAnime = await prisma.anime2.findMany({
      where: { ranking: { lt: 25 } },
    });
    const fullAnime = await prisma.anime2.findMany({});
    return (
      <div className="w-full min-h-screen">
      <Headernime Teks="Top Anime" href="Lihat Semua.." link="/allnime" />
      <div className="flex flex-col justify-between items-center">
        <Kartu Api={TopAnime} />
      </div>
      <Headernime Teks="Rekomendasi" href="" link="" />
      <div className="flex flex-col justify-between items-center">
        <Kartu Api={fullAnime} />
      </div>

      </div>
    );
  }