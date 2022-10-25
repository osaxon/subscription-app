import { getSession } from "next-auth/react";

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

	res.end();
};

export default handler;
