import { getAllCategories } from "@/app/lib/actions";
import PageHeader from "../../components/PageHeader";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

async function CategoriesRoute() {
  const allCategories = await getAllCategories();
  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline='Startup per Categoria'
          subHeadline='Esplora le startup italiane per categoria di appartenenza.'
          backToPath='/esplora'
          backToText='Esplora tutte le startup'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
        {allCategories.map((category) => (
          <Link href={`/categorie/${category.name}`} key={category.id}>
            <Card className='hover:shadow-lg hover:border-black hover:cursor-pointer'>
              <CardHeader>
                <CardTitle className='text-xl'>
                  {category.displayName}
                </CardTitle>
                <CardDescription>{category.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default CategoriesRoute;
