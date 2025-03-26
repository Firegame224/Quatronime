"use client";

import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { useState } from "react";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { AlertAnime } from "./anime-logout";

interface KomentarProps {
  params: number;
}
export default function KomentarAnimeInput({ params }: KomentarProps) {
  const { data: session } = useSession();
  const [comment, setComment] = useState<string>("");
  const router = useRouter();
  const [onClick, setOnClick] = useState<boolean>(false);
  const [onInput, setOninput] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [onOpen, setOnOpen] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setComment(value);
    if (value.length == 0) {
      setOninput(false);
    }
    if (value.length > 0) {
      setOninput(true);
    }
  };

   const handleClose = () => {
    setOnClick(false);
    setComment("")
  }
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      setIsLoading(true);
      e.preventDefault();
      const response = await fetch(`/api/nimes/${params}/komentar`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: session?.user.email, comment , image: session?.user.image }),
      });

      if (!response.ok) {
        toast.error("Telah Terjadi error di catch handle Submit");
      }
      if (response.ok) {
        toast.success("Komentar berhasil di tambahkan");
        setComment("")
        setOnClick(false)
        router.refresh();
      }
    } catch (error) {
      toast.error("Telah Terjadi error di catch handle Submit" + error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(session?.user.id)
  return (
    <>
    <AlertAnime isOpen={onOpen} onClose={() => setOnOpen(false)} onConfirm={() => {router.push("/auth/signIn")}} loading={isLoading} />
    {session ? (
      <form
      className="w-full flex flex-col gap-3 my-10 items-center"
      onSubmit={handleSubmit}
    >
      <div className="w-full flex gap-3">
        <div className="">
          <Image
            src={
              session?.user.image ||
              "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
            }
            alt={session?.user.name || "Gambar belum Kerender"}
            width={50}
            height={50}
            className="rounded-full"
          />
        </div>
        <Textarea
          onChange={handleChange}
          onFocus={() => setOnClick(true)}
          placeholder="Tulis komentar.."
          className=" border-white shadow-none ring-0 focus:ring-0"
          value={comment}
        />
      </div>
      {onClick ? (
        <div className="w-full justify-end flex gap-3">
          <Button
            onClick={handleClose}
            type="button"
            className="bg-transparent hover:bg-transparent hover:underline transition ease-in duration-500 self-end"
          >
            Batal
          </Button>
          <Button
            disabled={isLoading || !onInput}
            type="submit"
            className="bg-red-500 hover:bg-red-300 transition ease-in duration-500 disabled:bg-gray-400 disabled:cursor-not-allowed self-end"
          >
            {isLoading ? "Loading..." : "Kirim"}
          </Button>
        </div>
      ) : null}
    </form>
    ) : (
    <form
        className="w-full flex flex-col gap-3 my-10 items-center"
        onSubmit={handleSubmit}
      >
        <div className="w-full flex gap-3">
          <div className="">
            <Image
              src={
                "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
              }
              alt={"Gambar belum Kerender"}
              width={50}
              height={50}
              className="rounded-full"
            />
          </div>
          <Textarea
            onChange={handleChange}
            onFocus={() => setOnOpen(true)}
            placeholder="Tulis komentar.."
            className=" border-white shadow-none ring-0 focus:ring-0"
            value={comment}
          />
        </div>
      </form>
    )}
    </>
  );
}
