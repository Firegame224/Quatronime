/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { AlertModal } from "@/components/modals/alert-modal";
import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOutIcon, Menu, TvIcon, User } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";

export default function NavbarAdminSmall({ data }: { data: any[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [Loading, setLoading] = useState(false);
  const [open, setsOpen] = useState(false);

  const handleActive = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setsOpen(true);
    }, 1000);
  };
  return (
    <>
      <AlertModal
        loading={Loading}
        isOpen={open}
        onClose={() => setsOpen(false)}
        onConfirm={signOut}
      />
      <Popover open={isOpen} onOpenChange={setIsOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            className="bg-transparent border-none hover:bg-transparent"
            aria-expanded={isOpen}
          >
            <Menu className="w-10 h-10" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-40 p-0 mt-2 mr-2">
          <Command>
            <CommandGroup heading="Menu" className="gap-2">
              <CommandItem onSelect={() => setIsOpen(false)} className="p-2">
                <Link
                  href={"/admin/users"}
                  className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-start text-sm text-black"
                >
                  <User className="w-6 h-6" />
                  Data User
                </Link>
              </CommandItem>
              <CommandItem onSelect={() => setIsOpen(false)} className="p-2">
                <Link
                  href={`/admin/dashboard/${data[0].id}`}
                  className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-start text-sm text-black"
                >
                  <TvIcon className="w-6 h-6" />
                  Data Anime
                </Link>
              </CommandItem>
              <CommandItem onSelect={() => setIsOpen(false)} className="p-2">
                <Button
                  onClick={handleActive}
                  className="w-full text-black p-2 rounded-md hover:bg-transparent shadow-none border-none flex items-center gap-4 justify-start text-sm bg-transparent"
                >
                  <LogOutIcon className="w-6 h-6" />
                  Logout
                </Button>
              </CommandItem>
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
