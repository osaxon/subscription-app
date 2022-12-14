import { PrismaClient } from "@prisma/client";
import { buffer } from "micro";
import Stripe from "stripe";
import { prisma } from "../../../prisma/shared-client";
import { getStripeSubTier } from "../../../utils/stripe";

const endpointSecret = process.env.WH_SECRET;

export const config = {
	api: {
		bodyParser: false, // don't parse body of incoming requests because we need it raw to verify signature
	},
};

const handler = async (req, res) => {
	try {
		const requestBuffer = await buffer(req);
		const sig = req.headers["stripe-signature"];
		const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
			apiVersion: "2020-08-27",
		});

		let event;

		try {
			// Use the Stripe SDK and request info to verify this Webhook request actually came from Stripe
			event = stripe.webhooks.constructEvent(
				requestBuffer.toString(), // Stringify the request for the Stripe library
				sig,
				endpointSecret
			);
		} catch (err) {
			console.log(
				`⚠️  Webhook signature verification failed.`,
				err.message
			);
			return res
				.status(400)
				.send(`Webhook signature verification failed.`);
		}
		// Handle the event
		switch (event.type) {
			// Handle successful subscription creation
			case "customer.subscription.created": {
				const subscription = event.data.object;
				const stripeSubTier = getStripeSubTier(
					subscription.items.data[0]?.price.id
				);

				await prisma.user.update({
					// Find the customer in our database with the Stripe customer ID linked to this purchase
					where: {
						stripeCustomerId: subscription.customer,
					},
					data: {
						stripeSubPriceId: subscription.items.data[0]?.price.id,
						stripeSubPlan: stripeSubTier,
						stripeSubscription: subscription,
					},
				});
				break;
			}

			case "customer.subscription.updated": {
				const subscription = event.data.object;
				const stripeSubTier = getStripeSubTier(
					subscription.items.data[0]?.price.id
				);

				await prisma.user.update({
					// Find the customer in our database with the Stripe customer ID linked to this purchase
					where: {
						stripeCustomerId: subscription.customer,
					},
					data: {
						stripeSubPriceId: subscription.items.data[0]?.price.id,
						stripeSubId: subscription.id,
						stripeSubPlan: stripeSubTier,
					},
				});
				break;
			}

			case "customer.subscription.deleted": {
				const subscription = event.data.object;
				await prisma.user.update({
					where: {
						stripeCustomerId: subscription.customer,
					},
					// Remove Stripe sub details from customer
					data: {
						stripeSubPlan: null,
						stripeSubId: null,
						stripeSubPriceId: null,
					},
				});
			}

			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		// Return a 200 response to acknowledge receipt of the event
		res.status(200).json({ received: true });
	} catch (err) {
		// Return a 500 error
		console.log(err);
		res.status(500).end();
	}
};

export default handler;
