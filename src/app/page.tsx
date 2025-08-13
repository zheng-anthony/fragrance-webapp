import { db } from "../server/db";
export const dynamic = "force-dynamic";
import { TrendingUp } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CatalogCard } from "~/components/cologne-card/cologne-cards";
import {
  Addcollection,
  Viewowned,
  Viewtried,
  Viewwishlist,
} from "@/components/quick-actions/quick-actions";
import { collections, collectionsItems } from "@/server/db/schema";
import { eq, and } from "drizzle-orm";
import { getServerSession, type Session } from "next-auth";
import { authOptions } from "~/server/auth";

async function Sidebar({ session }: { session: Session }) {
  const wishlist = await db
    .select()
    .from(collectionsItems)
    .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
    .where(
      and(
        eq(collections.name, "wishlist"),
        eq(collections.userId, session.user.id),
      ),
    );

  const owned = await db
    .select()
    .from(collectionsItems)
    .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
    .where(
      and(
        eq(collections.name, "owned"),
        eq(collections.userId, session.user.id),
      ),
    );

  const tried = await db
    .select()
    .from(collectionsItems)
    .innerJoin(collections, eq(collectionsItems.collectionsId, collections.id))
    .where(
      and(
        eq(collections.name, "tried"),
        eq(collections.userId, session.user.id),
      ),
    );
  return (
    <div className="lg:col-span-1">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-lg">My Stats</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Owned</span>
            <span className="font-semibold">{owned.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Tried</span>
            <span className="font-semibold">{tried.length}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground text-sm">Wishlist</span>
            <span className="font-semibold">{wishlist.length}</span>
          </div>
        </CardContent>
      </Card>
      {/* quick action sidebar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <Viewowned />
          <Viewtried />
          <Viewwishlist />
          <Addcollection />
        </CardContent>
      </Card>
    </div>
  );
}

export default async function Homepage() {
  const session = await getServerSession(authOptions);

  const fragrances = await db.query.fragrances.findMany();

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {session && <Sidebar session={session} />}
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
                  {fragrances.map((f) => (
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
