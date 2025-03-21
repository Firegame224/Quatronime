
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Card, CardContent } from "@/components/ui/card";
import { Bookmark } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface KartuProps {
  imageUrl: string | null;
  title: string;
  status: string | null;
  episodes: number | null;
  score: number | null;
  id: number;
  source: string | null;
  aired: string | null;
}


export default function Kartu({ Api }: { Api: KartuProps[] }) {
  if (Api.length === 0) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-white font-semibold text-2xl">Tidak Ada Anime</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-3 justify-center items-center sm:grid-cols-4 md:gap-4 md:grid-cols-5 lg:grid-cols-6 ">
      {Api.map((anime: any) => {
        return (
          <div key={anime.id}>
            <Link href={`/anime/${anime.id}`} className="flex justify-center">
              <Card className="rounded-sm bg-transparent items-center justify-center flex border-none max-w-[200px] shadow-none">
                <CardContent className="flex flex-col items-center justify-between w-full relative gap-2 p-2">
                  <div className="w-full h-full relative rounded-tl-md">
                    <p className="absolute top-0 text-white text-[10px] font-semibold md:text-[12px] bg-red-500 opacity-95 p-1 rounded-tl-md">
                      {anime.status}
                    </p>
                    <Image
                      src={
                        anime.imageUrl ||
                        "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
                      }
                      alt={anime.title}
                      width={200}
                      height={200}
                      className="object-cover h-44 w-auto sm:h-60 rounded-md"
                    />
                    <p className="text-[12px] font-semibold text-white absolute bottom-0 ml-2">
                      Eps {anime.episodes}
                    </p>
                    <p className="text-[12px] font-semibold text-white absolute bottom-0 right-0 bg-transparent blur-sm">
                      {anime.score}
                    </p>
                  </div>
                  <div className="w-full h-12 sm:h-[67px] flex flex-col text-white font-semibold text-[10px] relative md:text-[15px] justify-center">
                    <p className="flex w-full items-center gap-2 font-thin">
                      <Bookmark className="w-4 h-4" />
                      {anime.favorites + " Pengguna"}
                    </p>
                    <p>{anime.title}</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>
        );
      })}
    </div>
  );
}
