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
