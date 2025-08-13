import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { collections, users } from "./db/schema";
import { eq } from "drizzle-orm";
import { db } from "./db";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }): Promise<boolean> {
      if (!user.email) return false;
      const email = user.email as string;

      // 1) find or create user
      const existingUser = await db.query.users.findFirst({
        where: eq(users.email, email),
      });

      let userId: number;
      if (!existingUser) {
        const [created] = await db
          .insert(users)
          .values({
            name: user.name ?? "Unnamed",
            email,
          })
          .returning({ id: users.id });

        if (!created) throw new Error("user insert failed");
        userId = created.id;
      } else {
        userId = existingUser.id;
      }
      await db
        .insert(collections)
        .values([
          {
            userId,
            name: "Wishlist",
            privacy: "public",
            description: "Stuff I want",
          },
          {
            userId,
            name: "Owned",
            privacy: "public",
            description: "Stuff I own",
          },
          {
            userId,
            name: "Tried",
            privacy: "public",
            description: "Stuff I’ve tried",
          },
        ])
        .onConflictDoNothing({
          target: [collections.userId, collections.name],
        });

      return true;
    },

    async session({ session }): Promise<DefaultSession> {
      if (session.user?.email) {
        const email = session.user.email as string;
        const userRow = await db.query.users.findFirst({
          where: eq(users.email, email),
        });
        if (userRow) {
          session.user.id = userRow.id;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
