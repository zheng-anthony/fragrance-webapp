"use client";
import { useRouter } from "next/navigation";
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
export function BrowseCollections() {
  const router = useRouter();

  const handleCollections = () => {
    router.push("/browseCollections");
  };
  return (
    <Button variant="ghost" className="text-sm" onClick={handleCollections}>
      Collections
    </Button>
  );
}
function SignOutButton() {
  const signout = useRouter();

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    signout.push("/");
  };
  return (
    <Button variant="ghost" className="text-sm" onClick={handleSignOut}>
      Sign Out
    </Button>
  );
}

export function ProfileButton() {
  const router = useRouter();
  const { data: session } = useSession();

  const handleProfile = () => {
    router.push(`/profile/${session?.user.id}`);
  };
  if (session) {
    return (
      <>
        <Button variant="ghost" className="text-sm" onClick={handleProfile}>
          {session?.user.name}
        </Button>
        <SignOutButton />
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
