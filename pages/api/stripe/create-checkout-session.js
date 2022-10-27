import { getSession } from "next-auth/react";
import Stripe from "stripe";
import {
	TRIAL_PERIOD_DAYS,
	YEARLY_DISCOUNT,
	SUBSCRIPTION_IDS,
} from "../../../config";

const handler = async (req, res) => {
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
	console.log("USER SESSION>>>>>>>>>");
	console.log(session.user.stripeSubPriceId);

	const userCurrentSub = session.user.stripeSubPriceId;

	// Check for current subscriptions
	if (userCurrentSub) {
		return res.status(409).json({
			message:
				"This account has an active subscription already. Please update or cancel.",
		});
	}

	const subType = req.body.subType;
	console.log(subType);

	const checkoutSession = await stripe.checkout.sessions.create({
		mode: "subscription",
		customer: session.user.stripeCustomerId,
		metadata: {
			payingUserId: session.user.id,
		},
		subscription_data: {
			trial_period_days: TRIAL_PERIOD_DAYS,
		},
		line_items: [
			{
				price: SUBSCRIPTION_IDS[`STRIPE_${subType}_SUB_ID`],
				quantity: 1,
			},
		],
		success_url: `${req.headers.origin}/dashboard/?session_id={CHECKOUT_SESSION_ID}`,
		cancel_url: `${req.headers.origin}/dashboard/?cancelledPayment=true`,
	});

	if (!checkoutSession.url) {
		return res.status(500).json({
			cdpe: "stripe-error",
			error: "Could not create checkout session",
		});
	}

	return res.status(200).json({ redirectUrl: checkoutSession.url });
};

export default handler;
