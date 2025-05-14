import CollectionsCards from "@/app/components/users/user-favorites-card";
import { fetcher } from "@/libs/fetcher";
import { AuthSession } from "@/libs/session";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function UsersFavoritePage() {
  const session = await AuthSession();
  const { data : collections } = await fetcher({ port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.id}/collections` });
  if (collections.length === 0) {
    return (
      <div className="w-full flex flex-col min-h-screen p-5">
      <div className="w-full justify-between flex">
        <div className="w-1/2 flex flex-col">
          <p className="text-xl text-white font-semibold">Favorite ( {collections.length} )</p>
          <p className="text-sm text-muted-foreground">Ini adalah semua anime yang telah kamu tambahkan ke favorit</p>
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
        Ups, Sepertinya Belum Ada Anime yang kamu tambahkan ke favorit.
      </div>
    </div>
    )
  }
  return (
    <div className="w-full flex flex-col min-h-screen p-5">
      <div className="w-full justify-between flex">
        <div className="w-1/2 flex flex-col">
          <p className="text-xl text-white font-semibold">Favorite ( {collections.length} )</p>
          <p className="text-sm text-muted-foreground">Ini adalah semua anime yang telah kamu tambahkan ke favorit</p>
        </div>
        <Link
          href="/"
          className="p-2 rounded-md hover:bg-red-400 flex items-center gap-2 bg-[#9e1313] text-white transition duration-500 ease-in-out"
        >
          <ArrowLeft className="w-6 h-6" />
          Kembali
        </Link>
      </div>
        <CollectionsCards Api={collections}/>
    </div>
  );
}
