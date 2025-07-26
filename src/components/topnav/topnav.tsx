"use client";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";

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

export function ProfileButton() {
  const profile = useRouter();
  const { data: session } = useSession();

  const handleProfile = () => {
    profile.push("/profile");
  };
  if (session) {
    return (
      <>
        <Button variant="ghost" className="text-sm" onClick={handleProfile}>
          Anthony Zheng
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          onClick={handleProfile}
        >
          <Avatar className="h-8 w-8">
            <AvatarImage src="/placeholder-user.jpg" />
            <AvatarFallback>AZ</AvatarFallback>
          </Avatar>
        </Button>
        <Button variant="ghost" className="text-sm" onClick={() => signOut()}>
          Sign Out
        </Button>
      </>
    );
  }
  return (
    <Button
      variant="ghost"
      className="text-sm"
      onClick={() => signIn("google")}
    >
      Sign In
    </Button>
  );
}
