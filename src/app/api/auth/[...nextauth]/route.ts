import EmailProvider from "next-auth/providers/email";
import NextAuth from "next-auth";

const handler = NextAuth({
  providers: [
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
  ],
});

export { handler as GET, handler as POST };
