import StartupCard from "./StartupCard";
import { StartupPagination } from "./Pagination";
import { fetchFilteredPaginatedStartups } from "../lib/actions";

interface StartupListProps {
  filters: {
    query?: string;
    categoryId?: string;
    regione?: string;
  };
  page: number;
}

async function StartupList({ filters, page }: StartupListProps) {
  const paginatedStartups = await fetchFilteredPaginatedStartups({
    filters,
    page,
  });

  const { data: startups, totalPages } = paginatedStartups;

  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 gap-y-12'>
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup as any} />
        ))}
      </div>
      <StartupPagination totalPages={totalPages} />
    </div>
  );
}

export default StartupList;
