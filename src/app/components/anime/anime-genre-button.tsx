'use client'
import { useRouter } from "next/navigation";

export default function AnimeGenreButton() {
  const Genre = [
    "Action",
    "Adventure",
    "Comedy",
    "Drama",
    "Fantasy",
    "Horror",
    "Mystery",
    "Psychological",
    "Romance",
    "Sci-Fi",
    "Slice of Life",
    "Sports",
    "Supernatural",
  ];
  const router = useRouter();
  return (<div className="w-full">
    <div className="flex flex-wrap gap-2 justify-center items-center p-2">
      {Genre.map((genre, index) => {
        return (
          <button key={index} onClick={() => router.push(`/search/genre/${genre}`)} className="bg-[#9e1313] rounded-sm hover:bg-red-400 text-white p-2 transition duration-500 ease-in-out">
            {genre}
          </button>
        );
      })}
    </div>
  </div>)
}
