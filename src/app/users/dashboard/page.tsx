"use client";
import LogoutButton from "@/app/components/admin/logout-button";
import { useSession } from "next-auth/react";
import Image from "next/image";

export default function Dashboard() {
  const { data: Session } = useSession();
  return (
    <div className="w-full h-screen bg-white p-1 items-center justify-center flex flex-col">
      <div className="w-full items-center flex justify-center flex-col gap-5">
        <Image
          src={
            Session?.user.image ||
            "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
          }
          alt={Session?.user.name || ""}
          width={200}
          height={200}
        />
        <h1 className="text-2xl">{Session?.user?.email}</h1>
        <LogoutButton/>
      </div>
    </div>
  );
}
