"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { extractStartupData, createStartup } from "@/app/lib/actions";
import { Loader2, Globe, Pencil } from "lucide-react";

interface FormData {
  websiteUrl: string;
}

export function CreateStartupDialog() {
  const [loading, setLoading] = useState(false);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const [startupData, setStartupData] = useState<any | null>(null);

  async function onSubmit(data: FormData) {
    setLoading(true);
    try {
      toast.loading("Stiamo recuperando le informazioni dal sito web...");
      const response = await extractStartupData(data.websiteUrl);

      if (response.success) {
        toast.dismiss();
        toast.success("Dati estratti con successo!");
        setStartupData(response.data);
      } else {
        toast.dismiss();
        toast.error("Impossibile estrarre i dati, riprova con un altro URL.");
      }
    } catch (error) {
      toast.dismiss();
      toast.error("Errore nella richiesta, riprova più tardi.");
    } finally {
      setLoading(false);
    }
  }

  async function handleCreateStartup() {
    if (!startupData) return;

    const response = await createStartup({
      name: startupData.name,
      tagline: startupData.tagline,
      thumbnailUrl: startupData.thumbnailUrl,
      websiteUrl: startupData.websiteUrl,
    });

    if (response.success) {
      toast.success("Startup creata con successo!");
    } else {
      toast.error("Errore durante la creazione della startup.");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className='w-full md:w-auto px-6 py-2 text-lg font-semibold'>
          <Globe className='mr-2 h-5 w-5' /> Crea la startup
        </Button>
      </DialogTrigger>
      <DialogContent className='max-w-lg w-full p-6 rounded-lg shadow-xl'>
        <DialogHeader className='text-center'>
          <DialogTitle className='text-2xl font-bold text-primary'>
            {startupData
              ? "Rivedi i dettagli della tua startup"
              : "Inserisci il link del sito"}
          </DialogTitle>
          <p className='text-sm text-muted-foreground'>
            {startupData
              ? "Conferma le informazioni prima di procedere."
              : "Recupereremo automaticamente le informazioni disponibili."}
          </p>
        </DialogHeader>

        {!startupData ? (
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
            <div className='relative'>
              <Input
                {...register("websiteUrl")}
                placeholder='https://esempio.com'
                required
                className='pl-10'
              />
              <Globe className='absolute left-3 top-3 h-5 w-5 text-muted-foreground' />
            </div>
            <DialogFooter>
              <Button type='submit' disabled={loading} className='w-full'>
                {loading ? (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                ) : (
                  "Continua"
                )}
              </Button>
            </DialogFooter>
          </form>
        ) : (
          <div className='space-y-6 text-center'>
            <div className='rounded-lg overflow-hidden border shadow-sm'>
              <img
                src={startupData.thumbnailUrl}
                alt='Anteprima sito'
                className='w-full h-48 object-cover'
              />
            </div>
            <div className='text-left space-y-2'>
              <h3 className='text-xl font-semibold text-primary'>
                {startupData.name}
              </h3>
              <p className='text-sm text-muted-foreground'>
                {startupData.tagline}
              </p>
            </div>
            <DialogFooter className='flex justify-between gap-4'>
              <Button
                variant='outline'
                onClick={() => setStartupData(null)}
                className='flex-1'
              >
                <Pencil className='mr-2 h-4 w-4' /> Modifica URL
              </Button>
              <Button onClick={handleCreateStartup} className='flex-1'>
                Crea Startup
              </Button>
            </DialogFooter>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
