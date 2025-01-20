import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CalendarIcon, MapPinIcon } from "lucide-react";
import { SocialLinks } from "./SocialLinks";
import { Startup, Category } from "@prisma/client";
import Link from "next/link";

interface StartupSidebarProps {
  startup: Partial<{ category: Partial<Category> | null } & Startup>;
}

export function StartupSidebar({ startup }: StartupSidebarProps) {
  return (
    <div className='space-y-6'>
      <Card>
        <CardHeader>
          <CardTitle>Info</CardTitle>
        </CardHeader>
        <CardContent className='space-y-4'>
          {startup.foundedYear && (
            <div className='flex items-center'>
              <CalendarIcon className='mr-2 h-4 w-4' />
              <span>Fondata nel {startup.foundedYear}</span>
            </div>
          )}
          {startup.location && (
            <div className='flex items-center'>
              <MapPinIcon className='mr-2 h-4 w-4' />
              <Link
                href={`/regioni/${startup.location}`}
                className='capitalize underline'
              >
                {startup.location}
              </Link>
            </div>
          )}
          {startup.websiteUrl && (
            <Button asChild className='w-full'>
              <Link
                href={startup.websiteUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Visita il Sito
              </Link>
            </Button>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Connettiti</CardTitle>
        </CardHeader>
        <CardContent>
          <SocialLinks
            twitterUrl={startup.twitterUrl ?? undefined}
            linkedinUrl={startup.linkedinUrl ?? undefined}
            facebookUrl={startup.facebookUrl ?? undefined}
            instagramUrl={startup.instagramUrl ?? undefined}
            githubUrl={startup.githubUrl ?? undefined}
          />
        </CardContent>
      </Card>
      {(startup.blogUrl || startup.pricingPageUrl || startup.jobsUrl) && (
        <Card>
          <CardHeader>
            <CardTitle>Maggiori Dettagli</CardTitle>
          </CardHeader>
          <CardContent className='space-y-2'>
            {startup.blogUrl && (
              <Button variant='outline' asChild className='w-full'>
                <Link
                  href={startup.blogUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Blog
                </Link>
              </Button>
            )}
            {startup.pricingPageUrl && (
              <Button variant='outline' asChild className='w-full'>
                <Link
                  href={startup.pricingPageUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Pricing
                </Link>
              </Button>
            )}
            {startup.jobsUrl && (
              <Button variant='outline' asChild className='w-full'>
                <Link
                  href={startup.jobsUrl}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  Jobs
                </Link>
              </Button>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}
