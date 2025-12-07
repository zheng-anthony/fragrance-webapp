"use server";

import { sql } from "drizzle-orm";
import { off } from "process";
import { db } from "~/server/db";
import { fragrances } from "~/server/db/schema";

const pageSize = 24;

export type Fragrance = {
  id: number;
  name: string;
  url: string;
  topNotes: string | null;
  middleNotes: string | null;
  baseNotes: string | null;
};

export type FragrancePage = {
  page: number;
  totalPages: number;
  pageSize: number;
  total: number;
  items: Fragrance[];
};

export async function getFragrancesPages(page: number): Promise<FragrancePage> {
  if (!page || page < 1) page = 1;

  const totalResult = await db
    .select({ value: sql<number>`count(*)` })
    .from(fragrances);

  const total = totalResult[0]?.value ?? 0;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  if (page > totalPages) page = totalPages;

  const offset = (page - 1) * pageSize;

  const items = await db
    .select()
    .from(fragrances)
    .orderBy(fragrances.id)
    .limit(pageSize)
    .offset(offset);

  return {
    page,
    totalPages,
    pageSize: pageSize,
    total,
    items,
  };
}
