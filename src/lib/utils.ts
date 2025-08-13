import { clsx, type ClassValue } from "clsx";
import { getServerSession } from "next-auth";
import { twMerge } from "tailwind-merge";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { collections, collectionsItems } from "~/server/db/schema";

type collectionsItems = typeof collectionsItems.$inferSelect;

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
