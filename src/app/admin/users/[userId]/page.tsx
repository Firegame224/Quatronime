import UsersForm from "../../../components/admin/user/ui/user-settings-form";
import Link from "next/link";
import prisma from "@/libs/prisma";
import { User } from "@prisma/client";
import { fetcher } from "@/libs/fetcher";
import { ArrowLeft } from "lucide-react";
import { DataTable } from "@/components/ui/data-table";
import { komen } from "@/app/components/admin/user/komentar/komentar";
import HeadingNav from "@/components/ui/heading";
import { Favorite } from "@/app/components/admin/user/favorite/favorite";

interface UsersPageProps {
  params: { userId: string };
}

export default async function UserSettingPage({ params }: UsersPageProps) {
  const { userId } = await params;
  const user = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  const { data: favorites } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user?.id}/collections`,
  });

  console.log(favorites)
  const { data: komentar } = await fetcher({
    port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${user?.id}/komentar`,
  });

  return (
    <div className="w-full min-h-screen items-center p-5 gap-5 ">
      <div className="w-full flex justify-between items-center">
        <HeadingNav
          title={`Data User dengan name ${user?.name}`}
          description=""
        />
        <Link
          href="/admin/users"
          className={
            "bg-black text-white rounded-sm hover:opacity-80 p-2 transition duration-500 ease-in-out flex items-center gap-2"
          }
        >
          <ArrowLeft />
          Back
        </Link>
      </div>
      <div className="w-full my-10">
        <p className="font-semibold text-xl">Data Favorite ({favorites.length})</p>
        <DataTable data={favorites} columns={Favorite} searchKey={"title"} />
        <p className="font-semibold text-xl">Data Komentar ({komentar.length})</p>
        <DataTable data={komentar} columns={komen} searchKey={"komentar"} />
        <UsersForm data={user as User} />
      </div>
    </div>
  );
}
