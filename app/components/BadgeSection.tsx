import Image from "next/image";
import { EmbedDialog } from "./EmbedDialog";
import { Button } from "@/components/ui/button";
import { DownloadBadgeButton } from "./Buttons";

interface BadgeSectionProps {
  startupId: string;
  startupName: string;
}

function BadgeSection({ startupId, startupName }: BadgeSectionProps) {
  return (
    <div>
      <Image
        src={"/featured_badge_light.png"}
        alt={""}
        width={171}
        height={58}
        className='rounded-md mb-4 border border-gray-200'
      />
      <div className='flex gap-2'>
        <EmbedDialog startupId={startupId} startupName={startupName} />
        <DownloadBadgeButton />
      </div>
    </div>
  );
}

export default BadgeSection;
