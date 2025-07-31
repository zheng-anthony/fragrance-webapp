import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { userlistsTable } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
type Userlists = typeof userlistsTable.$inferSelect;

export async function POST(req: Request) {
  const body: {
    userId: number;
    fragranceId: number;
    type: string;
    notes?: string;
  } = await req.json();

  const { userId, type, fragranceId, notes } = body;

  const existing: Userlists | undefined =
    await db.query.userlistsTable.findFirst({
      where: (userlist, { eq, and }) =>
        and(
          eq(userlist.userId, userId),
          eq(userlist.fragranceId, fragranceId),
          eq(userlist.type, type),
        ),
    });
  if (existing) {
    await db
      .update(userlistsTable)
      .set({
        type,
        notes,
        updatedAt: new Date(),
      })
      .where(
        and(
          eq(userlistsTable.userId, userId),
          eq(userlistsTable.fragranceId, fragranceId),
          eq(userlistsTable.type, type),
        ),
      );
  } else {
    await db.insert(userlistsTable).values({
      userId,
      fragranceId,
      type,
      notes,
    });
  }
}
