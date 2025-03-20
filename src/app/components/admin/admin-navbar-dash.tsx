
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { AuthSession } from "@/libs/session";
import { TvIcon, User } from "lucide-react";
import Link from "next/link";
import { AdminLogoutButton } from "./logout-button";
import prisma from "@/libs/prisma";

function NavItem({ href, icon, label } : { href: string; icon: React.ReactNode; label: string }) {
    return (
      <Link
        href={href}
        className="flex gap-3 items-center text-white hover:text-gray-300 transition-colors px-4 py-2 rounded-md hover:bg-white/10"
      >
        {icon}
        <p>{label}</p>
      </Link>
    );
  }
export default async function AdminNavbarDash() {
  const session = await AuthSession();
    const anime = await prisma.anime2.findMany();
  return (
    <nav className="w-full p-5 bg-red-700 shadow-lg h-full rounded-r-lg">
      {/* Profil Admin */}
      <div className="flex items-center gap-4 text-white">
        <Avatar className="w-14 h-14 border-2 border-white shadow-md hover:scale-105 transition-transform">
          <AvatarImage src={session?.image} alt="User Avatar" />
          <AvatarFallback>{session?.name?.charAt(0) || "?"}</AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm font-light text-gray-200">{session?.role || "Admin"}</p>
          <h1 className="text-lg font-semibold">{session?.name || session?.email}</h1>
        </div>
      </div>

      {/* Garis Pemisah */}
      <Separator className="my-4 border-white/30" />

      {/* Navigasi Admin */}
      <div className="flex flex-col gap-4 text-lg font-medium">
        <NavItem href="/admin/users" icon={<User className="w-6 h-6" />} label="Data User" />
        <NavItem href={anime ? `/admin/dashboard/${anime[0].id}` : "/admin/dashboard"} icon={<TvIcon className="w-6 h-6" />} label="Data Anime" />
        <AdminLogoutButton/>
      </div>
    </nav>
  );
}
