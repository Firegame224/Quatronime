"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import toast from "react-hot-toast";

export default function SearchNimeComponent() {
  const InputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const query = InputRef.current?.value.trim();
      if (!query || query.length < 3) {
        toast.error("Query minimal 3 karakter");
        return;
      }
      router.push(`/search/${query}`);
    } catch (error) {
      toast.error("Telah Terjadi error di catch handle Submit" + error);
      return;
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    toast.loading("Mencari Anime...");
  }
  return (
    <form
      className="flex items-center w-full p-2  text-white"
      onSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Cari Anime"
        ref={InputRef}
        onChange={(e) => console.log(e.target.value)}
        className="bg-transparent text-white font-sans md:w-[400px]"
      />
      <Button
        type="submit"
        color="white"
        className="bg-white hover:bg-slate-300"
      >
        <SearchIcon color="black" width={30} height={30} />
      </Button>
    </form>
  );
}
