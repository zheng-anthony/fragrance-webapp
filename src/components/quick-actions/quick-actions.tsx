"use client";
import { Button } from "@/components/ui/button";
import { Bookmark, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";

export function Viewowned() {
  const owned = useRouter();

  const { data: session } = useSession();

  const handleOwned = async () => {
    if (!session?.user.id) {
      if (!session?.user.id) {
        await signIn();
        return;
      }
    }
    owned.push("/Owned");
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

  const { data: session } = useSession();
  const handleTried = async () => {
    if (!session?.user.id) {
      await signIn();
      return;
    }
    tried.push("/Tried");
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

  const { data: session } = useSession();

  const handleWishlist = async () => {
    if (!session?.user.id) {
      await signIn();
      return;
    }
    wishlist.push("Wishlist");
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

export function UserCollections() {
  const router = useRouter();

  const handleCollections = () => {
    router.push("/userCollections");
  };
  return (
    <Button
      className="w-full justify-start bg-transparent"
      variant="outline"
      onClick={handleCollections}
    >
      <Plus className="mr-2 h-4 w-4" />
      My Collections
    </Button>
  );
}
