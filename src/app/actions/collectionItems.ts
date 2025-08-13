import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { db } from "~/server/db";
import { collectionsItems } from "~/server/db/schema";

export async function handleAdd({
  collectionsId,
  fragranceId,
}: {
  collectionsId: number;
  fragranceId: number;
}) {
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
