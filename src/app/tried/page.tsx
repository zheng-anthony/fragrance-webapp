import {
  Star,
  Search,
  Plus,
  ShoppingCart,
  MessageCircle,
  MoreHorizontal,
} from "lucide-react";
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

export default function TriedPage() {
  const triedFragrances = [
    {
      name: "Acqua di Gio",
      brand: "Giorgio Armani",
      rating: 4.2,
      userRating: 3,
      image: "/placeholder.svg?height=200&width=150",
      dateTried: "2024-01-12",
      price: "$85",
      notes: "Fresh and clean, good for summer but not unique enough for me",
      category: "Designer",
      verdict: "Pass",
      location: "Sephora Store",
    },
    {
      name: "Terre d'Hermès",
      brand: "Hermès",
      rating: 4.3,
      userRating: 4,
      image: "/placeholder.svg?height=200&width=150",
      dateTried: "2024-01-08",
      price: "$110",
      notes: "Sophisticated and earthy. Really impressed with the longevity",
      category: "Designer",
      verdict: "Want to Buy",
      location: "Department Store",
    },
    {
      name: "Jazz Club",
      brand: "Maison Margiela",
      rating: 4.1,
      userRating: 5,
      image: "/placeholder.svg?height=200&width=150",
      dateTried: "2024-01-05",
      price: "$140",
      notes: "Amazing cozy scent! Perfect for fall and winter evenings",
      category: "Niche",
      verdict: "Must Buy",
      location: "Online Sample",
    },
    {
      name: "Paco Rabanne 1 Million",
      brand: "Paco Rabanne",
      rating: 4.0,
      userRating: 2,
      image: "/placeholder.svg?height=200&width=150",
      dateTried: "2024-01-03",
      price: "$75",
      notes: "Too sweet and cloying for my taste. Very synthetic smell",
      category: "Designer",
      verdict: "Pass",
      location: "Friend's Collection",
    },
    {
      name: "Oud Wood",
      brand: "Tom Ford",
      rating: 4.5,
      userRating: 4,
      image: "/placeholder.svg?height=200&width=150",
      dateTried: "2023-12-28",
      price: "$280",
      notes: "Luxurious and smooth. Expensive but worth considering",
      category: "Niche",
      verdict: "Maybe",
      location: "Nordstrom",
    },
  ];

  const getVerdictColor = (verdict: string) => {
    switch (verdict) {
      case "Must Buy":
        return "bg-green-100 text-green-800";
      case "Want to Buy":
        return "bg-blue-100 text-blue-800";
      case "Maybe":
        return "bg-yellow-100 text-yellow-800";
      case "Pass":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        {/* Header */}
        <div className="mb-6">
          <h1 className="mb-2 text-3xl font-bold">Tried Fragrances</h1>
          <p className="text-muted-foreground">
            {triedFragrances.length} fragrances tested
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
          {triedFragrances.map((fragrance, index) => (
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
                    className={`absolute top-2 right-2 ${getVerdictColor(fragrance.verdict)}`}
                  >
                    {fragrance.verdict}
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
                      <span className="text-muted-foreground">Tried at:</span>
                      <span>{fragrance.location}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Date:</span>
                      <span>
                        {new Date(fragrance.dateTried).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  {fragrance.notes && (
                    <div className="bg-muted mt-3 rounded-md p-2">
                      <p className="text-sm italic">"{fragrance.notes}"</p>
                    </div>
                  )}

                  <div className="mt-4 space-y-2">
                    {fragrance.verdict === "Must Buy" ||
                    fragrance.verdict === "Want to Buy" ? (
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
                    ) : (
                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          Write Review
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1 bg-transparent"
                        >
                          Edit Notes
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
                    )}
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
