import { Star, Search, Heart, ShoppingCart, Plus } from "lucide-react";
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

export default function WishlistPage() {
  const wishlistFragrances = [
    {
      name: "Aventus",
      brand: "Creed",
      rating: 4.6,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-20",
      price: "$350",
      priority: "High",
      notes: "Want to try this legendary fragrance",
      category: "Niche",
      availability: "In Stock",
    },
    {
      name: "La Nuit de L'Homme",
      brand: "Yves Saint Laurent",
      rating: 4.4,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-18",
      price: "$90",
      priority: "Medium",
      notes: "Perfect for date nights",
      category: "Designer",
      availability: "In Stock",
    },
    {
      name: "Terre d'Hermès",
      brand: "Hermès",
      rating: 4.3,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-15",
      price: "$110",
      priority: "Low",
      notes: "Heard great things about this one",
      category: "Designer",
      availability: "Limited",
    },
    {
      name: "By the Fireplace",
      brand: "Maison Margiela",
      rating: 4.2,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-12",
      price: "$140",
      priority: "High",
      notes: "Perfect for winter evenings",
      category: "Niche",
      availability: "In Stock",
    },
    {
      name: "Paco Rabanne 1 Million",
      brand: "Paco Rabanne",
      rating: 4.0,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-10",
      price: "$75",
      priority: "Low",
      notes: "Curious about this popular scent",
      category: "Designer",
      availability: "In Stock",
    },
  ];

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
          <p className="text-muted-foreground">
            {wishlistFragrances.length} fragrances to try
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
                    placeholder="Search your wishlist..."
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select>
                  <SelectTrigger className="w-[140px]">
                    <SelectValue placeholder="Priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Priorities</SelectItem>
                    <SelectItem value="high">High Priority</SelectItem>
                    <SelectItem value="medium">Medium Priority</SelectItem>
                    <SelectItem value="low">Low Priority</SelectItem>
                  </SelectContent>
                </Select>
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
          {wishlistFragrances.map((fragrance, index) => (
            <Card
              key={index}
              className="cursor-pointer transition-shadow hover:shadow-lg"
            >
              <CardContent className="p-4">
                <div className="relative mb-4 aspect-[3/4]">
                  <Image
                    src={fragrance.image || "/placeholder.svg"}
                    alt={fragrance.name}
                    fill
                    className="rounded-md object-cover"
                  />
                  <Badge
                    className={`absolute top-2 right-2 ${getPriorityColor(fragrance.priority)}`}
                  >
                    {fragrance.priority}
                  </Badge>
                </div>

                <div className="space-y-2">
                  <h3 className="text-lg font-semibold">{fragrance.name}</h3>
                  <p className="text-muted-foreground">{fragrance.brand}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">
                        {fragrance.rating}
                      </span>
                    </div>
                    <span className="text-lg font-semibold">
                      {fragrance.price}
                    </span>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{fragrance.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Availability:
                      </span>
                      <span
                        className={
                          fragrance.availability === "In Stock"
                            ? "text-green-600"
                            : "text-orange-600"
                        }
                      >
                        {fragrance.availability}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Added:</span>
                      <span>
                        {new Date(fragrance.dateAdded).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {fragrance.notes && (
                    <div className="bg-muted mt-3 rounded-md p-2">
                      <p className="text-sm italic">"{fragrance.notes}"</p>
                    </div>
                  )}

                  <div className="mt-4 flex gap-2">
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
                  </div>

                  <Button
                    size="sm"
                    variant="ghost"
                    className="w-full text-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Heart className="mr-1 h-4 w-4" />
                    Remove from Wishlist
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}
