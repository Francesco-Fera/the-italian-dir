"use server";

import prisma from "@/lib/db";
import { Startup } from "@prisma/client";
import { revalidatePath } from "next/cache";

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
    console.log(formData);
    // Extract values from FormData
    const id = formData.get("id") as string;
    const name = formData.get("name") as string;
    const tagline = formData.get("tagline") as string;
    const category = formData.get("category") as string;
    const description = formData.get("description") as string;
    const regione = formData.get("regione") as string;

    // Collect features from FormData
    const features: string[] = [];
    formData.forEach((value, key) => {
      if (key === "feature" && value) {
        features.push(value as string);
      }
    });

    // Validate that an ID exists
    if (!id) {
      throw new Error("Startup ID is required.");
    }

    // Update the startup in the database
    const updatedStartup = await prisma.startup.update({
      where: {
        id,
      },
      data: {
        name,
        tagline,
        category,
        description,
        location: regione,
        features: features.length > 0 ? features : undefined, // Only update if features exist
      },
    });

    revalidatePath(`/app/${id}`);

    // return updatedStartup;
  } catch (error) {
    console.error("Error updating startup:", error);
    throw error;
  }
};
