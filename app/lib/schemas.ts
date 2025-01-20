import { z } from "zod";

export const updateLinksSchema = z.object({
  id: z.string().uuid("Invalid startup ID"),
  contactEmail: z
    .string()
    .email("Indirizzo Email non valido")
    .optional()
    .or(z.literal("")),
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
