import prisma from "@/libs/prisma";
import Link from "next/link";
import AdminNavbarDash from "../components/admin/admin-navbar-dash";

export default async function AdminPage() {
  const data = await prisma.anime2.findFirst({});
  const href = data ? "admin/dashboard/1" : "/admin/dashboard";

  return (
    <div className="w-full h-screen items-center flex gap-3 bg-white">
      <section className="w-1/3 h-full">
      <AdminNavbarDash/>
      </section>
      <section className="w-full h-full flex items-center justify-center">
      <h1 className="text-2xl font-semibold">Halo Admin</h1>
      </section>
    </div>
  );
}