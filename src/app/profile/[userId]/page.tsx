import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { db } from "~/server/db";
import { users } from "~/server/db/schema";
import { eq, and } from "drizzle-orm";

export default async function UserProfile({
  params,
}: {
  params: Promise<{ userId: string }>;
}) {
  const { userId } = await params;
  const userIdNum = Number(userId);

  const user = await db.query.users.findFirst({
    where: eq(users.id, userIdNum),
  });

  if (!user) {
    return (
      <div className="bg-background min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-xl font-bold mb-2">User not found</h1>
          <p className="text-base font-medium text-muted-foreground">
            The user you're looking for doesn't exist.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-background min-h-screen">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Profile Header */}
        <Card className="from-primary/5 to-accent/5 border-primary/20 mb-8 bg-gradient-to-r">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
              <div className="flex-1 text-center md:text-left">
                <h1 className="text-foreground mb-2 font-sans text-xl font-bold">{user.name}</h1>
                <p className="text-muted-foreground mb-4 text-base font-medium">
                  Fragrance Enthusiast & Collector
                </p>
                <div className="mb-4 flex flex-wrap justify-center gap-2 md:justify-start">
                  <Badge variant="outline">125 Fragrances</Badge>
                </div>
                <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                  Edit Profile
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Left Column */}
          <div className="space-y-6 lg:col-span-1">
            {/* Personal Details */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground font-sans text-xl font-bold">
                  Personal Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground text-base font-medium">Email</p>
                  <p className="text-base font-bold">{user.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-base font-medium">Location</p>
                  <p className="text-base font-bold">{user.location || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-base font-medium">Member Since</p>
                  <p className="text-base font-bold">
                    {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : "Unknown"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground text-base font-medium">
                    Favorite Season
                  </p>
                  <p className="text-base font-bold">Spring</p>
                </div>
              </CardContent>
            </Card>

            {/* Fragrance Preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground font-sans text-xl font-bold">
                  Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-muted-foreground mb-2 text-base font-medium">
                    Favorite Notes
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="border-accent/30">
                      Rose
                    </Badge>
                    <Badge variant="outline" className="border-accent/30">
                      Sandalwood
                    </Badge>
                    <Badge variant="outline" className="border-accent/30">
                      Bergamot
                    </Badge>
                    <Badge variant="outline" className="border-accent/30">
                      Vanilla
                    </Badge>
                  </div>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2 text-base font-medium">
                    Preferred Intensity
                  </p>
                  <Badge className="bg-accent/10 text-accent">Moderate</Badge>
                </div>
                <div>
                  <p className="text-muted-foreground mb-2 text-base font-medium">Occasion</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">Evening</Badge>
                    <Badge variant="outline">Special Events</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-6 lg:col-span-2">
            {/* Fragrance Collection */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground font-sans text-xl font-bold">
                  My Collection
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Button
                  variant="outline"
                  className="border-primary/30 text-primary hover:bg-primary/5 mt-6 w-full bg-transparent"
                >
                  View Full Collection
                </Button>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-foreground font-sans text-xl font-bold">
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                </div>
                <Button
                  variant="outline"
                  className="mt-6 w-full bg-transparent"
                >
                  View All Activity
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
