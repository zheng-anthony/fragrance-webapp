"use client";
import Link from "next/link";
import { db } from "../server/db";
export const dynamic = "force-dynamic";
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

export default async function Homepage() {
  const images = await db.query.images.findMany();

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
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Trending This Week
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {[...images].map((image) => (
                    <div key={image.id} className="w-48">
                      <img src={image.url} />
                    </div>
                  ))}
                  {/* {[...images, ...images, ...images].map((images) => (
                    <Card
                      key={images.id}
                      className="cursor-pointer transition-shadow hover:shadow-md"
                    >
                      <CardContent className="p-3">
                        <div className="relative mb-2 aspect-[3/4]">
                          <Image
                            src={images.url || "/placeholder.svg"}
                            alt={images.name}
                            className="rounded-md object-cover"
                          />
                        </div>
                        <div className="flex items-center justify-between"></div>
                      </CardContent>
                    </Card>
                  ))} */}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
