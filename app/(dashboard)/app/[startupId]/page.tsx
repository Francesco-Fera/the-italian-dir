import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import PageHeader from "@/app/components/PageHeader";
import { getStartupById } from "@/app/lib/actions";
import { getStatusElements } from "@/app/lib/utils";
import { Circle, ExternalLink } from "lucide-react";
import Link from "next/link";
import MediaForm from "@/app/components/MediaForm";
import GeneralInfoForm from "@/app/components/GeneralInfoForm";
import LinksForm from "@/app/components/LinksForm";
import BadgeSection from "@/app/components/BadgeSection";

interface MyStartupCrudPageProps {
  params: Promise<{
    startupId: string;
  }>;
}

async function MyStartupDetailsPage({ params }: MyStartupCrudPageProps) {
  const { startupId } = await params;
  const startup = await getStartupById(startupId);
  const status = getStatusElements(startup.status);

  return (
    <div>
      <PageHeader
        headline={startup.name}
        subHeadline={`Gestisci e modifica le informazioni su ${startup.name}`}
        backToPath='/app'
        backToText='Torna alla dashboard'
      />
      <div className='flex items-center gap-2 text-sm mt-4'>
        <Circle size={16} color={status.color} strokeWidth={3} /> {status.text}
      </div>
      <Link
        className='flex items-center gap-2 max-w-fit text-muted-foreground underline mt-4 text-sm'
        href={`/startup/${startup.name}`}
        target='_blank'
      >
        Visita la pagina <ExternalLink size={16} />
      </Link>
      <div className='my-8'>
        <Tabs defaultValue='general' className='max-w-[600px]'>
          <TabsList className='mb-4'>
            <TabsTrigger value='general'>Generale</TabsTrigger>
            <TabsTrigger value='Media'>Media</TabsTrigger>
            <TabsTrigger value='links'>Links</TabsTrigger>
            <TabsTrigger value='badge'>Badge</TabsTrigger>
          </TabsList>
          <TabsContent value='general'>
            <GeneralInfoForm startup={startup} />
          </TabsContent>
          <TabsContent value='Media'>
            <MediaForm
              startupId={startupId}
              currentLogoUrl={startup.logoUrl || ""}
              currentCoverUrl={startup.thumbnailUrl || ""}
            />
          </TabsContent>
          <TabsContent value='links'>
            <LinksForm startup={startup} />
          </TabsContent>
          <TabsContent value='badge'>
            <BadgeSection startupId={startupId} startupName={startup.name} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

export default MyStartupDetailsPage;
