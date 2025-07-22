"use client";
import { useState } from "react";
import {
  Star,
  Heart,
  MessageCircle,
  TrendingUp,
  Users,
  Bookmark,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";

export default function FragranceApp() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const trendingFragrances = [
    {
      name: "Bleu de Chanel",
      brand: "Chanel",
      rating: 4.3,
      reviews: 1247,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "Sauvage",
      brand: "Dior",
      rating: 4.1,
      reviews: 2156,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "Aventus",
      brand: "Creed",
      rating: 4.6,
      reviews: 892,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "Tom Ford Oud Wood",
      brand: "Tom Ford",
      rating: 4.5,
      reviews: 756,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "Acqua di Gio",
      brand: "Giorgio Armani",
      rating: 4.2,
      reviews: 1834,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "La Nuit de L'Homme",
      brand: "Yves Saint Laurent",
      rating: 4.4,
      reviews: 923,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "Terre d'Hermès",
      brand: "Hermès",
      rating: 4.3,
      reviews: 645,
      image: "/placeholder.svg?height=200&width=150",
    },
    {
      name: "Paco Rabanne 1 Million",
      brand: "Paco Rabanne",
      rating: 4.0,
      reviews: 1456,
      image: "/placeholder.svg?height=200&width=150",
    },
  ];

  const itemsPerSlide = 5;
  const maxSlides = Math.ceil(trendingFragrances.length / itemsPerSlide);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % maxSlides);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + maxSlides) % maxSlides);
  };

  const getCurrentItems = () => {
    const startIndex = currentSlide * itemsPerSlide;
    return trendingFragrances.slice(startIndex, startIndex + itemsPerSlide);
  };

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg">My Stats</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Owned</span>
                  <span className="font-semibold">placeholder#</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">Tried</span>
                  <span className="font-semibold">placeholder#</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground text-sm">
                    Wishlist
                  </span>
                  <span className="font-semibold">placeholder#</span>
                </div>
              </CardContent>
            </Card>
            {/* quick action sidebar */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  View Owned
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  View Tried
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Bookmark className="mr-2 h-4 w-4" />
                  View Wishlist
                </Button>
                <Button
                  className="w-full justify-start bg-transparent"
                  variant="outline"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Add to Collection
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Most Popular Section */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <TrendingUp className="h-5 w-5" />
                    Most Popular
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={prevSlide}
                      disabled={currentSlide === 0}
                      className="h-8 w-8 bg-transparent p-0"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <span className="text-muted-foreground text-sm">
                      {currentSlide + 1} / {maxSlides}
                    </span>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={nextSlide}
                      disabled={currentSlide === maxSlides - 1}
                      className="h-8 w-8 bg-transparent p-0"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="relative overflow-hidden">
                  <div
                    className="flex transition-transform duration-300 ease-in-out"
                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                  >
                    {Array.from({ length: maxSlides }).map((_, slideIndex) => (
                      <div key={slideIndex} className="w-full flex-shrink-0">
                        <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                          {trendingFragrances
                            .slice(
                              slideIndex * itemsPerSlide,
                              (slideIndex + 1) * itemsPerSlide,
                            )
                            .map((fragrance, index) => (
                              <Card
                                key={`${slideIndex}-${index}`}
                                className="cursor-pointer transition-shadow hover:shadow-md"
                              >
                                <CardContent className="p-3">
                                  <div className="relative mb-2 aspect-[3/4]">
                                    <Image
                                      src={
                                        fragrance.image || "/placeholder.svg"
                                      }
                                      alt={fragrance.name}
                                      fill
                                      className="rounded-md object-cover"
                                    />
                                  </div>
                                  <h3 className="mb-1 truncate text-xs font-semibold">
                                    {fragrance.name}
                                  </h3>
                                  <p className="text-muted-foreground mb-1 truncate text-xs">
                                    {fragrance.brand}
                                  </p>
                                  <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-1">
                                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                                      <span className="text-xs font-medium">
                                        {fragrance.rating}
                                      </span>
                                    </div>
                                    <span className="text-muted-foreground text-xs">
                                      {fragrance.reviews}
                                    </span>
                                  </div>
                                </CardContent>
                              </Card>
                            ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Slide Indicators */}
                <div className="mt-4 flex justify-center gap-2">
                  {Array.from({ length: maxSlides }).map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 w-2 rounded-full transition-colors ${
                        index === currentSlide ? "bg-primary" : "bg-muted"
                      }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
