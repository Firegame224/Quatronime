import Kartu from "@/app/components/anime/card";
import Headernime from "@/app/components/anime/headernime";
import ButtonEmail from "@/app/components/button/button-email";
import Image from "next/image";


interface AnimeSearchPops {
  params: { anime: string };
}
export default async function SearchPage({ params }: AnimeSearchPops) {
  const id = params.anime;
  const decodedUrl = decodeURIComponent(id);
  let Anime = [];
  try {
    const response = await fetch(
      process.env.NEXT_PUBLIC_API_URL + `/api/nimes/${decodedUrl}/animes`,
      {
        cache: "no-store",
      }
    );
    const anime = await response.json();
    Anime = anime.data;
  } catch (error) {
    console.log(error);
  }
  if (Anime.length === 0) {
    return (
      <>
        <Headernime
          Teks={`Hasil pencarian ${decodedUrl}`}
          href={"Kembali"}
          link={`/`}
        />
        <div className="w-full min-h-screen items-center justify-center flex flex-col">
          <Image
            src={"/img/not-Found.png"}
            alt="404"
            width={300}
            height={300}
            className="w-56 h-56 md:h-80 md:w-80"
          />
          <p className="text-center text-white font-semibold text-2xl">
            Tidak ada hasil pencarian
          </p>
          <ButtonEmail />
        </div>
      </>
    );
  }
  return (
    <div className="min-h-screen">
      <Headernime
        Teks={`Hasil pencarian ${decodedUrl}`}
        href={"Kembali"}
        link={`/`}
      />
      <Kartu Api={Anime} />
    </div>
  );
}
