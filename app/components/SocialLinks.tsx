"use client";

import { Button } from "@/components/ui/button";
import { Twitter, Linkedin, Facebook, Instagram, Github } from "lucide-react";

interface SocialLinksProps {
  twitterUrl?: string;
  linkedinUrl?: string;
  facebookUrl?: string;
  instagramUrl?: string;
  githubUrl?: string;
}

const socialLinksData = [
  {
    id: "twitterUrl",
    icon: Twitter,
    label: "Twitter",
  },
  {
    id: "linkedinUrl",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    id: "facebookUrl",
    icon: Facebook,
    label: "Facebook",
  },
  {
    id: "instagramUrl",
    icon: Instagram,
    label: "Instagram",
  },
  {
    id: "githubUrl",
    icon: Github,
    label: "GitHub",
  },
];

export function SocialLinks(props: SocialLinksProps) {
  const availableLinks = socialLinksData.filter(
    (link) => props[link.id as keyof SocialLinksProps]
  );

  if (availableLinks.length === 0) {
    return (
      <div className='text-muted-foreground text-xs'>
        Nessun social disponibile.
      </div>
    );
  }

  return (
    <div className='flex flex-wrap gap-2'>
      {availableLinks.map(({ id, icon: Icon, label }) => (
        <Button key={id} variant='outline' size='icon' asChild>
          <a
            href={props[id as keyof SocialLinksProps]}
            target='_blank'
            rel='noopener noreferrer'
            aria-label={label}
          >
            <Icon className='h-4 w-4' />
          </a>
        </Button>
      ))}
    </div>
  );
}
