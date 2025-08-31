"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Check, Heart, Eye } from "lucide-react"
import { cn } from "@/lib/utils"

export function CollectionNav() {
  const pathname = usePathname()

  const navItems = [
    {
      href: "/owned",
      label: "Owned",
      icon: Check,
      description: "Fragrances you own",
    },
    {
      href: "/wishlist",
      label: "Wishlist",
      icon: Heart,
      description: "Want to try",
    },
    {
      href: "/tried",
      label: "Tried",
      icon: Eye,
      description: "Tested fragrances",
    },
  ]

  return (
    <div className="w-64 bg-card border-r border-border h-full">
      <div className="p-6">
        <h2 className="text-lg font-semibold mb-6">My Collections</h2>
        <nav className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = pathname === item.href

            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-colors",
                  isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
                )}
              >
                <Icon className="h-5 w-5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span>{item.label}</span>
                    <span
                      className={cn(
                        "ml-2 rounded-full px-2 py-0.5 text-xs font-medium",
                        isActive
                          ? "bg-primary-foreground/20 text-primary-foreground"
                          : "bg-muted text-muted-foreground",
                      )}
                    >
                    </span>
                  </div>
                  <p
                    className={cn(
                      "text-xs mt-0.5",
                      isActive ? "text-primary-foreground/70" : "text-muted-foreground/70",
                    )}
                  >
                    {item.description}
                  </p>
                </div>
              </Link>
            )
          })}
        </nav>
      </div>
    </div>
  )
}
