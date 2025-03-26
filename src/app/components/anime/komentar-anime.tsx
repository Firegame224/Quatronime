/* eslint-disable @typescript-eslint/no-explicit-any */

import { Separator } from "@/components/ui/separator";
import KomentarAnimeCard from "./komentar-anime-card";
import KomentarAnimeInput from "./komentar-anime-input";

interface KomentarProps {
  data: any;
  params: number;
}
export default function KomentarAnime({ params, data }: KomentarProps) {
  console.log(params);
  return (
    <div className="min-h-screen p-0 sm:p-4 w-full">
      <h1 className="text-2xl font-semibold">{data.length} Komentar</h1>
      <Separator className="my-4" />
      <KomentarAnimeInput params={params} />
      {data.length === 0 ? (
          <section className="w-full h-full flex items-center justify-center">
            <h1 className="text-2xl font-semibold">Komentar Anime Kosong</h1>
          </section>
      ) : (
          <KomentarAnimeCard params={params} data={data} />
      )}
    </div>
  );
}
