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

function CategoryFilter({ allCategories }: { allCategories: any[] }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState(
    searchParams.get("cat")?.toString() || ""
  );

  const selectedCategory = allCategories.find(
    (category) => category.id === selectedCategoryId
  );

  const filteredCategories = allCategories.filter((category) =>
    category.displayName.toLowerCase().includes(query.toLowerCase())
  );

  const handleSelectCategory = (categoryId: string) => {
    setSelectedCategoryId(categoryId);

    const params = new URLSearchParams(searchParams);

    if (categoryId) {
      params.set("cat", categoryId);
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
          {selectedCategory
            ? selectedCategory.displayName
            : "Seleziona una categoria"}
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
            Rimuovi filtro
          </Button>
          <div className='grid grid-cols-1 gap-2 px-4 pb-4'>
            {filteredCategories.map((category) => (
              <Button
                key={category.id}
                variant='outline'
                className='w-full p-0 px-4 justify-start'
                onClick={() => handleSelectCategory(category.id)}
              >
                {category.displayName}
              </Button>
            ))}
          </div>
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}

export default CategoryFilter;
