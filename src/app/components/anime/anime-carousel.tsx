"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Bookmark, Star, Tv2Icon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import Autoplay from 'embla-carousel-autoplay'

type Anime = {
    id : number
    title : string
    imageUrl : string
    score : number
    status : string
    episodes : number
    type : string
    ranking : number
    favorites: number
    members: number
    popularity: number
    aired: string
}
export default function AnimeCarousel(data: { data: any }) {
  const [isHover, setIsHover] = useState(false);
  return (
    <>
      <Carousel plugins={[Autoplay({ delay: 5000 , stopOnInteraction: isHover })]} onMouseEnter={()=> setIsHover(true)} onMouseLeave={() =>setIsHover(false)} className="w-full h-full">
        <CarouselContent className="rounded-md">
          {data.data.map((anime: Anime) => (
            <CarouselItem key={anime?.id}>
              <Link
                href={`/anime/${anime?.id}`}
                className="w-full items-center justify-center flex relative"
              >
                <Image
                  src={anime.imageUrl || ""}
                  alt="Belum kerender"
                  width={300}
                  height={300}
                  className="w-full h-52 md:h-72 object-cover opacity-80 rounded-md"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#121212]">
                  <p className="absolute top-4 text-white left-8 text-[20px] md:text-[55px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {anime.title}
                  </p>
                  <p className="absolute top-16 md:top-24 left-8 text-white text-[15px] md:text-[20px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] flex gap-2 items-center justify-center">
                    <Bookmark className="w-4 h-4 md:w-6 md:h-6" fill="white"/> {anime.favorites} Favorites
                  </p>
                  <p className="absolute top-20 md:top-32 left-8 text-white text-[15px] md:text-[20px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)] flex gap-2 items-center justify-center">
                    <Star className="w-4 h-4 md:w-6 md:h-6" fill="yellow" />
                    {anime.score},00
                  </p>
                  <p className="absolute top-5 text-white right-10  text-[15px] md:text-[20px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    #{anime.ranking}
                  </p>
                  <p className="absolute flex items-center justify-center gap-3 bottom-5 text-white left-10 text-[15px] md:text-[20px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    <Tv2Icon className="w-4 h-4 md:w-6 md:h-6" />
                    {anime.type}
                  </p>
                  <p className="absolute bottom-5 text-white right-10 text-[15px] md:text-[20px] drop-shadow-[0_0_10px_rgba(255,255,255,0.8)]">
                    {anime.episodes} Eps
                  </p>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </>
  );
}
