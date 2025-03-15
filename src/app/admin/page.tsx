import prisma from "@/libs/prisma";
import Link from "next/link";

export default async function AdminPage() {
  const data = await prisma.anime2.findFirst({});
  const href = data ? "admin/dashboard/1" : "/admin/dashboard";

  return (
    <div className="w-full h-screen justify-center items-center flex flex-col gap-3 bg-white">
      <h1 className="text-2xl font-semibold">Halo Admin</h1>
      <Link
        href={href}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        Click To DashBoard
      </Link>
    </div>
  );
}