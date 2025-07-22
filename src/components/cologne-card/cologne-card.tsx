import { Card, CardContent } from "../ui/card";
import Image from "next/image";

export default function CologneCard({
  cologne,
}: {
  cologne: {
    id: number;
    url: string;
    name: string;
    createdAt: Date;
    updatedAt: Date | null;
  };
}) {
  return (
    <Card
      key={cologne.id}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={cologne.url}
          alt={cologne.name}
          fill
          className="rounded-md object-cover"
        />
      </div>

      {/* Info content */}
      <CardContent className="p-3">
        <h3 className="text-sm font-semibold">{cologne.name}</h3>
        <p className="text-muted-foreground text-xs">{cologne.name}</p>
        <div className="mt-1 flex items-center justify-between"></div>
      </CardContent>
    </Card>
  );
}
