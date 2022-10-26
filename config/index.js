export const CURRENCY = "gbp";
export const YEARLY_DISCOUNT = 0.8;
export const MONTHLY_PRICE = 5.0;
export const MONTHLY_PRICING = {
	MONTHLY_PRICE,
	YEARLY: MONTHLY_PRICE * YEARLY_DISCOUNT,
};
export const TRIAL_PERIOD_DAYS = 14;
export const SUBSCRIPTION_IDS = {
	STRIPE_YEARLY_SUB_ID: process.env.STRIPE_YEARLY_SUB_ID,
	STRIPE_MONTHLY_SUB_ID: process.env.STRIPE_MONTHLY_SUB_ID,
};
export const DASHBOARD_MENU = ["Overview", "My Lesson Plans"];
