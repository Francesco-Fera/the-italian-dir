import { getAllCategories } from "@/app/lib/actions";
import PageHeader from "../../components/PageHeader";
import CategoryList from "@/app/components/CategoryList";

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
      <CategoryList categories={allCategories} />
    </div>
  );
}

export default CategoriesRoute;
