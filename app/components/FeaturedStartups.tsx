import { fetchLatestStartups } from "../lib/actions";
import StartupCard from "./StartupCard";

async function getLatestStartups() {
  const startups = await fetchLatestStartups(3);
  return startups;
}

async function FeaturedStartups() {
  const startups = await getLatestStartups();
  return (
    <div className='my-16'>
      <h3 className='text-4xl font-bold'>👑 Featured Startups</h3>
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-8 gap-y-12'>
        {startups.map((startup: any) => (
          <StartupCard key={startup.id} startup={startup as any} />
        ))}
      </div>
    </div>
  );
}

export default FeaturedStartups;
