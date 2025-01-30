"use client";

import * as React from "react";
import { Copy } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

interface EmbedDialogProps {
  startupId: string;
  startupName: string;
}

export function EmbedDialog({ startupId, startupName }: EmbedDialogProps) {
  const [copied, setCopied] = React.useState(false);
  const embedCode = `<a href="http://localhost:3000/startup/${startupId}?utm_source=helpytravel.com" target="_blank"><img src="http://localhost:3000/featured-badge-light.png" alt="${startupName} | Italian Dir"/></a>`;

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant='outline'>Ottieni il badge</Button>
      </DialogTrigger>
      <DialogContent className='sm:max-w-md'>
        <DialogHeader>
          <DialogTitle>Embed code</DialogTitle>
          <DialogDescription>
            Copia il codice qui sotto per verificare la tua startup.
          </DialogDescription>
        </DialogHeader>
        <div className='flex flex-col gap-4'>
          <Textarea
            readOnly
            className='min-h-[100px] font-mono text-sm'
            value={embedCode}
          />
          <div className='flex justify-between'>
            <Button className='gap-2' onClick={copyToClipboard}>
              <Copy className='h-4 w-4' />
              {copied ? "Copiato!" : "Copia il codice"}
            </Button>
            <DialogClose asChild>
              <Button variant='secondary'>Fatto</Button>
            </DialogClose>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
