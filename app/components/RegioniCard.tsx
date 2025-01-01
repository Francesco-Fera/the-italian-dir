import Image from "next/image";
import Link from "next/link";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function RegioneCard({ regione }: { regione: any }) {
  return (
    <Card>
      <Link
        href={`/regioni/${regione.name}`}
        className='h-full flex items-center space-x-4 px-6'
      >
        <Image
          src={`/regioni${regione.iconPath}`}
          alt={`${regione.displayName} map icon`}
          className='object-contain rounded-t-lg'
          width={50}
          height={50}
        />
        <CardHeader>
          <CardTitle className='text-lg font-medium'>
            {regione.displayName}
          </CardTitle>
        </CardHeader>
      </Link>
    </Card>
  );
}

export default RegioneCard;
