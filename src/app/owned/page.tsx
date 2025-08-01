import { Star, Search, Grid, MoreHorizontal } from "lucide-react";
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
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function OwnedPage() {
  const ownedFragrances = [
    {
      name: "Bleu de Chanel",
      brand: "Chanel",
      rating: 4.3,
      userRating: 5,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-15",
      price: "$120",
      notes: "My signature scent. Perfect for office and dates.",
      category: "Designer",
      season: "All Season",
    },
    {
      name: "Sauvage",
      brand: "Dior",
      rating: 4.1,
      userRating: 4,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-10",
      price: "$95",
      notes: "Great performance, very versatile.",
      category: "Designer",
      season: "Spring/Summer",
    },
    {
      name: "Tom Ford Oud Wood",
      brand: "Tom Ford",
      rating: 4.5,
      userRating: 5,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2024-01-05",
      price: "$280",
      notes: "Luxurious and sophisticated. Special occasions only.",
      category: "Niche",
      season: "Fall/Winter",
    },
    {
      name: "Acqua di Gio",
      brand: "Giorgio Armani",
      rating: 4.2,
      userRating: 3,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2023-12-20",
      price: "$85",
      notes: "Fresh and clean, good for summer.",
      category: "Designer",
      season: "Spring/Summer",
    },
    {
      name: "Aventus",
      brand: "Creed",
      rating: 4.6,
      userRating: 5,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2023-12-15",
      price: "$350",
      notes: "The king of fragrances. Worth every penny.",
      category: "Niche",
      season: "All Season",
    },
    {
      name: "La Nuit de L'Homme",
      brand: "Yves Saint Laurent",
      rating: 4.4,
      userRating: 4,
      image: "/placeholder.svg?height=200&width=150",
      dateAdded: "2023-12-01",
      price: "$90",
      notes: "Perfect for evening wear and dates.",
      category: "Designer",
      season: "Fall/Winter",
    },
  ];

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">My Collection</h1>
          <p className="text-muted-foreground">
            {ownedFragrances.length} fragrances owned
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
          {ownedFragrances.map((fragrance, index) => (
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
                    <div className="flex items-center gap-1">
                      <span className="text-muted-foreground text-sm">
                        My rating:
                      </span>
                      <div className="flex">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Star
                            key={i}
                            className={`h-3 w-3 ${
                              i < fragrance.userRating
                                ? "fill-blue-400 text-blue-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="space-y-1 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Price:</span>
                      <span className="font-medium">{fragrance.price}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Category:</span>
                      <span>{fragrance.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Season:</span>
                      <span>{fragrance.season}</span>
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
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                    >
                      Review
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
                        <DropdownMenuItem className="text-blue-600">
                          Move to Wishlist
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-green-600">
                          Mark as Tried Again
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          Remove from Collection
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
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
