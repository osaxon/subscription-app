import NextAuth from "next-auth/next";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import EmailProvider from "next-auth/providers/email";
import { prisma } from "../../../prisma/shared-client";
import Stripe from "stripe";
import { getStripeSubTier } from "../../../utils/stripe";

export default async function auth(req, res) {
	console.log(req.query);
	return await NextAuth(req, res, {
		providers: [
			GithubProvider({
				clientId: process.env.GITHUB_CLIENT_ID,
				clientSecret: process.env.GITHUB_CLIENT_SECRET,
			}),
			GoogleProvider({
				clientId: process.env.GOOGLE_CLIENT_ID,
				clientSecret: process.env.GOOGLE_CLIENT_SECRET,
				authorization: {
					params: {
						prompt: "consent",
						role: "TEACHER" || "STUDENT",
					},
				},
			}),
			EmailProvider({
				server: {
					host: process.env.EMAIL_SERVER_HOST,
					port: process.env.EMAIL_SERVER_PORT,
					auth: {
						user: process.env.EMAIL_SERVER_USER,
						pass: process.env.EMAIL_SERVER_PASSWORD,
					},
				},
				from: process.env.EMAIL_FROM,
			}),
		],
		secret: process.env.JWT_SECRET,
		adapter: PrismaAdapter(prisma),
		callbacks: {
			async session({ session, user }) {
				const stripeSubTier = getStripeSubTier(user.stripeSubPriceId);
				const dbUser = await prisma.user.findFirst({
					where: {
						id: user.id,
					},
				});
				session.user.id = user.id;
				session.user.stripeCustomerId = user.stripeCustomerId;
				session.user.stripeSubTier = stripeSubTier;
				session.user.role = user.role;
				return session;
			},
		},
		events: {
			createUser: async ({ user }) => {
				const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

				await stripe.customers
					.create({ email: user.email, name: user.name })
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
}
