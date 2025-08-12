import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { collections } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import { authOptions } from "@/server/auth";

type userlists = typeof collections.$inferSelect;

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

  const existing: userlists | undefined = await db.query.userLists.findFirst({
    where: (userlist, { eq, and }) =>
      and(
        eq(userlist.userId, userId),
        eq(userlist.fragranceId, fragranceId),
        eq(userlist.type, type),
      ),
  });
  if (existing) {
    await db
      .update(collections)
      .set({
        type,
        notes,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(collections.userId, userId),
          eq(collections.fragranceId, fragranceId),
          eq(collections.type, type),
        ),
      );
    return NextResponse.json(
      { message: "Fragrance Updated successfully." },
      { status: 200 },
    );
  } else {
    await db.insert(collections).values({
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
    .delete(collections)
    .where(
      and(
        eq(collections.userId, userId),
        eq(collections.fragranceId, id),
        eq(collections.type, type),
      ),
    );

  return NextResponse.json({ success: true });
}
