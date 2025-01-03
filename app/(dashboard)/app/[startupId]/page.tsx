import PageHeader from "@/app/components/PageHeader";
import { getStartupById } from "@/app/lib/actions";
import { getStatusElements } from "@/app/lib/utils";
import { Circle } from "lucide-react";

interface MyStartupCrudPageProps {
  params: {
    startupId: string;
  };
}

async function MyStartupCrudPage({ params }: MyStartupCrudPageProps) {
  const { startupId } = params;
  const startup = await getStartupById(startupId);
  const status = getStatusElements(startup.status);
  return (
    <div>
      <div className='mb-16'>
        <PageHeader
          headline={startup.name}
          subHeadline={`Gestisci e modifica le informazioni su ${startup.name}`}
          backToPath='/app'
          backToText='Torna alla dashboard'
        />
      </div>
      <div className='flex items-center gap-2 text-sm'>
        <Circle size={16} color={status.color} strokeWidth={3} /> {status.text}
      </div>
    </div>
  );
}

export default MyStartupCrudPage;
