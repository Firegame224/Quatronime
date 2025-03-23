import Link from "next/link";
import AdminNavbarDash from "../components/admin/admin-navbar-dash";

export default async function AdminPage() {
  return (
    <div className="w-full h-screen items-center flex-col flex md:flex-row gap-3 bg-white">
      <section className="w-full md:w-1/3 md:h-full flex items-center">
      <AdminNavbarDash/>
      </section>
      <section className="w-full h-full flex items-center justify-center flex-col gap-2">
      <h1 className="text-2xl font-semibold">Halo Admin</h1>
      <Link href={"/"} className="bg-slate-900 rounded-sm hover:bg-slate-600 text-white p-2">Back to User Side</Link>
      </section>
    </div>
  );
}