import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import React from "react";

interface PageHeaderProps {
  headline: string;
  subHeadline: string;
  backToPath?: string;
  backToText?: string;
}

function PageHeader({
  headline,
  subHeadline,
  backToPath,
  backToText,
}: PageHeaderProps) {
  return (
    <div>
      {backToPath && backToText && (
        <Link
          href={backToPath ?? "/"}
          className='flex items-center gap-1 text-xs text-muted-foreground underline mb-4'
        >
          <ArrowLeft className='w-3 h-3' /> {backToText}
        </Link>
      )}

      <h1 className='text-5xl lg:text-7xl font-bold'>{headline}</h1>
      <p className='text-balance text-muted-foreground lg:text-lg'>
        {subHeadline}
      </p>
    </div>
  );
}

export default PageHeader;
