import { CreateStartupDialog } from "@/app/components/CreateStartupDialog";
import MyStartupList from "@/app/components/MyStartupList";
import PageHeader from "@/app/components/PageHeader";
import { getUserStartups } from "@/app/lib/actions";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { redirect } from "next/navigation";
async function DashboardRoute() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();
  if (!user) {
    redirect("/login");
  }

  const userStartups = [];

  try {
    const res = await getUserStartups(user.id);
    userStartups.push(...res);
  } catch (error) {
    console.error("Error updating startup:", error);
    return { success: false, error: "Failed to update startup" };
  }

  return (
    <>
      <div className='mb-16'>
        <PageHeader
          headline='Dashboard'
          subHeadline='Suggerisci e gestisci le Startup.'
        />
      </div>
      <CreateStartupDialog />
      <MyStartupList startups={userStartups} />
    </>
  );
}

export default DashboardRoute;
