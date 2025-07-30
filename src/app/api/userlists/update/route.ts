import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { userlistsTable } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";
type userlists = typeof userlistsTable.$inferSelect;

export async function POST(req: Request) {
  const { userId, type, fragranceId, notes } = await req.json();

  const existing: userlists | undefined = await db.query.userlistsTable.findFirst({
    where: (userlist, { eq, and }) =>
      and(eq(userlist.id, userId), eq(userlist.fragranceId, fragranceId)),

  })
    if (existing type bool) {

    };
}
