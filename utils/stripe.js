import { SUBSCRIPTION_IDS } from "../config";

export const getStripeSubTier = (subId) => {
	const subTier = Object.keys(SUBSCRIPTION_IDS).find(
		(key) => SUBSCRIPTION_IDS[key] === subId
	);

	return subTier?.split("_")[1];
};
