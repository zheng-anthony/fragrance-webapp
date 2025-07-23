"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export function HomeButton() {
  const home = useRouter();

  const handleHome = () => {
    home.push("/");
    console.log("home");
  };

  return (
    <Button variant="ghost" className="text-sm" onClick={handleHome}>
      Home
    </Button>
  );
}
export function BrowseButton() {
  const browse = useRouter();

  const handleBrowse = () => {
    browse.push("/browse");
    console.log("browse");
  };

  return (
    <Button variant="ghost" className="text-sm" onClick={handleBrowse}>
      Browse
    </Button>
  );
}
export function CollectionsButton() {
  const collections = useRouter();

  const handleCollections = () => {
    collections.push("/collections");
    console.log("collections");
  };
  return (
    <Button variant="ghost" className="text-sm" onClick={handleCollections}>
      Collections
    </Button>
  );
}
