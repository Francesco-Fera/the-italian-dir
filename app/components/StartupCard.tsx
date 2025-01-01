import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Startup } from "@/lib/constants";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

interface StartupCardProps {
  startup: Startup;
}

export default function StartupCard({ startup }: StartupCardProps) {
  return (
    <Card className='h-full flex flex-col'>
      <div className='relative w-full pt-[56.25%]'>
        <Image
          src={"/default-thumbnail.webp"}
          alt={`${startup.name} website thumbnail`}
          fill
          className='object-cover rounded-t-lg'
        />
      </div>
      <CardHeader className='py-2 px-4'>
        <CardTitle>{startup.name}</CardTitle>
        <CardDescription>{startup.category}</CardDescription>
      </CardHeader>
      <CardContent className='flex-grow px-4'>
        <p>{startup.tagline}</p>
      </CardContent>
      <CardFooter className='px-4 grid grid-cols-2 gap-x-2'>
        <Button>
          <Link href={`/startup/${startup.name}`}>Scopri</Link>
        </Button>
        {startup.websiteUrl && (
          <Link href={startup.websiteUrl} target='_blank'>
            <Button variant='secondary' className='w-full'>
              <ExternalLink /> Sito
            </Button>
          </Link>
        )}
      </CardFooter>
    </Card>
  );
}
