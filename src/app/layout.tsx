import "@/styles/globals.css";
import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

import {
  HomeButton,
  BrowseButton,
  ProfileButton,
  BrowseCollections,
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
                  <h1 className="text-primary text-xl font-bold">ScentList</h1>
                  <nav className="hidden items-center gap-6 md:flex">
                    <HomeButton />
                    <BrowseButton />
                    <BrowseCollections/>
                  </nav>
                </div>
                <div className="flex items-center gap-4">
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
