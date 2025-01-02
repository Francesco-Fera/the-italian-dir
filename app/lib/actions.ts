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
    data: startups,
    total,
    totalPages: Math.ceil(total / itemsPerPage),
    currentPage: page,
  };
};
