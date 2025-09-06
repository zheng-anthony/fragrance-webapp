import type React from "react";
import Link from "next/link";
import { ArrowLeft, Heart, Share2, Bookmark } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function FragranceLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-card border-b">
        <div className="mx-auto max-w-6xl px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/">
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Button>
              </Link>
              <div className="text-muted-foreground text-sm">
                <Link href="/" className="hover:text-foreground">
                  Home
                </Link>
                <span className="mx-2">/</span>
                <span>Fragrance</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-6xl px-4 py-6">{children}</div>
    </div>
  );
}
