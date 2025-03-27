"use client";

import { Button } from "@/components/ui/button";
import { MailIcon } from "lucide-react";
import { useSession } from "next-auth/react";
import { AlertAnime } from "../anime/anime-logout";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function ButtonEmail() {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleConfirm = () => {
    router.push("/auth/signIn");
    setIsOpen(false);
  };

  const { data: session } = useSession();
  const handleClick = () => {
    setIsLoading(true);
    router.push("/email");
  };
  return (
    <>
      <AlertAnime
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={handleConfirm}
        loading={isLoading}
      />
      {!session?.user ? (
        <div className="w-full flex items-center justify-center">
          <Button
            className="bg-red-600 hover:bg-red-400 items-center flex gap-2 text-white mt-5 p-2 rounded-md"
            onClick={() => setIsOpen(true)}
          >
            <MailIcon className="w-6 h-6" />
            <p className="text-white text-md font-semibold">Hubungi Admin</p>
          </Button>
        </div>
      ) : (
        <div className="w-full flex items-center justify-center">
          <Button
            className="bg-red-600 hover:bg-red-400 items-center flex gap-2 text-white mt-5 p-2 rounded-md"
            onClick={handleClick}
          >
            <MailIcon className="w-6 h-6" />
            <p className="text-white text-md font-semibold">Hubungi Admin</p>
          </Button>
        </div>
      )}
    </>
  );
}
