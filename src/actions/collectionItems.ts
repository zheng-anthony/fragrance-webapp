"use server";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { collectionsItems } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";
import type { DefaultCollections } from "~/types/types";

export async function handleAddDefaultCollections(
  fragranceId: number,
  defaultCollections: DefaultCollections,
) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const collection = await db.query.collections.findFirst({
    where: (collection) =>
      and(
        eq(collection.name, defaultCollections),
        eq(collection.userId, session?.user.id),
      ),
  });

  if (!collection) return;

  await handleAdd(collection.id, fragranceId);
}

export async function handleAdd(collectionsId: number, fragranceId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }

  const userId = session?.user.id;

  const ownedCollection = await db.query.collections.findFirst({
    where: (c) => and(eq(c.id, collectionsId), eq(c.userId, userId)),
  });

  if (!ownedCollection) {
    throw new Error("Collection not found or not owned by user");
  }

  const existing = await db.query.collectionsItems.findFirst({
    where: (f) =>
      and(eq(f.collectionsId, collectionsId), eq(f.fragranceId, fragranceId)),
  });

  if (!existing) {
    await db.insert(collectionsItems).values({
      collectionsId: ownedCollection.id,
      fragranceId: fragranceId,
      createdAt: new Date(),
    });
  } else {
    console.log("item already exists");
  }
}
