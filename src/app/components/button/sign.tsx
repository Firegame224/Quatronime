"use client";

import { Button } from "@/components/ui/button";
import { LogInIcon } from "lucide-react";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";

export default function ButtonSign() {
  const router = useRouter();
  const pathName = usePathname();
  const handleSignInClick = () => {
    router.push("/auth/signIn");
  };
  const handleSignUpClick = () => {
    router.push("/auth/signUp");
  };

  const handleBackClick = () => {
    router.push("/");
  }
  return (
    <div className="flex md:order-2 space-x-3 md:space-x-0 rtl:space-x-revers">
      {pathName === "/auth/signIn" || pathName === "/auth/signUp" ? (
        <div className="flex w-full h-full items-center">
          <button
          onClick={handleBackClick}
          className="text-white bg-red-700 border-white border-2 rounded p-1 w-24 hover:bg-white hover:text-red-700 transition ease-in duration-500"
          >
            back
          </button>
        </div>
      ) : (
        <div className="flex w-full h-full items-center gap-1">
          <Button
            type="button"
            className="text-white bg-transparent border-none  p-3 hover:underline hover:bg-transparent transition ease-in duration-500"
            onClick={handleSignUpClick}
          >
            SignUp
          </Button>
          <Button
            type="button"
            className="text-white bg-transparent border-white border-2 rounded p-3  hover:text-red-700 hover:bg-white transition ease-in duration-500"
            onClick={handleSignInClick}
          >
            <LogInIcon/>
            SignIn
          </Button>
        </div>
      )}
    </div>
  );
}
