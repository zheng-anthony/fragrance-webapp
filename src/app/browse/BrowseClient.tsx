"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Search, ChevronDown, Heart } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  getFragrancesPage,
  type FragrancePage,
} from "@/actions/get-fragrances";

interface Fragrance {
  id: string;
  name: string;
  brand: string;
  image: string;
}

type Props = {
  initialData: FragrancePage;
};

// helper function mapping Db info to UI info
function mapDbToUi(rows: FragrancePage["items"]): Fragrance[] {
  return rows.map((row) => ({
    id: row.id.toString(),
    name: row.name,
    brand: "Unknown",
    image: row.imageURL || "/test_image.jpg",
  }));
}

export default function BrowseClient({ initialData }: Props) {
  // all loaded fragrances (so far)
  const [allFragrances, setAllFragrances] = useState<Fragrance[]>(() =>
    mapDbToUi(initialData.items),
  );

  // what is actually rendered
  const [fragrances, setFragrances] = useState<Fragrance[]>(() =>
    mapDbToUi(initialData.items),
  );

  // paging
  const [page, setPage] = useState(initialData.page);
  const [totalPages] = useState(initialData.totalPages);

  // for React 18 concurrent "loading" state
  const [isPending, startTransition] = useTransition();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [selectedNotes, setSelectedNotes] = useState<string[]>([]);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const hasMore = page < totalPages;

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
    let filtered = allFragrances;

    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(
        (frag) =>
          frag.name.toLowerCase().includes(query) ||
          frag.brand.toLowerCase().includes(query),
      );
    }

    setFragrances(filtered);
  }, [searchQuery, allFragrances]);

  const loadNextPage = () => {
    if (!hasMore || isPending) return;

    startTransition(async () => {
      const next = await getFragrancesPage(page + 1);
      const mapped = mapDbToUi(next.items);

      setAllFragrances((prev) => [...prev, ...mapped]);
      setPage(next.page);
      // search filter will re-run because allFragrances changed
    });
  };

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;
        if (entry.isIntersecting) {
          loadNextPage();
        }
      },
      {
        root: null,
        rootMargin: "200px", // start loading a bit before actual bottom
        threshold: 0.1,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, isPending, page]); // deps

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
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* 👇 sentinel for infinite scroll */}
      <div
        ref={sentinelRef}
        className="text-muted-foreground mt-4 flex h-10 items-center justify-center text-xs"
      >
        {isPending
          ? "Loading more..."
          : !hasMore
            ? "You’ve reached the end."
            : ""}
      </div>
    </main>
  );
}
