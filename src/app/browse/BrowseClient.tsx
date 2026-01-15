"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import { Search, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  getFragrancesPage,
  type FragrancePage,
} from "@/actions/get-fragrances";
import { CatalogCard } from "~/components/cologne-card/cologne-cards";
import type { fragranceType } from "~/server/db/schema";

type Props = {
  initialData: FragrancePage;
};

export default function BrowseClient({ initialData }: Props) {
  // all loaded fragrances (so far)
  const [allFragrances, setAllFragrances] = useState<fragranceType[]>(
    initialData.items,
  );

  // what is actually rendered
  const [fragrances, setFragrances] = useState<fragranceType[]>(
    initialData.items,
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
      filtered = filtered.filter((frag) =>
        frag.name.toLowerCase().includes(query),
      );
    }

    setFragrances(filtered);
  }, [searchQuery, allFragrances]);

  const loadNextPage = () => {
    if (!hasMore || isPending) return;

    startTransition(async () => {
      const next = await getFragrancesPage(page + 1);

      setAllFragrances((prev) => [...prev, ...next.items]);
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
                      <span className="text-foreground text-base font-medium">{note}</span>
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
                  className="bg-secondary text-secondary-foreground flex items-center gap-2 rounded-full px-3 py-1 text-base font-medium"
                >
                  {note}
                  <button
                    onClick={() => toggleNote(note)}
                    className="text-secondary-foreground/70 hover:text-secondary-foreground text-base font-bold"
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
            <p className="text-muted-foreground text-base font-medium">
              No fragrances found matching your search.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {fragrances.map((fragrance) => (
              <CatalogCard key={fragrance.id} fragrance={fragrance} />
            ))}
          </div>
        )}
      </div>

      {/* sentinel for infinite scroll */}
      <div
        ref={sentinelRef}
        className="text-muted-foreground mt-4 flex h-10 items-center justify-center text-base font-medium"
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
