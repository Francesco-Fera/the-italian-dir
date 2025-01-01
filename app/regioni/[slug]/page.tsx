import PageHeader from "@/app/components/PageHeader";
import StartupList from "@/app/components/StartupList";
import { regioni, startups } from "@/lib/constants";

function RegionePage({ params }: { params: { slug: string } }) {
  const regione = regioni.find((r) => r.name === params.slug);
  return (
    <div>
      <PageHeader
        headline={regione!.displayName}
        subHeadline={`Esplora le startup italiane nella Regione ${regione?.displayName}`}
        backToPath='/regioni'
        backToText='Tutte le regioni'
      />
      {/* Lista delle startup */}
      <StartupList startups={startups} />
    </div>
  );
}

export default RegionePage;
