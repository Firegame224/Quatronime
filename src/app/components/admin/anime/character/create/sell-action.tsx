"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { KarakterColumn } from "./column";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontalIcon, Trash2Icon } from "lucide-react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { useState } from "react";
import { AlertModal } from "@/components/modals/alert-modal";

interface ActionProps {
  data: KarakterColumn;
}

const SellAction: React.FC<ActionProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("Id karakter berhasil di copy");
  };
  const onDelete = async () => {
    try {
      setIsLoading(true);
      setIsOpen(true);
      const response = await fetch(
        `/api/nimes/${params.animeId}/character/${data.id}`,
        {
          method: "DELETE",
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (!response.ok) {
        toast.error("Terjadi error pada server di method Delete anime");
      }
      if (response.ok) {
        toast.success("Data Anime Berhasil dihapus");
        router.refresh();
        router.push(`/admin/dashboard/${params.animeId}/karakter`);
      }
    } catch (error) {
      console.error("Error di method Delete anime" + error);
    } finally {
      setIsLoading(false);
      setIsOpen(false)
    }
  };
  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => onCopy(data.id)}>
            <Copy className="mr-2 w-4 h-4" />
            Copy
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() =>
              router.push(
                `/admin/dashboard/${params.animeId}/karakter/${data.id}`
              )
            }
          >
            <Edit className="mr-2 w-4 h-4" />
            Update
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setIsOpen(true)}>
            <Trash2Icon className="mr-2 w-4 h-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SellAction;
