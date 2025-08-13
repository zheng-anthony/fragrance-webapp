import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { collections, collectionsItems } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export async function handleAddWishlist(fragranceId: number) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return;
  }

  const collection = await db
    .select()
    .from(collections)
    .where(
      and(
        eq(collections.name, "wishlist"),
        eq(collections.userId, session?.user.id),
      ),
    );

  if (collection.length === 0 || !collection[0]) {
    console.log("ni hao");
    return;
  }

  await handleAdd(collection[0].id, fragranceId);
}

export async function handleAdd(collectionsId: number, fragranceId: number) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }

  const userId = session?.user.id;

  const ownedCollection = await db.query.collections.findFirst({
    where: (c, { and, eq }) =>
      and(eq(c.id, collectionsId), eq(c.userId, userId)),
  });

  if (!ownedCollection) {
    throw new Error("Collection not found or not owned by user");
  }

  const existing = await db.query.collectionsItems.findFirst({
    where: (f, { and, eq }) =>
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
