import { Search } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { fragrances, collectionsItems, collections } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { db } from "@/server/db";
import { UserCard } from "~/components/cologne-card/cologne-cards";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";
import { CollectionNav } from "~/components/collection-nav/collection-nav";

export default async function WishlistPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }
  const wishlist = await db
    .select()
    .from(collections)
    // Looking inside db table "collectionItems". adding collectionsItems that are inside the specific collection
    .innerJoin(
      collectionsItems,
      eq(collectionsItems.collectionsId, collections.id),
    )
    // looking inside db table "fragrances". adding fragrances that
    .innerJoin(fragrances, eq(collectionsItems.fragranceId, fragrances.id))
    .where(
      and(
        eq(collections.name, "Wishlist"),
        eq(collections.userId, session?.user.id),
      ),
    );

  return (
    <div className="min-h-screen bg-background flex">
      <CollectionNav />
      <div className="flex-1">
        <div className="container mx-auto px-6 py-6">
          {/* Header */}
          <div className="mb-6">
            <h1 className="text-xl font-bold mb-2">Wishlist</h1>
            <p className="text-muted-foreground text-base font-medium">{wishlist.length} fragrances tested</p>
          </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search your wishlist..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="niche">Niche</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="priority">Priority</SelectItem>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="price-asc">Price Low to High</SelectItem>
                    <SelectItem value="price-desc">
                      Price High to Low
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Wishlist Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {wishlist.map((f) => (
            <UserCard
              key={f.fragrances.id}
              fragrance={f.fragrances}
              variant="wishlist"
            />
          ))}
        </div>
      </div>
    </div>
    </div>
  );
}
