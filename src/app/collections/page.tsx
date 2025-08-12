import {
  Plus,
  Users,
  Heart,
  Check,
  Eye,
  MoreHorizontal,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
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
import Link from "next/link";
import { db } from "@/server/db";
import { eq, sql } from "drizzle-orm";
import { userLists } from "~/server/db/schema";
import { collections } from "~/server/db/schema";
import CreateCollectionButton from "~/app/collections/create-collection/create-collection";
import { signIn, useSession } from "next-auth/react";

export default async function CollectionsPage() {
  // Custom collections
  const customCollections = [
    {
      id: "summer-favorites",
      name: "Summer Favorites",
      description: "Fresh and light fragrances perfect for hot weather",
      count: 12,
      privacy: "public",
      lastUpdated: "2024-01-15",
      followers: 45,
      tags: ["Summer", "Fresh", "Citrus"],
    },
    {
      id: "date-night",
      name: "Date Night Essentials",
      description: "Romantic and seductive fragrances for special occasions",
      count: 8,
      privacy: "public",
      lastUpdated: "2024-01-12",
      followers: 23,
      tags: ["Romantic", "Evening", "Seductive"],
    },
    {
      id: "office-appropriate",
      name: "Office Appropriate",
      description: "Professional and subtle scents for work",
      count: 15,
      privacy: "private",
      lastUpdated: "2024-01-10",
      followers: 0,
      tags: ["Professional", "Subtle", "Work"],
    },
  ];

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

        {/* Default Collections */}
        <div className="mb-8">
          <h2 className="mb-4 text-xl font-semibold">Default Collections</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {/* {defaultCollections.map((collection) => {
              const Icon = collection.icon;
              return (
                <Link key={collection.id} href={collection.href}>
                  <Card className="cursor-pointer transition-shadow hover:shadow-md">
                    <CardContent className="p-4">
                      <div className="mb-3 flex items-center gap-3">
                        <div className="bg-primary/10 rounded-lg p-2">
                          <Icon className="text-primary h-5 w-5" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold">{collection.name}</h3>
                          <p className="text-muted-foreground text-sm">
                            {collection.description}
                          </p>
                        </div>
                      </div>
                      <div className="text-muted-foreground flex items-center justify-between text-sm">
                        <span>{collection.count} items</span>
                        <span>
                          Updated{" "}
                          {new Date(
                            collection.lastUpdated,
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              );
            })} */}
          </div>
        </div>

        {/* Custom Collections */}
        <div>
          <h2 className="mb-4 text-xl font-semibold">Custom Collections</h2>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {customCollections.map((collection) => (
              <Card
                key={collection.id}
                className="cursor-pointer transition-shadow hover:shadow-md"
              >
                <CardContent className="p-4">
                  <div className="mb-3 flex items-start justify-between">
                    <div className="flex-1">
                      <div className="mb-1 flex items-center gap-2">
                        <h3 className="font-semibold">{collection.name}</h3>
                        <Badge
                          variant={
                            collection.privacy === "public"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {collection.privacy}
                        </Badge>
                      </div>
                      <p className="text-muted-foreground mb-2 text-sm">
                        {collection.description}
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

                  <div className="mb-3 flex flex-wrap gap-1">
                    {collection.tags.map((tag, index) => (
                      <Badge key={index} variant="outline" className="text-xs">
                        {tag}
                      </Badge>
                    ))}
                  </div>

                  <div className="text-muted-foreground flex items-center justify-between text-sm">
                    <span>{collection.count} items</span>
                    {collection.privacy === "public" && (
                      <div className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        <span>{collection.followers} followers</span>
                      </div>
                    )}
                  </div>
                  <div className="text-muted-foreground mt-1 text-xs">
                    Updated{" "}
                    {new Date(collection.lastUpdated).toLocaleDateString()}
                  </div>
                </CardContent>
              </Card>
            ))}
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
