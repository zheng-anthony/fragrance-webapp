"use client";
import { Button } from "@/components/ui/button";
import { Bookmark, Plus } from "lucide-react";
import { useRouter } from "next/navigation";

export function Viewowned() {
  const owned = useRouter();

  const handleOwned = () => {
    owned.push("/owned");
  };
  return (
    <Button
      className="w-full justify-start bg-transparent"
      variant="outline"
      onClick={handleOwned}
    >
      <Bookmark className="mr-2 h-4 w-4" />
      View Owned
    </Button>
  );
}

export function Viewtried() {
  const tried = useRouter();

  const handleTried = () => {
    tried.push("/tried");
  };
  return (
    <Button
      className="w-full justify-start bg-transparent"
      variant="outline"
      onClick={handleTried}
    >
      <Bookmark className="mr-2 h-4 w-4" />
      View Tried
    </Button>
  );
}

export function Viewwishlist() {
  const wishlist = useRouter();

  const handleWishlist = () => {
    wishlist.push("wishlist");
  };

  return (
    <Button
      className="w-full justify-start bg-transparent"
      variant="outline"
      onClick={handleWishlist}
    >
      <Bookmark className="mr-2 h-4 w-4" />
      View Wishlist
    </Button>
  );
}

export function Addcollection() {
  const collection = useRouter();

  const handleAdd = () => {
    collection.push("/add-to-collection");
  };
  return (
    <Button
      className="w-full justify-start bg-transparent"
      variant="outline"
      onClick={handleAdd}
    >
      <Plus className="mr-2 h-4 w-4" />
      Add to Collection
    </Button>
  );
}
