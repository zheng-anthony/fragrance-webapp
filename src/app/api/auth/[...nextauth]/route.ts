import type { NextRequest } from "next/server";
import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { db } from "@/server/db";
import { usersTable } from "@/server/db/schema";
import { eq } from "drizzle-orm";

const authOptions: NextAuthOptions = {
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
    //attaches db id
    async session({ session, token }): Promise<DefaultSession> {
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

const handler = NextAuth(authOptions) as (
  req: NextRequest,
) => Response | Promise<Response>;

export { handler as GET, handler as POST };
