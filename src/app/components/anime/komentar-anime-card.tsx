/* eslint-disable @typescript-eslint/no-explicit-any */


import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import AnimeKomentarDelete from "./anime-komentar-delete";

export default function KomentarAnimeCard({ params, data }: any) {
  return (
    <>
      {data.map((item: any) => (
        <Card className="font-sans items-center mb-4 w-full" key={item.id}>
          <CardContent className="flex gap-3 items-start p-2 md:p-5">
            {/* Gambar Profil */}
            <Image
              src={
                item.image ||
                "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
              }
              alt={item.email}
              width={50}
              height={50}
              className="rounded-full w-7 h-7 md:w-10 md:h-10"
            />
            <section className="flex flex-col sm:w-full self-startrounded-md p-2 w-full">
              <div className="w-full flex flex-wrap items-center gap-1">
                <h1 className="text-[12px] md:text-[15px]">
                  @{item.name ? item.name : item.email.split("@")[0]} ●
                </h1>
                <h1 className="text-[11px] md:text-[12px] text-gray-500">
                  {item.updateAt
                    ? new Date(item.updateAt).toLocaleString()
                    : "Tanggal Tidak diketahui"}
                </h1>
              </div>
              <div className="break-words max-w-[200px] md:max-w-[95%] w-full">
                <h1 className={`text-[12px] md:text-[15px]`}>{item.komentar}</h1>
              </div>
            </section>
            <AnimeKomentarDelete params={params} data={item} />
          </CardContent>
        </Card>
      ))}
    </>
  );
}

