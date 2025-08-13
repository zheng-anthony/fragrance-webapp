import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { collectionsItems } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

type collectionsItems = typeof collectionsItems.$inferSelect;

export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  const userId = session?.user.id;

  const body = (await req.json()) as {
    fragranceId: number;
    type: string;
    notes: string;
  };

  const { type, fragranceId, notes } = body;

  const existing: collectionsItems | undefined =
    await db.query.collections.findFirst({
      where: (collectionsItems, { eq, and }) =>
        and(
          eq(collectionsItems.userId, userId),
          eq(collectionsItems.fragranceId, fragranceId),
        ),
    });
  if (existing) {
    await db
      .update(collectionsItems)
      .set({
        type,
        notes,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(collectionsItems.userId, userId),
          eq(collectionsItems.fragranceId, fragranceId),
          eq(collectionsItems.type, type),
        ),
      );
    return NextResponse.json(
      { message: "Fragrance Updated successfully." },
      { status: 200 },
    );
  } else {
    await db.insert(collectionsItems).values({
      userId,
      fragranceId,
      type,
      notes,
    });
    return NextResponse.json(
      { message: "Fragrance Added successfully." },
      { status: 200 },
    );
  }
}
export async function DELETE(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  const userId = session?.user.id;
  const body = (await req.json()) as {
    id: number;
    type: string;
  };

  const { id, type } = body;

  await db
    .delete(collectionsItems)
    .where(
      and(
        eq(collectionsItems.userId, userId),
        eq(collectionsItems.fragranceId, id),
        eq(collectionsItems.type, type),
      ),
    );

  return NextResponse.json({ success: true });
}
