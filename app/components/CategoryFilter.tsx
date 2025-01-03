"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/lib/constants";

function CategoryFilter() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(
    searchParams.get("cat")?.toString() || ""
  );

  const filteredCategories = categories.filter((category) =>
    category.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCategory = (category: string) => {
    setSelectedCategory(category);

    const params = new URLSearchParams(searchParams);

    if (category) {
      params.set("cat", category);
    } else {
      params.delete("cat");
    }

    replace(`${pathname}?${params.toString()}`);

    setIsOpen(false);
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' className='w-full justify-start'>
          {selectedCategory ? <>{selectedCategory}</> : "Seleziona"}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[280px] p-0'>
        <div className='p-4 pb-0'>
          <Input
            placeholder='Cerca'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className='mb-2'
          />
        </div>
        <ScrollArea className='h-[300px]'>
          <Button
            variant='link'
            className='w-full h-auto text-start justify-start items-start pt-0 gap-0'
            onClick={() => handleSelectCategory("")}
          >
            rimuovi filtro
          </Button>
          <div className='grid grid-cols-1 gap-2 px-4 pb-4'>
            {filteredCategories.map((category) => {
              return (
                <Button
                  key={category}
                  variant='outline'
                  className='w-full p-0 px-4 justify-start'
                  onClick={() => handleSelectCategory(category)}
                >
                  {category}
                </Button>
              );
            })}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryFilter;
