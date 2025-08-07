import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { userLists } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
type Userlists = typeof userLists.$inferSelect;

export async function POST(req: Request) {
  const body = (await req.json()) as {
    userId: number;
    fragranceId: number;
    type: string;
    notes: string;
  };

  const { userId, type, fragranceId, notes } = body;

  const existing: Userlists | undefined = await db.query.userLists.findFirst({
    where: (userlist, { eq, and }) =>
      and(
        eq(userlist.userId, userId),
        eq(userlist.fragranceId, fragranceId),
        eq(userlist.type, type),
      ),
  });
  if (existing) {
    await db
      .update(userLists)
      .set({
        type,
        notes,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userLists.userId, userId),
          eq(userLists.fragranceId, fragranceId),
          eq(userLists.type, type),
        ),
      );
  } else {
    await db.insert(userLists).values({
      userId,
      fragranceId,
      type,
      notes,
    });
  }
}
export async function DELETE(req: Request) {
  const body = (await req.json()) as {
    userId: number;
    fragranceId: number;
    type: string;
  };

  const { userId, fragranceId, type } = body;

  await db
    .delete(userLists)
    .where(
      and(
        eq(userLists.userId, userId),
        eq(userLists.fragranceId, fragranceId),
        eq(userLists.type, type),
      ),
    );
}
