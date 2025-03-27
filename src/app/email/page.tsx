"use client";

import FormEmailUsers from "../components/users/user-email-form";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function EmailPage() {
  const router = useRouter();
  return (
    <div className="w-full h-full p-2 md:p-5 flex flex-col items-center justify-center gap-3">
      <div className="w-full justify-end flex items-center p-2">
        <Button
          onClick={() => router.back()}
          className="p-2 rounded-md hover:bg-red-400 flex items-center gap-2 bg-[#9e1313] text-white transition duration-500 ease-in-out"
        >
          <ArrowLeft className="w-6 h-6" />
          Kembali
        </Button>
      </div>
      <FormEmailUsers />
    </div>
  );
}
