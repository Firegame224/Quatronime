import UsersKomentarCard from "@/app/components/users/users-komentar-card";
import prisma from "@/libs/prisma";
import { AuthSession } from "@/libs/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

export default async function UserKomentarPage() {
  const session = await AuthSession();
  const response = await prisma.komentar.findMany({
    where: {
      userId: session?.id,
    },
    include: {
      anime: true,
    },
  });
  const komentar = response.map((item) => item);

  if (komentar.length === 0) {
    return (
      <div className="w-full flex flex-col min-h-screen p-5">
        <div className="w-full justify-between flex">
          <div className="w-1/2 flex flex-col">
            <p className="text-xl text-white font-semibold">
              Komentar ( {komentar.length} )
            </p>
            <p className="text-sm text-muted-foreground">
              Ini adalah semua Komentar kamu
            </p>
          </div>
          <Link
            href="/"
            className="p-2 rounded-md hover:bg-red-400 flex items-center gap-2 bg-[#9e1313] text-white transition duration-500 ease-in-out"
          >
            <ArrowLeft className="w-6 h-6" />
            Kembali
          </Link>
        </div>
        <div className="flex flex-col justify-center h-full items-center w-full text-white text-md">
          <p className="text-2xl font-semibold">Belum ada komentar</p>
        </div>
      </div>
    );
  }
  return (
    <div className="w-full min-h-screen flex flex-col p-4">
      <section className="w-full justify-between items-center flex">
        <div className="w-1/2 flex flex-col">
          <p className="text-xl text-white font-semibold">
            Komentar ( {komentar.length} )
          </p>
          <p className="text-sm text-muted-foreground">
            Ini adalah semua Komentar kamu
          </p>
        </div>
        <Link
          href="/"
          className="p-2 rounded-md hover:bg-red-400 flex items-center gap-2 bg-[#9e1313] text-white transition duration-500 ease-in-out"
        >
          <ArrowLeft className="w-6 h-6" />
          Kembali
        </Link>
      </section>
      <section className="w-full h-full p-4">
        <UsersKomentarCard data={komentar} />
      </section>
    </div>
  );
}
