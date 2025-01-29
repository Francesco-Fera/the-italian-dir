import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type Category = {
  id: string;
  name: string;
  displayName: string;
  description: string;
};

interface CategoryListProps {
  categories: any[];
}

export default function CategoryList({ categories }: CategoryListProps) {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
      {categories.map((category) => (
        <Link href={`/categorie/${category.name}`} key={category.id}>
          <Card className='hover:shadow-lg hover:border-black hover:cursor-pointer'>
            <CardHeader>
              <CardTitle className='text-xl'>{category.displayName}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>
          </Card>
        </Link>
      ))}
    </div>
  );
}
