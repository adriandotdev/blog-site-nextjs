import NextAuth from "next-auth";
import type { Provider } from "next-auth/providers";
import Credentials from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

const providers: Provider[] = [
	Credentials({
		credentials: { password: { label: "Password", type: "password" } },
		authorize(c) {
			if (c.password !== "password") return null;
			return {
				id: "test",
				name: "Test User",
				email: "test@example.com",
			};
		},
	}),
	Google({
		clientId: process.env.GOOGLE_CLIENT_ID!,
		clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
	}),
];

export const providerMap = providers
	.map((provider) => {
		if (typeof provider === "function") {
			const providerData = provider();

			return { id: providerData.id, name: providerData.name };
		} else {
			return { id: provider.id, name: provider.name };
		}
	})
	.filter((provider) => provider.id !== "credentials");

export const { handlers, signIn, signOut, auth } = NextAuth({
	// adapter: DrizzleAdapter(db, {
	// 	usersTable: users,
	// 	accountsTable: accounts,
	// 	sessionsTable: sessions,
	// 	verificationTokensTable: verificationTokens,
	// }),
	providers,
});
