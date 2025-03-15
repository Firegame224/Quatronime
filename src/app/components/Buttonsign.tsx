"use client";

import { useSession } from "next-auth/react";
import LogOutbutton from "./button/logout";
import { Button } from "@/components/ui/button";
import ButtonSign from "./button/sign";

export default function SessionNav() {
  const { data: session, status } = useSession();
  if (status === "loading")
    return (
      <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-revers ">
        <Button className="text-white bg-red-700 border-white rounded p-2 flex gap-2 items-center justify-center hover:bg-white hover:text-red-700 transition ease-in duration-500">
          <p className="text-sm">Loading... </p>
          <div
            className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] text-success motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </Button>
      </div>
    );
  return <>{!session ? <ButtonSign /> : <LogOutbutton />}</>;
}
