"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

interface KomentarProps {
  data: {
    email: string;
    id: string;
  };
  params: number;
}
export default function AnimeKomentarDelete({ data, params }: KomentarProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const handleDelete = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(`/api/nimes/${params}/komentar/${data.id}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ email: session?.user.email }),
      });
      if (!response.ok) {
        toast.error("gagal menghapus komentar");
      }
      if (response.ok) {
        setIsOpen(false);
        toast.success("Komentar berhasil di hapus");
        router.refresh();
      }
    } catch (error) {
      toast.error("Telah Terjadi error di catch handle Submit" + error);
    } finally {
      setIsLoading(false);
    }
  };
  console.log(params);
  console.log(data.id);
  return (
    <>
      <AlertModal isOpen={isOpen} loading={isLoading} onClose={() => setIsOpen(false)} onConfirm={handleDelete} />
      {session && session.user.email === data?.email ? (
        <Button
          onClick={()=> setIsOpen(true)}
          type="submit"
          disabled={isLoading}
          className="bg-[#fc0b03] hover:bg-red-300 text-white text-xs"
          size={"icon"}
        >
          <Trash2 className="w-4 h-4" fill={isLoading ? "white" : "#fc0b03"} />
        </Button>
      ) : null}
    </>
  );
}
