import { NextResponse } from "next/server";
import { db } from "@/server/db";
import { collections } from "~/server/db/schema";
import { and, eq } from "drizzle-orm";

type collections = typeof collections.$inferSelect;

export async function POST(req: Request) {
  const body = (await req.json()) as {
    collection_name: string;
    userId: number;
    collection_description: string;
    collection_privacy: string;
  };

  const {
    userId,
    collection_name,
    collection_description,
    collection_privacy,
  } = body;

  const existing: collections | undefined =
    await db.query.collections.findFirst({
      where: (collections, { eq, and }) =>
        and(
          eq(collections.collection_name, collection_name),
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
      collection_name,
      collection_description,
      collection_privacy,
    });
    return NextResponse.json({ message: "Collection Added." }, { status: 200 });
  }
}
