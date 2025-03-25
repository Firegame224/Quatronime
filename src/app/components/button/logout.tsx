
"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";

export default function LogOutbutton() {
  const { data: Session } = useSession();
  const href = Session?.user.role == "USER" ? "/users/dashboard" : "/admin";
  const text =
    Session?.user.role == "USER"
      ? Session?.user.name || "Your Name"
      : Session?.user.name || "Your Name";
  const role = Session?.user.role == "USER" ? "USER" : "ADMIN";
  return (
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-revers">
      <Link
        href={href}
        className="text-white bg-red-700 border-white rounded p-2 flex gap-2 items-center justify-center hover:bg-white hover:text-red-700 transition ease-in duration-500"
      >
        <div className="w-full h-auto flex flex-col justify-center mr-3">
          <p className="text-[10px]">{role}</p>
          <p className="text-sm">{text}</p>
        </div>
        <div className="w-10 h-10">
          <Image
            src={
              Session?.user.image ||
              "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
            }
            width={100}
            height={100}
            alt={Session?.user.name || ""}
            className="rounded-full min-w-10 h-10"
          />
        </div>
      </Link>
    </div>
  );
}
