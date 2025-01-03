import { Suspense } from "react";
import PageHeader from "../../components/PageHeader";
import StartupList from "../../components/StartupList";
import Search from "../../components/Search";
import CategoryFilter from "../../components/CategoryFilter";

interface StartupRouteProps {
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

async function StartupRoute(props: StartupRouteProps) {
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline='Tutte le startup'
          subHeadline='Esplora le startup italiane'
        />
      </div>
      <div className='flex gap-4 flex-wrap'>
        <div className='max-w-64 min-w-64'>
          <Search />
        </div>
        <div className='max-w-64 min-w-64'>
          <CategoryFilter />
        </div>
      </div>
      <Suspense
        key={query + currentPage}
        fallback={<div className='w-full text-center my-4 '>Loading...</div>}
      >
        <StartupList query={query} page={currentPage} />
      </Suspense>
    </div>
  );
}

export default StartupRoute;
