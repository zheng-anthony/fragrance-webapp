"use client";
import { Check, Eye, Heart, Icon } from "lucide-react";
import { Card, CardContent } from "~/components/ui/card";
import { useRouter } from "next/navigation";
import type { LucideIcon } from "lucide-react";

const getIcon = (icon: string): LucideIcon => {
  if (icon === "heart") return Heart;
  if (icon === "check") return Check;
  return Eye;
};
export function DefaultCard({
  name,
  count,
  description,
  icon,
}: {
  name: string;
  count: number;
  description: string;
  icon: string;
}) {
  const router = useRouter();
  const Icon = getIcon(icon);

  return (
    <Card
      onClick={() => router.push(`/${name}`)}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <CardContent className="p-4">
        <div className="mb-3 flex items-center gap-3">
          <div className="bg-primary/10 rounded-lg p-2">
            <Icon className="text-primary h-5 w-5" />
          </div>
          <div className="flex-1">
            <h3 className="font-semibold">{name}</h3>
            <p className="text-muted-foreground text-sm">{description}</p>
          </div>
        </div>
        <div className="text-muted-foreground flex items-center justify-between text-sm">
          <span>{count} items</span>
        </div>
      </CardContent>
    </Card>
  );
}
