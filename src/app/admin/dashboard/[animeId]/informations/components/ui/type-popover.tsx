"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandGroup,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CheckIcon, ChevronsUpDownIcon, Tv2Icon } from "lucide-react";
import React, { useState } from "react";

const animeTypes = ["TV", "Movie", "OVA", "ONA", "Special"];

interface PopoverTypeProps {
  sellectedType: string;
  onSelect: (type: string) => void;
}
const TypePopover: React.FC<PopoverTypeProps> = ({
  sellectedType,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant={sellectedType ? "default" : "outline"}
          className="w-full items-center justify-between flex"
        >
          <Tv2Icon width={30} height={30} />
          {sellectedType || "Pilih Type"}
          <ChevronsUpDownIcon className="shrink-0 w-4 h-4 ml-auto opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-1">
        <Command>
          <CommandList>
            <CommandGroup className="w-full">
              {animeTypes.map((type) => {
                return (
                  <CommandItem
                    className="w-full"
                    
                    key={type}
                    onSelect={() => {
                      onSelect(type);
                      setIsOpen(false);
                    }}
                  >
                    {type}
                    {sellectedType === type && (
                         <CheckIcon className="w-4 h-4 ml-auto"/>
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default TypePopover;
