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
    <div className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-center gap-4"></div>
      </div>
      <div className="container mx-auto max-w-4xl px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-4 font-sans text-4xl font-bold text-gray-700 md:text-5xl">
            {fragrance.name}
          </h1>
        </div>
        {/* Main Content Grid */}
        <div className="grid items-start gap-12 md:grid-cols-2">
          <div className="flex justify-center">
            <div className="relative aspect-[2/3] w-90 overflow-hidden rounded-2xl bg-black shadow-2xl">
              <Image
                src={fragrance.imageURL || "/test_image.jpg"}
                alt={fragrance.name}
                fill
                className="rounded-md object-cover"
              />
            </div>
          </div>
          <div className="space-y-4">
            <div className="mb-2 text-center">
              <h2 className="mb-2 font-sans text-2xl font-bold text-gray-700">
                Fragrance Notes
              </h2>
            </div>
            {/* Top Notes */}
            <Card className="bg-gray-100 shadow-2xl">
              <CardContent className="p-6">
                <div className="mb-4 flex items-center justify-between">
                  <h3 className="font-sans text-lg font-semibold text-green-800">
                    Top Notes
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-800 text-gray-200"
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
                <p className="mt-3 text-sm text-gray-500">
                  Light, fleeting, and inviting.
                </p>
              </CardContent>
            </Card>
            {/* Middle Notes */}
            <Card className="ml-4 bg-gray-100 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg font-semibold text-green-800">
                    Middle Notes
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-800 text-gray-200"
                  >
                    Heart
                  </Badge>
                </div>
                <Badge variant="outline" className="border-primary/30">
                  {fragrance.middleNotes}
                </Badge>
                <p className="mt-3 text-sm text-gray-500">
                  The soul that defines the scent.
                </p>
              </CardContent>
            </Card>
            {/* Base Notes */}
            <Card className="ml-8 bg-gray-100 shadow-2xl">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <h3 className="font-sans text-lg font-semibold text-green-800">
                    Base Notes
                  </h3>
                  <Badge
                    variant="secondary"
                    className="bg-green-800 text-gray-200"
                  >
                    Heart
                  </Badge>
                </div>
                <Badge variant="outline" className="border-primary/30">
                  {fragrance.baseNotes}
                </Badge>
                <p className="mt-3 text-sm text-gray-500">
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
