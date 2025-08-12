import NextAuth from "next-auth";
import { authOptions } from "~/server/auth";

const handler = NextAuth(authOptions) as (req: Request) => Promise<Response>;
export { handler as GET, handler as POST };
