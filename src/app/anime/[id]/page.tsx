/* eslint-disable @typescript-eslint/no-explicit-any */
import CharacterCard from "@/app/components/anime/chara-card";
import { Label } from "@radix-ui/react-label";
import { Calendar } from "lucide-react";
import Image from "next/image";
import YoutubePlayer from "@/app/components/anime/youtube-player";
import NavbarAnime from "@/app/components/anime/navbar-anime";
import { Badge } from "@/components/ui/badge";
import KomentarAnime from "@/app/components/anime/komentar-anime";
import { AuthSession } from "@/libs/session";
import AnimeButtonFavorites from "@/app/components/anime/anime-button-favorites";
import { fetcher, fetchOne } from "@/libs/fetcher";
import Link from "next/link";

export default async function DeskAnimePage({
  params,
}: {
  params: { id: number };
}) {
  const { id: animeId } = await params;
  const session = await AuthSession();

  // Ambil data anime dari database
  const { data: nime } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${animeId}`,
  });
  // Fetch data character
  const { data: chara } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${animeId}/character`,
  });

  // Ambil data komentar
  const { data: komentar } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${animeId}/komentar`,
  });

  // Ambil data collection
  const Collection = await fetchOne({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.id}/collections/${animeId}`,
  });

  const Box = [
    {
      p1: "Score",
      p2: nime.score + ",00",
    },
    {
      p1: "Source",
      p2: nime.source,
    },
    {
      p1: "Status",
      p2: nime.status,
    },
    {
      p1: "Type",
      p2: nime.type,
    },
  ];

  return (
    <div className="max-w-screen min-h-screen text-white flex flex-col">
      <NavbarAnime />
      <div className="md:flex gap-5 w-full">
        <div className="flex flex-col items-center h-full md:h-screen">
          <section className=" h-full w-full mx-h-[700px] md:w-full relative">
            <Image
              src={
                nime.imageUrl ||
                "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
              }
              alt={nime.title}
              className="w-full h-full rounded-md object-cover"
              width={200}
              height={200}
            />
            <Label className="absolute bottom-0 p-2 text-[#fc0b03] font-black self-start flex flex-row gap-3 items-center">
              <Calendar className="w-5 h-5 ml-2" />
              {nime.aired}
            </Label>
            <AnimeButtonFavorites animeId={Number(animeId)} data={Collection} />
          </section>
          <div className="mt-3 flex justify-center gap-3 w-full p-2">
            {Box.map((bok, index) => {
              return (
                <div
                  className="border-[#fc0b03] border-2 p-1 w-20 items-center flex flex-col justify-center rounded-md"
                  key={index}
                >
                  <p>{bok.p1}</p>
                  <p className="text-[10px] font-bold">{bok.p2}</p>
                </div>
              );
            })}
          </div>
          <div className="flex flex-row w-full items-center justify-center gap-2 my-4">
            {nime.genres.map((genre: string, index: number) => {
              return (
                <Badge className="p-3 bg-gray-700 " key={index}>
                  <Link href={`/search/genre/${genre}`}>#{genre}</Link>
                </Badge>
              );
            })}
          </div>
          <h1 className="text-2xl text-center font-bold md:hidden mx-2">
            {nime.title}
          </h1>
        </div>
        <section className="md:max-w-3xl w-full p-5 mx-auto">
          <h1 className="text-2xl font-bold hidden md:flex">{nime.title}</h1>
          <h2 className="text-2xl text-[#fc0b03] font-bold mt-3">Synopsis :</h2>
          <p className="text-[1rem] text-justify">{nime.synopsis}</p>
          <h2 className="text-2xl text-[#fc0b03] font-bold my-5">
            Trailer Video :
          </h2>
          <YoutubePlayer videoUrl={nime.trailer || ""} />
        </section>
      </div>
      {/** Karakter Section **/}
      {chara.length === 0 ? null : (
        <section className="p-5 mt-12 md:mt-32">
          <h2 className="text-2xl font-bold my-4 text-[#fc0b03]">Characters</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {chara.map((char: any) => (
              <CharacterCard key={char.id} character={char} />
            ))}
          </div>
        </section>
      )}
      {/** Komentar Section **/}
        <section className="p-5 mt-12">
          <h2 className="text-2xl font-bold my-4 text-[#fc0b03]">Comments</h2>
          <div className="flex w-full">
            <KomentarAnime params={Number(animeId)} data={komentar} />
          </div>
        </section>
    </div>
  );
}
