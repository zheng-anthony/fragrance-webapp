"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Check, Heart, Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export function CollectionNav() {
  const pathname = usePathname();

  const navItems = [
    {
      href: "/Owned",
      label: "Owned",
      icon: Check,
      description: "Fragrances you own",
    },
    {
      href: "/Wishlist",
      label: "Wishlist",
      icon: Heart,
      description: "Want to try",
    },
    {
      href: "/Tried",
      label: "Tried",
      icon: Eye,
      description: "Tested fragrances",
    },
  ];

  return (
    <div className="bg-card border-border h-full w-64 border-r">
      <div className="p-6">
        <h2 className="mb-6 text-xl font-bold">My Collections</h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-3 text-base font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "ml-2 rounded-full px-2 py-0.5 text-base font-medium",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    ></span>
                  </div>
                  <p
                    className={cn(
                      "mt-0.5 text-base font-medium",
                      isActive
                        ? "text-primary-foreground/70"
                        : "text-muted-foreground/70",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>
    </div>
  );
}
