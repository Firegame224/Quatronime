import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";
import prisma from "@/libs/prisma";
import bcrypt from "bcryptjs";

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

export const authOptions: AuthOptions = {
  debug: true,
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    CredentialsProvider({
      name: "Custom Auth",
      credentials: {
        email: { label: "Email", type: "text", required: true },
        password: { label: "Password", type: "password", required: true },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email dan password wajib diisi.");
        }

        // Cari user di database
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) {
          throw new Error("User tidak ditemukan atau password salah.");
        }

        // Verifikasi password
        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.password
        );
        if (!isPasswordValid) {
          throw new Error("Password salah.");
        }

        return {
          id: user.id.toString(),
          email: user.email,
          name: user.name,
          image: user.image || "",
          role: user.role,
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signIn",
    signOut: "/",
  },
  secret: process.env.NEXTAUTH_SECRET,
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account }) {
      // Handle Google/Github login
      if (account?.provider === "google" || account?.provider === "github") {
        const email = user.email;
        if (!email) return false;

        // Cek apakah user sudah ada di database
        let existingUser = await prisma.user.findUnique({
          where: { email },
        });

        // Jika belum ada, buat user baru
        if (!existingUser) {
          existingUser = await prisma.user.create({
            data: {
              email,
              name: user.name || "Anonymous",
              image: user.image || "",
              role: "USER",
              password: null, // Karena login via OAuth
            },
          });
        }

        user.id = existingUser.id;
        user.role = existingUser.role;
        user.image = existingUser.image;
      }
      return true;
    },
    async jwt({ token, user, trigger ,session }) {
      if (trigger === "update") {
        return {
          ...token,
          ...session?.user,
        };
      }
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.image = user.image;
      }
      return token;
    },
    async session({ session, token }) {

      session.user = {
        id: token.id as string,
        email: token.email as string,
        name: token.name as string,
        image: token.image as string,
        role: token.role as string,
      };
      return session;
    },
  },
};

const Handler = NextAuth(authOptions);
export { Handler as GET, Handler as POST };
