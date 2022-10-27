const goToCheckout = async (subType) => {
	const data = {
		subType: subType,
	};
	const res = await fetch(`/api/stripe/create-checkout-session`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	});
	const { redirectUrl } = await res.json();
	if (redirectUrl) {
		window.location.assign(redirectUrl);
	} else {
		setIsCheckoutLoading(false);
		console.log("Error creating checkout session");
	}
};

export { goToCheckout };
