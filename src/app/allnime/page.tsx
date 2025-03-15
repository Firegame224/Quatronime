"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import Kartu from "../components/anime/card";

export default function AnimePage() {
  const [animes, setAnimes] = useState([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const limit = 10; // Jumlah anime per halaman

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
    <div className="p-2md:p-8 text-white">
      <h1 className="text-2xl font-bold">List Anime</h1>
        <Kartu  Api={animes} />
      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-4">
        <Button 
          onClick={() => setPage(page - 1)} 
          disabled={page === 1}
          className="bg-red-500"
        >
          Prev
        </Button>
        
        <span className="text-lg">Page {page}</span>

        <Button 
          onClick={() => setPage(page + 1)} 
          disabled={page * limit >= total}
          className="bg-red-500"
        >
          Next
        </Button>
      </div>
    </div>
  );
}
