import CategoryFilter from "@/app/components/CategoryFilter";
import PageHeader from "@/app/components/PageHeader";
import Search from "@/app/components/Search";
import StartupList from "@/app/components/StartupList";
import { getAllCategories } from "@/app/lib/actions";
import { regioni, startups } from "@/lib/constants";
import { Suspense } from "react";

interface RegionePageProps {
  params: {
    slug: string;
  };
  searchParams?: Promise<{
    query?: string;
    page?: string;
  }>;
}

async function RegionePage(props: RegionePageProps) {
  const regione = regioni.find((r) => r.name === props.params.slug);
  const searchParams = await props.searchParams;
  const query = searchParams?.query || "";
  const currentPage = Number(searchParams?.page) || 1;
  const allCategories = await getAllCategories();
  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline={regione!.displayName}
          subHeadline={`Esplora le startup italiane nella Regione ${regione?.displayName}`}
          backToPath='/regioni'
          backToText='Tutte le regioni'
        />
      </div>
      <div className='flex gap-4 flex-wrap'>
        <div className='max-w-64 min-w-64'>
          <Search />
        </div>
        <div className='max-w-64 min-w-64'>
          <CategoryFilter allCategories={allCategories} />
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

export default RegionePage;
