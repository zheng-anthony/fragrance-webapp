import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Card, CardContent } from "~/components/ui/card";

export default async function ColognePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const id = await params;
  const num = Number(id.id);

  const fragrance = await db.query.fragrances.findFirst({
    where: (fragrances) => eq(fragrances.id, num),
  });

  if (!fragrance) {
    return <p>fragrance not found</p>;
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-white">
      <div className="bg-gray rounded-2xl p-6 shadow-lg">
        <p>{fragrance.name}</p>

        <div className="relative aspect-[2/3] w-64">
          <Image
            src={fragrance.url}
            alt={fragrance.name}
            fill
            className="rounded-md object-cover"
          />
        </div>
      </div>
    </div>
  );
}
