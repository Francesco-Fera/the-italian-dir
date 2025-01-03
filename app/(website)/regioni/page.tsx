import { regioni } from "@/lib/constants";
import RegioneCard from "../../components/RegioniCard";
import PageHeader from "../../components/PageHeader";

function RegioniRoute() {
  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline='Startup per Regione'
          subHeadline='Esplora le startup italiane per regione di appartenenza.'
          backToPath='/esplora'
          backToText='Esplora tutte le startup'
        />
      </div>
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-4'>
        {regioni.map((regione) => (
          <RegioneCard key={regione.name} regione={regione} />
        ))}
      </div>
    </div>
  );
}

export default RegioniRoute;
