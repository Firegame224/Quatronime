"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LogOutbutton() {
  const { data: Session } = useSession();
  const href = Session?.user.role == "USER" ? "/users/dashboard" : "/admin";
  const text = Session?.user.role == "USER" ? Session?.user.email : Session?.user.email;
  return (
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-revers">
      <Link
        href={href}
        className="text-white bg-red-700 border-white rounded p-2 flex gap-2 items-center justify-center hover:bg-white hover:text-red-700 transition ease-in duration-500"
      >
        <p className="text-sm">{text}</p>
        <Image
          src={Session?.user.image || "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"}
          alt={Session?.user.name || "Gambar belum Kerender"}
          height={30}
          width={30}
          className="rounded-full"
        />
      </Link>
    </div>
  );
}
