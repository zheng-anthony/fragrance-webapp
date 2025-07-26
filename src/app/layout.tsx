import "@/styles/globals.css";
import { Geist } from "next/font/google";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Search } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SessionProvider } from "next-auth/react";

import {
  HomeButton,
  BrowseButton,
  CollectionsButton,
  ProfileButton,
} from "@/components/topnav/topnav";
import SessionWrapper from "~/components/sessionwrapper/sessionwrapper";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "ScentList - Fragrance Social Network",
  description: "Discover, review, and collect fragrances with the community",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <SessionWrapper>
          {/* Header */}
          <header className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  <h1 className="text-primary text-2xl font-bold">ScentList</h1>
                  <nav className="hidden items-center gap-6 md:flex">
                    <HomeButton />
                    <BrowseButton />
                    <CollectionsButton />
                  </nav>
                </div>
                <div className="flex items-center gap-4">
                  <div className="relative hidden sm:block">
                    <Search className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 transform" />
                    <Input
                      placeholder="Search fragrances..."
                      className="w-64 pl-10"
                    />
                  </div>
                  {}
                  <ProfileButton />
                </div>
              </div>
            </div>
          </header>
          {children}
        </SessionWrapper>
      </body>
    </html>
  );
}
