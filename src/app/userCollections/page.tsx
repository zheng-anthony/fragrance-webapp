import { Plus, Users, MoreHorizontal, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { db } from "@/server/db";
import { eq, sql, and, notInArray } from "drizzle-orm";
import { collections, collectionsItems } from "~/server/db/schema";
import CreateCollectionButton from "./create-collection/create-collection"
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { DefaultCard } from "./collection-card/collection-card";
import { custom } from "zod";

export default async function CollectionsPage() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    throw new Error("Not signed in");
  }
  const wishlist = await db
    .select()
    .from(collectionsItems)
    .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
    .where(
      and(
        eq(collections.name, "Wishlist"),
        eq(collections.userId, session.user.id),
      ),
    );

  const owned = await db
    .select()
    .from(collectionsItems)
    .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
    .where(
      and(
        eq(collections.name, "Owned"),
        eq(collections.userId, session.user.id),
      ),
    );

  const tried = await db
    .select()
    .from(collectionsItems)
    .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
    .where(
      and(
        eq(collections.name, "Tried"),
        eq(collections.userId, session.user.id),
      ),
    );

  const defaultcollections = [
    {
      id: "Wishlist",
      name: "Wishlist",
      count: wishlist.length,
      description: "Fragrances you own",
      icon: "heart",
    },
    {
      id: "Owned",
      name: "Owned",
      count: owned.length,
      description: "Want to try",
      icon: "check",
    },
    {
      id: "Tried",
      name: "Tried",
      count: tried.length,
      description: "Tested fragrances",
      icon: "eye",
    },
  ];
  // Custom collections

  type customCollections = {
  collections: {
    id: number;
    name: string 
    description: string | null;
    userId: number;
    privacy: string | null;
  };
  collectionsItems: {
    id: number | null;          // can be null
    fragranceId: number | null; // can be null
    collectionsId: number | null;
    createdAt: Date | null;
  } | null;                     
};
  const customCollections = await db.select().from(collectionsItems).leftJoin(collections, eq(collections.id, collectionsItems.collectionsId)).where(notInArray(collections.name, ["Wishlist", "Owned", "Tried"]))

  console.log(customCollections)
const names = await db.select({ name: collections.name }).from(collections);
console.log(names);
  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="mb-2 text-3xl font-bold">My Collections</h1>
            <p className="text-muted-foreground">
              Organize your fragrances into custom collections
            </p>
          </div>
          <CreateCollectionButton />
        </div>

        {/* Search and Filters */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search collections..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Privacy" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Collections</SelectItem>
                    <SelectItem value="public">Public</SelectItem>
                    <SelectItem value="private">Private</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="updated">Recently Updated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                    <SelectItem value="count">Most Items</SelectItem>
                    <SelectItem value="followers">Most Followers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Default Collections</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {defaultcollections.map((collection) => (
              <DefaultCard
                key={collection.id}
                name={collection.name}
                count={collection.count}
                description={collection.description}
                icon={collection.icon}
              />
            ))}
          </div>
        </div>

        {/* Custom Collections */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Custom Collections</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customCollections.map((collection) => (
              collection.collections && collection.collections.name === "Wishlist" || collection.collections && collection.collections.name === "Owned" || collection.collections && collection.collections.name === "Tried" ? (
              <Card
                key={collection.collections.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-semibold">{collection.collections.name}</h3>
                        <Badge
                          variant={
                            collection.collections.privacy === "public"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {collection.collections.privacy}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2 text-sm">
                        {collection.collections.description}
                      </p>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 w-8 p-0"
                        >
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Edit Collection</DropdownMenuItem>
                        <DropdownMenuItem>Share Collection</DropdownMenuItem>
                        <DropdownMenuItem>Duplicate</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Delete Collection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>{} items</span>
                    {collection.collections.privacy === "public" && ( 
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
                
              ) : null))}
          </div>
        </div>

        {/* Empty State for Custom Collections */}
        {customCollections.length === 0 && (
          <Card className="py-12 text-center">
            <CardContent>
              <div className="bg-muted mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full">
                <Plus className="text-muted-foreground h-6 w-6" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                No custom collections yet
              </h3>
              <p className="text-muted-foreground mb-4">
                Create your first custom collection to organize your fragrances
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
