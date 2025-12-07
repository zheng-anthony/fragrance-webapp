"use client";

import { useEffect, useState } from "react";
import { Search, ChevronDown, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Fragrance {
  id: string;
  name: string;
  brand: string;
  image: string;
  topNotes: string[];
  rating: number;
  likes: number;
}

const MOCK_FRAGRANCES: Fragrance[] = [
  {
    id: "1",
    name: "Oud Noir",
    brand: "Creed",
    image: "/dark-amber-fragrance-bottle.jpg",
    topNotes: ["Bergamot", "Lemon", "Woody"],
    rating: 4.8,
    likes: 342,
  },
  {
    id: "2",
    name: "Bleu de Chanel",
    brand: "Chanel",
    image: "/blue-fragrance-bottle-luxurious.jpg",
    topNotes: ["Grapefruit", "Lemon", "Fresh"],
    rating: 4.9,
    likes: 521,
  },
  {
    id: "3",
    name: "Sauvage",
    brand: "Dior",
    image: "/amber-spicy-fragrance-dior.jpg",
    topNotes: ["Ambroxan", "Spicy"],
    rating: 4.7,
    likes: 628,
  },
  {
    id: "4",
    name: "La Vie Est Belle",
    brand: "Lancôme",
    image: "/floral-fragrance-pink-bottle.jpg",
    topNotes: ["Iris", "Floral"],
    rating: 4.6,
    likes: 287,
  },
  {
    id: "5",
    name: "Aventus",
    brand: "Creed",
    image: "/fresh-citrus-fragrance-luxurious.jpg",
    topNotes: ["Pineapple", "Fresh"],
    rating: 4.8,
    likes: 445,
  },
  {
    id: "6",
    name: "Hypnotic Poison",
    brand: "Dior",
    image: "/dark-sensual-fragrance-bottle.jpg",
    topNotes: ["Licorice", "Sweet"],
    rating: 4.5,
    likes: 356,
  },
  {
    id: "7",
    name: "Chanel No. 5",
    brand: "Chanel",
    image: "/floral-fragrance-pink-bottle.jpg",
    topNotes: ["Neroli", "Floral"],
    rating: 4.9,
    likes: 789,
  },
  {
    id: "8",
    name: "Acqua di Parma",
    brand: "Parma",
    image: "/blue-fragrance-bottle-luxurious.jpg",
    topNotes: ["Lemon", "Fresh"],
    rating: 4.7,
    likes: 412,
  },
  {
    id: "9",
    name: "Tobacco Vanille",
    brand: "Tom Ford",
    image: "/dark-amber-fragrance-bottle.jpg",
    topNotes: ["Tobacco", "Sweet"],
    rating: 4.8,
    likes: 534,
  },
  {
    id: "10",
    name: "Givenchy Gentleman",
    brand: "Givenchy",
    image: "/amber-spicy-fragrance-dior.jpg",
    topNotes: ["Iris", "Spicy"],
    rating: 4.6,
    likes: 398,
  },
  {
    id: "11",
    name: "Prada L'Homme",
    brand: "Prada",
    image: "/fresh-citrus-fragrance-luxurious.jpg",
    topNotes: ["Iris", "Fresh"],
    rating: 4.7,
    likes: 467,
  },
  {
    id: "12",
    name: "Guerlain La Petite Robe Noire",
    brand: "Guerlain",
    image: "/dark-sensual-fragrance-bottle.jpg",
    topNotes: ["Cherry", "Floral"],
    rating: 4.8,
    likes: 623,
  },
  {
    id: "13",
    name: "Yves Saint Laurent La Nuit",
    brand: "YSL",
    image: "/dark-amber-fragrance-bottle.jpg",
    topNotes: ["Bergamot", "Oriental"],
    rating: 4.7,
    likes: 501,
  },
  {
    id: "14",
    name: "Narciso Rodriguez For Her",
    brand: "Narciso Rodriguez",
    image: "/floral-fragrance-pink-bottle.jpg",
    topNotes: ["Musk", "Floral"],
    rating: 4.8,
    likes: 612,
  },
  {
    id: "15",
    name: "Carolina Herrera Good Girl",
    brand: "Carolina Herrera",
    image: "/dark-sensual-fragrance-bottle.jpg",
    topNotes: ["Almond", "Sweet"],
    rating: 4.6,
    likes: 544,
  },
  {
    id: "16",
    name: "Versace Eros",
    brand: "Versace",
    image: "/blue-fragrance-bottle-luxurious.jpg",
    topNotes: ["Mint", "Fresh"],
    rating: 4.7,
    likes: 489,
  },
  {
    id: "17",
    name: "Coco Mademoiselle",
    brand: "Chanel",
    image: "/floral-fragrance-pink-bottle.jpg",
    topNotes: ["Orange", "Fruity"],
    rating: 4.9,
    likes: 756,
  },
  {
    id: "18",
    name: "Dior Sauvage Elixir",
    brand: "Dior",
    image: "/amber-spicy-fragrance-dior.jpg",
    topNotes: ["Pepper", "Spicy"],
    rating: 4.7,
    likes: 523,
  },
  {
    id: "19",
    name: "Tom Ford Black Orchid",
    brand: "Tom Ford",
    image: "/dark-sensual-fragrance-bottle.jpg",
    topNotes: ["Orchid", "Oriental"],
    rating: 4.8,
    likes: 678,
  },
  {
    id: "20",
    name: "Hermès Terre d'Hermès",
    brand: "Hermès",
    image: "/amber-spicy-fragrance-dior.jpg",
    topNotes: ["Grapefruit", "Citrus"],
    rating: 4.7,
    likes: 445,
  },
];

export default function BrowsePage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [fragrances, setFragrances] = useState<Fragrance[]>(MOCK_FRAGRANCES);
  const [likedIds, setLikedIds] = useState<Set<string>>(new Set());

  const noteOptions = [
    "Floral",
    "Woody",
    "Fresh",
    "Spicy",
    "Sweet",
    "Fruity",
    "Oriental",
    "Citrus",
  ];

  const toggleNote = (note: string) => {
    setSelectedNotes(
      selectedNotes.includes(note)
        ? selectedNotes.filter((n) => n !== note)
        : [...selectedNotes, note],
    );
  };

  useEffect(() => {
    let filtered = MOCK_FRAGRANCES;

    // Filter by search query
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (frag) =>
          frag.name.toLowerCase().includes(query) ||
          frag.brand.toLowerCase().includes(query) ||
          frag.topNotes.some((note) => note.toLowerCase().includes(query)),
      );
    }

    // Filter by selected note categories
    if (selectedNotes.length > 0) {
      filtered = filtered.filter((frag) =>
        selectedNotes.some((selectedNote) =>
          frag.topNotes.some((note) =>
            note.toLowerCase().includes(selectedNote.toLowerCase()),
          ),
        ),
      );
    }

    setFragrances(filtered);
  }, [searchQuery, selectedNotes]);

  const toggleLike = (id: string) => {
    const newLiked = new Set(likedIds);
    if (newLiked.has(id)) {
      newLiked.delete(id);
    } else {
      newLiked.add(id);
    }
    setLikedIds(newLiked);
  };

  return (
    <main className="bg-background min-h-screen">
      {/* Header with Search Bar and Filters */}
      <div className="bg-card border-border border-b">
        <div className="mx-auto max-w-7xl space-y-4 px-4 py-6">
          {/* Search Bar */}
          <div className="flex max-w-md items-center gap-3">
            <Search className="text-muted-foreground h-5 w-5 flex-shrink-0" />
            <Input
              placeholder="Search fragrances, brands, notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="border-input bg-background text-foreground placeholder-muted-foreground"
            />
          </div>

          <div className="relative inline-block">
            <Button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              variant="outline"
              className="gap-2"
            >
              Filters
              <ChevronDown className="h-4 w-4" />
            </Button>

            {isDropdownOpen && (
              <div className="bg-card border-border absolute top-full left-0 z-10 mt-2 min-w-48 rounded-lg border p-3 shadow-lg">
                <div className="space-y-2">
                  {noteOptions.map((note) => (
                    <label
                      key={note}
                      className="hover:bg-secondary/50 flex cursor-pointer items-center gap-2 rounded px-2 py-1"
                    >
                      <input
                        type="checkbox"
                        checked={selectedNotes.includes(note)}
                        onChange={() => toggleNote(note)}
                        className="h-4 w-4"
                      />
                      <span className="text-foreground text-sm">{note}</span>
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Display selected filters */}
          {selectedNotes.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {selectedNotes.map((note) => (
                <div
                  key={note}
                  className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-full px-3 py-1 text-sm font-medium"
                >
                  {note}
                  <button
                    onClick={() => toggleNote(note)}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Browse Content */}
      <div className="mx-auto max-w-7xl px-4 py-8">
        {fragrances.length === 0 ? (
          <div className="py-12 text-center">
            <p className="text-muted-foreground text-lg">
              No fragrances found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {fragrances.map((fragrance) => (
              <Card
                key={fragrance.id}
                className="flex h-full flex-col overflow-hidden transition-shadow hover:shadow-lg"
              >
                {/* Image Container */}
                <div className="bg-muted relative flex h-32 items-center justify-center overflow-hidden">
                  <img
                    src={fragrance.image || "/placeholder.svg"}
                    alt={fragrance.name}
                    className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col space-y-1.5 p-2">
                  <div>
                    <h3 className="text-foreground line-clamp-1 text-xs font-semibold">
                      {fragrance.name}
                    </h3>
                    <p className="text-muted-foreground line-clamp-1 text-xs">
                      {fragrance.brand}
                    </p>
                  </div>

                  {/* Notes */}
                  <div className="flex flex-wrap gap-0.5">
                    {fragrance.topNotes.slice(0, 1).map((note) => (
                      <span
                        key={note}
                        className="bg-secondary text-secondary-foreground rounded px-1 py-0.5 text-xs"
                      >
                        {note}
                      </span>
                    ))}
                  </div>

                  {/* Rating and Likes */}
                  <div className="border-border mt-auto flex items-center justify-between border-t pt-1">
                    <div className="flex items-center gap-0.5">
                      <span className="text-foreground text-xs font-semibold">
                        {fragrance.rating}
                      </span>
                      <span className="text-muted-foreground text-xs">★</span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleLike(fragrance.id)}
                      className="h-6 gap-0.5 px-1"
                    >
                      <Heart
                        className="h-3 w-3"
                        fill={
                          likedIds.has(fragrance.id) ? "currentColor" : "none"
                        }
                      />
                      <span className="text-xs">{fragrance.likes}</span>
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
