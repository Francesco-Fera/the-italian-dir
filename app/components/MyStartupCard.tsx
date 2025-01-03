import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Startup } from "@prisma/client";
import { Circle, Dot } from "lucide-react";
import React from "react";
import { getStatusElements } from "../lib/utils";
import Link from "next/link";

interface MyStartupCardProps {
  startup: Partial<Startup>;
}

function MyStartupCard({ startup }: MyStartupCardProps) {
  const status = getStatusElements(startup.status);
  return (
    <Link href={`/app/${startup.id}`}>
      <Card className='hover:shadow-lg hover:border-black hover:cursor-pointer'>
        <CardHeader>
          <CardTitle>{startup.name}</CardTitle>
          <CardDescription>{startup.websiteUrl}</CardDescription>
        </CardHeader>
        <CardContent>{startup.tagline}</CardContent>
        <CardFooter className='flex items-center gap-2 text-sm'>
          <Circle size={16} color={status.color} strokeWidth={3} />{" "}
          {status.text}
        </CardFooter>
      </Card>
    </Link>
  );
}

export default MyStartupCard;
