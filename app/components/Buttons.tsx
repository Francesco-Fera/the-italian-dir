"use client";
import { Button } from "@/components/ui/button";
import { useFormStatus } from "react-dom";

export function SubmitButton() {
  const status = useFormStatus();
  return (
    <Button type='submit' disabled={status.pending} className='w-full mt-4'>
      {status.pending ? "Salvataggio..." : "Salva"}
    </Button>
  );
}

export function DownloadBadgeButton() {
  const downloadBadge = () => {
    const link = document.createElement("a");
    link.href = "http://localhost:3000/featured_badge_light.png";
    link.download = "featured-badge-light.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Button
      variant='link'
      onClick={downloadBadge}
      className='text-sm underline'
    >
      Scarica il badge
    </Button>
  );
}
