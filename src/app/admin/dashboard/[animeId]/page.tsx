import { fetcher } from "@/libs/fetcher";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface DashboardAdminParam {
  params: {
    animeId: string;
  };
}
export default async function page({ params }: DashboardAdminParam) {
  const {animeId} = await params

  const { data :anime} = await fetcher({port : `${process.env.NEXT_PUBLIC_API_URL}/api/nimes/${animeId}`});

  return (
  <div className="w-full flex flex-col md:flex-row justify-center p-8 gap-8">

  <div className="w-full md:w-1/2 flex flex-col items-center justify-start">
    <h1 className="text-3xl font-bold mb-4 text-center">{anime?.title}</h1>
    <Image
      src={
        anime?.imageUrl ||
        "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
      }
      alt={anime?.title || "Anime Cover"}
      width={300}
      height={450}
      className="rounded shadow"
    />
  </div>

  <div className="w-full md:w-1/2 flex flex-col justify-start gap-6">

    <div className="grid grid-cols-2 gap-4">
      <div className="bg-gray-100 p-4 rounded shadow">🎖️ Score: {anime?.score || "-"}</div>
      <div className="bg-gray-100 p-4 rounded shadow">🏆 Ranking: {anime?.ranking || "-"}</div>
      <div className="bg-gray-100 p-4 rounded shadow">🔥 Popularity: {anime?.popularity || "-"}</div>
      <div className="bg-gray-100 p-4 rounded shadow">❤️ Favorites: {anime?.favorites || 0}</div>
    </div>

    <div className="text-sm space-y-1">
      <p><span className="font-semibold">Episodes:</span> {anime?.episodes}</p>
      <p><span className="font-semibold">Aired:</span> {anime?.aired}</p>
      <p><span className="font-semibold">Status:</span> {anime?.status || "Unknown"}</p>
      <p><span className="font-semibold">Genre:</span> {anime?.genres?.join(", ")}</p>
    </div>

    <div className="flex gap-3 w-full">
      <Link href={`/admin/dashboard/${animeId}/settings`} className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded transition duration-500">Edit Info</Link>
      <Link href={`/admin/dashboard/${animeId}/karakter/new`} className="bg-red-600 hover:bg-red-300 text-white px-4 py-2 rounded transition duration-500">Tambah Karakter</Link>
    </div>
  </div>
</div>
  );
}
