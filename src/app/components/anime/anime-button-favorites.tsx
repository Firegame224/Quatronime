/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Bookmark } from "lucide-react";
import { AlertAnime } from "./anime-logout";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";


export default function AnimeButtonFavorites({
  animeId,
  data,
}: {
  animeId: number;
  data: any;
}) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const onConfirm = () => {
    router.push("/auth/signIn");
  };
  const handleAddFavorite = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/nimes/${animeId}/favorites` ,{
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user.id }),
      });
      if (!response.ok) {
        toast.error("Gagal menambahkan ke favorit");
      }
      if (response.ok) {
        toast.success("Berhasil menambahkan ke favorit");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi error di server di add favorite" + error);
    } finally {
      setIsLoading(false);
    }
  };
  const handleDeleteFavorite = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/nimes/${animeId}/favorites` ,{
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: session?.user.id }),
      });
      if (!response.ok) {
        toast.error("Gagal menghapus favorit");
      }
      if (response.ok) {
        toast.success("Berhasil menghapus favorit");
        router.refresh();
      }
    } catch (error) {
      toast.error("Terjadi error di server di delete favorite" + error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <AlertAnime
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />
      {!session?.user ? (
        <Button
          className="group text-white border-2 hover:border-[#fc0b03] justify-center hover:shadow-red-500/50 flex transition absolute bottom-0 right-4 ease-in duration-500 items-center p-0 rounded-full"
          size={"icon"}
          onClick={() => {
            setIsOpen(true);
          }}
        >
          <Bookmark
            fill="white"
            className="w-6 h-6 group-hover:fill-[#fc0b03] transition ease-in duration-500 group-hover:text-red-500"
          />
        </Button>
      ) : (
        <>
          {data ? (
            <Button
              className="group text-[#fc0b03] border-2 border-[#fc0b03] justify-center shadow-red-500/50 flex transition absolute bottom-1 right-4 items-center p-0 rounded-full"
              size={"icon"}
              onClick={handleDeleteFavorite}
            >
              <Bookmark fill="#fc0b03" className="w-6 h-6 text-[#fc0b03]" />
            </Button>
          ) : (
            <Button
              className="group text-white border-2 hover:border-[#fc0b03] justify-center hover:shadow-red-500/50 flex transition absolute bottom-1 right-4 ease-in duration-500 items-center p-0 rounded-full"
              size={"icon"}
              onClick={handleAddFavorite}
            >
              <Bookmark
                fill="white"
                className="w-6 h-6 group-hover:fill-[#fc0b03] transition ease-in duration-500 group-hover:text-red-500"
              />
            </Button>
          )}
        </>
      )}
    </>
  );
}
