"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Startup } from "@prisma/client";
import { SubmitButton } from "./Buttons";
import { updateStartupLinks } from "../lib/actions";
import { toast } from "sonner";
import {
  BriefcaseBusiness,
  DollarSign,
  Facebook,
  Github,
  Instagram,
  Linkedin,
  Rss,
  Twitter,
  XCircle,
} from "lucide-react";

const formSchema = z.object({
  contactEmail: z.string().email("Indirizzo Email non valido").optional(),
  twitterUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  linkedinUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  facebookUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  instagramUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  githubUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  blogUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  pricingPageUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
  jobsUrl: z
    .string()
    .url("URL non valido, includi tutto il link https://")
    .optional()
    .or(z.literal("")),
});

interface Props {
  startup?: Partial<Startup>;
}

export default function LinksForm({ startup = {} }: Props) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      contactEmail: startup?.contactEmail || "",
      twitterUrl: startup?.twitterUrl || "",
      linkedinUrl: startup?.linkedinUrl || "",
      facebookUrl: startup?.facebookUrl || "",
      instagramUrl: startup?.instagramUrl || "",
      githubUrl: startup?.githubUrl || "",
      blogUrl: startup?.blogUrl || "",
      pricingPageUrl: startup?.pricingPageUrl || "",
      jobsUrl: startup?.jobsUrl || "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    const formData = new FormData();
    formData.append("id", startup.id || "");
    Object.entries(values).forEach(([key, value]) => {
      if (value) {
        formData.append(key, value);
      }
    });

    const response = await updateStartupLinks(formData);

    if (response.success) {
      toast.success("Link aggiornato con successo");
    } else {
      toast.error("Errore durante l'aggiornamento del link");
    }
  }

  const handleClearField = (fieldName: keyof z.infer<typeof formSchema>) => {
    form.setValue(fieldName, "");
  };

  const socialLinks = [
    {
      id: "twitterUrl",
      label: "Twitter/X",
      placeholder: "Il tuo Twitter handle",
      prefix: <Twitter size={16} />,
    },
    {
      id: "linkedinUrl",
      label: "LinkedIn",
      placeholder: "Il tuo profilo LinkedIn",
      prefix: <Linkedin size={16} />,
    },
    {
      id: "facebookUrl",
      label: "Facebook",
      placeholder: "La tua Facebook page",
      prefix: <Facebook size={16} />,
    },
    {
      id: "instagramUrl",
      label: "Instagram",
      placeholder: "Il tuo profilo Instagram",
      prefix: <Instagram size={16} />,
    },
    {
      id: "githubUrl",
      label: "GitHub",
      placeholder: "Il tuo GitHub repository",
      prefix: <Github size={16} />,
    },
    {
      id: "blogUrl",
      label: "Blog",
      placeholder: "Racconta la tua Startup",
      prefix: <Rss size={16} />,
    },
    {
      id: "pricingPageUrl",
      label: "Pricing Page",
      placeholder: "Mostra il tuo Pricing",
      prefix: <DollarSign size={16} />,
    },
    {
      id: "jobsUrl",
      label: "Jobs Page",
      placeholder: "Trova nuovi Talenti",
      prefix: <BriefcaseBusiness size={16} />,
    },
  ];

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className='space-y-6 w-full max-w-xl'
      >
        <input type='hidden' name='id' value={startup.id} />
        <FormField
          control={form.control}
          name='contactEmail'
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor='contactEmail'>Email</FormLabel>
              <FormControl>
                <Input
                  id='contactEmail'
                  placeholder="L'email della tua startup"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {socialLinks.map(({ id, label, placeholder, prefix }) => (
          <FormField
            key={id}
            control={form.control}
            name={id as keyof z.infer<typeof formSchema>}
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor={id}>{label}</FormLabel>
                <FormControl>
                  <div className='flex items-center'>
                    <div className='bg-muted px-3 py-2 border border-r-0 rounded-l-md text-muted-foreground text-sm'>
                      {prefix}
                    </div>
                    <Input
                      id={id}
                      className='rounded-l-none flex-1'
                      placeholder={placeholder}
                      {...field}
                    />
                    {field.value && (
                      <button
                        type='button'
                        onClick={() =>
                          handleClearField(
                            id as keyof z.infer<typeof formSchema>
                          )
                        }
                        className='ml-2 text-red-500 hover:text-red-700'
                      >
                        <XCircle size={16} />
                      </button>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        ))}

        <SubmitButton />
      </form>
    </Form>
  );
}
