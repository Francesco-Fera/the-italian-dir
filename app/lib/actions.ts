"use server";

import prisma from "@/lib/db";
import { Startup } from "@prisma/client";

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
  console.log("formData", formData);
  // try {
  //   const updatedStartup = await prisma.startup.update({
  //     where: {
  //       id,
  //     },
  //     data,
  //   });

  //   return updatedStartup;
  // } catch (error) {
  //   console.error("Error updating startup:", error);
  //   throw error;
  // }
};
