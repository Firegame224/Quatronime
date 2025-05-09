import UsersForm from "../components/ui/user-settings-form";
import Link from "next/link";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";
import { fetcher } from "@/libs/fetcher";
import { ArrowLeft } from "lucide-react";
import UsersKomentarCard from "@/app/components/users/users-komentar-card";
import Kartu from "@/app/components/anime/card";

interface UsersPageProps {
  params: { userId: string };
}
export default async function UserSettingPage({ params }: UsersPageProps) {
  const userId = params.userId;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const { data: favorites } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user?.id}/collections`,
  });
  const { data: komentar } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user?.id}/komentar`,
  });
  return (
    <div className="w-full min-h-screen items-center p-5 gap-5">
      <div className="w-full flex justify-between items-center">
        <Link
          href="/admin/users"
          className={
            "hover:underline bg-[#9e1313] rounded-sm hover:bg-red-400 text-white p-2 transition duration-500 ease-in-out flex items-center gap-2"
          }
        >
          <ArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full mb-10">
        <UsersForm data={user as User} />
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="text-2xl font-semibold">Favorites ({favorites.length})</p>
        {favorites.length > 0 ? (
          <div className="w-full min-h-screen">
            <Kartu Api={favorites} />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-2xl font-semibold">Favorit tidak ada</h1>
          </div>
        )}
      </div>
      <div className="w-full flex flex-col gap-4">
        <p className="text-2xl font-semibold">Komentar ({komentar.length})</p>
        {favorites.length > 0 ? (
          <div className="w-full min-h-screen">
            <UsersKomentarCard data={komentar} />
          </div>
        ) : (
          <div className="w-full flex flex-col justify-center items-center min-h-screen">
            <h1 className="text-2xl font-semibold">Komentar tidak ada</h1>
          </div>
        )}
      </div>
    </div>
  );
}
