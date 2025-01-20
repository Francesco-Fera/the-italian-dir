import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Category, Startup } from "@prisma/client";
import Link from "next/link";
import { Card } from "@/components/ui/card";

interface StartupHeroProps {
  startup: Partial<{ category: Partial<Category> | null } & Startup>;
}

export function StartupHero({ startup }: StartupHeroProps) {
  return (
    <div className='grid gap-6 lg:grid-cols-2'>
      <div className='flex flex-col justify-center space-y-4'>
        <div className='flex items-center space-x-4'>
          {startup.logoUrl && (
            <div className='relative w-20 h-20'>
              <Image
                src={startup.logoUrl || "/file.svg?height=80&width=80"}
                alt={`${startup.name} logo`}
                layout='fill'
                objectFit='cover'
                className='rounded-full'
              />
            </div>
          )}

          <div>
            <h1 className='text-3xl md:text-5xl font-bold '>{startup.name}</h1>
            {startup.tagline && (
              <p className='text-xl text-muted-foreground'>{startup.tagline}</p>
            )}
            {startup.category && (
              <Badge variant='secondary' className='mt-2'>
                <Link
                  href={`/categorie/${startup.category.name}`}
                  className='text-sm'
                >
                  {startup.category.displayName}
                </Link>
              </Badge>
            )}
          </div>
        </div>
      </div>
      {startup.thumbnailUrl && (
        <Card className='relative aspect-video rounded-lg overflow-hidden '>
          <Image
            src={
              startup.thumbnailUrl || "/placeholder.svg?height=400&width=600"
            }
            alt={`${startup.name} thumbnail`}
            layout='fill'
            objectFit='cover'
            priority
          />
        </Card>
      )}
    </div>
  );
}
