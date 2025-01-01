import { startups } from "@/lib/constants";
import StartupCard from "./StartupCard";
import { StartupPagination } from "./Pagination";
import { fetchFilteredPaginatedStartups } from "../lib/actions";

interface StartupListProps {
  query: string;
  page: number;
}

async function StartupList({ query, page }: StartupListProps) {
  const startups = await fetchFilteredPaginatedStartups({ query, page });
  return (
    <div>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8 gap-y-12'>
        {startups.data.map((startup: any) => (
          <StartupCard key={startup.id} startup={startup} />
        ))}
      </div>
      <StartupPagination totalPages={startups.totalPages} />
    </div>
  );
}

export default StartupList;
