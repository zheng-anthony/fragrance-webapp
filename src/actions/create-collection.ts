"use server";

import { db } from "~/server/db";
import { collections } from "~/server/db/schema";

export async function addCollection(
  collectionName: string,
  description: string,
  privacy: string,
  userId: number,
) {
  const created = await db.insert(collections).values({
    name: collectionName,
    description: description,
    privacy: privacy,
    userId: userId,
  });
}
