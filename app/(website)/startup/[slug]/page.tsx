import { getStartupBySlug } from "@/app/lib/actions";
import { StartupDescription } from "@/app/components/StartupDescription";
import { StartupHero } from "@/app/components/StartupHero";
import { StartupSidebar } from "@/app/components/StartupSidebar";
import { notFound } from "next/navigation";

interface Props {
  params: { slug: string };
}

export default async function StartupDetailPage({ params }: Props) {
  const { slug } = params;

  const response = await getStartupBySlug(slug);

  if (!response.success || !response.data) {
    notFound();
  }

  const startup = response.data;

  return (
    <div className='container mx-auto px-4 py-8'>
      <StartupHero startup={startup} />
      <div className='mt-8 grid gap-8 md:grid-cols-3'>
        <div className='md:col-span-2'>
          <StartupDescription startup={startup} />
        </div>
        <div>
          <StartupSidebar startup={startup} />
        </div>
      </div>
    </div>
  );
}
