import StartupCard from "./StartupCard";
import { StartupPagination } from "./Pagination";
import { fetchFilteredPaginatedStartups } from "../lib/actions";

interface StartupListProps {
  query: string;
  page: number;
}

async function StartupList({ query, page }: StartupListProps) {
  const paginatedStartups = await fetchFilteredPaginatedStartups({
    query,
    page,
  });
  const { data: startups, total, totalPages, currentPage } = paginatedStartups;
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 gap-y-12'>
        {startups.map((startup) => (
          <StartupCard key={startup.id} startup={startup as any} />
        ))}
      </div>
      <StartupPagination totalPages={paginatedStartups.totalPages} />
    </div>
  );
}

export default StartupList;
