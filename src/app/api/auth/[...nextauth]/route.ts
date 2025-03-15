import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";
import { PrismaAdapter } from "@next-auth/prisma-adapter";

// Extend NextAuth types
declare module "next-auth" {
  interface User {
    id: string;
    image: string;
    role: string;
  }
  interface Session {
    user: User;
  }
  interface JWT {
    id: string;
    image: string;
    role: string;
  }
}

// Validate environment variables

export const authOptions: AuthOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_ID!,
      clientSecret: process.env.GOOGLE_SECRET!,
    }),
    CredentialsProvider({
      name: "Custom Auth",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          return null;
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(credentials.password, user.password);
        if (!isPasswordValid) {
          return null;
        }

        return {
          id: user.id.toString(), // User.id dijadikan string
          email: user.email, // email dari database
          name: user.name, // name dari database
          image: user.image || "", // image dari database
          role: user.role, // role dari database
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    signOut: "/auth/signOut",
  },
  secret: process.env.NEXTAUTH_SECRET,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {

      const email = user.email?.trim();

      if (!email) {
        throw new Error("Email is required");
      }
      if (account?.provider === "google" || account?.provider === "github") {
        
        const existingUser = await prisma.user.findUnique({
          where: { email},
        });

        if (!existingUser) {
          await prisma.user.create({
            data: {
              email,
              name: user.name,
              image: user.image || "",
              role: "USER",
              password : null
            },
          });
        }
      }
      return true;
    },
    async jwt({ user, token }) {
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        image: (token.picture as string) || "",
        role: token.role as string,
      };
      return session;
    },
  },
};

const Handler = NextAuth(authOptions);

export { Handler as GET, Handler as POST };
