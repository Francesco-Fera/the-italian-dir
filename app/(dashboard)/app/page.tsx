import MyStartupList from "@/app/components/MyStartupList";
import PageHeader from "@/app/components/PageHeader";
import { fetchFilteredPaginatedStartups } from "@/app/lib/actions";
import { Startup } from "@prisma/client";
import React from "react";

async function DashboardRoute() {
  const query = "";
  const page = 1;
  const startups = await fetchFilteredPaginatedStartups({
    query,
    page,
  });
  return (
    <>
      <PageHeader
        headline='Dashboard'
        subHeadline='Suggerisci e gestisci le Startup.'
      />
      <MyStartupList startups={startups.data} />
    </>
  );
}

export default DashboardRoute;
