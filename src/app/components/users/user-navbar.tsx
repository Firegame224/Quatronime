"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { fetchOne } from "@/libs/fetcher";
import { User } from "@prisma/client";
import { Bookmark, LogOut, UserIcon } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FaComment } from "react-icons/fa";

export default function UserNavbarDash() {
  const pathname = usePathname();
  const router = useRouter();
  const {data : session} = useSession()
  const [user , setUser] = useState<User>()
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchOne({port :`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user.id}`})

      setUser(data)
    }
    getUser()
  },[session?.user.id])
  return (
    <>
      <nav className="w-full p-5 bg-red-700 shadow-lg h-full rounded-r-lg hidden md:block">
        {/* Profil Admin */}
        <div className="flex items-center gap-4 text-white">
          <Avatar className="w-14 h-14 border-2 border-white shadow-md hover:scale-105 transition-transform">
            <AvatarImage src={user?.image} alt="User Avatar" />
            <AvatarFallback>{user?.name?.charAt(0) || "?"}</AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-light text-gray-200">{user?.role}</p>
            <h1 className="text-lg font-semibold">{user?.name || user?.email}</h1>
          </div>
        </div>

        {/* Garis Pemisah */}
        <Separator className="my-4 border-white/30" />

        {/* Navigasi Admin */}
        <div className="flex flex-col gap-4 text-lg font-medium">
          <Button
            className={`${pathname === "/users/dashboard" ? "bg-red-400" : "bg-transparent"} hover:bg-red-400 shadow-none flex items-center gap-2 justify-start`}
            onClick={() => router.push("/users/dashboard")}
          >
            <UserIcon className="w-6 h-6" /> Profile
          </Button>
          <Button
            className={`${pathname === "/users/dashboard/favorite" ? "bg-red-400" : "bg-transparent"} hover:bg-red-400 shadow-none flex items-center gap-2 justify-start`}
            onClick={() => router.push("/users/dashboard/favorite")}
          >
            <Bookmark className="w-6 h-6" /> Favorite
          </Button>
          <Button
            className={`${pathname === "/users/dashboard/comment" ? "bg-red-400" : "bg-transparent"} hover:bg-red-400 shadow-none flex items-center gap-2 justify-start`}
            onClick={() => router.push("/users/dashboard/comment")}
          >
            <FaComment className="w-6 h-6" /> Comments
          </Button>
          <Button
            className="bg-transparent hover:bg-red-400 shadow-none flex items-center gap-2 justify-start"
            onClick={() => signOut()}
          >
            <LogOut className="w-6 h-6" /> Logout
          </Button>
        </div>
      </nav>
    </>
  );
}