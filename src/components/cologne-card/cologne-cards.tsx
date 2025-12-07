"use client";
import {
  Check,
  Eye,
  Heart,
  MoreHorizontal,
  Plus,
  ShoppingCart,
} from "lucide-react";
import { Button } from "../ui/button";
import { Card, CardContent } from "../ui/card";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { useRouter } from "next/navigation";
import { handleAddDefaultCollections } from "~/actions/collectionItems";
import { DefaultCollections } from "~/types/types";

export const dynamic = "force-dynamic";

export function CatalogCard({
  fragrance,
}: {
  fragrance: {
    id: number;
    url: string;
    name: string;
    imageURL: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
}) {
  const router = useRouter();
  const go = () => router.push(`/fragrances/${fragrance.id}`);

  const defaultAdded = (
    fragranceId: number,
    defaultCollections: DefaultCollections,
  ) => {
    void handleAddDefaultCollections(fragranceId, defaultCollections);
    router.refresh();
  };

  return (
    <Card
      key={fragrance.id}
      className="cursor-pointer transition-shadow hover:shadow-md"
    >
      <div className="relative aspect-[3/4]">
        <Image
          src={fragrance.imageURL || "/test_image.jpg"}
          alt={fragrance.name}
          fill
          className="rounded-md object-cover"
          onClick={go}
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
            onClick={() => {
              void defaultAdded(fragrance.id, DefaultCollections.Wishlist);
            }}
          >
            <Heart className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 flex-1 bg-transparent px-1 text-xs hover:border-green-200 hover:bg-green-50 hover:text-green-600"
            title="Mark as Owned"
            onClick={() => {
              void defaultAdded(fragrance.id, DefaultCollections.Owned);
            }}
          >
            <Check className="h-3 w-3" />
          </Button>
          <Button
            size="sm"
            variant="outline"
            className="h-6 flex-1 bg-transparent px-1 text-xs hover:border-blue-200 hover:bg-blue-50 hover:text-blue-600"
            title="Mark as Tried"
            onClick={() => {
              void defaultAdded(fragrance.id, DefaultCollections.Tried);
            }}
          >
            <Eye className="h-3 w-3" />
          </Button>
        </div>
        <div className="mt-1 flex items-center justify-between"></div>
      </CardContent>
    </Card>
  );
}

export function UserCard({
  variant,
  fragrance: fragrance,
}: {
  variant: string;
  fragrance: {
    id: number;
    url: string;
    name: string;
    imageURL: string | null;
    createdAt: Date;
    updatedAt: Date | null;
  };
}) {
  const router = useRouter();
  const go = () => router.push(`/fragrances/${fragrance.id}`);
  return (
    <>
      {/* wishlist */}
      {variant === "wishlist" && (
        <Card
          key={fragrance.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardContent className="p-4">
            <div className="relative mb-4 aspect-[3/4]">
              <Image
                src={fragrance.imageURL || "/test_image.jpg"}
                alt={fragrance.name}
                fill
                className="rounded-md object-cover"
                onClick={go}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{fragrance.name}</h3>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Added:</span>
                  <span>
                    {new Date(fragrance.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              {fragrance && (
                <div className="bg-muted mt-3 rounded-md p-2"></div>
              )}

              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Buy Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Mark Tried
                  </Button>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent px-2"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-green-600">
                        Mark as Owned
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-blue-600">
                        Mark as Tried
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-orange-600">
                        Change Priority
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove from Wishlist
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* tried */}
      {variant === "tried" && (
        <Card
          key={fragrance.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <CardContent className="p-4">
            <div className="relative mb-4 aspect-[3/4]">
              <Image
                src={fragrance.url || "/placeholder.svg"}
                alt={fragrance.name}
                fill
                className="rounded-md object-cover"
                onClick={go}
              />
            </div>

            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{fragrance.name}</h3>

              <div className="mt-4 space-y-2">
                <div className="flex gap-2">
                  <Button size="sm" className="flex-1">
                    <ShoppingCart className="mr-1 h-4 w-4" />
                    Buy Now
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 bg-transparent"
                  >
                    <Plus className="mr-1 h-4 w-4" />
                    Add to Wishlist
                  </Button>
                </div>
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        size="sm"
                        variant="outline"
                        className="bg-transparent px-2"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem className="text-green-600">
                        Mark as Owned
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-blue-600">
                        Add to Wishlist
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-orange-600">
                        Change Verdict
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-600">
                        Remove from Tried
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
      {/* owned */}
      {variant === "owned" && (
        <Card
          key={fragrance.id}
          className="cursor-pointer transition-shadow hover:shadow-lg"
        >
          <div className="relative aspect-[3/4]">
            <Image
              src={fragrance.imageURL || "/test_image.jpg"}
              alt={fragrance.name}
              fill
              className="rounded-md object-cover"
              onClick={go}
            />
          </div>
          <CardContent className="p-4">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold">{fragrance.name}</h3>

              <div className="space-y-1 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Added:</span>
                  <span>
                    Added:{" "}
                    {new Date(fragrance.createdAt).toLocaleDateString()}{" "}
                  </span>
                </div>
              </div>
              <div className="flex gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      size="sm"
                      variant="outline"
                      className="bg-transparent px-2"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                    align="end"
                    className="bg-black text-white"
                  >
                    <DropdownMenuItem className="text-green-400">
                      Mark as Owned
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-blue-400">
                      Add to Wishlist
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-orange-400">
                      Change Verdict
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      Remove from Owned
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </>
  );
}
