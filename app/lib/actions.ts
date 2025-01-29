"use server";

import prisma from "@/lib/db";
import { Startup, MediaType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";
import { updateLinksSchema } from "./schemas";
import puppeteer from "puppeteer";
import { redirect } from "next/navigation";

export const fetchFilteredPaginatedStartups = async ({
  filters,
  page,
}: {
  filters: {
    query?: string;
    categoryId?: string;
    regione?: string;
  };
  page: number;
}) => {
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const where: any = {};

  if (filters.query) {
    where.name = {
      contains: filters.query,
      mode: "insensitive",
    };
  }

  if (filters.categoryId) {
    where.categoryId = filters.categoryId;
  }

  if (filters.regione) {
    where.location = {
      contains: filters.regione,
      mode: "insensitive",
    };
  }

  const startups = await prisma.startup.findMany({
    where,
    include: {
      category: true,
    },
    skip: offset,
    take: itemsPerPage,
  });

  const total = await prisma.startup.count({ where });

  return {
    data: startups,
    total,
    totalPages: Math.ceil(total / itemsPerPage),
    currentPage: page,
  };
};

export const getStartupById = async (id: string) => {
  try {
    const startup = await prisma.startup.findUnique({
      where: {
        id,
      },
    });

    if (!startup) {
      throw new Error(`Startup with ID ${id} not found.`);
    }

    return startup as Startup;
  } catch (error) {
    console.error("Error fetching startup by ID:", error);
    throw error;
  }
};

export async function getStartupBySlug(slug: string) {
  const decodedSlug = decodeURIComponent(slug);
  try {
    const startup = await prisma.startup.findFirst({
      where: {
        name: decodedSlug,
      },
      include: {
        category: true,
      },
    });

    if (!startup) {
      return { success: false, error: "Startup not found" };
    }

    return { success: true, data: startup };
  } catch (error) {
    console.error("Error fetching startup:", error);
    return { success: false, error: "Failed to fetch startup" };
  }
}

export const updateStartup = async (formData: FormData) => {
  try {
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const categoryId = formData.get("category") as string;
    const description = formData.get("description") as string;
    const regione = formData.get("regione") as string;

    if (!id) {
      throw new Error("Startup ID is required.");
    }

    const features: string[] = [];
    formData.forEach((value, key) => {
      if (key === "feature" && value) {
        features.push(value as string);
      }
    });

    const updateData: any = {
      name,
      tagline,
      categoryId,
      description,
      location: regione,
      features: features.length > 0 ? features : undefined,
    };

    const updatedStartup = await prisma.startup.update({
      where: {
        id,
      },
      data: {
        ...updateData,
      },
    });

    revalidatePath(`/app/${id}`);
    return { success: true, startup: updatedStartup };
  } catch (error) {
    console.error("Error updating startup:", error);
    return { success: false, error: "Failed to update startup" };
  }
};

export async function updateStartupLinks(formData: FormData) {
  try {
    const validatedData = updateLinksSchema.parse({
      id: formData.get("id"),
      contactEmail: formData.get("contactEmail"),
      twitterUrl: formData.get("twitterUrl") || "",
      linkedinUrl: formData.get("linkedinUrl") || "",
      facebookUrl: formData.get("facebookUrl") || "",
      instagramUrl: formData.get("instagramUrl") || "",
      githubUrl: formData.get("githubUrl") || "",
      blogUrl: formData.get("blogUrl") || "",
      pricingPageUrl: formData.get("pricingPageUrl") || "",
      jobsUrl: formData.get("jobsUrl") || "",
    });

    const updatedStartup = await prisma.startup.update({
      where: { id: validatedData.id },
      data: {
        contactEmail: validatedData.contactEmail,
        twitterUrl: validatedData.twitterUrl,
        linkedinUrl: validatedData.linkedinUrl,
        facebookUrl: validatedData.facebookUrl,
        instagramUrl: validatedData.instagramUrl,
        githubUrl: validatedData.githubUrl,
        blogUrl: validatedData.blogUrl,
        pricingPageUrl: validatedData.pricingPageUrl,
        jobsUrl: validatedData.jobsUrl,
      },
    });
    revalidatePath(`/app/${updatedStartup.id}`);
    return { success: true, message: "Startup links updated successfully." };
  } catch (error) {
    console.error("Error updating startup links:", error);
    return { success: false, error: "Failed to update startup links." };
  }
}

export const getUserStartups = async (userId: string) => {
  const startups = await prisma.startup.findMany({
    where: {
      suggestedByUserId: userId,
    },
  });

  return startups;
};

export async function getAllCategories() {
  const categories = await prisma.category.findMany({});
  return categories;
}

export async function getCategoryById(id: string) {
  const category = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  return category;
}

export async function getCategoryByName(name: string) {
  const category = await prisma.category.findFirst({
    where: {
      name,
    },
  });

  return category;
}

export async function uploadImage(file: File, type: MediaType) {
  try {
    if (!file) {
      throw new Error("No file uploaded");
    }

    const fileExt = file.name.split(".").pop();
    const fileName = `${file.name}-${Date.now()}`;
    const { data, error } = await supabase.storage
      .from("all-italian-dir")
      .upload(fileName, file);

    if (error) {
      throw new Error("Error uploading file", error);
    }

    const { data: urlData } = supabase.storage
      .from("all-italian-dir")
      .getPublicUrl(fileName);

    return { fileName, url: urlData.publicUrl, type };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Failed to upload image" };
  }
}

export async function updateStartupImages(formData: FormData) {
  try {
    const logoFile = formData.get("logo") as File;
    const coverFile = formData.get("cover") as File;
    const startupId = formData.get("id") as string;

    const imagesToUpload = [];
    if (logoFile.size > 0) {
      imagesToUpload.push(uploadImage(logoFile, MediaType.LOGO));
    }
    if (coverFile.size > 0) {
      imagesToUpload.push(uploadImage(coverFile, MediaType.THUMBNAIL));
    }

    const uploadedImages = await Promise.all(imagesToUpload);

    const updateData: any = {};
    const mediaToCreate = [];

    for (const image of uploadedImages) {
      if (image.type === MediaType.LOGO) {
        updateData.logoUrl = image.url;
      } else if (image.type === MediaType.THUMBNAIL) {
        updateData.thumbnailUrl = image.url;
      }

      mediaToCreate.push({
        fileName: image.fileName,
        url: image.url,
        type: image.type,
      });
    }

    await prisma.startup.update({
      where: { id: startupId },
      data: {
        ...updateData,
        media: {
          create: mediaToCreate,
        },
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Error:", error);
    return { success: false, error: "Failed to update startup images" };
  }
}

interface CreateStartupData {
  name: string;
  tagline: string;
  thumbnailUrl: string;
  websiteUrl: string;
}

export async function createStartup(data: CreateStartupData) {
  let newStartupId: string;
  try {
    const newStartup = await prisma.startup.create({
      data: {
        name: data.name,
        tagline: data.tagline,
        thumbnailUrl: data.thumbnailUrl,
        websiteUrl: data.websiteUrl,
      },
    });

    newStartupId = newStartup.id;
  } catch (error) {
    console.error("Errore durante la creazione della startup:", error);
    return {
      success: false,
      error: "Errore durante la creazione della startup",
    };
  }
  redirect(`/app/${newStartupId}`);
}

export async function extractStartupData(websiteUrl: string) {
  if (!websiteUrl) {
    return { success: false, error: "URL non valido" };
  }

  try {
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--lang="it-IT"'],
    });
    const page = await browser.newPage();
    await page.setExtraHTTPHeaders({
      "Accept-Language": "it",
    });
    await page.goto(websiteUrl, { waitUntil: "networkidle2" });

    const screenshotBuffer = await page.screenshot({ type: "png" });

    const metadata = await page.evaluate(() => {
      const getMetaContent = (name: string) =>
        document
          .querySelector(`meta[name="${name}"]`)
          ?.getAttribute("content") ||
        document
          .querySelector(`meta[property="${name}"]`)
          ?.getAttribute("content");

      return {
        name:
          document.title ||
          getMetaContent("og:title") ||
          "Nome non disponibile",
        tagline:
          getMetaContent("description") ||
          getMetaContent("og:description") ||
          "Tagline non disponibile",
      };
    });

    await browser.close();

    // Upload dell'immagine usando la server action esistente
    const file = new File([screenshotBuffer], "thumbnail.png", {
      type: "image/png",
    });
    const imageUploadResult = await uploadImage(file, MediaType.THUMBNAIL);

    if (!imageUploadResult || !imageUploadResult.url) {
      throw new Error("Errore durante l'upload dell'immagine");
    }

    return {
      success: true,
      data: {
        name: metadata.name,
        tagline: metadata.tagline,
        thumbnailUrl: imageUploadResult.url,
        websiteUrl,
      },
    };
  } catch (error) {
    console.error("Errore durante l'estrazione dei dati:", error);
    return { success: false, error: "Errore durante l'elaborazione dei dati" };
  }
}

export async function fetchLatestStartups(limit: number) {
  const startups = await prisma.startup.findMany({
    orderBy: {
      createdAt: "desc",
    },
    take: limit,
  });
  return startups;
}
