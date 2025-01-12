import { FormItem } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { regioni } from "@/lib/constants";
import { Startup } from "@prisma/client";
import Link from "next/link";
import { getAllCategories, updateStartup } from "../lib/actions";
import { SubmitButton } from "./Buttons";

interface GeneralInfoFormProps {
  startup: Partial<Startup>;
}

export default async function GeneralInfoForm({
  startup,
}: GeneralInfoFormProps) {
  const MAX_FEATURES = 6;

  const allCategories = await getAllCategories();

  const handleUpadateStartup = async (formData: FormData) => {
    "use server";
    const response = await updateStartup(formData);
  };

  return (
    <form action={handleUpadateStartup}>
      <input type='hidden' name='id' value={startup.id} />
      <div className='space-y-4'>
        <FormItem>
          <Label htmlFor='websiteUrl'>Sito Web</Label>
          <Input
            id='websiteUrl'
            name='websiteUrl'
            required
            defaultValue={startup.websiteUrl || ""}
            disabled={true}
          />
          <div className='text-sm text-muted-foreground'>
            Vuoi cambiare il sito web? Scrivi alla{" "}
            <Link href='/app/requests' className='underline'>
              email di supporto
            </Link>
            .
          </div>
        </FormItem>
        <FormItem>
          <Label htmlFor='name'>Nome</Label>
          <Input
            id='name'
            name='name'
            required
            defaultValue={startup.name || ""}
          />
        </FormItem>
        <FormItem>
          <Label htmlFor='tagline'>One Liner</Label>
          <Input
            id='tagline'
            name='tagline'
            defaultValue={startup.tagline || ""}
          />
        </FormItem>
        <FormItem>
          <Label htmlFor='category'>Categoria</Label>
          <Select name='category' defaultValue={startup.categoryId || ""}>
            <SelectTrigger className='w-full'>
              <SelectValue
                placeholder={
                  allCategories.find(
                    (category: any) => category.id === startup.categoryId
                  )?.displayName || "Nessuna categoria"
                }
              />
            </SelectTrigger>
            <SelectContent>
              {allCategories.map((category: any) => (
                <SelectItem key={category.id} value={category.id}>
                  {category.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
        <FormItem>
          <Label htmlFor='description'>Descrizione</Label>
          <Textarea
            id='description'
            name='description'
            rows={8}
            defaultValue={startup.description || ""}
          />
        </FormItem>
        <div className='mt-6 mb-4'>
          <Label className=''>Features</Label>
          {[...Array(MAX_FEATURES)].map((_, index) => (
            <FormItem key={`feature-${index}`} className='mb-4'>
              <Input
                id={`feature-${index}`}
                name={`feature`}
                defaultValue={startup.features?.[index] || ""}
                placeholder={`Feature ${index + 1}`}
              />
            </FormItem>
          ))}
        </div>
        <FormItem>
          <Label htmlFor='regione'>Regione</Label>
          <Select name='regione' defaultValue={startup.location || ""}>
            <SelectTrigger className='w-full'>
              <SelectValue
                placeholder={startup.location || "Seleziona Regione"}
              />
            </SelectTrigger>
            <SelectContent>
              {regioni.map((r) => (
                <SelectItem key={r.name} value={r.name}>
                  {r.displayName}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </FormItem>
      </div>
      <SubmitButton />
    </form>
  );
}
