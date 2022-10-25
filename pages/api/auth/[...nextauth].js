import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "../../../prisma/shared-client";
import Stripe from "stripe";

export default NextAuth({
	providers: [
		GithubProvider({
			clientId: process.env.GITHUB_CLIENT_ID,
			clientSecret: process.env.GITHUB_CLIENT_SECRET,
		}),
		GoogleProvider({
			clientId: process.env.GOOGLE_CLIENT_ID,
			clientSecret: process.env.GOOGLE_CLIENT_SECRET,
		}),
	],
	secret: process.env.JWT_SECRET,
	adapter: PrismaAdapter(prisma),
	callbacks: {
		async session({ session, user }) {
			session.user.id = user.id;
			session.user.stripeCustomerId = user.stripeCustomerId;

			const dbUser = await prisma.user.findFirst({
				where: {
					id: user.id,
				},
			});

			session.user.isActive = dbUser.isActive;

			return session;
		},

		async redirect({ url, baseUrl }) {
			return `${baseUrl}/dashboard`;
		},
	},
	events: {
		createUser: async ({ user }) => {
			const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

			await stripe.customers
				.create({ email: user.email })
				.then(async (customer) => {
					return prisma.user.update({
						where: { id: user.id },
						data: {
							stripeCustomerId: customer.id,
						},
					});
				});
		},
	},
});
