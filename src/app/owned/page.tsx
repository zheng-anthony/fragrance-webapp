import { Search, Grid } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import { eq } from "drizzle-orm";
import { userLists } from "@/server/db/schema";
import { fragrances } from "@/server/db/schema";
import { UserCard } from "~/components/cologne-card/cologne-cards";

export const dynamic = "force-dynamic";

export default async function OwnedPage() {
  const owned = await db
    .select()
    .from(userLists)
    .innerJoin(fragrances, eq(userLists.fragranceId, fragrances.id))
    .where(eq(userLists.type, "owned"));

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Owned Fragrances</h1>
          <p className="text-muted-foreground">
            {owned.length} fragrances owned
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
                    placeholder="Search your collection..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    <SelectItem value="designer">Designer</SelectItem>
                    <SelectItem value="niche">Niche</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Season" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Seasons</SelectItem>
                    <SelectItem value="spring-summer">Spring/Summer</SelectItem>
                    <SelectItem value="fall-winter">Fall/Winter</SelectItem>
                    <SelectItem value="all-season">All Season</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="date-desc">Newest First</SelectItem>
                    <SelectItem value="date-asc">Oldest First</SelectItem>
                    <SelectItem value="rating-desc">Highest Rated</SelectItem>
                    <SelectItem value="rating-asc">Lowest Rated</SelectItem>
                    <SelectItem value="name">Name A-Z</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="icon">
                  <Grid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Collection Grid */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {owned.map((f) => (
            <UserCard
              key={f.fragrances.id}
              userLists={f.fragrances}
              variant="owned"
            />
          ))}
        </div>
      </div>
    </div>
  );
}
