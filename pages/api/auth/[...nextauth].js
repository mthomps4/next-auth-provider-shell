import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  session: {
    strategy: "jwt",
  },
  jwt: {
    maxAge: 24 * 60 * 60 * 7,
  },
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      console.log("JWT:", { token, account });
      if (account) {
        token.accessToken = account.access_token;
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token, user }) {
      console.log("SESSION", { session, token, user });
      // Send properties to the client, like an access_token from a provider.
      session.accessToken = token.accessToken;
      session.id_token = token.id_token;
      return session;
    },
  },
});
