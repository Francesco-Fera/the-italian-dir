"use client";

import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { allTags } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { Check, ChevronsUpDown } from "lucide-react";
import { useMemo, useState } from "react";

export default function TagsFilter() {
  const [open, setOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  console.log(allTags);

  const filteredTags = useMemo(() => {
    return allTags.filter((tag: string) =>
      tag.toLowerCase().includes(search.toLowerCase())
    );
  }, [search]);

  const handleSelect = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          className='w-full justify-between'
        >
          {selectedTags.length > 0
            ? `${selectedTags.length} tag${
                selectedTags.length > 1 ? "s" : ""
              } selected`
            : "Select tags..."}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-full p-0'>
        <Command>
          <CommandInput
            placeholder='Search tags...'
            onValueChange={setSearch}
          />
          <CommandEmpty>No tags found.</CommandEmpty>
          <CommandGroup className='max-h-64 overflow-auto'>
            {filteredTags.map((tag) => (
              <CommandItem key={tag} onSelect={() => handleSelect(tag)}>
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedTags.includes(tag) ? "opacity-100" : "opacity-0"
                  )}
                />
                {tag}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
