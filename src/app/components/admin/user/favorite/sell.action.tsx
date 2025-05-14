"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FavoriteColumn } from "./favorite";
import { Button } from "@/components/ui/button";
import { DoorOpen, MoreHorizontalIcon } from "lucide-react";
import { useRouter } from "next/navigation";

interface ActionProps {
  data: FavoriteColumn;
}

const SellAction: React.FC<ActionProps> = ({ data }) => { 
  const router = useRouter()
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost">
            <span className="sr-only">Open menu</span>
            <MoreHorizontalIcon className="w-4 h-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Action</DropdownMenuLabel>
          <DropdownMenuItem onClick={() => router.push(`/anime/${data.id}`)}>
            <DoorOpen className="mr-2 w-4 h-4" />
            Kunjungi
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default SellAction;
