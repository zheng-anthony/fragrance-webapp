import { Star, Search, ShoppingCart, Plus, MoreHorizontal } from "lucide-react";
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
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { fragrances, userLists } from "@/server/db/schema";
import { eq } from "drizzle-orm";
import { db } from "@/server/db";

export default async function WishlistPage() {
  const wishlist = await db
    .select()
    .from(userLists)
    .innerJoin(fragrances, eq(userLists.fragranceId, fragrances.id))
    .where(eq(userLists.type, "tried"));

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">My Wishlist</h1>
          <p className="text-muted-foreground">{wishlist.length} Wishlist</p>
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
            <Card
              key={f.fragrances.id}
              className="cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4">
                <div className="relative mb-4 aspect-[3/4]">
                  <Image
                    src={f.fragrances.url || "/placeholder.svg"}
                    alt={f.fragrances.name}
                    fill
                    className="rounded-md object-cover"
                  />
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{f.fragrances.name}</h3>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Added:</span>
                      <span>
                        {new Date(f.fragrances.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {f.fragrances.notes && (
                    <div className="bg-muted mt-3 rounded-md p-2">
                      <p className="text-sm italic">{f.fragrances.notes}</p>
                    </div>
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
          ))}
        </div>
      </div>
    </div>
  );
}
