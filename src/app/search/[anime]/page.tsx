import Kartu from '@/app/components/anime/card';
import Headernime from '@/app/components/anime/headernime'

interface AnimeSearchPops {
  params : {anime : string}
}
export default async function SearchPage({params} : AnimeSearchPops) {
  const id  = params.anime;
  const decodedUrl = decodeURIComponent(id);
  let Anime = [];
  try {
    const response = await fetch(process.env.NEXT_PUBLIC_API_URL + `/api/nimes/${decodedUrl}/animes`, {
      cache: "no-store",
    })
    const anime = await response.json();
    Anime = anime.data
  } catch (error) {
    console.log(error)
  }  
 if (Anime.length === 0) {
    return (
      <>
        <Headernime Teks={`Hasil pencarian ${decodedUrl}`} href={"Kembali"} link={`/`} />
        <p className='text-center text-white font-semibold text-2xl'>Tidak ada hasil pencarian</p>
      </>
    )
  }
  return (
    <>
      <Headernime Teks={`Hasil pencarian ${decodedUrl}`} href={"Kembali"} link={`/`} />
      <Kartu Api={Anime} />
    </>
  )
}
