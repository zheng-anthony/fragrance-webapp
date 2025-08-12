import type { NextRequest } from "next/server";
import NextAuth, { type NextAuthOptions, type DefaultSession } from "next-auth";
import { authOptions } from "~/server/auth";

const handler = NextAuth(authOptions) as (
  req: NextRequest,
) => Response | Promise<Response>;

export { handler as GET, handler as POST, authOptions };
