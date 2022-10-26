import { getSession } from "next-auth/react";
import { prisma } from "../../../prisma/shared-client";

import Stripe from "stripe";

export const handler = async (req, res) => {
	const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

	const session = await getSession({ req });

	if (!session?.user) {
		return res.status(401).json({
			error: {
				code: "no-access",
				message: "You are not signed in.",
			},
		});
	}

	const subscription = await stripe.subscriptions.update(
		session?.user.stripeSubId,
		{ cancel_at_period_end: true }
	);

	if (!subscription) {
		return res
			.status(500)
			.json({ message: "could not retrieve subscription" });
	}

	return res.status(200).json({ data: subscription });
};

export default handler;
