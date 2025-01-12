import PageHeader from "@/app/components/PageHeader";
import Search from "@/app/components/Search";
import StartupList from "@/app/components/StartupList";
import {
  fetchPaginatedStartupsByCategoryId,
  getCategoryByName,
} from "@/app/lib/actions";
import { Suspense } from "react";

interface CategoryRouteProps {
  params: {
    slug: string;
  };
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

async function CategoryRoute(props: CategoryRouteProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const category = await getCategoryByName(props.params.slug);
  const startups = await fetchPaginatedStartupsByCategoryId({
    id: category!.id,
    page: currentPage,
  });

  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline={category!.displayName}
          subHeadline={`Esplora le startup italiane nella categoria ${category?.displayName}`}
          backToPath='/categorie'
          backToText='Tutte le categorie'
        />
      </div>
      <div className='flex gap-4 flex-wrap'>
        <div className='max-w-64 min-w-64'>
          <Search />
        </div>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<div className='w-full text-center my-4 '>Loading...</div>}
      >
        <StartupList
          filters={{ categoryId: category!.id, query }}
          page={currentPage}
        />
      </Suspense>
    </div>
  );
}

export default CategoryRoute;
