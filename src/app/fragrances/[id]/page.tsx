import { db } from "@/server/db";
import Image from "next/image";
import { Button } from "~/components/ui/button";
import { Card, CardContent } from "~/components/ui/card";

export default async function ColognePage({
  params,
}: {
  params: { id: string };
}) {
  const fragrance = await db.query.fragrances.findFirst({
    where: (fragrances, { eq }) => eq(fragrances.id, Number(params.id)),
  });

  if (!fragrance) {
    return <p>fragrance not found</p>;
  }
  return (
    <>
      <p>{fragrance.name}</p>
      <Card
        key={fragrance.id}
        className="relative aspect-[2/3] w-32 cursor-pointer transition-shadow hover:shadow-md"
      >
        <div className="relative aspect-[2/3]">
          <Image
            src={fragrance.url}
            alt={fragrance.name}
            fill
            className="rounded-md object-cover"
          />
        </div>

        <CardContent className="p-2">
          <h3 className="truncate text-xs leading-tight font-semibold">
            {fragrance.name}
          </h3>
          <p className="text-muted-foreground truncate text-[10px]">
            {fragrance.name}
          </p>
        </CardContent>
      </Card>
    </>
  );
}
