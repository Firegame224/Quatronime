"use client";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Bookmark, LogOut, User } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { FaComment } from "react-icons/fa";

export default function UserNavbarDash() {
  const { data: session } = useSession();
  const pathname = usePathname()
  const router = useRouter();
  return (
    <>
      <nav className="w-full p-5 bg-red-700 shadow-lg h-full rounded-r-lg hidden md:block">
        {/* Profil Admin */}
        <div className="flex items-center gap-4 text-white">
          <Avatar className="w-14 h-14 border-2 border-white shadow-md hover:scale-105 transition-transform">
            <AvatarImage src={session?.user.image} alt="User Avatar" />
            <AvatarFallback>
              {session?.user.name?.charAt(0) || "?"}
            </AvatarFallback>
          </Avatar>

          <div>
            <p className="text-sm font-light text-gray-200">
              {session?.user.role || "Admin"}
            </p>
            <h1 className="text-lg font-semibold">
              {session?.user.name || session?.user.email}
            </h1>
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
            <User className="w-6 h-6" /> Profile
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
