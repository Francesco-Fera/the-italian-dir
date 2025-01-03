import MyStartupList from "@/app/components/MyStartupList";
import PageHeader from "@/app/components/PageHeader";
import { fetchFilteredPaginatedStartups } from "@/app/lib/actions";

async function DashboardRoute() {
  const query = "";
  const page = 1;
  const startups = await fetchFilteredPaginatedStartups({
    query,
    page,
  });
  return (
    <>
      <div className='mb-16'>
        <PageHeader
          headline='Dashboard'
          subHeadline='Suggerisci e gestisci le Startup.'
        />
      </div>
      <MyStartupList startups={startups.data} />
    </>
  );
}

export default DashboardRoute;
