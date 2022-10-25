import { getSession } from "next-auth/react";
import Stripe from "stripe";

export default async (req, res) => {
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

	const checkoutSession = await stripe.checkout.sessions.create({
		mode: "subscription",
		customer: session.user.stripeCustomerId,
		line_items: [
			{
				price: "price_1LwRKoIQP6WsWq07hffsbxDy",
				quantity: 1,
			},
		],
		success_url: `http://localhost:3000/?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: "http://localhost:3000/?cancelledPayment=true",
		subscription_data: {
			metadata: {
				payingUserId: session.user.id,
			},
		},
	});

	if (!checkoutSession.url) {
		return res.status(500).json({
			cdpe: "stripe-error",
			error: "Could not create checkout session",
		});
	}

	return res.status(200).json({ redirectUrl: checkoutSession.url });
};
