/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import React, { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "./popover";
import { useNimeModals } from "../../../hooks/use-store-modal";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./button";
import { Check, ChevronsUpDown, PlusCircleIcon, TvIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "./command";
import { CommandEmpty } from "cmdk";

type PopoverProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface AnimeSwitcherProps extends PopoverProps {
  items: {
    id: number,
    title: string
  }[]
}
export default function AnimeSwitcher({
  className,
  items = [],
}: AnimeSwitcherProps) {
  const Animemodal = useNimeModals();
  const params = useParams();
  const router = useRouter();
  const formatedNime = items.map((nime) => {
    return {
      label: nime.title,
      value: nime.id,
    };
  });
  const activeNime = formatedNime.find(
    (nime) => nime.value === Number(params.animeId)
  );

  const [isOpen, setIsOpen] = useState(false);
  const onNimeSelect = ({ value, label }: { value: number; label: string }) => {
    setIsOpen(false);
    router.push(`/admin/dashboard/${value}`);
  };
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size={"sm"}
          role="combobox"
          aria-expanded={isOpen}
          aria-label="Pilih Anime"
          className={cn("w-[200px] justify-between", className)}
        >
          <TvIcon />
          <p className="max-w-[170px] truncate">{activeNime?.label || "Pilih Anime"}</p>
          <ChevronsUpDown className="w-4 h-4 ml-auto shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandList>
            <CommandInput placeholder="Cari Anime..." />
            <CommandEmpty className="text-sm ml-3">
              Anime tidak ditemukan
            </CommandEmpty>
            <CommandGroup heading="Anime">
              {formatedNime.map((nime, index) => (
                <CommandItem
                  key={index}
                  onSelect={() => onNimeSelect(nime)}
                  className="text-sm cursor-pointer"
                >
                  <TvIcon className="mr-2 h-4 w-4" />
                 {nime.label}
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      activeNime?.value === nime.value
                        ? "opacity-100"
                        : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <CommandItem
                onSelect={() => {
                  setIsOpen(false);
                  Animemodal.onOpen();
                }}
              >
                <PlusCircleIcon className="mr-2 h-5 w-5 cursor-pointer"/>
                Tambahkan Anime
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
