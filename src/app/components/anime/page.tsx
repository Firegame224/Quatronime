import React from "react";
import Kartu from "./card";
import Headernime from "./headernime";
import AnimeCarousel from "./anime-carousel";
import { fetcher } from "@/libs/fetcher";
import AnimeGenreButton from "./anime-genre-button";

export default async function AnimePage() {
  const { data: topAnime } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/top`,
  });
  const { data: recomAnime } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/recomendation`,
  });
  const { data: top10 } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/top10`,
  });
  
  return (
    <div className="w-full min-h-screen">
      <div className="w-full p-2 md:p-5">
        <AnimeCarousel data={top10} />
      </div>
      <Headernime Teks="Top Anime" href="Lihat Semua.." link="/anime" />
      <div className="flex flex-col justify-between items-center w-full min-h-screen">
        <Kartu Api={topAnime} />
      </div>
      <Headernime Teks="Rekomendasi" href="" link="#" />
      <div className="flex flex-col justify-between items-center w-full min-h-screen">
        <Kartu Api={recomAnime} />
      </div>
      <div className="flex flex-col justify-between items-center w-full">
        <Headernime Teks="Cari Berdasarkan Genre" href="" link="#" />
        <AnimeGenreButton/>
      </div>
    </div>
  );
}
