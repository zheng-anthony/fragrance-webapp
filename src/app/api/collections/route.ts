import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { collections } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

type collections = typeof collections.$inferSelect;

export async function POST(req: Request) {
  const body = (await req.json()) as {
    collectionName: string;
    userId: number;
    collectionDescription: string;
    collectionPrivacy: string;
  };

  const { userId, collectionName, collectionDescription, collectionPrivacy } =
    body;

  const existing: collections | undefined =
    await db.query.collections.findFirst({
      where: (collections, { eq, and }) =>
        and(
          eq(collections.collectionName, collectionName),
          eq(collections.userId, userId),
        ),
    });
  if (existing) {
    return NextResponse.json(
      { message: "Collection Already Exists." },
      { status: 200 },
    );
  } else {
    await db.insert(collections).values({
      userId,
      collectionName,
      collectionDescription,
      collectionPrivacy,
    });
    return NextResponse.json({ message: "Collection Added." }, { status: 200 });
  }
}
