"use client";
import { Check, Eye, Heart } from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import { signIn, useSession } from "next-auth/react";

export default function CologneCard({
  fragrance,
}: {
  fragrance: {
    id: number;
    url: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
  };
}) {
  const { data: session } = useSession();

  const handleAdd = async (type: "wishlist" | "owned" | "tried") => {
    if (!session?.user.id) {
      await signIn();
      return;
    }
    await fetch("/api/userlists/update", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({
        userId: session?.user.id,
        fragranceId: fragrance.id,
        type,
        notes: "none",
        fragrance_name: fragrance.name,
      }),
    });
  };

  return (
    <Card
      key={fragrance.id}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={fragrance.url}
          alt={fragrance.name}
          fill
          className="rounded-md object-cover"
        />
      </div>

      {/* Info content */}
      <CardContent className="p-3">
        <h3 className="text-sm font-semibold">{fragrance.name}</h3>
        <p className="text-muted-foreground text-xs">{fragrance.name}</p>
        <div className="mt-1 flex gap-1">
          <Button
            size="sm"
            variant="outline"
            className="h-6 flex-1 bg-transparent px-1 text-xs hover:border-red-200 hover:bg-red-50 hover:text-red-600"
            title="Add to Wishlist"
            onClick={() => handleAdd("wishlist")}
          >
            <Heart className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 flex-1 bg-transparent px-1 text-xs hover:border-green-200 hover:bg-green-50 hover:text-green-600"
            title="Mark as Owned"
            onClick={() => handleAdd("owned")}
          >
            <Check className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 flex-1 bg-transparent px-1 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            title="Mark as Tried"
            onClick={() => handleAdd("tried")}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
        <div className="mt-1 flex items-center justify-between"></div>
      </CardContent>
    </Card>
  );
}
