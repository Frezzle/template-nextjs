import NextAuth, { NextAuthOptions } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';
import GithubProvider from 'next-auth/providers/github';
import EmailProvider from 'next-auth/providers/email';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// For more information on each option (and a full list of options) go to
// https://next-auth.js.org/configuration/options
export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  // https://next-auth.js.org/configuration/providers/oauth
  providers: [
    // For passwordless sign-in via email.
    // Requires nodemailer dependency.
    // https://next-auth.js.org/providers/email
    EmailProvider({
      server: process.env.EMAIL_SERVER,
      from: process.env.EMAIL_FROM,
    }),
    // FYI: Google OAuth supports multiple callback URLs,
    // so one google app can be set up for multiple environments,
    // each with their own callback URL.
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // FYI: GitHub does not supports multiple callback URLs.
    // You must set up one github app per environment/callback-URL.
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  theme: {
    logo: 'https://cdn.logo.com/hotlink-ok/logo-social.png',
    // colorScheme: "dark",
  },
  // https://next-auth.js.org/configuration/options#callbacks
  callbacks: {
    async jwt({ token }) {
      token.userRole = 'admin';
      return token;
    },
  },
  // https://next-auth.js.org/configuration/options#session
  session: {
    // Strategy for storing the user's session.
    // Use JWT for all login providers, otherwise it'll default to `database`
    // (since I have one configured for passwordless login),
    // which seems to not provide a JWT for email (passwordless) login;
    // I'd prefer more consistency (having the JWT available always),
    // so have all sessions as JWTs (not stored in DB I guess?).
    strategy: 'jwt',
  },
};

export default NextAuth(authOptions);
