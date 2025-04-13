"use client";

import { Button } from "@/components/ui/button";
import { Command, CommandGroup, CommandItem } from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ArrowLeft, LogInIcon, LogOutIcon, Menu, User, UserPlus } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

export default function NavbarSmall() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  return (
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
      <PopoverContent className="w-48 p-0 mt-2 mr-2">
        <Command>
          {pathname.startsWith("/auth") ? 
          <CommandGroup heading="Menu">
          {/* SignUp */}
          <CommandItem onSelect={() => setIsOpen(false)} className="p-2">
            <Link
              href={
                  "/auth/signIn"
              }
              className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-center text-sm"
            >
              <ArrowLeft/>
              Back
            </Link>
          </CommandItem>
        </CommandGroup>
          : 
          <>
            {session ? (
              <CommandGroup heading="Menu">
                {/* SignUp */}
                <CommandItem onSelect={() => setIsOpen(false)} className="p-2">
                  <Link
                    href={
                      session.user.role === "USER"
                        ? "/users/dashboard"
                        : "/admin"
                    }
                    className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-center text-sm"
                  >
                    <User className="w-6 h-6" />
                    {session.user.name  ? session.user.name : session.user.email}
                  </Link>
                </CommandItem>
                <CommandItem onSelect={() => setIsOpen(false)} className="p-2">
                  <Link
                    href={"#"}
                    onClick={() => signOut()}
                    className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-center text-sm"
                  >
                    <LogOutIcon className="w-6 h-6" />
                    Sign Out
                  </Link>
                </CommandItem>
              </CommandGroup>
            ) : (
              <CommandGroup heading="Menu">
                {/* SignUp */}
                <CommandItem onSelect={() => setIsOpen(false)}>
                  <Link
                    href="/auth/signUp"
                    className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-center text-sm"
                  >
                    <UserPlus />
                    SignUp
                  </Link>
                </CommandItem>

                {/* SignIn */}
                <CommandItem onSelect={() => setIsOpen(false)}>
                  <Link
                    href="/auth/signIn"
                    className="w-full p-2 rounded-md hover:bg-gray-100 flex items-center gap-4 justify-center text-sm px-8"
                  >
                    <LogInIcon />
                    SignIn
                  </Link>
                </CommandItem>
              </CommandGroup>
            )}
          </>}
        </Command>
      </PopoverContent>
    </Popover>
  );
}
