'use client'
import Kartu from '@/app/components/anime/card';
import Headernime from '@/app/components/anime/headernime'
import { useParams } from 'next/navigation';
import React,{ useEffect, useRef, useState } from 'react'

export default function SearchPage() {
  const params = useParams();
  const animeTitle = params.anime as string
  const EncodeTitle = encodeURI(animeTitle)
  const prevTitle = useRef("")
  const [anime, setAnime] = useState([]);
  const url = `/api/nimes/${EncodeTitle}/animes`
  useEffect( ()=> {
    const fetchData = async () => {
      if (prevTitle.current === animeTitle) return // Mencegah fetch data duplikat
      try {
        const response = await fetch(url);
        const data = await response.json();
        setAnime(data.data);
      } catch (error) {
        console.log(error)
        return (
          <div className='flex items-center justify-center w-full h-screen'>
            <h1 className='text-2xl text-[#9e1313] text-center'>Error di Catch fetch data</h1>
          </div>
        )
      }
    }

    fetchData();
    console.log(anime)
  },[animeTitle,url,anime])
  if (anime.length === 0) {
    return (
      <div className='flex items-center justify-center w-full h-screen'>
        <h1 className='text-2xl text-[#9e1313] text-center'>Anime Tidak Ditemukan</h1>
      </div>
    )
  }
  return (
    <>
      <Headernime Teks={`Hasil pencarian${animeTitle}`} href={"Kembali"} link={`/`} />
      <Kartu Api={anime} />
    </>
  )
}
