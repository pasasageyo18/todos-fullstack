import NextAuth from "next-auth/next";
import { nextauthOptions } from "@/lib/nextauthOptions";

const handler = NextAuth(nextauthOptions);

export { handler as GET, handler as POST };
