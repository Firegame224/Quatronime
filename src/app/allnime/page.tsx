"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Kartu from "../components/anime/card";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function AnimePage() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10;

  useEffect(() => {
    async function fetchAnime() {
      const res = await fetch(`/api/anime?page=${page}&limit=${limit}`);
      if (!res.ok) return console.error("Gagal mengambil data");
      const data = await res.json();
      setAnimes(data.animes);
      setTotal(data.total);
    }
    fetchAnime();
  }, [page]);

  return (
    <div className="text-white min-h-screen">
      <div className="p-2 md:p-8 w-full">
        <div className="w-full flex justify-between">
          <h1 className="text-2xl font-bold">List Anime</h1>
          <Link href="/" className="hover:underline text-[#9e1313] dark:hover:text-white transition duration-500 ease-in-out flex items-center">
            <ArrowLeft className="w-6 h-6"/>
            Back
          </Link>
        </div>
        <Kartu Api={animes} />
      </div>
      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4 items-center w-full p-8">
        <Button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="bg-red-600 hover:bg-red-400 transition ease-in duration-500" 
        >
          Prev
        </Button>

        <span className="text-lg">Page {page}</span>

        <Button
          onClick={() => setPage(page + 1)}
          disabled={page * limit >= total}
          className="bg-red-600 hover:bg-red-400 transition ease-in duration-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
