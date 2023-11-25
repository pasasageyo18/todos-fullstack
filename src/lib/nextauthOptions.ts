import CredentialsProvider from "next-auth/providers/credentials";
import { compare } from "bcrypt-ts";
import clientPromise from "./mongodb";
import { AuthOptions } from "next-auth";
import { MongoDBAdapter } from "@auth/mongodb-adapter";

export const nextauthOptions: AuthOptions = {
  adapter: MongoDBAdapter(clientPromise),
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {
          label: "E-mail",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        const client = await clientPromise;
        const email = credentials?.email.toLowerCase();
        const usersCollection = client
          .db(process.env.DB_NAME)
          .collection("users");
        const user = await usersCollection.findOne({ email });
        if (!user) {
          throw new Error("User does not exist.");
        }

        const passwordIsValid = await compare(
          credentials?.password!,
          user.password
        );

        if (!passwordIsValid) {
          throw new Error("Invalid credentials");
        }

        return {
          id: user._id.toString(),
          name: user.username,
          ...user,
        };
      },
    }),
  ],
  session: {
    strategy: "jwt",
    maxAge: 60 * 60,
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        const u = user as unknown as any;
        return {
          name: u.username,
          ...token,
          id: u.id,
        };
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
        },
      };
    },
  },
};
