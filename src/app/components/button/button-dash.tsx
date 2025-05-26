"use client";

import Image from "next/image";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { fetchOne } from "@/libs/fetcher";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

export default function LogOutbutton() {
  const { data: Session } = useSession();
  const [user, setUser] = useState<User>();
  useEffect(() => {
    const getUser = async () => {
      const data = await fetchOne({
        port: `${process.env.NEXT_PUBLIC_API_URL}/api/users/${Session?.user.id}`,
      });

      setUser(data);
    };
    getUser();
  }, [Session?.user.id]);
  const href = user?.role == "USER" ? "/users/dashboard" : "/admin";
  const text = user?.name;
  const role = user?.role ? (user?.role == "USER" ? "USER" : "ADMIN") : null;
  return (
    <div>
      {user ? 
        <div className="flex md:order-2 md:space-x-0 rtl:space-x-revers">
          <Link
            href={href}
            className="text-white bg-red-700 border-white border rounded p-2 flex gap-2 items-center justify-center hover:bg-white hover:text-red-700 transition ease-in duration-500"
          >
            <div className="w-full h-auto flex flex-col justify-center mr-3">
              <p className="text-[10px]">{role}</p>
              <p className="text-sm">{text}</p>
            </div>
            <div className="w-10 h-10">
              <Image
                src={
                  user?.image ||
                  "https://i.pinimg.com/736x/09/7d/3c/097d3cf1d036e549d1caa10ad9268dfe.jpg"
                }
                width={100}
                height={100}
                alt={user?.name || "yy"}
                className="rounded-full min-w-10 h-10"
              />
            </div>
          </Link>
        </div>
      : 
        <div className="flex md:order-2 space-x-3 md:space-x-0 animate-pulse">
          <Link
            href={"#"}
            className="text-white bg-red-700 border-white rounded p-2 flex gap-2 items-center justify-center"
          >
            <div className="w-full h-auto flex flex-col justify-center mr-3 gap-2">
              <div className="text-[10px] w-16 h-3 bg-gray-400"></div>
              <div className="text-sm w-20 h-3 bg-gray-400"></div>
            </div>
            <div className="w-10 h-10">
              <div className="rounded-full min-w-10 h-10 bg-gray-400" />
            </div>
          </Link>
        </div>
      }
    </div>
  );
}
