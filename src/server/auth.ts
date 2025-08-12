import type { DefaultSession, NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { usersTable } from "./db/schema";
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

      const existingUser = await db.query.usersTable.findFirst({
        where: eq(usersTable.email, user.email),
      });

      if (!existingUser) {
        await db.insert(usersTable).values({
          name: user.name ?? "Unnamed",
          email: user.email,
        });
      }
      return true;
    },
    async session({ session }): Promise<DefaultSession> {
      if (session.user?.email) {
        const user = await db.query.usersTable.findFirst({
          where: eq(usersTable.email, session.user.email),
        });
        if (user) {
          session.user.id = user.id;
        }
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};
