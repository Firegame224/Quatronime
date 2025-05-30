/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import Image from "next/image";
import CharacterSkeleton from "./character-skeleton";
import { useEffect, useState } from "react";


export default function CharacterCard({ character }: any) {
  const [loading , setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false),900)
    return () => clearTimeout(timer)
  }, [])

  if (loading) {
    return (
      <CharacterSkeleton/>
    )
  }
  return (
    <div className="bg-gray-800 p-4 rounded-lg text-center shadow-md">
      <Image
        src={
          character.imageUrl ||
          "https://img.freepik.com/premium-vector/default-image-icon-vector-missing-picture-page-website-design-mobile-app-no-photo-available_87543-11093.jpg"
        }
        alt={character.name}
        className="w-24 h-24 object-cover mx-auto rounded-full border-2 border-red-500"
        width={200}
        height={200}
      />
      <p className="mt-2 font-bold text-white">{character.name}</p>
      <p className="text-sm text-gray-400">{character.role}</p>
      <p className="text-xs text-red-400">CV: {character.cover}</p>
    </div>
  );
}
