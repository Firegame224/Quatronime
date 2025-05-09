/* eslint-disable @typescript-eslint/no-explicit-any */

import SettingUsersForm from "@/app/components/users/users-profile-form";
import prisma from "@/libs/prisma";
import { AuthSession } from "@/libs/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";
import UsersFavoritesKomentar from "@/app/components/users/users-favorites-komentar";
import { fetcher } from "@/libs/fetcher";

export default async function Dashboard() {
  const session = await AuthSession();
  const userData = await prisma.user.findUnique({
    where: {
      id: session?.id,
    },
  });
  const { data : collections } = await fetcher({port : `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.id}/collections`});
  const {data: komentar} = await fetcher({port : `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.id}/komentar`});
  return (
    <div className="w-full min-h-screen flex">
      <div className="w-full items-center flex md:flex justify-center flex-col gap-2 p-4 rounded-lg h-full">
        <div className="w-full justify-between flex">
          <h1 className="text-2xl font-semibold text-white">Profile</h1>
          <Link
            href="/"
            className="hover:bg-red-400 p-2 rounded-md bg-red-600 text-white transition duration-500 ease-in-out flex items-center"
          >
            <ArrowLeft className="w-6 h-6" />
            Back
          </Link>
        </div>
        <Image
          src={
            session?.image ||
            "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
          }
          alt={"Bebas aja"}
          className="rounded-full w-32 h-32 md:w-52 md:h-52 object-cover"
          width={200}
          height={200}
        />
        <SettingUsersForm data={userData as any} />
        <Separator className="mt-2 mb-0 block md:hidden" />
        <section className="w-full h-full md:hidden flex">
          <UsersFavoritesKomentar favorite={collections} komentar={komentar}/>
        </section>
      </div>
    </div>
  );
}
