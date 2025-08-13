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
import { db } from "@/server/db";
import { eq, and } from "drizzle-orm";
import { collections, fragrances } from "@/server/db/schema";
import { collectionsItems } from "@/server/db/schema";
import { UserCard } from "~/components/cologne-card/cologne-cards";
import { getServerSession } from "next-auth";
import { authOptions } from "~/server/auth";

export const dynamic = "force-dynamic";

export default async function TriedPage() {
  const session = await getServerSession(authOptions);
  if (!session) {
    return;
  }

  const tried = await db
    .select()
    .from(collections)
    .innerJoin(
      collectionsItems,
      eq(collectionsItems.collectionsId, collections.id),
    )
    .innerJoin(fragrances, eq(collectionsItems.fragranceId, fragrances.id))
    .where(
      and(
        eq(collections.name, "Tried"),
        eq(collections.userId, session.user.id),
      ),
    );

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Tried Fragrances</h1>
          <p className="text-muted-foreground">
            {tried.length} fragrances tested
          </p>
        </div>

        {/* Filters and Search */}
        <Card className="mb-6">
          <CardContent className="p-4">
            <div className="flex flex-col gap-4 md:flex-row">
              <div className="flex-1">
                <div className="relative">
                  <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                  <Input
                    placeholder="Search tried fragrances..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Verdict" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Verdicts</SelectItem>
                    <SelectItem value="must-buy">Must Buy</SelectItem>
                    <SelectItem value="want-to-buy">Want to Buy</SelectItem>
                    <SelectItem value="maybe">Maybe</SelectItem>
                    <SelectItem value="pass">Pass</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Rating" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Ratings</SelectItem>
                    <SelectItem value="5">5 Stars</SelectItem>
                    <SelectItem value="4">4+ Stars</SelectItem>
                    <SelectItem value="3">3+ Stars</SelectItem>
                    <SelectItem value="2">2+ Stars</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Recently Tried</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="rating-desc">Highest Rated</SelectItem>
                    <SelectItem value="rating-asc">Lowest Rated</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Tried Fragrances Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {tried.map((f) => (
            <UserCard
              key={f.fragrances.id}
              collections={f.fragrances}
              variant="tried"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
