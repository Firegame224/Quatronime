/* eslint-disable @next/next/no-img-element */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import Link from "next/link";
import React from "react";

interface KartuProps {
  imageUrl: string | null;
  title: string;
  status: string | null
  episodes: number | null;
  score: number | null;
  id: number;
  source : string | null;
  aired : string | null;
}

export default function CardAnimeDb({ Api }: { Api: KartuProps[] }) {
  return (
    <div className="grid grid-cols-2 gap-3 justify-center items-center sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 ">
      {Api.map((anime: any) => {
        return (
          <div key={anime.id}>
            <Link
              href={`/anime/${anime.id}`}
              className="flex justify-center"
            >
              <Card className="bg-gray-900 transition border w-[14rem] h-32 md:w-64 md:h-48 flex rounded-lg border-[#FF204E] shadow-xl text-white hover:shadow-[#FF204E] hover:opacity-80 relative">
                <CardContent className="flex flex-row items-center justify-center gap-3 p-2 w-full">
                  <div className="flex justify-between gap-5 px-1">
                    <img
                      src={anime.imageUrl || "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"}
                      alt={anime.title}
                      className="w-full min-w-[85px] max-w-[85px] md:min-w-[110px] md:max-w-[110px] h-auto rounded object-cover "
                    />

                    <div className="w-[80%] md:w-2/3 flex  flex-col justify-center gap-2 text-center items-center">
                      <p className="bg-slate-900 border-red-500 border text-white p-1 rounded-sm mr-10 text-[6px] md:text-[7px] absolute top-4 md:top-6">{anime.status}</p>
                      <div className="text-start w-full">
                      <p className=" text-white p-1 text-end md:text-start rounded-sm mt-3 md:mt-2 text-[6px] md:text-[7px]">{anime.episodes} Episodes</p>
                      </div>
                      <p className="text-[8px] md:text-[12px] max-w-[100px] truncate font-semibold">
                        {anime.title}
                      </p>
                      <div className="flex gap-6 w-full p-1">
                      <div className="flex flex-col text-start gap-2 h-full ">
                        <p className="text-[6px] md:text-[7px] flex gap-1"><Star width={10} height={10}/> {anime.score} / 10</p>
                         <p className="text-[6px] md:text-[7px]">{anime.favorites} User</p>
                        </div>
                        <p className="text-[9px] md:text-[12px] flex flex-col text-start">#{anime.ranking} <span className="text-[6px] md:text-[7px]">Peringkat</span></p>
                      </div>
                      <div className="flex gap-2">
                        {anime.genres
                          ?.slice(0, 2)
                          .map((genre: any, index: any) => (
                            <p
                              className="bg-slate-800 border border-red-500 text-white p-1 rounded-sm text-[6px] md:text-[7px] max-w-[80px] md:max-w-[100px] w-12 hover:bg-[#FF204E] transition-all duration-500 ease-in-out"
                              key={index}
                            >
                              {genre}
                            </p>
                          ))}
                      </div>
                    </div>
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
