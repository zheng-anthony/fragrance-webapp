import { db } from "../server/db";
export const dynamic = "force-dynamic";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CatalogCard } from "~/components/cologne-card/cologne-cards";
import {
  UserCollections,
  Viewowned,
  Viewtried,
  Viewwishlist,
} from "@/components/quick-actions/quick-actions";
import { collections, collectionsItems } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from "~/server/auth";

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  const fragrances = await db.query.fragrances.findMany();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <Sidebar session={session} />
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Most Popular Section */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Most Popular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
                  {fragrances.slice(0, 10).map((f) => (
                    <CatalogCard key={f.id} fragrance={f} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

async function Sidebar({ session }: { session: Session | null }) {
  let owned: unknown[] = [];
  let tried: unknown[] = [];
  let wishlist: unknown[] = [];

  if (session) {
    wishlist = await db
      .select()
      .from(collectionsItems)
      .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
      .where(
        and(
          eq(collections.name, "Wishlist"),
          eq(collections.userId, session.user.id),
        ),
      );

    owned = await db
      .select()
      .from(collectionsItems)
      .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
      .where(
        and(
          eq(collections.name, "Owned"),
          eq(collections.userId, session.user.id),
        ),
      );

    tried = await db
      .select()
      .from(collectionsItems)
      .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
      .where(
        and(
          eq(collections.name, "Tried"),
          eq(collections.userId, session.user.id),
        ),
      );
  }

  return (
    <div className="lg:col-span-1">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-xl font-bold">My Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {session ? (
            <>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-base font-medium">Owned</span>
                <span className="text-base font-bold">{owned.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-base font-medium">Tried</span>
                <span className="text-base font-bold">{tried.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground text-base font-medium">Wishlist</span>
                <span className="text-base font-bold">{wishlist.length}</span>
              </div>
            </>
          ) : (
            <p className="text-muted-foreground text-base font-medium text-center py-4">
              Sign in to access
            </p>
          )}
        </CardContent>
      </Card>
      {/* quick action sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Viewowned />
          <Viewtried />
          <Viewwishlist />
          <UserCollections />
        </CardContent>
      </Card>
    </div>
  );
}
