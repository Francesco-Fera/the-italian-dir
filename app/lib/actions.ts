"use server";

import prisma from "@/lib/db";
import { Startup, MediaType } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { supabase } from "./supabase";

export const getTotalStartups = async (query: string): Promise<number> => {
  const total = await prisma.startup.count({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
  });
  return total;
};

export const fetchFilteredPaginatedStartups = async ({
  query,
  page,
}: {
  query: string;
  page: number;
}) => {
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const startups = await prisma.startup.findMany({
    where: {
      name: {
        contains: query,
        mode: "insensitive",
      },
    },
    include: {
      category: true,
    },
    skip: offset,
    take: itemsPerPage,
  });

  const total = await getTotalStartups(query);

  return {
    data: startups as Startup[],
    total,
    totalPages: Math.ceil(total / itemsPerPage),
    currentPage: page,
  };
};

export const fetchPaginatedStartupsByCategoryId = async ({
  id,
  page,
}: {
  id: string;
  page: number;
}) => {
  const itemsPerPage = 10;
  const offset = (page - 1) * itemsPerPage;

  const startups = await prisma.startup.findMany({
    where: {
      id,
    },
    skip: offset,
    take: itemsPerPage,
  });

  const total = await prisma.startup.count({
    where: {
      id,
    },
  });

  return {
    data: startups as Startup[],
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
  // const { getUser } = getKindeServerSession();
  // const user = await getUser();

  // if (!user) {
  //   return {
  //     success: false,
  //     error: "Unauthorized. You must be logged in to upload files.",
  //   };
  // }

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
