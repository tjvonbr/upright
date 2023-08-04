import { PrismaAdapter } from "@auth/prisma-adapter";
import { DefaultUser, NextAuthOptions } from "next-auth";
import { Adapter } from "next-auth/adapters";
import EmailProvider from "next-auth/providers/email";

import { db } from "./prisma";

export interface IUser extends DefaultUser {
  firstName?: string;
  lastName?: string;
}

declare module "next-auth" {
  interface User extends IUser {}
  // eslint-disable-next-line no-unused-vars
  interface Session {
    user?: User;
  }
}

declare module "next-auth/jwt" {
  // eslint-disable-next-line no-unused-vars
  interface JWT extends IUser {}
}

const THIRTY_DAYS = 60 * 60 * 24 * 30;
const THIRTY_MINUTES = 60 * 30;

export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(db) as Adapter,
  debug: true,
  pages: {
    signIn: "../../../login",
    verifyRequest: "../../../verify-request",
  },
  providers: [
    EmailProvider({
      server: {
        host: process.env.EMAIL_SERVER_HOST,
        port: Number(process.env.EMAIL_SERVER_PORT),
        auth: {
          user: process.env.EMAIL_SERVER_USER,
          pass: process.env.EMAIL_SERVER_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  secret: process.env.SECRET,
  session: {
    strategy: "jwt",
    maxAge: THIRTY_DAYS,
    updateAge: THIRTY_MINUTES,
  },
  callbacks: {
    async session({ session, token }) {
      if (session?.user) {
        session.user.id = token.id;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
  },
};
