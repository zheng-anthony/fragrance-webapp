import { db } from "@/server/db";
import { eq } from "drizzle-orm";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "~/components/ui/button";
import { ArrowLeft, Link } from "lucide-react";

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
    <div className="min-h-screen bg-background">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-4"></div>
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-sans text-xl font-bold text-foreground">
            {fragrance.name}
          </h1>
        </div>
        {/* Main Content Grid */}
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative aspect-[2/3] w-90 overflow-hidden rounded-2xl bg-primary shadow-2xl">
              <Image
                src={fragrance.imageURL ?? "/test_image.jpg"}
                alt={fragrance.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="mb-2 text-center">
              <h2 className="mb-2 font-sans text-xl font-bold text-foreground">
                Fragrance Notes
              </h2>
            </div>
            {/* Top Notes */}
            <Card className="bg-muted shadow-2xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-sans text-xl font-bold text-foreground">
                    Top Notes
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    Opening
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-2">
                  {" "}
                  <Badge variant="outline" className="border-primary/30">
                    {fragrance.topNotes}
                  </Badge>
                </div>
                <p className="mt-3 text-base font-medium text-muted-foreground">
                  Light, fleeting, and inviting.
                </p>
              </CardContent>
            </Card>
            {/* Middle Notes */}
            <Card className="ml-4 bg-muted shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-xl font-bold text-foreground">
                    Middle Notes
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    Heart
                  </Badge>
                </div>
                <Badge variant="outline" className="border-primary/30">
                  {fragrance.middleNotes}
                </Badge>
                <p className="mt-3 text-base font-medium text-muted-foreground">
                  The soul that defines the scent.
                </p>
              </CardContent>
            </Card>
            {/* Base Notes */}
            <Card className="ml-8 bg-muted shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-xl font-bold text-foreground">
                    Base Notes
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-accent text-accent-foreground"
                  >
                    Heart
                  </Badge>
                </div>
                <Badge variant="outline" className="border-primary/30">
                  {fragrance.baseNotes}
                </Badge>
                <p className="mt-3 text-base font-medium text-muted-foreground">
                  Deep, grounding, and unforgettable.{" "}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
