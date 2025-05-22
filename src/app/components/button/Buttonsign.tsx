'use client'
import { useSession } from "next-auth/react";
import LogOutbutton from "./logout";
import ButtonSign from "./sign";
import Link from "next/link";
import { fetchOne } from "@/libs/fetcher";
import { useEffect, useState } from "react";
import { User } from "@prisma/client";

export default function SessionNav() {
  const { data: session, status } = useSession();
      const [user , setUser] = useState<User>()
      useEffect(() => {
        const getUser = async () => {
          const data = await fetchOne({port :`${process.env.NEXT_PUBLIC_API_URL}/api/users/${session?.user.id}`})
    
          setUser(data)
        }
        getUser()
      },[session?.user.id])
      
  if (status === "loading" || !user)
    return (
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
          <div
            className="rounded-full min-w-10 h-10 bg-gray-400"
          />
        </div>
      </Link>
    </div>
    );
  return <> {!session ? <ButtonSign /> : <LogOutbutton />}</>;
}
