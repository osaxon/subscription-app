import React, { useState } from "react";
import Layout from "../components/Layout";

const SubOptions = () => {
	const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

	const goToCheckout = async (subType) => {
		console.log(subType);
		const data = {
			subType: subType,
		};
		setIsCheckoutLoading(true);
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

	return (
		<Layout>
			<main className="min-h-screen layout">
				<p className="text-6xl">Choose your subscription</p>

				<div className="flex flex-col md:flex-row gap-6 mt-10">
					{/* Monthly */}
					<div className=" w-full bg-base-100 shadow-xl">
						<div className=" h-48 flex flex-col justify-evenly items-center">
							<div className="badge badge-secondary italic">
								Flexible
							</div>
							<p className="text-5xl prose italic">£5/Month</p>
							<div className="flex flex-col items-center">
								<p className="prose">14 day fee trial</p>
								<p className="prose">Cancel any time</p>
							</div>
						</div>
						<div className="card-body">
							<button
								onClick={() => goToCheckout("MONTHLY")}
								className="btn btn-primary"
							>
								Select
							</button>
						</div>
					</div>
					{/* Yearly */}
					<div className=" w-full bg-base-100 shadow-xl">
						<div className=" h-48 flex flex-col justify-evenly items-center">
							<div className="badge badge-secondary italic">
								Save 20%
							</div>
							<p className="text-5xl prose italic">£39/Year</p>
							<div className="flex flex-col items-center">
								<p className="prose">Equiv. to £3.50/Month!</p>
								<p className="prose">Cancel any time</p>
							</div>
						</div>
						<div className="card-body">
							<button
								onClick={() => goToCheckout("YEARLY")}
								className="btn btn-secondary"
							>
								Select
							</button>
						</div>
					</div>
				</div>
			</main>
		</Layout>
	);
};

export default SubOptions;
