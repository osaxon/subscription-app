export const CURRENCY = "gbp";
export const YEARLY_DISCOUNT = 0.8;
export const MONTHLY_PRICE = 5.0;
export const MONTHLY_PRICING = {
	MONTHLY_PRICE,
	YEARLY: MONTHLY_PRICE * YEARLY_DISCOUNT,
};
export const TRIAL_PERIOD_DAYS = 14;
export const SUBSCRIPTION_IDS = {
	STRIPE_YEARLY_SUB_ID: process.env.NEXT_PUBLIC_STRIPE_YEARLY_SUB_ID,
	STRIPE_MONTHLY_SUB_ID: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUB_ID,
};
export const DASHBOARD_MENU = ["Overview", "My Lesson Plans", "Account"];
export const HEADER_NAV = [
	{
		name: "Free Lessons",
		href: "/free-lessons",
		parent: false,
	},
	{
		name: "About",
		href: "/about",
		parent: false,
	},
	{
		name: "Connect",
		href: "/connect",
		parent: true,
		submenu: [
			{
				name: "Tutors",
				href: "/connect/tutors",
			},
			{
				name: "Students",
				href: "/connect/students",
			},
		],
	},
];
export const PROCESS_STEPS = ["Register", "Choose plan", "Go!"];

export const PRODUCTS = [
	{
		name: "Basic - Free",
		priceId: "FREE-TIER",
		highlights: ["Access to free content", "Upgrade any time"],
		badge: "Free",
		price: 0,
		per: "N/A",
	},
	{
		name: "Premium - Monthly",
		priceId: process.env.NEXT_PUBLIC_STRIPE_MONTHLY_SUB_ID,
		highlights: ["14 day free trial", "Cancel any time"],
		badge: "Most flexible",
		price: 5,
		per: "Month",
	},
	{
		name: "Premium - Yearly",
		priceId: process.env.NEXT_PUBLIC_STRIPE_YEARLY_SUB_ID,
		highlights: ["Equiv to £3.50 p/m", "Full access for 12 months"],
		badge: "Most savings",
		price: 39,
		per: "Year",
	},
];
